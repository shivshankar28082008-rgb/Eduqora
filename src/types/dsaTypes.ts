export type DsaCategory = 'data-structures' | 'algorithms';

export type DsaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type DsaVisualizerType = 
  | 'array' 
  | 'sorting' 
  | 'searching' 
  | 'stack' 
  | 'queue' 
  | 'linked-list' 
  | 'tree' 
  | 'graph';

export interface DsaComplexity {
  best: string;
  average: string;
  worst: string;
  explanation: string;
}

export interface DsaSpaceComplexity {
  worst: string;
  explanation: string;
}

export interface DsaQuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface DsaChallengeTestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface DsaCodingChallenge {
  id: string;
  title: string;
  instruction: string;
  starterCode: string;
  solutionCode: string;
  testCases: DsaChallengeTestCase[];
  hints: string[];
}

export interface DsaHtmlVisualizerSnippet {
  html: string;
  css: string;
  js: string;
  explanation: string;
}

export interface DsaTopic {
  id: string;
  slug: string;
  name: string;
  category: DsaCategory;
  difficulty: DsaDifficulty;
  order: number;
  estimatedMinutes: number;
  visualizerType: DsaVisualizerType;
  shortDesc: string;
  introduction: string;
  whatIsIt: string;
  whyUseIt: string;
  realWorldUseCases: string[];
  algorithmSteps: string[];
  syntaxCode: string;
  exampleCode: string;
  timeComplexity: DsaComplexity;
  spaceComplexity: DsaSpaceComplexity;
  practiceExercises: Array<{
    title: string;
    prompt: string;
    hint: string;
  }>;
  quiz: DsaQuizQuestion[];
  challenge: DsaCodingChallenge;
  htmlVisualizerSnippet: DsaHtmlVisualizerSnippet;
}

export interface VisualizerStep {
  array?: number[];
  activeIndices?: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  foundIndex?: number;
  pointers?: Record<string, number>;
  description: string;
  comparisonsCount: number;
  swapsCount: number;
  operationType?: string;
  auxiliaryData?: any;
}
