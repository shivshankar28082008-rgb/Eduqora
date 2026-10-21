import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const ATTRIBUTE_EVENT_TAGS: HtmlTagItem[] = [
  // =========================================================================
  // GLOBAL ATTRIBUTES
  // =========================================================================
  {
    id: 'attr-class',
    name: 'class (Global Attribute)',
    syntax: '<element class="classname1 classname2">',
    category: 'attributes',
    categoryLabel: 'HTML Attributes',
    shortDesc: 'Specifies one or more CSS class names for styling and JavaScript selection.',
    hinglish: '"class" attribute sabse zyada use hone wala global attribute hai. Yeh ek ya ek se zyada CSS class names assign karta hai (space se separate karke). Isse CSS me styling ki ja sakti hai (.btn {}) aur JavaScript me document.getElementsByClassName ya querySelectorAll se elements pakde ja sakte hain.',
    status: 'attribute',
    isVoid: false,
    closingTagUsage: 'Attribute placed inside opening HTML tag.',
    supportedAttributes: ['Global to all HTML elements'],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .card { background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: bold; background: #e0e7ff; color: #4338ca; }
    .btn { padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <div class="card">
    <span class="badge">class="badge"</span>
    <h3 style="margin-top: 10px;">Reusable Styling via Class Attribute</h3>
    <button class="btn">Explore Courses</button>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Class names do not impact screen reader accessibility directly, but styles applied through classes must meet contrast guidelines.',
    seoRelevance: 'Helps crawlers identify structured patterns and microdata classes.',
    commonMistakes: [
      {
        mistake: 'Using commas to separate class names: class="btn, primary".',
        solution: 'Use spaces to separate multiple classes: class="btn primary".',
        explanation: 'Commas are treated as part of the class name string.'
      }
    ],
    relatedElements: ['attr-id', 'attr-style'],
    interviewQuestions: [
      {
        question: 'Can an HTML element have multiple classes?',
        answer: 'Yes! Multiple classes can be assigned to a single element, separated by whitespace, e.g. class="btn btn-primary active".',
        hinglishTip: 'Space laga kar ek sath multiple class names diye ja sakte hain.'
      }
    ],
    practiceExercise: {
      title: 'Assign Multiple Classes',
      prompt: 'Add class="card shadow-lg" to a <div> container.',
      starterCode: `<div>
  <h3>Card</h3>
</div>`,
      solutionCode: `<div class="card shadow-lg">
  <h3>Card</h3>
</div>`,
      hint: 'Include class="card shadow-lg".'
    }
  },
  {
    id: 'attr-id',
    name: 'id (Global Attribute)',
    syntax: '<element id="uniqueId">',
    category: 'attributes',
    categoryLabel: 'HTML Attributes',
    shortDesc: 'Specifies a unique identifier for an element in the entire HTML document.',
    hinglish: '"id" attribute webpage ke kisi ek specific element ko ek unique pehchan (identifier) deta hai. Poore page par ek ID sirf ek hi element ko di ja sakti hai! Iska use JavaScript me document.getElementById, CSS me #id selector, internal bookmark links (#section-1), aur <label for="id"> connect karne me hota hai.',
    status: 'attribute',
    isVoid: false,
    closingTagUsage: 'Attribute placed inside opening HTML tag.',
    supportedAttributes: ['Global to all HTML elements'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div id="counter-card" style="padding: 20px; background: #1e1e2f; color: white; border-radius: 12px; max-width: 320px;">
    <h3 style="margin-top: 0; color: #38bdf8;">Unique ID Selector</h3>
    <p id="count-label">Count: 0</p>
    <button id="inc-button" style="padding: 8px 16px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
      Increment via ID
    </button>
  </div>

  <script>
    // Fast O(1) DOM lookup using ID
    let c = 0;
    const btn = document.getElementById('inc-button');
    const lbl = document.getElementById('count-label');
    btn.addEventListener('click', () => {
      c++;
      lbl.textContent = 'Count: ' + c;
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Duplicate IDs break assistive technologies like screen readers, which rely on unique IDs for aria-labelledby and aria-describedby references.',
    seoRelevance: 'Enables Google jump-to link anchors directly into page sections.',
    commonMistakes: [
      {
        mistake: 'Using the same ID multiple times on the same page.',
        solution: 'IDs must be strictly unique per page; use classes if multiple elements need the same identifier.',
        explanation: 'Duplicate IDs break document.getElementById and accessibility references.'
      }
    ],
    relatedElements: ['attr-class', 'label', 'a'],
    interviewQuestions: [
      {
        question: 'Why must the id attribute be strictly unique on a webpage?',
        answer: 'Browsers map IDs into a hash table where document.getElementById returns only the first occurrence. Duplicate IDs also break ARIA accessibility references, form label bindings, and fragment URL navigation.',
        hinglishTip: 'Poore HTML document me ek ID sirf ek hi element ke paas honi chahiye.'
      }
    ],
    practiceExercise: {
      title: 'Assign Unique ID',
      prompt: 'Assign id="main-header" to an <h1> element.',
      starterCode: `<h1>Codevaible</h1>`,
      solutionCode: `<h1 id="main-header">Codevaible</h1>`,
      hint: 'Add id="main-header" inside <h1>.'
    }
  },
  {
    id: 'attr-hidden',
    name: 'hidden (Global Attribute)',
    syntax: '<element hidden>',
    category: 'attributes',
    categoryLabel: 'HTML Attributes',
    shortDesc: 'A boolean attribute indicating that the element is not yet, or is no longer, directly relevant.',
    hinglish: '"hidden" ek boolean attribute hai. Jab kisi element par hidden likh diya jaata hai, toh browser usko screen par completely invisible kar deta hai (display: none ki tarah) aur screen readers bhi isko ignore kar dete hain. Isko JavaScript se element.hidden = false karke reveal kiya ja sakta hai.',
    status: 'attribute',
    isVoid: false,
    closingTagUsage: 'Boolean attribute.',
    supportedAttributes: ['Global to all HTML elements'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <button id="toggle-btn" style="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
    Toggle Hidden Secret Note
  </button>

  <div id="secret-box" hidden style="margin-top: 16px; padding: 16px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; color: #065f46;">
    🎉 Congratulations! You revealed this box using the native <code>hidden</code> attribute!
  </div>

  <script>
    const btn = document.getElementById('toggle-btn');
    const box = document.getElementById('secret-box');
    btn.addEventListener('click', () => {
      box.hidden = !box.hidden;
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'The hidden attribute completely removes the element from the accessibility tree, making it invisible to all screen readers.',
    seoRelevance: 'Content with hidden attribute is treated as non-visible.',
    commonMistakes: [
      {
        mistake: 'Using hidden="false" expecting it to be visible.',
        solution: 'To show an element, remove the hidden attribute completely or set element.hidden = false in JS.',
        explanation: 'Any presence of the hidden attribute (even hidden="false") is truthy in HTML.'
      }
    ],
    relatedElements: ['details', 'dialog'],
    interviewQuestions: [
      {
        question: 'What is the difference between hidden attribute and CSS opacity: 0?',
        answer: 'hidden removes the element from visual display and accessibility tree (like display: none). opacity: 0 keeps the element in the DOM layout, focusable by keyboard, and announced by screen readers.',
        hinglishTip: 'hidden display: none ki tarah kaam karta hai; opacity: 0 sirf visually transparent karta hai.'
      }
    ],
    practiceExercise: {
      title: 'Hide Alert Box with Hidden Attribute',
      prompt: 'Add the hidden attribute to a <div> alert box.',
      starterCode: `<div class="alert">Secret content</div>`,
      solutionCode: `<div class="alert" hidden>Secret content</div>`,
      hint: 'Add hidden inside the <div> tag.'
    }
  },
  {
    id: 'attr-tabindex',
    name: 'tabindex (Global Attribute)',
    syntax: '<element tabindex="0"> or <element tabindex="-1">',
    category: 'attributes',
    categoryLabel: 'HTML Attributes',
    shortDesc: 'Controls whether an element can receive keyboard focus and its tab navigation order.',
    hinglish: '"tabindex" keyboard navigation (Tab key dabane par focus kahan jaaye) ko control karta hai. tabindex="0" kisi non-clickable tag (jaise <div>) ko keyboard focusable banata hai normal tab sequence me. tabindex="-1" element ko sirf JavaScript ke .focus() method se focusable banata hai (Tab key se skip ho jata hai). Positive tabindex (>0) use karne se bachein!',
    status: 'attribute',
    isVoid: false,
    closingTagUsage: 'Attribute placed on elements.',
    supportedAttributes: ['Global to all HTML elements'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Keyboard Navigation Test (Press TAB to cycle):</h3>
  <div style="display: flex; gap: 12px;">
    <!-- Naturally focusable -->
    <button style="padding: 8px 14px;">Button 1</button>
    
    <!-- Custom focusable card via tabindex="0" -->
    <div tabindex="0" style="padding: 8px 14px; background: #f1f5f9; border: 2px solid transparent; border-radius: 6px; cursor: pointer; outline: none;" onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='transparent'">
      Custom Card (tabindex="0")
    </div>

    <!-- Skipped from Tab order via tabindex="-1" -->
    <button tabindex="-1" style="padding: 8px 14px; opacity: 0.6;">Skipped (tabindex="-1")</button>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Essential for custom widgets: tabindex="0" places custom elements into natural keyboard focus order; tabindex="-1" allows programmatic focus management (like focusing errors).',
    seoRelevance: 'None directly, but required for keyboard accessibility audits.',
    commonMistakes: [
      {
        mistake: 'Using positive tabindex values like tabindex="1", tabindex="2".',
        solution: 'Only use tabindex="0" or tabindex="-1"; let natural DOM order dictate tab sequence.',
        explanation: 'Positive tabindex disrupts the logical tab order and disorients keyboard users.'
      }
    ],
    relatedElements: ['button', 'a', 'input'],
    interviewQuestions: [
      {
        question: 'What is the difference between tabindex="0" and tabindex="-1"?',
        answer: 'tabindex="0" inserts the element into the natural keyboard Tab sequence in DOM order. tabindex="-1" makes the element focusable only via JavaScript (element.focus()), skipping it from normal Tab key navigation.',
        hinglishTip: 'tabindex="0" keyboard tab order me add karta hai; tabindex="-1" tab key se skip karta hai lekin JS se focus karne deta hai.'
      }
    ],
    practiceExercise: {
      title: 'Make Custom Card Focusable',
      prompt: 'Add tabindex="0" to a custom clickable card div.',
      starterCode: `<div role="button">Interactive Card</div>`,
      solutionCode: `<div role="button" tabindex="0">Interactive Card</div>`,
      hint: 'Include tabindex="0".'
    }
  },
  {
    id: 'attr-data',
    name: 'data-* (Custom Data Attributes)',
    syntax: '<element data-user-id="123" data-role="admin">',
    category: 'attributes',
    categoryLabel: 'HTML Attributes',
    shortDesc: 'Embeds custom data private to the page or application directly on HTML elements.',
    hinglish: '"data-*" attributes developers ko kisi bhi HTML element par apna custom data store karne ki suvidha dete hain bina HTML standard todhe. JavaScript me isko `element.dataset.userId` se directly access kiya ja sakta hai aur CSS me `[data-role="admin"]` se style kiya ja sakta hai.',
    status: 'attribute',
    isVoid: false,
    closingTagUsage: 'Custom attribute prefix.',
    supportedAttributes: ['Global to all HTML elements'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Data-* Attributes in Action:</h3>
  <div style="display: flex; gap: 10px;">
    <button class="topic-btn" data-topic-id="arrays" data-complexity="O(1)" style="padding: 8px 14px; background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; border-radius: 6px; cursor: pointer;">
      Arrays
    </button>
    <button class="topic-btn" data-topic-id="trees" data-complexity="O(log n)" style="padding: 8px 14px; background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; border-radius: 6px; cursor: pointer;">
      Binary Trees
    </button>
  </div>
  <p id="info-box" style="margin-top: 16px; font-weight: bold; color: #1e293b;">Click a topic button to read its data-* dataset!</p>

  <script>
    document.querySelectorAll('.topic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.topicId;
        const comp = btn.dataset.complexity;
        document.getElementById('info-box').textContent = 'Selected Topic: ' + id + ' | Lookup Complexity: ' + comp;
      });
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Custom data-* attributes are not read by screen readers; use aria-* attributes if conveying accessibility information.',
    seoRelevance: 'Useful for micro-interactions and analytics tracking.',
    commonMistakes: [
      {
        mistake: 'Using data-* attributes for accessibility information instead of aria-*.',
        solution: 'Use aria-label, aria-expanded for screen readers; use data-* strictly for scripts/CSS.',
        explanation: 'Screen readers do not inspect the dataset object.'
      }
    ],
    relatedElements: ['attr-class', 'attr-id'],
    interviewQuestions: [
      {
        question: 'How do you access data-user-role="editor" in JavaScript?',
        answer: 'Via the element\'s dataset property in camelCase: element.dataset.userRole.',
        hinglishTip: 'HTML ka hyphenated data-user-role JS me camelCase element.dataset.userRole ban jata hai.'
      }
    ],
    practiceExercise: {
      title: 'Attach Custom Data Attributes',
      prompt: 'Attach data-id="42" and data-status="active" to a <div>.',
      starterCode: `<div>User Profile</div>`,
      solutionCode: `<div data-id="42" data-status="active">User Profile</div>`,
      hint: 'Include data-id="42" data-status="active".'
    }
  },

  // =========================================================================
  // HTML EVENTS
  // =========================================================================
  {
    id: 'event-onclick',
    name: 'onclick (Event Handler)',
    syntax: '<button onclick="handleClick()">Click Me</button>',
    category: 'events',
    categoryLabel: 'HTML Events',
    shortDesc: 'Fires when a pointing device button is pressed and released on the element, or activated via keyboard.',
    hinglish: '"onclick" event tab trigger hota hai jab user mouse se click karta hai ya keyboard ke Enter/Space se button press karta hai. Yeh sabse popular interactive event hai. Modern best practice me inline onclick="..." ki jagah JS me addEventListener(\'click\', ...) use karna recommend kiya jaata hai.',
    status: 'event',
    isVoid: false,
    closingTagUsage: 'Event attribute on interactive elements.',
    supportedAttributes: ['Global event attribute'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <button id="alert-btn" style="padding: 10px 18px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
    Click Me to Trigger Event!
  </button>
  <p id="click-status" style="margin-top: 12px; color: #475569;">Button not clicked yet.</p>

  <script>
    document.getElementById('alert-btn').addEventListener('click', () => {
      document.getElementById('click-status').textContent = '✅ Click event fired at: ' + new Date().toLocaleTimeString();
      document.getElementById('click-status').style.color = '#16a34a';
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Native <button> onclick automatically supports keyboard triggering via Space and Enter keys.',
    seoRelevance: 'Interactive events do not trigger crawler indexing directly.',
    commonMistakes: [
      {
        mistake: 'Putting onclick on a <div> without role="button" and keyboard handlers.',
        solution: 'Use a real <button> for click actions.',
        explanation: 'Div clicks cannot be focused or activated by keyboard-only users.'
      }
    ],
    relatedElements: ['button', 'a'],
    interviewQuestions: [
      {
        question: 'Why is addEventListener("click", ...) preferred over inline onclick="..." attributes?',
        answer: 'addEventListener supports multiple listeners on the same element, separates HTML structure from JavaScript logic, works with Content Security Policy (CSP), and allows event capturing and passive listeners.',
        hinglishTip: 'addEventListener clean separation of concerns deta hai aur CSP security standards se match karta hai.'
      }
    ],
    practiceExercise: {
      title: 'Attach Click Event Listener',
      prompt: 'Write a script that attaches a click listener to a button with id="btn".',
      starterCode: `<button id="btn">Click</button>
<script>
  // Add listener
</script>`,
      solutionCode: `<button id="btn">Click</button>
<script>
  document.getElementById('btn').addEventListener('click', () => {
    console.log('Clicked!');
  });
</script>`,
      hint: 'Use document.getElementById("btn").addEventListener("click", ...).'
    }
  },
  {
    id: 'event-onchange',
    name: 'onchange & oninput (Form Events)',
    syntax: '<input oninput="handleInput(event)" onchange="handleChange(event)">',
    category: 'events',
    categoryLabel: 'HTML Events',
    shortDesc: 'oninput fires synchronously on every keystroke; onchange fires when the value is committed on blur.',
    hinglish: '"oninput" aur "onchange" dono user input handle karte hain lekin ek zaroori farq ke saath: "oninput" har ek akshar type karte hi turant trigger hota hai (real-time live search ke liye best). Jabki "onchange" tab trigger hota hai jab user type karke bahar click karta hai (blur) ya dropdown option select karta hai.',
    status: 'event',
    isVoid: false,
    closingTagUsage: 'Event attributes on form controls.',
    supportedAttributes: ['Global event attribute on input, select, textarea'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="max-width: 340px; display: flex; flex-direction: column; gap: 12px;">
    <div>
      <label style="font-size: 12px; font-weight: bold;">oninput (Live on every keystroke):</label>
      <input type="text" id="live-in" placeholder="Type here..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
      <span id="live-out" style="font-size: 13px; color: #4f46e5; font-weight: 500; display: block; margin-top: 4px;">Live: (empty)</span>
    </div>

    <div>
      <label style="font-size: 12px; font-weight: bold;">onchange (Only after focus leaves):</label>
      <input type="text" id="change-in" placeholder="Type then click away..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
      <span id="change-out" style="font-size: 13px; color: #16a34a; font-weight: 500; display: block; margin-top: 4px;">Committed: (empty)</span>
    </div>
  </div>

  <script>
    document.getElementById('live-in').addEventListener('input', (e) => {
      document.getElementById('live-out').textContent = 'Live: ' + e.target.value;
    });
    document.getElementById('change-in').addEventListener('change', (e) => {
      document.getElementById('change-out').textContent = 'Committed: ' + e.target.value;
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Do not automatically submit forms or trigger unexpected page reloads inside onchange/oninput.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using onchange for instant search filter widgets.',
        solution: 'Use oninput for instant live character-by-character searching.',
        explanation: 'onchange does not fire until the user unfocuses (blurs) the input.'
      }
    ],
    relatedElements: ['input', 'textarea', 'select'],
    interviewQuestions: [
      {
        question: 'What is the precise difference between the input and change events?',
        answer: 'The input event fires synchronously on every keystroke or value mutation. The change event fires only when the value is committed (when the user presses Enter or blurs focus away from the input).',
        hinglishTip: 'input = har keystroke par turant; change = blur hone ya enter dabane par commit hone par.'
      }
    ],
    practiceExercise: {
      title: 'Handle Live Input',
      prompt: 'Attach an "input" event listener to an input field.',
      starterCode: `<input id="search">
<script>
  // Listen to input
</script>`,
      solutionCode: `<input id="search">
<script>
  document.getElementById('search').addEventListener('input', (e) => {
    console.log(e.target.value);
  });
</script>`,
      hint: 'Use addEventListener("input", ...).'
    }
  },

  // =========================================================================
  // KEY FORM INPUT TYPES
  // =========================================================================
  {
    id: 'input-types',
    name: 'HTML Form Input Types',
    syntax: '<input type="email|password|number|date|range|checkbox|radio">',
    category: 'input-types',
    categoryLabel: 'HTML Forms & Inputs',
    shortDesc: 'Overview of standard HTML5 input type values that trigger specialized virtual keyboards and native validations.',
    hinglish: 'HTML5 me <input> ke kai specialized types hote hain jo mobile phones par specific keyboard kholte hain (jaise type="email" par "@" button wala keyboard, type="number" par numeric keypad) aur automatically format validate karte hain bina custom JavaScript likhe.',
    status: 'input-type',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Void elements.',
    supportedAttributes: ['type', 'name', 'value', 'min', 'max', 'step', 'pattern', 'required'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>HTML5 Specialized Input Types:</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, min-width: 220px); gap: 12px; max-width: 500px;">
    <div>
      <label style="font-size: 12px; font-weight: bold;">Date Picker:</label>
      <input type="date" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 6px;">
    </div>
    <div>
      <label style="font-size: 12px; font-weight: bold;">Color Picker:</label>
      <input type="color" value="#4f46e5" style="width: 100%; height: 36px; padding: 2px; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
    </div>
    <div>
      <label style="font-size: 12px; font-weight: bold;">Numeric Counter (min 1, max 10):</label>
      <input type="number" min="1" max="10" value="5" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 6px;">
    </div>
    <div>
      <label style="font-size: 12px; font-weight: bold;">File Upload:</label>
      <input type="file" accept=".pdf,.png" style="width: 100%; font-size: 12px;">
    </div>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Mobile devices automatically open dedicated on-screen keyboards (email keyboards, telephone dials, number pads) based on the input type.',
    seoRelevance: 'Correct input types provide native validation error reporting.',
    commonMistakes: [
      {
        mistake: 'Using type="text" for phone numbers or email addresses.',
        solution: 'Always use type="tel" for phone numbers and type="email" for emails.',
        explanation: 'Specialized types provide the correct virtual keypad on mobile devices.'
      }
    ],
    relatedElements: ['input', 'form', 'label'],
    interviewQuestions: [
      {
        question: 'Why should you use type="email" and type="tel" over generic type="text"?',
        answer: 'They trigger mobile on-screen keyboards customized for the data type (e.g. showing @ and .com keys or a 10-digit number pad) and provide native browser validation.',
        hinglishTip: 'Mobile par sahi keyboard (jaise @ symbol ya numeric pad) khulne ke liye type="email" aur type="tel" zaroori hai.'
      }
    ],
    practiceExercise: {
      title: 'Create Date and Number Inputs',
      prompt: 'Construct a form with a date input and a number input with min="1" and max="5".',
      starterCode: `<div>
  <!-- Add date and number inputs -->
</div>`,
      solutionCode: `<div>
  <input type="date" name="bday">
  <input type="number" name="rating" min="1" max="5">
</div>`,
      hint: 'Use type="date" and type="number" min="1" max="5".'
    }
  }
];
