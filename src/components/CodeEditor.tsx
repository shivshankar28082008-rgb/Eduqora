import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Type, 
  Sparkles, 
  Play
} from 'lucide-react';
import { useToast } from './Toast';
import { LanguageIcon } from './LanguageIcon';
import { intellisenseService, CodeSuggestion, SuggestionKind } from '../services/intellisenseService';
import { highlightCode } from '../utils/codeHighlighter';

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
}

const KIND_BADGES: Record<SuggestionKind, { label: string; color: string; bg: string }> = {
  keyword: { label: 'KW', color: 'text-purple-400', bg: 'bg-purple-950/70 border-purple-800/60' },
  function: { label: 'FN', color: 'text-yellow-400', bg: 'bg-yellow-950/70 border-yellow-800/60' },
  tag: { label: 'TAG', color: 'text-blue-400', bg: 'bg-blue-950/70 border-blue-800/60' },
  property: { label: 'CSS', color: 'text-sky-400', bg: 'bg-sky-950/70 border-sky-800/60' },
  snippet: { label: 'SNP', color: 'text-rose-400', bg: 'bg-rose-950/70 border-rose-800/60' },
  type: { label: 'TYP', color: 'text-emerald-400', bg: 'bg-emerald-950/70 border-emerald-800/60' },
  variable: { label: 'VAR', color: 'text-teal-400', bg: 'bg-teal-950/70 border-teal-800/60' },
};

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
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 5-second debounce timer for IntelliSense auto-suggestions
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // IntelliSense state
  const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeWordStart, setActiveWordStart] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const [popupCoords, setPopupCoords] = useState<{ top: number; left: number }>({ top: 40, left: 60 });
  const [showDocs] = useState(true);

  const lines = code.split('\n');

  // Compute Prism-highlighted syntax markup matching VS Code colors
  const highlightedHtml = useMemo(() => {
    return highlightCode(code, language);
  }, [code, language]);

  // Synchronize scrolling between textarea, pre highlight overlay, and line numbers
  const handleScroll = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (preRef.current) {
      preRef.current.scrollTop = textarea.scrollTop;
      preRef.current.scrollLeft = textarea.scrollLeft;
    }
    if (linesRef.current) {
      linesRef.current.scrollTop = textarea.scrollTop;
    }
  }, []);

  // Update cursor position and calculate popup coordinates
  const updateCursorInfo = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const pos = textarea.selectionStart;
    const textBefore = code.slice(0, pos);
    const lineList = textBefore.split('\n');
    const line = lineList.length;
    const col = lineList[lineList.length - 1].length + 1;

    setCursorPosition({ line, col });

    // Calculate coords taking scroll and container dimensions into account
    const lineHeight = fontSize * 1.5;
    const charWidth = fontSize * 0.62;
    const top = Math.min(Math.max((line * lineHeight) - textarea.scrollTop + 12, 36), 340);
    
    // Clamp left coordinate based on container width so popup never clips outside the screen
    const containerWidth = containerRef.current?.clientWidth || 360;
    const popupWidth = containerWidth < 640 ? Math.min(containerWidth - 24, 250) : 260;
    const left = Math.max(8, Math.min((col * charWidth) - textarea.scrollLeft + 45, containerWidth - popupWidth - 16));

    setPopupCoords({ top, left });
  }, [code, fontSize]);

  // Trigger IntelliSense inspection
  const triggerIntelliSense = useCallback((cursorPos?: number) => {
    const textarea = textareaRef.current;
    if (!textarea || readOnly) return;

    const pos = cursorPos ?? textarea.selectionStart;
    const res = intellisenseService.getSuggestions(language, code, pos);

    if (res.suggestions.length > 0) {
      setSuggestions(res.suggestions);
      setActiveWordStart(res.wordStart);
      setSelectedIndex(0);
      setShowSuggestions(true);
      updateCursorInfo();
    } else {
      setShowSuggestions(false);
    }
  }, [language, code, readOnly, updateCursorInfo]);

  // Restart 5-second idle timer whenever typing occurs
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    setShowSuggestions(false);
    idleTimerRef.current = setTimeout(() => {
      triggerIntelliSense();
    }, 5000);
  }, [triggerIntelliSense]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  // Insert selected hint
  const applySuggestion = useCallback((sug: CodeSuggestion) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const currentCursor = textarea.selectionStart;
    const before = code.slice(0, activeWordStart);
    const after = code.slice(currentCursor);

    const newCode = before + sug.insertText + after;
    onChange(newCode);

    setShowSuggestions(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Set cursor at end of insertion
    const newCursor = activeWordStart + sug.insertText.length;
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newCursor;
        textareaRef.current.selectionEnd = newCursor;
        updateCursorInfo();
      }
    }, 10);
  }, [code, activeWordStart, onChange, updateCursorInfo]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast('Code copied to clipboard', undefined, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 1. Run shortcut Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (onRun) onRun();
      return;
    }

    // 2. Manual Trigger IntelliSense immediately on Ctrl+Space / Cmd+Space
    if ((e.ctrlKey || e.metaKey) && e.key === ' ') {
      e.preventDefault();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      triggerIntelliSense();
      return;
    }

    // 3. If hints popup is visible, handle navigation & acceptance
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
        e.preventDefault();
        applySuggestion(suggestions[selectedIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowSuggestions(false);
        return;
      }
    }

    // 4. Auto-closing quotes and brackets (VS Code signature feature)
    const pairs: Record<string, string> = {
      '(': ')',
      '{': '}',
      '[': ']',
      '"': '"',
      "'": "'",
      '`': '`',
    };

    if (pairs[e.key] && !readOnly) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const closing = pairs[e.key];

      // If text selected, wrap it
      if (start !== end) {
        e.preventDefault();
        const selected = code.substring(start, end);
        const wrapped = e.key + selected + closing;
        const newCode = code.substring(0, start) + wrapped + code.substring(end);
        onChange(newCode);
        resetIdleTimer();
        setTimeout(() => {
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
        }, 0);
        return;
      } else {
        // Just insert pair and place cursor between
        e.preventDefault();
        const newCode = code.substring(0, start) + e.key + closing + code.substring(end);
        onChange(newCode);
        resetIdleTimer();
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
          updateCursorInfo();
        }, 0);
        return;
      }
    }

    // 5. Backspace pair deletion
    if (e.key === 'Backspace' && !readOnly) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start === end && start > 0 && start < code.length) {
        const charBefore = code[start - 1];
        const charAfter = code[start];
        const matchPairs: Record<string, string> = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
        if (matchPairs[charBefore] === charAfter) {
          e.preventDefault();
          const newCode = code.substring(0, start - 1) + code.substring(start + 1);
          onChange(newCode);
          resetIdleTimer();
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start - 1;
            updateCursorInfo();
          }, 0);
          return;
        }
      }
    }

    // 6. Tab key indent handling
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);
      resetIdleTimer();

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        updateCursorInfo();
      }, 0);
      return;
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    updateCursorInfo();

    // Reset 5-second inactivity timer when typing characters
    if (
      !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape', 'Enter', 'Tab', 'Control', 'Alt', 'Shift', 'Meta'].includes(e.key)
    ) {
      resetIdleTimer();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    resetIdleTimer();
  };

  const handleClick = () => {
    updateCursorInfo();
    setShowSuggestions(false);
  };

  const selectedSuggestion = suggestions[selectedIndex];

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col w-full h-full bg-[#1e1e1e] text-[#d4d4d4] rounded-xl border border-slate-800 overflow-hidden font-mono shadow-sm"
    >
      {/* 1. TOP EDITOR HEADER */}
      <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-2 bg-[#181818] border-b border-slate-800 text-xs select-none gap-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 min-w-0">
          <div className="hidden xs:flex items-center gap-1.5 mr-1 sm:mr-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          {fileName && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-200 px-2 sm:px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] truncate max-w-[120px] xs:max-w-[160px] sm:max-w-none">
              <LanguageIcon id={language} size={13} />
              <span className="truncate">{fileName}</span>
            </span>
          )}
          {!fileName && (
            <span className="inline-flex items-center gap-1 text-[11px] uppercase font-bold text-cyan-400">
              <LanguageIcon id={language} size={14} />
              <span>{language}</span>
            </span>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-300 font-semibold shrink-0">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>VS Code Engine</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {onFontSizeChange && (
            <div className="flex items-center gap-0.5 sm:gap-1 mr-1 sm:mr-2 px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400">
              <Type className="w-3 h-3 hidden xs:inline" />
              <button 
                onClick={() => onFontSizeChange(Math.max(11, fontSize - 1))} 
                className="hover:text-white px-1 font-bold"
                title="Decrease font size"
              >
                -
              </button>
              <span className="text-[10px] sm:text-[11px]">{fontSize}px</span>
              <button 
                onClick={() => onFontSizeChange(Math.min(22, fontSize + 1))} 
                className="hover:text-white px-1 font-bold"
                title="Increase font size"
              >
                +
              </button>
            </div>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
              title="Reset code to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition text-[11px]"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* 2. DUAL-LAYER CODE EDITOR (SYNTAX HIGHLIGHTED OVERLAY + TEXTAREA) */}
      <div 
        className="relative flex flex-1 w-full overflow-hidden bg-[#1e1e1e]"
        style={{ minHeight }}
      >
        {/* Line Numbers Column */}
        <div 
          ref={linesRef}
          className="py-3 px-1.5 sm:px-3 select-none text-right text-[#858585] bg-[#1e1e1e] border-r border-[#2d2d2d] font-mono text-xs leading-6 overflow-hidden shrink-0"
          style={{ 
            fontSize: `${fontSize}px`,
            lineHeight: '1.5rem',
            width: lines.length > 999 ? '50px' : (lines.length > 99 ? '42px' : '34px')
          }}
        >
          {lines.map((_, i) => (
            <div 
              key={i} 
              className={`tabular-nums transition-colors ${i + 1 === cursorPosition.line ? 'text-[#c6c6c6] font-semibold' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Canvas Container */}
        <div className="relative flex-1 h-full min-h-0 overflow-hidden">
          {/* Underlay: Prism Syntax Highlighting with VS Code Dark+ Theme */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="vscode-theme absolute inset-0 m-0 p-3 pointer-events-none select-none font-mono whitespace-pre overflow-hidden leading-6 tab-size-2"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: '1.5rem',
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
            }}
          >
            <code 
              dangerouslySetInnerHTML={{ 
                __html: highlightedHtml + (code.endsWith('\n') ? ' ' : '') 
              }} 
            />
          </pre>

          {/* Overlay: Interactive Input Textarea with Transparent Text */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onScroll={handleScroll}
            onClick={handleClick}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: '1.5rem',
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
            }}
            className="absolute inset-0 w-full h-full p-3 bg-transparent text-transparent caret-[#569cd6] selection:bg-[#264f78]/60 font-mono resize-none outline-none leading-6 whitespace-pre overflow-auto tab-size-2 border-0"
            placeholder="Write code here... (Suggestions appear after 5 seconds of pause, or press Ctrl+Space)"
          />
        </div>

        {/* 3. VS CODE FLOATING AUTOCOMPLETE WIDGET */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            className="absolute z-40 flex flex-col md:flex-row bg-[#252526] border border-[#454545] rounded-lg shadow-2xl overflow-hidden max-w-[calc(100%-20px)] md:max-w-lg animate-in fade-in zoom-in-95 duration-100"
            style={{ 
              top: `${popupCoords.top}px`, 
              left: `${popupCoords.left}px` 
            }}
          >
            {/* Suggestions list column */}
            <div className="w-56 sm:w-60 max-h-52 sm:max-h-60 overflow-y-auto divide-y divide-[#333333] bg-[#252526]">
              <div className="px-2.5 py-1.5 bg-[#1e1e1e] text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between border-b border-[#333333]">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Sparkles className="w-3 h-3" />
                  Suggestions ({suggestions.length})
                </span>
                <span className="text-[9px] text-slate-500">Tab / ↵</span>
              </div>

              {suggestions.map((sug, idx) => {
                const badge = KIND_BADGES[sug.kind] || KIND_BADGES.keyword;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => applySuggestion(sug)}
                    className={`flex items-center justify-between px-2.5 py-1.5 cursor-pointer text-xs transition select-none ${
                      isSelected 
                        ? 'bg-[#04395e] text-white font-medium' 
                        : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`px-1 py-0.2 rounded text-[9px] font-mono font-bold border shrink-0 ${badge.bg} ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="truncate font-mono">{sug.label}</span>
                    </div>

                    <span className={`text-[10px] ml-2 shrink-0 ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                      {sug.kind}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Side Documentation Card (VS Code style - hidden on mobile/tablet portrait) */}
            {showDocs && selectedSuggestion && (
              <div className="hidden lg:flex flex-col w-64 p-3 bg-[#1e1e1e] border-l border-[#333333] text-xs text-[#cccccc]">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#333333]">
                  <span className="font-bold text-white text-[11px] truncate font-mono">
                    {selectedSuggestion.label}
                  </span>
                  <span className="text-[10px] uppercase text-cyan-400 font-bold">
                    {selectedSuggestion.kind}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#9cdcfe] mb-2 p-1.5 rounded bg-[#252526] border border-[#333333] break-words">
                  {selectedSuggestion.detail}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed overflow-y-auto max-h-24">
                  {selectedSuggestion.documentation}
                </p>

                <div className="mt-auto pt-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-[#333333]">
                  <span>Press <kbd className="px-1 rounded bg-[#333333] text-slate-300">Tab</kbd> to insert</span>
                  <span><kbd className="px-1 rounded bg-[#333333] text-slate-300">Esc</kbd> to close</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. VS CODE STATUS BAR (Optimized for mobile & tablet without wrapping) */}
      <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#007acc] text-white text-[11px] select-none gap-2 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
              triggerIntelliSense();
            }}
            className="inline-flex items-center gap-1 hover:underline transition font-medium whitespace-nowrap"
            title="Auto-suggestions trigger after 5 seconds of pause, or click/press Ctrl+Space anytime"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden xs:inline">Suggestions</span>
          </button>
          <span className="opacity-60">|</span>
          <span className="whitespace-nowrap">Ln {cursorPosition.line}, Col {cursorPosition.col}</span>
          <span className="opacity-60 hidden sm:inline">|</span>
          <span className="hidden sm:inline whitespace-nowrap">Lines: {lines.length}</span>
          <span className="opacity-60 hidden md:inline">|</span>
          <span className="hidden md:inline whitespace-nowrap">UTF-8</span>
          <span className="opacity-60 hidden md:inline">|</span>
          <span className="hidden md:inline whitespace-nowrap">Spaces: 2</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRun && (
            <button
              onClick={onRun}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition text-[11px] font-semibold shadow-xs whitespace-nowrap"
            >
              <Play className="w-3 h-3 fill-white" />
              <span className="hidden xs:inline">Run</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
