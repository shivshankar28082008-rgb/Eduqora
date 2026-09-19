import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { spawn, execFile } from 'child_process';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// ----------------------------------------------------
// CORS & PREFLIGHT HANDLING
// ----------------------------------------------------
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

interface ExecutionRequest {
  language: 'c' | 'cpp' | 'java' | 'python' | 'php';
  code: string;
  stdin?: string;
  files?: Array<{ name: string; content: string }>;
}

interface ExecutionResponse {
  success: boolean;
  exitCode: number;
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  errorType?: 'Compilation Error' | 'Runtime Error' | 'Syntax Error' | 'Timeout' | 'System Error';
  errorDetails?: {
    file?: string;
    line?: number;
    column?: number;
    message?: string;
  };
}

// ----------------------------------------------------
// DYNAMIC COMPILER & RUNTIME DISCOVERY
// ----------------------------------------------------
/**
 * Safely resolves the absolute path of a compiler or runtime executable.
 * Searches system PATH and standard binary directories without hardcoding paths.
 */
function findExecutable(candidates: string[]): string | null {
  const pathDirs = (process.env.PATH || '')
    .split(path.delimiter)
    .filter(Boolean);

  const standardDirs = [
    '/usr/local/bin',
    '/usr/bin',
    '/bin',
    '/usr/local/sbin',
    '/usr/sbin',
    '/sbin',
  ];

  const searchDirs = Array.from(new Set([...pathDirs, ...standardDirs]));

  for (const name of candidates) {
    if (path.isAbsolute(name)) {
      try {
        if (fs.existsSync(name)) {
          fs.accessSync(name, fs.constants.X_OK);
          return name;
        }
      } catch {
        // Not executable
      }
      continue;
    }

    for (const dir of searchDirs) {
      const fullPath = path.join(dir, name);
      try {
        if (fs.existsSync(fullPath)) {
          fs.accessSync(fullPath, fs.constants.X_OK);
          return fullPath;
        }
      } catch {
        // Continue searching
      }
    }
  }

  return null;
}

// ----------------------------------------------------
// API: HEALTH CHECK (Accessible at both /api/health and /Eduqora/api/health)
// ----------------------------------------------------
const healthHandler = (_req: express.Request, res: express.Response) => {
  const gccPath = findExecutable(['gcc', 'clang', 'cc']);
  const gppPath = findExecutable(['g++', 'clang++', 'c++']);
  const pythonPath = findExecutable(['python3', 'python']);
  const javaPath = findExecutable(['java']);
  const javacPath = findExecutable(['javac']);
  const phpPath = findExecutable(['php', 'php8.2', 'php8', 'php7.4', 'php-cli']);
  const sqlite3Path = findExecutable(['sqlite3']);

  res.json({
    status: 'ok',
    compilers: {
      gcc: !!gccPath,
      gpp: !!gppPath,
      python3: !!pythonPath,
      java: !!(javaPath && javacPath),
      php: !!phpPath,
      sqlite3: !!sqlite3Path,
    },
    paths: {
      gcc: gccPath,
      gpp: gppPath,
      python3: pythonPath,
      java: javaPath,
      javac: javacPath,
      php: phpPath,
    },
  });
};
app.get('/health', healthHandler);
app.get('/api/health', healthHandler);
app.get('/Eduqora/health', healthHandler);
app.get('/Eduqora/api/health', healthHandler);
app.head('/health', (_req, res) => res.status(200).end());
app.head('/api/health', (_req, res) => res.status(200).end());

// ----------------------------------------------------
// API: SECURE ISOLATED CODE EXECUTION
// ----------------------------------------------------
const executeHandler = async (req: express.Request, res: express.Response) => {
  const { language, code, stdin = '', files = [] } = req.body as ExecutionRequest;

  if (!language || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      exitCode: 1,
      stdout: '',
      stderr: 'Missing language or code to execute.',
      executionTimeMs: 0,
      errorType: 'System Error',
    });
  }

  const startTime = Date.now();
  let tmpDir = '';

  try {
    // 1. Create a unique isolated sandbox workspace
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `eduqora-${language}-${Date.now()}-`));

    // 2. Write supporting virtual project files if provided
    if (Array.isArray(files) && files.length > 0) {
      for (const f of files) {
        if (f.name && typeof f.content === 'string') {
          // Normalize relative path safely inside sandbox
          const safeRelPath = f.name.replace(/^(\.\/|\/)+/, '').replace(/\.\.\//g, '');
          const targetPath = path.join(tmpDir, safeRelPath);
          const parentDir = path.dirname(targetPath);
          if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
          }
          fs.writeFileSync(targetPath, f.content, 'utf8');
        }
      }
    }

    // 3. Language-specific Compiler Detection & Execution Setup
    let compileCmd = '';
    let compileArgs: string[] = [];
    let runCmd = '';
    let runArgs: string[] = [];
    let mainFileName = '';

    if (language === 'c') {
      const gccPath = findExecutable(['gcc', 'clang', 'cc']);
      if (!gccPath) {
        return res.json({
          success: false,
          exitCode: 127,
          stdout: '',
          stderr: 'C compiler is not installed or unavailable in the sandbox.',
          executionTimeMs: Date.now() - startTime,
          errorType: 'Compilation Error',
          errorDetails: {
            file: 'main.c',
            message: 'C compiler is not installed or unavailable in the sandbox.',
          },
        });
      }

      mainFileName = 'main.c';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');

      // Include any other user-provided .c files for multi-file compilation
      const extraSourceFiles = (files || [])
        .map(f => (f.name || '').replace(/^(\.\/|\/)+/, '').replace(/\.\.\//g, ''))
        .filter(name => name.endsWith('.c') && name !== 'main.c');

      compileCmd = gccPath;
      compileArgs = ['-O2', '-Wall', '-Wextra', 'main.c', ...extraSourceFiles, '-o', 'main', '-lm'];
      runCmd = path.join(tmpDir, 'main');
      runArgs = [];
    } else if (language === 'cpp') {
      const gppPath = findExecutable(['g++', 'clang++', 'c++']);
      if (!gppPath) {
        return res.json({
          success: false,
          exitCode: 127,
          stdout: '',
          stderr: 'C++ compiler is not installed or unavailable in the sandbox.',
          executionTimeMs: Date.now() - startTime,
          errorType: 'Compilation Error',
          errorDetails: {
            file: 'main.cpp',
            message: 'C++ compiler is not installed or unavailable in the sandbox.',
          },
        });
      }

      mainFileName = 'main.cpp';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');

      const extraCppFiles = (files || [])
        .map(f => (f.name || '').replace(/^(\.\/|\/)+/, '').replace(/\.\.\//g, ''))
        .filter(name => (name.endsWith('.cpp') || name.endsWith('.cc')) && name !== 'main.cpp');

      compileCmd = gppPath;
      compileArgs = ['-O2', '-Wall', '-Wextra', '-std=c++17', 'main.cpp', ...extraCppFiles, '-o', 'main', '-lm'];
      runCmd = path.join(tmpDir, 'main');
      runArgs = [];
    } else if (language === 'java') {
      const javacPath = findExecutable(['javac']);
      const javaPath = findExecutable(['java']);
      if (!javacPath || !javaPath) {
        return res.json({
          success: false,
          exitCode: 127,
          stdout: '',
          stderr: 'Java compiler / runtime (JDK) is not installed or unavailable in the sandbox.',
          executionTimeMs: Date.now() - startTime,
          errorType: 'Compilation Error',
          errorDetails: {
            file: 'Main.java',
            message: 'Java compiler / runtime (JDK) is not installed or unavailable in the sandbox.',
          },
        });
      }

      const classMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      const className = classMatch ? classMatch[1] : 'Main';
      mainFileName = `${className}.java`;
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      compileCmd = javacPath;
      compileArgs = [`${className}.java`];
      runCmd = javaPath;
      runArgs = ['-cp', tmpDir, className];
    } else if (language === 'python') {
      const pythonPath = findExecutable(['python3', 'python']);
      if (!pythonPath) {
        return res.json({
          success: false,
          exitCode: 127,
          stdout: '',
          stderr: 'Python 3 interpreter is not installed or unavailable in the sandbox.',
          executionTimeMs: Date.now() - startTime,
          errorType: 'Runtime Error',
          errorDetails: {
            file: 'main.py',
            message: 'Python 3 interpreter is not installed or unavailable in the sandbox.',
          },
        });
      }

      mainFileName = 'main.py';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      runCmd = pythonPath;
      runArgs = ['-u', 'main.py'];
    } else if (language === 'php') {
      const phpPath = findExecutable(['php', 'php8.2', 'php8', 'php7.4', 'php-cli']);
      if (!phpPath) {
        return res.json({
          success: false,
          exitCode: 127,
          stdout: '',
          stderr: 'PHP runtime unavailable: PHP CLI interpreter is not installed or unavailable in the sandbox.',
          executionTimeMs: Date.now() - startTime,
          errorType: 'Runtime Error',
          errorDetails: {
            file: 'main.php',
            message: 'PHP runtime unavailable: PHP CLI interpreter is not installed or unavailable in the sandbox.',
          },
        });
      }

      mainFileName = 'main.php';
      let phpCode = code;
      // Auto-wrap if code does not contain an opening <?php or <?= tag so standalone statements run as PHP
      if (!phpCode.includes('<?php') && !phpCode.includes('<?=')) {
        phpCode = `<?php\n${phpCode}`;
      }
      fs.writeFileSync(path.join(tmpDir, mainFileName), phpCode, 'utf8');
      runCmd = phpPath;
      runArgs = ['-d', 'display_errors=stderr', '-d', 'precision=17', '-f', 'main.php'];
    } else {
      return res.status(400).json({
        success: false,
        exitCode: 1,
        stdout: '',
        stderr: `Unsupported execution language: ${language}`,
        executionTimeMs: 0,
      });
    }

    // A. Compilation step (for C, C++, Java)
    let compileWarnings = '';
    if (compileCmd) {
      const compileResult = await new Promise<{ success: boolean; stderr: string; stdout: string; code: number }>((resolve) => {
        execFile(
          compileCmd,
          compileArgs,
          {
            cwd: tmpDir,
            timeout: 10000,
            maxBuffer: 1024 * 1024,
          },
          (error, stdout, stderr) => {
            if (error) {
              let friendlyStderr = stderr || error.message;
              if ((error as any).code === 'ENOENT' || error.message.includes('ENOENT')) {
                friendlyStderr = language === 'c'
                  ? 'C compiler is not installed or unavailable in the sandbox.'
                  : `${language.toUpperCase()} compiler is not installed or unavailable in the sandbox.`;
              }
              const exitCode = typeof (error as any).code === 'number' ? (error as any).code : 1;
              resolve({ success: false, stderr: friendlyStderr, stdout, code: exitCode });
            } else {
              resolve({ success: true, stderr: stderr || '', stdout, code: 0 });
            }
          }
        );
      });

      if (!compileResult.success) {
        const stderr = compileResult.stderr;
        // Parse line and column number from compiler diagnostic
        const lineMatch = stderr.match(new RegExp(`${mainFileName}:(\\d+):(?:(\\d+):)?\\s*(error:.*)`, 'i'))
          || stderr.match(/:(\d+):(?:(\d+):)?\s*error:\s*(.*)/i);

        let errorDetails: ExecutionResponse['errorDetails'];
        if (lineMatch) {
          errorDetails = {
            file: mainFileName,
            line: parseInt(lineMatch[1], 10),
            column: lineMatch[2] ? parseInt(lineMatch[2], 10) : undefined,
            message: lineMatch[3] || lineMatch[2],
          };
        }

        const executionTimeMs = Date.now() - startTime;
        return res.json({
          success: false,
          exitCode: compileResult.code || 1,
          stdout: compileResult.stdout,
          stderr: compileResult.stderr,
          executionTimeMs,
          errorType: 'Compilation Error',
          errorDetails,
        });
      }

      compileWarnings = compileResult.stderr ? compileResult.stderr.trim() : '';
    }

    // Ensure the compiled executable exists and has execute permissions before running
    if (compileCmd && runCmd) {
      if (!fs.existsSync(runCmd)) {
        return res.json({
          success: false,
          exitCode: 1,
          stdout: '',
          stderr: 'Compilation produced no executable output binary.',
          executionTimeMs: Date.now() - startTime,
          errorType: 'Compilation Error',
        });
      }
      try {
        fs.chmodSync(runCmd, 0o755);
      } catch {
        // Continue
      }
    }

    // B. Execution step (with stdin piping and 5-second runaway timeout limit)
    const runResult = await new Promise<ExecutionResponse>((resolve) => {
      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const child = spawn(runCmd, runArgs, {
        cwd: tmpDir,
        env: {
          PATH: process.env.PATH || '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
          LANG: 'C.UTF-8',
          LC_ALL: 'C.UTF-8',
          PYTHONUNBUFFERED: '1',
        },
      });

      const timeoutTimer = setTimeout(() => {
        timedOut = true;
        child.kill('SIGKILL');
      }, 5000);

      child.stdout.on('data', (data) => {
        if (stdout.length < 1024 * 1024) {
          stdout += data.toString('utf8');
        }
      });

      child.stderr.on('data', (data) => {
        if (stderr.length < 1024 * 1024) {
          stderr += data.toString('utf8');
        }
      });

      // Provide stdin stream if requested
      if (stdin && stdin.length > 0) {
        try {
          child.stdin.write(stdin);
          if (!stdin.endsWith('\n')) {
            child.stdin.write('\n');
          }
          child.stdin.end();
        } catch {
          // Stdin pipe closed early by process
        }
      } else {
        child.stdin.end();
      }

      child.on('close', (code, signal) => {
        clearTimeout(timeoutTimer);
        const executionTimeMs = Date.now() - startTime;

        if (timedOut) {
          return resolve({
            success: false,
            exitCode: 124,
            stdout,
            stderr: (stderr ? stderr + '\n' : '') + 'Execution Timeout: Program ran longer than 5 seconds and was safely terminated.',
            executionTimeMs,
            errorType: 'Timeout',
            errorDetails: {
              file: mainFileName,
              message: 'Execution time limit exceeded (5.0s maximum allowed).',
            },
          });
        }

        const isSuccess = code === 0 && !signal;
        let errorType: ExecutionResponse['errorType'] = undefined;
        let errorDetails: ExecutionResponse['errorDetails'] = undefined;

        if (!isSuccess) {
          errorType = 'Runtime Error';
          if (language === 'python') {
            const pyMatch = stderr.match(/File "([^"]+)", line (\d+).*?\n\s*([A-Za-z]+Error: .*)/s);
            if (pyMatch) {
              errorDetails = {
                file: pyMatch[1],
                line: parseInt(pyMatch[2], 10),
                message: pyMatch[3].trim(),
              };
            }
          } else if (language === 'php') {
            const phpMatch = stderr.match(/(?:PHP\s+)?(Parse|Fatal|Compile)\s+error:\s*(.*?)\s+in\s+(.*?)(?::(\d+)|\s+on line\s+(\d+))/i)
              || stderr.match(/Fatal error:\s*(.*?)\s+in\s+(.*?)\s+on line\s+(\d+)/i);
            if (phpMatch) {
              const rawKind = phpMatch[1];
              const message = (phpMatch[2] || '').trim();
              const rawFile = phpMatch[3] || '';
              const lineStr = phpMatch[4] || phpMatch[5] || '';
              errorDetails = {
                file: path.basename(rawFile) || 'main.php',
                line: lineStr ? parseInt(lineStr, 10) : undefined,
                message: message || stderr.trim(),
              };
              if (rawKind && rawKind.toLowerCase() === 'parse') {
                errorType = 'Syntax Error';
              }
            }
          }
        }

        // Include compiler warnings if present
        let finalStderr = stderr;
        if (compileWarnings) {
          finalStderr = finalStderr ? `${compileWarnings}\n${finalStderr}` : compileWarnings;
        }

        resolve({
          success: isSuccess,
          exitCode: code ?? (signal ? 137 : 1),
          stdout,
          stderr: finalStderr,
          executionTimeMs,
          errorType,
          errorDetails,
        });
      });

      child.on('error', (err) => {
        clearTimeout(timeoutTimer);
        let friendlyStderr = `Process invocation error: ${err.message}`;
        if ((err as any).code === 'ENOENT' || err.message.includes('ENOENT')) {
          if (language === 'c') {
            friendlyStderr = 'C compiler is not installed or unavailable in the sandbox.';
          } else if (language === 'cpp') {
            friendlyStderr = 'C++ compiler is not installed or unavailable in the sandbox.';
          } else if (language === 'php') {
            friendlyStderr = 'PHP runtime unavailable: PHP CLI interpreter is not installed or unavailable in the sandbox.';
          } else if (language === 'python') {
            friendlyStderr = 'Python 3 interpreter is not installed or unavailable in the sandbox.';
          } else {
            friendlyStderr = `${language.toUpperCase()} runtime is not installed or unavailable in the sandbox.`;
          }
        }
        resolve({
          success: false,
          exitCode: 1,
          stdout,
          stderr: friendlyStderr,
          executionTimeMs: Date.now() - startTime,
          errorType: 'System Error',
        });
      });
    });

    res.json(runResult);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      exitCode: 1,
      stdout: '',
      stderr: `Server execution exception: ${err.message || String(err)}`,
      executionTimeMs: Date.now() - startTime,
      errorType: 'System Error',
    });
  } finally {
    // 4. Always clean up temporary workspace to prevent disk leaks
    if (tmpDir && fs.existsSync(tmpDir)) {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {
        // Ignore cleanup deletion failure
      }
    }
  }
};
app.post('/api/execute', executeHandler);
app.post('/Eduqora/api/execute', executeHandler);
app.post('/execute', executeHandler);
app.post('/Eduqora/execute', executeHandler);

// ----------------------------------------------------
// VITE MIDDLEWARE & SPA SERVING
// ----------------------------------------------------
async function startServer() {
  // Support both root '/' and '/Eduqora/' seamlessly without breaking redirects
  app.use((req, _res, next) => {
    if (req.url === '/' || req.url === '') {
      req.url = '/Eduqora/';
    }
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use('/Eduqora', express.static(distPath));
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Eduqora Code Lab server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
