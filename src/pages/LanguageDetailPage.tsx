import React from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Play, ArrowRight, Code2 } from 'lucide-react';
import { lessonService } from '../services/lessonService';
import { LanguageId } from '../types';

interface LanguageDetailPageProps {
  languageId: LanguageId;
  onNavigate: (route: string) => void;
}

export const LanguageDetailPage: React.FC<LanguageDetailPageProps> = ({ languageId, onNavigate }) => {
  const language = lessonService.getLanguageById(languageId);
  const lessons = lessonService.getLessonsByLanguage(languageId);
  const progress = lessonService.getLanguageProgress(languageId);

  if (!language) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Language Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested curriculum track does not exist.</p>
        <button
          onClick={() => onNavigate('#/learn')}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
        >
          ← Return to Library
        </button>
      </div>
    );
  }

  const completedCount = lessons.filter(l => lessonService.isLessonCompleted(l.id)).length;
  const totalMinutes = lessons.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Back button */}
      <button
        onClick={() => onNavigate('#/learn')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Learning Library
      </button>

      {/* Curriculum Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${language.badgeBg}`}>
                {language.difficulty}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ~{totalMinutes} mins total
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {language.name} Curriculum
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {language.description}
            </p>
          </div>

          <button
            onClick={() => onNavigate(`#/code-lab?lang=${language.id}`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition whitespace-nowrap self-start"
          >
            <Code2 className="w-4 h-4" />
            Open {language.name} in Code Lab
          </button>
        </div>

        {/* Progress summary bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">
            <span>Course Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400">{progress}% ({completedCount} of {lessons.length} lessons)</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          Curriculum Modules
        </h2>

        {lessons.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500">
            Lessons for this track are currently being organized.
          </div>
        ) : (
          lessons.map((lesson, idx) => {
            const isCompleted = lessonService.isLessonCompleted(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onNavigate(`#/learn/${language.id}/${lesson.id}`)}
                className={`flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer transition duration-150 ${
                  isCompleted
                    ? 'border-emerald-200/80 dark:border-emerald-950/60 hover:border-emerald-400'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono font-bold text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.2 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex items-center text-xs text-slate-400 font-medium">
                    <Clock className="w-3 h-3 mr-1" /> {lesson.estimatedMinutes}m
                  </span>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
