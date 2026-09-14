import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  Code2, 
  Cpu, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          About Eduqora Lab
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Reinventing How Developers Learn and Build
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
          Eduqora is an open learning platform and interactive in-browser IDE created to eliminate the barrier between reading syntax and writing real software.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Instant Browser Execution
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            No local command-line dependencies, Node setup, or complex compilers required. Run HTML, CSS, JavaScript, and SQL immediately in your browser.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Structured Practice Challenges
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every lesson comes with an automated code test challenge that checks your solution, gives immediate feedback, and awards experience points.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Real Portfolio Projects
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Progress beyond toy snippets. Build multi-file websites, landing pages, and web calculators with our built-in multi-tab project system.
          </p>
        </div>
      </div>

      {/* Brand Mission Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-800/60 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <Logo size={40} showText={false} />
            <span className="text-xl font-bold tracking-tight">Eduqora Coding Learning Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Our Mission: Empower Every Aspiring Developer
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Coding should be approachable, interactive, and rewarding. Whether you are learning your first HTML tag or mastering SQL relational joins, Eduqora provides the clarity and tools you need.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('#/learn')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
            >
              Explore Tracks
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('#/code-lab')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
            >
              Open Browser IDE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
