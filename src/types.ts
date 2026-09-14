export type LanguageId = 
  | 'html' 
  | 'css' 
  | 'javascript' 
  | 'python' 
  | 'c' 
  | 'cpp' 
  | 'java' 
  | 'php' 
  | 'sql';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LanguageInfo {
  id: LanguageId;
  name: string;
  shortDesc: string;
  description: string;
  difficulty: DifficultyLevel;
  lessonCount: number;
  color: string;
  badgeBg: string;
  iconName: string;
  popular?: boolean;
}

export interface PracticeChallenge {
  title: string;
  instruction: string;
  starterCode: string;
  solutionHint?: string;
  testType: 'output' | 'dom' | 'keyword' | 'custom';
  expectedKeyword?: string;
  expectedOutput?: string;
  domSelector?: string;
  domCheckProperty?: string;
  domExpectedValue?: string;
}

export interface Lesson {
  id: string;
  languageId: LanguageId;
  order: number;
  title: string;
  slug: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  whatIsIt: string;
  whyUseIt: string;
  syntax: string;
  exampleCode: string;
  cssCode?: string;
  jsCode?: string;
  expectedOutput: string;
  explanation: string;
  importantNotes: string[];
  commonMistakes: string[];
  practice?: PracticeChallenge;
}

export interface ProjectFile {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'python' | 'c' | 'cpp' | 'java' | 'php' | 'sql' | 'text';
  content: string;
  isEntry?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  language: LanguageId;
  files: ProjectFile[];
  createdAt: number;
  updatedAt: number;
  isTemplate?: boolean;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  language: LanguageId;
  badge: string;
  icon: string;
  files: Array<{ name: string; language: ProjectFile['language']; content: string; isEntry?: boolean }>;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  joinedDate: string;
  settings: {
    theme: 'light' | 'dark';
    editorFontSize: number;
    editorTheme: 'dark' | 'light';
    autoRun: boolean;
  };
}

export interface ActivityItem {
  id: string;
  timestamp: number;
  type: 'lesson_completed' | 'practice_solved' | 'project_created' | 'streak_maintained';
  title: string;
  detail: string;
  xpGained: number;
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids e.g. "html-intro", "js-functions"
  completedChallenges: string[];
  lastVisitedLesson?: {
    languageId: LanguageId;
    lessonId: string;
    title: string;
  };
  languageProgress: Record<LanguageId, number>; // percentages 0 - 100
}

export interface ConsoleOutputMessage {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error' | 'success';
  text: string;
  timestamp: string;
  file?: string;
  line?: number;
  column?: number;
}

export interface CheatSheetResource {
  id: string;
  languageId: LanguageId;
  title: string;
  category: string;
  summary: string;
  sections: Array<{
    title: string;
    description: string;
    code: string;
  }>;
}

export interface SearchResultItem {
  id: string;
  type: 'lesson' | 'language' | 'concept' | 'project' | 'resource';
  title: string;
  subtitle: string;
  description: string;
  url: string;
  languageId?: LanguageId;
  difficulty?: DifficultyLevel;
}

export type RecentActivityItem = ActivityItem;
export type CheatSheetItem = CheatSheetResource;
