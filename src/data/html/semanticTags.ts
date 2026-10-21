import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const SEMANTIC_TAGS: HtmlTagItem[] = [
  {
    id: 'header',
    name: '<header>',
    syntax: '<header>...</header>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents introductory content or a set of navigational links for a page or section.',
    hinglish: '<header> tag page ya kisi section ka introductory part (sirshak bhag) hota hai. Aam taur par isme logo, website ka title/tagline, aur navigation links aate hain. Yeh page par upar bhi ho sakta hai ya kisi <article> ke shuru me bhi ho sakta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</header>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; background: #f8fafc;">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <div style="font-weight: 800; font-size: 20px; color: #4f46e5;">Codevaible Lab</div>
    <nav>
      <a href="#learn" style="margin-right: 16px; color: #64748b; text-decoration: none; font-weight: 500;">Learn</a>
      <a href="#dsa" style="margin-right: 16px; color: #64748b; text-decoration: none; font-weight: 500;">DSA</a>
      <a href="#practice" style="color: #4f46e5; text-decoration: none; font-weight: 700;">Practice</a>
    </nav>
  </header>
  <main style="padding: 24px 0;">
    <h2>Semantic &lt;header&gt; in action</h2>
    <p>Provides a clean landmark for screen readers and search crawlers.</p>
  </main>
</body>
</html>`,
    accessibilityGuidance: 'Top-level <header> inside <body> automatically receives the ARIA banner landmark role. Screen-reader users can jump straight to it via landmark shortcuts.',
    seoRelevance: 'Search engines analyze headings, brand titles, and breadcrumbs placed inside <header> to understand site hierarchy and branding.',
    commonMistakes: [
      {
        mistake: 'Confusing <header> with <head> or <h1>.',
        solution: '<head> is metadata in document root; <h1> is a heading element; <header> is a semantic layout container.',
        explanation: '<head> contains <title> and <meta>; <header> renders visible layout in <body>.'
      }
    ],
    relatedElements: ['footer', 'nav', 'main', 'hgroup'],
    interviewQuestions: [
      {
        question: 'Can a webpage have more than one <header> element?',
        answer: 'Yes! While you typically have one top-level banner <header> for the page, individual <article> and <section> elements can each have their own internal <header>.',
        hinglishTip: 'Haan, har blog post <article> ka apna alag <header> ho sakta hai jisme post title aur author bio hoti hai.'
      }
    ],
    practiceExercise: {
      title: 'Build a Semantic Header',
      prompt: 'Construct a <header> element containing a site title <h1> and a <nav> element with two links.',
      starterCode: `<body>
  <!-- Add header with h1 and nav -->
</body>`,
      solutionCode: `<body>
  <header>
    <h1>Codevaible</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/courses">Courses</a>
    </nav>
  </header>
</body>`,
      hint: 'Wrap <h1> and <nav> inside <header>.'
    }
  },
  {
    id: 'footer',
    name: '<footer>',
    syntax: '<footer>...</footer>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents a footer for its nearest sectioning content or page root.',
    hinglish: '<footer> tag webpage ya kisi section ka sabse nichla bhag (footer) hota hai. Isme copyright jankari, privacy policy links, contact details, social media icons, aur sitemap links hote hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</footer>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <main>
    <h2>Welcome to Codevaible</h2>
    <p>Learn programming hands-on with live code editors.</p>
  </main>

  <footer style="margin-top: 40px; padding: 24px; background: #0f172a; color: #94a3b8; border-radius: 12px; font-size: 13px;">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <div>&copy; 2026 Codevaible Inc. All rights reserved.</div>
      <div>
        <a href="#terms" style="color: #cbd5e1; margin-right: 16px; text-decoration: none;">Terms of Service</a>
        <a href="#privacy" style="color: #cbd5e1; text-decoration: none;">Privacy Policy</a>
      </div>
    </div>
  </footer>
</body>
</html>`,
    accessibilityGuidance: 'Top-level <footer> mapped directly to <body> has the ARIA contentinfo landmark role.',
    seoRelevance: 'Search engine crawlers follow footer links for internal link discovery and legal business identification.',
    commonMistakes: [
      {
        mistake: 'Putting main body content inside <footer>.',
        solution: 'Reserve <footer> strictly for author info, legal metadata, and auxiliary links.',
        explanation: 'Assistive tech treats footer as secondary/concluding material.'
      }
    ],
    relatedElements: ['header', 'main', 'address'],
    interviewQuestions: [
      {
        question: 'What landmark role does the root <footer> element map to?',
        answer: 'role="contentinfo".',
        hinglishTip: 'Interview me puchte hain: "Root footer ka ARIA role kya hota hai?". Answer: contentinfo.'
      }
    ],
    practiceExercise: {
      title: 'Create Copyright Footer',
      prompt: 'Create a <footer> containing a copyright notice and an address link.',
      starterCode: `<body>
  <!-- Add footer -->
</body>`,
      solutionCode: `<body>
  <footer>
    <p>&copy; 2026 Codevaible Learning Lab. Built for developers.</p>
  </footer>
</body>`,
      hint: 'Use <footer> with a paragraph containing &copy;.'
    }
  },
  {
    id: 'main',
    name: '<main>',
    syntax: '<main>...</main>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents the dominant, unique central content of the document body.',
    hinglish: '<main> tag webpage ke mukhya content ko darshata hai jo us page ke liye unique hota hai. Isme repeating headers, footers, ya sidebars nahi hone chahiye. Har page par sirf ek visible <main> tag hona chahiye bina hidden attribute ke.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</main>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <header style="border-bottom: 1px solid #ccc; padding-bottom: 8px;">
    <strong>Global Header (Repeats on every page)</strong>
  </header>

  <main style="padding: 24px 0;">
    <h1>Unique Article: Binary Search Trees in JavaScript</h1>
    <p>This content is unique to this specific page and wrapped semantically in the &lt;main&gt; landmark.</p>
  </main>

  <footer style="border-top: 1px solid #ccc; padding-top: 8px; color: #666;">
    Global Footer
  </footer>
</body>
</html>`,
    accessibilityGuidance: 'Acts as the primary "main" landmark. Allows blind users to skip global navigation headers and jump directly to page content using "Skip to main content" links.',
    seoRelevance: 'Search engines give highest keyword weighting to text situated inside <main> over navigational boilerplate.',
    commonMistakes: [
      {
        mistake: 'Having multiple non-hidden <main> tags on a single page.',
        solution: 'There must only be one visible <main> tag per document.',
        explanation: 'Multiple visible <main> elements violate the HTML specification.'
      }
    ],
    relatedElements: ['header', 'footer', 'article', 'section'],
    interviewQuestions: [
      {
        question: 'Why is a "Skip to Main Content" link important for accessibility?',
        answer: 'It enables keyboard-only and screen-reader users to bypass repeated top navigation menus and instantly reach the <main> element without pressing Tab 50 times.',
        hinglishTip: 'Keyboard users ke liye "Skip to content" link pehla focusable item hota hai jo <main id="main"> par jump karata hai.'
      }
    ],
    practiceExercise: {
      title: 'Wrap Central Content with Main',
      prompt: 'Wrap an <h1> and two paragraphs inside a semantic <main> tag.',
      starterCode: `<body>
  <!-- Wrap with main -->
  <h1>Data Structures Overview</h1>
  <p>Arrays and Linked Lists are linear structures.</p>
  <p>Trees and Graphs are non-linear structures.</p>
</body>`,
      solutionCode: `<body>
  <main>
    <h1>Data Structures Overview</h1>
    <p>Arrays and Linked Lists are linear structures.</p>
    <p>Trees and Graphs are non-linear structures.</p>
  </main>
</body>`,
      hint: 'Place <main> before <h1> and </main> after the last <p>.'
    }
  },
  {
    id: 'nav',
    name: '<nav>',
    syntax: '<nav>...</nav>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents a section of a page whose purpose is to provide navigation links.',
    hinglish: '<nav> tag webpage ke mahatvapurna navigation links ke group ko encapsulate karta hai. Jaise main header menu, pagination links, ya table of contents. Har link group ko <nav> banane ki zaroorat nahi hoti, sirf mukhya navigation sections ke liye use karein.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</nav>).',
    supportedAttributes: ['Global attributes', 'aria-label'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <nav aria-label="Primary Navigation" style="background: #1e293b; padding: 12px 20px; border-radius: 8px;">
    <ul style="list-style: none; display: flex; gap: 20px; margin: 0; padding: 0;">
      <li><a href="#home" style="color: #60a5fa; text-decoration: none; font-weight: bold;">Home</a></li>
      <li><a href="#tutorials" style="color: #e2e8f0; text-decoration: none;">Tutorials</a></li>
      <li><a href="#compiler" style="color: #e2e8f0; text-decoration: none;">Compiler</a></li>
      <li><a href="#faq" style="color: #e2e8f0; text-decoration: none;">FAQ</a></li>
    </ul>
  </nav>
</body>
</html>`,
    accessibilityGuidance: 'Provides the "navigation" ARIA landmark. When multiple <nav> elements exist on a page, always differentiate them with aria-label (e.g. aria-label="Main" and aria-label="Pagination").',
    seoRelevance: 'Search engine bots prioritize the links inside <nav> as the primary site architecture and internal linking graph.',
    commonMistakes: [
      {
        mistake: 'Wrapping every single collection of links in <nav>.',
        solution: 'Reserve <nav> for primary navigation blocks (header menus, subnavs, pagination).',
        explanation: 'Minor link collections (like a 3-link social bar) do not need landmark status.'
      }
    ],
    relatedElements: ['header', 'a', 'ul', 'li'],
    interviewQuestions: [
      {
        question: 'Should a page with two <nav> elements use aria-label?',
        answer: 'Yes! Screen readers announce "navigation landmark", so distinguishing them with aria-label="Primary" and aria-label="Footer" helps users know where they are.',
        hinglishTip: 'Agar ek se zyada <nav> hain, toh aria-label lagana accessibility best practice hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Accessible Navigation Bar',
      prompt: 'Create a <nav> with aria-label="Main menu" containing an unordered list with three links.',
      starterCode: `<body>
  <!-- Create accessible nav -->
</body>`,
      solutionCode: `<body>
  <nav aria-label="Main menu">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/lessons">Lessons</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</body>`,
      hint: 'Use <nav aria-label="Main menu"><ul><li><a href="...">...</a></li></ul></nav>.'
    }
  },
  {
    id: 'section',
    name: '<section>',
    syntax: '<section>...</section>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents a standalone generic section of a document, typically with a heading.',
    hinglish: '<section> tag webpage ke kisi mukhya thematic group (vishay) ko darshata hai jiska apna ek heading (h2, h3) hota hai. Jaise "Introduction", "Features", "Pricing", ya "Testimonials". Yeh <div> ki tarah generic styling box nahi hai, balki semantic meaning rakhta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</section>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <section style="margin-bottom: 24px; padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
    <h2 style="color: #166534; margin-top: 0;">Interactive DSA Visualizer</h2>
    <p>Watch algorithms step-by-step with real-time DOM element animations.</p>
  </section>

  <section style="padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px;">
    <h2 style="color: #1e40af; margin-top: 0;">In-Browser Compiler</h2>
    <p>Write, run, and test HTML, CSS, JavaScript, and Python code instantly.</p>
  </section>
</body>
</html>`,
    accessibilityGuidance: 'A <section> with an aria-labelledby pointing to its heading becomes an accessible region landmark.',
    seoRelevance: 'Helps search bots divide long landing pages into distinct conceptual topic clusters.',
    commonMistakes: [
      {
        mistake: 'Using <section> purely for CSS styling instead of <div>.',
        solution: 'Use <div> for generic layout/styling; use <section> when the content represents a thematic chapter with a heading.',
        explanation: 'W3C guidelines state <section> must have a semantic purpose and heading.'
      }
    ],
    relatedElements: ['article', 'div', 'aside', 'main'],
    interviewQuestions: [
      {
        question: 'What is the key difference between <section> and <div>?',
        answer: '<div> has zero semantic meaning and is strictly a styling container. <section> represents a distinct thematic grouping of content, almost always accompanied by a heading.',
        hinglishTip: 'Interview me direct puchte hain: "section vs div me kya antar hai?". <div> sirf styling container hai; <section> semantic topic grouping hai jisme heading honi chahiye.'
      }
    ],
    practiceExercise: {
      title: 'Build Thematic Content Section',
      prompt: 'Create a <section> with an <h2> heading and a paragraph explaining HTML5 features.',
      starterCode: `<body>
  <!-- Add section with heading -->
</body>`,
      solutionCode: `<body>
  <section>
    <h2>HTML5 Semantic Elements</h2>
    <p>Semantic tags improve accessibility, readability, and SEO for modern web development.</p>
  </section>
</body>`,
      hint: 'Wrap <h2> and <p> inside <section>.'
    }
  },
  {
    id: 'article',
    name: '<article>',
    syntax: '<article>...</article>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents a self-contained composition intended to be independently reusable or distributable.',
    hinglish: '<article> tag aise content ke liye use hota hai jo apne aap me complete aur swatantra (self-contained) ho — jise agar website se bahar nikal kar RSS feed, email newsletter, ya kisi doosri site par share kiya jaaye toh bhi poora sense bane. Jaise blog post, news article, user comment, ya product review.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</article>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; background: #f8fafc;">
  <article style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; max-width: 600px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <header>
      <h2 style="margin-top: 0; color: #1e293b;">Understanding Quicksort in JavaScript</h2>
      <p style="color: #64748b; font-size: 13px;">By Alex Rivera &bull; Published on <time datetime="2026-03-15">March 15, 2026</time></p>
    </header>
    <p style="line-height: 1.6; color: #334155;">Quicksort is an efficient divide-and-conquer algorithm with an average time complexity of O(n log n)...</p>
    <footer style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b;">
      Tags: #Algorithms #DSA #JavaScript
    </footer>
  </article>
</body>
</html>`,
    accessibilityGuidance: 'Provides the "article" role landmark for screen readers, allowing users to cycle between discrete articles or comments.',
    seoRelevance: 'Search engines use <article> to detect independent news items, blog content, and syndicated article feeds (Google News and schema parsing).',
    commonMistakes: [
      {
        mistake: 'Using <article> for a simple sidebar widget or navigation menu.',
        solution: 'Use <aside> for sidebars and <nav> for navigation.',
        explanation: 'Content in <article> must be self-contained and independently syndicatable.'
      }
    ],
    relatedElements: ['section', 'aside', 'header', 'footer', 'time'],
    interviewQuestions: [
      {
        question: 'When should you use <article> instead of <section>?',
        answer: 'Use <article> when the content is completely self-contained and could stand alone in an RSS reader or newsletter. Use <section> when it is a chapter or component of a broader page.',
        hinglishTip: 'Test: "Kya is content ko bina baaki page ke alag se share kiya ja sakta hai?". Agar haan, toh <article> use karein.'
      }
    ],
    practiceExercise: {
      title: 'Create Blog Post Article',
      prompt: 'Construct an <article> containing a header with <h2>, a paragraph, and a <time> tag.',
      starterCode: `<body>
  <!-- Create self-contained article -->
</body>`,
      solutionCode: `<body>
  <article>
    <header>
      <h2>Learning React Hooks</h2>
      <p>Published: <time datetime="2026-04-10">April 10, 2026</time></p>
    </header>
    <p>Hooks simplify state management in functional components.</p>
  </article>
</body>`,
      hint: 'Include <header>, <h2>, <time>, and <p> inside <article>.'
    }
  },
  {
    id: 'aside',
    name: '<aside>',
    syntax: '<aside>...</aside>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents a portion of a document whose content is only indirectly related to the main content.',
    hinglish: '<aside> tag aise content ke liye use hota hai jo mukhya content se indirectly juda ho (tangentially related). Jaise blog post ka sidebar, related articles ki list, author bio box, ya glossary callout.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</aside>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <main style="flex: 3; min-width: 250px;">
      <h2>Bubble Sort Analysis</h2>
      <p>Bubble sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>
    </main>
    <aside style="flex: 1; min-width: 200px; background: #fef3c7; border: 1px solid #fde68a; padding: 16px; border-radius: 8px; font-size: 13px;">
      <h3 style="margin-top: 0; color: #92400e;">💡 Quick Fact</h3>
      <p style="color: #78350f; margin-bottom: 0;">Bubble sort has a worst-case time complexity of O(n²), making it impractical for large datasets!</p>
    </aside>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Maps to the "complementary" ARIA landmark. Screen reader users can choose to skip or listen to aside content separately from the main flow.',
    seoRelevance: 'Search engines de-prioritize keyword density inside <aside> so it does not distract from main article topic focus.',
    commonMistakes: [
      {
        mistake: 'Putting the primary page content inside <aside>.',
        solution: 'Keep primary content in <main> and supplemental notes in <aside>.',
        explanation: 'Assistive tech and search engines view <aside> as optional/secondary.'
      }
    ],
    relatedElements: ['main', 'article', 'section'],
    interviewQuestions: [
      {
        question: 'What is the semantic purpose of <aside>? Does it have to be visually on the side?',
        answer: 'No! "Aside" refers to semantic relationship (tangential content), not CSS visual positioning. It can be positioned at the bottom, inline as a callout box, or as a sidebar.',
        hinglishTip: 'Aside ka matlab visual "side" hona zaroori nahi hai; iska matlab content secondary ya related note hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Aside Callout',
      prompt: 'Create an <aside> element containing a pro-tip callout with an <h3> and a paragraph.',
      starterCode: `<body>
  <!-- Add aside callout -->
</body>`,
      solutionCode: `<body>
  <aside>
    <h3>Developer Tip</h3>
    <p>Always test your website using screen readers to guarantee accessibility.</p>
  </aside>
</body>`,
      hint: 'Wrap <h3> and <p> inside <aside>.'
    }
  },
  {
    id: 'address',
    name: '<address>',
    syntax: '<address>Contact info</address>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Provides contact information for a person or organization responsible for a document or article.',
    hinglish: '<address> tag author ya organisation ki contact information (jaise email, physical address, phone number, ya contact form link) provide karne ke liye use hota hai. Browser isko default roop se italic me display karte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</address>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <footer style="padding: 16px; background: #f1f5f9; border-radius: 8px;">
    <h3>Contact the Publisher</h3>
    <address style="font-style: normal; line-height: 1.6; color: #475569;">
      Written by <a href="mailto:support@codevaible.dev" style="color: #4f46e5; font-weight: bold;">Codevaible Team</a><br>
      Tech Park, Innovation Boulevard<br>
      Bengaluru, Karnataka, India<br>
      Phone: <a href="tel:+918000000000">+91 80000 00000</a>
    </address>
  </footer>
</body>
</html>`,
    accessibilityGuidance: 'Informs screen readers that the enclosed text represents direct contact coordinates for the document author.',
    seoRelevance: 'Essential for Local SEO and schema markup detection (matching Google Business Profile address data).',
    commonMistakes: [
      {
        mistake: 'Using <address> for arbitrary mailing addresses mentioned in a story.',
        solution: 'Use <address> ONLY for contact info of the page author or publishing company.',
        explanation: 'Random postal addresses mentioned in articles should use <p>, not <address>.'
      }
    ],
    relatedElements: ['footer', 'a'],
    interviewQuestions: [
      {
        question: 'Can <address> be used for any arbitrary postal address?',
        answer: 'No. The HTML specification states <address> is strictly for contact information of the document or article author/owner.',
        hinglishTip: 'Sirf author ya company ke contact info ke liye use karein, kisi random address ke liye nahi.'
      }
    ],
    practiceExercise: {
      title: 'Write Author Contact with Address',
      prompt: 'Construct an <address> tag containing author name, email link, and city.',
      starterCode: `<body>
  <!-- Create address -->
</body>`,
      solutionCode: `<body>
  <address>
    Written by Priya Patel<br>
    Email: <a href="mailto:priya@example.com">priya@example.com</a><br>
    Mumbai, India
  </address>
</body>`,
      hint: 'Include name and mailto link inside <address>.'
    }
  },
  {
    id: 'hgroup',
    name: '<hgroup>',
    syntax: '<hgroup><h1>Title</h1><p>Subtitle</p></hgroup>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Groups a heading with secondary headings, subtitles, or alternative titles.',
    hinglish: '<hgroup> tag mukhya heading ko uske subtitle ya tagline ke saath ek semantic unit me group karta hai. HTML5 modern specification me aap iske andar <h1> aur <p> (subtitle) ko saath me rakh sakte hain bina document outline todhe.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</hgroup>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <hgroup style="border-left: 4px solid #4f46e5; padding-left: 16px; margin-bottom: 24px;">
    <h1 style="margin: 0; color: #1e293b; font-size: 28px;">Codevaible Learning Lab</h1>
    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 16px;">Master Coding, DSA, and Full-Stack Engineering with Interactive Compilers</p>
  </hgroup>
  <p>The subtitle is semantically associated with the main heading inside &lt;hgroup&gt;.</p>
</body>
</html>`,
    accessibilityGuidance: 'Groups the primary heading with its supporting subtitle so assistive tools present them as a cohesive header block.',
    seoRelevance: 'Clarifies the relationship between the brand title and secondary descriptive tagline.',
    commonMistakes: [
      {
        mistake: 'Putting unrelated paragraphs inside <hgroup>.',
        solution: 'Only place the heading and its immediate subtitle/tagline inside <hgroup>.',
        explanation: '<hgroup> is dedicated to heading-subtitle combinations.'
      }
    ],
    relatedElements: ['header', 'h1', 'h2', 'p'],
    interviewQuestions: [
      {
        question: 'What is the modern HTML5 standard for <hgroup>?',
        answer: 'Modern HTML allows an <hgroup> to contain a heading (e.g. <h1>) paired with one or more <p> elements that serve as subtitles or taglines.',
        hinglishTip: 'HTML5 update me <hgroup> ke andar <h1> ke saath <p class="subtitle"> allow kiya gaya hai.'
      }
    ],
    practiceExercise: {
      title: 'Group Heading with Subtitle',
      prompt: 'Create an <hgroup> containing an <h1> title and a <p> tagline.',
      starterCode: `<body>
  <!-- Create hgroup -->
</body>`,
      solutionCode: `<body>
  <hgroup>
    <h1>Web Development Masterclass</h1>
    <p>From complete beginner to production engineer in 12 weeks.</p>
  </hgroup>
</body>`,
      hint: 'Wrap <h1> and <p> inside <hgroup>.'
    }
  },
  {
    id: 'search',
    name: '<search>',
    syntax: '<search><form>...</form></search>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Modern HTML element representing a search or filtering interface on a page.',
    hinglish: '<search> ek modern HTML standard element hai jo search ya filter functionality ko semantically wrap karta hai. Isse pehle log role="search" use karte the, lekin ab native <search> tag aane se screen readers ko turant pata chal jata hai ki yahan search bar hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</search>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Modern HTML5 search element -->
  <search style="max-width: 450px; background: #ffffff; padding: 12px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <form action="/search" method="get" style="display: flex; gap: 8px;">
      <label for="query" style="display: none;">Search algorithms</label>
      <input type="search" id="query" name="q" placeholder="Search DSA topics (e.g. Quick Sort)..." style="flex: 1; padding: 8px 12px; border: 1px solid #94a3b8; border-radius: 6px; outline: none;">
      <button type="submit" style="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
        Search
      </button>
    </form>
  </search>
</body>
</html>`,
    accessibilityGuidance: 'Automatically exposes the "search" landmark role to assistive technology without needing role="search".',
    seoRelevance: 'Helps search engines identify the internal site search form, which can be linked in Google Sitelinks Search Box.',
    commonMistakes: [
      {
        mistake: 'Confusing the <search> container element with <input type="search">.',
        solution: 'Use <search> as the container wrapping the <form> and <input type="search">.',
        explanation: '<search> is the semantic container; <input type="search"> is the actual text input.'
      }
    ],
    relatedElements: ['form', 'input', 'nav', 'header'],
    interviewQuestions: [
      {
        question: 'What is the difference between <search> and <input type="search">?',
        answer: '<search> is a semantic landmark container element introduced in modern HTML, replacing role="search". <input type="search"> is the interactive text field control inside the form.',
        hinglishTip: '<search> container tag hai jo role="search" ka native replacement hai, jabki <input type="search"> input box hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Modern Search Landmark',
      prompt: 'Create a <search> element enclosing a form with a search input and submit button.',
      starterCode: `<body>
  <!-- Create search landmark -->
</body>`,
      solutionCode: `<body>
  <search>
    <form action="/search">
      <input type="search" name="q" placeholder="Search documentation...">
      <button type="submit">Search</button>
    </form>
  </search>
</body>`,
      hint: 'Wrap form inside <search>...</search>.'
    }
  },
  {
    id: 'details',
    name: '<details>',
    syntax: '<details><summary>Click to view</summary>Content...</details>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Creates a native disclosure widget from which the user can obtain additional information.',
    hinglish: '<details> tag ek native accordion ya collapsible dropdown banata hai jiske liye zero JavaScript ki zaroorat hoti hai. Iske andar pehla tag <summary> hota hai jo button ki tarah click hota hai. Click karne par baaki hidden content expand ho jaata hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</details>).',
    supportedAttributes: ['open', 'name (accordion grouping)', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="max-width: 480px; display: flex; flex-direction: column; gap: 12px;">
    
    <details style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #ffffff;">
      <summary style="font-weight: bold; cursor: pointer; color: #1e293b;">
        What is the time complexity of Quick Sort?
      </summary>
      <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; color: #475569; font-size: 14px;">
        Average case is <strong>O(n log n)</strong>, and worst case is <strong>O(n²)</strong> when the pivot is poorly chosen.
      </div>
    </details>

    <details open style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #ffffff;">
      <summary style="font-weight: bold; cursor: pointer; color: #1e293b;">
        Does &lt;details&gt; require JavaScript to toggle?
      </summary>
      <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; color: #475569; font-size: 14px;">
        No! Browsers natively handle the open/close toggle state without writing any JS code.
      </div>
    </details>

  </div>
</body>
</html>`,
    accessibilityGuidance: 'Fully accessible out-of-the-box. Keyboard focusable using Tab, and toggles with Enter or Space. Screen readers automatically announce collapsed/expanded state.',
    seoRelevance: 'Excellent for FAQ sections and rich snippet FAQPage schema generation.',
    commonMistakes: [
      {
        mistake: 'Forgetting the <summary> tag inside <details>.',
        solution: 'Always provide <summary> as the first child of <details>.',
        explanation: 'Without <summary>, the browser displays a default label like "Details".'
      }
    ],
    relatedElements: ['summary', 'dialog', 'button'],
    interviewQuestions: [
      {
        question: 'How do you create an exclusive accordion where only one <details> can be open at a time in modern HTML?',
        answer: 'By giving multiple <details> elements the exact same "name" attribute (e.g. name="faq-group"). The browser automatically closes others when one is opened.',
        hinglishTip: 'HTML modern update me sabhi <details> ko same name attribute de do (jaise name="faq"), toh ek khulne par doosra automatically band ho jaata hai bina JS ke.'
      }
    ],
    practiceExercise: {
      title: 'Build Accordion Item',
      prompt: 'Construct a <details> widget with a <summary> question and answer text.',
      starterCode: `<body>
  <!-- Build details/summary -->
</body>`,
      solutionCode: `<body>
  <details>
    <summary>Is HTML a programming language?</summary>
    <p>No, HTML is a Hypertext Markup Language used for structuring web content.</p>
  </details>
</body>`,
      hint: 'Put <summary> as the first child of <details>.'
    }
  },
  {
    id: 'summary',
    name: '<summary>',
    syntax: '<summary>Accordion Title</summary>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Specifies a summary, caption, or legend for a <details> disclosure box.',
    hinglish: '<summary> tag <details> element ka heading ya label hota hai. User is par click karke details ko open ya close karta hai. Browser iske aage ek chhota arrow (disclosure triangle) show karta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</summary>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <details style="border: 1px solid #4f46e5; border-radius: 8px; padding: 12px; background: #eef2ff;">
    <summary style="font-weight: bold; cursor: pointer; color: #4338ca;">
      Click here to reveal secret code!
    </summary>
    <pre style="background: #1e1e2f; color: #38bdf8; padding: 12px; border-radius: 6px; margin-top: 10px;">const SECRET_KEY = "codevaible_2026";</pre>
  </details>
</body>
</html>`,
    accessibilityGuidance: 'Acts as a button control for assistive technologies. Must not contain interactive links or buttons inside the <summary> element.',
    seoRelevance: 'Search engines crawl <summary> text as prominent header question content.',
    commonMistakes: [
      {
        mistake: 'Placing interactive elements like <a> or <button> inside <summary>.',
        solution: 'Keep <summary> text clean and avoid nested clickable elements.',
        explanation: 'Nested interactive elements break keyboard accessibility.'
      }
    ],
    relatedElements: ['details', 'legend', 'caption'],
    interviewQuestions: [
      {
        question: 'How can you customize or hide the default disclosure triangle on <summary>?',
        answer: 'Use CSS: summary { list-style: none; } and summary::-webkit-details-marker { display: none; }.',
        hinglishTip: 'summary { list-style: none; } se default arrow hat jaata hai aur custom icon lagaya ja sakta hai.'
      }
    ],
    practiceExercise: {
      title: 'Add Summary to Details',
      prompt: 'Add a <summary> element to an open <details> tag.',
      starterCode: `<details open>
  <!-- Add summary here -->
  <p>Explanation content goes here.</p>
</details>`,
      solutionCode: `<details open>
  <summary>Click to view explanation</summary>
  <p>Explanation content goes here.</p>
</details>`,
      hint: 'Place <summary>Text</summary> right after <details>.'
    }
  },
  {
    id: 'dialog',
    name: '<dialog>',
    syntax: '<dialog id="myModal">...<button>Close</button></dialog>',
    category: 'semantic-html',
    categoryLabel: 'Semantic HTML5',
    shortDesc: 'Represents a native modal dialog box or subwindow with built-in backdrop and focus trap.',
    hinglish: '<dialog> tag modern HTML ka native modal / popup popup box hai. Isko JavaScript ke .showModal() method se kholte hain, jisse browser automatically background ko dim kar deta hai (::backdrop), keyboard focus ko modal ke andar trap karta hai, aur Escape key press karne par close kar deta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</dialog>).',
    supportedAttributes: ['open', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Native HTML5 &lt;dialog&gt; Modal</h2>
  <button id="open-btn" style="padding: 10px 18px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
    Open Native Modal
  </button>

  <dialog id="fav-dialog" style="padding: 24px; border: none; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); max-width: 400px;">
    <h3 style="margin-top: 0; color: #1e293b;">Confirm Action</h3>
    <p style="color: #64748b; line-height: 1.5;">This native dialog traps focus and dims the background with CSS ::backdrop pseudo-element!</p>
    <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;">
      <button id="close-btn" style="padding: 8px 16px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; cursor: pointer;">
        Close (or press Esc)
      </button>
    </div>
  </dialog>

  <script>
    const dialog = document.getElementById('fav-dialog');
    document.getElementById('open-btn').addEventListener('click', () => dialog.showModal());
    document.getElementById('close-btn').addEventListener('click', () => dialog.close());
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Provides full WCAG-compliant dialog accessibility when opened via dialog.showModal(): traps Tab focus, restores previous focus on close, and handles Escape key dismiss.',
    seoRelevance: 'Content inside a non-open <dialog> is hidden from immediate visual view but is still indexable if present in the DOM.',
    commonMistakes: [
      {
        mistake: 'Using dialog.show() instead of dialog.showModal().',
        solution: 'Use dialog.showModal() to open as a true accessible modal with backdrop and focus trap.',
        explanation: 'dialog.show() creates a non-modal popup without backdrop or focus trap.'
      }
    ],
    relatedElements: ['details', 'button', 'form'],
    interviewQuestions: [
      {
        question: 'What is the difference between dialog.show() and dialog.showModal()?',
        answer: 'dialog.show() opens a modeless window where users can still interact with the background page. dialog.showModal() opens a top-layer modal with automatic focus trapping, background backdrop styling, and Esc-to-close behavior.',
        hinglishTip: 'showModal() se real modal banta hai jo background disable kar deta hai aur ::backdrop support karta hai.'
      }
    ],
    practiceExercise: {
      title: 'Create Native Dialog with Close Button',
      prompt: 'Construct a <dialog> element containing a heading, a message, and a form with method="dialog" containing a submit button.',
      starterCode: `<body>
  <!-- Build native dialog -->
</body>`,
      solutionCode: `<body>
  <dialog id="alert-modal">
    <h3>Notification</h3>
    <p>Your changes have been saved.</p>
    <form method="dialog">
      <button type="submit">OK</button>
    </form>
  </dialog>
</body>`,
      hint: 'Using <form method="dialog"> automatically closes the dialog on submit without JS!'
    }
  }
];
