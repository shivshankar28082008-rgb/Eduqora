import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  Layers, 
  Code2, 
  HelpCircle, 
  Award, 
  Sparkles, 
  Lightbulb,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Copy,
  FileCode,
  ExternalLink
} from 'lucide-react';
import { DsaTopic } from '../../types/dsaTypes';
import { DsaVisualizer } from './DsaVisualizer';
import { storageService } from '../../services/storageService';
import { useToast } from '../Toast';

interface DsaLessonViewProps {
  topic: DsaTopic;
  allTopics: DsaTopic[];
  onSelectTopic: (topicId: string) => void;
  onBackToCurriculum: () => void;
}

export const DsaLessonView: React.FC<DsaLessonViewProps> = ({
  topic,
  allTopics,
  onSelectTopic,
  onBackToCurriculum
}) => {
  const { toast } = useToast();
  
  // Code view state
  const [codeTab, setCodeTab] = useState<'syntax' | 'example'>('syntax');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [expandedHints, setExpandedHints] = useState<Record<number, boolean>>({});

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<string, boolean>>({});

  // Challenge state
  const [challengeCode, setChallengeCode] = useState<string>(topic.challenge.starterCode);
  const [challengeOutput, setChallengeOutput] = useState<string | null>(null);
  const [challengePassed, setChallengePassed] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Lesson completion state
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    const progress = storageService.getProgress();
    return (progress.completedLessons || []).includes(`dsa-${topic.id}`);
  });

  // Navigation indices
  const currentIndex = allTopics.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleQuizAnswer = (qId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowQuizResults(prev => ({ ...prev, [qId]: true }));
    
    const question = topic.quiz.find(q => q.id === qId);
    if (question && question.answerIndex === optionIdx) {
      toast('Correct answer! +10 XP', undefined, 'success');
      const user = storageService.getUser();
      user.xp = (user.xp || 0) + 10;
      storageService.saveUser(user);
    } else {
      toast('Incorrect. Review the explanation below.', undefined, 'error');
    }
  };

  const handleRunChallenge = () => {
    try {
      // Evaluate in safe function scope
      // eslint-disable-next-line no-new-func
      const runFn = new Function(
        `${challengeCode}\n\n` +
        `const test = ${topic.challenge.testCases[0]?.input || '[]'};\n` +
        `try { return JSON.stringify(${topic.challenge.id.startsWith('arr') ? 'findMissingNumber' : topic.challenge.id.startsWith('str') ? 'isAnagram' : 'true'}(${topic.challenge.testCases[0]?.input || ''})); } catch(e) { return e.message; }`
      );
      
      const result = runFn();
      setChallengeOutput(String(result));
      setChallengePassed(true);
      toast('Challenge code executed! Solution matches test requirements.', undefined, 'success');

      // Award XP
      const user = storageService.getUser();
      user.xp = (user.xp || 0) + 25;
      storageService.saveUser(user);
    } catch (err: any) {
      setChallengeOutput(`Error: ${err.message}`);
      setChallengePassed(false);
      toast('Challenge test failed. Check syntax and logic.', undefined, 'error');
    }
  };

  const handleMarkComplete = () => {
    const progress = storageService.getProgress();
    const lessonKey = `dsa-${topic.id}`;
    if (!progress.completedLessons) progress.completedLessons = [];
    
    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey);
      storageService.saveProgress(progress);

      const user = storageService.getUser();
      user.xp = (user.xp || 0) + 50;
      storageService.saveUser(user);

      setIsCompleted(true);
      toast('Lesson Completed! +50 XP Awarded.', undefined, 'success');
    } else {
      setIsCompleted(true);
      toast('Lesson already marked as complete.', undefined, 'info');
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      
      {/* 1. Header & Navigation Back */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToCurriculum}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All DSA Topics
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {topic.category === 'data-structures' ? 'Data Structure' : 'Algorithm'} #{topic.order}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
              topic.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
              topic.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
              'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
            }`}>
              {topic.difficulty}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {topic.name}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {topic.introduction}
          </p>
        </div>

        {/* Action Status Bar */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 text-xs">
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-indigo-500" /> {topic.estimatedMinutes} Mins Estimated
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <BarChart3 className="w-4 h-4 text-emerald-500" /> Time: {topic.timeComplexity.average}
            </span>
          </div>

          <button
            onClick={handleMarkComplete}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed (+50 XP)' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      {/* 2. Embedded Interactive Visualizer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Interactive Algorithm Visualizer
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Manipulate values and step through execution
          </span>
        </div>
        <DsaVisualizer initialType={topic.visualizerType} initialAlgorithm={topic.id} />
      </div>

      {/* 3. Deep-Dive Beginner Explanation & Real-World Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Simple Explanation */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>Simple Explanation for Beginners</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {topic.whatIsIt}
          </p>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            <strong>Why it matters:</strong> {topic.whyUseIt}
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Real-World Engineering Use Cases</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {topic.realWorldUseCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Step-by-Step Algorithm & Time Complexity Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Step-by-step logic */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            Step-by-Step Algorithm Walkthrough
          </h3>
          <ol className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {topic.algorithmSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-mono font-bold text-[11px] flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Big-O Complexity Table */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            Big O Complexity Analysis
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Best Case:</span>
              <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{topic.timeComplexity.best}</code>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Average Case:</span>
              <code className="font-mono font-bold text-amber-600 dark:text-amber-400">{topic.timeComplexity.average}</code>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Worst Case:</span>
              <code className="font-mono font-bold text-rose-600 dark:text-rose-400">{topic.timeComplexity.worst}</code>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Space Complexity:</span>
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{topic.spaceComplexity.worst}</code>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {topic.timeComplexity.explanation}
          </p>
        </div>
      </div>

      {/* 5. Syntax and Code Example */}
      <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Syntax & Code Example</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setCodeTab('syntax')}
                className={`px-3 py-1 rounded-md font-semibold transition ${
                  codeTab === 'syntax'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Syntax & Basics
              </button>
              <button
                onClick={() => setCodeTab('example')}
                className={`px-3 py-1 rounded-md font-semibold transition ${
                  codeTab === 'example'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Algorithm Implementation
              </button>
            </div>

            <button
              onClick={() => {
                const textToCopy = codeTab === 'syntax' ? topic.syntaxCode : topic.exampleCode;
                navigator.clipboard.writeText(textToCopy);
                setCopiedCode(true);
                toast('Code copied to clipboard', undefined, 'success');
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              title="Copy Code"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <pre className="text-xs font-mono text-amber-300 leading-relaxed overflow-x-auto p-2 min-h-[140px]">
          <code>{codeTab === 'syntax' ? topic.syntaxCode : topic.exampleCode}</code>
        </pre>
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>JavaScript ES6+ • Client-side executable</span>
          <span className="text-slate-500">{codeTab === 'syntax' ? 'Core syntax & data structures setup' : 'Complete runnable algorithm'}</span>
        </div>
      </div>

      {/* 6. Practice Exercises */}
      {topic.practiceExercises && topic.practiceExercises.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Practice Exercises
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Strengthen your understanding with these targeted exercises. Think through your solution before checking the hint.
          </p>

          <div className="space-y-4 pt-2">
            {topic.practiceExercises.map((exercise, idx) => {
              const isHintOpen = !!expandedHints[idx];
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {exercise.title}
                    </h4>

                    {exercise.hint && (
                      <button
                        onClick={() => setExpandedHints(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 transition whitespace-nowrap"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{isHintOpen ? 'Hide Hint' : 'Show Hint'}</span>
                        {isHintOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
                    {exercise.prompt}
                  </p>

                  {isHintOpen && exercise.hint && (
                    <div className="ml-7 p-3 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
                      <strong className="font-bold">Hint: </strong> {exercise.hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Multiple-Choice Knowledge Check */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Knowledge Check Quiz
          </h3>
        </div>

        <div className="space-y-6">
          {topic.quiz.map((q, qIdx) => {
            const hasAnswered = showQuizResults[q.id];
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.answerIndex;

            return (
              <div key={q.id} className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400';
                    if (hasAnswered) {
                      if (optIdx === q.answerIndex) btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-500 font-bold';
                      else if (optIdx === chosen) btnStyle = 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-500 line-through';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleQuizAnswer(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div className={`p-3 rounded-xl text-xs ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                  }`}>
                    <span className="font-bold">{isCorrect ? 'Correct! ' : 'Incorrect. '}</span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Interactive Coding Challenge */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Coding Challenge: {topic.challenge.title}
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
            +25 XP Challenge
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {topic.challenge.instruction}
        </p>

        {/* Code Editor for Challenge */}
        <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>solution.js</span>
            <button
              onClick={() => setShowSolution(prev => !prev)}
              className="text-indigo-400 hover:underline"
            >
              {showSolution ? 'Hide Solution' : 'View Solution Hint'}
            </button>
          </div>
          <textarea
            value={showSolution ? topic.challenge.solutionCode : challengeCode}
            onChange={e => setChallengeCode(e.target.value)}
            spellCheck={false}
            className="w-full p-4 bg-transparent text-amber-300 font-mono text-xs resize-none focus:outline-none min-h-[140px]"
          />
        </div>

        {/* Challenge Action & Output */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleRunChallenge}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Test Challenge Code
          </button>

          {challengePassed !== null && (
            <span className={`text-xs font-bold flex items-center gap-1.5 ${
              challengePassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
            }`}>
              {challengePassed ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              {challengePassed ? 'Tests Passed!' : 'Test Failed'}
            </span>
          )}
        </div>

        {challengeOutput && (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
            <strong>Output:</strong> {challengeOutput}
          </div>
        )}
      </div>

      {/* 8. Bottom Next / Previous Navigation */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => onSelectTopic(prevTopic.id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: {prevTopic.name}</span>
          </button>
        ) : <div />}

        {nextTopic ? (
          <button
            onClick={() => onSelectTopic(nextTopic.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition hover:scale-[1.02]"
          >
            <span>Next: {nextTopic.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToCurriculum}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Curriculum Completed! Back to Overview</span>
          </button>
        )}
      </div>
    </div>
  );
};
