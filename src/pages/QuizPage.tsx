import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Check, 
  X,
  BookOpen,
  Sliders
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useToast } from '../components/Toast';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizTopic {
  id: string;
  title: string;
  category: 'HTML' | 'DSA';
  description: string;
  questions: QuizQuestion[];
}

const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'html-semantics',
    title: 'HTML5 Semantics & Structure Quiz',
    category: 'HTML',
    description: 'Test your mastery of document structure, doctype declarations, and HTML5 semantic tags.',
    questions: [
      {
        id: 'q-html-1',
        question: 'Which HTML5 element represents an independent, self-contained piece of content suitable for syndication (e.g. blog post, product card)?',
        options: ['<section>', '<article>', '<aside>', '<div>'],
        correctIndex: 1,
        explanation: '<article> is intended for independent, distributable content, whereas <section> represents a generic thematic grouping.'
      },
      {
        id: 'q-html-2',
        question: 'What happens if a webpage omits the <!DOCTYPE html> declaration?',
        options: [
          'The browser throws a fatal parser error and halts',
          'The browser triggers "quirks mode" and renders using backwards-compatible legacy bugs',
          'The browser automatically upgrades the page to XHTML 1.0',
          'CSS stylesheets fail to download'
        ],
        correctIndex: 1,
        explanation: 'Omitting <!DOCTYPE html> forces the browser into quirks mode, mimicking outdated 1990s layout behaviors and breaking standard CSS.'
      },
      {
        id: 'q-html-3',
        question: 'Why was the <font> tag removed and deprecated in HTML5?',
        options: [
          'Because modern computers have too many fonts to parse',
          'To strictly enforce separation of concerns: HTML for structure, CSS for presentation',
          'Because JavaScript can render text faster than HTML',
          'It conflicted with SVG text elements'
        ],
        correctIndex: 1,
        explanation: 'HTML defines structure and meaning; CSS defines visual design. Mixing presentation in HTML via <font> harmed accessibility, caching, and maintenance.'
      },
      {
        id: 'q-html-4',
        question: 'Which native HTML5 element creates an expandable/collapsible accordion without needing any JavaScript?',
        options: ['<collapse>', '<accordion>', '<details> and <summary>', '<dialog>'],
        correctIndex: 2,
        explanation: '<details> paired with <summary> provides native disclosure functionality handled directly by the browser rendering engine.'
      },
      {
        id: 'q-html-5',
        question: 'Which method opens an HTML5 <dialog> element as a modal with an accessible backdrop and focus trap?',
        options: ['dialog.open()', 'dialog.show()', 'dialog.showModal()', 'dialog.display()'],
        correctIndex: 2,
        explanation: 'dialog.showModal() activates the top-layer modal state with ::backdrop styling and keyboard focus trapping.'
      }
    ]
  },

  {
    id: 'dsa-arrays-sorting',
    title: 'Arrays, Sorting & Searching Algorithms',
    category: 'DSA',
    description: 'Test your knowledge of time complexities, binary search bounds, and sorting mechanisms.',
    questions: [
      {
        id: 'q-dsa-1',
        question: 'What is the time complexity of accessing an array element by index arr[i]?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        correctIndex: 1,
        explanation: 'Arrays allocate contiguous memory blocks, allowing direct memory address arithmetic in constant O(1) time.'
      },
      {
        id: 'q-dsa-2',
        question: 'In Binary Search, what condition must the array satisfy before running the algorithm?',
        options: [
          'The array must only contain positive integers',
          'The array must be sorted in monotonic order (ascending or descending)',
          'The array must not contain duplicate values',
          'The array length must be a power of 2'
        ],
        correctIndex: 1,
        explanation: 'Binary Search requires a sorted sequence so that each midpoint comparison eliminates half the remaining search space.'
      },
      {
        id: 'q-dsa-3',
        question: 'Which sorting algorithm has a guaranteed O(n log n) time complexity in the worst case and is stable?',
        options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'],
        correctIndex: 1,
        explanation: 'MergeSort always divides in half and merges sorted sub-arrays, maintaining O(n log n) across best, average, and worst cases with stability.'
      },
      {
        id: 'q-dsa-4',
        question: 'What is the space complexity of an in-place Bubble Sort algorithm?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctIndex: 2,
        explanation: 'In-place Bubble Sort swaps elements within the existing array buffer, requiring only O(1) constant auxiliary space.'
      },
      {
        id: 'q-dsa-5',
        question: 'Which algorithm design technique uses two pointers moving from opposite ends of a sorted array toward the center?',
        options: ['Dynamic Programming', 'Two Pointers (Collinear pointers)', 'Breadth-First Search', 'Divide and Conquer'],
        correctIndex: 1,
        explanation: 'The Two Pointers technique leverages sorted order to adjust left and right pointers in O(n) time, frequently used in Two Sum II.'
      }
    ]
  },

  {
    id: 'dsa-trees-graphs',
    title: 'Trees, Graphs & Dynamic Programming',
    category: 'DSA',
    description: 'Test your understanding of BST invariants, BFS/DFS traversal mechanics, and DP optimal substructure.',
    questions: [
      {
        id: 'q-tg-1',
        question: 'In a Binary Search Tree (BST), which traversal visits node values in strictly sorted ascending order?',
        options: ['Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order Traversal'],
        correctIndex: 1,
        explanation: 'Inorder traversal visits (Left Subtree -> Root -> Right Subtree), which naturally yields elements in non-decreasing order for any BST.'
      },
      {
        id: 'q-tg-2',
        question: 'Which data structure is fundamentally used to implement Breadth-First Search (BFS)?',
        options: ['Stack (LIFO)', 'Queue (FIFO)', 'Priority Queue', 'Disjoint Set'],
        correctIndex: 1,
        explanation: 'BFS explores vertices level-by-level in order of discovery, which requires a First-In, First-Out (FIFO) Queue.'
      },
      {
        id: 'q-tg-3',
        question: 'What two key properties must a problem have to be solved using Dynamic Programming?',
        options: [
          'Linear time complexity and binary data',
          'Optimal substructure and overlapping subproblems',
          'Deterministic finite state and recursive loop',
          'Adjacency matrix and topological sort'
        ],
        correctIndex: 1,
        explanation: 'Dynamic Programming applies when larger problems can be solved from optimal solutions of subproblems (optimal substructure) and subproblems recur repeatedly (overlapping subproblems).'
      },
      {
        id: 'q-tg-4',
        question: 'What is the worst-case time complexity of searching a value in an unbalanced/degenerate Binary Search Tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 2,
        explanation: 'If values are inserted in sorted order, the BST degenerates into a linear linked list with depth n, resulting in O(n) search time.'
      }
    ]
  }
];

export const QuizPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { toast } = useToast();

  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>(QUIZ_TOPICS[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);

  const questions = selectedTopic.questions;
  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (quizFinished && !reviewMode) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    const score = calculateScore();
    const xpGained = score * 15;

    const user = storageService.getUser();
    user.xp = (user.xp || 0) + xpGained;
    storageService.saveUser(user);

    toast(`Quiz completed! You scored ${score}/${questions.length} (+${xpGained} XP)`, undefined, 'success');
  };

  const handleRestart = (retryIncorrectOnly: boolean = false) => {
    if (retryIncorrectOnly) {
      // Clear answers only for questions that were wrong
      const newAnswers = { ...selectedAnswers };
      questions.forEach(q => {
        if (newAnswers[q.id] !== q.correctIndex) {
          delete newAnswers[q.id];
        }
      });
      setSelectedAnswers(newAnswers);
    } else {
      setSelectedAnswers({});
    }
    setCurrentQuestionIdx(0);
    setQuizFinished(false);
    setReviewMode(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#070b12] text-white border border-indigo-900/60 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Topic-Wise Knowledge Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          HTML & DSA Interactive Quiz System
        </h1>
        <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
          Challenge your conceptual mastery with immediate feedback, step-by-step technical explanations, score reviews, and XP awards.
        </p>

        {/* Topic Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pt-2 scrollbar-none">
          {QUIZ_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                setCurrentQuestionIdx(0);
                setSelectedAnswers({});
                setQuizFinished(false);
                setReviewMode(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedTopic.id === topic.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs font-bold'
                  : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
              }`}
            >
              <span>{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* QUIZ ACTIVE VIEW */}
      {!quizFinished ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {selectedTopic.category} • Concept Check
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 text-xs font-semibold disabled:opacity-40 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Prev
            </button>

            {currentQuestionIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition"
              >
                <span>Next</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition hover:scale-105"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit & View Results</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RESULTS & REVIEW SCREEN */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6 sm:p-8 space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3 max-w-md mx-auto">
            <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Quiz Completed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              You answered <strong>{score}</strong> out of <strong>{questions.length}</strong> questions correctly ({percentage}%).
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold">
              +{score * 15} Total Assessment XP Earned
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleRestart(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Entire Quiz</span>
            </button>

            {score < questions.length && (
              <button
                onClick={() => handleRestart(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-md"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Retry Incorrect Questions</span>
              </button>
            )}
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Detailed Review & Explanations:
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border text-xs space-y-3 ${
                      isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {isCorrect ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                        )}
                        <span>{idx + 1}. {q.question}</span>
                      </h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="pl-6 space-y-1">
                      <div className="text-slate-600 dark:text-slate-300">
                        <strong>Your Answer: </strong>
                        <span>{userChoice !== undefined ? q.options[userChoice] : 'Not answered'}</span>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                          <strong>Correct Answer: </strong>
                          <span>{q.options[q.correctIndex]}</span>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                        <strong>Explanation: </strong>{q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
