import { Project, ProjectTemplate, LanguageId, ProjectFile } from '../types';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { storageService } from './storageService';
import { authService } from './authService';

export const projectService = {
  getProjects(): Project[] {
    return storageService.getProjects();
  },

  getProjectById(id: string): Project | undefined {
    return storageService.getProjects().find(p => p.id === id);
  },

  getTemplates(): ProjectTemplate[] {
    return PROJECT_TEMPLATES;
  },

  createProjectFromTemplate(templateId: string, customTitle?: string): Project {
    const tmpl = PROJECT_TEMPLATES.find(t => t.id === templateId) || PROJECT_TEMPLATES[0];
    const newId = 'proj-' + Date.now();
    const newProject: Project = {
      id: newId,
      title: customTitle || tmpl.title,
      description: tmpl.description,
      language: tmpl.language,
      files: tmpl.files.map((f, idx) => ({
        id: `f-${newId}-${idx}`,
        name: f.name,
        language: f.language,
        content: f.content,
        isEntry: f.isEntry,
      })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const current = storageService.getProjects();
    storageService.saveProjects([newProject, ...current]);

    authService.addXP(50, `Created Project ${newProject.title}`);
    storageService.addActivity({
      type: 'project_created',
      title: `Created ${newProject.title}`,
      detail: `Initialized project with ${newProject.files.length} files in Code Lab.`,
      xpGained: 50,
    });

    return newProject;
  },

  createBlankProject(title: string, language: LanguageId = 'html'): Project {
    const newId = 'proj-' + Date.now();
    let initialFiles: ProjectFile[] = [
      { 
        id: `f-${newId}-0`, 
        name: 'index.html', 
        language: 'html' as const, 
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eduqora Multi-File Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="card">
    <h1 id="main-title">Eduqora Code Lab</h1>
    <p id="desc">Multi-file virtual project running HTML, CSS, and JavaScript seamlessly.</p>
    <button id="action-btn">Click to Test JavaScript</button>
    <div id="output-badge" class="badge">Ready</div>
  </div>

  <script src="script.js"></script>
</body>
</html>`, 
        isEntry: true 
      },
      { 
        id: `f-${newId}-1`, 
        name: 'styles.css', 
        language: 'css' as const, 
        content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 24px;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 12px;
}

p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
}

button {
  background: #6366f1;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.badge {
  display: inline-block;
  margin-top: 16px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background: #064e3b;
  color: #34d399;
  border: 1px solid #059669;
}` 
      },
      { 
        id: `f-${newId}-2`, 
        name: 'script.js', 
        language: 'javascript' as const, 
        content: `// Eduqora JavaScript Project Script
console.log("Multi-file project initialized successfully!");

const btn = document.getElementById("action-btn");
const title = document.getElementById("main-title");
const badge = document.getElementById("output-badge");

let clickCount = 0;

if (btn) {
  btn.addEventListener("click", function() {
    clickCount++;
    title.textContent = "DOM & Script Working!";
    title.style.color = "#34d399";
    badge.textContent = "Clicked " + clickCount + " time" + (clickCount > 1 ? "s" : "");
    badge.style.background = "#1e1b4b";
    badge.style.color = "#818cf8";
    badge.style.borderColor = "#6366f1";
    console.log("Button clicked successfully! Total clicks:", clickCount);
  });
}` 
      },
    ];

    if (language === 'python') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'main.py', language: 'python' as const, content: '# Eduqora Python Script\n\ndef main():\n    print("Hello from Eduqora Python Lab!")\n    numbers = [10, 20, 30, 40, 50]\n    print(f"Numbers: {numbers}")\n    print(f"Sum: {sum(numbers)}")\n\nif __name__ == "__main__":\n    main()\n', isEntry: true },
      ];
    } else if (language === 'sql') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'query.sql', language: 'sql' as const, content: '-- Eduqora SQL Query\nSELECT student_id, name, email, track, xp \nFROM students \nORDER BY xp DESC;\n', isEntry: true },
      ];
    } else if (language === 'c') {
      initialFiles = [
        {
          id: `f-${newId}-0`,
          name: 'main.c',
          language: 'c' as const,
          content: `#include <stdio.h>

int main() {
    printf("========================================\\n");
    printf("    EDUQORA C COMPILER (GCC 14.2)      \\n");
    printf("========================================\\n\\n");

    // 1. Variables & Arithmetic
    int a = 15;
    int b = 25;
    int sum = a + b;
    printf("Calculation: %d + %d = %d\\n\\n", a, b, sum);

    // 2. Loop & Conditionals
    printf("Counting Loop with Conditionals:\\n");
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            printf("  Iteration #%d -> [EVEN]\\n", i);
        } else {
            printf("  Iteration #%d -> [ODD]\\n", i);
        }
    }

    printf("\\nProgram executed successfully!\\n");
    return 0;
}
`,
          isEntry: true,
        },
      ];
    } else if (language === 'cpp') {
      initialFiles = [
        {
          id: `f-${newId}-0`,
          name: 'main.cpp',
          language: 'cpp' as const,
          content: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Helper function
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << "========================================" << endl;
    cout << "    EDUQORA C++ COMPILER (G++ 14.2)    " << endl;
    cout << "========================================" << endl << endl;

    string student = "Developer";
    cout << "Welcome to C++ Programming, " << student << "!" << endl << endl;

    int num = 5;
    cout << "Factorial of " << num << " = " << factorial(num) << endl << endl;

    cout << "Loop Demonstration:" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << "  Count: " << i << " -> Square: " << (i * i) << endl;
    }

    cout << "\\nProgram execution finished successfully." << endl;
    return 0;
}
`,
          isEntry: true,
        },
      ];
    } else if (language === 'java') {
      initialFiles = [
        {
          id: `f-${newId}-0`,
          name: 'Main.java',
          language: 'java' as const,
          content: `public class Main {
    // Helper method
    public static int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("    EDUQORA JAVA RUNTIME (OpenJDK 21)   ");
        System.out.println("========================================\\n");

        int val1 = 12;
        int val2 = 8;
        int product = multiply(val1, val2);
        System.out.println("Product: " + val1 + " * " + val2 + " = " + product + "\\n");

        System.out.println("Array & Loop Demonstration:");
        int[] scores = {85, 92, 78, 96, 88};
        for (int i = 0; i < scores.length; i++) {
            System.out.println("  Student " + (i + 1) + " Score: " + scores[i]);
        }

        System.out.println("\\nJava application executed successfully!");
    }
}
`,
          isEntry: true,
        },
      ];
    } else if (language === 'php') {
      initialFiles = [
        {
          id: `f-${newId}-0`,
          name: 'index.php',
          language: 'php' as const,
          content: `<?php
echo "========================================\\n";
echo "       EDUQORA PHP 8.3 CLI ENGINE       \\n";
echo "========================================\\n\\n";

$course = "PHP Scripting";
echo "Current module: " . $course . "\\n";

$x = 40;
$y = 60;
$total = $x + $y;
echo "Computed sum: " . $total . "\\n\\n";

echo "Loop output:\\n";
for ($i = 1; $i <= 5; $i++) {
    echo "  Step " . $i . " completed\\n";
}
?>
`,
          isEntry: true,
        },
      ];
    } else if (language === 'javascript') {
      initialFiles = [
        {
          id: `f-${newId}-0`,
          name: 'index.js',
          language: 'javascript' as const,
          content: `// Eduqora JavaScript Sandbox
console.log("========================================");
console.log("       EDUQORA JS RUNTIME ENGINE        ");
console.log("========================================\\n");

const numbers = [10, 20, 30, 40, 50];
const doubled = numbers.map(n => n * 2);

console.log("Original array:", numbers);
console.log("Doubled array: ", doubled);
console.log("Array sum:     ", numbers.reduce((a, b) => a + b, 0));
`,
          isEntry: true,
        },
      ];
    }

    const newProject: Project = {
      id: newId,
      title: title.trim() || 'Untitled Project',
      description: 'Custom coding project created in Eduqora Code Lab.',
      language,
      files: initialFiles,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const current = storageService.getProjects();
    storageService.saveProjects([newProject, ...current]);
    return newProject;
  },

  saveProject(updated: Project): void {
    const current = storageService.getProjects();
    const idx = current.findIndex(p => p.id === updated.id);
    const stamped = { ...updated, updatedAt: Date.now() };

    if (idx >= 0) {
      current[idx] = stamped;
      storageService.saveProjects(current);
    } else {
      storageService.saveProjects([stamped, ...current]);
    }
  },

  duplicateProject(id: string): Project | null {
    const existing = this.getProjectById(id);
    if (!existing) return null;

    const newId = 'proj-' + Date.now();
    const duplicated: Project = {
      ...existing,
      id: newId,
      title: `${existing.title} (Copy)`,
      files: existing.files.map(f => ({
        ...f,
        id: 'f-' + newId + '-' + Math.random().toString(36).substring(2, 6),
      })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const current = storageService.getProjects();
    storageService.saveProjects([duplicated, ...current]);
    return duplicated;
  },

  deleteProject(id: string): boolean {
    const current = storageService.getProjects();
    const filtered = current.filter(p => p.id !== id);
    if (filtered.length === current.length) return false;
    storageService.saveProjects(filtered);
    return true;
  },

  downloadProject(project: Project): void {
    // Generate combined bundle or single download
    const bundle: Record<string, string> = {};
    project.files.forEach(f => {
      bundle[f.name] = f.content;
    });

    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-eduqora.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
