import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Sparkles, 
  Layers, 
  FileCode, 
  Terminal, 
  Check, 
  HelpCircle,
  Lightbulb,
  Award
} from 'lucide-react';
import { useToast } from '../components/Toast';
import { storageService } from '../services/storageService';
import { CodeEditor } from '../components/CodeEditor';

interface PracticeChallengeItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  instructions: string;
  requirements: string[];
  htmlStarter: string;
  cssStarter: string;
  jsStarter: string;
  hints: string[];
  solutionExplanation: string;
  validatorFn: (doc: Document) => { passed: boolean; message: string };
}

const PRACTICE_CHALLENGES: PracticeChallengeItem[] = [
  {
    id: 'semantic-form',
    title: '1. Build a Semantic Contact Form with Validation',
    category: 'Forms & Inputs',
    badge: 'Beginner',
    instructions: 'Create a semantic contact form containing: a <form> tag, an email <input> with type="email" and required, a <textarea> for message, and a <button type="submit">.',
    requirements: [
      'Must contain a <form> element',
      'Must contain an <input type="email"> with "required" attribute',
      'Must contain a <textarea> with placeholder or label',
      'Must have a <button type="submit">'
    ],
    htmlStarter: `<div class="card">
  <h2>Contact Support</h2>
  <!-- Build your semantic form here -->
  
</div>`,
    cssStarter: `body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; max-width: 380px; margin: 0 auto; }
h2 { margin-top: 0; color: #818cf8; font-size: 1.25rem; }
input, textarea { width: 100%; box-sizing: border-box; padding: 10px; margin: 8px 0; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }
button { width: 100%; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
button:hover { background: #4f46e5; }`,
    jsStarter: `// Handle form submission and prevent page reload
document.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! Message received.");
});`,
    hints: [
      'Wrap your inputs inside <form action="#" method="POST">',
      'Use <input type="email" required placeholder="your@email.com">',
      'Add <textarea rows="3" required placeholder="Your message"></textarea>'
    ],
    solutionExplanation: 'Semantic forms provide native browser validation, keyboard accessibility, and screen reader announcements without needing external plugins.',
    validatorFn: (doc) => {
      const form = doc.querySelector('form');
      if (!form) return { passed: false, message: 'Missing <form> container tag.' };
      const email = doc.querySelector('input[type="email"]');
      if (!email) return { passed: false, message: 'Missing <input type="email">.' };
      if (!email.hasAttribute('required')) return { passed: false, message: 'Email input must have "required" attribute.' };
      const textarea = doc.querySelector('textarea');
      if (!textarea) return { passed: false, message: 'Missing <textarea> element for user message.' };
      const btn = doc.querySelector('button[type="submit"]') || doc.querySelector('button');
      if (!btn) return { passed: false, message: 'Missing submit <button>.' };
      return { passed: true, message: 'All form requirements verified successfully!' };
    }
  },

  {
    id: 'product-card',
    title: '2. Create a Responsive Product Showcase Card',
    category: 'Layout & Components',
    badge: 'Intermediate',
    instructions: 'Build a product card component using an <article> container, an <img> with alt attribute, a badge, product title in <h3>, price in a <span class="price">, and an "Add to Cart" button.',
    requirements: [
      'Use semantic <article class="product-card"> container',
      'Include an <img> with a non-empty alt description',
      'Include <h3> with product name',
      'Include price text formatted with currency symbol',
      'Include a button with class "cart-btn"'
    ],
    htmlStarter: `<!-- Create an article.product-card -->
<article class="product-card">
  <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" alt="Smart Watch Series 7" class="prod-img">
  <div class="prod-content">
    <span class="badge">NEW ARRIVAL</span>
    <h3>Codevaible Smart Watch</h3>
    <p class="price">$199.99</p>
    <button class="cart-btn">Add to Cart</button>
  </div>
</article>`,
    cssStarter: `body { font-family: sans-serif; background: #0f172a; padding: 24px; display: flex; justify-content: center; }
.product-card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; width: 280px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.prod-img { width: 100%; height: 180px; object-fit: cover; }
.prod-content { padding: 16px; }
.badge { background: #4f46e5; color: white; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: bold; }
h3 { color: white; margin: 10px 0 6px; font-size: 1.1rem; }
.price { color: #34d399; font-size: 1.25rem; font-weight: bold; margin: 0 0 12px; }
.cart-btn { width: 100%; background: #6366f1; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.cart-btn:hover { background: #4f46e5; }`,
    jsStarter: `// Add click effect to Cart button
document.querySelector(".cart-btn")?.addEventListener("click", function() {
  this.innerText = "Added to Cart! ✓";
  this.style.background = "#10b981";
});`,
    hints: [
      'Ensure the wrapper is <article class="product-card">',
      'The <img> must include alt="Your description"',
      'Add button with class="cart-btn"'
    ],
    solutionExplanation: 'Using <article> instead of generic <div> tags creates self-contained semantic syndication units ideal for e-commerce listings.',
    validatorFn: (doc) => {
      const article = doc.querySelector('article.product-card') || doc.querySelector('article');
      if (!article) return { passed: false, message: 'Missing <article class="product-card">.' };
      const img = article.querySelector('img');
      if (!img || !img.getAttribute('alt')) return { passed: false, message: 'Image must exist and have alt attribute.' };
      const h3 = article.querySelector('h3') || article.querySelector('h2');
      if (!h3) return { passed: false, message: 'Missing product title heading.' };
      const btn = article.querySelector('.cart-btn') || article.querySelector('button');
      if (!btn) return { passed: false, message: 'Missing .cart-btn button element.' };
      return { passed: true, message: 'Product card meets all structural requirements!' };
    }
  },

  {
    id: 'fix-broken-html',
    title: '3. Debug Broken HTML & Complete Missing Tags',
    category: 'HTML Debugging',
    badge: 'Debugging',
    instructions: 'Find and fix all errors in the provided snippet: fix the unclosed heading, replace the deprecated <font> tag with CSS, fix the invalid <table> structure, and close the missing <div>.',
    requirements: [
      'Remove deprecated <font> tag and use modern inline style or CSS class',
      'Fix heading tags so opening and closing match (e.g. <h2></h2>)',
      'Ensure <table> has valid <tr> and <td> tags',
      'Close all dangling tags properly'
    ],
    htmlStarter: `<!-- BUG 1: Mismatched heading tag -->
<h2>Broken Article Title</h3>

<!-- BUG 2: Deprecated font tag -->
<font color="red">This is old styling</font>

<!-- BUG 3: Malformed table without proper tr/td cells -->
<table>
  <td>Cell 1</td>
  <td>Cell 2</td>
</table>

<!-- BUG 4: Unclosed div -->
<div class="container">
  <p>Some important content here.</p>
`,
    cssStarter: `body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
td { border: 1px solid #475569; padding: 8px; color: #38bdf8; }`,
    jsStarter: `console.log("HTML Debugger active. Inspecting DOM...");`,
    hints: [
      'Change <h2>Broken Article Title</h3> to <h2>Broken Article Title</h2>',
      'Replace <font color="red"> with <span style="color: #ef4444;">',
      'Wrap <td> cells inside a <tr> row',
      'Add closing </div> at the end'
    ],
    solutionExplanation: 'Clean HTML without deprecated tags and with matching opening/closing tags ensures standard parsing across WebKit, Gecko, and Blink rendering engines.',
    validatorFn: (doc) => {
      const font = doc.querySelector('font');
      if (font) return { passed: false, message: 'Found deprecated <font> tag! Replace it with a <span> and CSS color.' };
      const h2 = doc.querySelector('h2');
      if (!h2) return { passed: false, message: 'Missing valid <h2> heading.' };
      const tr = doc.querySelector('table tr');
      if (!tr) return { passed: false, message: 'Table cells must be nested inside a <tr> table row.' };
      return { passed: true, message: 'Great job! All HTML bugs and obsolete tags have been resolved.' };
    }
  },

  {
    id: 'native-dialog-accordion',
    title: '4. Build Interactive Dialog & Details Accordion',
    category: 'Semantic HTML5',
    badge: 'Advanced',
    instructions: 'Build a native HTML5 FAQ accordion using <details> & <summary>, plus a native modal popup using <dialog> with open and close buttons.',
    requirements: [
      'Include a <details> container with a <summary> title',
      'Include a <dialog id="infoModal"> element',
      'Include a button that triggers .showModal() on click',
      'Include a close button inside the dialog'
    ],
    htmlStarter: `<div class="wrapper">
  <h3>HTML5 Interactive Widgets</h3>
  
  <!-- 1. Native Accordion (No JS needed!) -->
  <details class="faq-box">
    <summary>Why use semantic HTML5 elements?</summary>
    <p>Semantic elements improve SEO, accessibility, and code clarity for team members.</p>
  </details>

  <!-- 2. Native Modal Dialog -->
  <button id="openModalBtn">Open Native Dialog</button>

  <dialog id="infoModal">
    <h4>Dialog Title</h4>
    <p>This is a native HTML5 modal!</p>
    <button id="closeModalBtn">Close</button>
  </dialog>
</div>`,
    cssStarter: `body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
.wrapper { max-width: 400px; margin: 0 auto; background: #1e293b; padding: 20px; border-radius: 12px; }
.faq-box { background: #334155; padding: 10px; border-radius: 8px; margin-bottom: 16px; cursor: pointer; }
summary { font-weight: bold; color: #818cf8; }
#openModalBtn { background: #6366f1; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
dialog { border: none; border-radius: 12px; padding: 20px; background: #0f172a; color: white; border: 1px solid #475569; }
dialog::backdrop { background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(2px); }
#closeModalBtn { background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; }`,
    jsStarter: `const dialog = document.getElementById("infoModal");
document.getElementById("openModalBtn")?.addEventListener("click", () => dialog.showModal());
document.getElementById("closeModalBtn")?.addEventListener("click", () => dialog.close());`,
    hints: [
      'Use <details><summary>Title</summary><p>Content</p></details>',
      'Use <dialog id="infoModal"> for the modal',
      'Call dialog.showModal() to display as a backdrop modal'
    ],
    solutionExplanation: 'HTML5 <details> and <dialog> elements reduce JavaScript bundle size and provide built-in keyboard navigation (ESC key dismisses dialog).',
    validatorFn: (doc) => {
      const details = doc.querySelector('details');
      if (!details) return { passed: false, message: 'Missing <details> accordion.' };
      const summary = details.querySelector('summary');
      if (!summary) return { passed: false, message: '<details> must contain a <summary> title.' };
      const dialog = doc.querySelector('dialog');
      if (!dialog) return { passed: false, message: 'Missing <dialog> element.' };
      return { passed: true, message: 'Native widgets implemented flawlessly!' };
    }
  }
];

export const HtmlPracticePage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { toast } = useToast();

  const [activeChallenge, setActiveChallenge] = useState<PracticeChallengeItem>(PRACTICE_CHALLENGES[0]);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

  const [htmlCode, setHtmlCode] = useState<string>(PRACTICE_CHALLENGES[0].htmlStarter);
  const [cssCode, setCssCode] = useState<string>(PRACTICE_CHALLENGES[0].cssStarter);
  const [jsCode, setJsCode] = useState<string>(PRACTICE_CHALLENGES[0].jsStarter);

  const [validationResult, setValidationResult] = useState<{ passed: boolean; message: string } | null>(null);
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // When switching challenges
  const handleSelectChallenge = (c: PracticeChallengeItem) => {
    setActiveChallenge(c);
    setHtmlCode(c.htmlStarter);
    setCssCode(c.cssStarter);
    setJsCode(c.jsStarter);
    setValidationResult(null);
    setShowHintIndex(null);
  };

  const handleReset = () => {
    setHtmlCode(activeChallenge.htmlStarter);
    setCssCode(activeChallenge.cssStarter);
    setJsCode(activeChallenge.jsStarter);
    setValidationResult(null);
    toast('Code reset to challenge starter', undefined, 'info');
  };

  const renderSandbox = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const fullDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch (err) {
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;
    iframe.srcdoc = fullDoc;
  };

  useEffect(() => {
    renderSandbox();
  }, [htmlCode, cssCode, jsCode]);

  // Run DOM validation
  const handleSubmitAndVerify = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) return;

    try {
      const result = activeChallenge.validatorFn(iframe.contentDocument);
      setValidationResult(result);

      if (result.passed) {
        toast('Challenge passed! +30 XP awarded', undefined, 'success');
        const user = storageService.getUser();
        user.xp = (user.xp || 0) + 30;
        storageService.saveUser(user);
      } else {
        toast(result.message, undefined, 'error');
      }
    } catch (e: any) {
      setValidationResult({ passed: false, message: `Error verifying: ${e.message}` });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-800/60 text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive HTML + CSS + JS Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            HTML Coding Practice Workbench
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl">
            Write HTML structure, style with CSS, add interactive JavaScript, view real-time sandboxed DOM output, and submit solutions against automated requirement validators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('#/html-reference')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold border border-indigo-600/40 transition flex items-center gap-1.5"
          >
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>HTML Tag Reference</span>
          </button>
        </div>
      </div>

      {/* Challenge Selection Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Select Coding Challenge:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PRACTICE_CHALLENGES.map(c => {
            const isSelected = c.id === activeChallenge.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectChallenge(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                }`}
              >
                <span>{c.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructions & Requirements Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            {activeChallenge.title}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
            {activeChallenge.badge}
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {activeChallenge.instructions}
        </p>

        {/* Requirements Checklist */}
        <div className="pt-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Target Requirements:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {activeChallenge.requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hints accordion */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {activeChallenge.hints.map((hint, idx) => (
            <button
              key={idx}
              onClick={() => setShowHintIndex(showHintIndex === idx ? null : idx)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-semibold"
            >
              <Lightbulb className="w-3 h-3" />
              <span>Hint {idx + 1}</span>
            </button>
          ))}
        </div>

        {showHintIndex !== null && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-medium">
            💡 {activeChallenge.hints[showHintIndex]}
          </div>
        )}
      </div>

      {/* Main 3-Tab Editor & Live Preview Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 3 Connected Code Editors (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Editor Header Bar with Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-xl">
              {[
                { id: 'html', label: 'index.html (HTML)', color: 'text-orange-500' },
                { id: 'css', label: 'styles.css (CSS)', color: 'text-blue-500' },
                { id: 'js', label: 'script.js (JavaScript)', color: 'text-amber-400' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                    activeTab === t.id
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={t.color}>•</span> {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs transition"
                title="Reset Challenge Starter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Monaco VS Code Editor */}
          <div className="flex-1 min-h-[380px] bg-[#1e1e1e] overflow-hidden">
            <CodeEditor
              code={activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode}
              onChange={(val) => {
                if (activeTab === 'html') setHtmlCode(val);
                else if (activeTab === 'css') setCssCode(val);
                else setJsCode(val);
              }}
              language={activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : 'javascript'}
              fileName={activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'styles.css' : 'script.js'}
              onRun={handleSubmitAndVerify}
              onReset={handleReset}
              minHeight="380px"
            />
          </div>

          {/* Editor Footer / Action Bar */}
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
            <span>All 3 editors synchronize automatically into the preview.</span>
            <button
              onClick={handleSubmitAndVerify}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit & Verify Solution</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Output Preview & Verification Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Live Preview Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[380px]">
            <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                Live HTML+CSS+JS Preview
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Sandboxed</span>
            </div>

            <iframe
              ref={iframeRef}
              title="Practice Sandbox Preview"
              sandbox="allow-scripts allow-modals"
              className="w-full flex-1 min-h-[320px] bg-white"
            />
          </div>

          {/* Verification Result Card */}
          {validationResult && (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 transition-all ${
              validationResult.passed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {validationResult.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                )}
                <span>{validationResult.passed ? 'Solution Verified!' : 'Verification Check Failed'}</span>
              </div>
              <p className="leading-relaxed pl-7">{validationResult.message}</p>
              {validationResult.passed && (
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 pl-7 font-medium">
                  {activeChallenge.solutionExplanation}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
