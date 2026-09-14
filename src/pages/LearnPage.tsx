import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, CheckCircle, BarChart3, Filter } from 'lucide-react';
import { LANGUAGES_DATA } from '../data/languagesData';
import { lessonService } from '../services/lessonService';
import { LanguageIcon } from '../components/LanguageIcon';
import { DifficultyLevel } from '../types';

interface LearnPageProps {
  onNavigate: (route: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredLanguages = LANGUAGES_DATA.filter(lang => {
    const matchesSearch = 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDiff = selectedDifficulty === 'all' || lang.difficulty === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          Eduqora Curriculums
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Learning Library
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 mt-2">
          Clear explanations. Practical examples. Learn by building. Pick a language to view its complete modular curriculum.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search language or skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 border border-transparent focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Difficulty:</span>
          {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                selectedDifficulty === diff
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {diff === 'all' ? 'All Difficulties' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Language Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLanguages.map(lang => {
          const progress = lessonService.getLanguageProgress(lang.id);
          const lessons = lessonService.getLessonsByLanguage(lang.id);

          return (
            <div
              key={lang.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div 
                    style={{ backgroundColor: `${lang.color}15`, borderColor: `${lang.color}30` }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                  >
                    <LanguageIcon id={lang.id} size={28} />
                  </div>

                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${lang.badgeBg}`}>
                    {lang.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {lang.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {lang.description}
                </p>

                {/* Progress bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">
                    <span>Progress</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang.lessonCount} Lessons Available
                </span>
                <button
                  onClick={() => onNavigate(`#/learn/${lang.id}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-indigo-600 dark:hover:bg-indigo-600 text-xs font-semibold transition"
                >
                  <span>Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
