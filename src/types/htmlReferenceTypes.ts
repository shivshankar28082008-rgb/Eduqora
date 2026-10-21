export type HtmlTagCategory =
  | 'document-structure'
  | 'headings-text'
  | 'inline-text'
  | 'links-media'
  | 'lists'
  | 'tables'
  | 'forms-inputs'
  | 'semantic-html'
  | 'graphics-svg'
  | 'html-apis'
  | 'deprecated-tags'
  | 'attributes'
  | 'events'
  | 'input-types';

export interface HtmlInterviewQuestion {
  question: string;
  answer: string;
  hinglishTip?: string;
}

export interface HtmlPracticeExercise {
  title: string;
  prompt: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
}

export interface CommonMistake {
  mistake: string;
  solution: string;
  explanation: string;
}

export interface HtmlQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface HtmlTagItem {
  id: string;
  name: string; // e.g. "<details>", "class", "onclick", "type='email'"
  syntax: string;
  category: HtmlTagCategory;
  categoryLabel: string;
  shortDesc: string;
  hinglish: string; // Detailed Hinglish/Hindi explanation
  exampleCode: string;
  status?: 'standard' | 'deprecated' | 'declaration' | 'attribute' | 'event' | 'input-type';
  isVoid?: boolean; // Void element: cannot have end tag or child nodes
  selfClosing?: boolean; // legacy alias for isVoid
  closingTagUsage?: string; // e.g. "Required (e.g. </p>)", "Forbidden (Void element)", "Optional in specific table cells"
  supportedAttributes?: string[];
  commonMistakes?: CommonMistake[];
  accessibilityGuidance?: string;
  seoRelevance?: string;
  relatedElements?: string[]; // IDs of related items
  interviewQuestions: HtmlInterviewQuestion[];
  practiceExercise: HtmlPracticeExercise;
  quizQuestions?: HtmlQuizQuestion[];
  isDeprecated?: boolean;
  deprecatedReason?: string;
  modernAlternative?: string;
}
