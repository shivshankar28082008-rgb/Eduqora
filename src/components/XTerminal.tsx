import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal as TerminalIcon, 
  Play, 
  Send, 
  Cpu, 
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ConsoleOutputMessage } from '../types';
import { useToast } from './Toast';

export interface XTerminalProps {
  messages: ConsoleOutputMessage[];
  language?: string;
  isRunning?: boolean;
  onRun?: (customStdin?: string) => void;
  onClear?: () => void;
  initialStdin?: string;
  onStdinChange?: (val: string) => void;
  onSendStdin?: (input: string) => void;
  exitCode?: number | null;
  executionTimeMs?: number;
  height?: string;
}

export const XTerminal: React.FC<XTerminalProps> = ({
  messages,
  language = 'python',
  isRunning = false,
  onRun,
  onClear,
  initialStdin = '',
  onStdinChange,
  onSendStdin,
  exitCode,
  executionTimeMs,
  height = '100%',
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermInstance = useRef<Terminal | null>(null);
  const fitAddonInstance = useRef<FitAddon | null>(null);
  const { toast } = useToast();

  const [copied, setCopied] = useState(false);
  const [stdinText, setStdinText] = useState(initialStdin);
  const [showStdinBar, setShowStdinBar] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lastRenderedMessagesCount = useRef(0);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;
  const onSendStdinRef = useRef(onSendStdin);
  onSendStdinRef.current = onSendStdin;
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;
  const onStdinChangeRef = useRef(onStdinChange);
  onStdinChangeRef.current = onStdinChange;

  // Sync initialStdin prop
  useEffect(() => {
    setStdinText(initialStdin);
  }, [initialStdin]);

  // Compiler Display Tag
  const getCompilerTag = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'c':
        return { name: 'GCC 12.3.0', sub: 'Native ISO C17 Compiler', color: 'text-blue-400', border: 'border-blue-500/30' };
      case 'cpp':
        return { name: 'G++ 12.3.0', sub: 'Native C++17 Standard', color: 'text-cyan-400', border: 'border-cyan-500/30' };
      case 'java':
        return { name: 'OpenJDK 17', sub: 'Java HotSpot 64-Bit VM', color: 'text-amber-400', border: 'border-amber-500/30' };
      case 'python':
        return { name: 'Python 3.10', sub: 'Native CPython Runtime', color: 'text-emerald-400', border: 'border-emerald-500/30' };
      case 'php':
        return { name: 'PHP 8.2 CLI', sub: 'Zend Engine v4.2', color: 'text-indigo-400', border: 'border-indigo-500/30' };
      case 'go':
        return { name: 'Go 1.19', sub: 'Native Go Toolchain', color: 'text-cyan-400', border: 'border-cyan-500/30' };
      case 'rust':
        return { name: 'Rust 1.75', sub: 'Native rustc LLVM Engine', color: 'text-orange-400', border: 'border-orange-500/30' };
      case 'javascript':
        return { name: 'V8 Engine', sub: 'Node.js 22 LTS / Web', color: 'text-yellow-400', border: 'border-yellow-500/30' };
      case 'html':
        return { name: 'HTML5 DOM', sub: 'Browser Rendering Engine', color: 'text-orange-400', border: 'border-orange-500/30' };
      case 'css':
        return { name: 'CSS3 Styles', sub: 'Computed Style Engine', color: 'text-blue-400', border: 'border-blue-500/30' };
      case 'sql':
        return { name: 'AlaSQL Engine', sub: 'In-Memory Relational RDBMS', color: 'text-purple-400', border: 'border-purple-500/30' };
      default:
        return { name: `${lang.toUpperCase()} Runtime`, sub: 'Real Execution Engine', color: 'text-slate-400', border: 'border-slate-700' };
    }
  };

  const compilerInfo = getCompilerTag(language);

  // Initialize xterm instance
  useEffect(() => {
    if (!terminalRef.current) return;

    // Clean any prior terminal DOM if re-mounting
    terminalRef.current.innerHTML = '';

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'block',
      fontFamily: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 13,
      lineHeight: 1.45,
      scrollback: 5000,
      theme: {
        background: '#090d16',
        foreground: '#e2e8f0',
        cursor: '#38bdf8',
        cursorAccent: '#090d16',
        selectionBackground: 'rgba(56, 189, 248, 0.3)',
        black: '#1e293b',
        red: '#f43f5e',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#a855f7',
        cyan: '#06b6d4',
        white: '#cbd5e1',
        brightBlack: '#64748b',
        brightRed: '#fb7185',
        brightGreen: '#34d399',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#c084fc',
        brightCyan: '#22d3ee',
        brightWhite: '#f8fafc',
      },
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    // Initial fit
    try {
      fitAddon.fit();
    } catch {}

    xtermInstance.current = term;
    fitAddonInstance.current = fitAddon;

    // Print welcome / banner
    term.writeln(`\x1b[1;36m┌─ Eduqora Real-Time Interactive Terminal ──────────────────────┐\x1b[0m`);
    term.writeln(`\x1b[90m│ Compiler: \x1b[1;32m${compilerInfo.name}\x1b[0m \x1b[90m(${compilerInfo.sub})\x1b[0m`);
    term.writeln(`\x1b[90m│ Type code in the editor and click \x1b[1;32m▶ Run\x1b[0m \x1b[90mor press \x1b[1;33mCtrl+Enter\x1b[0m`);
    term.writeln(`\x1b[1;36m└────────────────────────────────────────────────────────────────┘\x1b[0m`);
    term.writeln('');

    // Handle interactive terminal user typing (echoing and buffered input)
    let currentLineBuffer = '';
    term.onData((data) => {
      // 1. If process is actively running: send interactive stdin live to the running process
      if (isRunningRef.current) {
        if (data === '\r' || data === '\n') {
          term.writeln('');
          const toSend = currentLineBuffer + '\n';
          currentLineBuffer = '';
          if (onSendStdinRef.current) {
            onSendStdinRef.current(toSend);
          }
        } else if (data === '\x7f' || data === '\b') {
          if (currentLineBuffer.length > 0) {
            currentLineBuffer = currentLineBuffer.slice(0, -1);
            term.write('\b \b');
          }
        } else if (data >= ' ' || data === '\t') {
          currentLineBuffer += data;
          term.write(data);
        }
        return;
      }

      // 2. If not running: allow typing to stage input and run on Enter
      if (data === '\r' || data === '\n') {
        term.writeln('');
        const trimmedInput = currentLineBuffer;
        currentLineBuffer = '';
        if (onStdinChangeRef.current) {
          onStdinChangeRef.current(trimmedInput);
        }
        setStdinText(trimmedInput);
        if (onRunRef.current) {
          onRunRef.current(trimmedInput);
        }
      } 
      // Backspace
      else if (data === '\x7f' || data === '\b') {
        if (currentLineBuffer.length > 0) {
          currentLineBuffer = currentLineBuffer.slice(0, -1);
          term.write('\b \b');
        }
      } 
      // Printable characters
      else if (data >= ' ' || data === '\t') {
        currentLineBuffer += data;
        term.write(data);
      }
    });

    // ResizeObserver for auto-fit on panel resizing
    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch {}
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      xtermInstance.current = null;
      fitAddonInstance.current = null;
      lastRenderedMessagesCount.current = 0;
    };
  }, [language]);

  // Write new messages to xterm
  useEffect(() => {
    const term = xtermInstance.current;
    if (!term) return;

    // If messages were cleared
    if (messages.length === 0) {
      term.clear();
      term.writeln(`\x1b[90m[Terminal output cleared]\x1b[0m`);
      lastRenderedMessagesCount.current = 0;
      return;
    }

    // Full reprint if messages list was replaced or reset
    if (messages.length < lastRenderedMessagesCount.current) {
      term.clear();
      lastRenderedMessagesCount.current = 0;
    }

    const newMessages = messages.slice(lastRenderedMessagesCount.current);
    if (newMessages.length === 0) return;

    newMessages.forEach((msg) => {
      let formattedText = msg.text.replace(/\r?\n/g, '\r\n');

      // If this is a real-time streamed chunk from the running process
      if (msg.id.startsWith('chunk-')) {
        if (msg.type === 'error') {
          term.write(`\x1b[31m${formattedText}\x1b[0m`);
        } else {
          term.write(formattedText);
        }
        return;
      }

      const timeTag = `\x1b[90m[${msg.timestamp}]\x1b[0m`;
      switch (msg.type) {
        case 'error':
          term.writeln(`${timeTag} \x1b[1;31m[ERROR]\x1b[0m \x1b[31m${formattedText}\x1b[0m`);
          break;
        case 'warn':
          term.writeln(`${timeTag} \x1b[1;33m[WARN]\x1b[0m \x1b[33m${formattedText}\x1b[0m`);
          break;
        case 'success':
          term.writeln(`${timeTag} \x1b[1;32m[SUCCESS]\x1b[0m \x1b[32m${formattedText}\x1b[0m`);
          break;
        case 'info':
          term.writeln(`${timeTag} \x1b[1;36m[INFO]\x1b[0m \x1b[36m${formattedText}\x1b[0m`);
          break;
        case 'log':
        default:
          term.writeln(formattedText);
          break;
      }
    });

    lastRenderedMessagesCount.current = messages.length;
    term.scrollToBottom();
  }, [messages]);

  // Notify terminal on process completion
  useEffect(() => {
    const term = xtermInstance.current;
    if (!term || exitCode === undefined || exitCode === null) return;

    term.writeln('');
    if (exitCode === 0) {
      term.writeln(`\x1b[1;32m[Process completed with exit code 0${executionTimeMs ? ` in ${executionTimeMs}ms` : ''}]\x1b[0m\r\n`);
    } else {
      term.writeln(`\x1b[1;31m[Process exited with code ${exitCode}${executionTimeMs ? ` in ${executionTimeMs}ms` : ''}]\x1b[0m\r\n`);
    }
    term.scrollToBottom();
  }, [exitCode, executionTimeMs]);

  // Handle Clear
  const handleClear = () => {
    if (xtermInstance.current) {
      xtermInstance.current.clear();
    }
    lastRenderedMessagesCount.current = 0;
    if (onClear) onClear();
    toast('Terminal cleared', undefined, 'info');
  };

  // Handle Copy All Output
  const handleCopy = () => {
    const rawText = messages.map(m => m.text).join('\n');
    if (!rawText) {
      toast('No output to copy', undefined, 'info');
      return;
    }
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    toast('Terminal output copied', undefined, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Stdin Submission
  const handleSendStdin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stdinText.trim() && !isRunning) return;

    if (isRunning && onSendStdin) {
      const toSend = stdinText.endsWith('\n') ? stdinText : stdinText + '\n';
      onSendStdin(toSend);
      if (xtermInstance.current) {
        xtermInstance.current.writeln(`\x1b[36m> ${stdinText}\x1b[0m`);
      }
      setStdinText('');
      toast('Input sent to running process', undefined, 'info');
      return;
    }

    if (onStdinChange) onStdinChange(stdinText);
    if (xtermInstance.current) {
      xtermInstance.current.writeln(`\x1b[36m> ${stdinText}\x1b[0m`);
    }
    if (onRun) {
      onRun(stdinText);
    }
    toast('Input submitted to execution stream', undefined, 'info');
  };

  return (
    <div className={`flex flex-col bg-[#090d16] border border-slate-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-200 ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full h-full'
    }`}>
      {/* 1. TERMINAL TOP HEADER BAR */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d121f] border-b border-slate-800 select-none text-xs gap-2 shrink-0">
        
        {/* Left: Compiler Badge & Running Indicator */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 font-mono text-[11px] font-semibold text-slate-200 shrink-0">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 truncate">
            <Cpu className="w-3 h-3 text-emerald-400" />
            <span className={`font-semibold ${compilerInfo.color}`}>{compilerInfo.name}</span>
            <span className="text-slate-600 hidden md:inline">• {compilerInfo.sub}</span>
          </div>

          {/* Running Status Badge */}
          {isRunning ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Compiling & Running...
            </span>
          ) : exitCode !== undefined && exitCode !== null ? (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              exitCode === 0 
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' 
                : 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
            }`}>
              {exitCode === 0 ? '● Exit 0 (Success)' : `● Exit ${exitCode} (Failed)`}
            </span>
          ) : null}

          {executionTimeMs !== undefined && executionTimeMs > 0 && (
            <span className="hidden xs:inline-block font-mono text-[10px] text-slate-500">
              {executionTimeMs}ms
            </span>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Toggle Stdin Bar */}
          {['c', 'cpp', 'java', 'python', 'php', 'go', 'rust'].includes(language) && (
            <button
              onClick={() => setShowStdinBar(!showStdinBar)}
              className={`px-2 py-1 rounded text-[11px] font-medium transition flex items-center gap-1 border ${
                showStdinBar
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/60'
              }`}
              title="Toggle Standard Input (stdin) bar"
            >
              <Send className="w-3 h-3" />
              <span className="hidden sm:inline">Input (stdin)</span>
            </button>
          )}

          {/* Copy output */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title="Copy Terminal Text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Clear terminal */}
          <button
            onClick={handleClear}
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title="Clear Terminal Output"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimeout(() => {
                fitAddonInstance.current?.fit();
              }, 100);
            }}
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Maximize Terminal'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. OPTIONAL INLINE STDIN BAR */}
      {showStdinBar && (
        <form onSubmit={handleSendStdin} className="flex items-center gap-2 px-3 py-1.5 bg-[#0e1424] border-b border-slate-800">
          <span className="text-[11px] font-mono text-cyan-400 font-semibold shrink-0">stdin &gt;</span>
          <input
            type="text"
            value={stdinText}
            onChange={(e) => {
              setStdinText(e.target.value);
              if (onStdinChange) onStdinChange(e.target.value);
            }}
            placeholder="Type input for scanf(), cin, input(), fgets..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500 font-mono outline-none focus:border-cyan-500 transition"
          />
          <button
            type="submit"
            disabled={isRunning}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-semibold text-xs rounded transition flex items-center gap-1 shrink-0 disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Run with Input</span>
          </button>
        </form>
      )}

      {/* 3. XTERM CANVAS & BUFFER CONTAINER */}
      <div 
        ref={terminalRef} 
        className="flex-1 w-full overflow-hidden p-2 font-mono text-xs focus:outline-none"
        style={{ minHeight: '220px' }}
      />
    </div>
  );
};
