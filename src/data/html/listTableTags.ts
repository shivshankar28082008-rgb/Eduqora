import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const LIST_TABLE_TAGS: HtmlTagItem[] = [
  // =========================================================================
  // LISTS (ul, ol, li, dl, dt, dd, menu)
  // =========================================================================
  {
    id: 'ul',
    name: '<ul>',
    syntax: '<ul><li>Item 1</li><li>Item 2</li></ul>',
    category: 'lists',
    categoryLabel: 'Lists',
    shortDesc: 'Represents an unordered list of items, typically rendered as a bulleted list.',
    hinglish: '<ul> (unordered list) un items ki list ke liye use hota hai jahan items ka kram (order/sequence) matter nahi karta. Jaise grocery list, navigation menu items, ya feature highlights. Browser har item ke aage default roop se bullet points (dots) lagata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</ul>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Unordered List (Bullet Points):</h3>
  <ul style="line-height: 1.8; color: #334155;">
    <li>Arrays &amp; Dynamic Arrays</li>
    <li>Singly &amp; Doubly Linked Lists</li>
    <li>Stacks &amp; Queues</li>
    <li>Binary Trees &amp; BST</li>
  </ul>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers announce the total number of items when entering a list (e.g. "List, 4 items"), helping visually impaired users know how many items to expect.',
    seoRelevance: 'Search engines use <ul> lists to generate bulleted featured snippet cards in Google search rankings.',
    commonMistakes: [
      {
        mistake: 'Placing direct text or <div> inside <ul> without wrapping in <li>.',
        solution: 'Only <li> elements (and <script>/<template>) are legally allowed as direct children of <ul>.',
        explanation: 'Invalid direct children inside <ul> break list semantics.'
      }
    ],
    relatedElements: ['ol', 'li', 'menu'],
    interviewQuestions: [
      {
        question: 'Which HTML elements are legally permitted as direct children of <ul>?',
        answer: 'Only <li> elements, plus script-supporting elements (<script> and <template>). Direct text, <div>, or <p> tags are invalid.',
        hinglishTip: '<ul> ke seedhe andar sirf <li> aa sakta hai, koi aur tag nahi.'
      }
    ],
    practiceExercise: {
      title: 'Build Unordered Features List',
      prompt: 'Create a <ul> containing three <li> items describing skills.',
      starterCode: `<body>
  <!-- Create unordered list -->
</body>`,
      solutionCode: `<body>
  <ul>
    <li>HTML5 Semantic Markup</li>
    <li>CSS3 Modern Flexbox</li>
    <li>JavaScript ES6+</li>
  </ul>
</body>`,
      hint: 'Wrap items in <ul><li>...</li></ul>.'
    }
  },
  {
    id: 'ol',
    name: '<ol>',
    syntax: '<ol type="1" start="1"><li>Step 1</li><li>Step 2</li></ol>',
    category: 'lists',
    categoryLabel: 'Lists',
    shortDesc: 'Represents an ordered list of items, rendered with numbers, letters, or roman numerals.',
    hinglish: '<ol> (ordered list) un items ke liye use hota hai jahan items ka sequence ya step-by-step order mahatvapurna hota hai. Jaise recipe ke steps, algorithm execution steps, ya leaderboard ranking. Browser isko automatically numbers (1, 2, 3), letters (A, B, C), ya Roman numerals (I, II, III) deta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</ol>).',
    supportedAttributes: ['type', 'start', 'reversed', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Binary Search Algorithm Steps:</h3>
  <ol type="1" style="line-height: 1.8; color: #1e293b;">
    <li>Initialize two pointers: <code>left = 0</code> and <code>right = n - 1</code>.</li>
    <li>Calculate middle index: <code>mid = Math.floor((left + right) / 2)</code>.</li>
    <li>If <code>arr[mid] === target</code>, return index <code>mid</code>.</li>
    <li>If target is smaller, adjust <code>right = mid - 1</code>; otherwise <code>left = mid + 1</code>.</li>
    <li>Repeat until found or <code>left &gt; right</code>.</li>
  </ol>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers announce positional numbers for each step (e.g. "Item 1 of 5").',
    seoRelevance: 'Google relies heavily on <ol> for "How-to" rich snippet step-by-step guides.',
    commonMistakes: [
      {
        mistake: 'Manually hardcoding numbers like "1.", "2." inside the text of <li>.',
        solution: 'Let the browser manage numbering via <ol>; do not type numbers by hand.',
        explanation: 'Hardcoding numbers causes screen readers to redundantly say "1. 1. Step name".'
      }
    ],
    relatedElements: ['ul', 'li'],
    interviewQuestions: [
      {
        question: 'What does the "reversed" attribute do on an <ol> tag?',
        answer: 'It numbers list items in descending/countdown order (e.g. 5, 4, 3, 2, 1) without reversing the actual DOM order of elements.',
        hinglishTip: '<ol reversed> likhne se numbers ulte ho jate hain jaise countdown 3, 2, 1.'
      }
    ],
    practiceExercise: {
      title: 'Create Countdown Ordered List',
      prompt: 'Create an <ol> with reversed attribute counting down 3 items.',
      starterCode: `<body>
  <!-- Create reversed ordered list -->
</body>`,
      solutionCode: `<body>
  <ol reversed>
    <li>Liftoff!</li>
    <li>Engine ignition</li>
    <li>Final system check</li>
  </ol>
</body>`,
      hint: 'Add reversed attribute to <ol>.'
    }
  },
  {
    id: 'li',
    name: '<li>',
    syntax: '<li>List item</li>',
    category: 'lists',
    categoryLabel: 'Lists',
    shortDesc: 'Represents an individual item inside an ordered (<ol>), unordered (<ul>), or menu (<menu>) list.',
    hinglish: '<li> (list item) kisi bhi list ka ek single item hota hai. Yeh hamesha kisi parent list tag (<ul>, <ol>, ya <menu>) ke andar hi hona chahiye. Iske bina akela <li> likhna invalid HTML hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</li>).',
    supportedAttributes: ['value (for ol items)', 'Global attributes'],
    exampleCode: `<ol>
  <li value="100">Centennial item (forced to 100 via value attribute)</li>
  <li>Auto increments to 101</li>
  <li>Auto increments to 102</li>
</ol>`,
    accessibilityGuidance: 'Must be housed in a parent list element to expose correct list item role.',
    seoRelevance: 'Part of list extraction algorithms.',
    commonMistakes: [
      {
        mistake: 'Using <li> outside of a <ul>, <ol>, or <menu>.',
        solution: 'Always wrap <li> in an appropriate list container.',
        explanation: 'Standalone <li> elements fail HTML validation.'
      }
    ],
    relatedElements: ['ul', 'ol', 'menu'],
    interviewQuestions: [
      {
        question: 'Can the value attribute be used on <li> inside <ul>?',
        answer: 'No. The "value" attribute on <li> is only valid when the parent is an ordered list (<ol>), allowing you to explicitly override that item\'s ordinal number.',
        hinglishTip: 'value attribute sirf <ol> ke andar wale <li> me kaam karta hai number set karne ke liye.'
      }
    ],
    practiceExercise: {
      title: 'Override Numbering with Li Value',
      prompt: 'Create an <ol> where the second item jumps to number 10 using value="10".',
      starterCode: `<ol>
  <li>First item</li>
  <!-- Add second item with value 10 -->
</ol>`,
      solutionCode: `<ol>
  <li>First item</li>
  <li value="10">Tenth item</li>
</ol>`,
      hint: 'Add value="10" to the second <li>.'
    }
  },
  {
    id: 'dl-dt-dd',
    name: '<dl>, <dt>, <dd>',
    syntax: '<dl><dt>Term</dt><dd>Definition</dd></dl>',
    category: 'lists',
    categoryLabel: 'Lists',
    shortDesc: 'Description list (<dl>) containing pairs of terms (<dt>) and their descriptions/values (<dd>).',
    hinglish: '<dl> (description list) terms aur unki definitions ya key-value pairs ke liye use hota hai. <dt> (description term) name ya key hoti hai, aur <dd> (description details) uski value ya explanation hoti hai. Jaise dictionary, glossary, metadata specs, ya FAQ.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Data Structures Glossary (&lt;dl&gt;):</h3>
  <dl style="line-height: 1.6; color: #334155;">
    <dt style="font-weight: bold; color: #4f46e5; margin-top: 12px;">Stack</dt>
    <dd style="margin-left: 20px;">A Last-In, First-Out (LIFO) linear data structure supporting push and pop.</dd>

    <dt style="font-weight: bold; color: #4f46e5; margin-top: 12px;">Queue</dt>
    <dd style="margin-left: 20px;">A First-In, First-Out (FIFO) linear data structure supporting enqueue and dequeue.</dd>
  </dl>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers recognize description lists and announce term-definition associations.',
    seoRelevance: 'Frequently pulled by Google for definition answers and glossary search snippets.',
    commonMistakes: [
      {
        mistake: 'Putting <dd> before <dt>.',
        solution: 'Always specify the term <dt> before its description <dd>.',
        explanation: 'Term must precede its definition in DOM order.'
      }
    ],
    relatedElements: ['dfn', 'ul'],
    interviewQuestions: [
      {
        question: 'Can a single <dt> have multiple <dd> elements, or vice versa?',
        answer: 'Yes! Multiple <dt> tags can share one <dd> (synonyms having one definition), or one <dt> can have multiple <dd> tags (one word with several distinct meanings).',
        hinglishTip: 'Haan, ek term ke kai definitions (<dd>) ho sakte hain, ya kai terms ka ek hi definition ho sakta hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Key-Value Description List',
      prompt: 'Create a <dl> with one <dt> for "HTML" and one <dd> defining it.',
      starterCode: `<body>
  <!-- Create dl, dt, dd -->
</body>`,
      solutionCode: `<body>
  <dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language, the standard for web page structure.</dd>
  </dl>
</body>`,
      hint: 'Include <dl><dt>...</dt><dd>...</dd></dl>.'
    }
  },
  {
    id: 'menu',
    name: '<menu>',
    syntax: '<menu><li><button>Action</button></li></menu>',
    category: 'lists',
    categoryLabel: 'Lists',
    shortDesc: 'A semantic alternative to <ul> specifically for toolbars and interactive command menus.',
    hinglish: '<menu> tag <ul> ka ek semantic alternative hai jo specifically interactive commands, toolbars, ya action buttons ke group ke liye banaya gaya hai. HTML5 me yeh <ul> ki tarah kaam karta hai lekin iska semantic intention user actions aur toolbars darshana hota hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</menu>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Editor Command Toolbar (&lt;menu&gt;):</h3>
  <menu style="list-style: none; display: flex; gap: 8px; padding: 0; margin: 0;">
    <li><button style="padding: 6px 12px; background: #e2e8f0; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Run</button></li>
    <li><button style="padding: 6px 12px; background: #e2e8f0; border: none; border-radius: 4px; cursor: pointer;">Reset</button></li>
    <li><button style="padding: 6px 12px; background: #e2e8f0; border: none; border-radius: 4px; cursor: pointer;">Copy</button></li>
  </menu>
</body>
</html>`,
    accessibilityGuidance: 'Exposes toolbar/menu semantics to assistive technologies when combined with appropriate ARIA roles.',
    seoRelevance: 'Distinguishes interactive application command panels from content lists.',
    commonMistakes: [
      {
        mistake: 'Using deprecated <menuitem> inside <menu>.',
        solution: 'Use regular <li> with <button> elements inside <menu>.',
        explanation: '<menuitem> was deprecated and dropped; use standard <li> with buttons.'
      }
    ],
    relatedElements: ['ul', 'button', 'nav'],
    interviewQuestions: [
      {
        question: 'What is the current status of <menu> in modern HTML?',
        answer: 'In HTML5, <menu> is fully standardized as a semantic equivalent of <ul> specifically intended for interactive toolbars and command lists.',
        hinglishTip: '<menu> modern HTML me valid hai aur toolbars/action buttons ke list ke liye use hota hai.'
      }
    ],
    practiceExercise: {
      title: 'Create Toolbar Menu',
      prompt: 'Construct a <menu> element containing two <li> items with buttons.',
      starterCode: `<body>
  <!-- Build menu toolbar -->
</body>`,
      solutionCode: `<body>
  <menu>
    <li><button type="button">Save</button></li>
    <li><button type="button">Cancel</button></li>
  </menu>
</body>`,
      hint: 'Nest <li><button> inside <menu>.'
    }
  },

  // =========================================================================
  // TABLES (table, caption, thead, tbody, tfoot, tr, th, td, col, colgroup)
  // =========================================================================
  {
    id: 'table',
    name: '<table>',
    syntax: '<table border="1">...</table>',
    category: 'tables',
    categoryLabel: 'Tables',
    shortDesc: 'Represents tabular data — that is, information presented in a two-dimensional grid of rows and columns.',
    hinglish: '<table> tag tabular data (rows aur columns ka 2D data) display karne ke liye use hota hai. Jaise comparison charts, pricing tables, student marks, ya algorithm complexity matrices. KABHI BHI website layout banane ke liye table use na karein (layout ke liye CSS Grid ya Flexbox use karein).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</table>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
    <caption style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: #1e293b;">
      Algorithm Complexity Matrix
    </caption>
    <thead>
      <tr style="background: #4f46e5; color: white;">
        <th style="padding: 10px; border: 1px solid #6366f1;">Algorithm</th>
        <th style="padding: 10px; border: 1px solid #6366f1;">Best Time</th>
        <th style="padding: 10px; border: 1px solid #6366f1;">Worst Time</th>
        <th style="padding: 10px; border: 1px solid #6366f1;">Space</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #f8fafc;">
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Quick Sort</td>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0;">O(n log n)</td>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0; color: #dc2626;">O(n²)</td>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0;">O(log n)</td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Merge Sort</td>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0;">O(n log n)</td>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0;">O(n log n)</td>
        <td style="padding: 8px 10px; border: 1px solid #e2e8f0;">O(n)</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
    accessibilityGuidance: 'Always include <caption> and <th scope="col"> so screen readers announce row and column headers as blind users traverse cells.',
    seoRelevance: 'Tables are frequently converted directly into Google Featured Snippet table charts.',
    commonMistakes: [
      {
        mistake: 'Using <table> for page layout styling.',
        solution: 'Use CSS Flexbox or CSS Grid for page layouts; reserve <table> strictly for tabular data.',
        explanation: 'Layout tables break responsive screens and confuse screen readers.'
      }
    ],
    relatedElements: ['caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
    interviewQuestions: [
      {
        question: 'Why is using <table> for webpage layout considered a terrible practice today?',
        answer: 'It destroys responsive mobile scaling, creates massive inaccessible DOM structures, breaks screen-reader navigation, and severely slows browser rendering compared to CSS Grid/Flexbox.',
        hinglishTip: 'Purane zamaane me log table se layout banate the, aaj yeh sabse badi anti-pattern mani jaati hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Basic Data Table',
      prompt: 'Construct a <table> with a header row containing two <th> elements and a body row with two <td> cells.',
      starterCode: `<body>
  <!-- Build basic table -->
</body>`,
      solutionCode: `<body>
  <table>
    <tr>
      <th>Language</th>
      <th>Creator</th>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>Brendan Eich</td>
    </tr>
  </table>
</body>`,
      hint: 'Include <table><tr><th>...</th></tr><tr><td>...</td></tr></table>.'
    }
  },
  {
    id: 'caption',
    name: '<caption>',
    syntax: '<caption>Table Title or Summary</caption>',
    category: 'tables',
    categoryLabel: 'Tables',
    shortDesc: 'Specifies the title or explanatory caption of a table, placed immediately after <table>.',
    hinglish: '<caption> tag table ka title ya explanation hota hai. Isko hamesha <table> opening tag ke turant baad pehla bachha hona chahiye. Screen readers table enter karte hi sabse pehle caption padhte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</caption>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <caption style="font-weight: bold; padding: 8px; caption-side: top; color: #4f46e5;">
    Table 1.1: Student Marks in DSA Assessment
  </caption>
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Rahul</td><td>95%</td></tr>
</table>`,
    accessibilityGuidance: 'Acts as the accessible name for the table; required for WCAG 2.1 table compliance.',
    seoRelevance: 'Directly consumed by table snippet extractors in search engines.',
    commonMistakes: [
      {
        mistake: 'Placing <caption> inside <thead> or after <tr>.',
        solution: '<caption> MUST be the very first element directly inside <table>.',
        explanation: 'Any placement other than first child inside <table> violates HTML specification.'
      }
    ],
    relatedElements: ['table', 'th'],
    interviewQuestions: [
      {
        question: 'Where must the <caption> tag be placed inside a <table>?',
        answer: 'It MUST be the very first child element immediately following the <table> start tag.',
        hinglishTip: 'Hamesha <table> ke bilkul baad pehla tag <caption> hona chahiye.'
      }
    ],
    practiceExercise: {
      title: 'Add Caption to Table',
      prompt: 'Insert a <caption> element as the first child of an existing table.',
      starterCode: `<table>
  <!-- Insert caption here -->
  <tr><th>Day</th><th>Hours</th></tr>
</table>`,
      solutionCode: `<table>
  <caption>Weekly Study Schedule</caption>
  <tr><th>Day</th><th>Hours</th></tr>
</table>`,
      hint: 'Place <caption>Title</caption> right after <table>.'
    }
  },
  {
    id: 'thead-tbody-tfoot',
    name: '<thead>, <tbody>, <tfoot>',
    syntax: '<table><thead>...</thead><tbody>...</tbody><tfoot>...</tfoot></table>',
    category: 'tables',
    categoryLabel: 'Tables',
    shortDesc: 'Groups the header (<thead>), body (<tbody>), and footer (<tfoot>) content of a table.',
    hinglish: 'Yeh teeno tags table ke structural groups hain: <thead> me column headings aati hain, <tbody> me actual data rows aate hain, aur <tfoot> me totals, sums, ya footnotes aate hain. Jab lambi table print hoti hai, toh browser <thead> aur <tfoot> ko har page par repeat kar sakta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Item</th>
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 8px; border: 1px solid #cbd5e1;">HTML5 Mastery Course</td><td style="padding: 8px; border: 1px solid #cbd5e1;">$49</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #cbd5e1;">DSA Practice Lab</td><td style="padding: 8px; border: 1px solid #cbd5e1;">$79</td></tr>
    </tbody>
    <tfoot>
      <tr style="background: #f1f5f9; font-weight: bold;">
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Total</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">$128</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`,
    accessibilityGuidance: 'Allows screen readers to distinguish between header descriptors and underlying data values.',
    seoRelevance: 'Provides structured relational context for Google Dataset Search.',
    commonMistakes: [
      {
        mistake: 'Skipping <tbody> in tables with complex rows.',
        solution: 'Explicitly wrap data rows in <tbody>.',
        explanation: 'Browsers automatically inject an implicit <tbody> if omitted, which can break CSS child selectors like table > tr.'
      }
    ],
    relatedElements: ['table', 'tr', 'th', 'td'],
    interviewQuestions: [
      {
        question: 'Why does table > tr CSS selector sometimes fail if <tbody> was not written in the HTML?',
        answer: 'Because HTML parsers automatically inject a <tbody> element around any <tr> not in <thead> or <tfoot>, meaning the actual DOM tree is table > tbody > tr.',
        hinglishTip: 'Browser automatically <tbody> add kar deta hai, isliye table > tr selector match nahi hota.'
      }
    ],
    practiceExercise: {
      title: 'Structure Table with Thead and Tbody',
      prompt: 'Wrap a table header in <thead> and its data rows in <tbody>.',
      starterCode: `<table>
  <!-- Add thead and tbody -->
  <tr><th>Topic</th></tr>
  <tr><td>Recursion</td></tr>
</table>`,
      solutionCode: `<table>
  <thead>
    <tr><th>Topic</th></tr>
  </thead>
  <tbody>
    <tr><td>Recursion</td></tr>
  </tbody>
</table>`,
      hint: 'Wrap header in <thead> and data in <tbody>.'
    }
  },
  {
    id: 'tr-th-td',
    name: '<tr>, <th>, <td>',
    syntax: '<tr><th scope="col">Header</th><td>Data Cell</td></tr>',
    category: 'tables',
    categoryLabel: 'Tables',
    shortDesc: '<tr> defines a row; <th> defines a header cell; <td> defines a standard data cell.',
    hinglish: '<tr> (table row) ek horizontal row banata hai. <th> (table header) header cell banata hai jiska text bold aur centered hota hai (hamesha scope="col" ya scope="row" ke saath use karein). <td> (table data) regular data cell banata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['scope (on th)', 'colspan', 'rowspan', 'headers', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <table border="1" style="border-collapse: collapse; width: 100%;">
    <tr>
      <th scope="col">Student</th>
      <th scope="col" colspan="2">Scores (Midterm &amp; Final)</th>
    </tr>
    <tr>
      <th scope="row">Aarav</th>
      <td>88</td>
      <td>94</td>
    </tr>
    <tr>
      <th scope="row">Diya</th>
      <td>92</td>
      <td>96</td>
    </tr>
  </table>
</body>
</html>`,
    accessibilityGuidance: 'The scope attribute (scope="col" or scope="row") on <th> tells screen readers which data cells that header applies to.',
    seoRelevance: 'Cells with colspan/rowspan are accurately mapped into search knowledge graphs.',
    commonMistakes: [
      {
        mistake: 'Omitting scope attribute on <th> cells.',
        solution: 'Always specify <th scope="col"> for column headers and <th scope="row"> for row headers.',
        explanation: 'Screen readers need scope to associate header text with data values.'
      }
    ],
    relatedElements: ['table', 'col', 'colgroup'],
    interviewQuestions: [
      {
        question: 'What do colspan and rowspan attributes do on <td> and <th>?',
        answer: 'colspan specifies how many horizontal columns a single cell should span. rowspan specifies how many vertical rows a cell should span.',
        hinglishTip: 'colspan = horizontal columns jodna; rowspan = vertical rows jodna.'
      }
    ],
    practiceExercise: {
      title: 'Span Two Columns with Colspan',
      prompt: 'Create a <th> cell spanning two columns using colspan="2".',
      starterCode: `<tr>
  <!-- Add th with colspan 2 -->
</tr>`,
      solutionCode: `<tr>
  <th colspan="2">Full Name</th>
</tr>`,
      hint: 'Use <th colspan="2">Full Name</th>.'
    }
  },
  {
    id: 'col-colgroup',
    name: '<colgroup> & <col>',
    syntax: '<colgroup><col span="2" style="background:#f1f5f9;"><col></colgroup>',
    category: 'tables',
    categoryLabel: 'Tables',
    shortDesc: 'Specifies column-level properties and formatting for an entire table column at once.',
    hinglish: '<colgroup> aur <col> tag poore column par ek saath styling (jaise column width, background color, visibility) apply karne ke liye use hote hain. Isse aapko har ek <td> me alag-alag class ya style lagane ki zaroorat nahi padti.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: '<colgroup> requires </colgroup>; <col> is a void element.',
    supportedAttributes: ['span', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <table border="1" style="border-collapse: collapse; width: 100%;">
    <!-- Colgroup styles entire columns in one clean declaration -->
    <colgroup>
      <col style="background: #eef2ff; width: 40%;">
      <col style="background: #ffffff; width: 30%;">
      <col style="background: #f0fdf4; width: 30%;">
    </colgroup>
    <tr><th>Feature</th><th>Basic</th><th>Pro</th></tr>
    <tr><td>DSA Visualizer</td><td>Limited</td><td>Full Access</td></tr>
    <tr><td>Compiler Speed</td><td>Normal</td><td>Instant</td></tr>
  </table>
</body>
</html>`,
    accessibilityGuidance: 'Provides structural column definitions that assist table parsing engines.',
    seoRelevance: 'Clarifies relational data boundaries in pricing/comparison tables.',
    commonMistakes: [
      {
        mistake: 'Putting text or <td> inside <colgroup>.',
        solution: '<colgroup> only takes <col> elements as children.',
        explanation: '<colgroup> is strictly a column definition container.'
      }
    ],
    relatedElements: ['table', 'tr', 'td'],
    interviewQuestions: [
      {
        question: 'Which CSS properties are allowed on <col> elements according to CSS standards?',
        answer: 'Only 4 properties: border, background, width, and visibility.',
        hinglishTip: '<col> par sirf border, background, width, aur visibility CSS properties kaam karti hain.'
      }
    ],
    practiceExercise: {
      title: 'Apply Column Width with Colgroup',
      prompt: 'Add a <colgroup> with two <col> tags specifying width="50%".',
      starterCode: `<table>
  <!-- Add colgroup -->
  <tr><td>Col 1</td><td>Col 2</td></tr>
</table>`,
      solutionCode: `<table>
  <colgroup>
    <col style="width: 50%;">
    <col style="width: 50%;">
  </colgroup>
  <tr><td>Col 1</td><td>Col 2</td></tr>
</table>`,
      hint: 'Nest <col> tags inside <colgroup>.'
    }
  }
];
