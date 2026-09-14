import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import CodeMirror, { ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { foldGutter, bracketMatching, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { closeBrackets } from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Type, 
  Sparkles, 
  Play, 
  Code2,
  FileCode2
} from 'lucide-react';
import { useToast } from './Toast';
import { LanguageIcon } from './LanguageIcon';
import {
  normalizeLanguage,
  getLanguageExtension,
  vsCodeHighlightStyle,
  vsCodeWorkspaceTheme,
  createEduqoraAutocompletion,
} from '../utils/editorConfig';

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
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  // Keep latest onRun in ref so keymap doesn't recreate on every render
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  // Normalize language from language prop and fileName
  const normalizedLang = useMemo(() => {
    return normalizeLanguage(language, fileName);
  }, [language, fileName]);

  // CodeMirror language grammar extension
  const langExtension = useMemo(() => {
    return getLanguageExtension(normalizedLang);
  }, [normalizedLang]);

  // IntelliSense autocompletion extension for this language
  const autocompletionExtension = useMemo(() => {
    return createEduqoraAutocompletion(normalizedLang);
  }, [normalizedLang]);

  // Dynamic font-size theme
  const fontSizeTheme = useMemo(() => {
    return EditorView.theme({
      '&': {
        fontSize: `${fontSize}px`,
      },
      '.cm-scroller': {
        lineHeight: '1.6',
      },
    });
  }, [fontSize]);

  // Hotkey bindings: Ctrl+Enter (Run), Ctrl+S (prevent default browser dialog)
  const editorKeymap = useMemo(() => {
    return keymap.of([
      {
        key: 'Mod-Enter',
        run: () => {
          if (onRunRef.current) {
            onRunRef.current();
            return true;
          }
          return false;
        },
      },
      {
        key: 'Mod-s',
        run: () => {
          return true; // Prevent default browser save
        },
      },
      indentWithTab,
      ...searchKeymap,
    ]);
  }, []);

  // Combined extensions for the CodeMirror editor instance
  const extensions = useMemo(() => {
    return [
      langExtension,
      autocompletionExtension,
      syntaxHighlighting(vsCodeHighlightStyle),
      vsCodeWorkspaceTheme,
      fontSizeTheme,
      editorKeymap,
      bracketMatching(),
      closeBrackets(),
      foldGutter(),
      indentOnInput(),
    ];
  }, [langExtension, autocompletionExtension, fontSizeTheme, editorKeymap]);

  // Track cursor position for the editor status bar
  const handleUpdate = useCallback((update: ViewUpdate) => {
    if (update.selectionSet || update.docChanged) {
      const main = update.state.selection.main;
      const line = update.state.doc.lineAt(main.head);
      setCursorPos({
        line: line.number,
        col: main.head - line.from + 1,
      });
    }
  }, []);

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
            <span>VS Code Engine</span>
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
                className="hover:text-white px-1 font-bold text-slate-400 hover:bg-slate-700/60 rounded"
                title="Decrease font size"
                type="button"
              >
                -
              </button>
              <span className="text-[10px] sm:text-[11px] font-mono min-w-[28px] text-center">{fontSize}px</span>
              <button 
                onClick={() => onFontSizeChange(Math.min(22, fontSize + 1))} 
                className="hover:text-white px-1 font-bold text-slate-400 hover:bg-slate-700/60 rounded"
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
              className="p-1.5 rounded hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 transition"
              title="Reset code to template default"
              type="button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#1e1e1e] hover:bg-slate-700/60 border border-slate-700/60 text-slate-300 hover:text-white transition text-[11px]"
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
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition shadow-xs"
              title="Run Code (Ctrl+Enter)"
              type="button"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. REAL CODEMIRROR 6 SYNTAX-HIGHLIGHTED EDITOR */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden bg-[#1e1e1e]">
        <CodeMirror
          ref={editorRef}
          value={code}
          onChange={onChange}
          onUpdate={handleUpdate}
          readOnly={readOnly}
          editable={!readOnly}
          extensions={extensions}
          theme="dark"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: false, // Managed in extensions
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: false, // Managed via custom VS Code HighlightStyle
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false, // Managed via Eduqora IntelliSense
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="h-full w-full font-mono text-[14px]"
          height="100%"
          style={{ height: '100%', minHeight }}
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
            {normalizedLang}
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
