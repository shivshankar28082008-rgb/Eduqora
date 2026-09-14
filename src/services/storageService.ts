import { UserProfile, Project, UserProgress, ActivityItem } from '../types';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';

const KEYS = {
  USER: 'eduqora_user',
  PROJECTS: 'eduqora_projects',
  PROGRESS: 'eduqora_progress',
  ACTIVITIES: 'eduqora_activities',
  THEME: 'eduqora_theme',
};

const DEFAULT_USER: UserProfile = {
  id: 'usr_eduqora_demo',
  name: 'Alex Rivera',
  email: 'alex.rivera@eduqora.dev',
  level: 3,
  xp: 380,
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  joinedDate: '2026-01-15',
  settings: {
    theme: 'dark',
    editorFontSize: 14,
    editorTheme: 'dark',
    autoRun: true,
  },
};

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: ['html-intro', 'html-document-structure', 'css-intro'],
  completedChallenges: ['html-intro'],
  lastVisitedLesson: {
    languageId: 'html',
    lessonId: 'html-headings-paragraphs',
    title: 'Headings & Paragraphs',
  },
  languageProgress: {
    html: 35,
    css: 20,
    javascript: 15,
    python: 10,
    sql: 15,
    c: 0,
    cpp: 0,
    java: 0,
    php: 0,
  },
};

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    timestamp: Date.now() - 3600000 * 4,
    type: 'lesson_completed',
    title: 'Completed HTML Document Structure',
    detail: 'Understood <!DOCTYPE html>, head metadata, and body elements.',
    xpGained: 10,
  },
  {
    id: 'act-2',
    timestamp: Date.now() - 3600000 * 18,
    type: 'project_created',
    title: 'Created Modern Calculator Project',
    detail: 'Initialized calculator app with HTML/CSS/JS in Code Lab.',
    xpGained: 50,
  },
  {
    id: 'act-3',
    timestamp: Date.now() - 86400000,
    type: 'streak_maintained',
    title: 'Maintained 5-Day Learning Streak',
    detail: 'Logged in and completed practice on consecutive days.',
    xpGained: 20,
  },
];

function seedDefaultProjects(): Project[] {
  return PROJECT_TEMPLATES.map((tmpl, idx) => ({
    id: 'proj-' + tmpl.id,
    title: tmpl.title,
    description: tmpl.description,
    language: tmpl.language,
    files: tmpl.files.map((f, fIdx) => ({
      id: `f-${tmpl.id}-${fIdx}`,
      name: f.name,
      language: f.language,
      content: f.content,
      isEntry: f.isEntry,
    })),
    createdAt: Date.now() - (idx + 1) * 86400000,
    updatedAt: Date.now() - idx * 3600000,
  }));
}

export const storageService = {
  getUser(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.USER);
      if (data) return JSON.parse(data);
      localStorage.setItem(KEYS.USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  saveUser(user: UserProfile): void {
    try {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage saveUser error', e);
    }
  },

  getProgress(): UserProgress {
    try {
      const data = localStorage.getItem(KEYS.PROGRESS);
      if (data) return JSON.parse(data);
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  },

  saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage saveProgress error', e);
    }
  },

  resetProgress(): void {
    try {
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(DEFAULT_PROGRESS));
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(DEFAULT_ACTIVITIES));
      const user = this.getUser();
      this.saveUser({ ...user, level: 1, xp: 0 });
    } catch (e) {
      console.warn('LocalStorage resetProgress error', e);
    }
  },

  getProjects(): Project[] {
    try {
      const data = localStorage.getItem(KEYS.PROJECTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const seeded = seedDefaultProjects();
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(seeded));
      return seeded;
    } catch {
      return seedDefaultProjects();
    }
  },

  saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage saveProjects error', e);
    }
  },

  getActivities(): ActivityItem[] {
    try {
      const data = localStorage.getItem(KEYS.ACTIVITIES);
      if (data) return JSON.parse(data);
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(DEFAULT_ACTIVITIES));
      return DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  },

  addActivity(activity: Omit<ActivityItem, 'id' | 'timestamp'>): void {
    try {
      const current = this.getActivities();
      const newItem: ActivityItem = {
        ...activity,
        id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        timestamp: Date.now(),
      };
      const updated = [newItem, ...current].slice(0, 30);
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage addActivity error', e);
    }
  },

  getTheme(): 'light' | 'dark' {
    try {
      const val = localStorage.getItem(KEYS.THEME);
      if (val === 'light' || val === 'dark') return val;
      return 'dark'; // Defaulting to sleek developer dark mode
    } catch {
      return 'dark';
    }
  },

  saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(KEYS.THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('LocalStorage saveTheme error', e);
    }
  },
};
