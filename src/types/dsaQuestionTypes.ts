export type DsaQuestionType = 
  | 'coding' 
  | 'mcq' 
  | 'output-prediction' 
  | 'find-error' 
  | 'theory';

export type DsaQuestionCategory =
  | 'arrays-strings'
  | 'linked-lists'
  | 'stacks-queues'
  | 'hash-tables'
  | 'trees-bst'
  | 'heaps'
  | 'graphs'
  | 'tries'
  | 'searching'
  | 'sorting'
  | 'recursion'
  | 'two-pointers'
  | 'sliding-window'
  | 'bfs-dfs'
  | 'greedy'
  | 'dynamic-programming'
  | 'backtracking';

export interface DsaTestCase {
  id: string;
  input: string; // JSON or raw string e.g. "[2, 7, 11, 15], 9"
  expectedOutput: string; // e.g. "[0, 1]"
  explanation?: string;
  isCustom?: boolean;
}

export interface DsaQuestionItem {
  id: string;
  title: string;
  category: DsaQuestionCategory;
  categoryLabel: string;
  type: DsaQuestionType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  statement: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string[];
  options?: string[]; // for MCQs and output prediction
  correctOptionIndex?: number;
  testCases?: DsaTestCase[]; // for coding problems
  starterCode?: string; // for coding problems
  functionName?: string; // e.g. "twoSum"
  hints: string[];
  explanation: string;
  solutionCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  interviewCompanies?: string[];
}
