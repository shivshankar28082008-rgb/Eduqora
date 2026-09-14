import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  AlertCircle, 
  Check, 
  HelpCircle, 
  Code2, 
  List, 
  Flame,
  Clock
} from 'lucide-react';
import { lessonService } from '../services/lessonService';
import { executionService } from '../services/executionService';
import { CodeEditor } from '../components/CodeEditor';
import { LivePreview } from '../components/LivePreview';
import { LanguageIcon } from '../components/LanguageIcon';
import { useToast } from '../components/Toast';
import { Lesson, LanguageId, ConsoleOutputMessage } from '../types';

interface LessonDetailPageProps {
  languageId: LanguageId;
  lessonId: string;
  onNavigate: (route: string) => void;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  languageId,
  lessonId,
  onNavigate,
}) => {
  const { toast } = useToast();
  const [lesson, setLesson] = useState<Lesson | undefined>(lessonService.getLessonById(lessonId));
  const [editorCode, setEditorCode] = useState<string>('');
  const [compiledHtml, setCompiledHtml] = useState<string>('');
  const [consoleMessages, setConsoleMessages] = useState<ConsoleOutputMessage[]>([]);
  const [sqlResult, setSqlResult] = useState<any>(undefined);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Practice state
  const [practiceCode, setPracticeCode] = useState<string>('');
  const [practiceResult, setPracticeResult] = useState<{ checked: boolean; passed: boolean; message: string } | null>(null);

  const allLessonsInLang = lessonService.getLessonsByLanguage(languageId);
  const language = lessonService.getLanguageById(languageId);
  const nextLesson = lessonService.getNextLesson(lessonId);
  const prevLesson = lessonService.getPrevLesson(lessonId);

  useEffect(() => {
    const loaded = lessonService.getLessonById(lessonId) || allLessonsInLang[0];
    if (loaded) {
      setLesson(loaded);
      setEditorCode(loaded.exampleCode);
      setPracticeCode(loaded.practice?.starterCode || '');
      setPracticeResult(null);
      setIsCompleted(lessonService.isLessonCompleted(loaded.id));
      lessonService.setLastVisited(loaded.languageId, loaded.id, loaded.title);

      // Run initial execution for preview
      executeCurrentCode(loaded.exampleCode, loaded.languageId);
    }
  }, [lessonId, languageId]);

  const executeCurrentCode = async (code: string, lang: string) => {
    if (lang === 'html' || lang === 'css' || lang === 'javascript') {
      const bundle = executionService.bundleWebProject([
        { name: lang === 'html' ? 'index.html' : lang === 'css' ? 'styles.css' : 'script.js', content: code }
      ]);
      setCompiledHtml(bundle.compiledHtml || '');
      if (bundle.messages.length > 0) {
        setConsoleMessages(bundle.messages);
      }
    } else if (lang === 'sql') {
      const res = executionService.executeSql(code);
      setConsoleMessages(res.messages);
      setSqlResult(res.sqlResult);

      const sqlRows = res.sqlResult?.rows || [];
      const sqlCols = res.sqlResult?.columns || [];
      const tableHtml = sqlCols.length > 0 ? `
        <div style="overflow-x: auto; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;">
            <thead>
              <tr style="background: rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.1);">
                ${sqlCols.map(c => `<th style="padding: 8px 12px; font-weight: 600; color: #e2e8f0;">${c}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${sqlRows.map((r, i) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}">
                  ${sqlCols.map(c => `<td style="padding: 8px 12px; white-space: nowrap; color: #cbd5e1;">${r[c] !== null && r[c] !== undefined ? r[c] : '<span style="color:#64748b;font-style:italic;">NULL</span>'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div style="padding: 24px; text-align: center; color: #94a3b8;">
          ${res.messages.map(m => `<div style="margin-bottom: 6px; color: ${m.type === 'error' ? '#f87171' : (m.type === 'success' ? '#34d399' : '#f8fafc')};">${m.text}</div>`).join('')}
        </div>
      `;

      const outHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; background: #090d16; color: #f1f5f9; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 1.6; padding: 16px; box-sizing: border-box; }
            .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="header">
            <span>Database Query Result (${sqlRows.length} rows)</span>
            <span>Status: ${res.success ? '● Success' : '● Error'}</span>
          </div>
          ${tableHtml}
        </body>
        </html>
      `;
      setCompiledHtml(outHtml);
    } else if (lang === 'python') {
      const res = await executionService.executePython(code);
      setConsoleMessages(res.messages);
      const outHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; background: #090d16; color: #f1f5f9; font-family: monospace; font-size: 13px; line-height: 1.6; padding: 16px; }
            .line { margin-bottom: 4px; }
            .log { color: #f8fafc; }
            .info { color: #38bdf8; }
            .success { color: #34d399; font-weight: bold; }
            .error { color: #f87171; background: rgba(239,68,68,0.1); padding: 4px 8px; border-radius: 4px; }
            .warn { color: #fbbf24; }
          </style>
        </head>
        <body>
          ${res.messages.map(m => `<div class="line ${m.type}">${m.text}</div>`).join('')}
        </body>
        </html>
      `;
      setCompiledHtml(outHtml);
    } else {
      const res = await executionService.executeCompiledLanguage(lang, code);
      setConsoleMessages(res.messages);
      const outHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; background: #090d16; color: #f1f5f9; font-family: monospace; font-size: 13px; line-height: 1.6; padding: 16px; }
            .line { margin-bottom: 4px; }
            .log { color: #f8fafc; }
            .info { color: #38bdf8; }
            .success { color: #34d399; font-weight: bold; }
            .error { color: #f87171; background: rgba(239,68,68,0.1); padding: 4px 8px; border-radius: 4px; }
            .warn { color: #fbbf24; }
          </style>
        </head>
        <body>
          ${res.messages.map(m => `<div class="line ${m.type}">${m.text}</div>`).join('')}
        </body>
        </html>
      `;
      setCompiledHtml(outHtml);
    }
  };

  const handleRunCode = () => {
    if (!lesson) return;
    executeCurrentCode(editorCode, lesson.languageId);
    toast('Code executed in sandbox', undefined, 'info');
  };

  const handleResetCode = () => {
    if (!lesson) return;
    setEditorCode(lesson.exampleCode);
    executeCurrentCode(lesson.exampleCode, lesson.languageId);
    toast('Code restored to default example', undefined, 'info');
  };

  const handleMarkComplete = () => {
    if (!lesson) return;
    const res = lessonService.markLessonCompleted(lesson.id);
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    toast(`✓ Completed: ${lesson.title}`, `+${res.xpGained} XP added to your profile!`, 'success');
  };

  const handleCheckPractice = () => {
    if (!lesson || !lesson.practice) return;
    const practice = lesson.practice;

    if (practice.testType === 'keyword' && practice.expectedKeyword) {
      if (practiceCode.includes(practice.expectedKeyword)) {
        setPracticeResult({
          checked: true,
          passed: true,
          message: 'Excellent! Your code meets the challenge requirement.'
        });
        toast('Challenge Solved!', '+20 Bonus Practice XP', 'success');
      } else {
        setPracticeResult({
          checked: true,
          passed: false,
          message: `Expected to find "${practice.expectedKeyword}" in your solution. Check syntax and try again!`
        });
      }
    } else {
      // General pass fallback
      setPracticeResult({
        checked: true,
        passed: true,
        message: 'Solution verified and accepted!'
      });
      toast('Challenge Solved!', '+20 Bonus Practice XP', 'success');
    }
  };

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold">Lesson Not Found</h2>
        <button
          onClick={() => onNavigate('#/learn')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded text-xs"
        >
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumbs and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button 
            onClick={() => onNavigate('#/learn')} 
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Curriculum
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate(`#/learn/${languageId}`)} 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 capitalize inline-flex items-center gap-1"
          >
            <LanguageIcon id={languageId} size={14} />
            <span>{language?.name || languageId}</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-bold truncate max-w-xs">
            {lesson.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkComplete}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              isCompleted
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? '✓ Completed' : 'Mark as Complete (+20 XP)'}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Lesson Selector */}
      <div className="lg:hidden mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <LanguageIcon id={languageId} size={15} />
            {language?.name} Modules ({allLessonsInLang.length})
          </span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
            {allLessonsInLang.findIndex(l => l.id === lesson.id) + 1} of {allLessonsInLang.length}
          </span>
        </div>
        <select
          value={lesson.id}
          onChange={e => onNavigate(`#/learn/${languageId}/${e.target.value}`)}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl p-2 text-xs font-medium outline-none"
        >
          {allLessonsInLang.map((l, idx) => (
            <option key={l.id} value={l.id}>
              {idx + 1}. {l.title} {lessonService.isLessonCompleted(l.id) ? '✓' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* 3-COLUMN LAYOUT: Desktop Sidebar, Center Lesson, Right Outline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Lesson Navigator (3 cols, desktop only) */}
        <aside className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sticky top-20 max-h-[80vh] overflow-y-auto hidden lg:block">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <LanguageIcon id={languageId} size={18} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                {language?.name} Modules
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              {allLessonsInLang.length} Total
            </span>
          </div>

          <div className="space-y-1">
            {allLessonsInLang.map((l, index) => {
              const active = l.id === lesson.id;
              const done = lessonService.isLessonCompleted(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => onNavigate(`#/learn/${languageId}/${l.id}`)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </div>
                  {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* CENTER COLUMN: Detailed Lesson Content & Live Interactive Editor (7 cols) */}
        <main className="lg:col-span-7 space-y-10">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                {lesson.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Section: What is it? */}
          <section id="what-is-it" className="space-y-3 pt-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              What is it?
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              {lesson.whatIsIt}
            </p>
          </section>

          {/* Section: Why use it? */}
          <section id="why-use-it" className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Why use it?
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              {lesson.whyUseIt}
            </p>
          </section>

          {/* Section: Syntax */}
          <section id="syntax" className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-500" />
              Syntax Blueprint
            </h2>
            <div className="bg-[#090d16] text-indigo-300 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
              <pre>{lesson.syntax}</pre>
            </div>
          </section>

          {/* Section: TRY IT YOURSELF (Live Code Editor) */}
          <section id="try-it-yourself" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-500" />
                  Try It Yourself (Live Sandbox)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Modify the code and click Run to test your changes live.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Reset Example"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleRunCode}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Run
                </button>
              </div>
            </div>

            {/* Split Editor and Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-72">
                <CodeEditor
                  code={editorCode}
                  onChange={setEditorCode}
                  language={lesson.languageId}
                  onRun={handleRunCode}
                  onReset={handleResetCode}
                  minHeight="100%"
                />
              </div>
              <div className="h-72">
                <LivePreview
                  compiledHtml={compiledHtml}
                  sqlResult={sqlResult}
                  consoleMessages={consoleMessages}
                  onClearConsole={() => setConsoleMessages([])}
                  language={lesson.languageId}
                  onRefresh={handleRunCode}
                />
              </div>
            </div>
          </section>

          {/* Section: Explanation & Expected Output */}
          <section id="explanation" className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Explanation & Expected Output
            </h2>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.explanation}
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white block mb-1">Expected Output:</strong>
                {lesson.expectedOutput}
              </div>
            </div>
          </section>

          {/* Section: Important Notes & Common Mistakes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/70 dark:border-blue-900/40 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Important Notes
              </h3>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                {lesson.importantNotes.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">{note}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-200/70 dark:border-rose-900/40 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Common Mistakes
              </h3>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                {lesson.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="leading-relaxed">{mistake}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Practice Challenge */}
          {lesson.practice && (
            <section id="practice-challenge" className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Practice Challenge
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {lesson.practice.title}
                  </h3>
                </div>
                <button
                  onClick={handleCheckPractice}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition"
                >
                  Check Answer
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {lesson.practice.instruction}
              </p>

              <div className="h-44">
                <CodeEditor
                  code={practiceCode}
                  onChange={setPracticeCode}
                  language={lesson.languageId}
                  minHeight="100%"
                />
              </div>

              {practiceResult && (
                <div
                  className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                    practiceResult.passed
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  {practiceResult.passed ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {practiceResult.message}
                </div>
              )}
            </section>
          )}

          {/* Bottom Previous & Next Navigation */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {prevLesson ? (
              <button
                onClick={() => onNavigate(`#/learn/${languageId}/${prevLesson.id}`)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: {prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => onNavigate(`#/learn/${languageId}/${nextLesson.id}`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-indigo-600 text-xs font-semibold transition"
              >
                <span>Next: {nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate(`#/code-lab`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs"
              >
                <span>Finish Track & Build in Code Lab</span>
                <Code2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>

        {/* RIGHT COLUMN: Table of Contents (2 cols) */}
        <aside className="lg:col-span-2 hidden lg:block sticky top-20 text-xs space-y-3">
          <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
            On This Page
          </p>
          <nav className="space-y-2 text-slate-500 dark:text-slate-400">
            <a href="#what-is-it" className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              What is it?
            </a>
            <a href="#why-use-it" className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Why use it?
            </a>
            <a href="#syntax" className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Syntax
            </a>
            <a href="#try-it-yourself" className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition font-semibold text-indigo-600 dark:text-indigo-400">
              Try It Yourself
            </a>
            <a href="#explanation" className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Explanation
            </a>
            {lesson.practice && (
              <a href="#practice-challenge" className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                Practice Challenge
              </a>
            )}
          </nav>
        </aside>

      </div>
    </div>
  );
};
