import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Type, 
  Sparkles, 
  Play, 
  Code2
} from 'lucide-react';
import { useToast } from './Toast';
import { LanguageIcon } from './LanguageIcon';
import { normalizeLanguage } from '../utils/editorConfig';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language?: string;
  fileName?: string;
  readOnly?: boolean;
  onRun?: () => void;
  onReset?: () => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  minHeight?: string;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language = 'javascript',
  fileName,
  readOnly = false,
  onRun,
  onReset,
  fontSize = 14,
  onFontSizeChange,
  minHeight = '320px',
  className = '',
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // Keep latest onRun in ref so keymap doesn't recreate on every render
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  // Normalize language from language prop and fileName
  const normalizedLang = useMemo(() => {
    return normalizeLanguage(language, fileName);
  }, [language, fileName]);

  // Map to Monaco standard language IDs
  const monacoLanguage = useMemo(() => {
    switch (normalizedLang) {
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      case 'python':
        return 'python';
      case 'javascript':
      case 'js':
        return 'javascript';
      case 'typescript':
      case 'ts':
        return 'typescript';
      case 'php':
        return 'php';
      case 'go':
      case 'golang':
        return 'go';
      case 'rust':
      case 'rs':
        return 'rust';
      case 'csharp':
      case 'cs':
        return 'csharp';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'sql':
        return 'sql';
      case 'json':
        return 'json';
      case 'markdown':
      case 'md':
        return 'markdown';
      default:
        return 'javascript';
    }
  }, [normalizedLang]);

  // Define custom authentic VS Code Dark Theme before mount
  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('eduqora-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569cd6', fontStyle: 'bold' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'type', foreground: '4ec9b0' },
        { token: 'class', foreground: '4ec9b0' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'variable', foreground: '9cdcfe' },
        { token: 'constant', foreground: '4fc1ff' },
        { token: 'delimiter.bracket', foreground: 'ffd700' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#282828',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorCursor.foreground': '#569cd6',
        'editorBracketMatch.background': '#0d5a94',
        'editorBracketMatch.border': '#327ac6',
        'editorGutter.background': '#1e1e1e',
        'editorGutter.foldingControlForeground': '#858585',
      },
    });
  };

  // Handle Editor Mount: bind shortcuts, event handlers, cursor track
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Track cursor movements
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({
        line: e.position.lineNumber,
        col: e.position.column,
      });
    });

    // Add Keybinding: Ctrl+Enter / Cmd+Enter to Run Code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (onRunRef.current) {
        onRunRef.current();
      }
    });

    // Prevent default browser Save dialog on Ctrl+S / Cmd+S
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Saved in state automatically
    });
  };

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast('success', 'Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast('error', 'Failed to copy code to clipboard');
    }
  };

  const linesCount = useMemo(() => {
    return (code.match(/\n/g) || []).length + 1;
  }, [code]);

  return (
    <div 
      className={`flex flex-col w-full h-full bg-[#1e1e1e] rounded-xl border border-slate-800/80 overflow-hidden shadow-xs select-none ${className}`}
      style={{ minHeight }}
    >
      {/* 1. TOP TOOLBAR */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-[#333333] text-xs gap-2 select-none shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* File Name or Language Identifier */}
          {fileName ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-200 px-2.5 py-1 rounded-md bg-[#1e1e1e] border border-slate-700/60 text-[11px] truncate max-w-[160px] sm:max-w-none shadow-2xs">
              <LanguageIcon id={normalizedLang} size={13} />
              <span className="truncate">{fileName}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1e1e1e] border border-slate-700/60 text-[11px] uppercase font-bold text-cyan-400 shadow-2xs">
              <LanguageIcon id={normalizedLang} size={14} />
              <span>{normalizedLang}</span>
            </span>
          )}

          {/* Engine Badge */}
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-300 font-semibold shrink-0">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Monaco Engine</span>
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Font Size Adjuster */}
          {onFontSizeChange && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1e1e1e] border border-slate-700/60 text-[11px] text-slate-300">
              <Type className="w-3 h-3 text-slate-400 hidden xs:inline" />
              <button 
                onClick={() => onFontSizeChange(Math.max(11, fontSize - 1))} 
                className="hover:text-white px-1 font-bold text-slate-400 hover:bg-slate-700/60 rounded cursor-pointer"
                title="Decrease font size"
                type="button"
              >
                -
              </button>
              <span className="text-[10px] sm:text-[11px] font-mono min-w-[28px] text-center">{fontSize}px</span>
              <button 
                onClick={() => onFontSizeChange(Math.min(22, fontSize + 1))} 
                className="hover:text-white px-1 font-bold text-slate-400 hover:bg-slate-700/60 rounded cursor-pointer"
                title="Increase font size"
                type="button"
              >
                +
              </button>
            </div>
          )}

          {/* Reset Code */}
          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 rounded hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              title="Reset code to template default"
              type="button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#1e1e1e] hover:bg-slate-700/60 border border-slate-700/60 text-slate-300 hover:text-white transition text-[11px] cursor-pointer"
            title="Copy code to clipboard"
            type="button"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Direct Run button in toolbar if provided */}
          {onRun && (
            <button
              onClick={onRun}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition shadow-xs cursor-pointer active:scale-95"
              title="Run Code (Ctrl+Enter)"
              type="button"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. REAL MONACO SYNTAX-HIGHLIGHTED EDITOR */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden bg-[#1e1e1e]">
        <Editor
          height="100%"
          language={monacoLanguage}
          value={code}
          theme="eduqora-dark"
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          onChange={(val) => onChange(val ?? '')}
          loading={
            <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-slate-400 text-xs font-mono gap-2">
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Initializing Monaco Editor...</span>
            </div>
          }
          options={{
            fontSize: fontSize,
            fontFamily: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontLigatures: true,
            tabSize: 2,
            insertSpaces: true,
            readOnly: readOnly,
            automaticLayout: true,
            bracketPairColorization: {
              enabled: true,
            },
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
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            contextmenu: true,
            formatOnPaste: true,
            formatOnType: true,
            padding: {
              top: 10,
              bottom: 10,
            },
          }}
        />
      </div>

      {/* 3. VS CODE BOTTOM STATUS BAR */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-[11px] select-none shrink-0 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium">
            <Code2 className="w-3 h-3" />
            <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
          </span>
          <span className="hidden sm:inline text-white/80">
            {linesCount} {linesCount === 1 ? 'line' : 'lines'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-white/90">
          <span className="hidden xs:inline">Spaces: 2</span>
          <span className="hidden md:inline">UTF-8</span>
          <span className="uppercase font-semibold tracking-wider bg-white/20 px-1.5 py-0.2 rounded text-[10px]">
            {monacoLanguage}
          </span>
          {onRun && (
            <span className="hidden lg:inline text-white/80 text-[10px]">
              Press <kbd className="px-1 py-0.5 rounded bg-black/30 font-mono text-[9px]">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-black/30 font-mono text-[9px]">Enter</kbd> to Run
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
