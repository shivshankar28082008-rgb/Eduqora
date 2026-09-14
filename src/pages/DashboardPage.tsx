import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Code2, 
  Flame, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Play, 
  Activity, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { lessonService } from '../services/lessonService';
import { projectService } from '../services/projectService';
import { LANGUAGES_DATA } from '../data/languagesData';
import { UserProfile, ActivityItem } from '../types';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<UserProfile>(storageService.getUser());
  const [progress, setProgress] = useState(storageService.getProgress());
  const [activities, setActivities] = useState<ActivityItem[]>(storageService.getActivities());
  const lastVisited = progress.lastVisitedLesson || null;

  useEffect(() => {
    setProfile(storageService.getUser());
    setProgress(storageService.getProgress());
    setActivities(storageService.getActivities());
  }, []);

  const totalLessonsCompleted = progress.completedLessons.length;
  const userProjects = projectService.getProjects();
  const practiceRunsCount = progress.completedChallenges.length * 3 + userProjects.length * 2 + 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Learner Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, {profile.name} <span className="text-2xl sm:text-3xl">👋</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Continue learning where you left off. Every concept you master brings you closer to your ideas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('#/code-lab')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition"
          >
            <Code2 className="w-4 h-4" />
            Open Code Lab
          </button>
        </div>
      </div>

      {/* 5 KEY METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {/* Card 1: Lessons Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalLessonsCompleted}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">Completed</span>
        </div>

        {/* Card 2: Projects */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Projects</span>
            <Code2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {userProjects.length}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">In Workspace</span>
        </div>

        {/* Card 3: Practice Runs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Code Runs</span>
            <Play className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {practiceRunsCount}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">Sandboxes Tested</span>
        </div>

        {/* Card 4: Total XP */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">XP Level</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.xp}
          </p>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1 block">
            Level {profile.level} Developer
          </span>
        </div>

        {/* Card 5: Learning Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Streak</span>
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.streak} Days
          </p>
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1 block">
            Keep the flame alive!
          </span>
        </div>
      </div>

      {/* 2-COLUMN SECTION: Continue Learning & Language Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left 7 cols: Continue Learning & Track Progress */}
        <div className="lg:col-span-7 space-y-6">
          {/* Continue Learning Callout Card */}
          {lastVisited ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-lg border border-indigo-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Last Visited Lesson
                </span>
                <span className="text-xs text-indigo-300 capitalize">{lastVisited.languageId} Track</span>
              </div>
              <h3 className="text-xl font-bold">{lastVisited.title}</h3>
              <p className="text-xs text-indigo-200/80 mt-1">
                Pick right back up and continue building your mastery.
              </p>
              <button
                onClick={() => onNavigate(`#/learn/${lastVisited.languageId}/${lastVisited.lessonId}`)}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition shadow-xs"
              >
                <span>Continue Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold">Start Your First Lesson</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Choose a track like HTML Foundations or JavaScript Deep Dive to begin earning XP.
              </p>
              <button
                onClick={() => onNavigate('#/learn')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
              >
                Browse Curriculum →
              </button>
            </div>
          )}

          {/* Language Progress Bars */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Language Track Progress
              </h3>
              <button
                onClick={() => onNavigate('#/learn')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all tracks
              </button>
            </div>

            <div className="space-y-4">
              {LANGUAGES_DATA.map(lang => {
                const pct = lessonService.getLanguageProgress(lang.id);
                return (
                  <div
                    key={lang.id}
                    onClick={() => onNavigate(`#/learn/${lang.id}`)}
                    className="group cursor-pointer p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <div className="flex items-center gap-2">
                        <span 
                          style={{ backgroundColor: `${lang.color}20`, color: lang.color }}
                          className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] font-mono"
                        >
                          {lang.id.substring(0, 2).toUpperCase()}
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-slate-500 dark:text-slate-400 font-mono">{pct}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Recent Activity Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs h-full">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-emerald-500" />
              Recent Activity
            </h3>

            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No recent activity recorded yet. Start a lesson to log progress!
              </p>
            ) : (
              <div className="space-y-4">
                {activities.map(act => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {act.type === 'lesson_completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                       act.type === 'project_created' ? <Code2 className="w-4 h-4 text-indigo-500" /> :
                       act.type === 'streak_maintained' ? <Flame className="w-4 h-4 text-rose-500" /> :
                       <Award className="w-4 h-4 text-amber-500" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {act.title}
                      </p>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {act.xpGained > 0 && (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        +{act.xpGained} XP
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
