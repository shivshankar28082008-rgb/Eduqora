export type SuggestionKind = 
  | 'keyword' 
  | 'function' 
  | 'tag' 
  | 'property' 
  | 'snippet' 
  | 'type' 
  | 'variable';

export interface CodeSuggestion {
  label: string;
  kind: SuggestionKind;
  detail: string;
  documentation: string;
  insertText: string;
  cursorOffset?: number; // Relative to insertText length or custom offset
}

// 1. HTML SUGGESTIONS
const HTML_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: 'html5',
    kind: 'snippet',
    detail: 'HTML5 Boilerplate template',
    documentation: 'Generates standard HTML5 document structure with head, meta, title, and body tags.',
    insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
    cursorOffset: 168
  },
  {
    label: 'div',
    kind: 'tag',
    detail: '<div>...</div>',
    documentation: 'Generic flow container for grouping content and layout styling.',
    insertText: '<div className="">\n  \n</div>',
    cursorOffset: 17
  },
  {
    label: 'button',
    kind: 'tag',
    detail: '<button>...</button>',
    documentation: 'Clickable interactive button element with type, onclick, and classes.',
    insertText: '<button type="button">\n  \n</button>',
    cursorOffset: 24
  },
  {
    label: 'h1',
    kind: 'tag',
    detail: '<h1>...</h1>',
    documentation: 'Top-level primary page heading.',
    insertText: '<h1></h1>',
    cursorOffset: 4
  },
  {
    label: 'h2',
    kind: 'tag',
    detail: '<h2>...</h2>',
    documentation: 'Secondary sub-heading.',
    insertText: '<h2></h2>',
    cursorOffset: 4
  },
  {
    label: 'p',
    kind: 'tag',
    detail: '<p>...</p>',
    documentation: 'Paragraph text element for prose and copy.',
    insertText: '<p></p>',
    cursorOffset: 3
  },
  {
    label: 'span',
    kind: 'tag',
    detail: '<span>...</span>',
    documentation: 'Inline generic container for text phrasing.',
    insertText: '<span></span>',
    cursorOffset: 6
  },
  {
    label: 'a',
    kind: 'tag',
    detail: '<a href="...">...</a>',
    documentation: 'Hyperlink anchor element pointing to an external or internal URL.',
    insertText: '<a href="#" target="_blank"></a>',
    cursorOffset: 27
  },
  {
    label: 'img',
    kind: 'tag',
    detail: '<img src="" alt="" />',
    documentation: 'Embeds an image from an absolute or relative source URI.',
    insertText: '<img src="" alt="" />',
    cursorOffset: 10
  },
  {
    label: 'input',
    kind: 'tag',
    detail: '<input type="text" />',
    documentation: 'Form input field accepting user data entry.',
    insertText: '<input type="text" placeholder="" />',
    cursorOffset: 27
  },
  {
    label: 'form',
    kind: 'tag',
    detail: '<form>...</form>',
    documentation: 'Interactive form container for user submissions.',
    insertText: '<form onsubmit="return false;">\n  \n</form>',
    cursorOffset: 33
  },
  {
    label: 'ul',
    kind: 'tag',
    detail: '<ul><li></li></ul>',
    documentation: 'Unordered list container.',
    insertText: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
    cursorOffset: 13
  },
  {
    label: 'table',
    kind: 'snippet',
    detail: '<table>...</table>',
    documentation: 'Tabular data container with thead, tr, th, tbody, and td cells.',
    insertText: '<table>\n  <thead>\n    <tr><th>Header</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Data</td></tr>\n  </tbody>\n</table>',
    cursorOffset: 31
  },
  {
    label: 'script',
    kind: 'tag',
    detail: '<script>...</script>',
    documentation: 'Embeds client-side JavaScript execution block.',
    insertText: '<script>\n  \n</script>',
    cursorOffset: 10
  },
  {
    label: 'style',
    kind: 'tag',
    detail: '<style>...</style>',
    documentation: 'Embeds document stylesheet CSS rules.',
    insertText: '<style>\n  \n</style>',
    cursorOffset: 9
  }
];

// 2. CSS SUGGESTIONS
const CSS_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: 'display: flex',
    kind: 'property',
    detail: 'display: flex;',
    documentation: 'Enables flexible box layout model for dynamic direction, alignment, and distribution.',
    insertText: 'display: flex;',
  },
  {
    label: 'display: grid',
    kind: 'property',
    detail: 'display: grid;',
    documentation: 'Enables 2D CSS grid layout with columns and rows.',
    insertText: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\ngap: 16px;',
  },
  {
    label: 'align-items',
    kind: 'property',
    detail: 'align-items: center;',
    documentation: 'Aligns flex or grid items along the cross axis.',
    insertText: 'align-items: center;',
  },
  {
    label: 'justify-content',
    kind: 'property',
    detail: 'justify-content: center;',
    documentation: 'Aligns items along the main axis (center, space-between, space-around).',
    insertText: 'justify-content: center;',
  },
  {
    label: 'background-color',
    kind: 'property',
    detail: 'background-color: #color;',
    documentation: 'Sets the background surface color of the element.',
    insertText: 'background-color: #1e293b;',
  },
  {
    label: 'border-radius',
    kind: 'property',
    detail: 'border-radius: 12px;',
    documentation: 'Rounds the outer corner borders of the container box.',
    insertText: 'border-radius: 12px;',
  },
  {
    label: 'padding',
    kind: 'property',
    detail: 'padding: 16px;',
    documentation: 'Sets interior whitespace between container edge and children.',
    insertText: 'padding: 16px;',
  },
  {
    label: 'margin',
    kind: 'property',
    detail: 'margin: 0 auto;',
    documentation: 'Sets exterior clearance space surrounding the box.',
    insertText: 'margin: 0 auto;',
  },
  {
    label: 'color',
    kind: 'property',
    detail: 'color: #ffffff;',
    documentation: 'Sets foreground font and icon color.',
    insertText: 'color: #f8fafc;',
  },
  {
    label: 'font-size',
    kind: 'property',
    detail: 'font-size: 16px;',
    documentation: 'Specifies font size dimension.',
    insertText: 'font-size: 16px;',
  },
  {
    label: 'font-weight',
    kind: 'property',
    detail: 'font-weight: 600;',
    documentation: 'Sets font stroke thickness (400, 500, 600, 700, bold).',
    insertText: 'font-weight: 600;',
  },
  {
    label: 'box-shadow',
    kind: 'property',
    detail: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);',
    documentation: 'Adds soft atmospheric elevation shadow beneath the element.',
    insertText: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);',
  },
  {
    label: 'transition',
    kind: 'property',
    detail: 'transition: all 0.2s ease;',
    documentation: 'Animates smooth property transitions during hover or focus state changes.',
    insertText: 'transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);',
  },
  {
    label: '@media (max-width)',
    kind: 'snippet',
    detail: '@media (max-width: 768px) { ... }',
    documentation: 'Responsive media query breakpoint for tablet and mobile screens.',
    insertText: '@media (max-width: 768px) {\n  \n}',
    cursorOffset: 29
  }
];

// 3. JAVASCRIPT SUGGESTIONS
const JS_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: 'console.log',
    kind: 'function',
    detail: 'console.log(...data: any[]): void',
    documentation: 'Prints messages, objects, or formatted diagnostics to the developer console.',
    insertText: 'console.log();',
    cursorOffset: 12
  },
  {
    label: 'console.error',
    kind: 'function',
    detail: 'console.error(...data: any[]): void',
    documentation: 'Outputs an error diagnostic to the console with high-priority styling.',
    insertText: 'console.error();',
    cursorOffset: 14
  },
  {
    label: 'const',
    kind: 'keyword',
    detail: 'const name = value',
    documentation: 'Declares an immutable block-scoped constant reference.',
    insertText: 'const  = ;',
    cursorOffset: 6
  },
  {
    label: 'let',
    kind: 'keyword',
    detail: 'let variable = value',
    documentation: 'Declares a reassignable block-scoped local variable.',
    insertText: 'let  = ;',
    cursorOffset: 4
  },
  {
    label: 'function',
    kind: 'keyword',
    detail: 'function name(params) { ... }',
    documentation: 'Defines a named reusable function statement.',
    insertText: 'function name(param) {\n  return param;\n}',
    cursorOffset: 9
  },
  {
    label: 'arrow function',
    kind: 'snippet',
    detail: 'const fn = () => { ... }',
    documentation: 'ES6 concise arrow function expression.',
    insertText: 'const fn = () => {\n  \n};',
    cursorOffset: 20
  },
  {
    label: 'for loop',
    kind: 'snippet',
    detail: 'for (let i = 0; i < length; i++)',
    documentation: 'Iterates a counter across an indexed sequence or array.',
    insertText: 'for (let i = 0; i < length; i++) {\n  \n}',
    cursorOffset: 37
  },
  {
    label: 'document.querySelector',
    kind: 'function',
    detail: 'document.querySelector(selectors)',
    documentation: 'Returns the first matching element in the DOM for the given CSS selector.',
    insertText: 'document.querySelector("")',
    cursorOffset: 24
  },
  {
    label: 'document.getElementById',
    kind: 'function',
    detail: 'document.getElementById(id)',
    documentation: 'Retrieves an element matching the given unique ID attribute.',
    insertText: 'document.getElementById("")',
    cursorOffset: 24
  },
  {
    label: 'addEventListener',
    kind: 'function',
    detail: 'element.addEventListener(type, listener)',
    documentation: 'Attaches an event handler function (e.g. click, submit, keydown) to an element.',
    insertText: 'addEventListener("click", (e) => {\n  \n});',
    cursorOffset: 36
  },
  {
    label: 'fetch API',
    kind: 'snippet',
    detail: 'fetch(url).then(res => res.json())',
    documentation: 'Makes asynchronous HTTP network requests to external web services.',
    insertText: 'fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));',
    cursorOffset: 6
  },
  {
    label: 'async/await function',
    kind: 'snippet',
    detail: 'async function getData() { const res = await fetch(...) }',
    documentation: 'Creates an asynchronous function that pauses on promise resolution with clean syntax.',
    insertText: 'async function loadData() {\n  try {\n    const res = await fetch("https://api.example.com/data");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}',
    cursorOffset: 25
  },
  {
    label: 'JSON.stringify',
    kind: 'function',
    detail: 'JSON.stringify(value, replacer, space)',
    documentation: 'Serializes a JavaScript object into a JSON formatted string.',
    insertText: 'JSON.stringify(data, null, 2)',
    cursorOffset: 15
  },
  {
    label: 'JSON.parse',
    kind: 'function',
    detail: 'JSON.parse(text)',
    documentation: 'Parses a JSON string back into a JavaScript object or array.',
    insertText: 'JSON.parse()',
    cursorOffset: 11
  },
  {
    label: 'setTimeout',
    kind: 'function',
    detail: 'setTimeout(callback, ms)',
    documentation: 'Schedules a function execution after a given millisecond delay.',
    insertText: 'setTimeout(() => {\n  \n}, 1000);',
    cursorOffset: 20
  }
];

// 4. PYTHON SUGGESTIONS
const PYTHON_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: 'print',
    kind: 'function',
    detail: 'print(*values, sep=" ", end="\\n")',
    documentation: 'Prints representations of values to standard output.',
    insertText: 'print()',
    cursorOffset: 6
  },
  {
    label: 'def function',
    kind: 'snippet',
    detail: 'def function_name(param): ...',
    documentation: 'Defines a Python function block with arguments and return statement.',
    insertText: 'def calculate(a, b):\n    return a + b',
    cursorOffset: 4
  },
  {
    label: 'for in range',
    kind: 'snippet',
    detail: 'for i in range(n):',
    documentation: 'Iterates through an integer sequence generated by range().',
    insertText: 'for i in range(5):\n    print(f"Index: {i}")',
    cursorOffset: 15
  },
  {
    label: 'for in list',
    kind: 'snippet',
    detail: 'for item in collection:',
    documentation: 'Iterates through every element in an iterable collection.',
    insertText: 'for item in items:\n    print(item)',
    cursorOffset: 12
  },
  {
    label: 'if elif else',
    kind: 'snippet',
    detail: 'if condition: ... elif ... else:',
    documentation: 'Conditional control flow branching.',
    insertText: 'if score >= 90:\n    print("Grade: A")\nelif score >= 75:\n    print("Grade: B")\nelse:\n    print("Keep practicing!")',
    cursorOffset: 15
  },
  {
    label: 'while loop',
    kind: 'snippet',
    detail: 'while condition:',
    documentation: 'Executes statements while the condition remains truthy.',
    insertText: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1',
    cursorOffset: 8
  },
  {
    label: 'class',
    kind: 'keyword',
    detail: 'class MyClass: def __init__(self):',
    documentation: 'Defines an object-oriented Python class blueprint.',
    insertText: 'class Student:\n    def __init__(self, name, track):\n        self.name = name\n        self.track = track',
    cursorOffset: 6
  },
  {
    label: 'try except',
    kind: 'snippet',
    detail: 'try: ... except Exception as e:',
    documentation: 'Catches and handles runtime exceptions gracefully.',
    insertText: 'try:\n    result = 10 / divisor\nexcept ZeroDivisionError as e:\n    print("Cannot divide by zero!")',
    cursorOffset: 4
  },
  {
    label: 'list comprehension',
    kind: 'snippet',
    detail: '[x * 2 for x in items if x > 0]',
    documentation: 'Concise inline syntax for mapping and filtering iterable lists.',
    insertText: '[x ** 2 for x in range(10)]',
    cursorOffset: 1
  },
  {
    label: 'len',
    kind: 'function',
    detail: 'len(s) -> int',
    documentation: 'Returns the number of items in a string, list, tuple, or dictionary.',
    insertText: 'len()',
    cursorOffset: 4
  },
  {
    label: 'range',
    kind: 'function',
    detail: 'range(stop) or range(start, stop[, step])',
    documentation: 'Yields a sequence of integers from start to stop.',
    insertText: 'range(0, 10)',
    cursorOffset: 6
  },
  {
    label: 'import',
    kind: 'keyword',
    detail: 'import module / from module import item',
    documentation: 'Imports standard library packages like math, random, json.',
    insertText: 'import math\n',
    cursorOffset: 12
  }
];

// 5. SQL SUGGESTIONS
const SQL_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: 'SELECT * FROM',
    kind: 'snippet',
    detail: 'SELECT * FROM table_name',
    documentation: 'Queries and returns all columns from the target table.',
    insertText: 'SELECT * FROM students;',
    cursorOffset: 14
  },
  {
    label: 'SELECT with WHERE',
    kind: 'snippet',
    detail: 'SELECT cols FROM table WHERE condition',
    documentation: 'Filters returned rows by specified boolean condition criteria.',
    insertText: 'SELECT id, name, track\nFROM students\nWHERE xp > 1000;',
    cursorOffset: 35
  },
  {
    label: 'INNER JOIN',
    kind: 'snippet',
    detail: 'SELECT ... FROM a INNER JOIN b ON a.id = b.a_id',
    documentation: 'Combines rows from two tables where the joining condition matches.',
    insertText: 'SELECT s.name, c.title, e.score\nFROM enrollments e\nINNER JOIN students s ON e.student_id = s.id\nINNER JOIN courses c ON e.course_id = c.id;',
    cursorOffset: 45
  },
  {
    label: 'GROUP BY and COUNT',
    kind: 'snippet',
    detail: 'SELECT track, COUNT(*) FROM students GROUP BY track',
    documentation: 'Aggregates row counts across unique grouping categories.',
    insertText: 'SELECT track, COUNT(*) as total_students, AVG(xp) as avg_xp\nFROM students\nGROUP BY track;',
    cursorOffset: 20
  },
  {
    label: 'ORDER BY',
    kind: 'keyword',
    detail: 'ORDER BY column DESC / ASC',
    documentation: 'Sorts the resulting query rows ascending or descending.',
    insertText: 'ORDER BY xp DESC',
    cursorOffset: 9
  },
  {
    label: 'INSERT INTO',
    kind: 'snippet',
    detail: 'INSERT INTO table (cols) VALUES (vals);',
    documentation: 'Inserts one or more new record rows into a table.',
    insertText: 'INSERT INTO students (id, name, email, track, xp, joined_date)\nVALUES (6, "Sam Green", "sam@eduqora.dev", "Frontend", 500, "2026-03-01");',
    cursorOffset: 25
  },
  {
    label: 'UPDATE',
    kind: 'snippet',
    detail: 'UPDATE table SET col = val WHERE condition;',
    documentation: 'Modifies existing row column values based on a filter.',
    insertText: 'UPDATE students\nSET xp = xp + 100\nWHERE id = 1;',
    cursorOffset: 15
  },
  {
    label: 'DELETE FROM',
    kind: 'snippet',
    detail: 'DELETE FROM table WHERE condition;',
    documentation: 'Removes rows matching the specified condition filter.',
    insertText: 'DELETE FROM enrollments\nWHERE score < 60;',
    cursorOffset: 12
  }
];

// 6. C & C++ SUGGESTIONS
const C_CPP_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: '#include <stdio.h>',
    kind: 'snippet',
    detail: '#include <stdio.h>',
    documentation: 'Standard input/output header for C printf, scanf, puts.',
    insertText: '#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}',
    cursorOffset: 48
  },
  {
    label: '#include <iostream>',
    kind: 'snippet',
    detail: '#include <iostream> using namespace std;',
    documentation: 'Standard modern C++ stream header for cout, cin, and endl.',
    insertText: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}',
    cursorOffset: 65
  },
  {
    label: 'printf',
    kind: 'function',
    detail: 'printf(const char *format, ...)',
    documentation: 'Outputs formatted string to stdout with conversion specifiers like %d, %s, %f.',
    insertText: 'printf("%s\\n", );',
    cursorOffset: 15
  },
  {
    label: 'cout <<',
    kind: 'function',
    detail: 'cout << value << endl;',
    documentation: 'Stream insertion operator printing values to standard output in C++.',
    insertText: 'cout << "" << endl;',
    cursorOffset: 9
  },
  {
    label: 'int main()',
    kind: 'snippet',
    detail: 'int main() { ... return 0; }',
    documentation: 'Entry point function required for every C and C++ executable binary.',
    insertText: 'int main() {\n    \n    return 0;\n}',
    cursorOffset: 17
  },
  {
    label: 'for loop (C)',
    kind: 'snippet',
    detail: 'for (int i = 0; i < n; i++)',
    documentation: 'Standard counted loop iteration.',
    insertText: 'for (int i = 0; i < 5; i++) {\n    printf("Count: %d\\n", i);\n}',
    cursorOffset: 20
  },
  {
    label: 'if else (C)',
    kind: 'snippet',
    detail: 'if (condition) { ... } else { ... }',
    documentation: 'Evaluates conditional expression.',
    insertText: 'if (score >= 80) {\n    printf("Passed\\n");\n} else {\n    printf("Try Again\\n");\n}',
    cursorOffset: 4
  }
];

// 7. JAVA SUGGESTIONS
const JAVA_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: 'public class Main',
    kind: 'snippet',
    detail: 'public class Main { public static void main ... }',
    documentation: 'Generates standard Java executable class with static void main entry method.',
    insertText: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Eduqora Java!");\n    }\n}',
    cursorOffset: 77
  },
  {
    label: 'System.out.println',
    kind: 'function',
    detail: 'System.out.println(String x)',
    documentation: 'Prints an argument to the standard console and terminates the line.',
    insertText: 'System.out.println();',
    cursorOffset: 19
  },
  {
    label: 'System.out.print',
    kind: 'function',
    detail: 'System.out.print(String x)',
    documentation: 'Prints an argument to console without a trailing newline.',
    insertText: 'System.out.print();',
    cursorOffset: 17
  },
  {
    label: 'for loop (Java)',
    kind: 'snippet',
    detail: 'for (int i = 0; i < n; i++)',
    documentation: 'Standard Java index-controlled for loop.',
    insertText: 'for (int i = 0; i < 5; i++) {\n    System.out.println("Step: " + i);\n}',
    cursorOffset: 20
  },
  {
    label: 'String',
    kind: 'type',
    detail: 'String variable = "text";',
    documentation: 'Immutable sequence of characters in Java.',
    insertText: 'String message = "Hello";',
    cursorOffset: 7
  },
  {
    label: 'int',
    kind: 'type',
    detail: 'int num = 100;',
    documentation: '32-bit signed two\'s complement integer primitive type.',
    insertText: 'int count = 0;',
    cursorOffset: 4
  }
];

// 8. PHP SUGGESTIONS
const PHP_SUGGESTIONS: CodeSuggestion[] = [
  {
    label: '<?php',
    kind: 'snippet',
    detail: '<?php ... ?>',
    documentation: 'Standard PHP opening script block tag.',
    insertText: '<?php\n\necho "Hello from PHP 8.3!\\n";\n?>',
    cursorOffset: 7
  },
  {
    label: 'echo',
    kind: 'function',
    detail: 'echo string $arg1, ...',
    documentation: 'Outputs one or more string expressions to the page or console.',
    insertText: 'echo "";',
    cursorOffset: 6
  },
  {
    label: '$variable',
    kind: 'variable',
    detail: '$var = "value";',
    documentation: 'PHP dynamic variable definition preceded with dollar sign ($).',
    insertText: '$message = "Welcome to Eduqora";\necho $message;',
    cursorOffset: 1
  },
  {
    label: 'foreach loop',
    kind: 'snippet',
    detail: 'foreach ($array as $item)',
    documentation: 'Iterates through each element in an indexed or associative array.',
    insertText: '$fruits = ["Apple", "Banana", "Cherry"];\nforeach ($fruits as $fruit) {\n    echo $fruit . "\\n";\n}',
    cursorOffset: 41
  },
  {
    label: 'function (PHP)',
    kind: 'snippet',
    detail: 'function name($param) { return ...; }',
    documentation: 'Defines a reusable PHP function.',
    insertText: 'function add($a, $b) {\n    return $a + $b;\n}',
    cursorOffset: 9
  }
];

export const intellisenseService = {
  getSuggestions(language: string, currentCode: string, cursorIndex: number): {
    suggestions: CodeSuggestion[];
    prefix: string;
    wordStart: number;
  } {
    // 1. Determine active dictionary for language
    let dict: CodeSuggestion[] = [];
    const lang = language.toLowerCase();

    if (lang === 'html') {
      dict = [...HTML_SUGGESTIONS, ...CSS_SUGGESTIONS, ...JS_SUGGESTIONS];
    } else if (lang === 'css') {
      dict = CSS_SUGGESTIONS;
    } else if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
      dict = JS_SUGGESTIONS;
    } else if (lang === 'python' || lang === 'py') {
      dict = PYTHON_SUGGESTIONS;
    } else if (lang === 'sql') {
      dict = SQL_SUGGESTIONS;
    } else if (lang === 'c' || lang === 'cpp') {
      dict = C_CPP_SUGGESTIONS;
    } else if (lang === 'java') {
      dict = JAVA_SUGGESTIONS;
    } else if (lang === 'php') {
      dict = PHP_SUGGESTIONS;
    } else {
      dict = [...JS_SUGGESTIONS, ...HTML_SUGGESTIONS];
    }

    // 2. Extract current word before cursor
    const textBeforeCursor = currentCode.slice(0, cursorIndex);
    // Word chars: alphanumeric, _, $, #, <, @, -
    const match = textBeforeCursor.match(/([a-zA-Z0-9_\$#<@\-.:]+)$/);
    const prefix = match ? match[1] : '';
    const wordStart = match ? cursorIndex - prefix.length : cursorIndex;

    if (!prefix.trim()) {
      // If cursor is right after nothing or space, return top 8 popular snippets for that language
      return {
        suggestions: dict.slice(0, 8),
        prefix: '',
        wordStart: cursorIndex,
      };
    }

    const cleanPrefix = prefix.toLowerCase();

    // 3. Filter and Rank
    const matches = dict.filter(item => {
      const labelLower = item.label.toLowerCase();
      const insertLower = item.insertText.toLowerCase();
      return labelLower.includes(cleanPrefix) || insertLower.includes(cleanPrefix);
    });

    // Sort: startsWith prefix first, then alphabetical
    matches.sort((a, b) => {
      const aStarts = a.label.toLowerCase().startsWith(cleanPrefix);
      const bStarts = b.label.toLowerCase().startsWith(cleanPrefix);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.label.localeCompare(b.label);
    });

    return {
      suggestions: matches.slice(0, 10),
      prefix,
      wordStart,
    };
  }
};
