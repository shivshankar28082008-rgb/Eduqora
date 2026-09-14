import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  RotateCcw, 
  Terminal, 
  AlertTriangle, 
  Table, 
  Eye, 
  Maximize2, 
  Minimize2, 
  CheckCircle2,
  PanelRight,
  PanelBottom,
  PanelLeft,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { ConsoleOutputMessage } from '../types';

export type PreviewThemeMode = 'auto' | 'dark' | 'light';
export type PreviewLayoutMode = 'split-right' | 'split-bottom' | 'split-left' | 'preview-full' | 'editor-full';

interface LivePreviewProps {
  compiledHtml?: string;
  executionKey?: string;
  sqlResult?: {
    columns: string[];
    rows: any[];
  };
  consoleMessages: ConsoleOutputMessage[];
  onClearConsole: () => void;
  language?: string;
  onRefresh?: () => void;
  autoRun?: boolean;
  layoutMode?: PreviewLayoutMode;
  onLayoutModeChange?: (mode: PreviewLayoutMode) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  compiledHtml,
  executionKey,
  sqlResult,
  consoleMessages,
  onClearConsole,
  language = 'html',
  onRefresh,
  layoutMode = 'split-right',
  onLayoutModeChange,
}) => {
  const isWebLang = language === 'html' || language === 'css' || language === 'javascript';
  const [activeTab, setActiveTab] = useState<'preview' | 'console' | 'sql' | 'errors'>(() => {
    if (language === 'sql') return 'sql';
    if (!isWebLang) return 'console';
    return 'preview';
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // App Theme Tracker (observes .dark on html tag)
  const [isAppDark, setIsAppDark] = useState<boolean>(() => 
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const checkDark = () => setIsAppDark(document.documentElement.classList.contains('dark'));
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Preview color theme setting (auto | dark | light)
  const [previewTheme, setPreviewTheme] = useState<PreviewThemeMode>(() => {
    try {
      const saved = localStorage.getItem('eduqora-preview-color-mode');
      if (saved === 'auto' || saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return 'auto';
  });

  const handlePreviewThemeChange = (mode: PreviewThemeMode) => {
    setPreviewTheme(mode);
    try {
      localStorage.setItem('eduqora-preview-color-mode', mode);
    } catch {}
  };

  const isDarkEffective = previewTheme === 'dark' || (previewTheme === 'auto' && isAppDark);

  // Switch to SQL tab automatically if SQL results arrive or if language is sql
  useEffect(() => {
    if (language === 'sql') {
      setActiveTab('sql');
    } else if (sqlResult && sqlResult.columns.length > 0) {
      setActiveTab('sql');
    } else if (!isWebLang) {
      setActiveTab('console');
    }
  }, [sqlResult, language, isWebLang]);

  // If new errors arrive, show indicator
  const errorCount = consoleMessages.filter(m => m.type === 'error').length;

  // Generate theme-injected HTML for the iframe
  const processedHtml = useMemo(() => {
    if (!compiledHtml) {
      return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px 20px; color: ${isDarkEffective ? '#94a3b8' : '#64748b'}; background-color: ${isDarkEffective ? '#0b0f19' : '#ffffff'}; min-height: 100vh; margin: 0; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <div style="width: 44px; height: 44px; border-radius: 12px; background-color: ${isDarkEffective ? '#1e293b' : '#f1f5f9'}; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 20px;">⚡</div>
        <div style="font-size: 15px; font-weight: 700; margin-bottom: 6px; color: ${isDarkEffective ? '#f1f5f9' : '#0f172a'};">Live Preview Sandbox</div>
        <p style="font-size: 13px; margin: 0; max-width: 320px; line-height: 1.5; color: ${isDarkEffective ? '#94a3b8' : '#64748b'};">Click <strong style="color: #10b981;">▶ Run</strong> in the toolbar to execute your code and see results in real-time.</p>
      </body></html>`;
    }

    // Baseline theme stylesheet to ensure default tags (headings, body, forms, inputs) look right in dark/light mode
    const themeStyles = `
      <style id="eduqora-theme-sync">
        :root { 
          color-scheme: ${isDarkEffective ? 'dark' : 'light'}; 
        }
        body {
          background-color: ${isDarkEffective ? '#0b0f19' : '#ffffff'};
          color: ${isDarkEffective ? '#f1f5f9' : '#0f172a'};
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      </style>
    `;

    if (compiledHtml.includes('<head>')) {
      return compiledHtml.replace('<head>', `<head>\n${themeStyles}`);
    } else if (compiledHtml.includes('</head>')) {
      return compiledHtml.replace('</head>', `${themeStyles}\n</head>`);
    } else if (compiledHtml.includes('<body')) {
      return compiledHtml.replace(/<body([^>]*)>/, `<body$1>${themeStyles}`);
    } else {
      return themeStyles + compiledHtml;
    }
  }, [compiledHtml, isDarkEffective]);

  return (
    <div className={`flex flex-col w-full h-full rounded-xl border transition-colors duration-200 overflow-hidden shadow-xs ${
      isDarkEffective 
        ? 'bg-[#0b0f19] border-slate-800' 
        : 'bg-white border-slate-200'
    }`}>
      {/* Top Tabs & Control Bar */}
      <div className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 border-b text-xs gap-1.5 select-none overflow-x-auto no-scrollbar shrink-0 ${
        isDarkEffective 
          ? 'bg-[#070a12] border-slate-800 text-slate-300' 
          : 'bg-slate-100 border-slate-200 text-slate-700'
      }`}>
        {/* Left: View Tabs */}
        <div className="flex items-center gap-1 shrink-0 overflow-x-auto no-scrollbar">
          {language !== 'sql' && (
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span><span className="hidden sm:inline">Live </span>Preview</span>
            </button>
          )}

          {(language === 'sql' || sqlResult) && (
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap ${
                activeTab === 'sql'
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5 shrink-0" />
              <span>SQL{sqlResult?.rows ? ` (${sqlResult.rows.length})` : ''}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'console'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 shrink-0" />
            <span>{!isWebLang ? 'Terminal' : 'Console'}</span>
            {consoleMessages.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold">
                {consoleMessages.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('errors')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'errors'
                ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Errors</span>
            {errorCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {errorCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Actions, Theme Toggle & Position / Layout Selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Refresh Action */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              title="Refresh Preview Output"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {activeTab === 'console' && (
            <button
              onClick={onClearConsole}
              className="px-2 py-0.5 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition font-medium"
            >
              Clear
            </button>
          )}

          {/* PREVIEW COLOR MODE (Auto / Dark / Light) */}
          <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/90 p-0.5 rounded-lg text-[11px] border border-slate-300/40 dark:border-slate-700/50">
            <button
              onClick={() => handlePreviewThemeChange('auto')}
              className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition ${
                previewTheme === 'auto'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 font-semibold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Auto: Follows system / Eduqora theme"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden md:inline">Auto</span>
            </button>
            <button
              onClick={() => handlePreviewThemeChange('dark')}
              className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition ${
                previewTheme === 'dark'
                  ? 'bg-white dark:bg-slate-700 text-amber-500 dark:text-amber-400 font-semibold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Dark Mode Preview Canvas"
            >
              <Moon className="w-3 h-3" />
              <span className="hidden md:inline">Dark</span>
            </button>
            <button
              onClick={() => handlePreviewThemeChange('light')}
              className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition ${
                previewTheme === 'light'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 font-semibold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Light Mode Preview Canvas"
            >
              <Sun className="w-3 h-3" />
              <span className="hidden md:inline">Light</span>
            </button>
          </div>

          {/* RESULT PLACEMENT / POSITION SELECTOR (Hidden on small mobile screens to save space) */}
          {onLayoutModeChange && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800/90 p-0.5 rounded-lg border border-slate-300/40 dark:border-slate-700/50">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 pl-1.5 hidden xl:inline">
                Position:
              </span>

              {/* Right Side */}
              <button
                onClick={() => onLayoutModeChange('split-right')}
                className={`p-1 rounded-md transition flex items-center gap-1 ${
                  layoutMode === 'split-right'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Place Result on Right (Split Right)"
              >
                <PanelRight className="w-3.5 h-3.5" />
              </button>

              {/* Bottom Side */}
              <button
                onClick={() => onLayoutModeChange('split-bottom')}
                className={`p-1 rounded-md transition flex items-center gap-1 ${
                  layoutMode === 'split-bottom'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Place Result at Bottom (Split Bottom)"
              >
                <PanelBottom className="w-3.5 h-3.5" />
              </button>

              {/* Left Side */}
              <button
                onClick={() => onLayoutModeChange('split-left')}
                className={`p-1 rounded-md transition flex items-center gap-1 ${
                  layoutMode === 'split-left'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Place Result on Left (Split Left)"
              >
                <PanelLeft className="w-3.5 h-3.5" />
              </button>

              {/* Fullscreen / Maximize Preview */}
              <button
                onClick={() => onLayoutModeChange(layoutMode === 'preview-full' ? 'split-right' : 'preview-full')}
                className={`p-1 rounded-md transition flex items-center gap-1 ${
                  layoutMode === 'preview-full'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title={layoutMode === 'preview-full' ? 'Exit Full Preview (Return to Split)' : 'Maximize Result (Full Preview)'}
              >
                {layoutMode === 'preview-full' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Preview Workspace */}
      <div className={`flex-1 relative w-full h-full min-h-[260px] overflow-hidden transition-colors duration-200 ${
        isDarkEffective ? 'bg-[#0b0f19]' : 'bg-white'
      }`}>
        {/* TAB 1: HTML Live Iframe Preview */}
        {activeTab === 'preview' && (
          <iframe
            key={executionKey || 'eduqora-live-frame'}
            ref={iframeRef}
            srcDoc={processedHtml}
            sandbox="allow-scripts allow-modals"
            title="Eduqora Preview"
            className={`w-full h-full border-none transition-colors duration-200 ${
              isDarkEffective ? 'bg-[#0b0f19]' : 'bg-white'
            }`}
          />
        )}

        {/* TAB 2: SQL Table Grid */}
        {activeTab === 'sql' && (
          <div className="p-4 h-full overflow-auto font-mono text-xs">
            {sqlResult && sqlResult.columns.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{sqlResult.rows.length} row(s) returned • {sqlResult.columns.length} columns</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">● Execution Success</span>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                        {sqlResult.columns.map((col, i) => (
                          <th key={i} className="px-3.5 py-2.5 font-semibold text-xs whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {sqlResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          {sqlResult.columns.map((col, cIdx) => (
                            <td key={cIdx} className="px-3.5 py-2 whitespace-nowrap text-[13px]">
                              {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-slate-400 italic">NULL</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="py-8 px-4 text-center">
                <Table className="w-10 h-10 mx-auto mb-3 text-cyan-500 opacity-60" />
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Interactive SQL Database Engine</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5">
                  Write any standard SQL query (SELECT, INSERT, UPDATE, JOIN, GROUP BY) and click <strong className="text-emerald-500">▶ Run</strong> to view live tabular records.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 max-w-md mx-auto text-left">
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Pre-loaded Tables Available:
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-[11px] font-mono">students</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-mono">courses</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono">enrollments</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[11px] font-mono">employees</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Try: <code className="text-indigo-500 dark:text-indigo-400">SELECT * FROM students;</code>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Console Logs */}
        {activeTab === 'console' && (
          <div className="p-3 h-full overflow-y-auto font-mono text-xs space-y-1.5 bg-[#090d16] text-slate-200">
            {consoleMessages.length === 0 ? (
              <div className="py-12 text-center text-slate-600">
                <Terminal className="w-7 h-7 mx-auto mb-2 opacity-50" />
                <p>Console is clean. Outputs from console.log() or print() will appear here.</p>
              </div>
            ) : (
              consoleMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 p-2 rounded border text-xs leading-relaxed ${
                    msg.type === 'error'
                      ? 'bg-rose-950/30 border-rose-900/60 text-rose-300'
                      : msg.type === 'warn'
                      ? 'bg-amber-950/30 border-amber-900/60 text-amber-300'
                      : msg.type === 'success'
                      ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <span className="text-slate-500 select-none text-[10px] mt-0.5">[{msg.timestamp}]</span>
                  <span className="font-semibold select-none uppercase text-[10px] px-1 rounded bg-slate-800">
                    {msg.type}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap break-all">{msg.text}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Errors */}
        {activeTab === 'errors' && (
          <div className="p-4 h-full overflow-y-auto font-mono text-xs bg-[#090d16]">
            {errorCount === 0 ? (
              <div className="py-12 text-center text-emerald-500/80">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <p className="font-medium">No errors detected. Code passed execution checks.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {consoleMessages
                  .filter(m => m.type === 'error')
                  .map(err => (
                    <div
                      key={err.id}
                      className="p-3 bg-rose-950/40 border border-rose-900/80 rounded-lg text-rose-300 leading-relaxed"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 text-rose-400 font-semibold text-xs">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Diagnostic Error</span>
                        </div>
                        {err.file && (
                          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-rose-900/50 text-rose-200 border border-rose-800/60">
                            {err.file}{err.line ? `:${err.line}` : ''}
                          </span>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap font-mono text-xs">{err.text}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

