import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Terminal, 
  Sun, 
  Moon, 
  Code2, 
  Sparkles, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Split,
  Eye,
  Info,
  Clock
} from 'lucide-react';
import { useToast } from '../Toast';
import { setupMonacoIntellisense, attachInactivitySuggestTrigger } from '../../utils/intellisenseService';

export interface ConsoleLogItem {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
}

export interface HtmlLivePlaygroundProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  title?: string;
  onResetOriginal?: () => void;
  height?: string;
  className?: string;
  showSaveDraft?: boolean;
}

export const HtmlLivePlayground: React.FC<HtmlLivePlaygroundProps> = ({
  initialHtml = '<div class="card">\n  <h1 id="title">Hello Codevaible!</h1>\n  <p>Edit HTML, CSS, and JavaScript with live preview.</p>\n  <button id="changeBtn">Change Color</button>\n</div>',
  initialCss = `body {\n  font-family: Arial, sans-serif;\n  background: #f1f5f9;\n  padding: 30px;\n  margin: 0;\n}\n\n.card {\n  background: white;\n  padding: 24px;\n  border-radius: 14px;\n  max-width: 400px;\n  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);\n}\n\nh1 {\n  color: #2563eb;\n  margin-top: 0;\n}\n\nbutton {\n  background: #2563eb;\n  color: white;\n  padding: 10px 16px;\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: bold;\n}\n\nbutton:hover {\n  background: #1d4ed8;\n}`,
  initialJs = `// JavaScript interactive handler\nconst btn = document.getElementById("changeBtn");\nconst title = document.getElementById("title");\n\nif (btn && title) {\n  btn.addEventListener("click", () => {\n    title.style.color = "#16a34a";\n    title.textContent = "Color Changed to Green! ✨";\n    console.log("Button clicked! Title color updated to green.");\n  });\n}\n\nconsole.log("Codevaible Live Code Lab initialized successfully!");`,
  title = 'VS Code HTML/CSS/JS Code Lab',
  onResetOriginal,
  height = '560px',
  className = '',
}) => {
  const { toast } = useToast();

  // Active editor tab: HTML | CSS | JS
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

  // Code state for each tab
  const [htmlCode, setHtmlCode] = useState<string>(initialHtml);
  const [cssCode, setCssCode] = useState<string>(initialCss);
  const [jsCode, setJsCode] = useState<string>(initialJs);

  // Editor configuration state
  const [editorTheme, setEditorTheme] = useState<'codevaible-dark' | 'vs'>('codevaible-dark');
  const [fontSize, setFontSize] = useState<number>(13);
  const [autoRun, setAutoRun] = useState<boolean>(true);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [splitRatio, setSplitRatio] = useState<'50-50' | '60-40' | '40-60'>('50-50');

  // Console output panel
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLogItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  // Execution counter to trigger iframe reloads
  const [executionTimestamp, setExecutionTimestamp] = useState<number>(Date.now());
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const editorRef = useRef<any>(null);

  // Update code when initial props change
  useEffect(() => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    setJsCode(initialJs);
    setConsoleLogs([]);
    setExecutionTimestamp(Date.now());
  }, [initialHtml, initialCss, initialJs]);

  // Setup Monaco Custom VS Code Dark Theme before mount
  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('codevaible-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
        { token: 'tag', foreground: '4ec9b0', fontStyle: 'bold' },
        { token: 'tag.id', foreground: '9cdcfe' },
        { token: 'tag.class', foreground: '9cdcfe' },
        { token: 'attribute.name', foreground: '9cdcfe' },
        { token: 'attribute.value', foreground: 'ce9178' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'keyword', foreground: 'c586c0', fontStyle: 'bold' },
        { token: 'keyword.css', foreground: '569cd6' },
        { token: 'property.css', foreground: '9cdcfe' },
        { token: 'value.css', foreground: 'ce9178' },
        { token: 'selector.css', foreground: 'd7ba7d' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'variable', foreground: '9cdcfe' },
        { token: 'delimiter.bracket', foreground: 'ffd700' },
      ],
      colors: {
        'editor.background': '#181a20',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#222530',
        'editorLineNumber.foreground': '#636b7b',
        'editorLineNumber.activeForeground': '#a5b4fc',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#6366f1',
        'editorBracketMatch.background': '#0d5a94',
        'editorBracketMatch.border': '#6366f1',
        'editorGutter.background': '#181a20',
      },
    });

    // Register rich contextual IntelliSense completion providers
    setupMonacoIntellisense(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Attach 3-second typing-inactivity autocomplete trigger (resets on typing)
    const cleanupInactivity = attachInactivitySuggestTrigger(editor, 3000);
    editor.onDidDispose(() => {
      cleanupInactivity();
    });

    // Track cursor movements for the status bar
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({
        line: e.position.lineNumber,
        col: e.position.column,
      });
    });

    // Keybinding: Ctrl+Enter / Cmd+Enter to Run HTML/CSS/JS
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };

  // Listen to console messages dispatched from the sandboxed iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'codevaible-sandbox-console') {
        setConsoleLogs(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            type: event.data.type,
            message: event.data.message,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        if (event.data.type === 'error') {
          setShowConsole(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Compile combined document for live preview
  const compiledDocument = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* User CSS */
    ${cssCode}
  </style>
  <script>
    // Console Interceptor Bridge to Codevaible Playground
    (function() {
      function sendLog(type, args) {
        try {
          var serialized = Array.from(args).map(function(arg) {
            if (arg instanceof Error) return arg.stack || arg.message;
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
            }
            return String(arg);
          });
          window.parent.postMessage({
            source: 'codevaible-sandbox-console',
            type: type,
            message: serialized.join(' ')
          }, '*');
        } catch(e) {}
      }

      var origLog = console.log;
      var origInfo = console.info;
      var origWarn = console.warn;
      var origError = console.error;

      console.log = function() { origLog.apply(console, arguments); sendLog('log', arguments); };
      console.info = function() { origInfo.apply(console, arguments); sendLog('info', arguments); };
      console.warn = function() { origWarn.apply(console, arguments); sendLog('warn', arguments); };
      console.error = function() { origError.apply(console, arguments); sendLog('error', arguments); };

      window.onerror = function(message, source, lineno, colno, error) {
        sendLog('error', ['JavaScript Runtime Error: ' + message + ' (line ' + lineno + ')']);
        return false;
      };

      window.addEventListener('unhandledrejection', function(event) {
        sendLog('error', ['Unhandled Promise Rejection: ' + (event.reason ? event.reason.message || event.reason : 'Unknown')]);
      });
    })();
  </script>
</head>
<body>
  <!-- User HTML -->
  ${htmlCode}

  <!-- User JavaScript -->
  <script>
    try {
      ${jsCode}
    } catch(err) {
      console.error('Script Execution Error:', err);
    }
  </script>
</body>
</html>`;
  }, [htmlCode, cssCode, jsCode]);

  // Sync iframe srcdoc when execution timestamp changes
  const runCode = useCallback(() => {
    setIsExecuting(true);
    setConsoleLogs([]); // Clear previous runtime logs
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = compiledDocument;
    }
    setExecutionTimestamp(Date.now());
    setTimeout(() => setIsExecuting(false), 300);
    toast('Code executed in live preview', undefined, 'success');
  }, [compiledDocument, toast]);

  // Debounced auto-run when enabled
  useEffect(() => {
    if (!autoRun) return;

    const timer = setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.srcdoc = compiledDocument;
      }
      setExecutionTimestamp(Date.now());
    }, 800);

    return () => clearTimeout(timer);
  }, [compiledDocument, autoRun]);

  // Reset to initial props
  const handleReset = () => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    setJsCode(initialJs);
    setConsoleLogs([]);
    if (onResetOriginal) {
      onResetOriginal();
    }
    toast('Code Lab code reset to default', undefined, 'info');
  };

  // Copy code
  const handleCopyCurrent = () => {
    let textToCopy = htmlCode;
    if (activeTab === 'css') textToCopy = cssCode;
    if (activeTab === 'js') textToCopy = jsCode;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast(`Copied ${activeTab.toUpperCase()} code to clipboard`, undefined, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Download complete standalone HTML file
  const handleDownload = () => {
    const blob = new Blob([compiledDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codevaible-codelab.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Downloaded standalone HTML file', undefined, 'success');
  };

  // Get active code and Monaco language for the currently selected tab
  const currentCode = activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode;
  const currentLang = activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : 'javascript';

  const handleCodeChange = (newVal: string) => {
    if (activeTab === 'html') setHtmlCode(newVal);
    if (activeTab === 'css') setCssCode(newVal);
    if (activeTab === 'js') setJsCode(newVal);
  };

  const errorCount = consoleLogs.filter(l => l.type === 'error').length;

  return (
    <div 
      className={`flex flex-col w-full bg-[#1e1e24] rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''
      } ${className}`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      
      {/* 1. TOP VS CODE CODE LAB TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-[#181a20] border-b border-[#2d313d] text-xs gap-2 select-none shrink-0">
        
        {/* Left: Code Lab Branding & Tab Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-bold text-xs shadow-2xs">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{title}</span>
            <span className="sm:hidden">Code Lab</span>
          </div>

          {/* HTML / CSS / JavaScript VS Code Tabs */}
          <div className="flex items-center gap-1 bg-[#101216] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                activeTab === 'html'
                  ? 'bg-[#181a20] text-orange-400 shadow-sm border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>index.html</span>
            </button>

            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                activeTab === 'css'
                  ? 'bg-[#181a20] text-blue-400 shadow-sm border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>styles.css</span>
            </button>

            <button
              onClick={() => setActiveTab('js')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                activeTab === 'js'
                  ? 'bg-[#181a20] text-amber-400 shadow-sm border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>script.js</span>
            </button>
          </div>
        </div>

        {/* Right: Actions (Run, Auto-Run, Viewport, Theme, Fullscreen) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          
          {/* Main Run Code Button */}
          <button
            onClick={runCode}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition shadow-md active:scale-95 ${
              isExecuting
                ? 'bg-emerald-700 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
            title="Execute HTML, CSS & JavaScript (Ctrl+Enter)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>

          {/* Auto-Run Toggle */}
          <button
            onClick={() => {
              setAutoRun(prev => !prev);
              toast(autoRun ? 'Auto-run disabled' : 'Auto-run enabled (800ms debounce)', undefined, 'info');
            }}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
              autoRun
                ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-300'
                : 'bg-[#181a20] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Auto-refresh preview on edit"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Auto-Run</span>
          </button>

          {/* Viewport Width Controls */}
          <div className="hidden md:flex items-center gap-0.5 bg-[#101216] p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded hover:text-white transition ${
                viewportMode === 'desktop' ? 'bg-[#181a20] text-indigo-400' : 'text-slate-400'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`p-1.5 rounded hover:text-white transition ${
                viewportMode === 'tablet' ? 'bg-[#181a20] text-indigo-400' : 'text-slate-400'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded hover:text-white transition ${
                viewportMode === 'mobile' ? 'bg-[#181a20] text-indigo-400' : 'text-slate-400'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setEditorTheme(t => t === 'codevaible-dark' ? 'vs' : 'codevaible-dark')}
            className="p-1.5 rounded-lg bg-[#181a20] border border-slate-700 text-slate-400 hover:text-slate-200 transition"
            title="Toggle Editor Light/Dark Theme"
          >
            {editorTheme === 'codevaible-dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCurrent}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#181a20] hover:bg-slate-700/60 border border-slate-700 text-slate-300 hover:text-white transition text-xs"
            title={`Copy active ${activeTab.toUpperCase()} code`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Reset Code */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#181a20] border border-slate-700 text-slate-400 hover:text-slate-200 transition"
            title="Reset to default starter code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Download HTML */}
          <button
            onClick={handleDownload}
            className="hidden sm:inline-flex p-1.5 rounded-lg bg-[#181a20] border border-slate-700 text-slate-400 hover:text-slate-200 transition"
            title="Download Standalone HTML file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(f => !f)}
            className="p-1.5 rounded-lg bg-[#181a20] border border-slate-700 text-slate-400 hover:text-slate-200 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Code Lab'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. SPLIT WORKSPACE: MONACO CODE EDITOR (LEFT) + REAL-TIME SANDBOX PREVIEW (RIGHT) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        
        {/* Left Column: Monaco Editor */}
        <div className={`flex flex-col min-h-0 overflow-hidden ${
          splitRatio === '50-50' ? 'lg:col-span-6' : splitRatio === '60-40' ? 'lg:col-span-7' : 'lg:col-span-5'
        }`}>
          
          {/* Active File Title & Shortcut Prompt */}
          <div className="px-3 py-1.5 bg-[#14161b] border-b border-[#252833] flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">
                Editing: {activeTab === 'html' ? 'index.html (HTML Markup)' : activeTab === 'css' ? 'styles.css (Styles)' : 'script.js (JavaScript)'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 hidden sm:inline">
              Press <strong>Ctrl + Enter</strong> to Run
            </span>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 relative w-full min-h-[280px] overflow-hidden bg-[#181a20]">
            <Editor
              height="100%"
              language={currentLang}
              value={currentCode}
              theme={editorTheme}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
              onChange={(val) => handleCodeChange(val ?? '')}
              loading={
                <div className="flex items-center justify-center h-full bg-[#181a20] text-slate-400 text-xs font-mono gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading VS Code Editor Engine...</span>
                </div>
              }
              options={{
                fontSize: fontSize,
                fontFamily: "'Fira Code', 'Cascadia Code', ui-monospace, Menlo, Monaco, Consolas, monospace",
                fontLigatures: true,
                tabSize: 2,
                insertSpaces: true,
                automaticLayout: true,
                bracketPairColorization: { enabled: true },
                matchBrackets: 'always',
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                autoClosingDelete: 'always',
                wordWrap: 'on',
                lineNumbers: 'on',
                folding: true,
                glyphMargin: false,
                renderLineHighlight: 'all',
                suggestOnTriggerCharacters: true,
                quickSuggestions: {
                  other: true,
                  comments: false,
                  strings: true,
                },
                quickSuggestionsDelay: 3000,
                acceptSuggestionOnEnter: 'on',
                tabCompletion: 'on',
                wordBasedSuggestions: 'allDocuments',
                suggest: {
                  snippetsPreventQuickSuggestions: false,
                  showIcons: true,
                  showStatusBar: true,
                  preview: true,
                  localityBonus: true,
                },
                scrollBeyondLastLine: false,
                minimap: { enabled: false },
                cursorBlinking: 'blink',
                smoothScrolling: true,
                padding: { top: 8, bottom: 8 },
              }}
            />
          </div>

          {/* Status Bar */}
          <div className="px-3 py-1 bg-[#14161b] border-t border-[#252833] text-[10px] text-slate-400 flex items-center justify-between font-mono shrink-0">
            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
              <span className="uppercase text-indigo-400 font-bold">{currentLang}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowConsole(c => !c)}
                className={`flex items-center gap-1 hover:text-white transition cursor-pointer ${
                  errorCount > 0 ? 'text-rose-400 font-bold' : ''
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>Console {errorCount > 0 ? `(${errorCount} Error)` : ''}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Webpage Output Preview & Console */}
        <div className={`flex flex-col min-h-0 overflow-hidden bg-slate-900 ${
          splitRatio === '50-50' ? 'lg:col-span-6' : splitRatio === '60-40' ? 'lg:col-span-5' : 'lg:col-span-7'
        }`}>
          
          {/* Preview Header Strip */}
          <div className="px-3 py-1.5 bg-[#14161b] border-b border-[#252833] flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2 font-semibold">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Live Webpage Preview</span>
              <span className="text-[10px] text-emerald-400 font-medium px-1.5 py-0.2 rounded bg-emerald-500/15">
                Sandboxed DOM
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const iframe = iframeRef.current;
                  if (iframe) iframe.srcdoc = compiledDocument;
                  toast('Preview refreshed', undefined, 'info');
                }}
                className="hover:text-white transition flex items-center gap-1 text-[10px]"
                title="Refresh Preview"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Live Preview Iframe Container */}
          <div className="flex-1 relative flex items-center justify-center p-3 bg-slate-950/90 overflow-auto">
            <div 
              className={`h-full transition-all duration-200 bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col ${
                viewportMode === 'mobile' 
                  ? 'w-[375px] max-w-full border-4 border-slate-700' 
                  : viewportMode === 'tablet' 
                  ? 'w-[768px] max-w-full border-4 border-slate-700' 
                  : 'w-full'
              }`}
            >
              <iframe
                ref={iframeRef}
                title="Codevaible Live Preview"
                srcDoc={compiledDocument}
                sandbox="allow-scripts"
                className="w-full h-full border-0 bg-white"
              />
            </div>
          </div>

          {/* Console Output Drawer */}
          {showConsole && (
            <div className="border-t border-[#2d313d] bg-[#14161b] flex flex-col max-h-[180px] shrink-0">
              <div className="px-3 py-1.5 bg-[#101216] border-b border-[#252833] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Execution Console &amp; Errors</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setConsoleLogs([])}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] flex items-center gap-1"
                    title="Clear Console"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                  <button
                    onClick={() => setShowConsole(false)}
                    className="hover:text-white text-slate-400 text-xs px-1"
                    title="Close Console Panel"
                  >
                    &times;
                  </button>
                </div>
              </div>

              <div className="p-2 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin">
                {consoleLogs.length === 0 ? (
                  <div className="text-slate-500 text-[11px] py-2 text-center">
                    Console ready. Messages, logs, and runtime errors will appear here.
                  </div>
                ) : (
                  consoleLogs.map(log => (
                    <div 
                      key={log.id} 
                      className={`p-1.5 rounded flex items-start gap-2 text-[11px] ${
                        log.type === 'error'
                          ? 'bg-rose-950/60 text-rose-300 border-l-2 border-rose-500'
                          : log.type === 'warn'
                          ? 'bg-amber-950/60 text-amber-300 border-l-2 border-amber-500'
                          : 'bg-slate-900 text-slate-200 border-l-2 border-slate-600'
                      }`}
                    >
                      <span className="text-[9px] text-slate-500 shrink-0 font-mono mt-0.5">{log.timestamp}</span>
                      <span className="break-all whitespace-pre-wrap">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
