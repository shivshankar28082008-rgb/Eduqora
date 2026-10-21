import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const TEXT_TAGS: HtmlTagItem[] = [
  // =========================================================================
  // HEADINGS (h1 - h6)
  // =========================================================================
  {
    id: 'h1',
    name: '<h1>',
    syntax: '<h1>Main Page Heading</h1>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'The highest-level section heading representing the primary topic of the document.',
    hinglish: '<h1> webpage ka sabse bada aur mahatvapurna heading tag hota hai. Har webpage par aam taur par sirf ek hi <h1> hona chahiye jo page ke mukhya topic ko describe kare. Search engines aur screen readers isko sabse zyada priority dete hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</h1>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h1 style="color: #1e293b; font-size: 32px; font-weight: 900; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
    Full-Stack Web Development Roadmap
  </h1>
  <p>Every webpage should ideally contain exactly one primary &lt;h1&gt; heading.</p>
</body>
</html>`,
    accessibilityGuidance: 'Screen-reader users press the "H" key to jump between headings and "1" to find the main topic. Ensure page outline starts with <h1>.',
    seoRelevance: 'Highest priority on-page SEO heading. Search algorithms compare <h1> with the title tag to verify page relevancy.',
    commonMistakes: [
      {
        mistake: 'Using multiple <h1> tags scattered randomly for visual font size.',
        solution: 'Use CSS font-size for visual styling and keep exactly one <h1> per page for semantic hierarchy.',
        explanation: 'Multiple <h1> elements confuse document outlines and dilute SEO keyword focus.'
      }
    ],
    relatedElements: ['h2', 'h3', 'header', 'hgroup'],
    interviewQuestions: [
      {
        question: 'Is it valid to have more than one <h1> in HTML5?',
        answer: 'Technically HTML5 allows multiple <h1>s inside nested <article> or <section> elements, but SEO and accessibility best practices strongly recommend a single <h1> per page for clear hierarchy.',
        hinglishTip: 'HTML5 spec me allow hai, lekin Google SEO aur WCAG accessibility ke liye har page par sirf 1 <h1> rakhna best practice hai.'
      }
    ],
    practiceExercise: {
      title: 'Define Primary Page Heading',
      prompt: 'Write an <h1> heading for a programming course overview page.',
      starterCode: `<body>
  <!-- Add h1 heading -->
</body>`,
      solutionCode: `<body>
  <h1>Data Structures & Algorithms Masterclass</h1>
</body>`,
      hint: 'Use <h1>Heading Text</h1>.'
    }
  },
  {
    id: 'h2',
    name: '<h2>',
    syntax: '<h2>Major Section Heading</h2>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Second-level heading used for major sub-sections directly under h1.',
    hinglish: '<h2> tag <h1> ke baad aane wali mukhya up-headings (sub-sections) ke liye use hota hai. Jaise agar <h1> "JavaScript Guide" hai, toh <h2> "Variables", "Functions", "Promises" ho sakte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</h2>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h1>Computer Science Fundamentals</h1>
  <h2 style="color: #4f46e5; margin-top: 24px;">1. Data Structures</h2>
  <p>Arrays, Linked Lists, Stacks, Queues, Trees, Graphs.</p>
  <h2 style="color: #4f46e5; margin-top: 24px;">2. Algorithms</h2>
  <p>Searching, Sorting, Dynamic Programming, Greedy.</p>
</body>
</html>`,
    accessibilityGuidance: 'Forms level 2 of the accessibility heading tree.',
    seoRelevance: 'Google uses <h2> tags to generate rich "Jump to" sitelinks in search results.',
    commonMistakes: [
      {
        mistake: 'Skipping heading levels, e.g. jumping from <h1> directly to <h3>.',
        solution: 'Always descend hierarchically: <h1> -> <h2> -> <h3>.',
        explanation: 'Skipping heading levels confuses screen reader heading navigation.'
      }
    ],
    relatedElements: ['h1', 'h3'],
    interviewQuestions: [
      {
        question: 'Why should heading levels never be skipped (e.g. h1 to h4)?',
        answer: 'Screen-reader users rely on heading levels to construct an internal mental table of contents. Skipping levels causes confusion about missing parent sections.',
        hinglishTip: 'Heading level skip karne se accessibility audit (Lighthouse) fail ho jata hai.'
      }
    ],
    practiceExercise: {
      title: 'Structure H1 and H2 Sections',
      prompt: 'Create an <h1> heading followed by two <h2> subheadings with descriptive text.',
      starterCode: `<body>
  <!-- Add h1 and h2 elements -->
</body>`,
      solutionCode: `<body>
  <h1>Frontend Engineering</h1>
  <h2>HTML & Semantic Markup</h2>
  <h2>CSS & Modern Layouts</h2>
</body>`,
      hint: 'Include one <h1> followed by two <h2> tags.'
    }
  },
  {
    id: 'h3',
    name: '<h3>',
    syntax: '<h3>Sub-topic Heading</h3>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Third-level heading representing a subsection nested under an h2.',
    hinglish: '<h3> tag <h2> ke andar aane wale sub-topics ke liye hota hai. Jaise <h2> "Sorting Algorithms" ke andar <h3> "Bubble Sort" aur <h3> "Quick Sort".',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</h3>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<h2>Sorting Algorithms</h2>
<h3 style="color: #0284c7;">Bubble Sort</h3>
<p>Simple comparison-based sort with O(n²) time complexity.</p>
<h3 style="color: #0284c7;">Merge Sort</h3>
<p>Divide-and-conquer algorithm with guaranteed O(n log n) performance.</p>`,
    accessibilityGuidance: 'Announced by screen readers as "Heading level 3".',
    seoRelevance: 'Helps search engines understand nested sub-topic specificity.',
    commonMistakes: [
      {
        mistake: 'Using <h3> merely to make text smaller without an <h2> parent.',
        solution: 'Use CSS font-size: 1.15rem instead of semantic heading tags for styling.',
        explanation: 'Headings must only reflect semantic hierarchy, not visual size.'
      }
    ],
    relatedElements: ['h2', 'h4'],
    interviewQuestions: [
      {
        question: 'How do screen-reader users navigate using headings?',
        answer: 'They press keys 1 through 6 to jump directly to specific heading depths, or "H" to cycle through all headings sequentially.',
        hinglishTip: 'Screen reader users keyboard shortcut "H" aur number keys se direct jump karte hain.'
      }
    ],
    practiceExercise: {
      title: 'Nest H3 Under H2',
      prompt: 'Create an <h2> tag with two nested <h3> headings.',
      starterCode: `<body>
  <!-- Create h2 and h3 hierarchy -->
</body>`,
      solutionCode: `<body>
  <h2>Linear Data Structures</h2>
  <h3>Singly Linked List</h3>
  <h3>Doubly Linked List</h3>
</body>`,
      hint: 'Follow <h2> with <h3> elements.'
    }
  },
  {
    id: 'h4-h6',
    name: '<h4> – <h6>',
    syntax: '<h4>...</h4>, <h5>...</h5>, <h6>...</h6>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Fourth, fifth, and sixth level headings for deep outline nesting.',
    hinglish: '<h4>, <h5>, aur <h6> deep technical documentation, complex legal texts, ya nested textbooks me chote up-bhagon ke liye use hote hain. Inka use tabhi karein jab waqai itni gehri hierarchy ho.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</h4>, </h5>, </h6>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<h3>Binary Search Trees</h3>
<h4 style="color: #64748b;">Traversal Methods</h4>
<h5 style="color: #94a3b8;">Depth-First Search</h5>
<h6 style="color: #cbd5e1;">In-Order Traversal (Left, Root, Right)</h6>
<p>Visiting nodes in ascending sorted order.</p>`,
    accessibilityGuidance: 'Provides granular hierarchy for deep documents.',
    seoRelevance: 'Minor ranking weight; primarily aids in indexing micro-sections of massive guides.',
    commonMistakes: [
      {
        mistake: 'Using <h6> just because you want tiny text in a footer.',
        solution: 'Use <small> or a CSS utility class like text-xs.',
        explanation: '<h6> is a semantic level-6 heading, not a small-text styling tag.'
      }
    ],
    relatedElements: ['h3', 'p', 'small'],
    interviewQuestions: [
      {
        question: 'Are there heading tags beyond <h6> in HTML?',
        answer: 'No. HTML supports headings strictly from <h1> up to <h6>.',
        hinglishTip: 'HTML me <h1> se lekar <h6> tak hi headings hoti hain, <h7> exist nahi karta.'
      }
    ],
    practiceExercise: {
      title: 'Build Deep Heading Outline',
      prompt: 'Write an <h4>, <h5>, and <h6> nested outline.',
      starterCode: `<body>
  <!-- Write h4, h5, h6 -->
</body>`,
      solutionCode: `<body>
  <h4>Tree Traversals</h4>
  <h5>Depth-First Search</h5>
  <h6>Pre-Order Traversal</h6>
</body>`,
      hint: 'Descend sequentially from <h4> to <h5> to <h6>.'
    }
  },

  // =========================================================================
  // PARAGRAPHS & BLOCK CONTENT
  // =========================================================================
  {
    id: 'p',
    name: '<p>',
    syntax: '<p>Paragraph text content...</p>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Represents a paragraph of text, automatically separated by block margins.',
    hinglish: '<p> tag webpage par regular text paragraphs likhne ke liye use hota hai. Browser iske upar aur neeche automatically thoda space (margin) add karta hai. Iske andar kabhi bhi block elements jaise <div> ya <table> nahi daalna chahiye.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</p>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  <p style="color: #334155;">
    Data structures are specialized formats for organizing, processing, retrieving, and storing data efficiently.
  </p>
  <p style="color: #334155;">
    Choosing the right data structure reduces memory consumption and optimizes algorithm execution speed.
  </p>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers read paragraph text fluently and allow users to advance paragraph-by-paragraph.',
    seoRelevance: 'Primary body text analyzed by search algorithms for content semantics and Natural Language Processing (NLP).',
    commonMistakes: [
      {
        mistake: 'Putting block elements like <div>, <ul>, or <table> inside a <p>.',
        solution: 'Only inline elements (like <strong>, <a>, <code>) belong inside a <p>.',
        explanation: 'Browsers automatically close the <p> as soon as they encounter a block tag, breaking your HTML layout.'
      }
    ],
    relatedElements: ['div', 'span', 'br'],
    interviewQuestions: [
      {
        question: 'Can you nest a <div> inside a <p> tag?',
        answer: 'No. According to HTML specification, <p> can only contain phrasing (inline) content. A block element inside <p> causes the browser to prematurely close the <p>.',
        hinglishTip: '<p> ke andar <div> daalne par browser automatically </p> laga kar band kar deta hai.'
      }
    ],
    practiceExercise: {
      title: 'Format Multi-Paragraph Content',
      prompt: 'Write two paragraphs explaining what HTML is and what CSS is.',
      starterCode: `<body>
  <!-- Add two paragraphs -->
</body>`,
      solutionCode: `<body>
  <p>HTML provides the structural skeleton for web documents.</p>
  <p>CSS controls visual presentation, animations, and responsive layouts.</p>
</body>`,
      hint: 'Wrap each sentence inside <p>...</p>.'
    }
  },
  {
    id: 'div',
    name: '<div>',
    syntax: '<div class="container">...</div>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'A generic, non-semantic block container used for CSS styling and layout grouping.',
    hinglish: '<div> (division) ek generic box container hai jiska apna koi semantic matlab nahi hota. Iska mukhya kaam CSS styling (jaise flexbox, grid, borders, padding) aur JavaScript se manipulation ke liye elements ko group karna hai. Jab koi semantic tag (jaise <main>, <article>, <section>) fit na ho, tabhi <div> use karein.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</div>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Styled container using div -->
  <div style="display: flex; gap: 16px; background: #1e1e2f; padding: 20px; border-radius: 12px; color: white;">
    <div style="flex: 1; background: #2a2b40; padding: 16px; border-radius: 8px;">
      <h4 style="margin-top: 0; color: #38bdf8;">Box 1</h4>
      <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 0;">Grouped with flexbox div.</p>
    </div>
    <div style="flex: 1; background: #2a2b40; padding: 16px; border-radius: 8px;">
      <h4 style="margin-top: 0; color: #38bdf8;">Box 2</h4>
      <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 0;">Grouped with flexbox div.</p>
    </div>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Has no ARIA landmark role by default. Screen readers treat it as transparent, reading only the content inside.',
    seoRelevance: 'Has zero semantic weight. Overusing divs ("div soup") instead of semantic tags degrades crawler understanding.',
    commonMistakes: [
      {
        mistake: '"Divitis" / "Div Soup": Wrapping every single element in multiple unnecessary <div> tags.',
        solution: 'Use semantic elements (<article>, <nav>, <header>) when appropriate, and keep DOM depth minimal.',
        explanation: 'Deeply nested div trees slow down CSS selector matching and clutter the DOM.'
      }
    ],
    relatedElements: ['span', 'section', 'article', 'main'],
    interviewQuestions: [
      {
        question: 'What is "div soup" and how does it harm a web application?',
        answer: 'Div soup refers to excessive, meaningless nested <div> containers. It bloats DOM memory, slows rendering, harms accessibility landmarks, and degrades search engine ranking signals.',
        hinglishTip: 'Interview me puchte hain: "Divitis kya hota hai?". Matlab har jagah bina soche samjhe sirf <div> use karna.'
      }
    ],
    practiceExercise: {
      title: 'Create Flexbox Card Container',
      prompt: 'Create a <div> with a class of "card" containing an <h2> and a <p>.',
      starterCode: `<body>
  <!-- Create div container -->
</body>`,
      solutionCode: `<body>
  <div class="card">
    <h2>Card Title</h2>
    <p>Card description text.</p>
  </div>
</body>`,
      hint: 'Use <div class="card">...</div>.'
    }
  },
  {
    id: 'pre',
    name: '<pre>',
    syntax: '<pre>Preformatted text</pre>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Represents preformatted text where whitespace, tabs, and newlines are rendered exactly as written.',
    hinglish: '<pre> (preformatted) tag text ke whitespace, tabs, aur line breaks ko bilkul waisa hi screen par dikhata hai jaisa code editor me likha gaya ho. Normal HTML multiple spaces ko ek space me collapse kar deta hai, lekin <pre> ke andar har space aur enter preserve rehta hai. Isko aam taur par <code> ke saath code snippets display karne ke liye use karte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</pre>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Preformatted ASCII Tree & Code:</h3>
  <pre style="background: #0f172a; color: #38bdf8; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; line-height: 1.4;">
       [Root: 50]
        /      \\
    [20]        [80]
    /  \\        /  \\
  [10] [30]   [70] [90]

function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left &lt;= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] &lt; target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
}
  </pre>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers might read ASCII diagrams character-by-character; add aria-label or an explanatory text summary if complex ASCII art is used.',
    seoRelevance: 'Code snippets inside <pre><code> are parsed by search engines for technical documentation rich results.',
    commonMistakes: [
      {
        mistake: 'Forgetting to escape HTML entities like < and > inside <pre>.',
        solution: 'Always replace < with &lt; and > with &gt;.',
        explanation: 'Browsers will attempt to parse unescaped brackets as actual HTML tags.'
      }
    ],
    relatedElements: ['code', 'samp', 'kbd'],
    interviewQuestions: [
      {
        question: 'Why are <pre> and <code> typically combined as <pre><code>...</code></pre>?',
        answer: '<pre> establishes preformatted whitespace behavior (preserving line breaks), while <code> provides semantic indication that the enclosed content represents computer programming code.',
        hinglishTip: '<pre> layout aur whitespace preserve karta hai, aur <code> semantic meaning deta hai ki yeh programming code hai.'
      }
    ],
    practiceExercise: {
      title: 'Display Code Snippet with Pre and Code',
      prompt: 'Combine <pre> and <code> to display a multi-line JavaScript function.',
      starterCode: `<body>
  <!-- Add pre and code snippet -->
</body>`,
      solutionCode: `<body>
  <pre><code>function greet(name) {
  return "Hello, " + name;
}</code></pre>
</body>`,
      hint: 'Nest <code> inside <pre>.'
    }
  },
  {
    id: 'blockquote',
    name: '<blockquote>',
    syntax: '<blockquote cite="https://example.com">...</blockquote>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Represents a section quoted from another external source.',
    hinglish: '<blockquote> tag kisi doosri book, website, ya mashhoor vyakti ke lambe quotation (uddharan) ko quote karne ke liye use hota hai. Browser isko aam taur par dono taraf se indent (margin) karke display karta hai. Isme "cite" attribute se original source ka URL diya ja sakta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</blockquote>).',
    supportedAttributes: ['cite', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <blockquote cite="https://en.wikipedia.org/wiki/Donald_Knuth" style="border-left: 4px solid #4f46e5; margin: 0; padding: 12px 20px; background: #f8fafc; color: #334155; font-style: italic;">
    "Premature optimization is the root of all evil (or at least most of it) in programming."
    <footer style="margin-top: 8px; font-style: normal; font-size: 13px; color: #64748b; font-weight: bold;">
      &mdash; Donald Knuth, <cite>The Art of Computer Programming</cite>
    </footer>
  </blockquote>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers announce "Blockquote start" and "Blockquote end", alerting listeners that text is spoken by an external entity.',
    seoRelevance: 'The cite attribute attributes quoted content, showing search engines that the quote is referenced properly rather than plagiarized.',
    commonMistakes: [
      {
        mistake: 'Using <blockquote> simply to indent normal text.',
        solution: 'Use CSS margin-left or padding-left for visual indentation.',
        explanation: 'Blockquote has strong semantic quoting meaning.'
      }
    ],
    relatedElements: ['q', 'cite'],
    interviewQuestions: [
      {
        question: 'What is the difference between <blockquote> and <q>?',
        answer: '<blockquote> is a block-level element for long, multi-line quotations with source citation. <q> is an inline element for short phrases that automatically adds localized quotation marks.',
        hinglishTip: 'Lambe paragraphs ke liye <blockquote> (block level); choti lines/phrases ke liye <q> (inline quotation).'
      }
    ],
    practiceExercise: {
      title: 'Quote a Famous Saying',
      prompt: 'Create a <blockquote> with a cite attribute and author citation.',
      starterCode: `<body>
  <!-- Create blockquote -->
</body>`,
      solutionCode: `<body>
  <blockquote cite="https://quote.org/linus">
    "Talk is cheap. Show me the code."
    <footer>&mdash; Linus Torvalds</footer>
  </blockquote>
</body>`,
      hint: 'Include cite attribute and quote text.'
    }
  },
  {
    id: 'hr',
    name: '<hr>',
    syntax: '<hr>',
    category: 'headings-text',
    categoryLabel: 'Headings & Text Formatting',
    shortDesc: 'Represents a thematic break between paragraph-level elements.',
    hinglish: '<hr> (horizontal rule) tag do alag topics ya paragraphs ke beech ek vishayik badlav (thematic break) darshata hai. Jaise story me scene change hona ya article me topic switch hona. Visual roop se browser isko ek horizontal line ke roop me draw karta hai.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Topic 1: Linear Search</h3>
  <p>Sequentially checks every element in an array from index 0 until a match is found.</p>

  <hr style="border: 0; height: 1px; background: #e2e8f0; margin: 24px 0;">

  <h3>Topic 2: Binary Search</h3>
  <p>Repeatedly divides a sorted search interval in half with O(log n) efficiency.</p>
</body>
</html>`,
    accessibilityGuidance: 'Maps to ARIA role="separator". Screen readers announce "separator" or "thematic divider".',
    seoRelevance: 'Signals a shift in topic to crawlers without ending the article.',
    commonMistakes: [
      {
        mistake: 'Using <hr> solely for decorative visual borders.',
        solution: 'Use CSS border-bottom on containers when no thematic break exists.',
        explanation: '<hr> implies a semantic narrative or thematic shift.'
      }
    ],
    relatedElements: ['p', 'br'],
    interviewQuestions: [
      {
        question: 'What is the semantic meaning of <hr> in HTML5 compared to HTML4?',
        answer: 'In HTML4, <hr> was purely a presentational "horizontal rule" line. In HTML5, it is semantic, representing a "thematic break" between topics.',
        hinglishTip: 'HTML5 me yeh sirf line nahi hai, yeh "thematic break" (topic change) represent karta hai.'
      }
    ],
    practiceExercise: {
      title: 'Separate Topics with Thematic Break',
      prompt: 'Insert an <hr> between two distinct paragraph topics.',
      starterCode: `<body>
  <p>Chapter 1: The Beginning</p>
  <!-- Insert thematic break -->
  <p>Chapter 2: The Journey</p>
</body>`,
      solutionCode: `<body>
  <p>Chapter 1: The Beginning</p>
  <hr>
  <p>Chapter 2: The Journey</p>
</body>`,
      hint: 'Place <hr> between the two paragraphs.'
    }
  },

  // =========================================================================
  // INLINE TEXT SEMANTICS
  // =========================================================================
  {
    id: 'a',
    name: '<a>',
    syntax: '<a href="https://example.com" target="_blank" rel="noopener">Link</a>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Creates a hyperlink to other web pages, files, email addresses, or document locations.',
    hinglish: '<a> (anchor) tag web ka sabse mahatvapurna element hai jo hyperlinks banata hai. "href" attribute me target URL diya jaata hai. External link ko new tab me kholne ke liye target="_blank" ke saath hamesha rel="noopener noreferrer" lagana security ke liye zaroori hota hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</a>).',
    supportedAttributes: ['href', 'target', 'download', 'rel', 'type', 'referrerpolicy'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Anchor Tag Examples:</h3>
  <ul style="line-height: 1.8;">
    <li><a href="https://codevaible.dev" target="_blank" rel="noopener noreferrer" style="color: #4f46e5; font-weight: bold;">External Website (Opens New Tab)</a></li>
    <li><a href="#section-dsa" style="color: #0284c7;">Internal Page Jump (#section-dsa)</a></li>
    <li><a href="mailto:support@codevaible.dev" style="color: #16a34a;">Email Link (mailto:)</a></li>
    <li><a href="tel:+1234567890" style="color: #d97706;">Phone Dial Link (tel:)</a></li>
  </ul>
</body>
</html>`,
    accessibilityGuidance: 'Never use generic link text like "click here" or "read more". Links must clearly describe their destination (e.g. "Download Algorithm PDF Guide").',
    seoRelevance: 'Hyperlinks form the PageRank backbone of the web. Search engines evaluate the link anchor text for ranking context.',
    commonMistakes: [
      {
        mistake: 'Using target="_blank" without rel="noopener noreferrer".',
        solution: 'Always include rel="noopener noreferrer" on external new-tab links.',
        explanation: 'Without noopener, the opened tab can access your window.opener object, creating a "tabnabbing" phishing vulnerability.'
      },
      {
        mistake: 'Using <a href="#"> or <a onclick="..."> as a button.',
        solution: 'Use <button> for page actions and <a> for navigation.',
        explanation: 'Fake links break keyboard accessibility for screen-reader users.'
      }
    ],
    relatedElements: ['button', 'nav', 'link'],
    interviewQuestions: [
      {
        question: 'What security risk does rel="noopener" protect against in target="_blank" links?',
        answer: 'It prevents the target page from accessing window.opener on the source page. Without it, a malicious target page can redirect the opener page to a fake login form ("reverse tabnabbing").',
        hinglishTip: 'Yeh reverse tabnabbing attack se bachata hai taaki open hone wala page parent page ko hijack na kar sake.'
      }
    ],
    practiceExercise: {
      title: 'Create Secure External Link',
      prompt: 'Create an anchor tag linking to https://google.com that opens in a new tab safely.',
      starterCode: `<body>
  <!-- Add secure external anchor -->
</body>`,
      solutionCode: `<body>
  <a href="https://google.com" target="_blank" rel="noopener noreferrer">Search Google</a>
</body>`,
      hint: 'Include href, target="_blank", and rel="noopener noreferrer".'
    }
  },
  {
    id: 'strong',
    name: '<strong>',
    syntax: '<strong>Urgent Warning</strong>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Indicates that its contents have strong importance, seriousness, or urgency.',
    hinglish: '<strong> tag us text ke liye use hota hai jo sach me behad zaroori, gambhir (serious), ya urgent ho. Screen readers isko zyada heavy ya emphasized aawaz me bolte hain. Browser isko bold dikhata hai, lekin visual bold ke liye CSS ya <b> use hota hai, semantic importance ke liye sirf <strong>.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</strong>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px;">
  <strong>Warning:</strong> Deleting this database table is irreversible. All student records will be permanently lost.
</p>`,
    accessibilityGuidance: 'Screen readers alter their speech inflection or announce "strong" to indicate vital urgency.',
    seoRelevance: 'Search engine crawlers give moderate keyword prominence to words wrapped in <strong>.',
    commonMistakes: [
      {
        mistake: 'Using <strong> purely to make text bold visually without importance.',
        solution: 'Use CSS font-weight: bold or <b> for stylistic boldness.',
        explanation: '<strong> is reserved for strong semantic importance.'
      }
    ],
    relatedElements: ['b', 'em', 'mark'],
    interviewQuestions: [
      {
        question: 'What is the semantic difference between <strong> and <b>?',
        answer: '<strong> conveys strong semantic importance or urgency and is announced with gravity by screen readers. <b> is purely stylistic to draw attention to keywords (like lead words or product names) without conveying extra importance.',
        hinglishTip: '<strong> = important/urgent baat; <b> = bina importance ke sirf visual attention draw karna.'
      }
    ],
    practiceExercise: {
      title: 'Highlight Critical Security Warning',
      prompt: 'Wrap the word "Never" in a <strong> tag inside an advisory sentence.',
      starterCode: `<p>Never share your password with anyone.</p>`,
      solutionCode: `<p><strong>Never</strong> share your password with anyone.</p>`,
      hint: 'Wrap "Never" inside <strong>Never</strong>.'
    }
  },
  {
    id: 'b',
    name: '<b>',
    syntax: '<b>Keywords</b>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Draws attention to text without imparting any special importance or seriousness.',
    hinglish: '<b> (bring attention to) tag text ko bold dikhata hai taaki user ka dhyan us par jaaye, lekin yeh koi extra semantic importance ya urgency convey nahi karta. Jaise article ke starting keywords, product names, ya review ke summary words.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</b>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px;">
  The first two words of an article, like <b>Breaking News</b>, are highlighted using the &lt;b&gt; tag to draw reader attention.
</p>`,
    accessibilityGuidance: 'Does not change screen reader voice inflection; treated as normal phrasing text.',
    seoRelevance: 'Lighter weight than <strong>; signals attention-grabbing keywords.',
    commonMistakes: [
      {
        mistake: 'Thinking <b> is deprecated in HTML5.',
        solution: '<b> is NOT deprecated in HTML5; it was repurposed to mean "stylistic offset without extra importance".',
        explanation: 'HTML5 redefined <b> to have a specific semantic role (attention without urgency).'
      }
    ],
    relatedElements: ['strong', 'span'],
    interviewQuestions: [
      {
        question: 'Is the <b> tag deprecated in HTML5?',
        answer: 'No! It was redefined in HTML5 to represent text to which attention is drawn for utilitarian purposes without imparting extra importance (e.g. keywords in a summary).',
        hinglishTip: '<b> deprecated nahi hai! Iska purpose update hua hai "stylistic attention" ke liye.'
      }
    ],
    practiceExercise: {
      title: 'Highlight Keyword with B Tag',
      prompt: 'Wrap the product name "Codevaible Lab" inside a <b> tag.',
      starterCode: `<p>Welcome to Codevaible Lab where you learn to code.</p>`,
      solutionCode: `<p>Welcome to <b>Codevaible Lab</b> where you learn to code.</p>`,
      hint: 'Use <b>Codevaible Lab</b>.'
    }
  },
  {
    id: 'em',
    name: '<em>',
    syntax: '<em>Emphasized Stress</em>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Marks text that has emphatic stress, fundamentally altering the meaning of the sentence.',
    hinglish: '<em> (emphasis) tag kisi shabd par bolte samay zor (stress) dene ke liye use hota hai jisse sentence ka matlab badal jaaye. Jaise "Main *aaj* jaunga" vs "Main aaj *jaunga*". Screen readers is shabd ko stress ke saath pronounce karte hain. Browser isko italic dikhata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</em>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  <p><em>I</em> love writing clean code. (Stresses that I do, maybe others don't)</p>
  <p>I <em>love</em> writing clean code. (Stresses the deep emotion of loving it)</p>
</div>`,
    accessibilityGuidance: 'Screen readers apply verbal vocal stress when pronouncing words inside <em>.',
    seoRelevance: 'Highlights linguistic nuance and conversational intent in NLP models.',
    commonMistakes: [
      {
        mistake: 'Using <em> for foreign phrases or book titles.',
        solution: 'Use <i> for foreign idioms/technical terms and <cite> for book titles.',
        explanation: '<em> is strictly for emphatic verbal stress.'
      }
    ],
    relatedElements: ['i', 'strong', 'cite'],
    interviewQuestions: [
      {
        question: 'What is the semantic difference between <em> and <i>?',
        answer: '<em> conveys verbal stress that changes sentence meaning (announced with emphasis by screen readers). <i> represents an alternate voice or mood (such as technical terms, thoughts, or foreign words) without emphatic stress.',
        hinglishTip: '<em> = bolne me zor dena (stress); <i> = doosri bhasha ka shabd ya technical term jisme zor nahi diya jata.'
      }
    ],
    practiceExercise: {
      title: 'Add Emphatic Stress',
      prompt: 'Wrap the word "must" in an <em> tag to stress requirement.',
      starterCode: `<p>You must commit your code before deploying.</p>`,
      solutionCode: `<p>You <em>must</em> commit your code before deploying.</p>`,
      hint: 'Use <em>must</em>.'
    }
  },
  {
    id: 'i',
    name: '<i>',
    syntax: '<i>Idiomatic text or technical term</i>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents text in an alternate voice or mood, such as technical terms, foreign idioms, or thoughts.',
    hinglish: '<i> tag text ko ek alag "voice ya mood" me darshata hai bina emphatic stress ke. Jaise Latin scientific names (Homo sapiens), kisi doosri bhasha ka shabd (e.g. Namaste), vessel names, ya mann ki soch (internal monologue). Browser isko italic dikhata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</i>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  The botanical name for the neem tree is <i lang="la">Azadirachta indica</i>. In Hindi, it is known as <i lang="hi">नीम</i>.
</p>`,
    accessibilityGuidance: 'Always pair with lang attribute when wrapping foreign language phrases (e.g. <i lang="fr">c\'est la vie</i>) for accurate screen reader pronunciation.',
    seoRelevance: 'Aids translation models and multi-language entity recognition.',
    commonMistakes: [
      {
        mistake: 'Using <i> when emphasis is intended.',
        solution: 'Use <em> for verbal stress; use <i> only for alternate mood or foreign phrases.',
        explanation: 'Screen readers do not change inflection for <i>.'
      }
    ],
    relatedElements: ['em', 'cite', 'dfn'],
    interviewQuestions: [
      {
        question: 'Is <i> purely an italic styling tag in HTML5?',
        answer: 'No. HTML5 redefined <i> to represent idiomatic text, technical terms, taxonomic designations, transliterations, or unspoken thoughts.',
        hinglishTip: 'HTML5 me <i> ka matlab "idiomatic text" ban gaya hai, sirf visual italic nahi.'
      }
    ],
    practiceExercise: {
      title: 'Format Scientific Name with I Tag',
      prompt: 'Wrap the Latin species name "Panthera tigris" in an <i> tag.',
      starterCode: `<p>The Royal Bengal Tiger is classified as Panthera tigris.</p>`,
      solutionCode: `<p>The Royal Bengal Tiger is classified as <i>Panthera tigris</i>.</p>`,
      hint: 'Use <i>Panthera tigris</i>.'
    }
  },
  {
    id: 'u',
    name: '<u>',
    syntax: '<u>mispeled</u>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents an unarticulated annotation, such as spelling errors or Chinese proper names.',
    hinglish: '<u> tag ka HTML5 me matlab "unarticulated annotation" hai — jaise kisi sentence me spelling error ko mark karna ya Chinese language me proper nouns darshana. Isko normal text ko underline karne ke liye KABHI use nahi karna chahiye, kyunki users underline text ko clickable link samajh lete hain!',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</u>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px;">
  The spellchecker flagged the word <u style="text-decoration-style: wavy; text-decoration-color: red;">reciept</u> as misspelled. The correct spelling is <strong>receipt</strong>.
</p>`,
    accessibilityGuidance: 'Screen-reader users will assume underlined text is a hyperlink unless clear ARIA labeling or context clarifies it.',
    seoRelevance: 'Negligible. Misuse may increase user bounce rates due to broken link expectations.',
    commonMistakes: [
      {
        mistake: 'Using <u> just to underline normal words for decoration.',
        solution: 'Use CSS text-decoration: underline; or border-bottom.',
        explanation: 'Users mistake underlined text for hyperlinks, harming UX.'
      }
    ],
    relatedElements: ['s', 'del', 'mark'],
    interviewQuestions: [
      {
        question: 'Why should you avoid using <u> for general decoration on the web?',
        answer: 'Underlined text has been the universal signifier of a clickable hyperlink since the web began. Underlining non-link text confuses users and degrades usability.',
        hinglishTip: 'User underline dekh kar click karne lagta hai ki yeh link hai, isliye general text me <u> avoid karte hain.'
      }
    ],
    practiceExercise: {
      title: 'Mark Spelling Error with U',
      prompt: 'Wrap the typo word "teh" inside a <u> tag.',
      starterCode: `<p>He went to teh store.</p>`,
      solutionCode: `<p>He went to <u>teh</u> store.</p>`,
      hint: 'Wrap "teh" with <u>teh</u>.'
    }
  },
  {
    id: 's',
    name: '<s>',
    syntax: '<s>Old Price: $99</s>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents things that are no longer accurate or relevant (struck-through text).',
    hinglish: '<s> (strikethrough) tag aisi cheezon ke liye use hota hai jo ab relevant ya sahi nahi hain, jaise e-commerce me purani price (Old Price: <s>$99</s> Now $49). Yeh document edit history ke liye nahi hai (document edit history ke liye <del> use hota hai).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</s>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px;">
  <p>
    Course Price: <span style="color: #94a3b8;"><s>$199</s></span>
    <strong style="color: #16a34a; font-size: 20px; margin-left: 8px;">$49</strong>
    <span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-left: 8px;">75% OFF</span>
  </p>
</div>`,
    accessibilityGuidance: 'Screen readers do not announce strikethrough by default. Add visually hidden text like <span class="sr-only">Original price:</span> for screen readers.',
    seoRelevance: 'Helps Google Shopping parser detect original vs sale pricing.',
    commonMistakes: [
      {
        mistake: 'Using <s> when indicating an edit/deletion in a document.',
        solution: 'Use <del> for document edit history; use <s> for no-longer-relevant data like discounts.',
        explanation: '<del> represents legal/editorial revision; <s> represents obsolescence.'
      }
    ],
    relatedElements: ['del', 'ins'],
    interviewQuestions: [
      {
        question: 'What is the semantic difference between <s> and <del>?',
        answer: '<s> indicates content that is no longer accurate or relevant (like crossed-out obsolete pricing). <del> indicates content that has been formally deleted from a document in an editorial revision context.',
        hinglishTip: '<s> = no longer relevant (purani price); <del> = document editing me delete hua text.'
      }
    ],
    practiceExercise: {
      title: 'Cross Out Old Pricing',
      prompt: 'Wrap "$50" in an <s> tag inside a pricing paragraph.',
      starterCode: `<p>Was $50, now only $25!</p>`,
      solutionCode: `<p>Was <s>$50</s>, now only $25!</p>`,
      hint: 'Use <s>$50</s>.'
    }
  },
  {
    id: 'small',
    name: '<small>',
    syntax: '<small>Legal fine print</small>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents side-comments, legal disclaimers, or copyright fine print.',
    hinglish: '<small> tag webpage ke legal terms, copyright text, disclaimer, ya fine print ke liye use hota hai. Yeh sirf text ko chota karne ke liye nahi hai, balki semantic roop se side-comment darshata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</small>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px;">
  <p>Free tier includes 10,000 requests per month.</p>
  <small style="color: #64748b;">
    *Terms apply. Overage charges of $0.001 per additional query may be billed to your payment card.
  </small>
</div>`,
    accessibilityGuidance: 'Announced normally by assistive tech as subsidiary fine print.',
    seoRelevance: 'Validates footer copyright and legal notices.',
    commonMistakes: [
      {
        mistake: 'Using <small> for entire paragraphs just to make fonts small.',
        solution: 'Use CSS font-size: 0.85rem instead.',
        explanation: '<small> is for fine print and disclaimers only.'
      }
    ],
    relatedElements: ['footer', 'p'],
    interviewQuestions: [
      {
        question: 'What is the semantic meaning of <small> in HTML5?',
        answer: 'In HTML5, <small> semantically represents side comments and fine print (legal restrictions, copyrights, terms), not arbitrary small styling.',
        hinglishTip: 'HTML5 me <small> ka matlab "fine print / legal disclaimer" hai.'
      }
    ],
    practiceExercise: {
      title: 'Add Copyright Fine Print',
      prompt: 'Create a paragraph with a <small> tag containing a copyright notice.',
      starterCode: `<footer>
  <!-- Add fine print -->
</footer>`,
      solutionCode: `<footer>
  <small>&copy; 2026 Codevaible. All rights reserved.</small>
</footer>`,
      hint: 'Wrap text inside <small>&copy; ...</small>.'
    }
  },
  {
    id: 'mark',
    name: '<mark>',
    syntax: '<mark>Highlighted search match</mark>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents text that is highlighted or marked for reference purposes, such as in search results.',
    hinglish: '<mark> tag us text ko highlight (yellow background) karne ke liye use hota hai jise user ke search query se match karke highlight kiya gaya ho. Jaise search result me dhoonde gaye word ko chamkana.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</mark>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  Search results for "algorithm":<br>
  A binary search <mark style="background: #fef08a; padding: 2px 4px; border-radius: 2px;">algorithm</mark> efficiently searches a sorted collection.
</p>`,
    accessibilityGuidance: 'Screen readers do not announce "highlighted" by default; consider adding aria-details or audio cues for critical search match highlights.',
    seoRelevance: 'Highlights snippet keyword occurrences.',
    commonMistakes: [
      {
        mistake: 'Using <mark> for syntax highlighting in code blocks.',
        solution: 'Use <span> with custom CSS classes for code token syntax coloring.',
        explanation: '<mark> is for contextual search matching and relevance highlighting.'
      }
    ],
    relatedElements: ['strong', 'em'],
    interviewQuestions: [
      {
        question: 'When should <mark> be used instead of <span> with yellow background?',
        answer: 'Use <mark> when text is highlighted due to relevance in another context (e.g. search keyword match or user quote reference).',
        hinglishTip: 'Search results me match hone wale keywords ko highlight karne ke liye <mark> ideal hai.'
      }
    ],
    practiceExercise: {
      title: 'Highlight Search Query Match',
      prompt: 'Wrap the word "Array" in a <mark> tag.',
      starterCode: `<p>An Array is a linear data structure.</p>`,
      solutionCode: `<p>An <mark>Array</mark> is a linear data structure.</p>`,
      hint: 'Use <mark>Array</mark>.'
    }
  },
  {
    id: 'del-ins',
    name: '<del> & <ins>',
    syntax: '<del>Removed text</del> <ins>Added text</ins>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents document edits: text that has been deleted (<del>) and newly inserted (<ins>).',
    hinglish: '<del> aur <ins> tags document revision aur editing history ke liye use hote hain. <del> un shabdon ko darshata hai jinhe document se delete kar diya gaya hai (strike-through), aur <ins> naye insert kiye gaye shabdon ko darshata hai (underline). Jaise GitHub diffs ya legal contract updates.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</del> and </ins>).',
    supportedAttributes: ['cite', 'datetime', 'Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  Release version 2.0:<br>
  We have <del cite="#bug-12" datetime="2026-02-01" style="color: #ef4444;">deprecated callback hell</del> and
  <ins cite="#feature-12" datetime="2026-02-01" style="color: #16a34a; text-decoration: underline;">introduced async/await pipelines</ins>.
</p>`,
    accessibilityGuidance: 'Announced by screen readers as "Deletion" and "Insertion", making document revision history accessible.',
    seoRelevance: 'Allows crawlers to understand historical changes in published articles.',
    commonMistakes: [
      {
        mistake: 'Using <del> purely for strikethrough in e-commerce discounts.',
        solution: 'Use <s> for obsolete product pricing and <del> for document editing revisions.',
        explanation: 'Semantic distinction between revision history (<del>) and obsolescence (<s>).'
      }
    ],
    relatedElements: ['s', 'u'],
    interviewQuestions: [
      {
        question: 'Which attributes are specifically supported by <del> and <ins>?',
        answer: 'cite (URL explaining the change) and datetime (timestamp of when the edit occurred).',
        hinglishTip: '<del> aur <ins> dono me "datetime" aur "cite" attribute hote hain jo batate hain change kab aur kyu hua.'
      }
    ],
    practiceExercise: {
      title: 'Document Revision with Del and Ins',
      prompt: 'Mark "Python 2" as deleted with <del> and "Python 3" as inserted with <ins>.',
      starterCode: `<p>Please use Python 2 for this tutorial.</p>`,
      solutionCode: `<p>Please use <del>Python 2</del> <ins>Python 3</ins> for this tutorial.</p>`,
      hint: 'Wrap Python 2 in <del> and Python 3 in <ins>.'
    }
  },
  {
    id: 'sub-sup',
    name: '<sub> & <sup>',
    syntax: 'H<sub>2</sub>O and E = mc<sup>2</sup>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents subscript (<sub>, lower baseline) and superscript (<sup>, higher baseline) text.',
    hinglish: '<sub> (subscript) text ko normal line se thoda neeche aur chota dikhata hai, jaise chemical formulas (H₂O). <sup> (superscript) text ko upar dikhata hai, jaise mathematical powers (x², 10⁵) aur ordinal numbers (1st, 2nd).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</sub> and </sup>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px; line-height: 2;">
  <p><strong>Chemical Formula:</strong> H<sub>2</sub>SO<sub>4</sub> (Sulfuric acid)</p>
  <p><strong>Einstein's Formula:</strong> E = mc<sup>2</sup></p>
  <p><strong>Ranking:</strong> Finished in 1<sup>st</sup> place!</p>
</div>`,
    accessibilityGuidance: 'Screen readers understand math sub/sup notation when voiced; add aria-label="H two O" if full clarity is needed.',
    seoRelevance: 'Essential for scientific, chemical, and mathematical content indexing.',
    commonMistakes: [
      {
        mistake: 'Messing up line-height when sub/sup pushes line spacing out of alignment.',
        solution: 'Use CSS: sub, sup { line-height: 0; position: relative; vertical-align: baseline; } to preserve paragraph line-height.',
        explanation: 'Default browser styling can cause uneven paragraph line spacing.'
      }
    ],
    relatedElements: ['code', 'var'],
    interviewQuestions: [
      {
        question: 'When should <sub> vs <sup> be used?',
        answer: '<sub> is for subscripts with a lowered baseline (chemical formulas like H2O, footnote anchors). <sup> is for superscripts with a raised baseline (exponents like x2, ordinals like 1st, trademarks like TM).',
        hinglishTip: 'sub = neeche (H2O); sup = upar (x2).'
      }
    ],
    practiceExercise: {
      title: 'Write Water Formula and Power',
      prompt: 'Write H2O using <sub> and 2 to the power 8 using <sup>.',
      starterCode: `<div>
  <!-- Write H2O and 2^8 -->
</div>`,
      solutionCode: `<div>
  <p>Water: H<sub>2</sub>O</p>
  <p>Two to eighth: 2<sup>8</sup></p>
</div>`,
      hint: 'Use H<sub>2</sub>O and 2<sup>8</sup>.'
    }
  },
  {
    id: 'code-kbd-samp-var',
    name: '<code>, <kbd>, <samp>, <var>',
    syntax: '<code>const x = 1;</code>, <kbd>Ctrl</kbd> + <kbd>C</kbd>, <samp>Error 404</samp>, <var>x</var>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Semantic computer text elements: programming code, user keyboard keys, sample program output, and variables.',
    hinglish: 'Yeh 4 computer elements hain: <code> = computer programming code; <kbd> = keyboard shortcuts (jaise Ctrl+C); <samp> = computer software ka sample output/error message; <var> = mathematical ya programming variables (jaise x aur y). Browser sabko monospace font me render karta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px; line-height: 1.8;">
  <p>To copy the variable <var>userToken</var> in JavaScript:</p>
  <p>Press <kbd style="background: #e2e8f0; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 4px; font-family: monospace;">Ctrl</kbd> + <kbd style="background: #e2e8f0; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 4px; font-family: monospace;">C</kbd>.</p>
  <p>Code: <code>navigator.clipboard.writeText(userToken);</code></p>
  <p>Terminal output: <samp style="background: #0f172a; color: #4ade80; padding: 2px 8px; border-radius: 4px;">Success: 200 OK</samp></p>
</div>`,
    accessibilityGuidance: 'Assistive software recognizes <kbd> as keyboard input keys and <code> as technical syntax.',
    seoRelevance: 'Greatly assists Google in parsing documentation, keyboard shortcut cheat sheets, and code answers.',
    commonMistakes: [
      {
        mistake: 'Using <span> with monospace font instead of semantic <kbd> or <code>.',
        solution: 'Always use semantic tags so screen readers and scrapers understand the technical context.',
        explanation: 'Semantic markup helps accessibility and search categorization.'
      }
    ],
    relatedElements: ['pre'],
    interviewQuestions: [
      {
        question: 'Differentiate between <code>, <kbd>, <samp>, and <var>.',
        answer: '<code> = programming source code. <kbd> = keyboard keys pressed by user. <samp> = sample output from a program. <var> = a variable name in math/code.',
        hinglishTip: '<code> = code, <kbd> = keyboard shortcut, <samp> = console output, <var> = variable.'
      }
    ],
    practiceExercise: {
      title: 'Markup Keyboard Shortcut',
      prompt: 'Markup "Ctrl + S to save" using <kbd> tags for the keys.',
      starterCode: `<p>Press Ctrl + S to save.</p>`,
      solutionCode: `<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>`,
      hint: 'Wrap "Ctrl" and "S" in <kbd> tags.'
    }
  },
  {
    id: 'q-cite',
    name: '<q> & <cite>',
    syntax: '<q>Short quote</q> and <cite>Book Title</cite>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: '<q> represents an inline quotation (adds quote marks); <cite> represents the title of a creative work.',
    hinglish: '<q> tag choti inline quotations ke liye use hota hai aur browser iske aage-peeche automatically quotation marks ("...") laga deta hai. <cite> tag kisi book, movie, research paper, ya website ke TITLE ko cite karne ke liye use hota hai. (Dhyan rahe: <cite> me author ka naam nahi, work ka title aata hai!).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</q> and </cite>).',
    supportedAttributes: ['cite (URL for q)', 'Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  As Steve Jobs stated in his interview, <q cite="https://example.com/jobs">Design is not just what it looks like and feels like. Design is how it works.</q> as recorded in <cite>Steve Jobs: The Exclusive Biography</cite>.
</p>`,
    accessibilityGuidance: 'Screen readers announce inline quotes properly based on the document language.',
    seoRelevance: 'Helps Google identify citations of scholarly articles and literature.',
    commonMistakes: [
      {
        mistake: 'Putting author names inside <cite>.',
        solution: 'Use <cite> only for the title of the work (book, movie, song), not the person who made it.',
        explanation: 'W3C specification explicitly states author names do not belong inside <cite>.'
      }
    ],
    relatedElements: ['blockquote', 'em'],
    interviewQuestions: [
      {
        question: 'Can you put an author\'s name inside a <cite> tag?',
        answer: 'No! According to W3C HTML5 specification, <cite> must only contain the title of a creative work (e.g. <cite>Clean Code</cite>), not the person\'s name (Robert C. Martin).',
        hinglishTip: '<cite> me author ka naam nahi, book/movie ka title aata hai.'
      }
    ],
    practiceExercise: {
      title: 'Cite Book and Quote Phrase',
      prompt: 'Quote the phrase "Stay hungry, stay foolish" using <q> and cite <cite>Whole Earth Catalog</cite>.',
      starterCode: `<p>The phrase Stay hungry, stay foolish appeared on Whole Earth Catalog.</p>`,
      solutionCode: `<p>The phrase <q>Stay hungry, stay foolish</q> appeared on <cite>Whole Earth Catalog</cite>.</p>`,
      hint: 'Wrap phrase in <q> and publication in <cite>.'
    }
  },
  {
    id: 'abbr',
    name: '<abbr>',
    syntax: '<abbr title="HyperText Markup Language">HTML</abbr>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Represents an abbreviation or acronym, with optional expansion in the title attribute.',
    hinglish: '<abbr> tag abbreviations (chote roop) aur acronyms ke liye use hota hai (jaise HTML, CSS, NASA). Iske "title" attribute me poora full form likhte hain. Desktop par hover karne par browser tooltip me full form show karta hai aur screen readers isko expand karke padhte hain. (Yeh obsolete <acronym> tag ka modern standard replacement hai).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</abbr>).',
    supportedAttributes: ['title (full expansion)', 'Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px;">
  Learn <abbr title="HyperText Markup Language" style="text-decoration: underline dotted; cursor: help;">HTML</abbr> and
  <abbr title="Cascading Style Sheets" style="text-decoration: underline dotted; cursor: help;">CSS</abbr> at Codevaible.
  <br><small style="color: #64748b;">(Hover your mouse over the abbreviations to see full forms!)</small>
</p>`,
    accessibilityGuidance: 'Screen readers can be configured to read the expanded title attribute instead of spelling out acronym letters.',
    seoRelevance: 'Assists search bots in resolving technical acronyms to their expanded keywords.',
    commonMistakes: [
      {
        mistake: 'Still using the obsolete <acronym> tag.',
        solution: 'Always use <abbr> for both abbreviations and acronyms.',
        explanation: '<acronym> was deprecated in HTML4 and dropped in HTML5.'
      }
    ],
    relatedElements: ['dfn', 'span'],
    interviewQuestions: [
      {
        question: 'What happened to the <acronym> tag in HTML5?',
        answer: 'It was completely deprecated and removed in favor of <abbr>, which now handles both abbreviations and acronyms uniformly.',
        hinglishTip: '<acronym> tag obsolete ho gaya hai; ab sirf <abbr> use hota hai.'
      }
    ],
    practiceExercise: {
      title: 'Define Abbreviation with Title',
      prompt: 'Markup "DSA" with <abbr> and title="Data Structures and Algorithms".',
      starterCode: `<p>Master DSA to crack interviews.</p>`,
      solutionCode: `<p>Master <abbr title="Data Structures and Algorithms">DSA</abbr> to crack interviews.</p>`,
      hint: 'Use <abbr title="...">DSA</abbr>.'
    }
  },
  {
    id: 'dfn',
    name: '<dfn>',
    syntax: '<dfn>Algorithm</dfn>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Indicates the defining instance of a term within a document.',
    hinglish: '<dfn> (definition) tag kisi technical term ya concept ke us pehle shabd ko mark karta hai jahan uski definition di ja rahi ho. Jaise: "<dfn>Recursion</dfn> is a process in which a function calls itself directly or indirectly."',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</dfn>).',
    supportedAttributes: ['title', 'id', 'Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
  An <dfn id="def-algorithm"><strong>algorithm</strong></dfn> is a finite sequence of well-defined computer-implementable instructions to solve a class of specific problems.
</p>`,
    accessibilityGuidance: 'Assistive tech recognizes the term as an authoritative definition.',
    seoRelevance: 'Google uses <dfn> to identify dictionary definitions for "Featured Snippet" definition boxes.',
    commonMistakes: [
      {
        mistake: 'Wrapping every occurrence of a word in <dfn>.',
        solution: 'Use <dfn> only on the single defining instance where the definition is given.',
        explanation: '<dfn> is strictly for the defining instance.'
      }
    ],
    relatedElements: ['abbr', 'dl', 'dt', 'dd'],
    interviewQuestions: [
      {
        question: 'What is the role of <dfn> in technical documentation?',
        answer: 'It marks the exact defining instance of a term, allowing glossaries, indexers, and search engines to link readers directly to the concept\'s formal definition.',
        hinglishTip: '<dfn> ka use definition wale pehle instance ko mark karne ke liye hota hai.'
      }
    ],
    practiceExercise: {
      title: 'Mark Defining Instance',
      prompt: 'Wrap "Array" in a <dfn> tag inside its definition sentence.',
      starterCode: `<p>An Array is a collection of elements stored at contiguous memory locations.</p>`,
      solutionCode: `<p>An <dfn>Array</dfn> is a collection of elements stored at contiguous memory locations.</p>`,
      hint: 'Wrap "Array" in <dfn>Array</dfn>.'
    }
  },
  {
    id: 'data-time',
    name: '<data> & <time>',
    syntax: '<data value="PROD-99">Product</data> and <time datetime="2026-03-20T10:00">March 20, 2026</time>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Links machine-readable values (<data>) and machine-readable timestamps (<time>) with human-readable text.',
    hinglish: '<time> tag human-readable date/time (jaise "March 20, 2026") ko browser aur search engines ke liye machine-readable ISO format (datetime="2026-03-20") ke saath link karta hai. <data> tag kisi bhi item ko machine-readable code/ID (value="SKU-1234") ke saath map karta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</data> and </time>).',
    supportedAttributes: ['value (for data)', 'datetime (for time)', 'Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px; line-height: 1.8;">
  <p>Article published on <time datetime="2026-03-20T14:30:00Z" style="color: #4f46e5; font-weight: bold;">March 20, 2026 at 2:30 PM</time>.</p>
  <p>Product: <data value="SKU-4921-X">Full-Stack Bootcamp Pro</data></p>
</div>`,
    accessibilityGuidance: 'Allows calendar apps and screen readers to parse exact dates, timezones, and duration formats accurately.',
    seoRelevance: 'Directly powers Google search results date snippets ("Published 2 days ago") and event schemas.',
    commonMistakes: [
      {
        mistake: 'Omitting the datetime attribute on <time>: <time>Yesterday</time>.',
        solution: 'Always provide datetime: <time datetime="2026-03-19">Yesterday</time>.',
        explanation: 'Without datetime, machines cannot parse fuzzy terms like "yesterday" or "last Tuesday".'
      }
    ],
    relatedElements: ['article', 'p'],
    interviewQuestions: [
      {
        question: 'Why is the datetime attribute critical on the <time> element?',
        answer: 'While humans read "3 hours ago" or "tomorrow morning", computers and search bots need the unambiguous ISO 8601 machine-readable timestamp provided in datetime="YYYY-MM-DDTHH:MM:SSZ".',
        hinglishTip: 'datetime attribute me ISO 8601 standard format me date dete hain taaki Google accurate time calculate kar sake.'
      }
    ],
    practiceExercise: {
      title: 'Timestamp a Blog Post',
      prompt: 'Create a <time> tag with datetime="2026-05-15" showing "May 15, 2026".',
      starterCode: `<p>Published: May 15, 2026</p>`,
      solutionCode: `<p>Published: <time datetime="2026-05-15">May 15, 2026</time></p>`,
      hint: 'Use <time datetime="2026-05-15">May 15, 2026</time>.'
    }
  },
  {
    id: 'bdi-bdo',
    name: '<bdi> & <bdo>',
    syntax: '<bdi>Arabic/Hebrew</bdi> and <bdo dir="rtl">Text</bdo>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Bidirectional text handling: <bdi> isolates text with unknown direction; <bdo> overrides text direction.',
    hinglish: '<bdi> (Bi-Directional Isolation) tab use hota hai jab user-generated text ka direction pata na ho (jaise Urdu/Arabic right-to-left hoti hai jabki English left-to-right). <bdi> us text ko isolate kar deta hai taaki baaki English paragraph ka layout na bigde. <bdo> (Bi-Directional Override) zabardasti text ka direction badal deta hai (dir="rtl" ya dir="ltr").',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</bdi> and </bdo>).',
    supportedAttributes: ['dir (mandatory on bdo)', 'Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px; line-height: 1.8;">
  <h3>Bidirectional Text Isolation (&lt;bdi&gt;):</h3>
  <ul>
    <li>User <bdi>Ahmed (أحمد)</bdi>: 1st place</li>
    <li>User <bdi>Alex Rivera</bdi>: 2nd place</li>
  </ul>

  <h3>Bidirectional Override (&lt;bdo dir="rtl"&gt;):</h3>
  <p><bdo dir="rtl">This English sentence is rendered from right to left!</bdo></p>
</div>`,
    accessibilityGuidance: 'Guarantees correct cursor movements and character sequencing for international speech synthesizers.',
    seoRelevance: 'Prevents text corruption in multilingual forums and community comment boards.',
    commonMistakes: [
      {
        mistake: 'Forgetting dir attribute on <bdo>.',
        solution: 'dir="rtl" or dir="ltr" is required on <bdo>.',
        explanation: '<bdo> exists specifically to override direction via the dir attribute.'
      }
    ],
    relatedElements: ['span'],
    interviewQuestions: [
      {
        question: 'When should you use <bdi> over normal <span> in a user comment section?',
        answer: 'When users can submit text in mixed scripts (like Arabic/Hebrew and English). Without <bdi>, RTL text leaks punctuation and order into surrounding LTR text. <bdi> isolates the directionality algorithm.',
        hinglishTip: 'Mixed language comments me RTL script baaki English layout ko kharab na kare, isliye <bdi> se isolate karte hain.'
      }
    ],
    practiceExercise: {
      title: 'Isolate Dynamic Username',
      prompt: 'Wrap username "زينب" inside <bdi> within a user profile list item.',
      starterCode: `<li>User: زينب logged in.</li>`,
      solutionCode: `<li>User: <bdi>زينب</bdi> logged in.</li>`,
      hint: 'Wrap username in <bdi>...'
    }
  },
  {
    id: 'ruby-rt-rp',
    name: '<ruby>, <rt>, <rp>',
    syntax: '<ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Displays small pronunciation annotations (furigana/pinyin) above East Asian characters.',
    hinglish: '<ruby>, <rt>, aur <rp> tags Japanese (Furigana) aur Chinese (Pinyin) characters ke upar choti pronunciation guide (aawaz batane wala text) dikhane ke liye use hote hain. <ruby> main wrapper hai, <rt> upar aane wala pronunciation text hai, aur <rp> un purane browsers ke liye parentheses () provide karta hai jo ruby support nahi karte.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: sans-serif; padding: 20px; font-size: 24px;">
  <p>Japanese Kanji with Furigana Ruby:</p>
  <ruby style="border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 8px;">
    漢 <rp>(</rp><rt style="font-size: 12px; color: #4f46e5;">kan</rt><rp>)</rp>
    字 <rp>(</rp><rt style="font-size: 12px; color: #4f46e5;">ji</rt><rp>)</rp>
  </ruby>
</div>`,
    accessibilityGuidance: 'Screen readers can pronounce East Asian logographic characters accurately using the ruby text annotation.',
    seoRelevance: 'Facilitates pronunciation and phonetic search matching in multilingual search engines.',
    commonMistakes: [
      {
        mistake: 'Omitting <rp> in contexts where legacy fallback is needed.',
        solution: 'Use <rp>(</rp><rt>...</rt><rp>)</rp> so non-ruby systems show readable parentheses.',
        explanation: '<rp> stands for "ruby parenthesis".'
      }
    ],
    relatedElements: ['span'],
    interviewQuestions: [
      {
        question: 'What is the purpose of <ruby>, <rt>, and <rp>?',
        answer: '<ruby> wraps East Asian characters; <rt> specifies the ruby text (small phonetic pronunciation above the character); <rp> provides fallback parentheses for browsers without ruby support.',
        hinglishTip: 'Japanese/Chinese characters ke upar choti pronunciation guide dikhane ke liye ruby use hota hai.'
      }
    ],
    practiceExercise: {
      title: 'Create Simple Ruby Annotation',
      prompt: 'Construct a <ruby> element with character "東京" and ruby text "Tokyo".',
      starterCode: `<div>
  <!-- Build ruby annotation -->
</div>`,
      solutionCode: `<div>
  <ruby>
    東京 <rt>Tokyo</rt>
  </ruby>
</div>`,
      hint: 'Nest <rt> inside <ruby>.'
    }
  },
  {
    id: 'span',
    name: '<span>',
    syntax: '<span class="highlight">Text</span>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'A generic inline container with no semantic meaning, used for CSS styling and JS scripting.',
    hinglish: '<span> ek generic inline container hai (jaise <div> block ke liye hota hai, waise hi <span> text ke chote hisson ke liye hota hai). Iska apna koi semantic matlab nahi hota. Iska use sentence ke kisi specific shabd ko color karne, CSS class lagane, ya JS click handler attach karne ke liye hota hai bina nayi line shuru kiye.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</span>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<p style="font-family: sans-serif; padding: 20px; font-size: 18px;">
  Master <span style="color: #4f46e5; font-weight: bold; background: #e0e7ff; padding: 2px 6px; border-radius: 4px;">Data Structures</span>
  and <span style="color: #059669; font-weight: bold; background: #d1fae5; padding: 2px 6px; border-radius: 4px;">Algorithms</span>
  at Codevaible!
</p>`,
    accessibilityGuidance: 'Transparent to screen readers unless given ARIA roles (e.g. role="status").',
    seoRelevance: 'Neutral semantic weight.',
    commonMistakes: [
      {
        mistake: 'Using <span> instead of <strong>, <em>, or <button> when semantic meaning exists.',
        solution: 'Use semantic tags whenever possible; reserve <span> purely for visual styling.',
        explanation: 'Misusing span hurts accessibility and machine parsing.'
      }
    ],
    relatedElements: ['div', 'strong', 'em'],
    interviewQuestions: [
      {
        question: 'What is the fundamental difference between <div> and <span>?',
        answer: '<div> is a block-level element (starts on a new line and takes 100% width). <span> is an inline element (flows within paragraph text and takes only as much width as its content). Both are non-semantic containers.',
        hinglishTip: 'div block level hota hai (puri line leta hai); span inline hota hai (sentence ke beech me rehta hai).'
      }
    ],
    practiceExercise: {
      title: 'Style Words with Span',
      prompt: 'Wrap "Online" in a <span> with green color.',
      starterCode: `<p>Status: Online</p>`,
      solutionCode: `<p>Status: <span style="color: green;">Online</span></p>`,
      hint: 'Wrap "Online" in <span style="color: green;">Online</span>.'
    }
  },
  {
    id: 'br',
    name: '<br>',
    syntax: '<br>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Produces a line break in text (carriage-return).',
    hinglish: '<br> (break) tag text ke beech me ek line break (carriage return) produce karta hai bina naya paragraph shuru kiye. Isko aam taur par poems (kavitaayein), postal addresses, ya song lyrics me use karte hain jahan line break content ka hissa hota hai. Paragraphs ke beech spacing ke liye CSS margin use karein, <br><br> nahi!',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<address style="font-family: sans-serif; font-style: normal; padding: 20px; line-height: 1.5; background: #f8fafc; border-radius: 8px;">
  Codevaible Technologies Inc.<br>
  404 Innovation Way, Suite 200<br>
  Bengaluru, KA 560001<br>
  India
</address>`,
    accessibilityGuidance: 'Screen readers pause slightly at <br> tags. Repeated <br><br><br> tags cause disruptive repetitive silence for blind users.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using multiple <br><br><br> tags to create spacing between layout sections.',
        solution: 'Use CSS margin or padding instead of multiple <br> tags.',
        explanation: 'Using <br> for layout violates semantic separation and creates messy accessibility experiences.'
      }
    ],
    relatedElements: ['p', 'wbr'],
    interviewQuestions: [
      {
        question: 'When is <br> semantically appropriate to use?',
        answer: 'Only where the division of lines is significant to the content itself, such as in poems, song lyrics, or street mailing addresses. Never for layout spacing.',
        hinglishTip: 'Sirf poems, lyrics, aur postal address me use karein jahan line todna zaroori ho; layout spacing ke liye CSS margin use karein.'
      }
    ],
    practiceExercise: {
      title: 'Format Address with Line Breaks',
      prompt: 'Format a 2-line street address using a <br> tag.',
      starterCode: `<p>Flat 101, Galaxy Heights New Delhi, India</p>`,
      solutionCode: `<p>Flat 101, Galaxy Heights<br>New Delhi, India</p>`,
      hint: 'Place <br> between the street and city.'
    }
  },
  {
    id: 'wbr',
    name: '<wbr>',
    syntax: '<wbr>',
    category: 'inline-text',
    categoryLabel: 'Inline Text Semantics',
    shortDesc: 'Word Break Opportunity: specifies where the browser may optionally break a very long word or URL if necessary.',
    hinglish: '<wbr> (Word Break Opportunity) browser ko batata hai ki agar screen choti ho aur yeh lamba word screen se bahar nikal raha ho, toh browser is jagah par word ko break karke nayi line me wrap kar sakta hai. Jaise lambe URLs ya technical names (jaise super<wbr>cali<wbr>fragilistic).',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<div style="font-family: monospace; padding: 20px; max-width: 200px; border: 2px dashed #6366f1; background: #eef2ff;">
  <p style="margin: 0; font-size: 13px;">
    Resize window to see break:
    https://codevaible.dev/<wbr>data-structures/<wbr>algorithms/<wbr>binary-search-tree/<wbr>visualizer
  </p>
</div>`,
    accessibilityGuidance: 'Screen readers pronounce the word continuously as a single word without awkward pauses.',
    seoRelevance: 'Prevents horizontal scrollbar overflow bugs on mobile devices, passing Google Mobile-Friendly usability checks.',
    commonMistakes: [
      {
        mistake: 'Using - (hyphen) manually instead of <wbr>.',
        solution: 'Use <wbr> so the hyphen only appears if the word actually wraps.',
        explanation: 'Hardcoding hyphens permanently breaks the word even on wide desktop screens.'
      }
    ],
    relatedElements: ['br'],
    interviewQuestions: [
      {
        question: 'What is the difference between <br> and <wbr>?',
        answer: '<br> forces an unconditional line break regardless of screen width. <wbr> provides an optional word break opportunity that only wraps if the container is too narrow to fit the word.',
        hinglishTip: '<br> zabardasti new line lata hai; <wbr> tabhi todta hai jab screen choti ho aur jagah na bachi ho.'
      }
    ],
    practiceExercise: {
      title: 'Add Word Break to Long URL',
      prompt: 'Insert <wbr> tags after slashes in a long URL string.',
      starterCode: `<p>Visit https://example.com/very/long/nested/path/to/resource</p>`,
      solutionCode: `<p>Visit https://example.com/<wbr>very/<wbr>long/<wbr>nested/<wbr>path/<wbr>to/<wbr>resource</p>`,
      hint: 'Place <wbr> after the forward slashes.'
    }
  }
];
