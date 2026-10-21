import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const DEPRECATED_TAGS: HtmlTagItem[] = [
  {
    id: 'center',
    name: '<center>',
    syntax: '<center>Centered content (DEPRECATED)</center>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical tag used to center text and blocks; completely obsolete in HTML5.',
    hinglish: '<center> tag 1990s me text aur images ko screen ke beech me center karne ke liye banaya gaya tha. HTML5 me isko completely DEPRECATE aur OBSOLETE kar diya gaya hai kyunki HTML sirf structure ke liye hota hai aur visual alignment sirf CSS ka kaam hai. Production sites me iska use KABHI NA KAREIN!',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Violates separation of concerns by embedding visual layout instructions directly inside HTML markup. Browsers will eventually drop support.',
    modernAlternative: 'Use modern CSS: text-align: center (for inline text) or display: flex; justify-content: center; align-items: center (for blocks), or margin: 0 auto;.',
    isVoid: false,
    closingTagUsage: 'Historical: required </center>. Never use in modern code.',
    supportedAttributes: ['Deprecated in HTML5 — No valid modern attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- OBSOLETE HISTORICAL SYNTAX (DO NOT USE IN PRODUCTION) -->
  <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>⚠️ Obsolete Tag Warning:</strong> <code>&lt;center&gt;</code> is obsolete in HTML5.
  </div>

  <!-- MODERN RECOMMENDED CSS ALTERNATIVE -->
  <div style="text-align: center; padding: 24px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px;">
    <h3 style="color: #166534; margin: 0;">Centered with Modern CSS</h3>
    <p style="color: #15803d;">Using <code>text-align: center;</code> or Flexbox instead of &lt;center&gt;.</p>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Does not convey semantic meaning; assistive software may not announce centering.',
    seoRelevance: 'Search engine auditing tools flag deprecated tags like <center> as legacy code debt.',
    commonMistakes: [
      {
        mistake: 'Using <center> in new HTML projects.',
        solution: 'Always use modern CSS flexbox or text-align: center.',
        explanation: '<center> was removed from the HTML specification in HTML5.'
      }
    ],
    relatedElements: ['font', 'marquee', 'div'],
    interviewQuestions: [
      {
        question: 'Why was the <center> tag removed from the HTML standard in HTML5?',
        answer: 'Because HTML5 strictly enforces the "Separation of Concerns" principle: HTML is for document structure and semantics, while CSS is exclusively responsible for visual presentation and layout.',
        hinglishTip: 'HTML5 separation of concerns follow karta hai: HTML structure ke liye hai, CSS styling ke liye. Isliye <center> hata diya gaya.'
      }
    ],
    practiceExercise: {
      title: 'Replace <center> with Modern CSS',
      prompt: 'Refactor obsolete <center> markup into a <div> styled with text-align: center.',
      starterCode: `<!-- Refactor obsolete <center> -->
<center>
  <h1>Welcome to Codevaible</h1>
</center>`,
      solutionCode: `<div style="text-align: center;">
  <h1>Welcome to Codevaible</h1>
</div>`,
      hint: 'Use <div style="text-align: center;">...</div> instead of <center>.'
    }
  },
  {
    id: 'font',
    name: '<font>',
    syntax: '<font face="Arial" size="4" color="red">Text</font>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical font styling element; obsolete in HTML5 in favor of CSS font properties.',
    hinglish: '<font> tag purane HTML me font family (face), font size, aur text color badalne ke liye use hota tha. Isse HTML file bohot gandi aur bloated ho jaati thi. Aaj iski jagah CSS font-family, font-size, aur color properties use ki jaati hain.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Hardcodes visual appearance in HTML. Replaced completely by CSS font properties.',
    modernAlternative: 'Use CSS: font-family: "Inter", sans-serif; font-size: 1.25rem; color: #ef4444;.',
    isVoid: false,
    closingTagUsage: 'Historical: required </font>. Obsolete in modern HTML.',
    supportedAttributes: ['color, face, size (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="background: #fef2f2; border: 1px solid #f87171; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>Historical Obsolete Syntax:</strong> <code>&lt;font color="red" face="Arial"&gt;Text&lt;/font&gt;</code>
  </div>

  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 18px; color: #4f46e5; font-weight: bold;">
    Modern CSS Typography: Beautiful, responsive, and completely separated from markup!
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Font tags lack semantic contrast signals; modern CSS allows media query contrast adjustments.',
    seoRelevance: 'Causes W3C validation errors.',
    commonMistakes: [
      {
        mistake: 'Using <font color="red"> for error messages.',
        solution: 'Use CSS color and semantic classes or <span class="error">.',
        explanation: '<font> tag is obsolete.'
      }
    ],
    relatedElements: ['basefont', 'span'],
    interviewQuestions: [
      {
        question: 'What is the modern replacement for <font face="..." size="..." color="...">?',
        answer: 'CSS properties: font-family, font-size, and color.',
        hinglishTip: '<font> ke attributes CSS properties ban chuke hain: face -> font-family, size -> font-size, color -> color.'
      }
    ],
    practiceExercise: {
      title: 'Modernize Font Tag to CSS',
      prompt: 'Replace <font color="blue" size="5">Heading</font> with modern CSS styling on an <h2> tag.',
      starterCode: `<!-- Replace <font> with modern CSS -->
<font color="blue" size="5">Heading</font>`,
      solutionCode: `<h2 style="color: blue; font-size: 24px;">Heading</h2>`,
      hint: 'Apply color and font-size via CSS style attribute.'
    }
  },
  {
    id: 'marquee',
    name: '<marquee>',
    syntax: '<marquee behavior="scroll" direction="left">Scrolling text</marquee>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Non-standard historical element that scrolled text across the screen; obsolete and an accessibility hazard.',
    hinglish: '<marquee> tag text ya images ko screen par daudane (scrolling ticker) ke liye use hota tha. Isko HTML standards committee ne reject aur obsolete kar diya kyunki yeh accessibility ke liye behad khatarnak hai — ADHD aur visually impaired users chalte huye text ko padh nahi paate aur pause nahi kar paate.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Severe accessibility barrier (WCAG 2.2.2). Causes cognitive overload and prevents users from reading moving text. Never standardized.',
    modernAlternative: 'Use CSS @keyframes translateX animations with a user-controlled Pause button and @media (prefers-reduced-motion).',
    isVoid: false,
    closingTagUsage: 'Historical: required </marquee>. Strictly obsolete.',
    supportedAttributes: ['behavior, direction, scrollamount, scrolldelay (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>⚠️ Accessibility Hazard:</strong> <code>&lt;marquee&gt;</code> violates WCAG guidelines because users cannot pause the motion.
  </div>

  <!-- Modern Accessible Ticker with CSS Keyframes -->
  <style>
    @keyframes modernScroll {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    .ticker-container { overflow: hidden; white-space: nowrap; background: #1e1e2f; padding: 12px; border-radius: 8px; }
    .ticker-text { display: inline-block; animation: modernScroll 12s linear infinite; color: #38bdf8; font-weight: bold; }
    .ticker-container:hover .ticker-text { animation-play-state: paused; }
  </style>

  <div class="ticker-container" title="Hover mouse to pause animation!">
    <span class="ticker-text">🚀 Modern Accessible CSS Ticker — Hover your mouse to pause!</span>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'WCAG Success Criterion 2.2.2 requires that any moving, blinking, or scrolling content that starts automatically must have a mechanism for the user to pause, stop, or hide it.',
    seoRelevance: 'Negative signal in modern UX-weighted SEO algorithms.',
    commonMistakes: [
      {
        mistake: 'Using <marquee> for breaking news banners in production.',
        solution: 'Use CSS animations with a visible Pause button or respect prefers-reduced-motion.',
        explanation: '<marquee> cannot be paused by screen readers or keyboard users.'
      }
    ],
    relatedElements: ['center', 'bgsound'],
    interviewQuestions: [
      {
        question: 'Why does <marquee> fail WCAG accessibility compliance?',
        answer: 'WCAG Criterion 2.2.2 (Pause, Stop, Hide) mandates that users with attention disorders or low vision must be able to pause moving content. <marquee> offers no accessible pause controls.',
        hinglishTip: '<marquee> accessibility fail karta hai kyunki user moving text ko pause nahi kar sakta.'
      }
    ],
    practiceExercise: {
      title: 'Replace Marquee with Pausable CSS Animation',
      prompt: 'Write a CSS animated marquee alternative that pauses on hover.',
      starterCode: `<!-- Replace marquee with CSS ticker -->`,
      solutionCode: `<div style="overflow: hidden; white-space: nowrap;">
  <div style="display: inline-block; animation: scroll 10s linear infinite;">
    Live Announcements
  </div>
</div>`,
      hint: 'Use overflow: hidden and CSS animation instead of <marquee>.'
    }
  },
  {
    id: 'acronym',
    name: '<acronym>',
    syntax: '<acronym title="World Health Organization">WHO</acronym>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical tag for acronyms; obsolete in HTML5 in favor of the unified <abbr> element.',
    hinglish: '<acronym> tag un shabdon ke liye banaya gaya tha jo pronounce kiye jaate hain (jaise NASA, RADAR). Lekin developers aur users ke liye "acronym" vs "abbreviation" ka farq samajhna confusing tha, isliye HTML5 ne isko hata kar dono ke liye ek akela tag <abbr> standardize kar diya.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Confusing overlap with <abbr>. Merged into <abbr> in HTML5.',
    modernAlternative: 'Use <abbr title="Expanded Form">Acronym</abbr>.',
    isVoid: false,
    closingTagUsage: 'Historical: required </acronym>. Obsolete.',
    supportedAttributes: ['title (obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <p>
    <strong>Modern Replacement:</strong>
    <abbr title="North Atlantic Treaty Organization" style="text-decoration: underline dotted; cursor: help;">NATO</abbr>
    is marked up using the modern <code>&lt;abbr&gt;</code> element instead of obsolete <code>&lt;acronym&gt;</code>.
  </p>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers support <abbr> natively; support for <acronym> is inconsistent.',
    seoRelevance: 'Always use <abbr> for acronym entity expansion.',
    commonMistakes: [
      {
        mistake: 'Using <acronym> in modern HTML documents.',
        solution: 'Use <abbr> for all abbreviations and acronyms.',
        explanation: '<acronym> is deprecated and dropped in HTML5.'
      }
    ],
    relatedElements: ['abbr', 'dfn'],
    interviewQuestions: [
      {
        question: 'Why was <acronym> dropped in HTML5 while <abbr> was retained?',
        answer: 'The linguistic distinction between an abbreviation and an acronym is subtle and differs across languages. The W3C simplified the specification by using <abbr> for both concepts.',
        hinglishTip: 'Dono me confuse hone se bachne ke liye HTML5 ne <acronym> ko <abbr> me merge kar diya.'
      }
    ],
    practiceExercise: {
      title: 'Convert Acronym to Modern Abbr',
      prompt: 'Convert <acronym title="National Aeronautics and Space Administration">NASA</acronym> to modern HTML.',
      starterCode: `<acronym title="National Aeronautics and Space Administration">NASA</acronym>`,
      solutionCode: `<abbr title="National Aeronautics and Space Administration">NASA</abbr>`,
      hint: 'Change <acronym> to <abbr>.'
    }
  },
  {
    id: 'applet',
    name: '<applet>',
    syntax: '<applet code="Game.class" width="300" height="300"></applet>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical tag used to embed Java Applets; completely obsolete and unsupported by modern web browsers.',
    hinglish: '<applet> tag 1990s aur early 2000s me webpage ke andar Java Applets run karne ke liye use hota tha. Isme behad gambhir security vulnerabilities (malware exploits) the aur browsers ne Java plugins ka support hamesha ke liye band kar diya. Aaj iski jagah HTML5 <canvas>, WebAssembly, aur JavaScript use hote hain.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Severe security vulnerabilities, memory exploits, and removal of NPAPI plugins from all modern browsers.',
    modernAlternative: 'Use <canvas> with JavaScript or WebAssembly (Wasm), or the <object> tag.',
    isVoid: false,
    closingTagUsage: 'Historical: required </applet>. Completely obsolete.',
    supportedAttributes: ['code, archive, width, height (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>⚠️ Security Risk:</strong> <code>&lt;applet&gt;</code> relies on NPAPI Java plugins, which are completely disabled and blocked in all modern browsers.
  </div>
  <p>Modern interactive applications run inside native <code>&lt;canvas&gt;</code> using JavaScript or WebAssembly (Wasm) with zero plugins!</p>
</body>
</html>`,
    accessibilityGuidance: 'Java applets were notorious for trapping keyboard focus and failing screen reader accessibility.',
    seoRelevance: 'Browsers block Java plugins; crawlers cannot execute applets.',
    commonMistakes: [
      {
        mistake: 'Attempting to run legacy Java code with <applet>.',
        solution: 'Migrate to WebAssembly (Wasm) or compile Java to web bytecode via modern tools.',
        explanation: 'Chrome, Safari, Firefox, and Edge will refuse to load <applet>.'
      }
    ],
    relatedElements: ['object', 'embed', 'canvas'],
    interviewQuestions: [
      {
        question: 'Why did all modern browsers drop support for <applet> and NPAPI plugins?',
        answer: 'NPAPI plugins had direct access to native operating system memory without browser sandbox isolation, causing catastrophic security exploits, crashes, and battery drain.',
        hinglishTip: 'NPAPI plugins sandbox ke bahar chalte the jisse security exploits aur malware ka khatra tha.'
      }
    ],
    practiceExercise: {
      title: 'Replace Applet with Canvas',
      prompt: 'Write a modern <canvas> element to replace a legacy applet drawing area.',
      starterCode: `<!-- Replace applet with canvas -->`,
      solutionCode: `<canvas id="app-canvas" width="400" height="300"></canvas>`,
      hint: 'Use <canvas width="..." height="...">.'
    }
  },
  {
    id: 'basefont',
    name: '<basefont>',
    syntax: '<basefont color="blue" size="4" face="Arial">',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical tag to set a document-wide base font; obsolete in HTML5.',
    hinglish: '<basefont> tag poore webpage ke liye default font, size, aur color set karne ke liye use hota tha. HTML5 me isko bilkul hata diya gaya hai. Aaj poore page ka default font CSS ke zariye `body { font-family: ...; }` me set kiya jaata hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Violates separation of concerns. Replaced by CSS typography declarations on body.',
    modernAlternative: 'Use CSS: body { font-family: "Inter", sans-serif; font-size: 16px; color: #1e293b; }.',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void tag. Obsolete.',
    supportedAttributes: ['color, face, size (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Modern Replacement for <basefont> */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 16px;
      color: #1e293b;
      line-height: 1.6;
    }
  </style>
</head>
<body style="padding: 20px;">
  <h2>Document-Wide Typography</h2>
  <p>Styling applied globally via CSS on the <code>&lt;body&gt;</code> element replaces obsolete <code>&lt;basefont&gt;</code>.</p>
</body>
</html>`,
    accessibilityGuidance: 'CSS body font sizing allows users to scale text cleanly using browser zoom.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <basefont> in <head>.',
        solution: 'Set font properties in CSS stylesheet: body { font-family: sans-serif; }.',
        explanation: '<basefont> is completely unsupported.'
      }
    ],
    relatedElements: ['font', 'style'],
    interviewQuestions: [
      {
        question: 'How do you replace <basefont> in modern web development?',
        answer: 'By declaring global typography on the body or root (:root) selector in CSS.',
        hinglishTip: 'CSS me :root ya body par font-family declare karna basefont ka modern tarika hai.'
      }
    ],
    practiceExercise: {
      title: 'Declare Global Body Font',
      prompt: 'Write a <style> rule setting font-family: sans-serif on body.',
      starterCode: `<head>
  <!-- Replace basefont with CSS -->
</head>`,
      solutionCode: `<head>
  <style>
    body { font-family: sans-serif; }
  </style>
</head>`,
      hint: 'Declare body { font-family: sans-serif; }.'
    }
  },
  {
    id: 'bgsound',
    name: '<bgsound>',
    syntax: '<bgsound src="music.mid" loop="infinite">',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Internet Explorer proprietary tag that played background audio; completely obsolete.',
    hinglish: '<bgsound> Internet Explorer ka ek purana proprietary tag tha jo page open hote hi peeche background music (MIDI sound) baja deta tha. User ko pata bhi nahi chalta tha ki aawaz kahan se aa rahi hai aur pause karne ka koi button nahi hota tha. Modern web me iski jagah HTML5 <audio controls> use hota hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Proprietary IE tag; causes severe user annoyance; breaks autoplay policies.',
    modernAlternative: 'Use <audio controls src="audio.mp3"></audio>.',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void element. Obsolete.',
    supportedAttributes: ['src, loop (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Modern Controlled Audio:</h3>
  <p>Never play uninvited background audio. Always give users explicit play and volume controls:</p>
  <audio controls>
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support HTML5 audio.
  </audio>
</body>
</html>`,
    accessibilityGuidance: 'Uncontrolled background audio drowns out screen reader speech, rendering websites completely unusable for blind users.',
    seoRelevance: 'Auto-playing audio increases bounce rate drastically.',
    commonMistakes: [
      {
        mistake: 'Playing automatic background audio on page visit.',
        solution: 'Always provide visible <audio controls> so the user chooses when to play.',
        explanation: 'Unexpected sound violates accessibility and usability standards.'
      }
    ],
    relatedElements: ['audio', 'video'],
    interviewQuestions: [
      {
        question: 'Why did modern browsers ban unmuted background sound elements like <bgsound>?',
        answer: 'Because unexpected sound creates a jarring user experience, drains device batteries, and interferes with assistive screen readers.',
        hinglishTip: 'Unexpected background sound user experience aur screen readers dono ko ruin karta hai.'
      }
    ],
    practiceExercise: {
      title: 'Replace Bgsound with Accessible Audio',
      prompt: 'Construct an accessible <audio> element with controls.',
      starterCode: `<!-- Replace bgsound -->`,
      solutionCode: `<audio controls src="theme.mp3"></audio>`,
      hint: 'Use <audio controls src="..."></audio>.'
    }
  },
  {
    id: 'big',
    name: '<big>',
    syntax: '<big>Large text</big>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical tag that increased font size by one size; obsolete in HTML5.',
    hinglish: '<big> tag text ko thoda bada karne ke liye use hota tha. HTML5 me isko hata diya gaya kyunki text size control karna CSS ka kaam hai. Aaj iski jagah CSS font-size (jaise font-size: 1.25rem ya class="text-lg") use hota hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Purely presentational tag with no semantic meaning. Replaced by CSS.',
    modernAlternative: 'Use CSS: font-size: 1.25rem; or Tailwind text-lg / text-xl.',
    isVoid: false,
    closingTagUsage: 'Historical: required </big>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern CSS Alternative to <big> -->
  <p>Normal text size in paragraph.</p>
  <p style="font-size: 1.25rem; font-weight: 600; color: #4f46e5;">
    Larger text styled using modern CSS <code>font-size: 1.25rem</code> instead of obsolete &lt;big&gt;!
  </p>
</body>
</html>`,
    accessibilityGuidance: 'Use relative units (rem, em) in CSS so text scales with user browser settings.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <big> when a heading (<h2>) was semantically appropriate.',
        solution: 'Use <h2> for section titles and CSS for visual font sizing.',
        explanation: '<big> provides no semantic heading outline.'
      }
    ],
    relatedElements: ['small', 'h2', 'span'],
    interviewQuestions: [
      {
        question: 'Why was <small> kept in HTML5 while <big> was removed?',
        answer: '<small> has a clear semantic purpose: representing legal fine print, disclaimers, and copyright notices. <big> had zero semantic meaning beyond visual size, which belongs entirely to CSS.',
        hinglishTip: '<small> legal fine print represent karta hai isliye bacha raha, <big> ka koi semantic matlab nahi tha isliye hata diya gaya.'
      }
    ],
    practiceExercise: {
      title: 'Style Text Larger with CSS',
      prompt: 'Wrap text in a <span> with CSS font-size: 1.5rem instead of <big>.',
      starterCode: `<p><big>Important Announcement</big></p>`,
      solutionCode: `<p><span style="font-size: 1.5rem;">Important Announcement</span></p>`,
      hint: 'Use <span style="font-size: 1.5rem;">...</span>.'
    }
  },
  {
    id: 'dir',
    name: '<dir>',
    syntax: '<dir><li>Item</li></dir>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical directory list element; obsolete in HTML5 in favor of <ul>.',
    hinglish: '<dir> tag purane HTML me directory list (file names ki list) dikhane ke liye use hota tha. Isko HTML5 me drop kar diya gaya aur iski jagah standard unordered list <ul> use ki jaati hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Redundant with <ul>. Dropped from HTML5 standard.',
    modernAlternative: 'Use standard unordered list: <ul><li>...</li></ul>.',
    isVoid: false,
    closingTagUsage: 'Historical: required </dir>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Directory Listing (Modern HTML):</h3>
  <ul style="font-family: monospace; color: #475569; line-height: 1.6;">
    <li>📁 /src</li>
    <li>📁 /public</li>
    <li>📄 index.html</li>
  </ul>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers provide standard list announcements for <ul>.',
    seoRelevance: 'Standard <ul> is parsed for lists.',
    commonMistakes: [
      {
        mistake: 'Using <dir> for file lists.',
        solution: 'Use standard <ul><li> tags.',
        explanation: '<dir> is obsolete.'
      }
    ],
    relatedElements: ['ul', 'li', 'ol'],
    interviewQuestions: [
      {
        question: 'What is the modern replacement for the obsolete <dir> tag?',
        answer: 'The standard unordered list element (<ul>).',
        hinglishTip: '<dir> ki jagah hamesha <ul> use karein.'
      }
    ],
    practiceExercise: {
      title: 'Convert Dir to UL',
      prompt: 'Convert <dir><li>File.txt</li></dir> to a valid <ul> list.',
      starterCode: `<dir><li>File.txt</li></dir>`,
      solutionCode: `<ul><li>File.txt</li></ul>`,
      hint: 'Replace <dir> with <ul>.'
    }
  },
  {
    id: 'frameset-frame',
    name: '<frameset> & <frame>',
    syntax: '<frameset cols="20%,80%"><frame src="menu.html"><frame src="content.html"></frameset>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical multi-window frame layouts; completely obsolete in HTML5 in favor of CSS Grid/Flexbox and <iframe>.',
    hinglish: '<frameset> aur <frame> 1990s me ek hi browser window ko do-teen alag HTML pages me baantne ke liye use hote the (jaise left me menu page aur right me content page). Isse URLs toot jaate the, bookmarking namumkin thi, back button fail ho jaata tha, aur mobile par page kabhi render nahi ho sakta tha. HTML5 me isko completely ban kar diya gaya hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Broke fundamental web architecture: bookmarks, back buttons, responsive layouts, search engine indexing, and screen readers. Completely dropped in HTML5.',
    modernAlternative: 'Use CSS Grid or Flexbox for layout; use <iframe> if embedding an external document.',
    isVoid: false,
    closingTagUsage: 'Historical. Completely obsolete.',
    supportedAttributes: ['cols, rows, frameborder (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>⚠️ Banned in HTML5:</strong> <code>&lt;frameset&gt;</code> and <code>&lt;frame&gt;</code> are completely obsolete.
  </div>

  <!-- Modern Layout via CSS Flexbox -->
  <div style="display: flex; height: 180px; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
    <nav style="width: 140px; background: #1e293b; color: white; padding: 16px;">
      <strong>Sidebar</strong>
      <ul style="list-style: none; padding: 0; margin-top: 10px; font-size: 13px;">
        <li>Overview</li>
        <li>Lessons</li>
      </ul>
    </nav>
    <main style="flex: 1; padding: 16px; background: #ffffff;">
      <h3 style="margin-top: 0;">Main Content Area</h3>
      <p style="color: #64748b;">Built with CSS Flexbox instead of obsolete &lt;frameset&gt;!</p>
    </main>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Framesets were catastrophic for screen readers, frequently causing users to get trapped in navigation frames.',
    seoRelevance: 'Search engines could not index frameset pages properly.',
    commonMistakes: [
      {
        mistake: 'Using <frameset> instead of <body>.',
        solution: 'Never use <frameset>; use a single <body> with CSS Grid or Flexbox.',
        explanation: '<frameset> replaces <body> in legacy HTML, which is completely invalid in HTML5.'
      }
    ],
    relatedElements: ['iframe', 'div'],
    interviewQuestions: [
      {
        question: 'Why was <frameset> one of the most hated features in early web history?',
        answer: 'It broke the fundamental URL architecture of the web: users could not bookmark specific pages, the browser back button misbehaved, search crawlers could not index content, and printing was broken.',
        hinglishTip: '<frameset> se web ka URL aur bookmark system toot jaata tha, isliye isko poori tarah hata diya gaya.'
      }
    ],
    practiceExercise: {
      title: 'Build Modern Flexbox Layout',
      prompt: 'Create a 2-column layout using a <div> with display: flex instead of frameset.',
      starterCode: `<!-- Build 2-column flexbox layout -->`,
      solutionCode: `<div style="display: flex;">
  <nav style="width: 200px;">Menu</nav>
  <main style="flex: 1;">Content</main>
</div>`,
      hint: 'Use display: flex on a wrapper container.'
    }
  },
  {
    id: 'isindex',
    name: '<isindex>',
    syntax: '<isindex prompt="Search...">',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Primitive single-line search prompt from early HTML 2.0; obsolete.',
    hinglish: '<isindex> HTML 2.0 (1995) ka ek primitive single-line search prompt tha jo user se search query le kar server ko bhejta tha. Isko modern HTML me <form> aur <input type="search"> se replace kar diya gaya hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Primitive 1990s search control. Fully superseded by <form> and <input type="search">.',
    modernAlternative: 'Use <search><form><input type="search" name="q"></form></search>.',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void tag. Obsolete.',
    supportedAttributes: ['prompt (obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern Search Alternative -->
  <form action="/search" method="get" style="display: flex; gap: 8px; max-width: 320px;">
    <input type="search" name="q" placeholder="Search documentation..." style="flex: 1; padding: 8px; border: 1px solid #94a3b8; border-radius: 6px;">
    <button type="submit" style="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px;">Search</button>
  </form>
</body>
</html>`,
    accessibilityGuidance: 'Use <input type="search"> with a linked <label> for accessibility.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <isindex>.',
        solution: 'Use <form> with <input type="search">.',
        explanation: '<isindex> is dead code.'
      }
    ],
    relatedElements: ['search', 'form', 'input'],
    interviewQuestions: [
      {
        question: 'What is the modern standard for single-line search queries?',
        answer: 'A <search> landmark element wrapping a <form> containing <input type="search">.',
        hinglishTip: '<form> ke andar <input type="search"> modern tarika hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Search Input',
      prompt: 'Construct a search input using <input type="search">.',
      starterCode: `<!-- Add search input -->`,
      solutionCode: `<input type="search" name="query" placeholder="Search...">`,
      hint: 'Use <input type="search">.'
    }
  },
  {
    id: 'keygen',
    name: '<keygen>',
    syntax: '<keygen name="security_key">',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical public-key generator element; obsolete in HTML5 due to security issues and lack of cross-browser consensus.',
    hinglish: '<keygen> tag client-side par RSA cryptographic key pair generate karne ke liye use hota tha. Isme security design flaws the aur modern cryptography standards se match nahi karta tha. Isko modern Web Authentication API (WebAuthn / Passkeys) aur Web Crypto API se replace kar diya gaya hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Security design vulnerabilities, non-standard key formats, and removal from all browser engines.',
    modernAlternative: 'Use the modern Web Authentication API (WebAuthn / Passkeys) or SubtleCrypto (window.crypto.subtle).',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void tag. Obsolete.',
    supportedAttributes: ['name, challenge, keytype (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>⚠️ Obsolete Security Element:</strong> <code>&lt;keygen&gt;</code> was deprecated and completely removed from all browsers.
  </div>
  <p>Modern applications generate cryptographic signatures using the <strong>Web Crypto API</strong> (<code>window.crypto.subtle</code>) or Passkeys (WebAuthn).</p>
</body>
</html>`,
    accessibilityGuidance: 'None.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <keygen> in certificate forms.',
        solution: 'Use modern WebAuthn or server-side key generation.',
        explanation: 'Browsers ignore <keygen>.'
      }
    ],
    relatedElements: ['form', 'input'],
    interviewQuestions: [
      {
        question: 'What replaced the <keygen> element in modern browser cryptography?',
        answer: 'The Web Cryptography API (window.crypto.subtle) and the Web Authentication API (WebAuthn).',
        hinglishTip: 'Web Crypto API aur WebAuthn (Passkeys) ne keygen ko replace kiya hai.'
      }
    ],
    practiceExercise: {
      title: 'Verify Modern Crypto Available',
      prompt: 'Check window.crypto availability in a script tag.',
      starterCode: `<script>
  // Check if Web Crypto is available
</script>`,
      solutionCode: `<script>
  console.log("Web Crypto supported:", !!window.crypto?.subtle);
</script>`,
      hint: 'Check window.crypto.subtle.'
    }
  },
  {
    id: 'menuitem',
    name: '<menuitem>',
    syntax: '<menuitem label="Cut" icon="cut.png">',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical context menu item element; obsolete in HTML5.',
    hinglish: '<menuitem> tag right-click context menu me custom option add karne ke liye propose kiya gaya tha, lekin browser vendors ne isko kabhi implement nahi kiya aur isko standard se hata diya gaya. Aaj custom context menus JavaScript aur <button> se banaye jaate hain.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Never achieved cross-browser implementation. Dropped from HTML standard.',
    modernAlternative: 'Use <button> inside a custom popup menu positioned with CSS.',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void tag. Obsolete.',
    supportedAttributes: ['label, icon, type (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern Context Menu using Buttons -->
  <menu style="list-style: none; padding: 6px; margin: 0; background: white; border: 1px solid #cbd5e1; border-radius: 8px; width: 140px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <li><button style="width: 100%; text-align: left; padding: 6px; background: none; border: none; cursor: pointer;">✂️ Cut</button></li>
    <li><button style="width: 100%; text-align: left; padding: 6px; background: none; border: none; cursor: pointer;">📋 Copy</button></li>
  </menu>
</body>
</html>`,
    accessibilityGuidance: 'Custom context menus must manage keyboard arrow focus and Esc dismissal.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <menuitem> in <menu>.',
        solution: 'Use <li> with <button> elements inside <menu>.',
        explanation: '<menuitem> was removed from HTML.'
      }
    ],
    relatedElements: ['menu', 'button'],
    interviewQuestions: [
      {
        question: 'Why was <menuitem> removed from the HTML specification?',
        answer: 'Browser vendors refused to implement custom context menu hooks due to security concerns (phishing spoofing native browser right-click menus) and lack of consensus.',
        hinglishTip: 'Right-click menu hijack hone ke security khatre ke karan browsers ne isko support nahi kiya.'
      }
    ],
    practiceExercise: {
      title: 'Build Menu with Buttons',
      prompt: 'Construct a <menu> element containing an <li> with a <button>.',
      starterCode: `<!-- Add menu button -->`,
      solutionCode: `<menu><li><button type="button">Action</button></li></menu>`,
      hint: 'Nest <li><button> inside <menu>.'
    }
  },
  {
    id: 'nobr',
    name: '<nobr>',
    syntax: '<nobr>No line break allowed here</nobr>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Non-standard historical element that prevented text wrapping; obsolete in favor of CSS white-space: nowrap.',
    hinglish: '<nobr> (no break) tag text ko screen ke border par wrap hone se rokta tha. Yeh kabhi official W3C standard nahi bana. Aaj iski jagah CSS property `white-space: nowrap;` use ki jaati hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Non-standard proprietary tag. Replaced by CSS white-space property.',
    modernAlternative: 'Use CSS: white-space: nowrap;.',
    isVoid: false,
    closingTagUsage: 'Historical: required </nobr>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern CSS Alternative to <nobr> -->
  <p style="white-space: nowrap; background: #eef2ff; padding: 8px; border-radius: 6px; color: #4338ca; font-weight: bold;">
    This line will never wrap to a new line, using CSS white-space: nowrap!
  </p>
</body>
</html>`,
    accessibilityGuidance: 'Forcing nowrap can cause horizontal scrollbars on mobile phones, cutting off text for users with large fonts.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <nobr> instead of CSS.',
        solution: 'Use style="white-space: nowrap;" in CSS.',
        explanation: '<nobr> is non-standard.'
      }
    ],
    relatedElements: ['wbr', 'br'],
    interviewQuestions: [
      {
        question: 'What is the modern CSS equivalent of <nobr>?',
        answer: 'white-space: nowrap;.',
        hinglishTip: 'CSS me white-space: nowrap; <nobr> ka standard replacement hai.'
      }
    ],
    practiceExercise: {
      title: 'Prevent Line Wrap with CSS',
      prompt: 'Style a <span> with CSS white-space: nowrap.',
      starterCode: `<p><span>This must not wrap</span></p>`,
      solutionCode: `<p><span style="white-space: nowrap;">This must not wrap</span></p>`,
      hint: 'Add style="white-space: nowrap;".'
    }
  },
  {
    id: 'noembed',
    name: '<noembed>',
    syntax: '<noembed>Fallback if embed fails</noembed>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical fallback container for browsers that did not support <embed>; obsolete in HTML5.',
    hinglish: '<noembed> tag un purane browsers ke liye fallback text dikhata tha jo <embed> tag support nahi karte the. Aaj sabhi modern browsers natively media tags support karte hain aur <object> ke andar fallback content directly likha ja sakta hai bina <noembed> ke.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Obsolete fallback mechanism. Modern <object> element natively supports embedded fallback markup.',
    modernAlternative: 'Use <object data="file.ext">Fallback markup goes here</object>.',
    isVoid: false,
    closingTagUsage: 'Historical: required </noembed>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern Object Fallback (no noembed needed) -->
  <object data="file.pdf" type="application/pdf" width="300" height="150">
    <p>Modern fallback: Plugin unavailable. <a href="file.pdf">Download</a></p>
  </object>
</body>
</html>`,
    accessibilityGuidance: 'Use <object> for accessible fallback links.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <noembed> with modern media.',
        solution: 'Place fallback HTML directly inside <video>, <audio>, or <object>.',
        explanation: 'Modern media elements handle fallbacks directly without <noembed>.'
      }
    ],
    relatedElements: ['embed', 'object'],
    interviewQuestions: [
      {
        question: 'How do modern HTML5 media elements handle fallbacks without <noembed>?',
        answer: 'Elements like <video>, <audio>, and <object> treat any child elements that are not <source> or <track> as automatic fallback content if rendering fails.',
        hinglishTip: '<video> aur <audio> ke andar likha text apne aap fallback ban jata hai.'
      }
    ],
    practiceExercise: {
      title: 'Add Native Fallback to Video',
      prompt: 'Add a fallback download link inside a <video> element.',
      starterCode: `<video controls>
  <source src="vid.mp4" type="video/mp4">
  <!-- Add fallback -->
</video>`,
      solutionCode: `<video controls>
  <source src="vid.mp4" type="video/mp4">
  <p>Browser does not support video. <a href="vid.mp4">Download</a></p>
</video>`,
      hint: 'Place paragraph directly inside <video>.'
    }
  },
  {
    id: 'param',
    name: '<param>',
    syntax: '<object data="movie.swf"><param name="autoplay" value="true"></object>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical tag used to pass initialization parameters to <object> plugins; obsolete in HTML5.',
    hinglish: '<param> tag Flash players aur Java applets jaise external plugins (<object>) ko configuration parameters pass karne ke liye use hota tha. Jab plugins khatam ho gaye, toh <param> tag bhi obsolete ho gaya. Aaj HTML5 media tags attributes aur JavaScript dataset se configure hote hain.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Obsolete due to the demise of browser plugins. Parameters are passed via standard HTML attributes or data-* attributes.',
    modernAlternative: 'Use standard attributes on <video>, <audio>, or JavaScript dataset / URL query parameters.',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void element. Obsolete.',
    supportedAttributes: ['name, value (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern Parameter Passing: Directly via HTML attributes! -->
  <video controls autoplay muted style="width: 300px; border-radius: 8px;">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  </video>
</body>
</html>`,
    accessibilityGuidance: 'None.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <param> inside modern media tags.',
        solution: 'Use native attributes like autoplay, controls, loop directly on <video> and <audio>.',
        explanation: '<param> is obsolete.'
      }
    ],
    relatedElements: ['object'],
    interviewQuestions: [
      {
        question: 'Why is the <param> tag obsolete in modern HTML?',
        answer: 'It existed solely to feed arguments to browser plugins (ActiveX, Flash, Java). Since plugins are obsolete, <param> has no purpose.',
        hinglishTip: '<param> Flash aur plugins ke liye tha; plugins band hote hi yeh bhi obsolete ho gaya.'
      }
    ],
    practiceExercise: {
      title: 'Configure Video with Native Attributes',
      prompt: 'Configure a video with loop and muted attributes instead of params.',
      starterCode: `<!-- Add attributes to video -->
<video src="clip.mp4"></video>`,
      solutionCode: `<video src="clip.mp4" loop muted controls></video>`,
      hint: 'Add loop, muted, and controls attributes.'
    }
  },
  {
    id: 'spacer',
    name: '<spacer>',
    syntax: '<spacer type="block" width="10" height="20">',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Netscape Navigator proprietary element used to create blank spacing; obsolete in HTML5.',
    hinglish: '<spacer> 1990s me Netscape Navigator ka ek ajeeb tag tha jo screen par khali jagah (blank space) banane ke liye use hota tha. Isko W3C standard ne kabhi adopt nahi kiya. Aaj spacing ke liye CSS margin, padding, aur flex/grid gap use hote hain.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Netscape proprietary hack before CSS was standardized. Replaced by CSS margin and padding.',
    modernAlternative: 'Use CSS: margin, padding, or gap: 1rem;.',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Historical void tag. Completely obsolete.',
    supportedAttributes: ['type, size, width, height (all obsolete)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern CSS Spacing Alternative to <spacer> -->
  <div style="display: flex; gap: 24px; background: #f8fafc; padding: 20px; border-radius: 8px;">
    <div style="background: #e0e7ff; padding: 12px; border-radius: 6px;">Element A</div>
    <!-- Clean gap: 24px replaces <spacer> -->
    <div style="background: #e0e7ff; padding: 12px; border-radius: 6px;">Element B</div>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'CSS spacing preserves semantic cleanliness for screen readers.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using &nbsp;&nbsp;&nbsp; or spacer hacks for layout.',
        solution: 'Use CSS margin or gap.',
        explanation: 'CSS is the only modern mechanism for layout spacing.'
      }
    ],
    relatedElements: ['div', 'br'],
    interviewQuestions: [
      {
        question: 'What historical problem did <spacer> solve, and how does modern CSS handle it?',
        answer: 'Before CSS existed, web developers had no way to create whitespace between elements. Today, CSS margin, padding, and Flexbox/Grid "gap" provide robust spacing.',
        hinglishTip: 'CSS aane se pehle space dene ke liye <spacer> use hota tha; aaj CSS gap aur margin use hote hain.'
      }
    ],
    practiceExercise: {
      title: 'Apply Spacing with CSS Gap',
      prompt: 'Style a container with display: flex and gap: 16px.',
      starterCode: `<div>
  <!-- Add flex and gap styling -->
</div>`,
      solutionCode: `<div style="display: flex; gap: 16px;">
  <span>Item 1</span>
  <span>Item 2</span>
</div>`,
      hint: 'Use display: flex; gap: 16px;.'
    }
  },
  {
    id: 'strike',
    name: '<strike>',
    syntax: '<strike>Outdated text</strike>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical strikethrough tag; obsolete in HTML5 in favor of <del> or <s>.',
    hinglish: '<strike> tag text ke beech me se line khinchne (strikethrough) ke liye use hota tha. HTML5 me isko hata kar do behtar tags banaye gaye: document edit history ke liye <del>, aur purani price/discount ke liye <s>.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Redundant with semantic <del> (document edits) and <s> (no longer accurate/obsolete info).',
    modernAlternative: 'Use <del> for document editing history or <s> for outdated information like pricing discounts.',
    isVoid: false,
    closingTagUsage: 'Historical: required </strike>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <p>Modern Replacement: Was <s>$100</s>, now <strong>$49</strong> (using semantic &lt;s&gt; tag instead of obsolete &lt;strike&gt;).</p>
</body>
</html>`,
    accessibilityGuidance: 'Use <s> with screen-reader friendly text or <del>.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <strike> in new websites.',
        solution: 'Use <s> for outdated pricing or <del> for edited text.',
        explanation: '<strike> is obsolete.'
      }
    ],
    relatedElements: ['s', 'del'],
    interviewQuestions: [
      {
        question: 'What two tags replaced the obsolete <strike> tag in HTML5?',
        answer: '<del> for document editing revision history and <s> for content that is no longer accurate or relevant.',
        hinglishTip: '<strike> ki jagah do tags aaye: <del> (editing) aur <s> (discount/obsolete info).'
      }
    ],
    practiceExercise: {
      title: 'Replace Strike with S Tag',
      prompt: 'Convert <strike>$99</strike> to modern HTML.',
      starterCode: `<p>Price: <strike>$99</strike> $49</p>`,
      solutionCode: `<p>Price: <s>$99</s> $49</p>`,
      hint: 'Replace <strike> with <s>.'
    }
  },
  {
    id: 'tt',
    name: '<tt>',
    syntax: '<tt>Teletype monospace text</tt>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical "Teletype" element; obsolete in HTML5 in favor of <code>, <kbd>, or CSS font-family: monospace.',
    hinglish: '<tt> (Teletype) tag text ko purane typewriter ya teletype machine ki tarah monospace font me render karta tha. HTML5 me isko hata diya gaya kyunki computer text ke liye semantic tags (<code>, <kbd>, <samp>) maujood hain, aur visual font ke liye CSS monospace use hota hai.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Purely presentational teletype styling. Replaced by semantic computer elements (<code>, <kbd>) or CSS font-family: monospace.',
    modernAlternative: 'Use <code> for code, <kbd> for keyboard keys, or CSS: font-family: monospace;.',
    isVoid: false,
    closingTagUsage: 'Historical: required </tt>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <p>Modern replacement: Use <code>const x = 42;</code> for computer code instead of obsolete &lt;tt&gt;.</p>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers recognize <code> and <kbd> as computer code and input.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <tt> for code snippets.',
        solution: 'Use <code> for inline code and <pre><code> for multi-line blocks.',
        explanation: '<tt> has no modern semantic validity.'
      }
    ],
    relatedElements: ['code', 'kbd', 'samp'],
    interviewQuestions: [
      {
        question: 'Why was <tt> (Teletype) deprecated in HTML5?',
        answer: 'Teletypes are obsolete technology, and HTML5 separated presentation from semantics. Use <code> for code semantics or CSS font-family: monospace for visual styling.',
        hinglishTip: '<tt> teletype machines ke liye tha; aaj computer code ke liye <code> use hota hai.'
      }
    ],
    practiceExercise: {
      title: 'Convert TT to Code Tag',
      prompt: 'Convert <tt>git push</tt> to modern semantic HTML.',
      starterCode: `<p>Run <tt>git push</tt> to publish.</p>`,
      solutionCode: `<p>Run <code>git push</code> to publish.</p>`,
      hint: 'Replace <tt> with <code>.'
    }
  },
  {
    id: 'xmp',
    name: '<xmp>',
    syntax: '<xmp><b>Raw HTML not parsed</b></xmp>',
    category: 'deprecated-tags',
    categoryLabel: 'Deprecated & Obsolete Tags',
    shortDesc: 'Historical "Example" element that rendered HTML tags as raw text without escaping; obsolete in HTML5.',
    hinglish: '<xmp> (example) tag ke andar HTML code likhne par browser usko parse nahi karta tha balki raw text ki tarah dikha deta tha (bina &lt; aur &gt; likhe). Lekin isse HTML parser me bohot complex security bugs aate the, isliye HTML5 ne isko completely drop kar diya. Aaj code snippets ke liye <pre><code> ke saath HTML entities (&lt; aur &gt;) use ki jaati hain.',
    status: 'deprecated',
    isDeprecated: true,
    deprecatedReason: 'Violated standard HTML parsing rules and created parser security vulnerabilities. Replaced by <pre><code> with HTML entities.',
    modernAlternative: 'Use <pre><code> with escaped HTML entities (&lt; and &gt;), or textContent in JavaScript.',
    isVoid: false,
    closingTagUsage: 'Historical: required </xmp>. Obsolete.',
    supportedAttributes: ['None'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong>⚠️ Security Risk:</strong> <code>&lt;xmp&gt;</code> is obsolete. Modern browsers parse code using <code>&lt;pre&gt;&lt;code&gt;</code> with escaped entities.
  </div>

  <!-- Modern Safe Code Block -->
  <pre style="background: #1e1e2f; color: #38bdf8; padding: 16px; border-radius: 8px; font-family: monospace;">
&lt;div class="card"&gt;
  &lt;h2&gt;Rendered safely with escaped brackets&lt;/h2&gt;
&lt;/div&gt;
  </pre>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers read preformatted code properly when escaped correctly.',
    seoRelevance: 'None.',
    commonMistakes: [
      {
        mistake: 'Using <xmp> to avoid typing &lt; and &gt;.',
        solution: 'Always escape code snippets as &lt; and &gt; inside <pre><code>.',
        explanation: '<xmp> is completely obsolete and triggers parser warnings.'
      }
    ],
    relatedElements: ['pre', 'code'],
    interviewQuestions: [
      {
        question: 'Why was <xmp> removed from HTML5 despite being convenient for writing code examples?',
        answer: 'It broke standard HTML lexing because the parser had to switch into a weird CDATA-like raw text mode until it found </xmp>, creating security vulnerabilities and parser ambiguity.',
        hinglishTip: '<xmp> parser ko confuse kar deta tha aur XSS security risks create karta tha, isliye hata diya gaya.'
      }
    ],
    practiceExercise: {
      title: 'Render Raw HTML using Pre and Code',
      prompt: 'Escape <h1>Title</h1> inside a <pre><code> block.',
      starterCode: `<!-- Render <h1>Title</h1> as code -->`,
      solutionCode: `<pre><code>&lt;h1&gt;Title&lt;/h1&gt;</code></pre>`,
      hint: 'Replace < with &lt; and > with &gt; inside <pre><code>.'
    }
  }
];
