import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Search, 
  Sliders, 
  Layers, 
  GitBranch, 
  Database, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter,
  Flame,
  Award,
  BookOpen,
  Terminal,
  HelpCircle,
  Play
} from 'lucide-react';
import { DSA_TOPICS } from '../data/dsaData';
import { DsaTopic, DsaCategory, DsaDifficulty } from '../types/dsaTypes';
import { DsaVisualizer } from '../components/dsa/DsaVisualizer';
import { DsaPlayground } from '../components/dsa/DsaPlayground';
import { DsaHtmlVisualizerLab } from '../components/dsa/DsaHtmlVisualizerLab';
import { DsaLessonView } from '../components/dsa/DsaLessonView';
import { storageService } from '../services/storageService';

interface DsaPageProps {
  initialTopicId?: string;
  onNavigate: (route: string) => void;
}

export const DsaPage: React.FC<DsaPageProps> = ({ initialTopicId, onNavigate }) => {
  // Navigation mode: curriculum | visualizer | playground | html-lab | lesson
  const [activeTab, setActiveTab] = useState<'curriculum' | 'visualizer' | 'playground' | 'html-lab'>(
    initialTopicId ? 'curriculum' : 'curriculum'
  );
  
  // Selected topic for lesson view
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(initialTopicId || null);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | DsaCategory>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DsaDifficulty>('all');

  // Track completed lessons from storage
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  useEffect(() => {
    const progress = storageService.getProgress();
    const completed = (progress.completedLessons || [])
      .filter((id: string) => id.startsWith('dsa-'))
      .map((id: string) => id.replace('dsa-', ''));
    setCompletedTopicIds(completed);
  }, [selectedTopicId]);

  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  // Filter topics
  const filteredTopics = DSA_TOPICS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const completionPercentage = Math.round((completedTopicIds.length / DSA_TOPICS.length) * 100);

  // If a topic is selected, render the deep-dive lesson view
  if (selectedTopicId) {
    const currentTopic = DSA_TOPICS.find(t => t.id === selectedTopicId) || DSA_TOPICS[0];
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DsaLessonView
          topic={currentTopic}
          allTopics={DSA_TOPICS}
          onSelectTopic={id => {
            setSelectedTopicId(id);
            window.location.hash = `#/dsa/${id}`;
            window.scrollTo(0, 0);
          }}
          onBackToCurriculum={() => {
            setSelectedTopicId(null);
            window.location.hash = '#/dsa';
            window.scrollTo(0, 0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      
      {/* 1. HERO HEADER WITH MANDATED TITLE & BRANDING */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#070b12] text-white p-6 sm:p-10 border border-indigo-900/60 shadow-xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Network className="w-3.5 h-3.5" />
            <span>Codevaible DSA Lab</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            DSA with HTML — Learn, Visualize, and Practice
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed font-normal">
            Learn Data Structures and Algorithms through interactive HTML visualizations, JavaScript implementations, coding challenges, and practical examples.
          </p>

          {/* Technical Clarification Callout */}
          <div className="mt-4 p-4 rounded-xl bg-indigo-900/40 border border-indigo-700/50 backdrop-blur-sm flex items-start gap-3 text-xs text-indigo-100">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Technical Architecture:</strong> HTML is used to structure the DSA learning interface, CSS styles the visualizations and layout transitions, and JavaScript implements and executes DSA algorithms in the browser.
            </p>
          </div>

          {/* Progress Overview Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-indigo-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span><strong>{completedTopicIds.length}</strong> of {DSA_TOPICS.length} Topics Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span><strong>{completionPercentage}%</strong> Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span><strong>+{completedTopicIds.length * 50}</strong> Total DSA XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABBED WORKSPACE SWITCHER */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'curriculum', label: 'All 27 Topics & Lessons', icon: BookOpen, count: 27 },
          { id: 'visualizer', label: 'Interactive Visualizer Studio', icon: Sliders, badge: 'LIVE' },
          { id: 'playground', label: 'DSA Code Lab', icon: Terminal },
          { id: 'html-lab', label: 'DSA Visualizer with HTML', icon: Code2, badge: 'LAB' },
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                active
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-extrabold uppercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CURRICULUM VIEW */}
      {activeTab === 'curriculum' && (
        <div className="space-y-8">
          {/* Search & Topic Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics (e.g. Binary Search, Linked Lists, Bubble Sort, BFS)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            {/* Category Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Topics' },
                { id: 'data-structures', label: 'Data Structures (12)' },
                { id: 'algorithms', label: 'Algorithms (15)' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff === 'all' ? 'All Levels' : diff}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map(topic => {
              const isCompleted = completedTopicIds.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    window.location.hash = `#/dsa/${topic.id}`;
                    window.scrollTo(0, 0);
                  }}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 hover:border-indigo-500/50 cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {topic.category === 'data-structures' ? 'Data Structure' : 'Algorithm'} #{topic.order}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          topic.difficulty === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' :
                          topic.difficulty === 'Intermediate' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' :
                          'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                        }`}>
                          {topic.difficulty}
                        </span>

                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {topic.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {topic.shortDesc}
                    </p>
                  </div>

                  {/* Card Meta & Bottom CTA */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                      <span>Time: <strong className="text-slate-700 dark:text-slate-300">{topic.timeComplexity.best}</strong></span>
                      <span>Space: <strong className="text-slate-700 dark:text-slate-300">{topic.spaceComplexity.worst}</strong></span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                      Learn & Practice <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTopics.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No topics found</h4>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or switching filters.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERACTIVE VISUALIZER STUDIO */}
      {activeTab === 'visualizer' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-500" />
                DSA Visualizer Studio
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Watch algorithm steps execute in real-time. Use play/pause, step controls, and editable values.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Keyboard: <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Space</kbd> = Play/Pause, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">&larr; / &rarr;</kbd> = Step
            </div>
          </div>

          <DsaVisualizer />
        </div>
      )}

      {/* TAB 3: DSA CODE LAB */}
      {activeTab === 'playground' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-500" />
              Interactive DSA Code Lab
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Write, edit, and execute JavaScript DSA algorithms directly inside the browser with live HTML output.
            </p>
          </div>

          <DsaPlayground />
        </div>
      )}

      {/* TAB 4: DSA VISUALIZER WITH HTML LAB */}
      {activeTab === 'html-lab' && (
        <DsaHtmlVisualizerLab />
      )}

    </div>
  );
};
