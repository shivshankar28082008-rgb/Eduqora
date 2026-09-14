import { ProjectTemplate } from '../types';

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'portfolio-starter',
    title: 'Personal Portfolio Website',
    description: 'Clean responsive personal website featuring hero section, projects grid, skills badges, and contact form.',
    language: 'html',
    badge: 'Popular',
    icon: 'Briefcase',
    files: [
      {
        name: 'index.html',
        language: 'html',
        isEntry: true,
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera — Software Developer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="hero">
    <div class="container">
      <div class="badge">Available for Work</div>
      <h1>Alex Rivera</h1>
      <p class="role">Frontend & Full-Stack Developer</p>
      <p class="bio">Building accessible, high-performance web products with clean code and modern design.</p>
      <div class="actions">
        <a href="#projects" class="btn btn-primary">View Projects</a>
        <a href="#contact" class="btn btn-outline">Get In Touch</a>
      </div>
    </div>
  </header>

  <section id="projects" class="section container">
    <h2>Featured Projects</h2>
    <div class="grid">
      <div class="card">
        <div class="card-tag">Web App</div>
        <h3>Eduqora Coding Lab</h3>
        <p>In-browser code editor and interactive lesson runner for aspiring developers.</p>
        <div class="tags">
          <span>HTML5</span><span>CSS3</span><span>JavaScript</span>
        </div>
      </div>
      <div class="card">
        <div class="card-tag">Analytics</div>
        <h3>DataPulse Dashboard</h3>
        <p>Real-time analytics and data visualization portal with responsive widgets.</p>
        <div class="tags">
          <span>SQL</span><span>Python</span><span>Charts</span>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>© 2026 Alex Rivera. Built inside Eduqora Code Lab.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  line-height: 1.6;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero {
  padding: 80px 0 60px;
  border-bottom: 1px solid #1e293b;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

h1 {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.role {
  font-size: 20px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.bio {
  max-width: 580px;
  color: #cbd5e1;
  font-size: 16px;
  margin-bottom: 28px;
}

.actions {
  display: flex;
  gap: 14px;
}

.btn {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}
.btn-primary:hover {
  background: #4338ca;
}

.btn-outline {
  border: 1px solid #334155;
  color: #cbd5e1;
}
.btn-outline:hover {
  border-color: #64748b;
  color: white;
}

.section {
  padding: 60px 0;
}

.section h2 {
  font-size: 24px;
  margin-bottom: 28px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  padding: 24px;
  border-radius: 12px;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}

.card-tag {
  font-size: 12px;
  text-transform: uppercase;
  color: #38bdf8;
  font-weight: 700;
  margin-bottom: 8px;
}

.card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.card p {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  gap: 8px;
}

.tags span {
  font-size: 12px;
  background: #0f172a;
  padding: 3px 8px;
  border-radius: 4px;
  color: #cbd5e1;
}

.footer {
  border-top: 1px solid #1e293b;
  padding: 24px 0;
  text-align: center;
  color: #64748b;
  font-size: 14px;
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `console.log("Eduqora Portfolio initialized.");

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    console.log('Viewing project: ' + card.querySelector('h3').innerText);
  });
});`
      }
    ]
  },
  {
    id: 'calculator-app',
    title: 'Modern Calculator',
    description: 'A fully interactive calculator supporting basic arithmetic, decimals, keyboard entries, and clear operations.',
    language: 'javascript',
    badge: 'Beginner',
    icon: 'Calculator',
    files: [
      {
        name: 'index.html',
        language: 'html',
        isEntry: true,
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Eduqora Calculator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="calculator">
    <div class="display" id="display">0</div>
    <div class="keypad">
      <button class="btn btn-action" onclick="clearDisplay()">AC</button>
      <button class="btn btn-action" onclick="deleteLast()">DEL</button>
      <button class="btn btn-action" onclick="appendOperator('%')">%</button>
      <button class="btn btn-operator" onclick="appendOperator('/')">÷</button>

      <button class="btn" onclick="appendNumber('7')">7</button>
      <button class="btn" onclick="appendNumber('8')">8</button>
      <button class="btn" onclick="appendNumber('9')">9</button>
      <button class="btn btn-operator" onclick="appendOperator('*')">×</button>

      <button class="btn" onclick="appendNumber('4')">4</button>
      <button class="btn" onclick="appendNumber('5')">5</button>
      <button class="btn" onclick="appendNumber('6')">6</button>
      <button class="btn btn-operator" onclick="appendOperator('-')">−</button>

      <button class="btn" onclick="appendNumber('1')">1</button>
      <button class="btn" onclick="appendNumber('2')">2</button>
      <button class="btn" onclick="appendNumber('3')">3</button>
      <button class="btn btn-operator" onclick="appendOperator('+')">+</button>

      <button class="btn btn-zero" onclick="appendNumber('0')">0</button>
      <button class="btn" onclick="appendDot('.')">.</button>
      <button class="btn btn-equals" onclick="calculate()">=</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #0f172a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.calculator {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 20px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.display {
  background: #090d16;
  color: #ffffff;
  padding: 16px 20px;
  font-size: 32px;
  text-align: right;
  border-radius: 8px;
  margin-bottom: 16px;
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 16px 0;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #334155;
  color: #f1f5f9;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn:hover {
  opacity: 0.85;
}

.btn-operator {
  background: #4f46e5;
  color: white;
}

.btn-action {
  background: #64748b;
}

.btn-equals {
  background: #10b981;
  color: white;
}

.btn-zero {
  grid-column: span 2;
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `let currentInput = "0";

function updateDisplay() {
  document.getElementById("display").innerText = currentInput;
}

function appendNumber(num) {
  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/', '%'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function appendDot() {
  const parts = currentInput.split(/[+\\-*/%]/);
  const currentPart = parts[parts.length - 1];
  if (!currentPart.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function calculate() {
  try {
    // Clean evaluation
    const sanitized = currentInput.replace(/[^0-9+\\-*/.%]/g, '');
    const result = Function('"use strict";return (' + sanitized + ')')();
    currentInput = String(Number(result.toFixed(8)));
    console.log("Calculation success:", result);
  } catch (err) {
    currentInput = "Error";
    console.error("Calculation failed:", err);
  }
  updateDisplay();
}`
      }
    ]
  },
  {
    id: 'todo-app',
    title: 'Task Manager (Todo App)',
    description: 'A clean productivity task manager with add, toggle, filter, and persistence.',
    language: 'javascript',
    badge: 'Practical',
    icon: 'CheckSquare',
    files: [
      {
        name: 'index.html',
        language: 'html',
        isEntry: true,
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Eduqora Task Board</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-card">
    <div class="header">
      <h2>Eduqora Tasks</h2>
      <span id="taskCount" class="badge">0 items</span>
    </div>

    <form id="taskForm" class="input-row">
      <input type="text" id="taskInput" placeholder="Add a new task..." required autocomplete="off">
      <button type="submit" class="btn-add">Add</button>
    </form>

    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Pending</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>

    <ul id="taskList" class="task-list"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 16px;
}

.app-card {
  background: white;
  width: 100%;
  max-width: 440px;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.badge {
  background: #e0e7ff;
  color: #4338ca;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 99px;
  font-weight: 600;
}

.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.btn-add {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
}

.filter-btn.active {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  border-bottom: 1px solid #f1f5f9;
}

.task-item.completed span {
  text-decoration: line-through;
  color: #94a3b8;
}

.task-item button {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-weight: bold;
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `let tasks = [
  { id: 1, text: "Finish HTML Foundations", completed: true },
  { id: 2, text: "Practice CSS Flexbox & Grid", completed: false },
  { id: 3, text: "Build Eduqora Project in Code Lab", completed: false }
];
let currentFilter = "all";

const listEl = document.getElementById("taskList");
const countEl = document.getElementById("taskCount");

function render() {
  listEl.innerHTML = "";
  const filtered = tasks.filter(t => {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.innerHTML = \`
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="checkbox" \${task.completed ? "checked" : ""} onchange="toggleTask(\${task.id})">
        <span>\${task.text}</span>
      </div>
      <button onclick="deleteTask(\${task.id})">✕</button>
    \`;
    listEl.appendChild(li);
  });

  countEl.innerText = tasks.filter(t => !t.completed).length + " pending";
}

window.toggleTask = function(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
};

window.deleteTask = function(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
};

document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ id: Date.now(), text, completed: false });
    input.value = "";
    render();
  }
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();`
      }
    ]
  },
  {
    id: 'sql-explorer',
    title: 'Interactive SQL Lab',
    description: 'Query realistic relational tables including students, courses, and enrollments using SQL syntax.',
    language: 'sql',
    badge: 'Data',
    icon: 'Database',
    files: [
      {
        name: 'query.sql',
        language: 'sql',
        isEntry: true,
        content: `-- Eduqora SQL Relational Sandbox
-- Available tables: students, courses, enrollments

SELECT 
    s.name AS student_name,
    c.title AS course_title,
    e.score AS score,
    e.status AS completion_status
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE e.score >= 80
ORDER BY e.score DESC;`
      }
    ]
  },
  {
    id: 'blank-web',
    title: 'Blank HTML/CSS/JS Starter',
    description: 'A clean slate for your custom ideas, containing empty index.html, styles.css, and script.js files.',
    language: 'html',
    badge: 'Empty',
    icon: 'FileCode',
    files: [
      {
        name: 'index.html',
        language: 'html',
        isEntry: true,
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Eduqora Blank Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello Eduqora</h1>
  <p>Start editing this file to see your ideas come to life!</p>
  <button id="action-btn">Click Me</button>

  <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 40px;
  background: #f8fafc;
  color: #0f172a;
}

h1 {
  color: #4f46e5;
}

button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `document.getElementById('action-btn').addEventListener('click', () => {
  alert('Welcome to Eduqora Code Lab!');
});`
      }
    ]
  },
  {
    id: 'c-starter',
    title: 'C Language Foundations',
    description: 'Compile and run native C code with stdio, control flow, functions, and structured logic.',
    language: 'c',
    badge: 'Core',
    icon: 'Terminal',
    files: [
      {
        name: 'main.c',
        language: 'c',
        isEntry: true,
        content: `#include <stdio.h>

// Helper function
int calculateSum(int a, int b) {
    return a + b;
}

int main() {
    printf("========================================\\n");
    printf("    EDUQORA C COMPILER (GCC 14.2)      \\n");
    printf("========================================\\n\\n");

    int x = 20;
    int y = 35;
    int result = calculateSum(x, y);
    printf("Sum: %d + %d = %d\\n\\n", x, y, result);

    printf("Numbers 1 through 5 with Parity:\\n");
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            printf("  Item #%d: EVEN\\n", i);
        } else {
            printf("  Item #%d: ODD\\n", i);
        }
    }

    printf("\\nC Execution completed successfully.\\n");
    return 0;
}`
      }
    ]
  },
  {
    id: 'cpp-starter',
    title: 'C++ Algorithms & OOP Lab',
    description: 'Execute modern C++ with streams (cout/cin), vectors, loops, and custom algorithmic functions.',
    language: 'cpp',
    badge: 'Popular',
    icon: 'Code2',
    files: [
      {
        name: 'main.cpp',
        language: 'cpp',
        isEntry: true,
        content: `#include <iostream>
#include <string>
using namespace std;

// Recursive Factorial
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << "========================================" << endl;
    cout << "    EDUQORA C++ COMPILER (G++ 14.2)    " << endl;
    cout << "========================================" << endl << endl;

    string username = "Developer";
    cout << "Welcome to C++ Coding, " << username << "!" << endl << endl;

    int n = 5;
    cout << "Factorial of " << n << " is: " << factorial(n) << endl << endl;

    cout << "Loop & Squares:" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << "  Count: " << i << " -> Square = " << (i * i) << endl;
    }

    cout << "\\nC++ Execution complete (Exit code 0)." << endl;
    return 0;
}`
      }
    ]
  },
  {
    id: 'java-starter',
    title: 'Java Core Application',
    description: 'Compile and launch Java code inside the virtual JVM with classes, arrays, loops, and methods.',
    language: 'java',
    badge: 'Enterprise',
    icon: 'Cpu',
    files: [
      {
        name: 'Main.java',
        language: 'java',
        isEntry: true,
        content: `public class Main {
    // Static helper method
    public static int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("    EDUQORA JAVA RUNTIME (OpenJDK 21)   ");
        System.out.println("========================================\\n");

        int num1 = 14;
        int num2 = 7;
        int prod = multiply(num1, num2);
        System.out.println("Product: " + num1 + " * " + num2 + " = " + prod + "\\n");

        System.out.println("Array and Loop Demonstration:");
        int[] scores = {92, 85, 78, 96, 88};
        for (int i = 0; i < scores.length; i++) {
            System.out.println("  Student " + (i + 1) + " Score: " + scores[i]);
        }

        System.out.println("\\nJava Application finished with exit code 0.");
    }
}`
      }
    ]
  },
  {
    id: 'python-starter',
    title: 'Python Logic & Automation',
    description: 'Write Python 3 scripts with lists, dictionaries, f-strings, and mathematical operations.',
    language: 'python',
    badge: 'Data',
    icon: 'Terminal',
    files: [
      {
        name: 'main.py',
        language: 'python',
        isEntry: true,
        content: `# Eduqora Python Script

def main():
    print("========================================")
    print("      EDUQORA PYTHON 3.12 ENGINE        ")
    print("========================================\\n")

    user = "Developer"
    print(f"Welcome to Python, {user}!")

    numbers = [10, 20, 30, 40, 50]
    print(f"Data set: {numbers}")
    print(f"Sum of numbers: {sum(numbers)}")

    print("\\nIterating over elements:")
    for idx, val in enumerate(numbers):
        print(f"  Item #{idx + 1}: {val}")

if __name__ == "__main__":
    main()`
      }
    ]
  }
];
