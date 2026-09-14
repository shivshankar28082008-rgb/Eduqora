import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  BookOpen, 
  Code2, 
  Terminal, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { useToast } from '../components/Toast';
import { CheatSheetResource } from '../types';

interface ResourcesPageProps {
  onNavigate: (route: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    toast('Copied snippet to clipboard', undefined, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = RESOURCES_DATA.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sections.some(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLang = selectedLang === 'all' || item.languageId === selectedLang;
    return matchesSearch && matchesLang;
  });

  const uniqueLanguages = Array.from(new Set(RESOURCES_DATA.map(r => r.languageId)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5" /> Developer Cheat Sheets
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Syntax References & Cheat Sheets
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Fast, production-ready syntax blueprints and practical code snippets for HTML, CSS, JavaScript, Python, SQL, and more.
        </p>
      </div>

      {/* Search & Language Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search snippet, tag, or method..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-indigo-500 border border-transparent transition"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Track:</span>
          <button
            onClick={() => setSelectedLang('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              selectedLang === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Languages
          </button>
          {uniqueLanguages.map(l => (
            <button
              key={l}
              onClick={() => setSelectedLang(l)}
              className={`px-3 py-1.5 rounded-lg font-medium uppercase transition whitespace-nowrap ${
                selectedLang === l
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Cheat Sheets List */}
      <div className="space-y-8">
        {filteredItems.map(sheet => (
          <div
            key={sheet.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 font-mono">
                    {sheet.languageId.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium capitalize">
                    {sheet.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {sheet.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {sheet.summary}
                </p>
              </div>

              <button
                onClick={() => onNavigate(`#/code-lab?lang=${sheet.languageId}`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition self-start sm:self-auto whitespace-nowrap"
              >
                <span>Open in Code Lab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sheet.sections.map((sec, sIdx) => {
                const secId = `${sheet.id}-sec-${sIdx}`;
                const isCopied = copiedId === secId;

                return (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {sec.title}
                        </h3>
                        <button
                          onClick={() => handleCopy(sec.code, secId)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                        {sec.description}
                      </p>

                      <div className="bg-[#090d16] text-slate-200 rounded-xl p-3 font-mono text-xs overflow-x-auto border border-slate-800/80">
                        <pre className="leading-relaxed">{sec.code}</pre>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
