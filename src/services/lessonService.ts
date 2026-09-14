import { LanguageId, LanguageInfo, Lesson } from '../types';
import { LANGUAGES_DATA } from '../data/languagesData';
import { LESSONS_DATA } from '../data/lessonsData';
import { storageService } from './storageService';
import { authService } from './authService';

export const lessonService = {
  getLanguages(): LanguageInfo[] {
    return LANGUAGES_DATA;
  },

  getLanguageById(id: LanguageId | string): LanguageInfo | undefined {
    return LANGUAGES_DATA.find(l => l.id === id);
  },

  getLessonsByLanguage(languageId: LanguageId | string): Lesson[] {
    return LESSONS_DATA.filter(l => l.languageId === languageId).sort((a, b) => a.order - b.order);
  },

  getLessonById(lessonId: string): Lesson | undefined {
    return LESSONS_DATA.find(l => l.id === lessonId);
  },

  getLessonBySlug(languageId: LanguageId, slug: string): Lesson | undefined {
    return LESSONS_DATA.find(l => l.languageId === languageId && l.slug === slug);
  },

  getNextLesson(currentLessonId: string): Lesson | null {
    const current = this.getLessonById(currentLessonId);
    if (!current) return null;
    const siblings = this.getLessonsByLanguage(current.languageId);
    const currentIndex = siblings.findIndex(l => l.id === currentLessonId);
    if (currentIndex >= 0 && currentIndex < siblings.length - 1) {
      return siblings[currentIndex + 1];
    }
    return null;
  },

  getPrevLesson(currentLessonId: string): Lesson | null {
    const current = this.getLessonById(currentLessonId);
    if (!current) return null;
    const siblings = this.getLessonsByLanguage(current.languageId);
    const currentIndex = siblings.findIndex(l => l.id === currentLessonId);
    if (currentIndex > 0) {
      return siblings[currentIndex - 1];
    }
    return null;
  },

  isLessonCompleted(lessonId: string): boolean {
    const progress = storageService.getProgress();
    return progress.completedLessons.includes(lessonId);
  },

  markLessonCompleted(lessonId: string): { completed: boolean; xpGained: number } {
    const progress = storageService.getProgress();
    const lesson = this.getLessonById(lessonId);
    if (!lesson) return { completed: false, xpGained: 0 };

    if (progress.completedLessons.includes(lessonId)) {
      return { completed: true, xpGained: 0 };
    }

    const updatedCompleted = [...progress.completedLessons, lessonId];
    
    // Calculate new language progress
    const langLessons = this.getLessonsByLanguage(lesson.languageId);
    const completedInLang = langLessons.filter(l => updatedCompleted.includes(l.id)).length;
    const percentage = Math.min(100, Math.round((completedInLang / Math.max(1, langLessons.length)) * 100));

    const updatedProgress = {
      ...progress,
      completedLessons: updatedCompleted,
      lastVisitedLesson: {
        languageId: lesson.languageId,
        lessonId: lesson.id,
        title: lesson.title,
      },
      languageProgress: {
        ...progress.languageProgress,
        [lesson.languageId]: percentage,
      },
    };
    storageService.saveProgress(updatedProgress);

    const xpGained = 20;
    authService.addXP(xpGained, `Completed ${lesson.title}`);
    authService.checkStreak();

    storageService.addActivity({
      type: 'lesson_completed',
      title: `Completed ${lesson.title}`,
      detail: `Mastered ${lesson.title} in ${lesson.languageId.toUpperCase()} curriculum.`,
      xpGained,
    });

    return { completed: true, xpGained };
  },

  getLanguageProgress(languageId: LanguageId): number {
    const progress = storageService.getProgress();
    if (progress.languageProgress[languageId] !== undefined) {
      return progress.languageProgress[languageId];
    }
    const all = this.getLessonsByLanguage(languageId);
    if (all.length === 0) return 0;
    const done = all.filter(l => progress.completedLessons.includes(l.id)).length;
    return Math.round((done / all.length) * 100);
  },

  setLastVisited(languageId: LanguageId, lessonId: string, title: string): void {
    const progress = storageService.getProgress();
    storageService.saveProgress({
      ...progress,
      lastVisitedLesson: { languageId, lessonId, title },
    });
  },

  getLastVisited(): { languageId: LanguageId; lessonId: string; title: string } | null {
    const progress = storageService.getProgress();
    return progress.lastVisitedLesson || null;
  }
};
