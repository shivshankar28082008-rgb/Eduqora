/**
 * Eduqora Virtual Project File System & Dependency Resolver
 *
 * Resolves virtual multi-file projects:
 * - <link rel="stylesheet" href="styles.css"> -> Injected virtual CSS
 * - <script src="script.js"></script> -> Injected virtual JavaScript
 * - Relative paths (./styles.css, css/styles.css, ../styles.css)
 * - Missing file detection & standardized error reporting
 * - Sandboxed execution isolation with unique execution IDs
 */

export interface VirtualFile {
  name: string;
  content: string;
  language?: string;
}

export interface MissingFileDiagnostic {
  path: string;
  referencedBy: string;
  type: 'stylesheet' | 'script' | 'asset';
  formattedMessage: string;
}

export interface VirtualFsResolutionResult {
  compiledHtml: string;
  resolvedFiles: string[];
  missingFiles: MissingFileDiagnostic[];
  executionId: string;
}

/**
 * Normalizes relative virtual paths e.g.:
 * "./styles.css" -> "styles.css"
 * "/styles.css" -> "styles.css"
 * "css/../styles.css" -> "styles.css"
 * "assets/./logo.png" -> "assets/logo.png"
 */
export function normalizeVirtualPath(rawPath: string, basePath: string = ''): string {
  let clean = rawPath.trim();
  // Strip query parameters and hashes
  clean = clean.split('?')[0].split('#')[0];

  // If external protocol or data URI, do not normalize
  if (/^(https?:|\/\/|data:|blob:)/i.test(clean)) {
    return clean;
  }

  // Remove leading slash or dot-slash
  clean = clean.replace(/^(\.\/|\/)+/, '');

  if (basePath) {
    const baseClean = basePath.replace(/^(\.\/|\/)+/, '').replace(/\/+$/, '');
    if (baseClean) {
      clean = `${baseClean}/${clean}`;
    }
  }

  // Resolve directory traversals (..)
  const segments = clean.split('/');
  const resolvedSegments: string[] = [];

  for (const seg of segments) {
    if (!seg || seg === '.') continue;
    if (seg === '..') {
      resolvedSegments.pop();
    } else {
      resolvedSegments.push(seg);
    }
  }

  return resolvedSegments.join('/');
}

/**
 * Finds a file in the virtual files list by exact path or normalized path or basename
 */
export function findVirtualFile(
  files: VirtualFile[],
  targetPath: string,
  basePath: string = ''
): VirtualFile | undefined {
  if (!targetPath) return undefined;

  // External URLs are not virtual files
  if (/^(https?:|\/\/|data:|blob:)/i.test(targetPath)) {
    return undefined;
  }

  const normalized = normalizeVirtualPath(targetPath, basePath);
  const lowerNorm = normalized.toLowerCase();

  // 1. Exact path match
  let match = files.find(f => normalizeVirtualPath(f.name) === normalized);
  if (match) return match;

  // 2. Case-insensitive exact match
  match = files.find(f => normalizeVirtualPath(f.name).toLowerCase() === lowerNorm);
  if (match) return match;

  // 3. Basename fallback if path was specified without subfolder
  const targetBase = normalized.split('/').pop()?.toLowerCase();
  if (targetBase) {
    match = files.find(f => f.name.split('/').pop()?.toLowerCase() === targetBase);
    if (match) return match;
  }

  return undefined;
}

/**
 * Builds the sandboxed console and runtime error interceptor script
 */
function buildInterceptorScript(executionId: string): string {
  return `
    <script id="eduqora-runtime-interceptor">
      (function() {
        var EXEC_ID = ${JSON.stringify(executionId)};
        window.__EDUQORA_EXEC_ID__ = EXEC_ID;

        function postLog(type, text, file, line, col) {
          try {
            window.parent.postMessage({
              source: 'eduqora-code-runner',
              executionId: EXEC_ID,
              type: type,
              text: String(text),
              file: file,
              line: line,
              col: col,
              timestamp: new Date().toLocaleTimeString()
            }, '*');
          } catch(e) {}
        }

        function formatValues(items) {
          return Array.from(items).map(function(item) {
            if (item === null) return 'null';
            if (item === undefined) return 'undefined';
            if (typeof item === 'object') {
              try {
                return JSON.stringify(item, null, 2);
              } catch(err) {
                return String(item);
              }
            }
            return String(item);
          }).join(' ');
        }

        var _log = console.log;
        var _info = console.info;
        var _warn = console.warn;
        var _error = console.error;

        console.log = function() {
          postLog('log', formatValues(arguments));
          _log.apply(console, arguments);
        };
        console.info = function() {
          postLog('info', formatValues(arguments));
          _info.apply(console, arguments);
        };
        console.warn = function() {
          postLog('warn', formatValues(arguments));
          _warn.apply(console, arguments);
        };
        console.error = function() {
          postLog('error', formatValues(arguments));
          _error.apply(console, arguments);
        };

        window.onerror = function(message, source, lineno, colno, error) {
          var fileName = 'script.js';
          if (source) {
            try {
              var sParts = source.split('/');
              var last = sParts[sParts.length - 1].split('?')[0];
              if (last && last.indexOf('blob:') === -1 && last.indexOf('about:') === -1) {
                fileName = last;
              }
            } catch(e) {}
          }
          var msg = String(message || (error && error.message) || 'Unknown error');
          var cleanMsg = msg.replace(/^Uncaught\s+/i, '');
          var lineInfo = lineno ? ' (Line ' + lineno + (colno ? ':' + colno : '') + ')' : '';
          postLog('error', cleanMsg + lineInfo, fileName, lineno, colno);
          return false;
        };

        window.addEventListener('unhandledrejection', function(event) {
          var reason = event.reason;
          var msg = reason ? (reason.message || String(reason)) : 'Unhandled Promise Rejection';
          postLog('error', 'Unhandled Promise Rejection: ' + msg, 'script.js');
        });
      })();
    </script>
  `;
}

/**
 * Resolves a full multi-file HTML/CSS/JS project into a self-contained,
 * sandboxed execution bundle.
 */
export function resolveWebProject(
  files: VirtualFile[],
  executionId: string = `exec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
): VirtualFsResolutionResult {
  const missingFiles: MissingFileDiagnostic[] = [];
  const resolvedFiles: string[] = [];

  // 1. Identify Entry HTML File
  const htmlFile = files.find(f => f.name === 'index.html')
    || files.find(f => f.name.endsWith('.html'))
    || { name: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Eduqora Project</title></head>\n<body>\n  <h1>No HTML file found</h1>\n</body>\n</html>' };

  let htmlDoc = htmlFile.content;
  const entryFileName = htmlFile.name;
  resolvedFiles.push(entryFileName);

  const entryDir = entryFileName.includes('/') ? entryFileName.slice(0, entryFileName.lastIndexOf('/')) : '';

  // 2. Resolve <link rel="stylesheet" href="..."> tags
  // Regex matches <link ... href="..." ...> or <link ... rel="stylesheet" ...>
  htmlDoc = htmlDoc.replace(/<link\s+([^>]*?)>/gi, (match, attrs) => {
    // Check if it's a stylesheet
    const isStylesheet = /\brel\s*=\s*["']?stylesheet["']?/i.test(attrs);
    if (!isStylesheet) {
      return match;
    }

    const hrefMatch = attrs.match(/\bhref\s*=\s*["']?([^"'\s>]+)["']?/i);
    if (!hrefMatch) {
      return match;
    }

    const rawHref = hrefMatch[1].trim();

    // External URLs remain as-is
    if (/^(https?:|\/\/)/i.test(rawHref)) {
      return match;
    }

    // Lookup in virtual file system
    const targetFile = findVirtualFile(files, rawHref, entryDir);
    if (targetFile) {
      resolvedFiles.push(targetFile.name);
      return `<style data-source="${targetFile.name}">\n/* Resolved from: ${targetFile.name} */\n${targetFile.content}\n</style>`;
    } else {
      missingFiles.push({
        path: rawHref,
        referencedBy: entryFileName,
        type: 'stylesheet',
        formattedMessage: `Missing file: ${rawHref}\nReferenced by: ${entryFileName}`,
      });
      return `<!-- Missing file: ${rawHref} Referenced by: ${entryFileName} -->`;
    }
  });

  // 3. Resolve <script src="..."> tags (both <script src="..."></script> and self-closing <script src="..." />)
  htmlDoc = htmlDoc.replace(/<script\s+([^>]*?)(?:>([\s\S]*?)<\/script>|\/>)/gi, (match, attrs) => {
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']?([^"'\s>]+)["']?/i);
    if (!srcMatch) {
      // Inline script without src
      return match;
    }

    const rawSrc = srcMatch[1].trim();

    // External scripts remain as-is
    if (/^(https?:|\/\/)/i.test(rawSrc)) {
      return match;
    }

    // Lookup in virtual file system
    const targetFile = findVirtualFile(files, rawSrc, entryDir);
    if (targetFile) {
      resolvedFiles.push(targetFile.name);
      // Clean attributes without src
      const cleanAttrs = attrs.replace(/\bsrc\s*=\s*["']?[^"'\s>]+["']?/i, '').trim();
      return `<script data-source="${targetFile.name}" ${cleanAttrs}>\n// Source: ${targetFile.name}\n${targetFile.content}\n</script>`;
    } else {
      missingFiles.push({
        path: rawSrc,
        referencedBy: entryFileName,
        type: 'script',
        formattedMessage: `Missing file: ${rawSrc}\nReferenced by: ${entryFileName}`,
      });
      return `<!-- Missing file: ${rawSrc} Referenced by: ${entryFileName} -->`;
    }
  });

  // 4. Resolve <img src="..."> tags for local assets
  htmlDoc = htmlDoc.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) return match;

    const rawSrc = srcMatch[1].trim();
    if (/^(https?:|\/\/|data:)/i.test(rawSrc)) {
      return match;
    }

    const assetFile = findVirtualFile(files, rawSrc, entryDir);
    if (assetFile) {
      resolvedFiles.push(assetFile.name);
      // If SVG or text, inline data URI
      let dataUri = rawSrc;
      if (assetFile.name.endsWith('.svg') || assetFile.content.includes('<svg')) {
        dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(assetFile.content)}`;
      }
      return match.replace(/\bsrc\s*=\s*["'][^"']+["']/i, `src="${dataUri}" data-source="${assetFile.name}"`);
    } else {
      missingFiles.push({
        path: rawSrc,
        referencedBy: entryFileName,
        type: 'asset',
        formattedMessage: `Asset not found: ${rawSrc}\nReferenced by: ${entryFileName}`,
      });
      return match;
    }
  });

  // 5. Check if project contains styles.css or script.js that was NOT referenced in index.html
  // Auto-connect them so user changes in CSS/JS are never lost even if the user omitted <link> or <script> tags!
  const unreferencedCss = files.filter(f => 
    (f.name.endsWith('.css') || f.language === 'css') && !resolvedFiles.includes(f.name)
  );

  const unreferencedJs = files.filter(f => 
    (f.name.endsWith('.js') || f.language === 'javascript') && !resolvedFiles.includes(f.name)
  );

  if (unreferencedCss.length > 0) {
    const injectedStyles = unreferencedCss.map(f => 
      `<style data-source="${f.name}" data-auto-injected="true">\n/* Auto-linked: ${f.name} */\n${f.content}\n</style>`
    ).join('\n');

    if (htmlDoc.includes('</head>')) {
      htmlDoc = htmlDoc.replace('</head>', `${injectedStyles}\n</head>`);
    } else if (htmlDoc.includes('<body')) {
      htmlDoc = htmlDoc.replace(/<body([^>]*)>/i, `<head>${injectedStyles}</head><body$1>`);
    } else {
      htmlDoc = `${injectedStyles}\n${htmlDoc}`;
    }
    unreferencedCss.forEach(f => resolvedFiles.push(f.name));
  }

  // 6. Inject the Console & Diagnostic Interceptor Script
  const interceptor = buildInterceptorScript(executionId);
  if (htmlDoc.includes('<head>')) {
    htmlDoc = htmlDoc.replace('<head>', `<head>\n${interceptor}`);
  } else if (htmlDoc.includes('<html>')) {
    htmlDoc = htmlDoc.replace('<html>', `<html><head>\n${interceptor}</head>`);
  } else {
    htmlDoc = `${interceptor}\n${htmlDoc}`;
  }

  // 7. Inject any unreferenced JS scripts at the end of body
  if (unreferencedJs.length > 0) {
    const injectedScripts = unreferencedJs.map(f => 
      `<script data-source="${f.name}" data-auto-injected="true">\n// Auto-linked: ${f.name}\n${f.content}\n</script>`
    ).join('\n');

    if (htmlDoc.includes('</body>')) {
      htmlDoc = htmlDoc.replace('</body>', `${injectedScripts}\n</body>`);
    } else {
      htmlDoc = `${htmlDoc}\n${injectedScripts}`;
    }
    unreferencedJs.forEach(f => resolvedFiles.push(f.name));
  }

  return {
    compiledHtml: htmlDoc,
    resolvedFiles,
    missingFiles,
    executionId,
  };
}
