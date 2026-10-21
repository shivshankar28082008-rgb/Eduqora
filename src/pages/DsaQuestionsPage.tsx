import React, { useState, useEffect } from 'react';
import { 
  Search, 
  HelpCircle, 
  Code2, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Clock, 
  Filter, 
  Sparkles, 
  Lightbulb, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Terminal, 
  Layers, 
  Cpu, 
  CheckSquare, 
  Bug, 
  FileText,
  Sliders
} from 'lucide-react';
import { DSA_QUESTIONS_DATA } from '../data/dsaQuestionsData';
import { DsaQuestionItem, DsaQuestionType } from '../types/dsaQuestionTypes';
import { storageService } from '../services/storageService';
import { useToast } from '../components/Toast';

interface DsaQuestionsPageProps {
  initialQuestionId?: string;
  onNavigate: (route: string) => void;
}

export const DsaQuestionsPage: React.FC<DsaQuestionsPageProps> = ({ initialQuestionId, onNavigate }) => {
  const { toast } = useToast();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected Question
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
    initialQuestionId || DSA_QUESTIONS_DATA[0].id
  );

  const currentQ: DsaQuestionItem = DSA_QUESTIONS_DATA.find(q => q.id === selectedQuestionId) || DSA_QUESTIONS_DATA[0];

  // Solved state tracking from storage
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<string[]>(() => {
    const progress = storageService.getProgress();
    return (progress.completedChallenges || []).filter((id: string) => id.startsWith('dsa-q-')).map(id => id.replace('dsa-q-', ''));
  });

  // MCQ & Theory selection state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);

  // Coding solver state
  const [userCode, setUserCode] = useState<string>(currentQ.starterCode || '');
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [testResults, setTestResults] = useState<Array<{ testId: string; input: string; expected: string; actual: string; passed: boolean }> | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Hints and solutions reveal states
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [copiedSolution, setCopiedSolution] = useState<boolean>(false);

  // Sync state when question changes
  useEffect(() => {
    setUserCode(currentQ.starterCode || '');
    setCodeOutput('');
    setTestResults(null);
    setExecutionTime(null);
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setShowHintIndex(null);
    setShowSolution(false);
  }, [currentQ.id]);

  // Filter list
  const filteredQuestions = DSA_QUESTIONS_DATA.filter(q => {
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;

    return matchesSearch && matchesDiff && matchesType && matchesCat;
  });

  const currentIndex = DSA_QUESTIONS_DATA.findIndex(q => q.id === currentQ.id);
  const prevQ = currentIndex > 0 ? DSA_QUESTIONS_DATA[currentIndex - 1] : null;
  const nextQ = currentIndex < DSA_QUESTIONS_DATA.length - 1 ? DSA_QUESTIONS_DATA[currentIndex + 1] : null;

  // Handle MCQ check
  const handleCheckMcq = () => {
    if (selectedOption === null) {
      toast('Please select an option first.', undefined, 'info');
      return;
    }
    setHasCheckedAnswer(true);

    if (selectedOption === currentQ.correctOptionIndex) {
      toast('Correct answer! +20 XP awarded.', undefined, 'success');
      markQuestionSolved(currentQ.id, 20);
    } else {
      toast('Incorrect answer. Review the explanation below.', undefined, 'error');
    }
  };

  // Safe client-side evaluator for student code against actual test cases
  const handleRunAndSubmit = (isSubmit: boolean = false) => {
    if (!currentQ.testCases || currentQ.testCases.length === 0) return;

    setIsEvaluating(true);
    setCodeOutput('');
    setTestResults(null);

    const start = performance.now();

    try {
      // Build safe execution context
      // eslint-disable-next-line no-new-func
      const runner = new Function(`
        ${userCode}
        if (typeof ${currentQ.functionName} !== 'function') {
          throw new Error('Function ${currentQ.functionName} is not defined.');
        }
        return ${currentQ.functionName};
      `);

      const fn = runner();
      const results: Array<{ testId: string; input: string; expected: string; actual: string; passed: boolean }> = [];
      let allPassed = true;

      for (const tc of currentQ.testCases) {
        // Parse arguments: e.g. input is "[2, 7, 11, 15], 9"
        // eslint-disable-next-line no-new-func
        const argsEvaluator = new Function(`return [${tc.input}];`);
        const args = argsEvaluator();

        const rawResult = fn(...args);
        const actualStr = JSON.stringify(rawResult);
        const expectedNormalized = tc.expectedOutput.replace(/\s+/g, '');
        const actualNormalized = (actualStr || '').replace(/\s+/g, '');

        const passed = actualNormalized === expectedNormalized;
        if (!passed) allPassed = false;

        results.push({
          testId: tc.id,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: actualStr,
          passed
        });
      }

      const elapsed = Math.round(performance.now() - start);
      setExecutionTime(elapsed);
      setTestResults(results);

      if (allPassed) {
        setCodeOutput(`All ${results.length} test cases passed in ${elapsed}ms!\nStatus: Accepted ✓`);
        if (isSubmit) {
          toast('Challenge Solved! Solution Accepted (+40 XP).', undefined, 'success');
          markQuestionSolved(currentQ.id, 40);
        } else {
          toast(`All tests passed in ${elapsed}ms! Click Submit Solution to record progress.`, undefined, 'success');
        }
      } else {
        const failedCount = results.filter(r => !r.passed).length;
        setCodeOutput(`Execution complete in ${elapsed}ms.\nFailed ${failedCount} of ${results.length} test cases.`);
        toast('Some test cases failed. Inspect output below.', undefined, 'error');
      }
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - start);
      setExecutionTime(elapsed);
      setCodeOutput(`Runtime Error: ${err.message}`);
      toast(`Execution error: ${err.message}`, undefined, 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const markQuestionSolved = (qId: string, xpGain: number) => {
    if (!solvedQuestionIds.includes(qId)) {
      const newSolved = [...solvedQuestionIds, qId];
      setSolvedQuestionIds(newSolved);

      const progress = storageService.getProgress();
      if (!progress.completedChallenges) progress.completedChallenges = [];
      progress.completedChallenges.push(`dsa-q-${qId}`);
      storageService.saveProgress(progress);

      const user = storageService.getUser();
      user.xp = (user.xp || 0) + xpGain;
      storageService.saveUser(user);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSolution(true);
    toast('Solution code copied to clipboard', undefined, 'success');
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#070b12] text-white p-6 sm:p-10 border border-indigo-900/60 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Codevaible DSA Q&A Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            DSA Questions, Answers & Code Solver
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed font-normal">
            Master Data Structures & Algorithms with real technical interview problems, multiple-choice questions, output prediction challenges, bug-fixing exercises, and in-browser automated test execution.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-indigo-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span><strong>{solvedQuestionIds.length}</strong> of {DSA_QUESTIONS_DATA.length} Questions Solved</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span><strong>+{solvedQuestionIds.length * 30}</strong> Total Q&A XP Earned</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filters & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems, topics, algorithms..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 border border-transparent focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Question Type Filter */}
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs outline-none"
            >
              <option value="all">All Question Types</option>
              <option value="coding">Coding Problems</option>
              <option value="mcq">Multiple Choice (MCQ)</option>
              <option value="output-prediction">Output Prediction</option>
              <option value="find-error">Find-The-Error</option>
              <option value="theory">Algorithm Theory</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Split View: Question List (Left) + Interactive Question & Solver (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Questions List (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 space-y-2 max-h-[820px] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Questions ({filteredQuestions.length})</span>
            <span className="text-[10px] text-slate-400">Select to Solve</span>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching questions found.
            </div>
          ) : (
            filteredQuestions.map(q => {
              const isSelected = q.id === currentQ.id;
              const isSolved = solvedQuestionIds.includes(q.id);

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestionId(q.id);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 border ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 shadow-xs'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded ${
                        q.difficulty === 'Beginner' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                        q.difficulty === 'Intermediate' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                        'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                      }`}>
                        {q.difficulty}
                      </span>

                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        {q.type.replace('-', ' ')}
                      </span>

                      {isSolved && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                      )}
                    </div>

                    <h4 className={`text-xs font-bold ${
                      isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {q.title}
                    </h4>

                    <span className="text-[11px] text-slate-400">
                      {q.categoryLabel}
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition ${
                    isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 opacity-40'
                  }`} />
                </button>
              );
            })
          )}
        </div>

        {/* Right: Question Inspector & Solver Workbench (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Question Details Header Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {currentQ.categoryLabel}
                </span>

                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                  currentQ.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                  currentQ.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                }`}>
                  {currentQ.difficulty}
                </span>

                <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                  {currentQ.type.replace('-', ' ')}
                </span>
              </div>

              {/* Prev / Next Question Navigation */}
              <div className="flex items-center gap-2">
                {prevQ && (
                  <button
                    onClick={() => setSelectedQuestionId(prevQ.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 text-xs font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300"
                    title={`Previous: ${prevQ.title}`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Prev</span>
                  </button>
                )}
                {nextQ && (
                  <button
                    onClick={() => setSelectedQuestionId(nextQ.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 text-xs font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300"
                    title={`Next: ${nextQ.title}`}
                  >
                    <span className="hidden sm:inline">Next</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {currentQ.title}
            </h2>

            {/* Question Statement */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
              {currentQ.statement}
            </div>

            {/* Input & Output Format */}
            {(currentQ.inputFormat || currentQ.outputFormat) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                {currentQ.inputFormat && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500">Input Format: </span>
                    <code className="text-indigo-600 dark:text-indigo-400 font-mono">{currentQ.inputFormat}</code>
                  </div>
                )}
                {currentQ.outputFormat && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500">Output Format: </span>
                    <code className="text-emerald-600 dark:text-emerald-400 font-mono">{currentQ.outputFormat}</code>
                  </div>
                )}
              </div>
            )}

            {/* Hints Section (Collapsible) */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {currentQ.hints.map((hint, idx) => (
                <button
                  key={idx}
                  onClick={() => setShowHintIndex(showHintIndex === idx ? null : idx)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-semibold"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHintIndex === idx ? `Hide Hint ${idx + 1}` : `💡 Hint ${idx + 1}`}</span>
                </button>
              ))}
            </div>

            {showHintIndex !== null && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-medium">
                <strong>Hint {showHintIndex + 1}: </strong> {currentQ.hints[showHintIndex]}
              </div>
            )}
          </div>

          {/* QUESTION SOLVER: MCQs / Output Prediction / Find Error / Theory Mode */}
          {currentQ.type !== 'coding' && currentQ.options && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-500" />
                Select the Correct Answer:
              </h3>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  let style = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400';
                  if (hasCheckedAnswer) {
                    if (optIdx === currentQ.correctOptionIndex) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (optIdx === selectedOption) {
                      style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
                    }
                  } else if (selectedOption === optIdx) {
                    style = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasCheckedAnswer}
                      onClick={() => setSelectedOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center gap-3 ${style}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleCheckMcq}
                  disabled={hasCheckedAnswer || selectedOption === null}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs shadow-md transition"
                >
                  <Check className="w-4 h-4" /> Check Answer
                </button>

                {hasCheckedAnswer && (
                  <button
                    onClick={() => setShowSolution(prev => !prev)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                  >
                    {showSolution ? 'Hide Explanation' : 'View Full Explanation'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CODING QUESTION SOLVER: In-Browser JavaScript Editor & Test Runner */}
          {currentQ.type === 'coding' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col space-y-4">
              
              {/* Code Toolbar */}
              <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    solution.js (JavaScript)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserCode(currentQ.starterCode || '')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs transition"
                    title="Reset Starter Code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleRunAndSubmit(false)}
                    disabled={isEvaluating}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                    <span>Run Code</span>
                  </button>

                  <button
                    onClick={() => handleRunAndSubmit(true)}
                    disabled={isEvaluating}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition hover:scale-105"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="px-5">
                <textarea
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  spellCheck={false}
                  className="w-full bg-slate-950 text-amber-300 font-mono text-xs p-4 rounded-xl resize-none focus:outline-none min-h-[220px] leading-relaxed border border-slate-800 shadow-inner"
                  placeholder="Write your JavaScript algorithm solution here..."
                />
              </div>

              {/* Test Cases Panel */}
              {currentQ.testCases && currentQ.testCases.length > 0 && (
                <div className="px-5 space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Automated Test Cases:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentQ.testCases.map((tc, idx) => {
                      const res = testResults?.find(r => r.testId === tc.id);
                      return (
                        <div
                          key={tc.id}
                          className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                            res 
                              ? res.passed
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span>Test Case {idx + 1}</span>
                            {res && (
                              <span>{res.passed ? '✓ PASSED' : '✗ FAILED'}</span>
                            )}
                          </div>
                          <div className="text-[11px] truncate">Input: {tc.input}</div>
                          <div className="text-[11px] truncate">Expected: {tc.expectedOutput}</div>
                          {res && !res.passed && (
                            <div className="text-[11px] font-bold text-rose-600">Actual: {res.actual}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Console & Execution Output */}
              {codeOutput && (
                <div className="mx-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-slate-800">
                    <span className="flex items-center gap-1 font-bold text-indigo-400">
                      <Terminal className="w-3 h-3" /> Execution Console
                    </span>
                    {executionTime !== null && <span>Runtime: {executionTime}ms</span>}
                  </div>
                  <pre className="whitespace-pre-wrap">{codeOutput}</pre>
                </div>
              )}

              {/* Toggle Reference Solution */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                <button
                  onClick={() => setShowSolution(prev => !prev)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  {showSolution ? 'Hide Solution & Complexity' : 'View Reference Solution & Complexity'}
                </button>
              </div>
            </div>
          )}

          {/* Reference Solution & Big-O Complexity Panel (Shown upon request or answer check) */}
          {showSolution && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Official Solution & Architectural Explanation
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy(currentQ.solutionCode)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:text-indigo-600"
                >
                  {copiedSolution ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSolution ? 'Copied' : 'Copy Solution'}</span>
                </button>
              </div>

              {/* Big-O Badges */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <strong>Time: </strong> {currentQ.timeComplexity}
                </span>
                <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <strong>Space: </strong> {currentQ.spaceComplexity}
                </span>
              </div>

              {/* Explanation text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>

              {/* Reference Code Box */}
              <pre className="p-4 rounded-xl bg-slate-950 text-amber-300 font-mono text-xs border border-slate-800 overflow-x-auto leading-relaxed">
                <code>{currentQ.solutionCode}</code>
              </pre>
            </div>
          )}

          {/* Bottom Next/Prev Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            {prevQ ? (
              <button
                onClick={() => {
                  setSelectedQuestionId(prevQ.id);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: {prevQ.title}</span>
              </button>
            ) : <div />}

            {nextQ && (
              <button
                onClick={() => {
                  setSelectedQuestionId(nextQ.id);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
              >
                <span>Next: {nextQ.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
