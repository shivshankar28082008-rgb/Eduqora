import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Sliders, 
  Search, 
  GitBranch, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Play
} from 'lucide-react';
import { DsaPlayground } from './DsaPlayground';

export const DsaHtmlVisualizerLab: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<'arrays' | 'stacks' | 'trees' | 'graphs'>('arrays');

  const concepts = [
    {
      id: 'arrays',
      title: 'HTML Representation of Arrays',
      icon: Sliders,
      tag: 'Flexbox Row',
      htmlTag: '<div class="array-cell">',
      explanation: 'In HTML, arrays are represented as a horizontal flexbox container (`display: flex; flex-direction: row; gap: 8px;`). Each array index corresponds to a discrete child `<div>`. When an algorithm inspects or compares elements, JavaScript dynamically adds CSS classes (such as `.comparing`, `.swapped`, or `.sorted`) to change background colors, heights, and border styles.'
    },
    {
      id: 'stacks',
      title: 'HTML Representation of Stacks',
      icon: Layers,
      tag: 'Column Reverse',
      htmlTag: '<div class="stack-box">',
      explanation: 'In HTML, a LIFO stack is represented with `display: flex; flex-direction: column-reverse;`. The bottom and side borders are rendered while leaving the top border open. When JavaScript pushes a new element to the stack array, `container.appendChild(item)` causes CSS animations to drop the item from the open top into place.'
    },
    {
      id: 'trees',
      title: 'HTML Representation of Trees',
      icon: GitBranch,
      tag: 'Nested Flexbox & SVG',
      htmlTag: '<svg><line> & <circle>',
      explanation: 'Hierarchical tree nodes are structured using nested HTML container divs or SVG elements. Parent nodes connect to left and right children via SVG `<line>` or `<path>` coordinates. JavaScript traverses the nodes using recursion or queues, toggling classes to illustrate Inorder, Preorder, and Level-order traversal waves.'
    },
    {
      id: 'graphs',
      title: 'HTML Representation of Graphs',
      icon: Database,
      tag: 'SVG Vertices & Edges',
      htmlTag: '<svg><circle> & <line>',
      explanation: 'Graphs are rendered using SVG coordinate systems where `<circle>` tags represent vertices and `<line>` tags represent interconnecting network edges. As BFS or DFS explores the graph, JavaScript updates the SVG stroke and fill attributes in real time, illustrating the frontier queue/stack and visited nodes.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border border-indigo-700/40 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Special Subsection
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
          DSA Visualizer with HTML — The Architecture
        </h2>
        <p className="text-sm sm:text-base text-indigo-100/90 max-w-3xl leading-relaxed mb-6">
          Ever wonder how modern coding platforms build algorithm visualizers? 
          <strong> HTML structures the visual elements, CSS handles transitions and highlight colors, and JavaScript executes the actual algorithm logic while updating the DOM step-by-step.</strong>
        </p>

        {/* 3-Pillar Concept Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">1. HTML Structure</span>
            <p className="text-xs text-indigo-100/80 mt-1.5 leading-relaxed">
              Provides the visual skeleton: array boxes, stack tubes, linked nodes, tree branches, and SVG graph canvases.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">2. CSS Visual States</span>
            <p className="text-xs text-indigo-100/80 mt-1.5 leading-relaxed">
              Defines visual states: yellow for comparing, red for swapping, green for sorted, and elevation shadows for active pointers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">3. JavaScript Engine</span>
            <p className="text-xs text-indigo-100/80 mt-1.5 leading-relaxed">
              Calculates real Big-O algorithmic logic, pauses via async/await timers, and applies CSS classes to DOM nodes.
            </p>
          </div>
        </div>
      </div>

      {/* Conceptual Deep Dive Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How HTML Elements Represent Data Structures
          </h3>
          <span className="text-xs text-slate-500 font-medium">Select a concept to inspect:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {concepts.map(c => {
            const Icon = c.icon;
            const active = selectedConcept === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedConcept(c.id as any)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {c.tag}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{c.title}</h4>
                <code className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono mt-1 block">
                  {c.htmlTag}
                </code>
              </button>
            );
          })}
        </div>

        {/* Selected Concept Deep Dive Card */}
        {(() => {
          const activeItem = concepts.find(c => c.id === selectedConcept)!;
          return (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Architecture Guide: {activeItem.title}</span>
              </div>
              <p>{activeItem.explanation}</p>
            </div>
          );
        })()}
      </div>

      {/* Live Interactive Code Lab */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Interactive HTML/CSS/JS Algorithm Code Lab
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Edit the HTML structure, adjust CSS styles, and execute JavaScript algorithms. Watch changes update live in the browser sandbox.
          </p>
        </div>

        <DsaPlayground />
      </div>
    </div>
  );
};
