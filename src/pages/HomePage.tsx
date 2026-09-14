import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Layers, 
  Flame, 
  Compass, 
  Zap, 
  Laptop, 
  Database,
  Cpu,
  BookOpen
} from 'lucide-react';
import { LANGUAGES_DATA } from '../data/languagesData';
import { executionService } from '../services/executionService';
import { ConsoleOutputMessage } from '../types';
import { Logo } from '../components/Logo';
import { LanguageIcon } from '../components/LanguageIcon';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Hero interactive Code Lab preview state
  const [heroHtml, setHeroHtml] = useState(`<h1>Hello Eduqora</h1>
<p>Learn Code. Build Real Ideas.</p>
<button id="demoBtn" style="padding: 10px 18px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
  Start Learning
</button>

<script>
  document.getElementById("demoBtn").onclick = function() {
    this.innerText = "Welcome to Eduqora!";
    this.style.background = "#10b981";
  };
</script>`);
  const [heroCompiled, setHeroCompiled] = useState('');
  const [activeFileTab, setActiveFileTab] = useState('index.html');

  // Quick Code Lab section state
  const [quickLang, setQuickLang] = useState<'html' | 'javascript' | 'sql' | 'python'>('html');
  const [quickCode, setQuickCode] = useState(`<!-- Eduqora Fast HTML5 Canvas -->
<div style="text-align: center; padding: 24px; font-family: sans-serif;">
  <h2 style="color: #4338ca; margin-bottom: 8px;">Interactive Browser Lab</h2>
  <p style="color: #64748b; font-size: 14px;">Edit this markup and watch changes take effect instantly.</p>
  <button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;" onclick="alert('Eduqora Lab is live!')">
    Click for Event
  </button>
</div>`);
  const [quickPreview, setQuickPreview] = useState('');
  const [quickConsole, setQuickConsole] = useState<ConsoleOutputMessage[]>([]);

  useEffect(() => {
    // Initial compile of hero preview
    const bundled = executionService.bundleWebProject([
      { name: 'index.html', content: heroHtml }
    ]);
    setHeroCompiled(bundled.compiledHtml || '');

    // Initial compile of quick preview
    const quickBundled = executionService.bundleWebProject([
      { name: 'index.html', content: quickCode }
    ]);
    setQuickPreview(quickBundled.compiledHtml || '');
  }, []);

  const handleHeroRun = () => {
    const bundled = executionService.bundleWebProject([
      { name: 'index.html', content: heroHtml }
    ]);
    setHeroCompiled(bundled.compiledHtml || '');
  };

  const handleQuickRun = async () => {
    if (quickLang === 'html' || quickLang === 'javascript') {
      const codeToRun = quickLang === 'javascript' 
        ? `<script>
            try {
              ${quickCode}
            } catch(e) { console.error(e.message); }
          </script>`
        : quickCode;
      const bundled = executionService.bundleWebProject([
        { name: 'index.html', content: codeToRun }
      ]);
      setQuickPreview(bundled.compiledHtml || '');
    } else if (quickLang === 'sql') {
      const res = executionService.executeSql(quickCode);
      setQuickConsole(res.messages);
      if (res.sqlResult) {
        // format as HTML table for preview
        const cols = res.sqlResult.columns;
        const rows = res.sqlResult.rows;
        const htmlTable = `
          <div style="font-family: monospace; font-size: 13px; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; color: #0284c7;">SQL Query Result (${rows.length} rows):</h4>
            <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border-color: #cbd5e1;">
              <tr style="background: #f1f5f9; text-align: left;">
                ${cols.map(c => `<th>${c}</th>`).join('')}
              </tr>
              ${rows.map(r => `<tr>${cols.map(c => `<td>${r[c] !== null ? r[c] : 'NULL'}</td>`).join('')}</tr>`).join('')}
            </table>
          </div>
        `;
        setQuickPreview(htmlTable);
      }
    } else if (quickLang === 'python') {
      const res = await executionService.executePython(quickCode);
      setQuickConsole(res.messages);
      const outputHtml = `
        <div style="font-family: monospace; font-size: 13px; padding: 16px; background: #090d16; color: #38bdf8; height: 100%;">
          <p style="color: #64748b; margin: 0 0 10px 0;">$ python main.py</p>
          ${res.messages.map(m => `<div style="margin-bottom: 4px;">${m.text}</div>`).join('')}
        </div>
      `;
      setQuickPreview(outputHtml);
    }
  };

  const handleSwitchQuickLang = (lang: 'html' | 'javascript' | 'sql' | 'python') => {
    setQuickLang(lang);
    if (lang === 'html') {
      setQuickCode(`<h2>Hello Eduqora</h2>\n<p>HTML is the skeleton of the modern web.</p>\n<button onclick="alert('Running HTML!')">Run Action</button>`);
    } else if (lang === 'javascript') {
      setQuickCode(`// JavaScript ES6+ in Eduqora\nconst scores = [85, 92, 98, 79];\nconst average = scores.reduce((a, b) => a + b) / scores.length;\nconsole.log("Average score calculated:", average);\nalert("Calculated average: " + average);`);
    } else if (lang === 'sql') {
      setQuickCode(`SELECT id, name, track, xp FROM students WHERE xp > 1000 ORDER BY xp DESC;`);
    } else if (lang === 'python') {
      setQuickCode(`student = "Alex"\nxp = 1250\nprint(f"Learner {student} has achieved {xp} total XP on Eduqora!")\nprint("Skills unlocked: HTML, CSS, JavaScript, SQL")`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] dark:bg-[#090d16]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge with official logo */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Logo size={20} showText={false} />
                <span>Eduqora Coding Learning Lab</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Learn Code. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                  Build Real Ideas.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Learn programming concepts, understand practical examples, practice inside the browser, run your code, and build real projects — all in one focused learning space.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('#/learn')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Learning Free
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('#/code-lab')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <Code2 className="w-4 h-4 text-indigo-500" />
                  Open Code Lab
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 0 Setup Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Execution
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Curriculum
                </span>
              </div>
            </div>

            {/* Right: INTERACTIVE CODE LAB PREVIEW (Real IDE replica) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-[#090d16] shadow-2xl shadow-indigo-950/30 overflow-hidden">
                {/* IDE Window Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      Eduqora Code Lab Preview
                    </span>
                  </div>

                  <button
                    onClick={handleHeroRun}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold transition shadow-xs"
                    title="Execute code in sandbox"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run</span>
                  </button>
                </div>

                {/* Editor & File Explorer Split */}
                <div className="grid grid-cols-12 border-b border-slate-800 min-h-[220px]">
                  {/* File Explorer column */}
                  <div className="col-span-4 sm:col-span-3 bg-[#070b13] border-r border-slate-800 p-3 select-none">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Files</p>
                    <div className="space-y-1 text-xs font-mono">
                      <button 
                        onClick={() => setActiveFileTab('index.html')}
                        className={`w-full text-left px-2 py-1.5 rounded-lg transition flex items-center gap-2 ${
                          activeFileTab === 'index.html'
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <LanguageIcon id="html" size={14} />
                        <span className="truncate">index.html</span>
                      </button>
                      <button 
                        onClick={() => setActiveFileTab('styles.css')}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition flex items-center gap-2"
                      >
                        <LanguageIcon id="css" size={14} />
                        <span className="truncate">styles.css</span>
                      </button>
                      <button 
                        onClick={() => setActiveFileTab('script.js')}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition flex items-center gap-2"
                      >
                        <LanguageIcon id="javascript" size={14} />
                        <span className="truncate">script.js</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="col-span-8 sm:col-span-9 p-3 font-mono text-xs overflow-auto bg-[#0d121f]">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-slate-800">
                      <span>{activeFileTab}</span>
                      <span className="text-emerald-400">Live Editable</span>
                    </div>
                    <textarea
                      value={heroHtml}
                      onChange={e => setHeroHtml(e.target.value)}
                      spellCheck={false}
                      className="w-full h-36 bg-transparent text-slate-200 font-mono text-xs resize-none outline-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Bottom: LIVE PREVIEW output */}
                <div className="bg-slate-950 p-3">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800/80 text-[11px] font-mono text-slate-400">
                    <span className="uppercase font-bold tracking-wider text-slate-400">LIVE PREVIEW</span>
                    <span className="text-xs text-indigo-400">Active Sandbox</span>
                  </div>
                  <div className="h-28 bg-white rounded-lg overflow-hidden border border-slate-700">
                    <iframe
                      srcDoc={heroCompiled}
                      title="Hero Live Output"
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR LANGUAGES SECTION */}
      <section className="py-16 bg-white dark:bg-[#070a12] border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Choose Your Language
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                Start with the language you want to learn. Step-by-step tracks with practical examples.
              </p>
            </div>
            <button
              onClick={() => onNavigate('#/learn')}
              className="mt-4 md:mt-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5"
            >
              Explore all 9 tracks
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANGUAGES_DATA.slice(0, 6).map(lang => (
              <div
                key={lang.id}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-400/60 dark:hover:border-indigo-600/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      style={{ backgroundColor: `${lang.color}15`, borderColor: `${lang.color}30` }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform"
                    >
                      <LanguageIcon id={lang.id} size={28} />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${lang.badgeBg}`}>
                      {lang.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {lang.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {lang.shortDesc}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{lang.lessonCount} Structured Lessons</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onNavigate(`#/learn/${lang.id}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 font-semibold text-xs transition duration-150 flex items-center justify-center gap-2"
                  >
                    Start Learning
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK CODE LAB SECTION */}
      <section className="py-16 bg-[#f8fafc] dark:bg-[#090d16] border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Code. Run. Learn.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-2">
              Write code, run it instantly, and see the result without leaving Eduqora.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0d121f] shadow-xl overflow-hidden">
            {/* Quick Lab Toolbar */}
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-slate-100 dark:bg-[#090d16] border-b border-slate-200 dark:border-slate-800 gap-3">
              {/* Language Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(['html', 'javascript', 'sql', 'python'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleSwitchQuickLang(lang)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      quickLang === lang
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <LanguageIcon id={lang} size={14} />
                    <span>{lang === 'javascript' ? 'JavaScript' : lang === 'sql' ? 'SQL' : lang.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickRun}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs shadow-xs transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run Code</span>
                </button>

                <button
                  onClick={() => onNavigate('#/code-lab')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
                >
                  <span>Try it now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Split Editor and Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 min-h-[320px]">
              {/* Left Code Textarea */}
              <div className="p-4 bg-[#090d16] text-slate-100 font-mono text-xs flex flex-col justify-between">
                <textarea
                  value={quickCode}
                  onChange={e => setQuickCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-64 bg-transparent outline-none resize-none font-mono text-xs leading-relaxed"
                />
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                  Tip: Press Run or modify the query above to execute real logic.
                </div>
              </div>

              {/* Right Output View */}
              <div className="p-4 bg-white dark:bg-[#070b13] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>LIVE OUTPUT</span>
                    <span className="text-emerald-500 font-bold text-[11px]">Ready</span>
                  </div>
                  <div className="h-56 bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    <iframe
                      srcDoc={quickPreview}
                      title="Quick Code Lab Preview"
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => onNavigate('#/code-lab')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Open Full IDE with Multi-File Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY EDUQORA (4 feature cards) */}
      <section className="py-20 bg-white dark:bg-[#070a12] border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Eduqora?
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-2">
              Designed for modern learners who want clear explanations and direct execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Instant Browser Coding
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Run supported code without installing a development environment, SDKs, or local compilers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Bite-Sized Learning
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Understand concepts through simple explanations, syntax breakdowns, and practical live examples.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Project-Based Practice
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Turn individual concepts into real projects: portfolios, calculators, todo apps, and database tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Progress Tracking
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Track completed lessons, earn XP, maintain daily streaks, and store your projects securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (Timeline / Steps) */}
      <section className="py-20 bg-[#fafbfc] dark:bg-[#090d16] border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How Eduqora Works
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-2">
              From reading your first line of syntax to shipping an interactive web app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/20 font-mono mb-2">
                01
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Pick a Concept
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose HTML, CSS, JS, Python, or SQL. Read what the concept is and why it exists.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/20 font-mono mb-2">
                02
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Understand the Example
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Inspect practical code snippets with highlighted syntax and expected outputs.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/20 font-mono mb-2">
                03
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Practice & Run
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Edit code directly inside the live lesson editor. Run test cases and earn XP.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/20 font-mono mb-2">
                04
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Build a Project
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Launch Code Lab, initialize multiple files, write code, and download your deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50/50 dark:from-[#090d16] dark:to-[#0d1222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Start Building With Eduqora.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Learn the fundamentals. Practice your skills. Build something real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('#/learn')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition"
            >
              Start Learning Free
            </button>
            <button
              onClick={() => onNavigate('#/code-lab')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              Open Code Lab
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
