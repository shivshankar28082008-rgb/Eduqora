import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  // ===================== HTML =====================
  {
    id: 'html-intro',
    languageId: 'html',
    order: 1,
    title: 'HTML Introduction',
    slug: 'introduction',
    description: 'Learn what HTML is, how it operates in browsers, and how web pages are composed.',
    difficulty: 'Beginner',
    estimatedMinutes: 8,
    whatIsIt: 'HTML (HyperText Markup Language) is the standard markup language used to create the document structure and content of web pages across the world.',
    whyUseIt: 'Every website in existence relies on HTML to instruct the browser how to present headings, text, media, navigation, and interactive buttons.',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Welcome to Eduqora</h1>
    <p>This is your first webpage structure.</p>
  </body>
</html>`,
    exampleCode: `<h1>Welcome to Eduqora</h1>
<p>You are viewing real, rendered HTML directly inside the learning sandbox.</p>
<button style="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer;">
  Start Exploring
</button>`,
    expectedOutput: 'Welcome to Eduqora heading followed by a descriptive paragraph and a styled primary button.',
    explanation: 'HTML documents use tags enclosed in angle brackets (<tagname>). Most elements possess an opening tag, content, and a closing tag with a forward slash (</tagname>).',
    importantNotes: [
      'HTML tags are case-insensitive, but lowercase is universal industry standard.',
      'Browsers do not display HTML tags directly; instead they render the structured content within them.',
      'Always remember to close tags that are not void elements.'
    ],
    commonMistakes: [
      'Forgetting the closing tag like leaving <p> unclosed.',
      'Misspelling tag names like <paragragh> instead of <p>.',
      'Mismatched nesting order like <b><i>text</b></i> instead of <b><i>text</i></b>.'
    ],
    practice: {
      title: 'Create a Heading and Subtitle',
      instruction: 'Add an <h1> heading containing "Eduqora Lab" and a <p> paragraph containing "Learning to code is empowering."',
      starterCode: `<!-- Add your <h1> and <p> tags below -->\n`,
      expectedKeyword: 'Eduqora Lab',
      testType: 'keyword',
    }
  },
  {
    id: 'html-document-structure',
    languageId: 'html',
    order: 2,
    title: 'Document Structure',
    slug: 'document-structure',
    description: 'Master the anatomy of a complete HTML5 document including doctype, head, and body.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    whatIsIt: 'The document skeleton is the standardized root structure that wraps all metadata and renderable content of an HTML document.',
    whyUseIt: 'Without proper document structure, browsers may render in quirks mode, leading to unpredictable layout bugs and poor SEO indexing.',
    syntax: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Eduqora Foundations</title>
  </head>
  <body>
    <!-- Visible content resides here -->
  </body>
</html>`,
    exampleCode: `<div style="font-family: sans-serif; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px;">
  <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;">
    <h2 style="margin: 0; color: #1e293b;">Eduqora Architecture</h2>
  </header>
  <main>
    <p style="color: #475569;">The &lt;head&gt; contains metadata, while the &lt;body&gt; holds content you see.</p>
  </main>
</div>`,
    expectedOutput: 'A clean card with header and main section showcasing visual structure.',
    explanation: 'The <!DOCTYPE html> declaration notifies the browser that this is an HTML5 document. The <head> stores non-visible configuration like character sets and title, whereas the <body> houses everything the user interacts with.',
    importantNotes: [
      'The <!DOCTYPE html> must always be the very first line before anything else.',
      'Specify the lang attribute on <html> for accessibility and screen readers.',
      'Only one <body> element can exist per document.'
    ],
    commonMistakes: [
      'Placing visible content like <h1> or <p> inside the <head> tag.',
      'Omitting the character encoding meta tag (<meta charset="UTF-8">).'
    ],
    practice: {
      title: 'Practice Semantic Wrapper',
      instruction: 'Create an <article> containing a <h2> title "Web Architecture" and a <p> tag describing it.',
      starterCode: `<article>\n  <!-- Write your h2 and p here -->\n</article>`,
      expectedKeyword: 'Web Architecture',
      testType: 'keyword'
    }
  },
  {
    id: 'html-headings-paragraphs',
    languageId: 'html',
    order: 3,
    title: 'Headings & Paragraphs',
    slug: 'headings-and-paragraphs',
    description: 'Structure text hierarchies using h1 through h6 and paragraphs for readable typography.',
    difficulty: 'Beginner',
    estimatedMinutes: 8,
    whatIsIt: 'Headings (h1 to h6) establish information importance, while paragraphs (p) group blocks of body text.',
    whyUseIt: 'Search engines and screen readers rely heavily on heading levels to understand document architecture. Good hierarchy creates instant scannability.',
    syntax: `<h1>Highest Importance</h1>
<h2>Subheading Level 2</h2>
<h3>Subheading Level 3</h3>
<p>A paragraph of descriptive text.</p>`,
    exampleCode: `<h1 style="font-size: 24px; color: #1e1b4b; margin-bottom: 4px;">Modern Software Craft</h1>
<h2 style="font-size: 18px; color: #4338ca; margin-bottom: 12px;">The Power of Semantic Markup</h2>
<p style="color: #334155; line-height: 1.6;">
  Writing clean HTML ensures that every person, device, and assistive technology can consume your content reliably.
</p>`,
    expectedOutput: 'A structured heading hierarchy demonstrating visual scale and line height.',
    explanation: 'Heading levels should proceed logically without skipping steps. There should generally only be one <h1> per page representing the central topic.',
    importantNotes: [
      'Do not use headings merely to make text bold or big; use CSS styling for visual adjustments.',
      'Screen reader users often navigate pages by hopping from heading to heading.'
    ],
    commonMistakes: [
      'Skipping heading levels, such as jumping directly from <h1> to <h4>.',
      'Using multiple <h1> elements haphazardly across a single page.'
    ]
  },
  {
    id: 'html-buttons-links',
    languageId: 'html',
    order: 4,
    title: 'Buttons & Links',
    slug: 'buttons-and-links',
    description: 'Learn when to use anchor links versus button elements for user interactions.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    whatIsIt: 'The <a> tag defines hyperlinks that navigate between pages, while the <button> tag executes client-side actions and form submissions.',
    whyUseIt: 'Conflating links and buttons is one of the most widespread accessibility errors in web development. Mastering the distinction is essential.',
    syntax: `<a href="https://example.com" target="_blank" rel="noopener">Visit Resource</a>
<button type="button" onclick="performAction()">Execute Action</button>`,
    exampleCode: `<div style="display: flex; gap: 12px; align-items: center;">
  <a href="#/learn" style="text-decoration: none; color: #4f46e5; font-weight: 600; padding: 8px 12px; border: 1px solid #c7d2fe; border-radius: 6px;">
    ← Explore Lessons
  </a>
  <button id="demo-btn" onclick="this.innerText = 'Clicked! Nice work!'" style="background: #4f46e5; color: white; border: none; padding: 9px 16px; border-radius: 6px; font-weight: 500; cursor: pointer;">
    Interactive Button (Click Me)
  </button>
</div>`,
    expectedOutput: 'A navigational link next to a button that reacts instantly when clicked.',
    explanation: 'If clicking causes the URL to change or navigates to a new page or anchor, use <a>. If clicking triggers an action like opening a modal, submitting a form, or toggling state, use <button>.',
    importantNotes: [
      'Always provide a type attribute on buttons: type="button", type="submit", or type="reset".',
      'When using target="_blank" on links, always include rel="noopener noreferrer" for security.'
    ],
    commonMistakes: [
      'Using <div onclick="..."> or <a href="#"> instead of a real <button>.',
      'Omitting the href attribute on an anchor tag.'
    ],
    practice: {
      title: 'Build a Call To Action Button',
      instruction: 'Create a button with type="button" and class or id "cta-btn" with the text "Enroll in Lab".',
      starterCode: `<!-- Write your button here -->\n<button type="button" id="cta-btn">Enroll in Lab</button>`,
      expectedKeyword: 'Enroll in Lab',
      testType: 'keyword'
    }
  },
  {
    id: 'html-forms-input',
    languageId: 'html',
    order: 5,
    title: 'Forms & Inputs',
    slug: 'forms-and-inputs',
    description: 'Capture user data with forms, labels, text inputs, checkboxes, and buttons.',
    difficulty: 'Intermediate',
    estimatedMinutes: 12,
    whatIsIt: 'HTML forms collect user information and pass it to client scripts or backend services for processing.',
    whyUseIt: 'Forms power logins, registrations, search boxes, checkout flows, and surveys across the entire internet.',
    syntax: `<form action="/api/submit" method="POST">
  <label for="username">Username</label>
  <input type="text" id="username" name="username" required>
  <button type="submit">Submit</button>
</form>`,
    exampleCode: `<form onsubmit="event.preventDefault(); alert('Hello, ' + document.getElementById('student-name').value + '!');" style="max-width: 320px; display: flex; flex-direction: column; gap: 10px; font-family: sans-serif;">
  <label for="student-name" style="font-size: 14px; font-weight: 600; color: #334155;">Your Name:</label>
  <input type="text" id="student-name" placeholder="e.g. Alex Rivera" required style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none;" value="Eduqora Learner" />
  <button type="submit" style="background: #10b981; color: white; padding: 10px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
    Submit Form
  </button>
</form>`,
    expectedOutput: 'An interactive form with a styled text field and green submit button that triggers an alert with user input.',
    explanation: 'Every input should be paired with a <label> linked via the for attribute matching the input id. This ensures screen readers announce the field properly and users can click the label to focus the input.',
    importantNotes: [
      'Inputs are self-closing void elements (<input />).',
      'Choose the most accurate type (e.g. email, number, password, tel, search).'
    ],
    commonMistakes: [
      'Forgetting the <label> element or not linking it with for and id.',
      'Leaving out the type attribute on inputs, defaulting to text when email or number is appropriate.'
    ]
  },

  // ===================== CSS =====================
  {
    id: 'css-intro',
    languageId: 'css',
    order: 1,
    title: 'CSS Introduction',
    slug: 'introduction',
    description: 'Understand the syntax, cascade, inheritance, and how stylesheets transform HTML.',
    difficulty: 'Beginner',
    estimatedMinutes: 8,
    whatIsIt: 'CSS (Cascading Style Sheets) is a stylesheet language used to specify the presentation, colors, typography, and layout of an HTML document.',
    whyUseIt: 'HTML provides the semantic skeleton; CSS delivers the visual aesthetics, responsive adaptation, and interactive delight.',
    syntax: `selector {
  property: value;
  another-property: value;
}`,
    exampleCode: `<style>
  .card {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
    font-family: sans-serif;
  }
  .card h3 { margin-top: 0; }
</style>

<div class="card">
  <h3>Eduqora Card Component</h3>
  <p>Styled with CSS properties including linear gradients, padding, and border radius.</p>
</div>`,
    expectedOutput: 'A vibrant purple card with smooth corners and soft drop shadow.',
    explanation: 'A CSS rule consists of a selector pointing to the HTML element and a declaration block containing property-value pairs separated by colons and terminated by semicolons.',
    importantNotes: [
      'CSS rules cascade: when multiple rules target the same element, specificity and order determine which wins.',
      'Semicolons at the end of each declaration are mandatory to prevent syntax breaks.'
    ],
    commonMistakes: [
      'Missing semicolons between declarations.',
      'Confusing class selectors (.class-name) with id selectors (#id-name).'
    ],
    practice: {
      title: 'Style a Banner with CSS',
      instruction: 'Create a style block that gives a div with class "highlight" a background color of "#e0e7ff" and padding of "16px".',
      starterCode: `<style>\n  /* Write your .highlight rule here */\n</style>\n<div class="highlight">Notice: Coding Lab is active.</div>`,
      expectedKeyword: '.highlight',
      testType: 'keyword'
    }
  },
  {
    id: 'css-box-model',
    languageId: 'css',
    order: 2,
    title: 'The Box Model',
    slug: 'box-model',
    description: 'Master content, padding, border, and margin - the building blocks of web layout.',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    whatIsIt: 'Every HTML element rendered on screen is treated as a rectangular box comprising content, padding, border, and margin.',
    whyUseIt: 'Misunderstanding the box model causes unwanted layout breaks, scrollbars, and overflowing elements.',
    syntax: `* {
  box-sizing: border-box; /* Crucial modern default */
}

.box {
  margin: 16px;
  border: 2px solid #cbd5e1;
  padding: 24px;
  width: 300px;
}`,
    exampleCode: `<style>
  .box-demo {
    box-sizing: border-box;
    width: 280px;
    padding: 20px;
    border: 3px solid #6366f1;
    margin: 15px auto;
    background: #eef2ff;
    border-radius: 8px;
    text-align: center;
    font-family: sans-serif;
  }
</style>

<div class="box-demo">
  <strong>Box Model in Action</strong>
  <p style="margin: 8px 0 0 0; font-size: 13px; color: #4338ca;">
    Padding (20px) | Border (3px) | Margin (15px)
  </p>
</div>`,
    expectedOutput: 'A clearly centered bordered box illustrating spacing and internal padding.',
    explanation: 'In border-box sizing, the width and height properties include content, padding, and borders, making responsive calculations intuitive and predictable.',
    importantNotes: [
      'Always set box-sizing: border-box on your universal reset (*).',
      'Vertical margins can collapse between sibling elements, whereas padding never collapses.'
    ],
    commonMistakes: [
      'Relying on content-box where adding padding makes an element wider than 100%, causing horizontal overflow.',
      'Confusing margin (outside the border) with padding (inside the border).'
    ]
  },
  {
    id: 'css-flexbox',
    languageId: 'css',
    order: 3,
    title: 'Flexbox Layout',
    slug: 'flexbox',
    description: 'Build flexible one-dimensional layouts with display: flex, justify-content, and align-items.',
    difficulty: 'Intermediate',
    estimatedMinutes: 14,
    whatIsIt: 'CSS Flexible Box Layout (Flexbox) is a layout model designed for distributing space and aligning items along a single axis (row or column).',
    whyUseIt: 'Flexbox eliminated years of brittle float and inline-block hacks, enabling effortless vertical centering and dynamic item scaling.',
    syntax: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}`,
    exampleCode: `<style>
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0f172a;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-family: sans-serif;
  }
  .links {
    display: flex;
    gap: 16px;
    font-size: 14px;
  }
</style>

<div class="nav-bar">
  <div style="font-weight: 700; color: #818cf8;">Eduqora</div>
  <div class="links">
    <span>Learn</span>
    <span>Practice</span>
    <span>Build</span>
  </div>
</div>`,
    expectedOutput: 'A sleek dark navigation bar with logo pushed to the left and spaced links on the right.',
    explanation: 'Setting display: flex turns the element into a flex container. Its direct children become flex items, responding to justify-content (main axis) and align-items (cross axis).',
    importantNotes: [
      'The gap property works in modern Flexbox, removing the need for negative margins on child items.',
      'flex-direction: column shifts the main axis to vertical.'
    ],
    commonMistakes: [
      'Trying to apply align-items or justify-content to the children rather than the parent flex container.',
      'Forgetting that flex-direction: column inverts the axes.'
    ]
  },

  // ===================== JAVASCRIPT =====================
  {
    id: 'js-intro',
    languageId: 'javascript',
    order: 1,
    title: 'JavaScript Introduction',
    slug: 'introduction',
    description: 'Understand variables, console logging, data types, and running dynamic code.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    whatIsIt: 'JavaScript is a high-level, dynamic programming language that powers interactive behavior, computation, and network requests in web applications.',
    whyUseIt: 'JavaScript turns static HTML and CSS into responsive, living applications that react to user inputs without full page refreshes.',
    syntax: `let studentName = "Alex";
const passingScore = 75;
console.log("Welcome to Eduqora, " + studentName);`,
    exampleCode: `<div style="font-family: sans-serif; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <p id="msg" style="font-size: 16px; font-weight: 600; color: #1e293b;">Click to execute JavaScript</p>
  <button id="runBtn" style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
    Run JS Logic
  </button>
</div>

<script>
  document.getElementById("runBtn").addEventListener("click", function() {
    const time = new Date().toLocaleTimeString();
    document.getElementById("msg").innerText = "Success! Logic executed at: " + time;
    console.log("Eduqora JS event fired at " + time);
  });
</script>`,
    expectedOutput: 'An interactive card that updates text with the exact real-time clock timestamp upon click.',
    explanation: 'JavaScript runs in the browser engine. You can select elements using document.getElementById and bind event listeners that execute code when interactions occur.',
    importantNotes: [
      'Always prefer const for variables that do not reassign, and let for those that do.',
      'Never use the legacy var keyword due to function-scoping and hoisting pitfalls.'
    ],
    commonMistakes: [
      'Attempting to reassign a variable declared with const.',
      'Forgetting that JavaScript strings are zero-indexed.'
    ],
    practice: {
      title: 'Console Log and Alert',
      instruction: 'Write JavaScript code that prints "Eduqora is awesome" to the console.',
      starterCode: `// Write your console.log statement below:\nconsole.log("Eduqora is awesome");`,
      expectedKeyword: 'Eduqora is awesome',
      testType: 'keyword'
    }
  },
  {
    id: 'js-functions',
    languageId: 'javascript',
    order: 2,
    title: 'Functions & Arrow Syntax',
    slug: 'functions',
    description: 'Structure reusable blocks of logic, pass parameters, and return computational results.',
    difficulty: 'Intermediate',
    estimatedMinutes: 12,
    whatIsIt: 'Functions are self-contained blocks of code designed to perform a specific calculation or task when invoked.',
    whyUseIt: 'Functions embody the DRY (Don\'t Repeat Yourself) principle, making applications modular, testable, and maintainable.',
    syntax: `// Standard declaration
function calculateTotal(price, taxRate) {
  return price + (price * taxRate);
}

// Modern arrow syntax
const calculateTotalArrow = (price, taxRate) => price * (1 + taxRate);`,
    exampleCode: `<div style="font-family: sans-serif; padding: 14px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 320px;">
  <label style="font-size: 13px; color: #64748b;">Enter Number to Square:</label>
  <div style="display: flex; gap: 8px; margin-top: 6px;">
    <input type="number" id="numInput" value="7" style="width: 80px; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px;" />
    <button id="calcBtn" style="background: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Calculate</button>
  </div>
  <p id="resOutput" style="margin-top: 10px; font-weight: 600; color: #0369a1;">Square result: 49</p>
</div>

<script>
  const square = (n) => n * n;
  document.getElementById("calcBtn").onclick = () => {
    const val = Number(document.getElementById("numInput").value);
    document.getElementById("resOutput").innerText = "Square result: " + square(val);
  };
</script>`,
    expectedOutput: 'A compact calculator that squares whatever number is provided in the input.',
    explanation: 'Arrow functions provide a concise syntax for defining functions. When there is a single expression, the return statement is implicit.',
    importantNotes: [
      'Arrow functions do not bind their own this keyword, adopting this from the enclosing lexical scope.',
      'Always validate and parse input values from the DOM (which are strings by default) before math calculations.'
    ],
    commonMistakes: [
      'Forgetting to return a value from a multi-line arrow function.',
      'Treating DOM input.value as a number without Number(val) or parseInt(val).'
    ]
  },
  {
    id: 'js-dom-manipulation',
    languageId: 'javascript',
    order: 3,
    title: 'DOM Manipulation',
    slug: 'dom-manipulation',
    description: 'Select, create, update, and remove HTML elements dynamically in real-time.',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    whatIsIt: 'The Document Object Model (DOM) is an object-oriented representation of the webpage that JavaScript can inspect and mutate.',
    whyUseIt: 'Modern web experiences rely on updating the UI on the fly—rendering new list items, updating badges, and toggling dark mode.',
    syntax: `const element = document.querySelector('.target');
element.textContent = 'Updated Content';
element.classList.add('active');`,
    exampleCode: `<div style="font-family: sans-serif; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <ul id="itemList" style="margin: 0 0 12px 0; padding-left: 20px; color: #334155;">
    <li>HTML5 Foundations</li>
    <li>Modern CSS Layouts</li>
  </ul>
  <button id="addBtn" style="background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer;">
    + Add JavaScript Task
  </button>
</div>

<script>
  document.getElementById("addBtn").addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = "JavaScript DOM Mastered (" + new Date().getSeconds() + "s)";
    document.getElementById("itemList").appendChild(li);
  });
</script>`,
    expectedOutput: 'An unordered list that appends fresh list elements each time the button is clicked.',
    explanation: 'document.createElement creates an in-memory node, which is subsequently placed into the active document tree with appendChild or append.',
    importantNotes: [
      'Prefer textContent over innerHTML when inserting user text to eliminate Cross-Site Scripting (XSS) risks.',
      'Batch DOM mutations or use DocumentFragment when creating numerous elements at once.'
    ],
    commonMistakes: [
      'Overwriting innerHTML on a parent, which wipes away event listeners attached to existing child elements.'
    ]
  },

  // ===================== PYTHON =====================
  {
    id: 'py-intro',
    languageId: 'python',
    order: 1,
    title: 'Python Introduction',
    slug: 'introduction',
    description: 'Learn the Python philosophy, syntax simplicity, variables, and indentation rules.',
    difficulty: 'Beginner',
    estimatedMinutes: 8,
    whatIsIt: 'Python is an interpreted, high-level, general-purpose programming language famed for clear readability and productivity.',
    whyUseIt: 'Python dominates artificial intelligence, backend engineering, data science, automation scripting, and rapid prototyping.',
    syntax: `# Python syntax uses indentation instead of curly braces
name = "Eduqora"
modules = 9
print(f"Welcome to {name} with {modules} language tracks!")`,
    exampleCode: `student_name = "Alex"
course_xp = 1250
level = course_xp // 100

print("Student Record:")
print("Name:", student_name)
print("Total XP:", course_xp)
print("Current Level:", level)`,
    expectedOutput: `Student Record:
Name: Alex
Total XP: 1250
Current Level: 12`,
    explanation: 'Python uses newlines to finish a statement and whitespace indentation (usually 4 spaces) to define code blocks instead of semicolons and brackets.',
    importantNotes: [
      'Consistent indentation is mandatory; mixing tabs and spaces will produce an IndentationError.',
      'Variables are dynamically typed: you do not declare types beforehand.'
    ],
    commonMistakes: [
      'Mixing tabs and spaces.',
      'Forgetting the colon (:) at the end of if, for, while, or def statements.'
    ]
  },
  {
    id: 'py-control-flow',
    languageId: 'python',
    order: 2,
    title: 'Conditionals & Loops',
    slug: 'control-flow',
    description: 'Direct code execution flow using if-elif-else statements and for/while loops.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    whatIsIt: 'Control flow constructs determine which blocks of instructions execute based on conditions and repetitions.',
    whyUseIt: 'Algorithms require making decisions based on varying input data and processing collections systematically.',
    syntax: `scores = [85, 92, 78, 95]
for score in scores:
    if score >= 90:
        print("Honor Roll:", score)
    else:
        print("Standard Pass:", score)`,
    exampleCode: `languages = ["HTML", "CSS", "JavaScript", "Python", "SQL"]

print("--- Eduqora Roadmap ---")
for index, lang in enumerate(languages, start=1):
    print(f"{index}. {lang}")`,
    expectedOutput: `--- Eduqora Roadmap ---
1. HTML
2. CSS
3. JavaScript
4. Python
5. SQL`,
    explanation: 'The for ... in loop iterates smoothly over sequences like lists or strings. The built-in enumerate() function provides an automated loop counter.',
    importantNotes: [
      'Python uses elif rather than else if.',
      'The range(start, stop, step) generator generates numerical sequences efficiently.'
    ],
    commonMistakes: [
      'Off-by-one errors when using range(n), which stops at n - 1.'
    ]
  },

  // ===================== SQL =====================
  {
    id: 'sql-intro',
    languageId: 'sql',
    order: 1,
    title: 'SQL SELECT & Foundations',
    slug: 'select-foundations',
    description: 'Query rows and columns from relational tables using standard SELECT statements.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    whatIsIt: 'SQL (Structured Query Language) is the domain-specific standard for storing, retrieving, and manipulating data stored in relational databases.',
    whyUseIt: 'Almost all enterprise systems, mobile applications, and web backends persist core information in relational databases.',
    syntax: `SELECT column1, column2 FROM table_name WHERE condition;`,
    exampleCode: `-- Try real SQL execution right now in Eduqora!
SELECT student_id, name, course, xp 
FROM students 
WHERE xp > 500 
ORDER BY xp DESC;`,
    expectedOutput: `Table result with students sorted by XP descending.`,
    explanation: 'The SELECT keyword specifies which columns to retrieve, FROM designates the source table, and WHERE filters records matching a boolean condition.',
    importantNotes: [
      'SQL keywords are customarily capitalized for readability, though syntax is case-insensitive.',
      'SELECT * fetches every column, but in production, explicitly naming required columns saves bandwidth.'
    ],
    commonMistakes: [
      'Using double quotes instead of single quotes for string literals in standard SQL.',
      'Forgetting the WHERE clause when writing UPDATE or DELETE statements.'
    ]
  },
  {
    id: 'sql-joins',
    languageId: 'sql',
    order: 2,
    title: 'SQL Table JOINs',
    slug: 'joins',
    description: 'Combine related data across multiple tables using INNER JOIN and foreign keys.',
    difficulty: 'Intermediate',
    estimatedMinutes: 14,
    whatIsIt: 'A JOIN clause matches records from two or more tables based on a related column between them (foreign keys).',
    whyUseIt: 'Normalized relational schemas store data in modular tables (e.g. students and courses) to eliminate data redundancy.',
    syntax: `SELECT orders.id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;`,
    exampleCode: `SELECT s.name AS student, c.course_title, e.grade
FROM enrollments e
INNER JOIN students s ON e.student_id = s.student_id
INNER JOIN courses c ON e.course_id = c.course_id;`,
    expectedOutput: 'A unified table combining student names with the exact courses and grades they earned.',
    explanation: 'INNER JOIN returns records that have matching values in both tables. Table aliases (e.g. s, c, e) make queries concise and disambiguate identically named columns.',
    importantNotes: [
      'An INNER JOIN discards rows from either table that lack a corresponding match.',
      'Use LEFT JOIN if you wish to retain all rows from the primary table even without child matches.'
    ],
    commonMistakes: [
      'Omitting the ON condition, which results in a massive and slow Cartesian product (CROSS JOIN).'
    ]
  },

  // ===================== C / C++ / JAVA / PHP =====================
  {
    id: 'c-basics',
    languageId: 'c',
    order: 1,
    title: 'C Fundamentals & Main',
    slug: 'fundamentals',
    description: 'Learn C data types, memory layout, header inclusion, and entry function main().',
    difficulty: 'Intermediate',
    estimatedMinutes: 12,
    whatIsIt: 'C is a compiled, procedural language that provides direct access to system memory and machine-level instructions.',
    whyUseIt: 'Operating systems (Linux kernel, Windows core), embedded devices, and language runtimes are predominantly authored in C.',
    syntax: `#include <stdio.h>

int main() {
    printf("Hello from Eduqora C Lab!\\n");
    return 0;
}`,
    exampleCode: `#include <stdio.h>

int main() {
    int lessons_completed = 15;
    float completion_rate = 75.5;
    
    printf("Eduqora C Statistics:\\n");
    printf("Completed: %d lessons\\n", lessons_completed);
    printf("Progress: %.1f%%\\n", completion_rate);
    return 0;
}`,
    expectedOutput: `Eduqora C Statistics:
Completed: 15 lessons
Progress: 75.5%`,
    explanation: 'Execution begins at main(). Format specifiers like %d (integers) and %f (floats) tell printf how to format memory into human-readable characters.',
    importantNotes: [
      'C is statically typed; all variable types must be declared at compile time.',
      'Arrays in C do not retain their own length; you must pass sizes alongside pointers.'
    ],
    commonMistakes: [
      'Buffer overflows by copying more data than allocated.',
      'Forgetting the newline character \\n in printf statements.'
    ]
  },
  {
    id: 'cpp-classes',
    languageId: 'cpp',
    order: 1,
    title: 'C++ Classes & Objects',
    slug: 'classes-and-objects',
    description: 'Harness modern C++ object-oriented design with classes, access specifiers, and methods.',
    difficulty: 'Advanced',
    estimatedMinutes: 14,
    whatIsIt: 'C++ expands C by introducing object-oriented features, strong type abstraction, and template metaprogramming.',
    whyUseIt: 'High-performance applications requiring deterministic resource management (games, browsers, trading engines) rely on C++.',
    syntax: `class Student {
public:
    std::string name;
    int xp;
    void addXp(int points) { xp += points; }
};`,
    exampleCode: `#include <iostream>
#include <string>

class Course {
public:
    std::string title;
    int lessons;
    
    Course(std::string t, int l) : title(t), lessons(l) {}
    
    void display() {
        std::cout << "Course: " << title << " [" << lessons << " modules]" << std::endl;
    }
};

int main() {
    Course c1("C++ High Performance", 14);
    c1.display();
    return 0;
}`,
    expectedOutput: `Course: C++ High Performance [14 modules]`,
    explanation: 'Constructors initialize member variables directly through member initializer lists, guaranteeing optimal initialization performance.',
    importantNotes: [
      'Remember the semicolon after class definition closing braces (};).',
      'Prefer RAII (Resource Acquisition Is Initialization) and smart pointers over raw new/delete.'
    ],
    commonMistakes: [
      'Forgetting the semicolon at the end of class declarations.',
      'Memory leaks from unmanaged raw pointers.'
    ]
  },
  {
    id: 'java-oop',
    languageId: 'java',
    order: 1,
    title: 'Java Classes & Methods',
    slug: 'classes-methods',
    description: 'Understand the JVM paradigm, class architecture, encapsulation, and methods.',
    difficulty: 'Intermediate',
    estimatedMinutes: 12,
    whatIsIt: 'Java is an object-oriented, class-based, secure programming language that executes inside the Java Virtual Machine (JVM).',
    whyUseIt: 'Java powers high-scale backend services, Android apps, and resilient corporate infrastructure worldwide.',
    syntax: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Eduqora!");
    }
}`,
    exampleCode: `public class LabStudent {
    private String name;
    private int xp;

    public LabStudent(String name, int initialXp) {
        this.name = name;
        this.xp = initialXp;
    }

    public void earnPoints(int points) {
        this.xp += points;
    }

    public void printStatus() {
        System.out.println("Student " + name + " has " + xp + " XP.");
    }

    public static void main(String[] args) {
        LabStudent s = new LabStudent("Maya", 450);
        s.earnPoints(50);
        s.printStatus();
    }
}`,
    expectedOutput: `Student Maya has 500 XP.`,
    explanation: 'Java enforces strict object orientation: all executable code must reside inside a class. Encapsulation protects internal state via private fields and public accessors.',
    importantNotes: [
      'The file name must match the public class name exactly (LabStudent.java).',
      'Primitive types (int, boolean) differ from their object wrappers (Integer, Boolean).'
    ],
    commonMistakes: [
      'Trying to use == for String comparison instead of .equals().',
      'Calling non-static methods directly from static main without instantiating an object.'
    ]
  },
  {
    id: 'php-basics',
    languageId: 'php',
    order: 1,
    title: 'PHP Basics & Server Output',
    slug: 'basics-output',
    description: 'Learn PHP syntax, variables starting with $, array structures, and HTML embedding.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    whatIsIt: 'PHP is a widely used open source general-purpose scripting language especially suited for web development.',
    whyUseIt: 'Powers major CMS platforms like WordPress and enterprise frameworks like Laravel, running on over 75% of server-side websites.',
    syntax: `<?php
$welcomeMessage = "Welcome to Eduqora PHP Lab";
echo "<h2>" . $welcomeMessage . "</h2>";
?>`,
    exampleCode: `<?php
$student = "Jordan";
$skills = ["HTML", "CSS", "PHP", "MySQL"];

echo "Student: $student\\n";
echo "Enrolled Skills:\\n";
foreach ($skills as $skill) {
    echo "- $skill\\n";
}
?>`,
    expectedOutput: `Student: Jordan
Enrolled Skills:
- HTML
- CSS
- PHP
- MySQL`,
    explanation: 'PHP code is enclosed in <?php ... ?> tags. Variables always start with a dollar sign ($) and strings concatenate using the dot operator (.).',
    importantNotes: [
      'Variables in double quotes are interpolated automatically ($var inside "hello $var").',
      'Always sanitize and validate incoming superglobals like $_GET and $_POST.'
    ],
    commonMistakes: [
      'Using the plus sign (+) instead of dot (.) for string concatenation.',
      'Forgetting the leading dollar sign on variable names.'
    ]
  }
];
