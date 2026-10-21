import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const STRUCTURE_TAGS: HtmlTagItem[] = [
  {
    id: 'doctype',
    name: '<!DOCTYPE html>',
    syntax: '<!DOCTYPE html>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Declares document type and instructs the browser to render in standard HTML5 mode.',
    hinglish: 'Yeh document declaration hai jo browser ko batata hai ki page modern HTML5 standards ke anusaar render hona chahiye. Iske bina browser "quirks mode" me jaata hai jisse layout aur CSS styling toot sakti hai. Isko hamesha file ki line 1 par likhte hain.',
    status: 'declaration',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — DOCTYPE is an instruction/declaration, not an element, so no closing tag exists.',
    supportedAttributes: ['None in HTML5 (legacy versions had DTD URLs)'],
    exampleCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML5 Standards Mode Example</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; line-height: 1.6; }
    .box { background: #e0e7ff; color: #3730a3; padding: 12px; border-radius: 8px; font-weight: 500; }
  </style>
</head>
<body>
  <h2>Standards Mode Active</h2>
  <div class="box">This page renders using modern CSS box-sizing and layout standards because of &lt;!DOCTYPE html&gt;.</div>
</body>
</html>`,
    accessibilityGuidance: 'Does not render visual elements directly, but triggers standards mode which guarantees accessible DOM parsing and predictable ARIA attribute processing.',
    seoRelevance: 'Crucial for search engines. Search bots recognize well-formed HTML5 documents and prioritize pages that render without quirks mode errors.',
    commonMistakes: [
      {
        mistake: 'Putting comments, whitespace, or <html> tags before <!DOCTYPE html>.',
        solution: 'Always place <!DOCTYPE html> on the very first byte of the file.',
        explanation: 'Leading content before DOCTYPE can trigger quirks mode in legacy engines like Internet Explorer / older WebKit.'
      }
    ],
    relatedElements: ['html', 'head', 'body', 'meta'],
    interviewQuestions: [
      {
        question: 'What happens if <!DOCTYPE html> is omitted?',
        answer: 'Browsers switch to "quirks mode" or "almost standards mode", which emulates 1990s Netscape/IE bugs, breaking CSS calculations, box models, and percentage heights.',
        hinglishTip: 'Interviewers often ask: "What is quirks mode vs standards mode?". Always answer that DOCTYPE activates HTML5 standards mode.'
      },
      {
        question: 'Is <!DOCTYPE html> case-sensitive?',
        answer: 'No, <!DOCTYPE html>, <!doctype html>, and <!DoCtYpE HTML> are all valid in HTML5, though lowercase or uppercase DOCTYPE is standard convention.',
        hinglishTip: 'Case-insensitive hota hai, lekin industry me <!DOCTYPE html> ya <!doctype html> likha jaata hai.'
      }
    ],
    practiceExercise: {
      title: 'Initialize Standard HTML5 Document',
      prompt: 'Write a valid HTML5 document starting with the <!DOCTYPE html> declaration, an <html> tag with lang="en", and a basic <body>.',
      starterCode: `<!-- Add DOCTYPE and standard HTML structure below -->
<html>
  <body>
    <h1>My Standards Compliant Site</h1>
  </body>
</html>`,
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Standards Page</title>
</head>
<body>
  <h1>My Standards Compliant Site</h1>
</body>
</html>`,
      hint: 'Place <!DOCTYPE html> as the very first line before <html>.'
    },
    quizQuestions: [
      {
        question: 'Is <!DOCTYPE html> considered an HTML tag/element?',
        options: ['Yes, it is a root element', 'No, it is a document type declaration instruction', 'It is an XML namespace tag', 'It is an HTTP header'],
        correctIndex: 1,
        explanation: '<!DOCTYPE html> is an instruction to the web browser about the version of HTML the page is written in; it is not a normal element.'
      }
    ]
  },
  {
    id: 'html',
    name: '<html>',
    syntax: '<html lang="en">...</html>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'The top-level root element containing all other elements of an HTML page.',
    hinglish: 'Yeh poore HTML document ka sabse bada parent container (root) hai. Iske andar do mukhya bachhe hote hain: <head> (metadata) aur <body> (visible content). Isme "lang" attribute dena accessibility aur SEO ke liye anivarya hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</html>).',
    supportedAttributes: ['lang', 'dir', 'xmlns', 'class', 'id'],
    exampleCode: `<!DOCTYPE html>
<html lang="hi" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Root Element Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f8fafc; }
    .badge { display: inline-block; background: #22c55e; color: white; padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <span class="badge">lang="hi" active</span>
  <h1>नमस्ते दुनिया — Codevaible</h1>
  <p>The root &lt;html&gt; tag sets document language to Hindi and text direction to Left-to-Right.</p>
</body>
</html>`,
    accessibilityGuidance: 'The "lang" attribute (e.g. lang="en" or lang="hi") tells screen readers which voice synthesizer and accent to use, preventing English screen readers from butchering foreign words.',
    seoRelevance: 'Search engines use the lang attribute for geographic targeting and multilingual search indexing.',
    commonMistakes: [
      {
        mistake: 'Forgetting the lang attribute: <html> instead of <html lang="en">.',
        solution: 'Always declare the primary language: <html lang="en">.',
        explanation: 'Failing to include lang causes accessibility audit warnings in Lighthouse.'
      }
    ],
    relatedElements: ['doctype', 'head', 'body'],
    interviewQuestions: [
      {
        question: 'Why is the lang attribute mandatory in production <html> tags?',
        answer: 'It enables screen readers to pronounce words correctly, assists spellcheckers, helps browser auto-translation tools, and gives search engines accurate regional context.',
        hinglishTip: 'Lighthouse audit me sabse pehla score drop "<html> element does not have a [lang] attribute" ka aata hai.'
      }
    ],
    practiceExercise: {
      title: 'Set Document Language and Direction',
      prompt: 'Declare an <html> root tag with English language and Left-to-Right direction wrapping a head and body.',
      starterCode: `<html>
  <body>
    <h1>Accessible App</h1>
  </body>
</html>`,
      solutionCode: `<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title>Accessible App</title>
  </head>
  <body>
    <h1>Accessible App</h1>
  </body>
</html>`,
      hint: 'Add lang="en" and dir="ltr" to the <html> opening tag.'
    }
  },
  {
    id: 'head',
    name: '<head>',
    syntax: '<head>...</head>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Machine-readable metadata container for document title, scripts, styles, and viewport configurations.',
    hinglish: '<head> webpage ka "brain" ya control center hai. Isme likhi baatein page par directly visual roop se nahi dikhti, balki browser ko page title, character encoding, CSS stylesheets, aur search engines ke meta tags provide karti hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</head>).',
    supportedAttributes: ['profile (legacy)'],
    exampleCode: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Head Section Mastery</title>
  <style>
    .card { background: #312e81; color: #e0e7ff; padding: 20px; border-radius: 12px; font-family: sans-serif; }
  </style>
</head>
<body>
  <div class="card">
    <h3>Inside &lt;head&gt;</h3>
    <p>Notice how CSS styles and viewport meta tags loaded from &lt;head&gt; control the look of this body card!</p>
  </div>
</body>`,
    accessibilityGuidance: 'Houses <title>, which is the first thing announced by screen readers when a user visits or switches browser tabs.',
    seoRelevance: 'Highest priority for SEO: Contains title, meta description, canonical links, robots directives, and OpenGraph social preview tags.',
    commonMistakes: [
      {
        mistake: 'Putting visible elements like <h1> or <p> inside <head>.',
        solution: 'Never place renderable layout tags inside <head>; put them in <body>.',
        explanation: 'Browsers will force-close the <head> early if they encounter visual tags, breaking following metadata.'
      }
    ],
    relatedElements: ['title', 'meta', 'link', 'style', 'script'],
    interviewQuestions: [
      {
        question: 'Which elements are legally allowed inside <head>?',
        answer: '<title>, <meta>, <link>, <style>, <script>, <noscript>, and <base>. Visible content elements are invalid inside <head>.',
        hinglishTip: 'Yaad rakhiye: Sirf 7 metadata tags allow hote hain <head> me.'
      }
    ],
    practiceExercise: {
      title: 'Setup Proper Head Metadata',
      prompt: 'Construct a <head> element containing UTF-8 charset meta, viewport meta, and a <title> tag.',
      starterCode: `<head>
  <!-- Add UTF-8, viewport and title -->
</head>`,
      solutionCode: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web App</title>
</head>`,
      hint: 'Include <meta charset="UTF-8">, viewport meta, and <title>.'
    }
  },
  {
    id: 'title',
    name: '<title>',
    syntax: '<title>Document Title</title>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Specifies document title shown on browser tab, bookmark list, and search engine results.',
    hinglish: 'Yeh webpage ka title set karta hai jo browser ke tab bar, bookmarks, aur Google search results ke blue clickable link me show hota hai. Har page par sirf ek hi <title> tag hona chahiye aur yeh <head> ke andar hona anivarya hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</title>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Codevaible — Master Modern Full-Stack Web Development</title>
</head>
<body style="font-family: system-ui; padding: 24px;">
  <h2>Check the Browser Tab Title!</h2>
  <p>The &lt;title&gt; element defines: <strong>Codevaible — Master Modern Full-Stack Web Development</strong></p>
  <p>Search engines use this as the primary blue clickable headline in search rankings.</p>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers read the page <title> first when loading a page. Descriptive, unique titles are required for WCAG 2.1 Success Criterion 2.4.2.',
    seoRelevance: 'Single most influential on-page SEO factor. Ideal length is 50-60 characters, with key brand and keywords first.',
    commonMistakes: [
      {
        mistake: 'Putting multiple <title> tags or leaving it blank.',
        solution: 'Use exactly one concise, descriptive <title> per document.',
        explanation: 'Browsers ignore subsequent titles and search engines may generate arbitrary text.'
      }
    ],
    relatedElements: ['head', 'meta', 'link'],
    interviewQuestions: [
      {
        question: 'What is the optimal character length for an SEO <title> tag?',
        answer: 'Between 50 to 60 characters (approximately 600 pixels). Beyond this limit, Google search result snippets truncate the title with an ellipsis (...).',
        hinglishTip: '60 characters ke andar brand name aur primary keyword dono fit hone chahiye.'
      }
    ],
    practiceExercise: {
      title: 'Write Accessible Title Tag',
      prompt: 'Write a <title> tag inside <head> describing a portfolio home page.',
      starterCode: `<head>
  <!-- Add descriptive title -->
</head>`,
      solutionCode: `<head>
  <title>Aarav Sharma — Frontend Engineer & UI Designer</title>
</head>`,
      hint: 'Use <title>Descriptive Name — Brand</title>.'
    }
  },
  {
    id: 'meta',
    name: '<meta>',
    syntax: '<meta charset="UTF-8"> / <meta name="..." content="...">',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Provides document-level metadata like character encoding, viewport settings, description, and keywords.',
    hinglish: '<meta> tag browser aur web spiders ko page ke baare me mahatvapurna jankari deta hai jo visual nahi hoti. Jaise character encoding (<meta charset="UTF-8">), mobile responsive viewport, page description, author, aur OpenGraph social media preview cards.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['charset', 'name', 'content', 'http-equiv', 'property (OpenGraph)'],
    exampleCode: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn Data Structures, Algorithms, and Full-Stack Web Development at Codevaible.">
  <meta name="author" content="Codevaible Team">
  <meta property="og:title" content="Codevaible Learning Hub">
  <meta property="og:type" content="website">
  <title>Meta Tag Explorer</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Meta Tags Loaded</h3>
  <ul>
    <li><strong>Charset:</strong> UTF-8 (supports all international emojis & symbols: 🚀 💻 🎉)</li>
    <li><strong>Viewport:</strong> Prevents mobile zoom bugs and adapts to screens</li>
    <li><strong>Description:</strong> Shown under the link in search results</li>
  </ul>
</body>`,
    accessibilityGuidance: 'Viewport meta must not disable user zoom (never use user-scalable=no or maximum-scale=1.0) because visually impaired users rely on pinch-to-zoom.',
    seoRelevance: 'The meta description provides the snippet preview on search engines and influences click-through rates (CTR).',
    commonMistakes: [
      {
        mistake: 'Using <meta name="viewport" content="user-scalable=no">.',
        solution: 'Use <meta name="viewport" content="width=device-width, initial-scale=1.0">.',
        explanation: 'Disabling pinch zoom fails WCAG accessibility compliance.'
      }
    ],
    relatedElements: ['head', 'title', 'link'],
    interviewQuestions: [
      {
        question: 'Why is <meta name="viewport" content="width=device-width, initial-scale=1.0"> critical for mobile responsive design?',
        answer: 'Without it, mobile browsers assume a desktop viewport of ~980px and scale the page down, making text tiny and illegible.',
        hinglishTip: 'Iske bina mobile browser page ko desktop maan kar zoom out kar deta hai.'
      }
    ],
    practiceExercise: {
      title: 'Add Mobile Viewport and Description',
      prompt: 'Add responsive viewport meta and a meta description tag.',
      starterCode: `<head>
  <!-- Add viewport and description meta -->
</head>`,
      solutionCode: `<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Master coding with hands-on labs and real projects.">
</head>`,
      hint: 'Use name="viewport" and name="description" with content attributes.'
    }
  },
  {
    id: 'link',
    name: '<link>',
    syntax: '<link rel="stylesheet" href="styles.css">',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Specifies external resource relationships, most commonly stylesheets, favicons, and preconnects.',
    hinglish: '<link> tag external files ko webpage ke saath connect karta hai. Sabse common use external CSS files connect karna, website ka favicon icon set karna, Google Fonts preconnect karna, aur canonical URL batana hai.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['rel', 'href', 'type', 'media', 'as', 'crossorigin', 'sizes'],
    exampleCode: `<head>
  <title>Link Demonstration</title>
  <!-- External stylesheet linkage -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <!-- Preconnecting font server -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- Favicon link -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>External Assets Linked</h3>
  <p>The &lt;link&gt; element connects stylesheets, preconnects CDN domains, and sets tab favicons.</p>
</body>`,
    accessibilityGuidance: 'External stylesheets linked via <link> should ensure adequate color contrast ratios (minimum 4.5:1 for normal text).',
    seoRelevance: 'Supports <link rel="canonical" href="..."> which prevents duplicate content penalties across parameterized URLs.',
    commonMistakes: [
      {
        mistake: 'Closing with </link> tag: <link rel="stylesheet">...</link>.',
        solution: '<link> is a void element and must never have a closing tag.',
        explanation: 'In HTML5, write <link rel="stylesheet" href="style.css"> without closing tag.'
      }
    ],
    relatedElements: ['style', 'head', 'script'],
    interviewQuestions: [
      {
        question: 'What is <link rel="canonical"> and why is it used?',
        answer: 'It specifies the primary/authoritative URL of a page when duplicate or syndicated content exists, preventing search engines from dividing ranking signals.',
        hinglishTip: 'Jab ek hi page ke multiple URLs hote hain (jaise utm_source query params), canonical tag batata hai original page kaunsa hai.'
      }
    ],
    practiceExercise: {
      title: 'Link an External Stylesheet and Favicon',
      prompt: 'Write a <link> tag for styles.css and another for a PNG favicon.',
      starterCode: `<head>
  <!-- Link stylesheet and favicon -->
</head>`,
      solutionCode: `<head>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/png" href="favicon.png">
</head>`,
      hint: 'Use rel="stylesheet" and rel="icon" with href.'
    }
  },
  {
    id: 'base',
    name: '<base>',
    syntax: '<base href="https://example.com/subfolder/" target="_blank">',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Defines the base URL and default target window for all relative URLs in the document.',
    hinglish: '<base> tag document ki saari relative links (images, hyperlinks, scripts) ke liye ek common root URL specify karta hai. Agar aap <base href="https://codevaible.dev/assets/"> likhte hain, toh <img src="logo.png"> apne aap https://codevaible.dev/assets/logo.png ban jaayegi.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['href', 'target'],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <base href="https://images.unsplash.com/" target="_blank">
  <title>Base Tag Demo</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Base URL Demonstration</h3>
  <p>All relative paths resolve against <code>https://images.unsplash.com/</code> and open in new tabs:</p>
  <a href="photo-1517694712202-14dd9538aa97?w=300">Click to Open Unsplash Image in New Window</a>
</body>
</html>`,
    accessibilityGuidance: 'Overriding target="_blank" globally via <base> forces all links to open new tabs, which can disorient screen-reader users without advance warning.',
    seoRelevance: 'Directs search crawler link resolution. Misconfigured base tags can break indexing of all relative links on your site.',
    commonMistakes: [
      {
        mistake: 'Having more than one <base> tag in a document.',
        solution: 'There must only ever be at most one <base> tag, placed before any other URL-referencing elements.',
        explanation: 'Browsers only obey the first <base> element encountered in <head>.'
      }
    ],
    relatedElements: ['head', 'a', 'link'],
    interviewQuestions: [
      {
        question: 'Where must the <base> tag be placed in the DOM?',
        answer: 'Inside <head>, before any elements that reference external URLs (such as <link>, <script>, or <a>).',
        hinglishTip: 'Hamesha sabse upar <head> me hona chahiye, kisi bhi stylesheet ya script se pehle.'
      }
    ],
    practiceExercise: {
      title: 'Define Base URL for Images',
      prompt: 'Add a <base> tag pointing to https://api.mysite.com/v1/ with target="_self".',
      starterCode: `<head>
  <!-- Insert base tag -->
</head>`,
      solutionCode: `<head>
  <base href="https://api.mysite.com/v1/" target="_self">
</head>`,
      hint: 'Use <base href="..." target="...">.'
    }
  },
  {
    id: 'style',
    name: '<style>',
    syntax: '<style>/* CSS rules */</style>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Contains internal document styling CSS rules applied directly to HTML elements.',
    hinglish: '<style> tag ke andar directly CSS code likhte hain jisse webpage ke elements ko color, layout, animations, aur font styles diye jaa sakein. Yeh aam taur par <head> ke andar likha jaata hai jab hume alag CSS file nahi banani hoti.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</style>).',
    supportedAttributes: ['media', 'nonce', 'title'],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .gradient-card {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
      font-family: system-ui, sans-serif;
    }
    .gradient-card h2 { margin: 0 0 8px 0; }
  </style>
</head>
<body style="padding: 20px;">
  <div class="gradient-card">
    <h2>Styled with &lt;style&gt;</h2>
    <p>Internal CSS declared directly inside the document &lt;head&gt;!</p>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Use CSS to create high color contrast and focus indicators (e.g. :focus-visible outlines) for keyboard navigation.',
    seoRelevance: 'Critical CSS inside <style> avoids extra network round-trips for above-the-fold content, boosting Core Web Vitals (LCP & FCP) and SEO rankings.',
    commonMistakes: [
      {
        mistake: 'Writing HTML tags inside <style> block.',
        solution: 'Only valid CSS syntax is allowed inside <style>.',
        explanation: 'HTML tags inside <style> cause CSS parse errors.'
      }
    ],
    relatedElements: ['link', 'head', 'script'],
    interviewQuestions: [
      {
        question: 'What is "Critical Inlined CSS" and why is <style> used for it?',
        answer: 'Critical CSS is inlined directly inside <head><style> for above-the-fold content to eliminate render-blocking stylesheet network round-trips, speeding up First Contentful Paint (FCP).',
        hinglishTip: 'Above-the-fold content ko turant render karne ke liye critical CSS ko <style> me inline kar dete hain.'
      }
    ],
    practiceExercise: {
      title: 'Apply Card Styling with Style Tag',
      prompt: 'Write an internal <style> block that styles a button with blue background, white text, and rounded corners.',
      starterCode: `<head>
  <!-- Write style tag here -->
</head>
<body>
  <button class="btn">Click Me</button>
</body>`,
      solutionCode: `<head>
  <style>
    .btn {
      background-color: #2563eb;
      color: #ffffff;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <button class="btn">Click Me</button>
</body>`,
      hint: 'Define .btn with background-color, color, and border-radius inside <style>.'
    }
  },
  {
    id: 'script',
    name: '<script>',
    syntax: '<script src="app.js" defer></script> or <script>/* JS */</script>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Embeds executable JavaScript code or links external scripts into the HTML document.',
    hinglish: '<script> tag HTML document me JavaScript code add karta hai. Isse page dynamic, interactive aur reactive banta hai (jaise buttons click handle karna, API calls, modal popups). Isme "defer" ya "async" attribute lagana modern best practice hai taaki HTML parsing block na ho.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</script>) even when src is used.',
    supportedAttributes: ['src', 'type', 'async', 'defer', 'crossorigin', 'integrity', 'nomodule'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Interactive JavaScript Demo</h2>
  <p id="counter-text">Current Count: 0</p>
  <button id="count-btn" style="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer;">
    Increment Counter
  </button>

  <script>
    let count = 0;
    const btn = document.getElementById('count-btn');
    const display = document.getElementById('counter-text');
    btn.addEventListener('click', () => {
      count++;
      display.textContent = 'Current Count: ' + count;
      display.style.color = '#4f46e5';
      display.style.fontWeight = 'bold';
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Ensure all script-driven interactive elements are keyboard focusable and update ARIA attributes (e.g. aria-expanded, aria-live) when state changes.',
    seoRelevance: 'Search engine bots execute client-side JavaScript, but deferred scripts that load quickly improve Core Web Vitals (INP and TBT).',
    commonMistakes: [
      {
        mistake: 'Using self-closing syntax: <script src="app.js" />.',
        solution: 'Always write the full closing tag: <script src="app.js"></script>.',
        explanation: 'Self-closing <script /> is invalid in HTML5 and will cause the browser to treat the rest of the file as script content.'
      },
      {
        mistake: 'Loading heavy scripts in <head> without defer or async.',
        solution: 'Use <script src="..." defer></script> to prevent render blocking.',
        explanation: 'Synchronous scripts block HTML parsing until download and execution finish.'
      }
    ],
    relatedElements: ['noscript', 'head', 'body'],
    interviewQuestions: [
      {
        question: 'What is the exact difference between async and defer in script loading?',
        answer: 'Both download scripts in parallel without blocking HTML parsing. "async" executes immediately as soon as downloaded (out of order), while "defer" waits until HTML parsing is complete and executes strictly in document order.',
        hinglishTip: 'Interviewers love this question! "async" = download hone ke turant baad execute; "defer" = HTML parse hone ke baad, sequential order me execute.'
      }
    ],
    practiceExercise: {
      title: 'Attach Deferred Script',
      prompt: 'Write an external script link to "bundle.js" with the defer attribute and a type of module.',
      starterCode: `<head>
  <!-- Add deferred module script -->
</head>`,
      solutionCode: `<head>
  <script type="module" src="bundle.js" defer></script>
</head>`,
      hint: 'Use <script type="module" src="bundle.js" defer></script>.'
    }
  },
  {
    id: 'noscript',
    name: '<noscript>',
    syntax: '<noscript>Fallback message</noscript>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'Provides fallback HTML content displayed only when client-side JavaScript is disabled or unsupported.',
    hinglish: '<noscript> tag ka content sirf tab browser par display hota hai jab user ne browser settings me JavaScript disable kar rakhi ho ya browser scripts support na karta ho. Yeh essential fallback messages ya CSS-only alternatives provide karne ke kaam aata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</noscript>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Web Application Screen</h2>
  <div id="app">
    <p>JavaScript is active! Interactive features are functional.</p>
  </div>

  <noscript>
    <div style="background: #fee2e2; border: 1px solid #ef4444; color: #991b1b; padding: 16px; border-radius: 8px;">
      <strong>JavaScript Disabled:</strong> For full interactive functionality, please enable JavaScript in your browser settings.
    </div>
  </noscript>
</body>
</html>`,
    accessibilityGuidance: 'Provides an accessible warning to users operating in privacy-hardened or assistive environments where JavaScript is disabled.',
    seoRelevance: 'Web scrapers that do not evaluate JavaScript can still read fallback links and descriptions placed inside <noscript>.',
    commonMistakes: [
      {
        mistake: 'Putting critical tracking or scripts inside <noscript> expecting JS to run.',
        solution: 'Use <noscript> only for fallback HTML tags like <img> or warnings.',
        explanation: 'JavaScript cannot execute inside a <noscript> block.'
      }
    ],
    relatedElements: ['script', 'body'],
    interviewQuestions: [
      {
        question: 'When does the content inside <noscript> render?',
        answer: 'Only when JavaScript execution is completely disabled in the browser settings or when the client does not support scripting.',
        hinglishTip: 'Jab browser me JavaScript turned off ho, tabhi yeh tag visual hota hai.'
      }
    ],
    practiceExercise: {
      title: 'Provide No-Script Alert',
      prompt: 'Create a <noscript> block with a friendly warning message.',
      starterCode: `<body>
  <!-- Add noscript block -->
</body>`,
      solutionCode: `<body>
  <noscript>
    <p>Please enable JavaScript to use this application.</p>
  </noscript>
</body>`,
      hint: 'Wrap paragraph text inside <noscript>...</noscript>.'
    }
  },
  {
    id: 'body',
    name: '<body>',
    syntax: '<body>...visible document content...</body>',
    category: 'document-structure',
    categoryLabel: 'Document Structure',
    shortDesc: 'The primary container for all human-visible content rendered on the webpage.',
    hinglish: '<body> webpage ka main visible container hai. Jo kuch bhi aap webpage par visual roop se dekhte hain (text, images, forms, buttons, tables, videos), woh sab <body> ke andar likha jaata hai. Ek HTML document me sirf ek hi <body> tag ho sakta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</body>).',
    supportedAttributes: ['class', 'id', 'onafterprint', 'onbeforeunload', 'onload', 'onresize', 'onstorage'],
    exampleCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Body Element Demo</title>
</head>
<body style="margin: 0; font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 40px;">
  <header>
    <h1 style="color: #818cf8; margin-top: 0;">Inside the &lt;body&gt;</h1>
  </header>
  <main>
    <p>Everything rendered inside this window lives inside the document &lt;body&gt; container.</p>
  </main>
  <footer style="margin-top: 40px; font-size: 12px; color: #94a3b8;">
    &copy; Codevaible Coding Lab
  </footer>
</body>
</html>`,
    accessibilityGuidance: 'The body element represents the root accessible object for assistive technologies. Styling should preserve default readability and keyboard focus visibility.',
    seoRelevance: 'All primary text, headings, content structure, and internal links indexed by search engine spiders reside within <body>.',
    commonMistakes: [
      {
        mistake: 'Declaring multiple <body> tags on the same page.',
        solution: 'Always use exactly one <body> element per HTML document.',
        explanation: 'Multiple body tags cause invalid DOM tree structures and unpredictable styling.'
      }
    ],
    relatedElements: ['html', 'head', 'header', 'main', 'footer'],
    interviewQuestions: [
      {
        question: 'What is the relationship between the DOM window, document, and document.body?',
        answer: 'window is the global browser object; document is the DOM tree under window; document.body is the direct JavaScript pointer to the <body> element node in the DOM.',
        hinglishTip: 'document.body se aap directly body tag ko JS me access karte hain bina querySelector ke.'
      }
    ],
    practiceExercise: {
      title: 'Structure Complete HTML Document',
      prompt: 'Construct a complete HTML skeleton with DOCTYPE, html, head, title, and body elements.',
      starterCode: `<!-- Build complete HTML document -->`,
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Webpage</title>
</head>
<body>
  <h1>Welcome to Codevaible!</h1>
</body>
</html>`,
      hint: 'Include <!DOCTYPE html>, <html lang="en">, <head>, <title>, and <body>.'
    }
  }
];
