import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  Save, 
  Download, 
  Share2, 
  RotateCcw, 
  Plus, 
  FileText, 
  FolderPlus, 
  Trash2, 
  Edit3, 
  Maximize2, 
  Minimize2, 
  Settings, 
  Eye, 
  Terminal, 
  ChevronRight, 
  Code2, 
  Sparkles,
  Check,
  CheckCircle2,
  FolderGit2,
  PanelRight,
  PanelBottom,
  PanelLeft,
  MoreHorizontal,
  Columns,
  Layers
} from 'lucide-react';
import { projectService } from '../services/projectService';
import { executionService } from '../services/executionService';
import { storageService } from '../services/storageService';
import { CodeEditor } from '../components/CodeEditor';
import { LivePreview, PreviewLayoutMode } from '../components/LivePreview';
import { useToast } from '../components/Toast';
import { LanguageIcon } from '../components/LanguageIcon';
import { Project, ProjectFile, LanguageId, ConsoleOutputMessage } from '../types';

const renderFileIcon = (fileName: string) => {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.html') || lower.endsWith('.htm')) return <LanguageIcon id="html" size={14} />;
  if (lower.endsWith('.css')) return <LanguageIcon id="css" size={14} />;
  if (lower.endsWith('.js') || lower.endsWith('.jsx') || lower.endsWith('.ts') || lower.endsWith('.tsx')) return <LanguageIcon id="javascript" size={14} />;
  if (lower.endsWith('.py')) return <LanguageIcon id="python" size={14} />;
  if (lower.endsWith('.sql')) return <LanguageIcon id="sql" size={14} />;
  if (lower.endsWith('.c') || lower.endsWith('.h')) return <LanguageIcon id="c" size={14} />;
  if (lower.endsWith('.cpp') || lower.endsWith('.hpp') || lower.endsWith('.cc')) return <LanguageIcon id="cpp" size={14} />;
  if (lower.endsWith('.java')) return <LanguageIcon id="java" size={14} />;
  if (lower.endsWith('.php')) return <LanguageIcon id="php" size={14} />;
  return <FileText className="w-3.5 h-3.5 text-slate-400" />;
};

interface CodeLabPageProps {
  projectId?: string;
  templateId?: string;
  initialLang?: LanguageId;
  onNavigate: (route: string) => void;
}

export const CodeLabPage: React.FC<CodeLabPageProps> = ({
  projectId,
  templateId,
  initialLang = 'html',
  onNavigate,
}) => {
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [activeFileId, setActiveFileId] = useState<string>('');
  const [compiledHtml, setCompiledHtml] = useState<string>('');
  const [sqlResult, setSqlResult] = useState<any>(undefined);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleOutputMessage[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(14);

  // Layout mode state (split-right, split-bottom, split-left, preview-full)
  const [layoutMode, setLayoutMode] = useState<PreviewLayoutMode>(() => {
    try {
      const saved = localStorage.getItem('eduqora-codelab-layout');
      if (saved && ['split-right', 'split-bottom', 'split-left', 'preview-full', 'editor-full'].includes(saved)) {
        return saved as PreviewLayoutMode;
      }
    } catch {}
    return 'split-right';
  });

  const handleLayoutChange = (mode: PreviewLayoutMode) => {
    setLayoutMode(mode);
    try {
      localStorage.setItem('eduqora-codelab-layout', mode);
    } catch {}
  };

  // Mobile and Tablet responsive view controls
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview' | 'files'>('editor');
  const [tabletSplit, setTabletSplit] = useState<boolean>(false);
  const [showMobileMore, setShowMobileMore] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Dynamic device auto-size observer for mobile, foldable, tablet, and desktop
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setScreenWidth(w);
      if (w >= 768 && w < 1024) {
        setTabletSplit(true);
      } else if (w < 640) {
        setTabletSplit(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Interactive standard input (stdin) for cin / scanf / Scanner / input()
  const [stdinInput, setStdinInput] = useState<string>('');
  const [showStdin, setShowStdin] = useState<boolean>(false);

  // New File modal state
  const [newFileModalOpen, setNewFileModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Execution tracking to prevent stale state or cross-run message contamination
  const [executionKey, setExecutionKey] = useState<string>('init');
  const currentExecIdRef = useRef<string>('');

  // Load project or initialize from template/blank
  useEffect(() => {
    let currentProj: Project | undefined;
    if (projectId) {
      currentProj = projectService.getProjectById(projectId);
    } else if (templateId) {
      currentProj = projectService.createProjectFromTemplate(templateId);
    }

    if (!currentProj) {
      // Check if any projects exist
      const existing = projectService.getProjects();
      if (existing.length > 0) {
        currentProj = existing[0];
      } else {
        currentProj = projectService.createBlankProject('Eduqora Web Project', (initialLang as LanguageId) || 'html');
      }
    }

    setProject(currentProj);
    if (currentProj.files.length > 0) {
      const entry = currentProj.files.find(f => f.isEntry) || currentProj.files[0];
      setActiveFileId(entry.id);
    }

    // Auto-run initially
    runProject(currentProj);
  }, [projectId, templateId, initialLang]);

  // Listen for iframe postMessage logs
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.source === 'eduqora-code-runner') {
        // Discard messages from previous runs to prevent stale state
        if (e.data.executionId && currentExecIdRef.current && e.data.executionId !== currentExecIdRef.current) {
          return;
        }

        const newMsg: ConsoleOutputMessage = {
          id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
          type: e.data.type || 'log',
          text: e.data.text || '',
          file: e.data.file,
          line: e.data.line,
          column: e.data.col,
          timestamp: e.data.timestamp || new Date().toLocaleTimeString(),
        };
        setConsoleMessages(prev => [...prev.slice(-50), newMsg]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const runProject = async (targetProj?: Project | null) => {
    const p = targetProj || project;
    if (!p) return;

    setIsRunning(true);

    // Create fresh execution context ID
    const currentExecId = `exec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    currentExecIdRef.current = currentExecId;
    setExecutionKey(currentExecId);

    // Clear old console messages & errors for this clean execution run
    setConsoleMessages([]);

    // Determine dark mode state for terminal theme styling
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('eduqora-theme') === 'dark';
    const bg = isDark ? '#090d16' : '#f8fafc';
    const headerBg = isDark ? '#0c101c' : '#f1f5f9';
    const headerBorder = isDark ? '#1e293b' : '#e2e8f0';
    const textLog = isDark ? '#f8fafc' : '#0f172a';
    const textMuted = isDark ? '#94a3b8' : '#64748b';
    const errBg = isDark ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2';
    const errBorder = isDark ? 'rgba(239, 68, 68, 0.3)' : '#fca5a5';
    const errText = isDark ? '#f87171' : '#b91c1c';
    const infoText = isDark ? '#38bdf8' : '#0284c7';
    const successText = isDark ? '#34d399' : '#16a34a';
    const warnText = isDark ? '#fbbf24' : '#d97706';

    try {
      if (p.language === 'sql') {
        const activeFile = p.files.find(f => f.id === activeFileId) || p.files[0];
        const res = executionService.executeSql(activeFile?.content || '');
        setConsoleMessages(res.messages);
        setSqlResult(res.sqlResult);

        // Generate clean SQL Table HTML for preview
        const sqlRows = res.sqlResult?.rows || [];
        const sqlCols = res.sqlResult?.columns || [];
        const tableHtml = sqlCols.length > 0 ? `
          <div style="overflow-x: auto; border: 1px solid ${headerBorder}; border-radius: 8px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;">
              <thead>
                <tr style="background: ${headerBg}; border-bottom: 1px solid ${headerBorder};">
                  ${sqlCols.map(c => `<th style="padding: 8px 12px; font-weight: 600; color: ${isDark ? '#e2e8f0' : '#1e293b'};">${c}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${sqlRows.map((r, i) => `
                  <tr style="border-bottom: 1px solid ${headerBorder}; background: ${i % 2 === 0 ? 'transparent' : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)')}">
                    ${sqlCols.map(c => `<td style="padding: 8px 12px; white-space: nowrap;">${r[c] !== null && r[c] !== undefined ? r[c] : '<span style="color:#94a3b8;font-style:italic;">NULL</span>'}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div style="padding: 24px; text-align: center; color: ${textMuted};">
            ${res.messages.map(m => `<div style="margin-bottom: 6px; color: ${m.type === 'error' ? errText : (m.type === 'success' ? successText : textLog)};">${m.text}</div>`).join('')}
          </div>
        `;

        const outHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; background: ${bg}; color: ${textLog}; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 1.6; padding: 16px; box-sizing: border-box; }
              .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid ${headerBorder}; color: ${textMuted}; font-size: 11px; }
            </style>
          </head>
          <body>
            <div class="header">
              <span>Database Query Result (${sqlRows.length} rows returned)</span>
              <span>Status: ${res.success ? '● Execution Complete' : '● Syntax Error'}</span>
            </div>
            ${tableHtml}
          </body>
          </html>
        `;
        setCompiledHtml(outHtml);
      } else if (p.language === 'python') {
        const activeFile = p.files.find(f => f.id === activeFileId) || p.files[0];
        const res = await executionService.executePython(
          activeFile?.content || '',
          stdinInput,
          p.files.map(f => ({ name: f.name, content: f.content }))
        );
        setConsoleMessages(res.messages);

        const outHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; background: ${bg}; color: ${textLog}; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 1.6; }
              .header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: ${headerBg}; border-bottom: 1px solid ${headerBorder}; color: ${textMuted}; font-size: 11px; }
              .content { padding: 16px; }
              .line { margin-bottom: 6px; word-break: break-word; white-space: pre-wrap; }
              .log { color: ${textLog}; }
              .info { color: ${infoText}; }
              .success { color: ${successText}; font-weight: bold; }
              .error { color: ${errText}; background: ${errBg}; padding: 6px 10px; border-radius: 6px; border: 1px solid ${errBorder}; }
              .warn { color: ${warnText}; }
            </style>
          </head>
          <body>
            <div class="header">
              <span>Terminal: Python 3.10 (Native Isolated Runtime)</span>
              <span>Status: ${res.success ? '● Online (Exit 0)' : '● Diagnostic Error'}</span>
            </div>
            <div class="content">
              ${res.messages.map(m => `<div class="line ${m.type}">${m.text}</div>`).join('')}
            </div>
          </body>
          </html>
        `;
        setCompiledHtml(outHtml);
      } else if (p.language === 'c' || p.language === 'cpp' || p.language === 'java' || p.language === 'php') {
        const activeFile = p.files.find(f => f.id === activeFileId) || p.files[0];
        const res = await executionService.executeCompiledLanguage(
          p.language,
          activeFile?.content || '',
          stdinInput,
          p.files.map(f => ({ name: f.name, content: f.content }))
        );
        setConsoleMessages(res.messages);

        const compilerTag = p.language === 'c' ? 'GCC 12.3 (Native ISO C17)'
          : p.language === 'cpp' ? 'G++ 12.3 (Native C++17)'
          : p.language === 'java' ? 'OpenJDK 17 (Java Runtime)'
          : 'PHP 8.2 (CLI Engine)';

        const outHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; background: ${bg}; color: ${textLog}; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 1.6; }
              .header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: ${headerBg}; border-bottom: 1px solid ${headerBorder}; color: ${textMuted}; font-size: 11px; }
              .content { padding: 16px; }
              .line { margin-bottom: 6px; word-break: break-word; white-space: pre-wrap; }
              .log { color: ${textLog}; }
              .info { color: ${infoText}; }
              .success { color: ${successText}; font-weight: bold; }
              .error { color: ${errText}; background: ${errBg}; padding: 6px 10px; border-radius: 6px; border: 1px solid ${errBorder}; }
              .warn { color: ${warnText}; }
            </style>
          </head>
          <body>
            <div class="header">
              <span>Compiler Output: ${compilerTag}</span>
              <span>Status: ${res.success ? '● Exit 0 (Success)' : '● Process Exited with Error'}</span>
            </div>
            <div class="content">
              ${res.messages.map(m => `<div class="line ${m.type}">${m.text}</div>`).join('')}
            </div>
          </body>
          </html>
        `;
        setCompiledHtml(outHtml);
      } else {
        // Multi-file HTML/CSS/JS Virtual Project execution
        const res = executionService.bundleWebProject(p.files, currentExecId);
        setCompiledHtml(res.compiledHtml);
        if (res.messages.length > 0) {
          setConsoleMessages(res.messages);
        }
      }
    } catch (err: any) {
      setConsoleMessages([{
        id: 'err-fatal-' + Date.now(),
        type: 'error',
        text: `Execution failed: ${err.message || String(err)}`,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } finally {
      setTimeout(() => {
        setIsRunning(false);
        // On mobile view, automatically show output when run
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          setMobileTab('preview');
        }
      }, 250);
    }
  };

  const handleCodeChange = (newContent: string) => {
    if (!project) return;
    const updatedFiles = project.files.map(f => 
      f.id === activeFileId ? { ...f, content: newContent } : f
    );
    setProject({ ...project, files: updatedFiles });
  };

  const handleSave = () => {
    if (!project) return;
    projectService.saveProject(project);
    toast('Project saved successfully', `Updated ${project.title} at ${new Date().toLocaleTimeString()}`, 'success');
  };

  const handleDownload = () => {
    if (!project) return;
    projectService.downloadProject(project);
    toast('Download triggered', 'Your project bundle has been downloaded.', 'info');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast('Share Link Copied', 'Project link has been copied to your clipboard.', 'success');
  };

  const handleCreateFile = () => {
    if (!project || !newFileName.trim()) return;
    const ext = newFileName.split('.').pop()?.toLowerCase();
    let lang: ProjectFile['language'] = 'html';
    let initialContent = '// Script';

    if (ext === 'css') {
      lang = 'css';
      initialContent = '/* CSS styles */';
    } else if (ext === 'js' || ext === 'javascript') {
      lang = 'javascript';
      initialContent = '// JavaScript file\nconsole.log("Loaded!");\n';
    } else if (ext === 'py') {
      lang = 'python';
      initialContent = '# Python script\ndef main():\n    print("Hello from Python!")\n\nif __name__ == "__main__":\n    main()\n';
    } else if (ext === 'sql') {
      lang = 'sql';
      initialContent = '-- SQL query\nSELECT * FROM students LIMIT 10;\n';
    } else if (ext === 'c' || ext === 'h') {
      lang = 'c';
      initialContent = '#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}\n';
    } else if (ext === 'cpp' || ext === 'hpp' || ext === 'cc' || ext === 'cxx') {
      lang = 'cpp';
      initialContent = '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}\n';
    } else if (ext === 'java') {
      lang = 'java';
      initialContent = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}\n';
    } else if (ext === 'php') {
      lang = 'php';
      initialContent = '<?php\necho "Hello from PHP!\\n";\n?>\n';
    } else if (ext === 'html' || ext === 'htm') {
      lang = 'html';
      initialContent = '<div>New Component</div>';
    }

    const newFile: ProjectFile = {
      id: 'f-' + Date.now(),
      name: newFileName.trim(),
      language: lang,
      content: initialContent,
    };

    const updated = {
      ...project,
      files: [...project.files, newFile],
    };
    setProject(updated);
    setActiveFileId(newFile.id);
    setNewFileName('');
    setNewFileModalOpen(false);
    toast('File created', `Added ${newFile.name}`, 'success');
  };

  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    if (project.files.length <= 1) {
      toast('Cannot delete file', 'Projects require at least one file.', 'error');
      return;
    }
    const targetFile = project.files.find(f => f.id === id);
    const updated = {
      ...project,
      files: project.files.filter(f => f.id !== id),
    };
    setProject(updated);
    if (activeFileId === id) {
      setActiveFileId(updated.files[0].id);
    }
    toast('File deleted', `Removed ${targetFile?.name}`, 'info');
  };

  const handleRenameFile = (id: string) => {
    if (!project || !renameValue.trim()) {
      setRenamingFileId(null);
      return;
    }
    const updated = {
      ...project,
      files: project.files.map(f => f.id === id ? { ...f, name: renameValue.trim() } : f),
    };
    setProject(updated);
    setRenamingFileId(null);
    toast('File renamed', `Updated to ${renameValue.trim()}`, 'success');
  };

  const handleLanguageSwitch = (newLang: LanguageId) => {
    if (!project) return;
    const blank = projectService.createBlankProject(`New ${newLang.toUpperCase()} Lab`, newLang);
    setProject(blank);
    setActiveFileId(blank.files[0].id);
    runProject(blank);
    toast(`Switched to ${newLang.toUpperCase()}`, 'Loaded fresh workspace for this language.', 'info');
  };

  const activeFile = project?.files.find(f => f.id === activeFileId) || project?.files[0];

  return (
    <div className={`flex flex-col w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-[#090d16]' : 'h-[calc(100dvh-57px)] sm:h-[calc(100dvh-64px)] max-h-[calc(100dvh-57px)] sm:max-h-[calc(100dvh-64px)] bg-[#090d16] text-[#f1f5f9]'}`}>
      
      {/* 1. CODE LAB TOOLBAR */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-[#090d16] border-b border-slate-800 text-xs gap-1.5 sm:gap-2 select-none shrink-0">
        {/* Left branding & Project Title */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
          <div className="flex items-center gap-1 sm:gap-1.5 text-indigo-400 font-bold tracking-tight text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] shrink-0">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
            <span className="text-white hidden xs:inline">EDUQORA</span> <span className="hidden sm:inline">CODE LAB</span>
          </div>

          <span className="text-slate-600 hidden xs:inline">/</span>

          {/* Project Title Input */}
          <input
            type="text"
            value={project?.title || ''}
            onChange={e => project && setProject({ ...project, title: e.target.value })}
            className="bg-transparent hover:bg-slate-800/80 focus:bg-slate-800 text-slate-200 font-semibold px-1.5 sm:px-2 py-1 rounded text-xs outline-none border border-transparent focus:border-slate-700 transition w-20 xs:w-28 sm:w-44 truncate flex-shrink min-w-0"
            title="Click to rename project"
          />

          {/* Language Selector Dropdown with Logo */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg px-1.5 sm:px-2 py-1 hover:border-indigo-500 transition shrink-0">
            <LanguageIcon id={project?.language || 'html'} size={14} />
            <select
              value={project?.language || 'html'}
              onChange={e => handleLanguageSwitch(e.target.value as LanguageId)}
              className="bg-transparent text-slate-200 text-[11px] sm:text-xs font-semibold outline-none cursor-pointer max-w-[70px] xs:max-w-[110px] sm:max-w-none"
            >
              <option value="html" className="bg-slate-900 text-white">HTML/CSS/JS</option>
              <option value="javascript" className="bg-slate-900 text-white">JavaScript</option>
              <option value="python" className="bg-slate-900 text-white">Python</option>
              <option value="sql" className="bg-slate-900 text-white">MySQL / SQL</option>
              <option value="c" className="bg-slate-900 text-white">C Language</option>
              <option value="cpp" className="bg-slate-900 text-white">C++</option>
              <option value="java" className="bg-slate-900 text-white">Java</option>
              <option value="php" className="bg-slate-900 text-white">PHP</option>
            </select>
          </div>
        </div>

        {/* Center / Right IDE Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* RUN Button */}
          <button
            onClick={() => {
              runProject();
              if (screenWidth < 640) {
                setMobileTab('preview');
              }
            }}
            disabled={isRunning}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition shrink-0"
            title="Execute code (Ctrl+Enter)"
          >
            <Play className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>Run</span>
          </button>

          {/* Stop / Reset */}
          <button
            onClick={() => {
              setCompiledHtml('');
              toast('Execution stopped', undefined, 'info');
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition shrink-0"
            title="Stop Execution"
          >
            <Square className="w-3.5 h-3.5" />
          </button>

          {/* Stdin (Standard Input) Toggle for C/C++/Java/Python */}
          {['c', 'cpp', 'java', 'python', 'php'].includes(project?.language || '') && (
            <div className="relative">
              <button
                onClick={() => setShowStdin(!showStdin)}
                className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold border transition shrink-0 ${
                  showStdin || stdinInput.trim().length > 0
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
                title="Configure custom stdin (standard input stream for cin / scanf / Scanner / input())"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden xs:inline">stdin</span>
                {stdinInput.trim().length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>

              {showStdin && (
                <div className="absolute top-full mt-2 right-0 w-64 p-3 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      Standard Input (stdin)
                    </span>
                    <button
                      onClick={() => setShowStdin(false)}
                      className="text-slate-400 hover:text-slate-200 text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Values supplied to <code>cin &gt;&gt;</code>, <code>scanf</code>, <code>Scanner</code>, or <code>input()</code>:
                  </p>
                  <textarea
                    value={stdinInput}
                    onChange={e => setStdinInput(e.target.value)}
                    placeholder="e.g. 25 10 John"
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    {stdinInput && (
                      <button
                        onClick={() => setStdinInput('')}
                        className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-0.5"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowStdin(false);
                        runProject();
                      }}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold"
                    >
                      Apply &amp; Run
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shrink-0"
            title="Save Project to Local Workspace"
          >
            <Save className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Download (Hidden on small mobile, accessible via More) */}
          <button
            onClick={handleDownload}
            className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition"
            title="Download Files as JSON Bundle"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Share (Hidden on small mobile, accessible via More) */}
          <button
            onClick={handleShare}
            className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition"
            title="Share Project URL"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Quick Layout Mode Switcher in Toolbar (Desktop only) */}
          <div className="hidden lg:flex items-center bg-slate-800/90 border border-slate-700 rounded-lg p-0.5" title="Preview Result Position">
            <button
              onClick={() => handleLayoutChange('split-right')}
              className={`p-1.5 rounded-md transition ${
                layoutMode === 'split-right' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Split Right (Preview on Right)"
            >
              <PanelRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLayoutChange('split-bottom')}
              className={`p-1.5 rounded-md transition ${
                layoutMode === 'split-bottom' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Split Bottom (Preview Below Editor)"
            >
              <PanelBottom className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLayoutChange('split-left')}
              className={`p-1.5 rounded-md transition ${
                layoutMode === 'split-left' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Split Left (Preview on Left)"
            >
              <PanelLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLayoutChange(layoutMode === 'preview-full' ? 'split-right' : 'preview-full')}
              className={`p-1.5 rounded-md transition ${
                layoutMode === 'preview-full' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title={layoutMode === 'preview-full' ? 'Exit Fullscreen (Split View)' : 'Maximize Preview'}
            >
              {layoutMode === 'preview-full' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition"
            title={isFullscreen ? 'Exit Fullscreen IDE' : 'Fullscreen IDE'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Projects View Quick Link */}
          <button
            onClick={() => onNavigate('#/projects')}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 text-xs font-semibold transition"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Projects</span>
          </button>

          {/* Mobile More Options Dropdown (visible on < sm screens) */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setShowMobileMore(!showMobileMore)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition"
              title="More Actions"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showMobileMore && (
              <div 
                className="absolute top-full mt-2 right-0 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setShowMobileMore(false)}
              >
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download Bundle</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share URL</span>
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-slate-400" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
                <button
                  onClick={() => onNavigate('#/projects')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-indigo-300 hover:bg-indigo-950/60 transition"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>All Projects</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. MOBILE & TABLET RESPONSIVE VIEW SWITCHER (visible on screens < lg) */}
      <div className="lg:hidden flex items-center justify-between bg-[#070b13] border-b border-slate-800 px-2.5 sm:px-4 py-1.5 shrink-0 select-none">
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              mobileTab === 'editor' && !tabletSplit
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>Code</span>
            {activeFile && (
              <span className="text-[10px] text-indigo-200 font-mono hidden xs:inline max-w-[80px] truncate">
                ({activeFile.name})
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap relative ${
              mobileTab === 'preview' && !tabletSplit
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>Output</span>
            {compiledHtml && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />}
          </button>

          <button
            onClick={() => setMobileTab('files')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              mobileTab === 'files'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 shrink-0" />
            <span>Files ({project?.files.length || 0})</span>
          </button>
        </div>

        {/* Tablet Split Mode Toggle (tablet screens only: 640px to 1024px) */}
        <div className="hidden sm:flex items-center gap-1 ml-2 shrink-0">
          <button
            onClick={() => setTabletSplit(!tabletSplit)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              tabletSplit 
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Split Screen on Tablet"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{tabletSplit ? 'Side-by-Side' : 'Split'}</span>
          </button>
        </div>
      </div>

      {/* 3. WORKSPACE FOR MOBILE & TABLET (< lg screens) */}
      <div className="lg:hidden flex-1 flex flex-col min-h-0 overflow-hidden">
        {mobileTab === 'files' ? (
          /* FULL FILE EXPLORER VIEW ON MOBILE/TABLET */
          <div className="flex-1 bg-[#070b13] p-4 flex flex-col justify-between select-none overflow-y-auto min-h-0">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-indigo-400" />
                    Project Files ({project?.files.length || 0})
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Tap any file to open it in the Code Editor</p>
                </div>
                <button
                  onClick={() => setNewFileModalOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New File</span>
                </button>
              </div>

              {/* Files List */}
              <div className="space-y-1.5">
                {project?.files.map(file => {
                  const isActive = file.id === activeFileId;
                  const isRenaming = renamingFileId === file.id;

                  return (
                    <div
                      key={file.id}
                      onClick={() => {
                        setActiveFileId(file.id);
                        setMobileTab('editor');
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono cursor-pointer transition ${
                        isActive
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold shadow-xs'
                          : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate min-w-0 flex-1 mr-2">
                        {renderFileIcon(file.name)}
                        {isRenaming ? (
                          <input
                            type="text"
                            value={renameValue}
                            onChange={e => setRenameValue(e.target.value)}
                            onBlur={() => handleRenameFile(file.id)}
                            onKeyDown={e => e.key === 'Enter' && handleRenameFile(file.id)}
                            autoFocus
                            onClick={e => e.stopPropagation()}
                            className="bg-slate-800 text-white px-2 py-0.5 rounded text-xs outline-none w-full"
                          />
                        ) : (
                          <div className="truncate">
                            <span className="truncate">{file.name}</span>
                            {file.isEntry && (
                              <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                                entry
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setRenamingFileId(file.id);
                            setRenameValue(file.name);
                          }}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                          title="Rename file"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={e => handleDeleteFile(file.id, e)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition"
                          title="Delete file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800 text-[11px] text-slate-500">
              <p className="font-semibold text-slate-400 mb-0.5">Eduqora Cloud Runtime</p>
              <p>Language: {project?.language.toUpperCase()} | Files: {project?.files.length}</p>
            </div>
          </div>
        ) : tabletSplit ? (
          /* TABLET SIDE-BY-SIDE SPLIT VIEW */
          <div className="flex-1 grid grid-cols-2 divide-x divide-slate-800 min-h-0 overflow-hidden">
            <div className="h-full flex flex-col bg-[#0d121f] overflow-hidden">
              {activeFile ? (
                <CodeEditor
                  code={activeFile.content}
                  onChange={handleCodeChange}
                  language={activeFile.language}
                  fileName={activeFile.name}
                  onRun={() => runProject()}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  minHeight="100%"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                  Select a file from Files tab to edit.
                </div>
              )}
            </div>
            <div className="h-full flex flex-col bg-[#070a12] overflow-hidden">
              <LivePreview
                executionKey={executionKey}
                compiledHtml={compiledHtml}
                sqlResult={sqlResult}
                consoleMessages={consoleMessages}
                onClearConsole={() => setConsoleMessages([])}
                language={project?.language}
                onRefresh={() => runProject()}
                layoutMode="split-right"
              />
            </div>
          </div>
        ) : mobileTab === 'editor' ? (
          /* FULL CODE EDITOR VIEW ON MOBILE/TABLET */
          <div className="flex-1 flex flex-col bg-[#0d121f] min-h-0 overflow-hidden">
            {activeFile ? (
              <CodeEditor
                code={activeFile.content}
                onChange={handleCodeChange}
                language={activeFile.language}
                fileName={activeFile.name}
                onRun={() => runProject()}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                minHeight="100%"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-xs p-6 text-center">
                Select a file from the Files tab to start coding.
              </div>
            )}
          </div>
        ) : (
          /* FULL LIVE PREVIEW / TERMINAL / SQL VIEW ON MOBILE/TABLET */
          <div className="flex-1 flex flex-col bg-[#070a12] min-h-0 overflow-hidden">
            <LivePreview
              executionKey={executionKey}
              compiledHtml={compiledHtml}
              sqlResult={sqlResult}
              consoleMessages={consoleMessages}
              onClearConsole={() => setConsoleMessages([])}
              language={project?.language}
              onRefresh={() => runProject()}
              layoutMode="preview-full"
            />
          </div>
        )}
      </div>

      {/* 4. MAIN WORKSPACE FOR DESKTOP (lg: screens) */}
      <div className="hidden lg:grid flex-1 lg:grid-cols-12 min-h-0 overflow-hidden divide-x divide-slate-800">
        
        {/* LEFT: FILE EXPLORER (2 cols) */}
        <div className="lg:col-span-2 bg-[#070b13] p-3 flex flex-col justify-between select-none overflow-y-auto min-h-full">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Explorer
              </span>
              <button
                onClick={() => setNewFileModalOpen(true)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                title="New File"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Files List */}
            <div className="space-y-1">
              {project?.files.map(file => {
                const isActive = file.id === activeFileId;
                const isRenaming = renamingFileId === file.id;

                return (
                  <div
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      {renderFileIcon(file.name)}

                      {isRenaming ? (
                        <input
                          type="text"
                          value={renameValue}
                          onChange={e => setRenameValue(e.target.value)}
                          onBlur={() => handleRenameFile(file.id)}
                          onKeyDown={e => e.key === 'Enter' && handleRenameFile(file.id)}
                          autoFocus
                          className="bg-slate-800 text-white px-1 py-0.5 rounded text-xs outline-none w-full"
                        />
                      ) : (
                        <span className="truncate">{file.name}</span>
                      )}
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setRenamingFileId(file.id);
                          setRenameValue(file.name);
                        }}
                        className="p-1 hover:text-white"
                        title="Rename"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={e => handleDeleteFile(file.id, e)}
                        className="p-1 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            <p className="font-semibold text-slate-400 mb-1">Eduqora Environment</p>
            <p>Sandbox: Active</p>
            <p>Execution: Client Runtime</p>
          </div>
        </div>

        {/* WORKSPACE CONTENT (DYNAMIC BY LAYOUT MODE) */}
        {layoutMode === 'split-bottom' ? (
          /* BOTTOM SPLIT: Editor on top, Preview at bottom */
          <div className="lg:col-span-10 flex flex-col h-full min-h-0 divide-y divide-slate-800 overflow-hidden">
            <div className="h-1/2 min-h-[220px] flex flex-col bg-[#0d121f] overflow-hidden">
              {activeFile ? (
                <CodeEditor
                  code={activeFile.content}
                  onChange={handleCodeChange}
                  language={activeFile.language}
                  fileName={activeFile.name}
                  onRun={() => runProject()}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  minHeight="100%"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                  Select or create a file to start editing.
                </div>
              )}
            </div>

            <div className="h-1/2 min-h-[220px] flex flex-col bg-[#070a12] overflow-hidden">
              <LivePreview
                executionKey={executionKey}
                compiledHtml={compiledHtml}
                sqlResult={sqlResult}
                consoleMessages={consoleMessages}
                onClearConsole={() => setConsoleMessages([])}
                language={project?.language}
                onRefresh={() => runProject()}
                layoutMode={layoutMode}
                onLayoutModeChange={handleLayoutChange}
              />
            </div>
          </div>
        ) : layoutMode === 'split-left' ? (
          /* LEFT SPLIT: Preview on Left, Editor on Right */
          <>
            <div className="lg:col-span-5 h-full flex flex-col bg-[#070a12] overflow-hidden">
              <LivePreview
                executionKey={executionKey}
                compiledHtml={compiledHtml}
                sqlResult={sqlResult}
                consoleMessages={consoleMessages}
                onClearConsole={() => setConsoleMessages([])}
                language={project?.language}
                onRefresh={() => runProject()}
                layoutMode={layoutMode}
                onLayoutModeChange={handleLayoutChange}
              />
            </div>

            <div className="lg:col-span-5 h-full flex flex-col bg-[#0d121f] overflow-hidden">
              {activeFile ? (
                <CodeEditor
                  code={activeFile.content}
                  onChange={handleCodeChange}
                  language={activeFile.language}
                  fileName={activeFile.name}
                  onRun={() => runProject()}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  minHeight="100%"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                  Select or create a file to start editing.
                </div>
              )}
            </div>
          </>
        ) : layoutMode === 'preview-full' ? (
          /* FULL PREVIEW: Preview takes full editor space */
          <div className="lg:col-span-10 h-full flex flex-col bg-[#070a12] overflow-hidden relative">
            {/* Convenient banner to switch back to editor */}
            <div className="bg-indigo-950/70 border-b border-indigo-900/80 px-3 py-1.5 text-xs text-indigo-300 flex items-center justify-between">
              <span className="font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                Fullscreen Result View
              </span>
              <button
                onClick={() => handleLayoutChange('split-right')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition"
              >
                Show Editor (Split View)
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <LivePreview
                executionKey={executionKey}
                compiledHtml={compiledHtml}
                sqlResult={sqlResult}
                consoleMessages={consoleMessages}
                onClearConsole={() => setConsoleMessages([])}
                language={project?.language}
                onRefresh={() => runProject()}
                layoutMode={layoutMode}
                onLayoutModeChange={handleLayoutChange}
              />
            </div>
          </div>
        ) : (
          /* DEFAULT: SPLIT RIGHT (Editor Left, Preview Right) */
          <>
            <div className="lg:col-span-5 h-full flex flex-col bg-[#0d121f] overflow-hidden">
              {activeFile ? (
                <CodeEditor
                  code={activeFile.content}
                  onChange={handleCodeChange}
                  language={activeFile.language}
                  fileName={activeFile.name}
                  onRun={() => runProject()}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  minHeight="100%"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                  Select or create a file to start editing.
                </div>
              )}
            </div>

            <div className="lg:col-span-5 h-full flex flex-col bg-[#070a12] overflow-hidden">
              <LivePreview
                executionKey={executionKey}
                compiledHtml={compiledHtml}
                sqlResult={sqlResult}
                consoleMessages={consoleMessages}
                onClearConsole={() => setConsoleMessages([])}
                language={project?.language}
                onRefresh={() => runProject()}
                layoutMode={layoutMode}
                onLayoutModeChange={handleLayoutChange}
              />
            </div>
          </>
        )}

      </div>

      {/* New File Modal */}
      {newFileModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setNewFileModalOpen(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-slate-200"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-base font-bold mb-2">Create New File</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter file name with extension (e.g. <code>components.html</code>, <code>theme.css</code>, <code>helper.js</code>).
            </p>
            <input
              type="text"
              placeholder="e.g. app.js"
              value={newFileName}
              onChange={e => setNewFileName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateFile()}
              autoFocus
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-indigo-500 mb-4 font-mono"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setNewFileModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs"
              >
                Create File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
