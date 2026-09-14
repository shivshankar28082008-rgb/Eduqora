import alasql from 'alasql';
import { ConsoleOutputMessage } from '../types';
import { resolveWebProject, VirtualFile, MissingFileDiagnostic } from './virtualFsResolver';

let isSqlDbInitialized = false;

export function initSqlDatabase(): void {
  if (isSqlDbInitialized) return;
  try {
    alasql(`
      CREATE TABLE IF NOT EXISTS students (
        id INT PRIMARY KEY,
        student_id INT,
        name STRING,
        email STRING,
        track STRING,
        course STRING,
        xp INT,
        joined_date STRING
      );
      
      CREATE TABLE IF NOT EXISTS courses (
        id INT PRIMARY KEY,
        course_id INT,
        title STRING,
        course_title STRING,
        language STRING,
        difficulty STRING,
        lessons_count INT
      );
      
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT PRIMARY KEY,
        enrollment_id INT,
        student_id INT,
        course_id INT,
        score INT,
        grade INT,
        status STRING
      );

      CREATE TABLE IF NOT EXISTS employees (
        id INT PRIMARY KEY,
        name STRING,
        department STRING,
        role STRING,
        salary INT
      );
    `);

    alasql(`
      DELETE FROM students;
      DELETE FROM courses;
      DELETE FROM enrollments;
      DELETE FROM employees;

      INSERT INTO students VALUES 
        (1, 1, 'Alex Rivera', 'alex@eduqora.dev', 'Full-Stack', 'Full-Stack', 1250, '2026-01-10'),
        (2, 2, 'Maya Chen', 'maya@eduqora.dev', 'Frontend', 'Frontend', 980, '2026-01-14'),
        (3, 3, 'Liam Patel', 'liam@eduqora.dev', 'Backend', 'Backend', 1420, '2026-02-01'),
        (4, 4, 'Sofia Rossi', 'sofia@eduqora.dev', 'Data & SQL', 'Data & SQL', 810, '2026-02-18'),
        (5, 5, 'Jordan Lee', 'jordan@eduqora.dev', 'Systems', 'Systems', 1150, '2026-02-25');

      INSERT INTO courses VALUES
        (101, 101, 'HTML5 Foundations', 'HTML5 Foundations', 'HTML', 'Beginner', 20),
        (102, 102, 'Modern CSS & Flexbox', 'Modern CSS & Flexbox', 'CSS', 'Beginner', 18),
        (103, 103, 'JavaScript ES6+ Deep Dive', 'JavaScript ES6+ Deep Dive', 'JavaScript', 'Intermediate', 22),
        (104, 104, 'Python Automation & Logic', 'Python Automation & Logic', 'Python', 'Beginner', 16),
        (105, 105, 'Relational SQL & Database Design', 'Relational SQL & Database Design', 'SQL', 'Beginner', 15);

      INSERT INTO enrollments VALUES
        (1001, 1001, 1, 101, 95, 95, 'Completed'),
        (1002, 1002, 1, 103, 88, 88, 'In Progress'),
        (1003, 1003, 2, 102, 92, 92, 'Completed'),
        (1004, 1004, 3, 104, 96, 96, 'Completed'),
        (1005, 1005, 4, 105, 90, 90, 'Completed'),
        (1006, 1006, 5, 103, 78, 78, 'In Progress');

      INSERT INTO employees VALUES
        (1, 'Sarah Connor', 'Engineering', 'Lead Architect', 125000),
        (2, 'Bruce Wayne', 'Management', 'Director', 160000),
        (3, 'Clark Kent', 'Communications', 'Content Editor', 85000),
        (4, 'Diana Prince', 'Security', 'SecOps Engineer', 115000);
    `);

    isSqlDbInitialized = true;
  } catch (err) {
    console.warn('SQL database initialization notice:', err);
  }
}

export interface ExecutionResult {
  success: boolean;
  messages: ConsoleOutputMessage[];
  sqlResult?: {
    columns: string[];
    rows: any[];
    affectedRows?: number;
    executionTimeMs?: number;
  };
  compiledHtml?: string;
  runtimeError?: string;
  executionId?: string;
  missingFiles?: MissingFileDiagnostic[];
}

export interface BackendExecutionPayload {
  language: string;
  code: string;
  stdin?: string;
  files?: Array<{ name: string; content: string }>;
}

export const executionService = {
  /**
   * Bundles HTML, CSS, and JS using the Virtual File System Resolver.
   * Resolves relative paths, <link rel="stylesheet">, <script src="...">,
   * local assets, and attaches an execution-scoped diagnostic interceptor.
   */
  bundleWebProject(files: VirtualFile[], executionId?: string): ExecutionResult {
    const execId = executionId || `exec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const resolution = resolveWebProject(files, execId);

    const messages: ConsoleOutputMessage[] = [];

    // Report missing files as standardized diagnostic errors
    if (resolution.missingFiles.length > 0) {
      resolution.missingFiles.forEach((mf, i) => {
        messages.push({
          id: `err-missing-${execId}-${i}`,
          type: 'error',
          text: mf.formattedMessage,
          file: mf.referencedBy,
          timestamp: new Date().toLocaleTimeString(),
        });
      });
    }

    return {
      success: resolution.missingFiles.length === 0,
      messages,
      compiledHtml: resolution.compiledHtml,
      executionId: execId,
      missingFiles: resolution.missingFiles,
    };
  },

  /**
   * Real Compiler and Process Runner
   * Uses GCC, G++, OpenJDK, Python 3, or PHP CLI on the backend with process isolation,
   * stdin support, and 5-second timeout protection.
   */
  async executeBackendLanguage(payload: BackendExecutionPayload): Promise<ExecutionResult> {
    const { language, code, stdin = '', files = [] } = payload;
    const startTime = Date.now();
    const lang = language.toLowerCase();

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: lang,
          code,
          stdin,
          files,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return {
          success: false,
          messages: [{
            id: `err-${Date.now()}`,
            type: 'error',
            text: `Server Execution Error (${response.status}): ${errText || response.statusText}`,
            timestamp: new Date().toLocaleTimeString(),
          }],
          runtimeError: errText,
        };
      }

      const data = await response.json();
      const messages: ConsoleOutputMessage[] = [];

      // Process compiler/runtime errors
      if (!data.success) {
        let errorTitle = data.errorType || (lang === 'c' || lang === 'cpp' ? 'Compilation Error' : 'Runtime Error');
        let errorText = '';

        if (data.errorDetails && data.errorDetails.message) {
          const file = data.errorDetails.file || (lang === 'c' ? 'main.c' : (lang === 'cpp' ? 'main.cpp' : 'script'));
          const line = data.errorDetails.line;
          errorText = `${errorTitle}\nFile: ${file}${line ? `\nLine: ${line}` : ''}\nMessage: ${data.errorDetails.message}`;
        } else if (data.stderr) {
          errorText = `${errorTitle}\n${data.stderr.trim()}`;
        } else {
          errorText = `${errorTitle}: Process exited with status code ${data.exitCode}`;
        }

        messages.push({
          id: `err-${Date.now()}`,
          type: 'error',
          text: errorText,
          file: data.errorDetails?.file,
          line: data.errorDetails?.line,
          column: data.errorDetails?.column,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      // Process standard output lines
      if (data.stdout && data.stdout.trim().length > 0) {
        const lines = data.stdout.split('\n');
        lines.forEach((line: string, idx: number) => {
          // If the last line is empty due to trailing newline, skip it
          if (idx === lines.length - 1 && line === '') return;
          messages.push({
            id: `out-${Date.now()}-${idx}`,
            type: 'log',
            text: line,
            timestamp: new Date().toLocaleTimeString(),
          });
        });
      }

      // Process standard error warnings (if process succeeded but produced stderr output)
      if (data.success && data.stderr && data.stderr.trim().length > 0) {
        const errLines = data.stderr.split('\n');
        errLines.forEach((line: string, idx: number) => {
          if (idx === errLines.length - 1 && line === '') return;
          messages.push({
            id: `warn-${Date.now()}-${idx}`,
            type: 'warn',
            text: line,
            timestamp: new Date().toLocaleTimeString(),
          });
        });
      }

      // If program executed with no output and success
      if (data.success && messages.length === 0) {
        messages.push({
          id: `info-${Date.now()}`,
          type: 'info',
          text: `Program finished with exit code 0 (${data.executionTimeMs || Date.now() - startTime}ms).`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      return {
        success: data.success,
        messages,
        runtimeError: !data.success ? data.stderr || 'Execution failed' : undefined,
      };
    } catch (fetchErr: any) {
      return {
        success: false,
        messages: [{
          id: `net-err-${Date.now()}`,
          type: 'error',
          text: `Backend Connection Notice: ${fetchErr.message || String(fetchErr)}. Ensure local backend service is active.`,
          timestamp: new Date().toLocaleTimeString(),
        }],
        runtimeError: fetchErr.message,
      };
    }
  },

  /**
   * Wrapper for Python execution (calls real Python 3 on the backend)
   */
  async executePython(code: string, stdin: string = '', files?: Array<{ name: string; content: string }>): Promise<ExecutionResult> {
    return this.executeBackendLanguage({
      language: 'python',
      code,
      stdin,
      files,
    });
  },

  /**
   * Wrapper for compiled languages: C, C++, Java, PHP (calls GCC, G++, OpenJDK, PHP CLI on backend)
   */
  async executeCompiledLanguage(
    language: string,
    code: string,
    stdin: string = '',
    files?: Array<{ name: string; content: string }>
  ): Promise<ExecutionResult> {
    return this.executeBackendLanguage({
      language,
      code,
      stdin,
      files,
    });
  },

  /**
   * In-Browser Relational SQL Engine with AlaSQL
   * Supports SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, ORDER BY, aggregate functions.
   */
  executeSql(queryText: string): ExecutionResult {
    initSqlDatabase();
    const startTime = performance.now();
    const messages: ConsoleOutputMessage[] = [];

    const cleanQuery = queryText.trim();
    if (!cleanQuery) {
      messages.push({
        id: 'm-empty',
        type: 'warn',
        text: 'Query input is empty. Write an SQL statement (e.g., SELECT * FROM students;) and click Run.',
        timestamp: new Date().toLocaleTimeString(),
      });
      return {
        success: true,
        messages,
        sqlResult: { columns: [], rows: [] },
      };
    }

    try {
      const res = alasql(cleanQuery);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      // Handle multi-statement results
      if (Array.isArray(res)) {
        if (res.length > 0 && Array.isArray(res[0])) {
          let tabularRes: any[] | null = null;
          let affectedTotal = 0;

          res.forEach((subRes, idx) => {
            if (Array.isArray(subRes)) {
              tabularRes = subRes;
              messages.push({
                id: `m-${idx}-${Date.now()}`,
                type: 'log',
                text: `Query #${idx + 1} OK: ${subRes.length} row(s) returned (${executionTimeMs}ms).`,
                timestamp: new Date().toLocaleTimeString(),
              });
            } else if (typeof subRes === 'number') {
              affectedTotal += subRes;
              messages.push({
                id: `m-${idx}-${Date.now()}`,
                type: 'log',
                text: `Query #${idx + 1} OK: ${subRes} row(s) affected (${executionTimeMs}ms).`,
                timestamp: new Date().toLocaleTimeString(),
              });
            }
          });

          if (tabularRes && tabularRes.length > 0 && typeof tabularRes[0] === 'object') {
            const columns = Object.keys(tabularRes[0]);
            return {
              success: true,
              messages,
              sqlResult: {
                columns,
                rows: tabularRes,
                affectedRows: affectedTotal,
                executionTimeMs,
              },
            };
          } else {
            messages.push({
              id: 'm-ok-' + Date.now(),
              type: 'success',
              text: `All statements executed successfully (${affectedTotal} affected rows, ${executionTimeMs}ms).`,
              timestamp: new Date().toLocaleTimeString(),
            });
            return {
              success: true,
              messages,
              sqlResult: {
                columns: ['Status', 'Affected Rows', 'Execution Time'],
                rows: [{ Status: 'SUCCESS', 'Affected Rows': affectedTotal, 'Execution Time': `${executionTimeMs}ms` }],
                affectedRows: affectedTotal,
                executionTimeMs,
              },
            };
          }
        }

        // Standard single SELECT result
        if (res.length > 0 && typeof res[0] === 'object' && !Array.isArray(res[0])) {
          const columns = Object.keys(res[0]);
          messages.push({
            id: 'm-' + Date.now(),
            type: 'log',
            text: `Query OK: ${res.length} row(s) returned (${executionTimeMs}ms).`,
            timestamp: new Date().toLocaleTimeString(),
          });
          return {
            success: true,
            messages,
            sqlResult: {
              columns,
              rows: res,
              executionTimeMs,
            },
          };
        } else {
          // 0 rows returned
          messages.push({
            id: 'm-empty-' + Date.now(),
            type: 'log',
            text: `Query OK: 0 rows returned (Empty set, ${executionTimeMs}ms).`,
            timestamp: new Date().toLocaleTimeString(),
          });
          return {
            success: true,
            messages,
            sqlResult: {
              columns: [],
              rows: [],
              executionTimeMs,
            },
          };
        }
      } else if (typeof res === 'number') {
        // DML like INSERT, UPDATE, DELETE
        messages.push({
          id: 'm-res-' + Date.now(),
          type: 'log',
          text: `Query OK: ${res} row(s) affected (${executionTimeMs}ms).`,
          timestamp: new Date().toLocaleTimeString(),
        });
        return {
          success: true,
          messages,
          sqlResult: {
            columns: ['Status', 'Rows Affected', 'Execution Time'],
            rows: [{ Status: 'SUCCESS', 'Rows Affected': res, 'Execution Time': `${executionTimeMs}ms` }],
            affectedRows: res,
            executionTimeMs,
          },
        };
      } else {
        messages.push({
          id: 'm-res-' + Date.now(),
          type: 'log',
          text: `Query completed: ${JSON.stringify(res)} (${executionTimeMs}ms)`,
          timestamp: new Date().toLocaleTimeString(),
        });
        return {
          success: true,
          messages,
          sqlResult: {
            columns: ['Result'],
            rows: [{ Result: String(res) }],
            executionTimeMs,
          },
        };
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      messages.push({
        id: 'm-err-' + Date.now(),
        type: 'error',
        text: 'SQL Syntax Error: ' + errMsg,
        timestamp: new Date().toLocaleTimeString(),
      });
      return {
        success: false,
        messages,
        runtimeError: errMsg,
      };
    }
  },
};
