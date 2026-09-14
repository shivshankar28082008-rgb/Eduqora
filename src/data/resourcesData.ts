import { CheatSheetResource } from '../types';

export const RESOURCES_DATA: CheatSheetResource[] = [
  {
    id: 'html-cheatsheet',
    languageId: 'html',
    title: 'HTML5 Developer Cheat Sheet',
    category: 'Web Structure',
    summary: 'Essential semantic elements, document boilerplate, forms, meta tags, and accessibility attributes.',
    sections: [
      {
        title: 'Document Boilerplate',
        description: 'Standard modern HTML5 root skeleton structure with meta tags.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main></main>
  <script src="app.js"></script>
</body>
</html>`
      },
      {
        title: 'Semantic Sectioning',
        description: 'Semantic landmarks that screen readers and search engines use to navigate.',
        code: `<header>Page or section header</header>
<nav>Navigation links</nav>
<main>Primary unique content</main>
<article>Self-contained reusable content</article>
<section>Thematic grouping of content</section>
<aside>Indirectly related sidebar content</aside>
<footer>Author or legal metadata</footer>`
      },
      {
        title: 'Modern Form Elements',
        description: 'Accessible inputs with semantic types and validation attributes.',
        code: `<form action="/submit" method="POST">
  <label for="email">Work Email</label>
  <input type="email" id="email" name="email" required autocomplete="email">

  <label for="role">Select Track</label>
  <select id="role" name="role">
    <option value="frontend">Frontend</option>
    <option value="fullstack">Full-Stack</option>
  </select>

  <button type="submit">Submit</button>
</form>`
      }
    ]
  },
  {
    id: 'css-cheatsheet',
    languageId: 'css',
    title: 'CSS Modern Layout & Flexbox/Grid Sheet',
    category: 'Styling & Layout',
    summary: 'Rapid reference for Flexbox alignments, CSS Grid auto-fit patterns, box model resets, and media queries.',
    sections: [
      {
        title: 'Universal Modern Reset',
        description: 'Predictable sizing across all elements.',
        code: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}`
      },
      {
        title: 'Flexbox Layout Centering',
        description: 'Common flex patterns for navigation bars and centered containers.',
        code: `.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`
      },
      {
        title: 'Responsive Grid Auto-Fit',
        description: 'Responsive cards grid without writing media queries.',
        code: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}`
      }
    ]
  },
  {
    id: 'js-cheatsheet',
    languageId: 'javascript',
    title: 'JavaScript Modern ES6+ Cheat Sheet',
    category: 'Dynamic Logic',
    summary: 'Array transformation methods, promises, destructuring, and DOM event listeners.',
    sections: [
      {
        title: 'Array Methods (map, filter, reduce)',
        description: 'Transform and filter arrays immutably.',
        code: `const numbers = [10, 20, 30, 40];

const doubled = numbers.map(n => n * 2);
const filtered = numbers.filter(n => n > 25);
const total = numbers.reduce((acc, curr) => acc + curr, 0);`
      },
      {
        title: 'Async / Await and Fetch',
        description: 'Clean asynchronous network request handling with error capture.',
        code: `async function fetchLessons(courseId) {
  try {
    const res = await fetch(\`/api/courses/\${courseId}/lessons\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}`
      },
      {
        title: 'Object Destructuring & Spread',
        description: 'Unpack values and clone objects safely.',
        code: `const user = { name: "Alex", xp: 1200, role: "Student" };
const { name, xp } = user;

const updatedUser = { ...user, xp: xp + 50, streak: 5 };`
      }
    ]
  },
  {
    id: 'python-cheatsheet',
    languageId: 'python',
    title: 'Python Core Syntax Cheat Sheet',
    category: 'General & Backend',
    summary: 'List comprehensions, dictionaries, file handling, and functions.',
    sections: [
      {
        title: 'List Comprehensions',
        description: 'Concise syntax to derive new lists from existing sequences.',
        code: `# Generate squares of even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares)  # [4, 16, 36, 64]`
      },
      {
        title: 'Dictionary Manipulation',
        description: 'Key-value maps with default retrieval.',
        code: `student = {"name": "Jordan", "track": "Python", "score": 92}

# Safe lookup with default
level = student.get("level", 1)

# Loop over items
for key, value in student.items():
    print(f"{key}: {value}")`
      }
    ]
  },
  {
    id: 'sql-cheatsheet',
    languageId: 'sql',
    title: 'SQL Relational Queries Cheat Sheet',
    category: 'Databases',
    summary: 'SELECT syntax, WHERE operators, GROUP BY aggregations, and JOIN clauses.',
    sections: [
      {
        title: 'Filtering & Ordering',
        description: 'Retrieve specific rows and order results.',
        code: `SELECT id, name, email, points
FROM students
WHERE points >= 100 AND active = 1
ORDER BY points DESC
LIMIT 10;`
      },
      {
        title: 'Multi-Table INNER JOIN',
        description: 'Connect records across relational keys.',
        code: `SELECT 
    orders.id,
    users.full_name,
    orders.amount,
    orders.created_at
FROM orders
INNER JOIN users ON orders.user_id = users.id
WHERE orders.status = 'completed';`
      },
      {
        title: 'GROUP BY & Aggregates',
        description: 'Calculate counts, sums, and averages per group.',
        code: `SELECT 
    language,
    COUNT(id) AS total_lessons,
    AVG(duration_minutes) AS avg_duration
FROM curriculum_lessons
GROUP BY language
HAVING COUNT(id) > 5;`
      }
    ]
  }
];
