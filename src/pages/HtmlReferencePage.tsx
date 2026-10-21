import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle, 
  Tag, 
  Filter, 
  Eye, 
  Lightbulb, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layout,
  Type,
  Image as ImageIcon,
  List,
  Table as TableIcon,
  CheckSquare,
  Palette,
  Zap,
  CheckCircle2,
  Layers,
  ShieldAlert,
  Trash2,
  History,
  Info
} from 'lucide-react';
import { HTML_CATEGORIES, HTML_TAGS_DATA } from '../data/htmlReferenceData';
import { HtmlTagCategory, HtmlTagItem } from '../types/htmlReferenceTypes';
import { storageService } from '../services/storageService';
import { useToast } from '../components/Toast';
import { HtmlLivePlayground } from '../components/html/HtmlLivePlayground';

interface HtmlReferencePageProps {
  initialTagId?: string;
  onNavigate: (route: string) => void;
}

const ALPHABET_INDEX = [
  'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'
];

export const HtmlReferencePage: React.FC<HtmlReferencePageProps> = ({ initialTagId, onNavigate }) => {
  const { toast } = useToast();

  // Search & filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'all' | 'standard' | 'deprecated' | 'void'>('all');

  // Selected Tag for Detail / Interactive Workbench
  const [selectedTagId, setSelectedTagId] = useState<string>(initialTagId || HTML_TAGS_DATA[0].id);

  // Interactive Live Editor State for current tag
  const [interactiveHtml, setInteractiveHtml] = useState<string>('');
  const [runCount, setRunCount] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({});
  const [showExerciseHint, setShowExerciseHint] = useState<boolean>(false);
  const [showExerciseSolution, setShowExerciseSolution] = useState<boolean>(false);
  
  // Learned status tracking
  const [learnedTagIds, setLearnedTagIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codevaible_learned_html_tags');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed history (last 6)
  const [recentTagIds, setRecentTagIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codevaible_recent_html_tags');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Sync initialTagId when prop changes
  useEffect(() => {
    if (initialTagId) {
      setSelectedTagId(initialTagId);
    }
  }, [initialTagId]);

  // Update recent viewed tags
  useEffect(() => {
    setRecentTagIds(prev => {
      const filtered = prev.filter(id => id !== selectedTagId);
      const updated = [selectedTagId, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('codevaible_recent_html_tags', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, [selectedTagId]);

  // Find currently inspected tag
  const currentTag: HtmlTagItem = HTML_TAGS_DATA.find(t => t.id === selectedTagId) || HTML_TAGS_DATA[0];

  // Filter tags list
  const filteredTags = HTML_TAGS_DATA.filter(t => {
    // 1. Search Query
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !searchLower ||
      t.name.toLowerCase().includes(searchLower) ||
      t.shortDesc.toLowerCase().includes(searchLower) ||
      t.hinglish.toLowerCase().includes(searchLower) ||
      t.id.toLowerCase().includes(searchLower) ||
      (t.supportedAttributes && t.supportedAttributes.some(a => a.toLowerCase().includes(searchLower)));

    // 2. Category Filter
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;

    // 3. Status Filter
    let matchesStatus = true;
    if (statusFilter === 'standard') matchesStatus = !t.isDeprecated;
    if (statusFilter === 'deprecated') matchesStatus = !!t.isDeprecated;
    if (statusFilter === 'void') matchesStatus = !!t.isVoid || !!t.selfClosing;

    // 4. Alphabet Index
    let matchesLetter = true;
    if (selectedLetter !== 'ALL') {
      const cleanName = t.name.replace(/^[<\\/!]+/, '').toUpperCase();
      matchesLetter = cleanName.startsWith(selectedLetter);
    }

    return matchesSearch && matchesCat && matchesStatus && matchesLetter;
  });

  const currentIndex = HTML_TAGS_DATA.findIndex(t => t.id === currentTag.id);
  const prevTag = currentIndex > 0 ? HTML_TAGS_DATA[currentIndex - 1] : null;
  const nextTag = currentIndex < HTML_TAGS_DATA.length - 1 ? HTML_TAGS_DATA[currentIndex + 1] : null;

  // Sync interactive HTML when tag changes
  useEffect(() => {
    setInteractiveHtml(currentTag.exampleCode);
    setOpenFaqIndices({});
    setShowExerciseHint(false);
    setShowExerciseSolution(false);
    setRunCount(prev => prev + 1);
  }, [currentTag.id]);

  // Handle live preview updates
  const updateIframePreview = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const fullDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              padding: 16px;
              margin: 0;
              color: #1e293b;
              background: #ffffff;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          ${interactiveHtml}
        </body>
      </html>
    `;
    iframe.srcdoc = fullDoc;
  };

  useEffect(() => {
    updateIframePreview();
  }, [interactiveHtml, runCount]);

  const handleRunCode = () => {
    updateIframePreview();
    setRunCount(prev => prev + 1);
    toast('Code executed in live preview sandbox', undefined, 'success');
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast('Code copied to clipboard', undefined, 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetSandbox = () => {
    setInteractiveHtml(currentTag.exampleCode);
    toast('Sandbox code reset to original example', undefined, 'info');
  };

  const handleClearSandbox = () => {
    setInteractiveHtml('<!-- Write your custom HTML experiment here -->\n');
    toast('Editor cleared', undefined, 'info');
  };

  const handleLoadExerciseInSandbox = () => {
    setInteractiveHtml(currentTag.practiceExercise.starterCode);
    toast('Exercise starter code loaded into sandbox editor! Make your edits and view preview.', undefined, 'info');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const toggleLearned = (tagId: string) => {
    setLearnedTagIds(prev => {
      const isAlready = prev.includes(tagId);
      const next = isAlready ? prev.filter(id => id !== tagId) : [...prev, tagId];
      try {
        localStorage.setItem('codevaible_learned_html_tags', JSON.stringify(next));
      } catch {}
      toast(isAlready ? 'Marked as uncompleted' : 'Marked as Learned! 🎉', undefined, isAlready ? 'info' : 'success');
      return next;
    });
  };

  const isCurrentLearned = learnedTagIds.includes(currentTag.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#070b12] text-white p-6 sm:p-10 border border-indigo-900/60 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Codevaible HTML Reference Master Library</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Complete HTML Elements & Tags Reference
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed font-normal">
            Every standard HTML5 element, void tag, semantic container, form control, table, media component, global attribute, and obsolete tag with in-depth Hindi/Hinglish explanations, common mistakes, accessibility guidance, interview questions, and a live runnable editor.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('#/html-practice')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Open HTML Practice Lab</span>
            </button>
            <button
              onClick={() => onNavigate('#/quiz')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-200 font-semibold text-xs border border-indigo-700/50 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>HTML & DSA Assessment Quiz</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Learned: {learnedTagIds.length} / {HTML_TAGS_DATA.length} Items</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH, CATEGORIES, STATUS, & ALPHABET FILTER BAR */}
      <div className="space-y-4">
        
        {/* Top Control Bar: Search + Status Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tag, attribute, description, or Hinglish (e.g. details, dialog, font, href)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 border border-transparent focus:border-indigo-500 transition"
            />
          </div>

          {/* Status Quick Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Items ({HTML_TAGS_DATA.length})
            </button>
            <button
              onClick={() => setStatusFilter('standard')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1 ${
                statusFilter === 'standard'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Standard HTML5</span>
            </button>
            <button
              onClick={() => setStatusFilter('void')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1 ${
                statusFilter === 'void'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Void Elements</span>
            </button>
            <button
              onClick={() => setStatusFilter('deprecated')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1 ${
                statusFilter === 'deprecated'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Deprecated & Obsolete</span>
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-indigo-600'
            }`}
          >
            All Categories ({HTML_TAGS_DATA.length})
          </button>

          {HTML_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-indigo-600'
              }`}
            >
              <span>{cat.label} ({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Alphabetical Quick Jump Strip */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wider">A-Z:</span>
          {ALPHABET_INDEX.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 flex-shrink-0 rounded-lg font-mono font-bold text-xs flex items-center justify-center transition ${
                selectedLetter === letter
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Recently Viewed Tags Strip */}
        {recentTagIds.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <History className="w-3.5 h-3.5" /> Recently Viewed:
            </span>
            {recentTagIds.map(rId => {
              const rTag = HTML_TAGS_DATA.find(t => t.id === rId);
              if (!rTag) return null;
              return (
                <button
                  key={rId}
                  onClick={() => {
                    setSelectedTagId(rId);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold transition ${
                    rId === selectedTagId
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  {rTag.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. MAIN WORKBENCH: FILTERED TAG LIST (LEFT) + COMPREHENSIVE INSPECTOR (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Filtered Tag List Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 space-y-2 max-h-[850px] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Elements ({filteredTags.length})</span>
            <span className="text-[10px] text-slate-400">Click to Inspect</span>
          </div>

          {filteredTags.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <p>No matching HTML elements found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLetter('ALL');
                  setStatusFilter('all');
                }}
                className="text-indigo-600 dark:text-indigo-400 underline font-medium"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredTags.map(tagItem => {
              const isSelected = tagItem.id === currentTag.id;
              const isLearned = learnedTagIds.includes(tagItem.id);

              return (
                <button
                  key={tagItem.id}
                  onClick={() => {
                    setSelectedTagId(tagItem.id);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 border ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/70 border-indigo-500 dark:border-indigo-500 shadow-xs'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {tagItem.name}
                      </span>
                      {tagItem.isDeprecated && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                          Obsolete
                        </span>
                      )}
                      {(tagItem.isVoid || tagItem.selfClosing) && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                          Void
                        </span>
                      )}
                      {isLearned && (
                        <span className="inline-flex items-center text-emerald-500" title="Learned">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {tagItem.shortDesc}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 transition ${
                    isSelected ? 'text-indigo-600 dark:text-indigo-400 rotate-90 sm:rotate-0' : 'text-slate-400 opacity-40'
                  }`} />
                </button>
              );
            })
          )}
        </div>

        {/* Right: Comprehensive Tag Inspector & Live Interactive Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Tag Overview Header Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {currentTag.categoryLabel}
                </span>

                {currentTag.isDeprecated ? (
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Deprecated & Obsolete
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Standard HTML5
                  </span>
                )}

                {currentTag.isVoid || currentTag.selfClosing ? (
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Void Element (No Closing Tag)
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Container Element
                  </span>
                )}
              </div>

              {/* Mark as Learned Toggle + Prev/Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLearned(currentTag.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                    isCurrentLearned
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                  }`}
                  title="Mark this element as learned"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCurrentLearned ? 'Learned' : 'Mark Learned'}</span>
                </button>

                {prevTag && (
                  <button
                    onClick={() => {
                      setSelectedTagId(prevTag.id);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 text-xs font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300"
                    title={`Previous: ${prevTag.name}`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline font-mono">{prevTag.name}</span>
                  </button>
                )}
                {nextTag && (
                  <button
                    onClick={() => {
                      setSelectedTagId(nextTag.id);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 text-xs font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300"
                    title={`Next: ${nextTag.name}`}
                  >
                    <span className="hidden sm:inline font-mono">{nextTag.name}</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Element Title & Description */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {currentTag.name}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {currentTag.shortDesc}
              </p>
            </div>

            {/* Syntax Box with Copy */}
            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-mono text-xs flex items-center justify-between gap-2 text-indigo-700 dark:text-indigo-300">
              <span className="font-bold select-all overflow-x-auto">{currentTag.syntax}</span>
              <button
                onClick={() => handleCopy(currentTag.syntax)}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition flex-shrink-0"
                title="Copy Syntax"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tag Details Grid: Void Status & Closing Tag Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Tag Type / Void Status:
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {currentTag.isVoid || currentTag.selfClosing
                    ? 'Void Element (Cannot contain child nodes or closing tag)'
                    : 'Standard Container Element (Encapsulates child phrasing/flow content)'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Closing Tag Usage:
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {currentTag.closingTagUsage || (currentTag.isVoid ? 'Forbidden (Void element)' : 'Required closing tag')}
                </span>
              </div>
            </div>

            {/* Supported Attributes List */}
            {currentTag.supportedAttributes && currentTag.supportedAttributes.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Important Supported Attributes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTag.supportedAttributes.map((attr, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Simple Hindi / Hinglish Explanation Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300/40 dark:border-amber-700/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Simple Hindi / Hinglish Explanation (सरल समझ)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {currentTag.hinglish}
              </p>
            </div>

            {/* Obsolete Warning & Modern Alternative Box (for deprecated elements) */}
            {currentTag.isDeprecated && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Obsolete Tag Warning & Modern Recommendation</span>
                </div>
                <p className="text-rose-900 dark:text-rose-200 leading-relaxed">
                  <strong>Why Deprecated:</strong> {currentTag.deprecatedReason}
                </p>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-rose-300/60 dark:border-rose-800/60 text-slate-800 dark:text-slate-100 font-mono text-[11px] space-y-1">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px]">
                    Recommended Modern Alternative:
                  </div>
                  <div>{currentTag.modernAlternative}</div>
                </div>
              </div>
            )}

            {/* Common Mistakes & Solutions Box */}
            {currentTag.commonMistakes && currentTag.commonMistakes.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>Common Mistakes & Solutions</span>
                </div>
                <div className="space-y-2">
                  {currentTag.commonMistakes.map((cm, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="text-rose-600 dark:text-rose-400 font-semibold">
                        ❌ Mistake: {cm.mistake}
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        ✅ Solution: {cm.solution}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {cm.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accessibility Guidance Box */}
            {currentTag.accessibilityGuidance && (
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[10px]">
                  <Info className="w-3.5 h-3.5" /> Accessibility (a11y) Guidance
                </div>
                <p className="leading-relaxed">{currentTag.accessibilityGuidance}</p>
              </div>
            )}

            {/* SEO Relevance Box */}
            {currentTag.seoRelevance && (
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" /> SEO Relevance & Search Crawlers
                </div>
                <p className="leading-relaxed">{currentTag.seoRelevance}</p>
              </div>
            )}

            {/* Related Elements Navigation Chips */}
            {currentTag.relatedElements && currentTag.relatedElements.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Related HTML Elements:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTag.relatedElements.map(relId => {
                    const relItem = HTML_TAGS_DATA.find(t => t.id === relId);
                    if (!relItem) return null;
                    return (
                      <button
                        key={relId}
                        onClick={() => {
                          setSelectedTagId(relId);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-semibold transition"
                      >
                        {relItem.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Interactive HTML Code Lab (Sandbox Code Editor & Live Preview) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
            <HtmlLivePlayground
              key={`${currentTag.id}-${runCount}`}
              initialHtml={interactiveHtml}
              initialCss={`/* Live Styles for ${currentTag.name} */
body {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 24px;
  background: #f8fafc;
  color: #0f172a;
  line-height: 1.6;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  max-width: 480px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
`}
              initialJs={`// Live JavaScript interactions for ${currentTag.name}
console.log("Code Lab loaded for element: ${currentTag.name}");
`}
              title={`${currentTag.name} — Live HTML Code Lab & Execution Sandbox`}
              onResetOriginal={handleResetSandbox}
              height="540px"
            />
          </div>

          {/* Technical Interview Questions Accordion */}
          {currentTag.interviewQuestions && currentTag.interviewQuestions.length > 0 && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Technical Interview Questions & Answers
                </h3>
              </div>

              <div className="space-y-3">
                {currentTag.interviewQuestions.map((q, idx) => {
                  const isOpen = !!openFaqIndices[idx];
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndices(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className="w-full text-left p-3.5 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                            Q{idx + 1}
                          </span>
                          {q.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 space-y-2 leading-relaxed">
                          <p>{q.answer}</p>
                          {q.hinglishTip && (
                            <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-medium">
                              <strong>💡 Pro Tip: </strong> {q.hinglishTip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Practice Exercise Card */}
          {currentTag.practiceExercise && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Practice Exercise: {currentTag.practiceExercise.title}
                  </h3>
                </div>
                <button
                  onClick={handleLoadExerciseInSandbox}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Load into Editor
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentTag.practiceExercise.prompt}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setShowExerciseHint(prev => !prev)}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                >
                  {showExerciseHint ? 'Hide Hint' : '💡 Show Hint'}
                </button>
                <button
                  onClick={() => setShowExerciseSolution(prev => !prev)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  {showExerciseSolution ? 'Hide Solution' : 'View Solution Code'}
                </button>
              </div>

              {showExerciseHint && (
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                  <strong>Hint:</strong> {currentTag.practiceExercise.hint}
                </div>
              )}

              {showExerciseSolution && (
                <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs border border-slate-800 overflow-x-auto">
                  <pre>{currentTag.practiceExercise.solutionCode}</pre>
                </div>
              )}
            </div>
          )}

          {/* Bottom Next/Prev Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            {prevTag ? (
              <button
                onClick={() => {
                  setSelectedTagId(prevTag.id);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: {prevTag.name}</span>
              </button>
            ) : <div />}

            {nextTag && (
              <button
                onClick={() => {
                  setSelectedTagId(nextTag.id);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
              >
                <span>Next: {nextTag.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
