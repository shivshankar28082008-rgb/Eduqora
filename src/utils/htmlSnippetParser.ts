/**
 * Utility to extract clean HTML, CSS, and JavaScript from a composite HTML document/snippet.
 */
export function extractHtmlCssJs(fullCode: string): { html: string; css: string; js: string } {
  if (!fullCode) {
    return { html: '', css: '', js: '' };
  }

  let html = fullCode;
  let css = '';
  let js = '';

  // 1. Extract <style>...</style> content
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    css = styleMatch[1].trim();
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '').trim();
  }

  // 2. Extract <script>...</script> content
  const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (scriptMatch) {
    js = scriptMatch[1].trim();
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/i, '').trim();
  }

  // 3. Strip outer <html>, <head>, <body> tags if present for clean snippet editing
  html = html.replace(/<!DOCTYPE html>\s*/gi, '');
  html = html.replace(/<html[^>]*>\s*/gi, '').replace(/<\/html>\s*/gi, '');
  html = html.replace(/<head[^>]*>[\s\S]*?<\/head>\s*/gi, '');
  html = html.replace(/<body[^>]*>\s*/gi, '').replace(/<\/body>\s*/gi, '');
  html = html.trim();

  // 4. If CSS was empty, supply clean modern typography and spacing default
  if (!css) {
    css = `body {\n  font-family: system-ui, -apple-system, sans-serif;\n  padding: 24px;\n  line-height: 1.6;\n  color: #1e293b;\n  background: #ffffff;\n  margin: 0;\n}`;
  }

  return { html, css, js };
}
