import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Search, 
  GitBranch, 
  Database,
  ArrowRight,
  Plus,
  Trash2,
  Eye,
  Shuffle
} from 'lucide-react';
import { dsaAlgorithmEngine, DsaEngineStep } from './dsaAlgorithmEngine';
import { DsaVisualizerType } from '../../types/dsaTypes';

interface DsaVisualizerProps {
  initialType?: DsaVisualizerType;
  initialAlgorithm?: string;
  className?: string;
}

export const DsaVisualizer: React.FC<DsaVisualizerProps> = ({
  initialType = 'sorting',
  initialAlgorithm = 'bubble-sort',
  className = ''
}) => {
  // Mode selection
  const [activeTab, setActiveTab] = useState<'sorting' | 'searching' | 'stack' | 'queue' | 'linked-list' | 'tree' | 'graph'>(
    initialType === 'array' ? 'sorting' :
    initialType === 'searching' ? 'searching' :
    initialType === 'stack' ? 'stack' :
    initialType === 'queue' ? 'queue' :
    initialType === 'linked-list' ? 'linked-list' :
    initialType === 'tree' ? 'tree' :
    initialType === 'graph' ? 'graph' : 'sorting'
  );

  // Sub-algorithm selections
  const [sortingAlgo, setSortingAlgo] = useState<'bubble' | 'selection' | 'insertion'>('bubble');
  const [searchingAlgo, setSearchingAlgo] = useState<'linear' | 'binary'>('binary');
  const [searchTarget, setSearchTarget] = useState<number>(42);
  const [treeTraversal, setTreeTraversal] = useState<'inorder' | 'preorder' | 'postorder' | 'levelorder'>('inorder');
  const [graphAlgo, setGraphAlgo] = useState<'bfs' | 'dfs'>('bfs');

  // Array state
  const [arrayInput, setArrayInput] = useState<string>('29, 10, 14, 37, 13, 8, 45, 22');
  const [customArray, setCustomArray] = useState<number[]>([29, 10, 14, 37, 13, 8, 45, 22]);

  // Stack state
  const [stackState, setStackState] = useState<number[]>([15, 28, 42]);
  const [stackInputVal, setStackInputVal] = useState<number>(55);

  // Queue state
  const [queueState, setQueueState] = useState<number[]>([10, 20, 30, 40]);
  const [queueInputVal, setQueueInputVal] = useState<number>(50);

  // Linked list state
  const [linkedList, setLinkedList] = useState<Array<{ id: string; val: number }>>([
    { id: '1', val: 12 },
    { id: '2', val: 24 },
    { id: '3', val: 36 },
    { id: '4', val: 48 }
  ]);
  const [listInputVal, setListInputVal] = useState<number>(60);
  const [activeListNode, setActiveListNode] = useState<string | null>(null);

  // Engine playback state
  const [steps, setSteps] = useState<DsaEngineStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 2x, 4x

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to parse array
  const parseArray = (str: string): number[] => {
    return str
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n > 0 && n <= 100);
  };

  const generateRandomArray = () => {
    const len = 8;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 85) + 10);
    setCustomArray(arr);
    setArrayInput(arr.join(', '));
  };

  // Re-generate steps when configuration changes
  const rebuildSteps = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    if (activeTab === 'sorting') {
      if (sortingAlgo === 'bubble') {
        setSteps(dsaAlgorithmEngine.generateBubbleSortSteps(customArray));
      } else if (sortingAlgo === 'selection') {
        setSteps(dsaAlgorithmEngine.generateSelectionSortSteps(customArray));
      } else {
        setSteps(dsaAlgorithmEngine.generateInsertionSortSteps(customArray));
      }
    } else if (activeTab === 'searching') {
      if (searchingAlgo === 'linear') {
        setSteps(dsaAlgorithmEngine.generateLinearSearchSteps(customArray, searchTarget));
      } else {
        setSteps(dsaAlgorithmEngine.generateBinarySearchSteps(customArray, searchTarget));
      }
    } else if (activeTab === 'tree') {
      setSteps(dsaAlgorithmEngine.generateBstTraversalSteps([50, 30, 70, 20, 40, 60, 80], treeTraversal));
    } else if (activeTab === 'graph') {
      setSteps(dsaAlgorithmEngine.generateGraphTraversalSteps(graphAlgo, 'A'));
    } else {
      setSteps([]);
    }
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    rebuildSteps();
  }, [activeTab, sortingAlgo, searchingAlgo, searchTarget, customArray, treeTraversal, graphAlgo]);

  // Animation player loop
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(150, 1000 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steps.length]);

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const currentStep = steps[currentStepIdx] || {
    step: 0,
    description: 'Ready.',
    comparisons: 0,
    swaps: 0,
    array: customArray,
    status: 'running'
  };

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      
      {/* 1. Header Toolbar */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-3.5 bg-slate-50/80 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {[
            { id: 'sorting', label: 'Sorting', icon: Sliders },
            { id: 'searching', label: 'Searching', icon: Search },
            { id: 'stack', label: 'Stack (LIFO)', icon: Layers },
            { id: 'queue', label: 'Queue (FIFO)', icon: ArrowRight },
            { id: 'linked-list', label: 'Linked List', icon: GitBranch },
            { id: 'tree', label: 'Binary Tree', icon: GitBranch },
            { id: 'graph', label: 'Graph (BFS/DFS)', icon: Database },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Speed Controls & Mode Badge */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium hidden sm:inline">Speed:</span>
          <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 rounded-lg p-0.5">
            {[0.5, 1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition ${
                  playbackSpeed === s
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Sub-Algorithm & Input Customization Bar */}
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Specific algorithm selector */}
        {activeTab === 'sorting' && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Algorithm:</span>
            <div className="flex gap-1.5">
              {[
                { id: 'bubble', label: 'Bubble Sort' },
                { id: 'selection', label: 'Selection Sort' },
                { id: 'insertion', label: 'Insertion Sort' }
              ].map(algo => (
                <button
                  key={algo.id}
                  onClick={() => setSortingAlgo(algo.id as any)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    sortingAlgo === algo.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {algo.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'searching' && (
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {[
                { id: 'binary', label: 'Binary Search (Sorted)' },
                { id: 'linear', label: 'Linear Search' }
              ].map(algo => (
                <button
                  key={algo.id}
                  onClick={() => setSearchingAlgo(algo.id as any)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    searchingAlgo === algo.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {algo.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Target:</span>
              <input
                type="number"
                value={searchTarget}
                onChange={e => setSearchTarget(parseInt(e.target.value, 10) || 0)}
                className="w-16 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-indigo-600 dark:text-indigo-400"
              />
            </div>
          </div>
        )}

        {activeTab === 'tree' && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Traversal:</span>
            <div className="flex gap-1.5">
              {[
                { id: 'inorder', label: 'Inorder (L-Root-R)' },
                { id: 'preorder', label: 'Preorder (Root-L-R)' },
                { id: 'postorder', label: 'Postorder (L-R-Root)' },
                { id: 'levelorder', label: 'Level-Order (BFS)' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTreeTraversal(t.id as any)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    treeTraversal === t.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'graph' && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Algorithm:</span>
            <div className="flex gap-1.5">
              {[
                { id: 'bfs', label: 'Breadth-First Search (Queue)' },
                { id: 'dfs', label: 'Depth-First Search (Stack)' },
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => setGraphAlgo(g.id as any)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    graphAlgo === g.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Array data editor (for sorting & searching) */}
        {(activeTab === 'sorting' || activeTab === 'searching') && (
          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <input
              type="text"
              value={arrayInput}
              onChange={e => {
                setArrayInput(e.target.value);
                const parsed = parseArray(e.target.value);
                if (parsed.length >= 2) setCustomArray(parsed);
              }}
              placeholder="e.g. 25, 10, 45, 8"
              className="px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono w-48 sm:w-56"
            />
            <button
              onClick={generateRandomArray}
              title="Generate Random Array"
              className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Main Stage Canvas */}
      <div className="p-6 sm:p-8 flex-1 min-h-[280px] sm:min-h-[320px] flex flex-col justify-center items-center bg-[#fafbfc] dark:bg-[#090d16] select-none overflow-x-auto relative">
        
        {/* Stage A: SORTING & SEARCHING ARRAY VISUALIZER */}
        {(activeTab === 'sorting' || activeTab === 'searching') && (
          <div className="w-full flex flex-col items-center justify-end gap-6 max-w-2xl py-4">
            
            {/* Visual Bars Container */}
            <div className="flex items-end justify-center gap-2 sm:gap-3.5 h-52 w-full px-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-2">
              {(currentStep.array || customArray).map((val, idx) => {
                const maxVal = Math.max(...(currentStep.array || customArray), 100);
                const heightPercent = Math.max(18, Math.min(100, (val / maxVal) * 100));

                const isComparing = currentStep.comparingIndices?.includes(idx);
                const isSwapping = currentStep.swappingIndices?.includes(idx);
                const isSorted = currentStep.sortedIndices?.includes(idx);
                const isFound = currentStep.foundIndex === idx;
                const isEliminated = currentStep.eliminatedIndices?.includes(idx);

                let barColor = 'bg-indigo-500 dark:bg-indigo-600';
                if (isComparing) barColor = 'bg-amber-400 dark:bg-amber-500 shadow-md shadow-amber-500/30 scale-[1.04]';
                if (isSwapping) barColor = 'bg-rose-500 dark:bg-rose-600 shadow-md shadow-rose-500/30 animate-pulse';
                if (isSorted) barColor = 'bg-emerald-500 dark:bg-emerald-600';
                if (isFound) barColor = 'bg-emerald-500 ring-4 ring-emerald-400/50 scale-110';
                if (isEliminated) barColor = 'bg-slate-300 dark:bg-slate-800 opacity-30';

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[48px] group transition-all duration-200">
                    {/* Value Badge */}
                    <span className={`text-[11px] font-mono font-bold transition-all ${
                      isComparing ? 'text-amber-600 dark:text-amber-400 scale-110' :
                      isSwapping ? 'text-rose-600 dark:text-rose-400 scale-110' :
                      isFound ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-125' :
                      'text-slate-700 dark:text-slate-300'
                    }`}>
                      {val}
                    </span>

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-200 flex items-center justify-center ${barColor}`}
                    />

                    {/* Index Label */}
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Pointers Banner */}
            {currentStep.pointers && Object.keys(currentStep.pointers).length > 0 && (
              <div className="flex items-center gap-4 text-xs font-mono">
                {Object.entries(currentStep.pointers).map(([ptr, idx]) => (
                  <span key={ptr} className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 font-bold">
                    {ptr.toUpperCase()}: Index {idx}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stage B: STACK VISUALIZER */}
        {activeTab === 'stack' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {/* Interactive Control Row */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stackInputVal}
                onChange={e => setStackInputVal(parseInt(e.target.value, 10) || 0)}
                className="w-20 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-sm"
              />
              <button
                onClick={() => {
                  setStackState(prev => [...prev, stackInputVal]);
                  setStackInputVal(Math.floor(Math.random() * 90 + 10));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition"
              >
                <Plus className="w-3.5 h-3.5" /> Push
              </button>
              <button
                onClick={() => {
                  if (stackState.length > 0) {
                    setStackState(prev => prev.slice(0, prev.length - 1));
                  }
                }}
                disabled={stackState.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" /> Pop
              </button>
              <button
                onClick={() => setStackState([])}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs transition"
              >
                Clear
              </button>
            </div>

            {/* Stack Tube */}
            <div className="w-48 min-h-[220px] border-4 border-slate-400 dark:border-slate-700 border-t-0 rounded-b-2xl p-3 flex flex-col-reverse justify-start gap-2.5 bg-slate-100/40 dark:bg-slate-900/40">
              {stackState.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-xs text-slate-400 font-medium">
                  Stack is Empty (Underflow)
                </div>
              ) : (
                stackState.map((val, idx) => {
                  const isTop = idx === stackState.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`px-4 py-2.5 rounded-xl font-mono font-bold text-center text-sm shadow-sm transition-all duration-300 flex items-center justify-between ${
                        isTop
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50 scale-[1.02]'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{val}</span>
                      {isTop && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-100">
                          TOP (LIFO)
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium text-center">
              LIFO: Last In, First Out. Elements enter and exit exclusively through the open top.
            </p>
          </div>
        )}

        {/* Stage C: QUEUE VISUALIZER */}
        {activeTab === 'queue' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-xl">
            {/* Interactive Control Row */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={queueInputVal}
                onChange={e => setQueueInputVal(parseInt(e.target.value, 10) || 0)}
                className="w-20 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-sm"
              />
              <button
                onClick={() => {
                  setQueueState(prev => [...prev, queueInputVal]);
                  setQueueInputVal(Math.floor(Math.random() * 90 + 10));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition"
              >
                <Plus className="w-3.5 h-3.5" /> Enqueue (Rear)
              </button>
              <button
                onClick={() => {
                  if (queueState.length > 0) {
                    setQueueState(prev => prev.slice(1));
                  }
                }}
                disabled={queueState.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" /> Dequeue (Front)
              </button>
              <button
                onClick={() => setQueueState([])}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs transition"
              >
                Clear
              </button>
            </div>

            {/* Horizontal Pipeline */}
            <div className="w-full flex items-center justify-center gap-3 overflow-x-auto p-4 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 min-h-[110px]">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5" /> Front (Exit)
              </div>

              {queueState.length === 0 ? (
                <div className="text-xs text-slate-400 font-medium">Queue is Empty</div>
              ) : (
                queueState.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queueState.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`relative min-w-[56px] h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm shadow-sm transition-all duration-300 ${
                        isFront
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50'
                          : isRear
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[9px] opacity-80">
                        {isFront ? 'FRONT' : isRear ? 'REAR' : `[${idx}]`}
                      </span>
                    </div>
                  );
                })
              )}

              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                Rear (Enter) <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium text-center">
              FIFO: First In, First Out. Elements enter at the rear and exit from the front in arrival order.
            </p>
          </div>
        )}

        {/* Stage D: LINKED LIST VISUALIZER */}
        {activeTab === 'linked-list' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            {/* Interactive controls */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={listInputVal}
                onChange={e => setListInputVal(parseInt(e.target.value, 10) || 0)}
                className="w-20 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-sm"
              />
              <button
                onClick={() => {
                  const newNode = { id: Date.now().toString(), val: listInputVal };
                  setLinkedList(prev => [newNode, ...prev]);
                  setListInputVal(Math.floor(Math.random() * 90 + 10));
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition"
              >
                Insert Head
              </button>
              <button
                onClick={() => {
                  const newNode = { id: Date.now().toString(), val: listInputVal };
                  setLinkedList(prev => [...prev, newNode]);
                  setListInputVal(Math.floor(Math.random() * 90 + 10));
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition"
              >
                Insert Tail
              </button>
              <button
                onClick={() => {
                  if (linkedList.length > 0) setLinkedList(prev => prev.slice(1));
                }}
                disabled={linkedList.length === 0}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition disabled:opacity-40"
              >
                Delete Head
              </button>
            </div>

            {/* Linked Nodes Row */}
            <div className="flex items-center gap-3 overflow-x-auto p-4 w-full justify-center">
              <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800">
                HEAD &rarr;
              </div>

              {linkedList.map((node, idx) => (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => setActiveListNode(node.id)}
                    className="flex items-center border-2 border-indigo-500 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm transition hover:scale-105 cursor-pointer"
                  >
                    <div className="px-3 py-2 font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 text-sm">
                      {node.val}
                    </div>
                    <div className="px-2 py-2 text-[10px] font-mono font-semibold bg-indigo-600 text-white border-l border-indigo-400">
                      next •
                    </div>
                  </div>

                  {idx < linkedList.length - 1 ? (
                    <div className="text-indigo-400 font-bold text-lg select-none">&rarr;</div>
                  ) : (
                    <div className="text-xs font-mono text-slate-400 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">
                      null
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-medium text-center">
              Each node contains a data payload and a pointer referencing the address of the next node.
            </p>
          </div>
        )}

        {/* Stage E: BINARY SEARCH TREE VISUALIZER */}
        {activeTab === 'tree' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-lg">
            {/* Tree SVG Node Render */}
            <svg width="340" height="180" className="overflow-visible">
              {/* Branch Lines */}
              <line x1="170" y1="30" x2="90" y2="80" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="170" y1="30" x2="250" y2="80" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="90" y1="80" x2="50" y2="140" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="90" y1="80" x2="130" y2="140" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="250" y1="80" x2="210" y2="140" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="250" y1="80" x2="290" y2="140" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Nodes */}
              {[
                { id: 50, val: 50, x: 170, y: 30 },
                { id: 30, val: 30, x: 90, y: 80 },
                { id: 70, val: 70, x: 250, y: 80 },
                { id: 20, val: 20, x: 50, y: 140 },
                { id: 40, val: 40, x: 130, y: 140 },
                { id: 60, val: 60, x: 210, y: 140 },
                { id: 80, val: 80, x: 290, y: 140 },
              ].map(node => {
                const isVisited = currentStep.traversalOrder?.includes(node.val);
                const isActive = currentStep.treeNodes?.find(n => n.id === node.id)?.active;

                let fill = '#6366f1';
                if (isActive) fill = '#f59e0b';
                else if (isVisited) fill = '#10b981';

                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 18 : 16}
                      fill={fill}
                      stroke="white"
                      strokeWidth="2.5"
                      className="shadow-sm transition-all"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {node.val}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Traversal Order sequence list */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 font-semibold">Visited Sequence:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(currentStep.traversalOrder && currentStep.traversalOrder.length > 0) ? (
                  currentStep.traversalOrder.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                      {v}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400">Click Play or Next Step to begin</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stage F: GRAPH VISUALIZER */}
        {activeTab === 'graph' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-lg">
            <svg width="320" height="180" className="overflow-visible">
              {/* Edges */}
              <line x1="60" y1="50" x2="160" y2="40" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="60" y1="50" x2="110" y2="130" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="160" y1="40" x2="260" y2="60" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="160" y1="40" x2="200" y2="140" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="110" y1="130" x2="200" y2="140" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="260" y1="60" x2="200" y2="140" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Vertices */}
              {[
                { id: 'A', x: 60, y: 50 },
                { id: 'B', x: 160, y: 40 },
                { id: 'C', x: 110, y: 130 },
                { id: 'D', x: 260, y: 60 },
                { id: 'E', x: 200, y: 140 },
              ].map(vertex => {
                const isActive = currentStep.graphActive === vertex.id;
                const isVisited = currentStep.graphVisited?.includes(vertex.id);

                let fill = '#6366f1';
                if (isActive) fill = '#f59e0b';
                else if (isVisited) fill = '#10b981';

                return (
                  <g key={vertex.id} className="transition-all duration-300">
                    <circle
                      cx={vertex.x}
                      cy={vertex.y}
                      r={isActive ? 18 : 16}
                      fill={fill}
                      stroke="white"
                      strokeWidth="2.5"
                    />
                    <text
                      x={vertex.x}
                      y={vertex.y + 4}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      {vertex.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Frontier Queue/Stack & Order */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-semibold">{graphAlgo.toUpperCase()} Frontier:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold">
                  [{currentStep.graphQueueOrStack?.join(', ') || 'empty'}]
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-semibold">Visited Order:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                  {currentStep.graphTraversalOrder?.join(' -> ') || 'none'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Playback Controls & Status Footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50/70 dark:bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset to beginning"
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-400 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            title="Previous step (Left Arrow)"
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(prev => !prev)}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs text-white shadow-md transition ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Play
              </>
            )}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIdx >= steps.length - 1}
            title="Next step (Right Arrow)"
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 disabled:opacity-40 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Progress Step Counter */}
          {steps.length > 0 && (
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 ml-2">
              Step {currentStepIdx + 1} / {steps.length}
            </span>
          )}
        </div>

        {/* Real Metrics & Step Description */}
        <div className="flex items-center gap-4 text-xs w-full sm:w-auto justify-end">
          <div className="flex items-center gap-3 font-mono font-medium text-slate-600 dark:text-slate-300">
            <span>Comparisons: <strong className="text-indigo-600 dark:text-indigo-400">{currentStep.comparisons}</strong></span>
            <span>Swaps: <strong className="text-indigo-600 dark:text-indigo-400">{currentStep.swaps}</strong></span>
          </div>

          <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
            currentStep.status === 'completed' || currentStep.status === 'found'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              : currentStep.status === 'not_found'
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
          }`}>
            {currentStep.status === 'completed' || currentStep.status === 'found' ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : currentStep.status === 'not_found' ? (
              <AlertCircle className="w-3.5 h-3.5" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            )}
            <span>{currentStep.status?.replace('_', ' ') || 'running'}</span>
          </div>
        </div>
      </div>

      {/* Step Description Banner */}
      <div className="px-5 py-2.5 bg-indigo-50/60 dark:bg-indigo-950/30 border-t border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200 font-medium">
        <span className="font-bold mr-1.5">Action:</span>
        {currentStep.description}
      </div>
    </div>
  );
};
