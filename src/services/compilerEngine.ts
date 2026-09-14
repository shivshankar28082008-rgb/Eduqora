import { ConsoleOutputMessage } from '../types';

export interface CompilerResult {
  success: boolean;
  messages: ConsoleOutputMessage[];
  runtimeError?: string;
  exitCode: number;
}

/**
 * Creates a formatted console message
 */
function msg(type: 'log' | 'info' | 'warn' | 'error' | 'success', text: string): ConsoleOutputMessage {
  return {
    id: 'msg-' + Math.random().toString(36).slice(2, 9),
    type,
    text,
    timestamp: new Date().toLocaleTimeString(),
  };
}

// ----------------------------------------------------
// 1. ADVANCED PYTHON INTERPRETER
// ----------------------------------------------------
export function runPythonCode(code: string, stdinInput: string = ''): CompilerResult {
  const messages: ConsoleOutputMessage[] = [];
  const lines = code.split('\n');

  if (!code.trim()) {
    return {
      success: false,
      messages: [msg('warn', 'Python interpreter: No code provided to execute.')],
      exitCode: 1,
    };
  }

  // Initialize environment
  const stdinTokens = stdinInput.trim().length > 0 ? stdinInput.trim().split(/\s+/) : ['10', '20', 'test'];
  let stdinIdx = 0;

  // Virtual Python Environment State
  const scope: Record<string, any> = {
    True: true,
    False: false,
    None: null,
    input: (promptText?: string) => {
      if (promptText) messages.push(msg('log', promptText));
      return stdinTokens[stdinIdx++] || '';
    },
  };

  // Helper to evaluate simple python expressions in scope
  function evalPyExpr(expr: string): any {
    let clean = expr.trim();
    if (!clean) return '';

    // Check f-strings e.g. f"Hello {name}, count is {i}"
    if (clean.startsWith('f"') && clean.endsWith('"')) {
      const inner = clean.slice(2, -1);
      return inner.replace(/\{([^}]+)\}/g, (_, exp) => {
        return String(evalPyExpr(exp));
      });
    }
    if (clean.startsWith("f'") && clean.endsWith("'")) {
      const inner = clean.slice(2, -1);
      return inner.replace(/\{([^}]+)\}/g, (_, exp) => {
        return String(evalPyExpr(exp));
      });
    }

    // Check raw string literals
    if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
      return clean.slice(1, -1);
    }

    // Number literal
    if (!isNaN(Number(clean))) {
      return Number(clean);
    }

    // List literal e.g. [1, 2, 3] or ["a", "b"]
    if (clean.startsWith('[') && clean.endsWith(']')) {
      const inner = clean.slice(1, -1).trim();
      if (!inner) return [];
      return inner.split(',').map(item => evalPyExpr(item.trim()));
    }

    // Variable in scope
    if (clean in scope) {
      return scope[clean];
    }

    // len(item)
    const lenMatch = clean.match(/^len\((.+)\)$/);
    if (lenMatch) {
      const val = evalPyExpr(lenMatch[1]);
      return val ? (val.length ?? 0) : 0;
    }

    // Math operations: +, -, *, /, %, **
    try {
      // Replace variable names with their values
      let jsExpr = clean;
      for (const [varName, varVal] of Object.entries(scope)) {
        if (typeof varVal === 'number') {
          const regex = new RegExp(`\\b${varName}\\b`, 'g');
          jsExpr = jsExpr.replace(regex, String(varVal));
        } else if (typeof varVal === 'string') {
          const regex = new RegExp(`\\b${varName}\\b`, 'g');
          jsExpr = jsExpr.replace(regex, JSON.stringify(varVal));
        }
      }
      // Replace python ** with ** (supported in modern JS)
      // eslint-disable-next-line no-eval
      return Function(`"use strict"; return (${jsExpr});`)();
    } catch {
      return clean;
    }
  }

  try {
    let i = 0;
    let loopGuard = 0;

    while (i < lines.length) {
      loopGuard++;
      if (loopGuard > 10000) {
        throw new Error('Execution stopped: Possible infinite loop detected.');
      }

      const rawLine = lines[i];
      const trimmed = rawLine.trim();
      i++;

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // 1. FOR LOOP: for i in range(start, stop, step) or for item in list:
      const forRangeMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\(([^)]+)\)\s*:/);
      if (forRangeMatch) {
        const loopVar = forRangeMatch[1];
        const rangeArgs = forRangeMatch[2].split(',').map(s => Number(evalPyExpr(s)));
        let start = 0, stop = 0, step = 1;
        if (rangeArgs.length === 1) {
          stop = rangeArgs[0];
        } else if (rangeArgs.length === 2) {
          start = rangeArgs[0];
          stop = rangeArgs[1];
        } else if (rangeArgs.length >= 3) {
          start = rangeArgs[0];
          stop = rangeArgs[1];
          step = rangeArgs[2];
        }

        // Collect block lines (indented)
        const blockLines: string[] = [];
        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t') || !lines[i].trim())) {
          blockLines.push(lines[i]);
          i++;
        }

        for (let counter = start; (step > 0 ? counter < stop : counter > stop); counter += step) {
          scope[loopVar] = counter;
          for (const bLine of blockLines) {
            const bTrim = bLine.trim();
            if (!bTrim || bTrim.startsWith('#')) continue;
            executePyStatement(bTrim);
          }
        }
        continue;
      }

      // 2. FOR LOOP: for item in [items]:
      const forListMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+([^:]+)\s*:/);
      if (forListMatch) {
        const loopVar = forListMatch[1];
        const listVal = evalPyExpr(forListMatch[2]);
        const blockLines: string[] = [];
        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t') || !lines[i].trim())) {
          blockLines.push(lines[i]);
          i++;
        }

        if (Array.isArray(listVal)) {
          for (const elem of listVal) {
            scope[loopVar] = elem;
            for (const bLine of blockLines) {
              const bTrim = bLine.trim();
              if (!bTrim || bTrim.startsWith('#')) continue;
              executePyStatement(bTrim);
            }
          }
        }
        continue;
      }

      // 3. IF CONDITIONAL: if condition:
      const ifMatch = trimmed.match(/^if\s+([^:]+)\s*:/);
      if (ifMatch) {
        const condResult = Boolean(evalPyExpr(ifMatch[1]));
        const blockLines: string[] = [];
        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t') || !lines[i].trim())) {
          blockLines.push(lines[i]);
          i++;
        }

        if (condResult) {
          for (const bLine of blockLines) {
            const bTrim = bLine.trim();
            if (!bTrim || bTrim.startsWith('#')) continue;
            executePyStatement(bTrim);
          }
        }
        continue;
      }

      // 4. Regular top-level statement
      executePyStatement(trimmed);
    }

    function executePyStatement(stmt: string) {
      // PRINT statement: print(...)
      if (stmt.startsWith('print(') && stmt.endsWith(')')) {
        const inner = stmt.slice(6, -1);
        if (!inner.trim()) {
          messages.push(msg('log', ''));
          return;
        }

        // Split args considering quotes
        const parts: string[] = [];
        let curr = '';
        let inQuote: string | null = null;
        for (let c = 0; c < inner.length; c++) {
          const ch = inner[c];
          if (inQuote) {
            curr += ch;
            if (ch === inQuote && inner[c - 1] !== '\\') inQuote = null;
          } else if (ch === '"' || ch === "'") {
            inQuote = ch;
            curr += ch;
          } else if (ch === ',') {
            parts.push(curr);
            curr = '';
          } else {
            curr += ch;
          }
        }
        if (curr) parts.push(curr);

        const evaluated = parts.map(p => {
          const res = evalPyExpr(p);
          return typeof res === 'object' && res !== null ? JSON.stringify(res) : String(res);
        }).join(' ');

        messages.push(msg('log', evaluated));
        return;
      }

      // ASSIGNMENT: var = expr
      const assignMatch = stmt.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const val = evalPyExpr(assignMatch[2]);
        scope[varName] = val;
        return;
      }

      // COMPOUND ASSIGNMENT: var += expr
      const compoundMatch = stmt.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\\=)\s*(.+)$/);
      if (compoundMatch) {
        const varName = compoundMatch[1];
        const op = compoundMatch[2];
        const delta = evalPyExpr(compoundMatch[3]);
        if (op === '+=') scope[varName] = (scope[varName] ?? 0) + delta;
        if (op === '-=') scope[varName] = (scope[varName] ?? 0) - delta;
        if (op === '*=') scope[varName] = (scope[varName] ?? 1) * delta;
        return;
      }

      // APPEND: list.append(item)
      const appendMatch = stmt.match(/^([a-zA-Z_]\w*)\.append\((.+)\)$/);
      if (appendMatch) {
        const listName = appendMatch[1];
        const itemVal = evalPyExpr(appendMatch[2]);
        if (Array.isArray(scope[listName])) {
          scope[listName].push(itemVal);
        }
      }
    }

    messages.push(msg('success', '----------------------------------------'));
    messages.push(msg('success', 'Process finished with exit code 0.'));
    return {
      success: true,
      messages,
      exitCode: 0,
    };
  } catch (err: any) {
    messages.push(msg('error', `Traceback (most recent call last):`));
    messages.push(msg('error', `RuntimeError: ${err?.message || String(err)}`));
    return {
      success: false,
      messages,
      runtimeError: err?.message,
      exitCode: 1,
    };
  }
}

// ----------------------------------------------------
// 2. ADVANCED C & C++ VIRTUAL COMPILER & RUNTIME
// ----------------------------------------------------

/**
 * Helper to safely extract string and character literals so they aren't mangled by regex passes
 */
function extractLiterals(source: string): { code: string; literals: string[] } {
  const literals: string[] = [];
  // Match double-quoted strings or single-quoted character constants
  const code = source.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, match => {
    const idx = literals.length;
    literals.push(match);
    return `___LITERAL_${idx}___`;
  });
  return { code, literals };
}

/**
 * Restores extracted string/character literals
 */
function restoreLiterals(source: string, literals: string[]): string {
  return source.replace(/___LITERAL_(\d+)___/g, (_, idxStr) => {
    const idx = parseInt(idxStr, 10);
    return literals[idx] !== undefined ? literals[idx] : '""';
  });
}

/**
 * Robust C-style printf format engine
 */
function formatPrintf(buffer: { text: string }, formatStr: string, ...args: any[]): void {
  // Parse escape sequences like \n, \t
  let str = String(formatStr ?? '');
  let argIdx = 0;

  const formatted = str.replace(/%(?:(\d+)?(?:\.(\d+))?([dfisucxX%]))/g, (match, _width, prec, type) => {
    if (type === '%') return '%';
    if (argIdx >= args.length) return match;
    const val = args[argIdx++];

    if (type === 'd' || type === 'i' || type === 'u') {
      const num = Math.trunc(Number(val) || 0);
      return String(num);
    }
    if (type === 'f') {
      const num = Number(val) || 0;
      if (prec !== undefined) {
        return num.toFixed(parseInt(prec, 10));
      }
      return String(num);
    }
    if (type === 's') {
      return String(val ?? '');
    }
    if (type === 'c') {
      return typeof val === 'number' ? String.fromCharCode(val) : String(val ?? '').charAt(0);
    }
    if (type === 'x') {
      return (Number(val) || 0).toString(16);
    }
    if (type === 'X') {
      return (Number(val) || 0).toString(16).toUpperCase();
    }
    return String(val);
  });

  buffer.text += formatted;
}

export function runCAndCppCode(code: string, language: 'c' | 'cpp', stdinInput: string = ''): CompilerResult {
  const messages: ConsoleOutputMessage[] = [];
  const compilerName = language === 'cpp' ? 'g++ (GCC 14.2.0)' : 'gcc (GCC 14.2.0)';

  if (!code.trim()) {
    return {
      success: false,
      messages: [msg('warn', `Compiler warning: Empty source file.`)],
      exitCode: 1,
    };
  }

  // Check for basic syntax balance
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    messages.push(msg('error', `${compilerName}: error: Mismatched curly braces { }. Found ${openBraces} opening vs ${closeBraces} closing.`));
    return {
      success: false,
      messages,
      runtimeError: 'Syntax error: Mismatched braces',
      exitCode: 1,
    };
  }

  try {
    // 1. Strip comments
    let processed = code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '');

    // 2. Preprocessor handling
    // Extract #define CONST VAL
    const defines: Record<string, string> = {};
    processed = processed.replace(/#define\s+([A-Za-z_]\w*)\s+([^\n]+)/g, (_, name, val) => {
      defines[name] = val.trim();
      return '';
    });

    // Strip other directives (#include, using namespace std)
    processed = processed
      .replace(/#include\s*<[^>]+>/g, '')
      .replace(/#include\s*"[^"]+"/g, '')
      .replace(/#pragma\s+[^\n]+/g, '')
      .replace(/using\s+namespace\s+std\s*;/g, '');

    // Apply #define replacements
    for (const [dName, dVal] of Object.entries(defines)) {
      processed = processed.replace(new RegExp(`\\b${dName}\\b`, 'g'), dVal);
    }

    // 3. Extract string and character literals
    const { code: tokenizedCode, literals } = extractLiterals(processed);
    let jsCode = tokenizedCode;

    // 4. Handle C++ cout << ...
    // Match cout << ... ;
    jsCode = jsCode.replace(/(?:std::)?cout\s*<<\s*([^;]+);/g, (_, chain) => {
      const parts = chain.split('<<').map((p: string) => {
        const item = p.trim();
        if (item === 'endl' || item === 'std::endl') return '"\\n"';
        return `(${item})`;
      });
      return `__cout__(${parts.join(', ')});`;
    });

    // 5. Handle C++ cin >> ...
    jsCode = jsCode.replace(/(?:std::)?cin\s*>>\s*([^;]+);/g, (_, chain) => {
      const vars = chain.split('>>').map((p: string) => p.trim());
      return vars.map((v: string) => `${v} = __cin__();`).join(' ');
    });

    // 6. Handle C printf, puts, putchar
    jsCode = jsCode.replace(/\bprintf\s*\(/g, '__printf__(');
    jsCode = jsCode.replace(/\bputs\s*\(([^)]+)\)/g, '__puts__($1)');
    jsCode = jsCode.replace(/\bputchar\s*\(([^)]+)\)/g, '__putchar__($1)');

    // 7. Handle C scanf("%d", &a)
    jsCode = jsCode.replace(/\bscanf\s*\(([^)]+)\);/g, (_, argsStr) => {
      const args = argsStr.split(',').map((a: string) => a.trim());
      const fmt = args[0];
      const targets = args.slice(1).map((t: string) => t.replace(/^&/, '').trim());
      return targets.map((t: string) => `${t} = __scanf__(${fmt});`).join(' ');
    });

    // 8. Transform function definitions (e.g. int add(int a, int b) { ... })
    jsCode = jsCode.replace(
      /\b(?:int|void|float|double|char\*?|bool|long(?:\s+long)?|size_t|auto|string)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g,
      (_, fnName, params) => {
        // Strip types from parameter list: "int a, float b" -> "a, b"
        const cleanParams = params
          .split(',')
          .map((p: string) => {
            const trimmed = p.trim();
            if (!trimmed || trimmed === 'void') return '';
            // Remove pointer, reference, types
            return trimmed.replace(/\b(?:int|float|double|char\*?|bool|long|size_t|auto|string|const)\b/g, '')
              .replace(/[*&]/g, '')
              .replace(/\[[^\]]*\]/g, '')
              .trim();
          })
          .filter(Boolean)
          .join(', ');
        return `function ${fnName}(${cleanParams}) {`;
      }
    );

    // 9. Transform array declarations
    // int arr[] = {1, 2, 3}; -> let arr = [1, 2, 3];
    jsCode = jsCode.replace(
      /\b(?:int|float|double|char|bool|long|string)\s+([a-zA-Z_]\w*)\s*\[[^\]]*\]\s*=\s*\{([^}]+)\};/g,
      'let $1 = [$2];'
    );
    // int arr[10]; -> let arr = new Array(10).fill(0);
    jsCode = jsCode.replace(
      /\b(?:int|float|double|char|bool|long|string)\s+([a-zA-Z_]\w*)\s*\[(\d+)\]\s*;/g,
      'let $1 = new Array($2).fill(0);'
    );

    // 10. Transform variable declarations: int x = 10; float y = 2.5;
    jsCode = jsCode.replace(
      /\b(?:int|float|double|char|bool|long(?:\s+long)?|short|unsigned|signed|size_t|auto|string)\s+([a-zA-Z_]\w*(?:\s*=\s*[^,;]+)?(?:\s*,\s*[a-zA-Z_]\w*(?:\s*=\s*[^,;]+)?)*);/g,
      'let $1;'
    );

    // 11. Loop protection to prevent infinite freezes
    jsCode = jsCode.replace(/\bfor\s*\(([^;]*);([^;]*);([^)]*)\)\s*\{/g, (match, init, cond, step) => {
      return `for (${init}; ${cond}; ${step}) { if (++__loop_count__ > 50000) throw new Error("Infinite loop detected! (Exceeded 50,000 loop iterations)"); `;
    });
    jsCode = jsCode.replace(/\bwhile\s*\(([^)]+)\)\s*\{/g, (match, cond) => {
      return `while (${cond}) { if (++__loop_count__ > 50000) throw new Error("Infinite loop detected! (Exceeded 50,000 loop iterations)"); `;
    });
    jsCode = jsCode.replace(/\bdo\s*\{/g, () => {
      return `do { if (++__loop_count__ > 50000) throw new Error("Infinite loop detected! (Exceeded 50,000 loop iterations)"); `;
    });

    // 12. Restore literal strings
    let executableJs = restoreLiterals(jsCode, literals);

    // Check if main() exists, if not, auto-wrap top-level code into main()
    const hasMain = executableJs.includes('function main(');
    if (!hasMain) {
      executableJs = `function main() {\n${executableJs}\nreturn 0;\n}`;
    }

    // 13. Assemble the runtime sandbox
    const buffer = { text: '' };
    const flushBuffer = () => {
      if (!buffer.text) return;
      const lines = buffer.text.split('\n');
      for (let i = 0; i < lines.length - 1; i++) {
        messages.push(msg('log', lines[i]));
      }
      buffer.text = lines[lines.length - 1]; // keep remaining un-newlined text
    };

    // Stdin stream setup
    const stdinTokens = stdinInput.trim().length > 0 
      ? stdinInput.trim().split(/\s+/) 
      : ['10', '20', '42', '5', 'Eduqora'];
    let stdinIdx = 0;

    const runtimeEnv = {
      __printf__: (fmt: string, ...args: any[]) => {
        formatPrintf(buffer, fmt, ...args);
        flushBuffer();
      },
      __puts__: (s: any) => {
        buffer.text += String(s ?? '') + '\n';
        flushBuffer();
      },
      __putchar__: (c: any) => {
        buffer.text += typeof c === 'number' ? String.fromCharCode(c) : String(c ?? '').charAt(0);
        flushBuffer();
      },
      __cout__: (...args: any[]) => {
        for (const a of args) {
          buffer.text += a === undefined ? '' : String(a);
        }
        flushBuffer();
      },
      __cin__: () => {
        const val = stdinTokens[stdinIdx++] || '0';
        return !isNaN(Number(val)) ? Number(val) : val;
      },
      __scanf__: (fmt: string) => {
        const val = stdinTokens[stdinIdx++] || '0';
        if (fmt.includes('d') || fmt.includes('i')) return parseInt(val, 10) || 0;
        if (fmt.includes('f')) return parseFloat(val) || 0;
        return val;
      },
      sqrt: Math.sqrt,
      pow: Math.pow,
      abs: Math.abs,
      fabs: Math.abs,
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      min: Math.min,
      max: Math.max,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      rand: () => Math.floor(Math.random() * 32767),
      endl: '\n',
    };

    // Execute in Function constructor sandbox
    const sandboxRunner = new Function(
      'env',
      `
      let __loop_count__ = 0;
      const { 
        __printf__, __puts__, __putchar__, __cout__, __cin__, __scanf__,
        sqrt, pow, abs, fabs, floor, ceil, round, min, max, sin, cos, tan, rand, endl 
      } = env;

      ${executableJs}

      if (typeof main === 'function') {
        return main();
      }
      return 0;
      `
    );

    const exitVal = sandboxRunner(runtimeEnv);
    // Flush remaining text
    if (buffer.text) {
      messages.push(msg('log', buffer.text));
      buffer.text = '';
    }

    const exitCode = typeof exitVal === 'number' ? exitVal : 0;
    return {
      success: true,
      messages,
      exitCode,
    };
  } catch (err: any) {
    messages.push(msg('error', `${compilerName}: runtime exception: ${err?.message || err}`));
    return {
      success: false,
      messages,
      runtimeError: err?.message || String(err),
      exitCode: 1,
    };
  }
}

// ----------------------------------------------------
// 3. ADVANCED JAVA VIRTUAL COMPILER & RUNTIME
// ----------------------------------------------------

class VirtualJavaScanner {
  private tokens: string[];
  private idx: number = 0;
  constructor(inputStr?: string) {
    const clean = (inputStr || '').trim();
    this.tokens = clean.length > 0 ? clean.split(/\s+/) : ['10', '25', 'Hello', '100'];
  }
  hasNext(): boolean {
    return this.idx < this.tokens.length;
  }
  hasNextInt(): boolean {
    return this.hasNext() && !isNaN(Number(this.tokens[this.idx]));
  }
  next(): string {
    return this.tokens[this.idx++] || '';
  }
  nextInt(): number {
    const t = this.tokens[this.idx++];
    return t ? parseInt(t, 10) || 0 : 0;
  }
  nextDouble(): number {
    const t = this.tokens[this.idx++];
    return t ? parseFloat(t) || 0 : 0;
  }
  nextFloat(): number {
    return this.nextDouble();
  }
  nextLine(): string {
    return this.next();
  }
}

export function runJavaCode(code: string, stdinInput: string = ''): CompilerResult {
  const messages: ConsoleOutputMessage[] = [];
  if (!code.trim()) {
    return {
      success: false,
      messages: [msg('warn', 'Java compiler: Empty source file.')],
      exitCode: 1,
    };
  }

  // Check curly brace balance
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    messages.push(msg('error', `Main.java: error: Mismatched braces { }. Found ${openBraces} opening vs ${closeBraces} closing.`));
    return {
      success: false,
      messages,
      runtimeError: 'Compilation error: Mismatched braces',
      exitCode: 1,
    };
  }

  try {
    // 1. Remove comments
    let processed = code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '');

    // 2. Remove package and import lines
    processed = processed
      .replace(/package\s+[\w.]+;/g, '')
      .replace(/import\s+[\w.*]+;/g, '');

    // 3. Extract literals
    const { code: tokenizedCode, literals } = extractLiterals(processed);
    let jsCode = tokenizedCode;

    // 4. Handle System.out.println / print / printf
    jsCode = jsCode.replace(/System\.out\.println\s*\(([\s\S]*?)\);/g, '__println__($1);');
    jsCode = jsCode.replace(/System\.out\.print\s*\(([\s\S]*?)\);/g, '__print__($1);');
    jsCode = jsCode.replace(/System\.out\.printf\s*\(([\s\S]*?)\);/g, '__printf__($1);');

    // 5. Handle Scanner
    jsCode = jsCode.replace(/Scanner\s+([a-zA-Z_]\w*)\s*=\s*new\s+Scanner\s*\([^)]*\);/g, 'let $1 = new __Scanner__();');

    // 6. Enhanced for loop: for (int x : arr) -> for (let x of arr)
    jsCode = jsCode.replace(/for\s*\(\s*(?:int|double|float|String|boolean|char|long|auto|var)\s+([a-zA-Z_]\w*)\s*:\s*([^)]+)\)/g, 'for (let $1 of $2)');

    // 7. Handle Arrays:
    // int[] arr = {1, 2, 3}; -> let arr = [1, 2, 3];
    jsCode = jsCode.replace(
      /(?:int|double|float|String|boolean|char|long)(?:\[\]|\s+[a-zA-Z_]\w*\[\])\s*([a-zA-Z_]\w*)\s*=\s*\{([^}]+)\};/g,
      'let $1 = [$2];'
    );
    // int[] arr = new int[5]; -> let arr = new Array(5).fill(0);
    jsCode = jsCode.replace(
      /(?:int|double|float|String|boolean|char|long)\[\]\s+([a-zA-Z_]\w*)\s*=\s*new\s+(?:int|double|float|String|boolean|char|long)\[(\d+)\];/g,
      'let $1 = new Array($2).fill(0);'
    );

    // 8. Handle static methods inside class
    jsCode = jsCode.replace(
      /(?:public|private|protected)?\s*static\s+(?:void|int|double|float|String|boolean|long|char|int\[\]|String\[\])\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g,
      (_, fnName, params) => {
        const cleanParams = params
          .split(',')
          .map((p: string) => {
            const t = p.trim();
            if (!t) return '';
            return t.replace(/\b(?:int|double|float|String|boolean|long|char|final)\b/g, '')
              .replace(/\[[^\]]*\]/g, '')
              .trim();
          })
          .filter(Boolean)
          .join(', ');
        return `function ${fnName}(${cleanParams}) {`;
      }
    );

    // Strip class Main { envelope
    jsCode = jsCode.replace(/(?:public\s+)?class\s+[a-zA-Z_]\w*\s*\{/g, '/* class wrapper */');
    // Replace the trailing brace of the class
    const lastBraceIdx = jsCode.lastIndexOf('}');
    if (lastBraceIdx >= 0) {
      jsCode = jsCode.substring(0, lastBraceIdx) + '/* end class */' + jsCode.substring(lastBraceIdx + 1);
    }

    // 9. Handle variable declarations: int a = 10; String s = "hi";
    jsCode = jsCode.replace(
      /\b(?:int|double|float|String|boolean|long|char|byte|short|final)\s+([a-zA-Z_]\w*(?:\s*=\s*[^,;]+)?(?:\s*,\s*[a-zA-Z_]\w*(?:\s*=\s*[^,;]+)?)*);/g,
      'let $1;'
    );

    // 10. Loop protection
    jsCode = jsCode.replace(/\bfor\s*\(([^;]*);([^;]*);([^)]*)\)\s*\{/g, (match, init, cond, step) => {
      return `for (${init}; ${cond}; ${step}) { if (++__loop_count__ > 50000) throw new Error("Infinite loop detected! (Exceeded 50,000 iterations)"); `;
    });
    jsCode = jsCode.replace(/\bwhile\s*\(([^)]+)\)\s*\{/g, (match, cond) => {
      return `while (${cond}) { if (++__loop_count__ > 50000) throw new Error("Infinite loop detected! (Exceeded 50,000 iterations)"); `;
    });
    jsCode = jsCode.replace(/\bdo\s*\{/g, () => {
      return `do { if (++__loop_count__ > 50000) throw new Error("Infinite loop detected! (Exceeded 50,000 iterations)"); `;
    });

    // 11. Restore string literals
    let executableJs = restoreLiterals(jsCode, literals);

    // Check if main() exists
    const hasMain = executableJs.includes('function main(');
    if (!hasMain) {
      executableJs = `function main() {\n${executableJs}\n}`;
    }

    // 12. Buffer & Runtime Setup
    const buffer = { text: '' };
    const flushBuffer = () => {
      if (!buffer.text) return;
      const lines = buffer.text.split('\n');
      for (let i = 0; i < lines.length - 1; i++) {
        messages.push(msg('log', lines[i]));
      }
      buffer.text = lines[lines.length - 1];
    };

    const runtimeEnv = {
      __println__: (...args: any[]) => {
        const out = args.map(a => (a === undefined ? 'null' : String(a))).join('');
        buffer.text += out + '\n';
        flushBuffer();
      },
      __print__: (...args: any[]) => {
        const out = args.map(a => (a === undefined ? 'null' : String(a))).join('');
        buffer.text += out;
        flushBuffer();
      },
      __printf__: (fmt: string, ...args: any[]) => {
        formatPrintf(buffer, fmt, ...args);
        flushBuffer();
      },
      __Scanner__: function() {
        return new VirtualJavaScanner(stdinInput);
      },
      Math: Math,
    };

    const sandboxRunner = new Function(
      'env',
      `
      let __loop_count__ = 0;
      const { __println__, __print__, __printf__, __Scanner__, Math } = env;

      ${executableJs}

      if (typeof main === 'function') {
        return main([]);
      }
      return 0;
      `
    );

    sandboxRunner(runtimeEnv);

    if (buffer.text) {
      messages.push(msg('log', buffer.text));
      buffer.text = '';
    }

    return {
      success: true,
      messages,
      exitCode: 0,
    };
  } catch (err: any) {
    messages.push(msg('error', `Exception in thread "main" java.lang.RuntimeException: ${err?.message || err}`));
    return {
      success: false,
      messages,
      runtimeError: err?.message || String(err),
      exitCode: 1,
    };
  }
}

// ----------------------------------------------------
// 4. ADVANCED PHP 8.3 CLI INTERPRETER
// ----------------------------------------------------
export function runPhpCode(code: string): CompilerResult {
  const messages: ConsoleOutputMessage[] = [];
  if (!code.trim()) {
    return {
      success: false,
      messages: [msg('warn', 'PHP CLI: No code provided.')],
      exitCode: 1,
    };
  }

  messages.push(msg('info', 'PHP 8.3.1 (cli) (built: Zend Engine v4.3.1)'));

  const mem: Record<string, any> = {};

  try {
    // Strip <?php and ?>
    const clean = code.replace(/<\?php/gi, '').replace(/\?>/gi, '');
    const lines = clean.split('\n');

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('//') || line.startsWith('#')) continue;

      // Variable assignment: $var = "value"; or $num = 123;
      const varMatch = line.match(/^\$([a-zA-Z_]\w*)\s*=\s*([^;]+);/);
      if (varMatch) {
        const vName = varMatch[1];
        const vVal = varMatch[2].trim();
        if ((vVal.startsWith('"') && vVal.endsWith('"')) || (vVal.startsWith("'") && vVal.endsWith("'"))) {
          mem[vName] = vVal.slice(1, -1);
        } else if (!isNaN(Number(vVal))) {
          mem[vName] = Number(vVal);
        } else {
          mem[vName] = vVal;
        }
        continue;
      }

      // echo "Hello $name\n"; or echo $var;
      const echoMatch = line.match(/^echo\s+([^;]+);/);
      if (echoMatch) {
        let content = echoMatch[1].trim();

        // Concatenation with . e.g. "Hello " . $name . "\n"
        const parts = content.split(/\s+\.\s+/);
        let out = '';
        for (const part of parts) {
          const p = part.trim();
          if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
            let inner = p.slice(1, -1).replace(/\\n/g, '\n');
            // Interpolate variables inside double quotes
            inner = inner.replace(/\$([a-zA-Z_]\w*)/g, (_, name) => {
              return name in mem ? String(mem[name]) : `$${name}`;
            });
            out += inner;
          } else if (p.startsWith('$')) {
            const name = p.slice(1);
            out += name in mem ? String(mem[name]) : '';
          } else {
            out += p;
          }
        }

        out.split('\n').forEach(l => {
          if (l) messages.push(msg('log', l));
        });
      }
    }

    return {
      success: true,
      messages,
      exitCode: 0,
    };
  } catch (err: any) {
    messages.push(msg('error', `PHP Fatal error: ${err?.message}`));
    return {
      success: false,
      messages,
      runtimeError: err?.message,
      exitCode: 255,
    };
  }
}
