import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const MEDIA_GRAPHICS_TAGS: HtmlTagItem[] = [
  // =========================================================================
  // IMAGES & MULTIMEDIA
  // =========================================================================
  {
    id: 'img',
    name: '<img>',
    syntax: '<img src="photo.jpg" alt="Description" width="600" height="400" loading="lazy">',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Embeds an image into the document with required alternative text for accessibility.',
    hinglish: '<img> tag webpage par image/photo display karta hai. "src" me image ka path ya URL hota hai, aur "alt" me image ka description. "alt" attribute dena KABHI na bhoolein kyunki blind users screen reader se wahi sunte hain aur Google Image search isi se rank karta hai. "loading=lazy" lagane se image tabhi download hoti hai jab user scroll karke wahan pahuche.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['src', 'alt', 'width', 'height', 'loading', 'srcset', 'sizes', 'crossorigin', 'decoding'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Accessible &amp; Responsive Image</h3>
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop" 
    alt="Developer coding on a modern laptop with glowing code editor" 
    width="500" 
    height="300" 
    loading="lazy"
    style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
  >
</body>
</html>`,
    accessibilityGuidance: 'The alt attribute is strictly mandatory for WCAG accessibility. If an image is purely decorative, use alt="" (empty quotes) so screen readers skip it cleanly.',
    seoRelevance: 'Primary driver of Google Images search traffic. Always use descriptive filenames and keyword-rich alt text.',
    commonMistakes: [
      {
        mistake: 'Omitting the alt attribute entirely or writing alt="image" or alt="photo.jpg".',
        solution: 'Always write descriptive alt text, or alt="" if purely decorative.',
        explanation: 'Missing alt tags trigger accessibility compliance errors and hurt SEO.'
      },
      {
        mistake: 'Omitting width and height attributes.',
        solution: 'Always include width and height to prevent layout shifts (CLS).',
        explanation: 'Browsers need aspect-ratio dimensions to reserve space before image finishes downloading.'
      }
    ],
    relatedElements: ['picture', 'figure', 'figcaption', 'source'],
    interviewQuestions: [
      {
        question: 'Why should width and height attributes always be specified on <img> even when using responsive CSS?',
        answer: 'Modern browsers calculate the image\'s aspect ratio from width and height, reserving space in the layout before the file downloads. This eliminates Cumulative Layout Shift (CLS), improving Core Web Vitals.',
        hinglishTip: 'CLS (layout shift) se bachne ke liye hamesha width aur height attribute dena chahiye.'
      }
    ],
    practiceExercise: {
      title: 'Add Accessible Lazy Loaded Image',
      prompt: 'Construct an <img> tag with src, alt, width="400", height="250", and loading="lazy".',
      starterCode: `<body>
  <!-- Add image tag -->
</body>`,
      solutionCode: `<body>
  <img src="code.jpg" alt="Programmer analyzing algorithm flow" width="400" height="250" loading="lazy">
</body>`,
      hint: 'Include src, alt, width, height, and loading="lazy".'
    }
  },
  {
    id: 'picture',
    name: '<picture>',
    syntax: '<picture><source srcset="large.webp" media="(min-width: 800px)"><img src="small.jpg" alt="..."></picture>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'A wrapper container providing multiple image sources for responsive art direction and modern image format fallbacks (AVIF, WebP).',
    hinglish: '<picture> tag responsive images aur modern formats (AVIF, WebP) ke liye use hota hai. Iske andar kai <source> tags hote hain jisme alag-alag screen sizes (media queries) aur file formats hote hain. Browser sabse pehla supported format download karta hai aur aakhiri fallback <img> tag render karta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</picture>).',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Responsive &lt;picture&gt; with Format Fallback:</h3>
  <picture>
    <!-- WebP for modern browsers -->
    <source srcset="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&fm=webp" type="image/webp">
    <!-- Fallback standard JPEG -->
    <img 
      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&fm=jpg" 
      alt="Clean source code on monitor" 
      style="max-width: 100%; border-radius: 8px;"
    >
  </picture>
</body>
</html>`,
    accessibilityGuidance: 'The alt attribute is placed on the nested <img> element, which serves as the accessible representation for the entire <picture>.',
    seoRelevance: 'Drastically reduces page weight using modern WebP/AVIF formats, boosting PageSpeed scores and mobile search rank.',
    commonMistakes: [
      {
        mistake: 'Forgetting the fallback <img> tag inside <picture>.',
        solution: '<picture> MUST contain an <img> element as its last child.',
        explanation: 'Without the nested <img>, the browser displays nothing.'
      }
    ],
    relatedElements: ['source', 'img', 'figure'],
    interviewQuestions: [
      {
        question: 'What is the role of <picture> compared to <img> srcset?',
        answer: '<img> with srcset is best for serving different resolutions of the SAME image. <picture> is best for "art direction" (cropping differently on mobile vs desktop) and format negotiation (AVIF -> WebP -> JPG).',
        hinglishTip: '<picture> art direction (mobile pe alag crop) aur format switching (AVIF/WebP) ke liye best hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Picture with Format Support',
      prompt: 'Create a <picture> element offering WebP with an <img> fallback.',
      starterCode: `<body>
  <!-- Build picture element -->
</body>`,
      solutionCode: `<body>
  <picture>
    <source srcset="logo.webp" type="image/webp">
    <img src="logo.png" alt="Company Logo">
  </picture>
</body>`,
      hint: 'Include <source> with type="image/webp" followed by <img>.'
    }
  },
  {
    id: 'source',
    name: '<source>',
    syntax: '<source srcset="hero.webp" type="image/webp"> or <source src="video.mp4" type="video/mp4">',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Specifies alternative media resources for <picture>, <video>, or <audio> elements.',
    hinglish: '<source> tag <picture>, <video>, aur <audio> tags ke andar alternative media files specify karta hai. Browser formats ko upar se neeche check karta hai aur jo pehla format browser me chal sakta ho usko play ya display karta hai.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['src', 'srcset', 'type', 'media', 'sizes', 'width', 'height'],
    exampleCode: `<video controls width="320">
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
  <p>Your browser does not support HTML5 video.</p>
</video>`,
    accessibilityGuidance: 'Provides format redundancy so devices with different codecs can still access content.',
    seoRelevance: 'Enables search engines to identify high-performance modern media formats.',
    commonMistakes: [
      {
        mistake: 'Putting <source> tags outside of <picture>, <video>, or <audio>.',
        solution: '<source> is only valid as a child of media container elements.',
        explanation: 'Standalone <source> tags are invalid in HTML.'
      }
    ],
    relatedElements: ['picture', 'video', 'audio', 'track'],
    interviewQuestions: [
      {
        question: 'How do browsers choose between multiple <source> elements?',
        answer: 'The browser reads top-to-bottom and selects the very first <source> whose media query matches and whose MIME type codec is supported.',
        hinglishTip: 'Browser top se bottom check karta hai aur pehla supported format pick karta hai.'
      }
    ],
    practiceExercise: {
      title: 'Add Audio Sources',
      prompt: 'Add two <source> tags (ogg and mp3) inside an <audio controls> tag.',
      starterCode: `<audio controls>
  <!-- Add sources -->
</audio>`,
      solutionCode: `<audio controls>
  <source src="sound.ogg" type="audio/ogg">
  <source src="sound.mp3" type="audio/mpeg">
</audio>`,
      hint: 'Include type="audio/ogg" and type="audio/mpeg".'
    }
  },
  {
    id: 'audio-video',
    name: '<audio> & <video>',
    syntax: '<audio controls src="audio.mp3"></audio> and <video controls width="640" src="video.mp4"></video>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Embeds sound content (<audio>) and video playback (<video>) natively without third-party plugins.',
    hinglish: '<audio> aur <video> HTML5 ke native multimedia players hain jinke liye Flash player ki zaroorat nahi hoti. "controls" attribute se play/pause/volume buttons aate hain, "autoplay" se auto-start hota hai (hamesha muted ke saath), aur "poster" attribute se video load hone se pehle cover thumbnail dikhta hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</audio> and </video>).',
    supportedAttributes: ['src', 'controls', 'autoplay', 'muted', 'loop', 'poster (video)', 'preload', 'playsinline'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>HTML5 Native Video &amp; Audio:</h3>
  
  <video controls width="400" poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" style="border-radius: 8px;">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>

  <div style="margin-top: 16px;">
    <audio controls style="width: 400px;">
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Always provide captions and transcripts using the <track> tag (WCAG 2.1 Level A requirement). Avoid unmuted autoplay.',
    seoRelevance: 'Video schema markup (VideoObject) and poster images allow videos to show up in Google Video Search carousels.',
    commonMistakes: [
      {
        mistake: 'Using autoplay without muted: <video autoplay>.',
        solution: 'Modern browsers block unmuted autoplay; always write <video autoplay muted playsinline>.',
        explanation: 'Browser autoplay policies require videos to be muted to start automatically.'
      }
    ],
    relatedElements: ['source', 'track', 'iframe'],
    interviewQuestions: [
      {
        question: 'Why will a video with autoplay attribute not start automatically in Chrome/Safari?',
        answer: 'Modern browser autoplay policies strictly forbid unmuted audio playback without prior user interaction. To autoplay, you must include the "muted" and "playsinline" attributes.',
        hinglishTip: 'Autoplay chalane ke liye hamesha "muted" attribute lagana anivarya hai.'
      }
    ],
    practiceExercise: {
      title: 'Embed Muted Autoplaying Video',
      prompt: 'Construct a <video> element with controls, muted, autoplay, and playsinline attributes.',
      starterCode: `<body>
  <!-- Build video tag -->
</body>`,
      solutionCode: `<body>
  <video src="clip.mp4" controls muted autoplay playsinline width="400"></video>
</body>`,
      hint: 'Include controls, muted, autoplay, and playsinline.'
    }
  },
  {
    id: 'track',
    name: '<track>',
    syntax: '<track kind="subtitles" src="subs_en.vtt" srclang="en" label="English" default>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Specifies timed text tracks (subtitles, captions, descriptions) for <audio> and <video>.',
    hinglish: '<track> tag video aur audio me subtitles, closed captions (CC), ya chapter markers add karne ke liye use hota hai. Yeh WebVTT (.vtt) file format use karta hai. Deaf (badhir) aur hearing-impaired users ke liye accessibility ka yeh sabse mahatvapurna tag hai.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['kind', 'src', 'srclang', 'label', 'default'],
    exampleCode: `<video controls width="400">
  <source src="lecture.mp4" type="video/mp4">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English" default>
  <track kind="captions" src="captions_hi.vtt" srclang="hi" label="Hindi (हिंदी)">
</video>`,
    accessibilityGuidance: 'Essential for accessibility (WCAG 1.2.2). Provides captions for deaf or hard-of-hearing users.',
    seoRelevance: 'Search engines index text inside WebVTT subtitle files to understand spoken video content.',
    commonMistakes: [
      {
        mistake: 'Using SRT subtitle format instead of WebVTT format.',
        solution: 'HTML5 <track> requires the WebVTT format (.vtt).',
        explanation: 'Browsers natively support WebVTT (.vtt), not legacy .srt files.'
      }
    ],
    relatedElements: ['video', 'audio'],
    interviewQuestions: [
      {
        question: 'What are the valid values for the "kind" attribute on a <track> tag?',
        answer: 'subtitles, captions, descriptions, chapters, and metadata.',
        hinglishTip: 'kind attribute me subtitles, captions, chapters, descriptions, ya metadata diya ja sakta hai.'
      }
    ],
    practiceExercise: {
      title: 'Add English Subtitles Track',
      prompt: 'Add an English subtitles <track> with kind="subtitles" and default attribute.',
      starterCode: `<video controls>
  <source src="vid.mp4" type="video/mp4">
  <!-- Add track here -->
</video>`,
      solutionCode: `<video controls>
  <source src="vid.mp4" type="video/mp4">
  <track kind="subtitles" src="sub_en.vtt" srclang="en" label="English" default>
</video>`,
      hint: 'Include kind="subtitles", src, srclang="en", label, and default.'
    }
  },
  {
    id: 'iframe',
    name: '<iframe>',
    syntax: '<iframe src="https://example.com" title="Frame Title" width="500" height="300" loading="lazy" sandbox="allow-scripts"></iframe>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Embeds another separate HTML document inside the current webpage.',
    hinglish: '<iframe> (inline frame) ek webpage ke andar doosre webpage ya interactive widget (jaise YouTube video, Google Maps, compiler preview) ko embed karta hai. Security ke liye "sandbox" attribute lagana zaroori hai aur accessibility ke liye "title" attribute anivarya hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</iframe>).',
    supportedAttributes: ['src', 'title', 'width', 'height', 'loading', 'sandbox', 'allow', 'allowfullscreen', 'referrerpolicy'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Embedded Interactive Sandbox:</h3>
  <iframe 
    srcdoc="<h2 style='font-family: sans-serif; color: #4f46e5;'>Inside Sandboxed IFrame!</h2><p style='font-family: sans-serif;'>Fully isolated from the parent document.</p>"
    title="Interactive Code Preview"
    width="100%" 
    height="180" 
    sandbox="allow-scripts"
    style="border: 2px solid #cbd5e1; border-radius: 8px;"
  ></iframe>
</body>
</html>`,
    accessibilityGuidance: 'The title attribute is mandatory for screen readers (e.g. title="Google Map of Bengaluru office").',
    seoRelevance: 'Search engine crawlers treat iframes as separate documents; content inside iframes generally does not rank for the host page.',
    commonMistakes: [
      {
        mistake: 'Leaving off the title attribute on <iframe>.',
        solution: 'Always give <iframe> a meaningful title attribute describing its contents.',
        explanation: 'Failing to include a title fails WCAG 4.1.2 accessibility audits.'
      },
      {
        mistake: 'Using iframes without sandbox for user-submitted code.',
        solution: 'Always apply sandbox="allow-scripts" to prevent parent window access or cookie theft.',
        explanation: 'Sandboxing prevents cross-site scripting (XSS) and frame-busting vulnerabilities.'
      }
    ],
    relatedElements: ['embed', 'object'],
    interviewQuestions: [
      {
        question: 'What does the "sandbox" attribute on an <iframe> do?',
        answer: 'It restricts the iframe capabilities: disables scripts, prevents form submission, blocks popups, isolates cookies/localStorage, and forbids parent-window navigation unless explicitly re-enabled via tokens like allow-scripts.',
        hinglishTip: 'sandbox attribute iframe ko lock down kar deta hai taaki malicious code parent page ko hack na kar sake.'
      }
    ],
    practiceExercise: {
      title: 'Embed Sandboxed Iframe',
      prompt: 'Construct an <iframe> with a title, width, height, and sandbox="allow-scripts".',
      starterCode: `<body>
  <!-- Add iframe -->
</body>`,
      solutionCode: `<body>
  <iframe src="https://example.com" title="Documentation Preview" width="600" height="400" sandbox="allow-scripts"></iframe>
</body>`,
      hint: 'Include src, title, and sandbox attributes.'
    }
  },
  {
    id: 'embed-object',
    name: '<embed> & <object>',
    syntax: '<embed src="file.pdf" type="application/pdf"> and <object data="doc.pdf" type="application/pdf">Fallback</object>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Embeds external applications, PDFs, Flash/plugins (<embed>), and multimedia objects with fallback content (<object>).',
    hinglish: '<embed> aur <object> external multimedia documents (jaise PDF files, SVG vector graphics, audio/video players) ko embed karne ke liye use hote hain. <object> zyada powerful hai kyunki agar browser file display na kar paaye, toh uske andar likha fallback text ya link display hota hai. <embed> void element hai aur iska koi fallback content nahi hota.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: '<embed> is void (no closing tag); <object> requires </object>.',
    supportedAttributes: ['src (for embed)', 'data (for object)', 'type', 'width', 'height', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Embedded PDF with Fallback:</h3>
  <object data="sample.pdf" type="application/pdf" width="100%" height="200" style="border: 1px solid #ccc; border-radius: 8px;">
    <p style="padding: 16px; color: #475569;">
      Your browser does not have a PDF plugin. <a href="sample.pdf" style="color: #4f46e5; font-weight: bold;">Click here to download the PDF</a>.
    </p>
  </object>
</body>
</html>`,
    accessibilityGuidance: '<object> allows accessible fallback text inside it if the plugin or media fails to render.',
    seoRelevance: 'Allows search bots to discover and index linked PDF documents.',
    commonMistakes: [
      {
        mistake: 'Using <embed> instead of <object> when fallback content is required.',
        solution: 'Use <object> if you want to provide a fallback link when plugins are disabled.',
        explanation: '<embed> cannot contain fallback child elements.'
      }
    ],
    relatedElements: ['iframe', 'canvas'],
    interviewQuestions: [
      {
        question: 'What is the main advantage of <object> over <embed>?',
        answer: '<object> can contain fallback HTML content (such as download links) that displays if the browser cannot render the embedded resource, whereas <embed> has no fallback mechanism.',
        hinglishTip: '<object> ke andar fallback content de sakte hain agar file open na ho sake.'
      }
    ],
    practiceExercise: {
      title: 'Embed PDF with Object Fallback',
      prompt: 'Create an <object> tag referencing "report.pdf" with fallback text.',
      starterCode: `<body>
  <!-- Create object tag -->
</body>`,
      solutionCode: `<body>
  <object data="report.pdf" type="application/pdf" width="600" height="400">
    <p>PDF plugin not available. <a href="report.pdf">Download file</a>.</p>
  </object>
</body>`,
      hint: 'Include data="report.pdf" and fallback paragraph inside <object>.'
    }
  },
  {
    id: 'figure-figcaption',
    name: '<figure> & <figcaption>',
    syntax: '<figure><img src="graph.png" alt="..."><figcaption>Figure 1: BFS Traversal</figcaption></figure>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Represents self-contained content (<figure>), optionally with a caption (<figcaption>).',
    hinglish: '<figure> tag kisi photo, chart, diagram, code snippet, ya table ko ek self-contained visual unit me bind karta hai. Aur <figcaption> us figure ka title ya caption hota hai (jaise "Figure 1.1: Binary Tree Structure"). Screen readers caption ko image ke saath jod kar announce karte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <figure style="margin: 0; max-width: 450px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <img 
      src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500" 
      alt="Matrix of glowing digital code" 
      style="width: 100%; border-radius: 8px;"
    >
    <figcaption style="margin-top: 10px; font-size: 13px; color: #64748b; text-align: center; font-style: italic;">
      Figure 1.1: Machine code instruction matrix in high-performance computing.
    </figcaption>
  </figure>
</body>
</html>`,
    accessibilityGuidance: '<figcaption> automatically provides the accessible label for the entire <figure> landmark.',
    seoRelevance: 'Directly associates image entities with descriptive captions in Google Image search graph.',
    commonMistakes: [
      {
        mistake: 'Placing <figcaption> outside of <figure>.',
        solution: '<figcaption> MUST be the first or last child inside <figure>.',
        explanation: '<figcaption> is only valid directly inside <figure>.'
      }
    ],
    relatedElements: ['img', 'picture'],
    interviewQuestions: [
      {
        question: 'Can <figure> contain elements other than <img>?',
        answer: 'Yes! A <figure> can contain code snippets (<pre><code>), statistical tables, quotes, audio players, or charts, paired with a <figcaption>.',
        hinglishTip: '<figure> me sirf images nahi, code snippets ya data tables bhi aa sakti hain.'
      }
    ],
    practiceExercise: {
      title: 'Wrap Code Snippet in Figure with Figcaption',
      prompt: 'Construct a <figure> containing a <pre><code> block and a <figcaption>.',
      starterCode: `<body>
  <!-- Build figure with figcaption -->
</body>`,
      solutionCode: `<body>
  <figure>
    <pre><code>const a = 10;</code></pre>
    <figcaption>Listing 1: Variable Declaration</figcaption>
  </figure>
</body>`,
      hint: 'Include <figure>, <pre><code>, and <figcaption>.'
    }
  },
  {
    id: 'map-area',
    name: '<map> & <area>',
    syntax: '<map name="infographic"><area shape="rect" coords="0,0,100,100" href="#part1" alt="Part 1"></map>',
    category: 'links-media',
    categoryLabel: 'Links & Media',
    shortDesc: 'Defines an image map with clickable geometric sub-areas (<area>).',
    hinglish: '<map> aur <area> ek single image ke alag-alag hisson ko clickable links banane ke liye use hote hain (Image Map). Jaise ek world map image me har country par click karne par alag link khule. <map name="xyz"> ko <img usemap="#xyz"> ke saath connect karte hain.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: '<map> requires </map>; <area> is a void element.',
    supportedAttributes: ['shape', 'coords', 'href', 'alt (mandatory on area)', 'target', 'name (on map)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Clickable Image Map</h3>
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" 
    alt="Work desk with laptop and coffee" 
    usemap="#deskmap" 
    width="400" 
    height="250"
    style="border-radius: 8px;"
  >

  <map name="deskmap">
    <!-- Clickable rectangle area over the laptop screen -->
    <area shape="rect" coords="50,50,250,200" href="#laptop" alt="Laptop Computer" title="Laptop">
    <!-- Clickable circle area over the coffee cup -->
    <area shape="circle" coords="320,150,40" href="#coffee" alt="Coffee Cup" title="Coffee Cup">
  </map>
</body>
</html>`,
    accessibilityGuidance: 'The alt attribute on each <area> is mandatory for screen readers to announce where each clickable zone leads.',
    seoRelevance: 'Allows search crawlers to follow multiple links originating from a single graphic.',
    commonMistakes: [
      {
        mistake: 'Forgetting the "#" in the <img> usemap attribute: <img usemap="deskmap">.',
        solution: 'Always prefix with hash: <img usemap="#deskmap">.',
        explanation: 'usemap requires a fragment identifier referencing the <map name="...">.'
      }
    ],
    relatedElements: ['img', 'a'],
    interviewQuestions: [
      {
        question: 'What shapes does the <area> element support?',
        answer: 'rect (rectangle), circle, poly (polygon), and default (the entire region).',
        hinglishTip: '<area shape="..."> me rect, circle, aur poly (polygon) shapes support hoti hain.'
      }
    ],
    practiceExercise: {
      title: 'Define Circular Clickable Area',
      prompt: 'Create an <area> tag with shape="circle", coords="100,100,50", href="#center", and alt="Center".',
      starterCode: `<map name="diagram">
  <!-- Add circle area -->
</map>`,
      solutionCode: `<map name="diagram">
  <area shape="circle" coords="100,100,50" href="#center" alt="Center">
</map>`,
      hint: 'Include shape="circle", coords, href, and alt.'
    }
  },

  // =========================================================================
  // GRAPHICS & WEB COMPONENTS
  // =========================================================================
  {
    id: 'canvas',
    name: '<canvas>',
    syntax: '<canvas id="myCanvas" width="400" height="200"></canvas>',
    category: 'graphics-svg',
    categoryLabel: 'HTML Graphics & SVG',
    shortDesc: 'A resolution-dependent bitmap canvas used for script-driven 2D/3D graphics, games, and data visualizations.',
    hinglish: '<canvas> ek khali drawing board hai jispar JavaScript ke zariye dynamically 2D charts, animations, games, ya 3D WebGL graphics draw kiye jaate hain. Yeh pixel-based (bitmap) hota hai, isliye resize karne par rasterize hota hai.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</canvas>).',
    supportedAttributes: ['width', 'height', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Dynamic Canvas 2D Drawing:</h3>
  <canvas id="dsaCanvas" width="360" height="120" style="background: #0f172a; border-radius: 8px;"></canvas>

  <script>
    const canvas = document.getElementById('dsaCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw animated sorting bar representation
    const heights = [40, 80, 25, 95, 60, 45, 75, 110];
    heights.forEach((h, i) => {
      ctx.fillStyle = i === 3 ? '#ef4444' : '#6366f1';
      ctx.fillRect(20 + i * 40, 120 - h, 28, h);
    });
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px sans-serif';
    ctx.fillText('Sorting Bars Rendered via Canvas 2D', 20, 20);
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Content drawn on a canvas has zero accessibility by default. Always provide fallback text inside <canvas>Fallback</canvas> and mirror state using ARIA live regions.',
    seoRelevance: 'Search engines cannot read text rendered directly into canvas pixel buffers.',
    commonMistakes: [
      {
        mistake: 'Setting canvas dimensions with CSS (width: 400px) instead of HTML attributes (width="400").',
        solution: 'Set width and height as attributes on <canvas>, or coordinate space will stretch and blur.',
        explanation: 'CSS scales the bitmap canvas like an image, causing blurry graphics.'
      }
    ],
    relatedElements: ['svg', 'script'],
    interviewQuestions: [
      {
        question: 'What is the key difference between <canvas> and <svg>?',
        answer: '<canvas> is pixel-based (raster), script-driven (imperative), and faster for millions of particles/games with high redraw rates. <svg> is vector-based (declarative XML), resolution-independent, preserves DOM nodes, and supports CSS styling and event listeners directly on shapes.',
        hinglishTip: 'Interviewers ask this constantly! Canvas = pixel-based, fast for games; SVG = vector-based, crisp on zoom, DOM nodes.'
      }
    ],
    practiceExercise: {
      title: 'Initialize HTML Canvas',
      prompt: 'Create a <canvas> element with id="game", width="500", and height="300" with fallback text.',
      starterCode: `<body>
  <!-- Create canvas with fallback -->
</body>`,
      solutionCode: `<body>
  <canvas id="game" width="500" height="300">
    Your browser does not support canvas graphics.
  </canvas>
</body>`,
      hint: 'Include width, height, and fallback text inside <canvas>.'
    }
  },
  {
    id: 'svg',
    name: '<svg>',
    syntax: '<svg viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="40" fill="indigo"/></svg>',
    category: 'graphics-svg',
    categoryLabel: 'HTML Graphics & SVG',
    shortDesc: 'Embeds Scalable Vector Graphics directly into HTML with crisp mathematical resolution at any scale.',
    hinglish: '<svg> (Scalable Vector Graphics) mathematical formulas aur vectors par based graphics banata hai jo kitna bhi zoom karne par KABHI BLUR NAHI HOTE. Iske andar shapes jaise <circle>, <rect>, <path>, <line> aate hain jinpar directly CSS aur JavaScript hover/click effects lagaye ja sakte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</svg>).',
    supportedAttributes: ['viewBox', 'width', 'height', 'xmlns', 'fill', 'stroke'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Inline Scalable Vector Graphics (&lt;svg&gt;):</h3>
  <svg width="280" height="100" viewBox="0 0 280 100" style="background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <!-- Node 1 -->
    <circle cx="50" cy="50" r="24" fill="#4f46e5" />
    <text x="50" y="55" fill="white" font-size="14" font-weight="bold" text-anchor="middle">10</text>
    
    <!-- Directed Edge Arrow -->
    <line x1="74" y1="50" x2="166" y2="50" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4" />
    
    <!-- Node 2 -->
    <circle cx="190" cy="50" r="24" fill="#10b981" />
    <text x="190" y="55" fill="white" font-size="14" font-weight="bold" text-anchor="middle">20</text>
  </svg>
  <p style="font-size: 13px; color: #64748b;">A Linked List node pair rendered with crisp vector &lt;svg&gt; elements!</p>
</body>
</html>`,
    accessibilityGuidance: 'Add role="img" and an inner <title> tag (e.g. <svg role="img"><title>Linked list diagram</title>...</svg>) for screen readers.',
    seoRelevance: 'Inline SVGs reduce HTTP image requests and their text content is indexed by Google.',
    commonMistakes: [
      {
        mistake: 'Omitting the viewBox attribute on <svg>.',
        solution: 'Always define viewBox="0 0 width height" for responsive vector scaling.',
        explanation: 'Without viewBox, the SVG cannot scale responsively with CSS.'
      }
    ],
    relatedElements: ['canvas', 'img'],
    interviewQuestions: [
      {
        question: 'Why is viewBox the most important attribute on an <svg>?',
        answer: 'viewBox defines the internal coordinate system and aspect ratio of the vector canvas. It allows the SVG to scale up or down to any container size cleanly without clipping.',
        hinglishTip: 'viewBox SVG ka coordinate system define karta hai jisse SVG responsive ban jata hai.'
      }
    ],
    practiceExercise: {
      title: 'Draw SVG Circle with Fill',
      prompt: 'Create an <svg> element with viewBox="0 0 100 100" containing a blue <circle>.',
      starterCode: `<body>
  <!-- Create SVG circle -->
</body>`,
      solutionCode: `<body>
  <svg viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="#2563eb" />
  </svg>
</body>`,
      hint: 'Include <circle cx="50" cy="50" r="40" fill="..."> inside <svg>.'
    }
  },
  {
    id: 'math',
    name: '<math>',
    syntax: '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></math>',
    category: 'graphics-svg',
    categoryLabel: 'HTML Graphics & SVG',
    shortDesc: 'The top-level container element for mathematical formulas written in MathML.',
    hinglish: '<math> tag webpage par complex mathematical equations aur formulas ko high quality aur accessible tarike se render karne ke liye use hota hai (MathML standard). Modern browsers bina kisi external library (jaise MathJax) ke native MathML equations render kar sakte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</math>).',
    supportedAttributes: ['display', 'xmlns'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; font-size: 20px;">
  <h3>Native MathML Equation:</h3>
  <math display="block">
    <mrow>
      <mi>x</mi>
      <mo>=</mo>
      <mfrac>
        <mrow>
          <mo>&minus;</mo>
          <mi>b</mi>
          <mo>&plusmn;</mo>
          <msqrt>
            <mrow>
              <msup><mi>b</mi><mn>2</mn></msup>
              <mo>&minus;</mo>
              <mn>4</mn><mi>a</mi><mi>c</mi>
            </mrow>
          </msqrt>
        </mrow>
        <mrow>
          <mn>2</mn><mi>a</mi>
        </mrow>
      </mfrac>
    </mrow>
  </math>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers with MathML support can navigate mathematical expressions term-by-term and fraction-by-fraction.',
    seoRelevance: 'Allows scientific search engines to parse mathematical theorems and equations.',
    commonMistakes: [
      {
        mistake: 'Using screenshots/images of equations instead of <math>.',
        solution: 'Use native <math> or SVG so formulas scale crisply and remain accessible.',
        explanation: 'Images of formulas are blurry on retina screens and inaccessible.'
      }
    ],
    relatedElements: ['svg', 'sub', 'sup'],
    interviewQuestions: [
      {
        question: 'Is MathML natively supported in all modern browsers in 2026?',
        answer: 'Yes! MathML Core is natively supported in Chrome, Edge, Firefox, and Safari without needing polyfills.',
        hinglishTip: 'MathML ab sabhi modern browsers me natively supported hai bina MathJax ke.'
      }
    ],
    practiceExercise: {
      title: 'Render Quadratic Variable in MathML',
      prompt: 'Construct a <math> tag containing <msup><mi>x</mi><mn>2</mn></msup>.',
      starterCode: `<body>
  <!-- Create math tag -->
</body>`,
      solutionCode: `<body>
  <math>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
  </math>
</body>`,
      hint: 'Nest <msup> with <mi> and <mn> inside <math>.'
    }
  },
  {
    id: 'template-slot',
    name: '<template> & <slot>',
    syntax: '<template id="card-template">...</template> and <slot name="header"></slot>',
    category: 'html-apis',
    categoryLabel: 'HTML APIs & Scripts',
    shortDesc: 'Web Components foundations: client-side fragment storage (<template>) and Shadow DOM injection placeholders (<slot>).',
    hinglish: '<template> tag HTML code ka aisa tukda hota hai jo page load hone par screen par render NAHI hota aur scripts execute nahi karta. JavaScript se isko clone karke bar-bar DOM me stamp kiya ja sakta hai (jaise product cards ki list). <slot> Web Components ke Shadow DOM me placeholder banata hai jahan user apna content inject kar sake.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['id (on template)', 'name (on slot)', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>HTML5 Template Cloning Demo</h3>
  <button id="add-btn" style="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
    Clone New Card from &lt;template&gt;
  </button>
  
  <div id="card-container" style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px;"></div>

  <!-- Reusable inert template -->
  <template id="card-tmpl">
    <div style="background: #eef2ff; border: 1px solid #c7d2fe; padding: 12px 18px; border-radius: 8px; width: 180px;">
      <h4 style="margin: 0; color: #3730a3;">Dynamic Card</h4>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #4338ca;">Created via template cloning!</p>
    </div>
  </template>

  <script>
    const btn = document.getElementById('add-btn');
    const container = document.getElementById('card-container');
    const tmpl = document.getElementById('card-tmpl');

    btn.addEventListener('click', () => {
      // Clone inert template content
      const clone = tmpl.content.cloneNode(true);
      container.appendChild(clone);
    });
  </script>
</body>
</html>`,
    accessibilityGuidance: 'Templates are inert and hidden from the accessibility tree until cloned and inserted into the active DOM.',
    seoRelevance: 'Search engines recognize <template> as inert reusable blueprint markup.',
    commonMistakes: [
      {
        mistake: 'Expecting images or scripts inside <template> to download or run on page load.',
        solution: 'Understand that <template> is completely inert until cloned into active DOM with JavaScript.',
        explanation: 'Browsers parse template syntax but do not fetch resources or execute scripts.'
      }
    ],
    relatedElements: ['script', 'div'],
    interviewQuestions: [
      {
        question: 'What does it mean that content inside <template> is "inert"?',
        answer: 'It means the HTML is parsed and validated, but images are not loaded, media does not play, scripts do not execute, and elements do not render in the visual DOM until cloned via template.content.cloneNode(true).',
        hinglishTip: '<template> ka content tab tak execute nahi hota jab tak aap JS se clone karke DOM me na dalein.'
      }
    ],
    practiceExercise: {
      title: 'Define Inert Template Fragment',
      prompt: 'Construct a <template> tag with an id of "item-template" containing an <li> with a span.',
      starterCode: `<body>
  <!-- Create template -->
</body>`,
      solutionCode: `<body>
  <template id="item-template">
    <li><span class="item-name"></span></li>
  </template>
</body>`,
      hint: 'Include <template id="item-template"><li><span></span></li></template>.'
    }
  }
];
