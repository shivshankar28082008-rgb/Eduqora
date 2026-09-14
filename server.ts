import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { spawn, execFile } from 'child_process';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

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
  errorType?: 'Compilation Error' | 'Runtime Error' | 'Timeout' | 'System Error';
  errorDetails?: {
    file?: string;
    line?: number;
    column?: number;
    message?: string;
  };
}

// ----------------------------------------------------
// API: HEALTH CHECK (Accessible at both /api/health and /Eduqora/api/health)
// ----------------------------------------------------
const healthHandler = (_req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    compilers: {
      gcc: fs.existsSync('/usr/bin/gcc'),
      gpp: fs.existsSync('/usr/bin/g++'),
      python3: fs.existsSync('/usr/bin/python3'),
      java: fs.existsSync('/usr/bin/java'),
      php: fs.existsSync('/usr/bin/php'),
      sqlite3: fs.existsSync('/usr/bin/sqlite3'),
    },
  });
};
app.get('/api/health', healthHandler);
app.get('/Eduqora/api/health', healthHandler);

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

    // 3. Language-specific Compilation & Execution
    let compileCmd = '';
    let compileArgs: string[] = [];
    let runCmd = '';
    let runArgs: string[] = [];
    let mainFileName = '';

    if (language === 'c') {
      mainFileName = 'main.c';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      compileCmd = '/usr/bin/gcc';
      compileArgs = ['-O2', '-Wall', '-Wextra', 'main.c', '-o', 'main', '-lm'];
      runCmd = path.join(tmpDir, 'main');
      runArgs = [];
    } else if (language === 'cpp') {
      mainFileName = 'main.cpp';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      compileCmd = '/usr/bin/g++';
      compileArgs = ['-O2', '-Wall', '-Wextra', '-std=c++17', 'main.cpp', '-o', 'main'];
      runCmd = path.join(tmpDir, 'main');
      runArgs = [];
    } else if (language === 'java') {
      // Find class name from code e.g. public class Main or public class Solution
      const classMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      const className = classMatch ? classMatch[1] : 'Main';
      mainFileName = `${className}.java`;
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      compileCmd = '/usr/bin/javac';
      compileArgs = [`${className}.java`];
      runCmd = '/usr/bin/java';
      runArgs = ['-cp', tmpDir, className];
    } else if (language === 'python') {
      mainFileName = 'main.py';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      runCmd = '/usr/bin/python3';
      runArgs = ['-u', 'main.py'];
    } else if (language === 'php') {
      mainFileName = 'main.php';
      fs.writeFileSync(path.join(tmpDir, mainFileName), code, 'utf8');
      runCmd = '/usr/bin/php';
      runArgs = ['-f', 'main.php'];
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
    if (compileCmd) {
      const compileResult = await new Promise<{ success: boolean; stderr: string; stdout: string }>((resolve) => {
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
              resolve({ success: false, stderr: stderr || error.message, stdout });
            } else {
              resolve({ success: true, stderr: stderr || '', stdout });
            }
          }
        );
      });

      if (!compileResult.success) {
        const stderr = compileResult.stderr;
        // Parse line number from compiler diagnostic
        const lineMatch = stderr.match(new RegExp(`${mainFileName}:(\\d+):(?:(\\d+):)?\\s*(error:.*)`, 'i'))
          || stderr.match(/:(\d+):\s*error:\s*(.*)/i);

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
          exitCode: 1,
          stdout: compileResult.stdout,
          stderr: compileResult.stderr,
          executionTimeMs,
          errorType: 'Compilation Error',
          errorDetails,
        });
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
          // Parse Python/PHP/Java stack traces for clean diagnostics
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
            const phpMatch = stderr.match(/Fatal error: (.*?) in (.*?) on line (\d+)/i);
            if (phpMatch) {
              errorDetails = {
                file: path.basename(phpMatch[2]),
                line: parseInt(phpMatch[3], 10),
                message: phpMatch[1],
              };
            }
          }
        }

        resolve({
          success: isSuccess,
          exitCode: code ?? (signal ? 137 : 1),
          stdout,
          stderr,
          executionTimeMs,
          errorType,
          errorDetails,
        });
      });

      child.on('error', (err) => {
        clearTimeout(timeoutTimer);
        resolve({
          success: false,
          exitCode: 1,
          stdout,
          stderr: `Process invocation error: ${err.message}`,
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
