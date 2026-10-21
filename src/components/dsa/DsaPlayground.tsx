import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Download, 
  Terminal, 
  Eye, 
  Code2, 
  Sparkles, 
  Check, 
  FileCode,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../Toast';

interface SampleProgram {
  id: string;
  title: string;
  category: string;
  html: string;
  css: string;
  js: string;
}

const SAMPLE_PROGRAMS: SampleProgram[] = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort Visualizer in DOM',
    category: 'Sorting',
    html: `<h3>Bubble Sort DOM Visualizer</h3>
<p>Watch JavaScript calculate comparisons and swap HTML bars in real-time:</p>
<div style="margin-bottom: 10px;">
  <button id="startSortBtn" style="padding: 6px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Run Sort</button>
  <button id="randomizeBtn" style="padding: 6px 14px; background: #334155; color: white; border: none; border-radius: 6px; cursor: pointer; margin-left: 6px;">Randomize</button>
</div>
<div id="container" class="bar-container"></div>
<div id="stats" class="stats-panel">Ready. Click 'Run Sort' to begin.</div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.bar-container { display: flex; align-items: flex-end; gap: 8px; height: 160px; margin: 16px 0; border-bottom: 2px solid #334155; padding-bottom: 4px; }
.bar { flex: 1; background: #6366f1; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-end; padding-bottom: 4px; font-weight: bold; font-size: 11px; transition: all 0.2s ease; }
.bar.comparing { background: #f59e0b; transform: scaleY(1.05); }
.bar.swapped { background: #ef4444; }
.bar.sorted { background: #10b981; }
.stats-panel { font-family: monospace; font-size: 13px; color: #94a3b8; }`,
    js: `// Interactive Bubble Sort in JavaScript
const container = document.getElementById("container");
const stats = document.getElementById("stats");
let numbers = [45, 18, 72, 33, 90, 12, 60, 25];

function renderBars(arr, comparing = [], sorted = []) {
  container.innerHTML = "";
  arr.forEach((val, i) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (val * 1.5) + "px";
    bar.innerText = val;
    if (comparing.includes(i)) bar.classList.add("comparing");
    if (sorted.includes(i)) bar.classList.add("sorted");
    container.appendChild(bar);
  });
}

async function runBubbleSort() {
  const arr = [...numbers];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  renderBars(arr);
  console.log("Starting Bubble Sort on array:", arr);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      stats.innerText = \`Comparing \${arr[j]} and \${arr[j + 1]} (Total comparisons: \${comparisons})\`;
      renderBars(arr, [j, j + 1], sorted);
      await new Promise(r => setTimeout(r, 250));

      if (arr[j] > arr[j + 1]) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        stats.innerText = \`Swapping \${arr[j]} and \${arr[j + 1]} (Swaps: \${swaps})\`;
        renderBars(arr, [j, j + 1], sorted);
        await new Promise(r => setTimeout(r, 250));
      }
    }
    sorted.push(n - i - 1);
  }
  renderBars(arr, [], Array.from({length: n}, (_, i) => i));
  stats.innerText = \`Sorted successfully! Total comparisons: \${comparisons}, Swaps: \${swaps}\`;
  console.log("Final sorted array:", arr);
}

document.getElementById("startSortBtn").onclick = runBubbleSort;
document.getElementById("randomizeBtn").onclick = () => {
  numbers = Array.from({length: 8}, () => Math.floor(Math.random() * 80) + 15);
  renderBars(numbers);
  stats.innerText = "New random array generated. Ready to sort.";
};

renderBars(numbers);`
  },

  {
    id: 'quick-sort',
    title: 'Quick Sort Partitioning',
    category: 'Sorting',
    html: `<h3>Quick Sort (Divide & Conquer)</h3>
<p>Recursively partitions around a pivot element:</p>
<div style="margin-bottom: 10px;">
  <button id="runQuickBtn" style="padding: 6px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Run Quick Sort</button>
</div>
<div id="quickContainer" class="bar-container"></div>
<div id="quickLog" class="stats-panel">Ready.</div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.bar-container { display: flex; align-items: flex-end; gap: 8px; height: 160px; margin: 16px 0; border-bottom: 2px solid #334155; padding-bottom: 4px; }
.bar { flex: 1; background: #3b82f6; border-radius: 4px 4px 0 0; display: flex; justify-content: center; align-items: flex-end; padding-bottom: 4px; font-weight: bold; font-size: 11px; transition: all 0.2s ease; }
.bar.pivot { background: #ec4899; }
.bar.i-ptr { background: #eab308; }
.bar.j-ptr { background: #06b6d4; }
.bar.sorted { background: #10b981; }
.stats-panel { font-family: monospace; font-size: 13px; color: #94a3b8; }`,
    js: `const container = document.getElementById("quickContainer");
const log = document.getElementById("quickLog");
let arr = [65, 28, 85, 12, 49, 34, 76, 21];

function render(pivot = -1, iPtr = -1, jPtr = -1) {
  container.innerHTML = "";
  arr.forEach((val, idx) => {
    const el = document.createElement("div");
    el.className = "bar";
    el.style.height = (val * 1.5) + "px";
    el.innerText = val;
    if (idx === pivot) el.classList.add("pivot");
    if (idx === iPtr) el.classList.add("i-ptr");
    if (idx === jPtr) el.classList.add("j-ptr");
    container.appendChild(el);
  });
}

async function partition(low, high) {
  const pivot = arr[high];
  log.innerText = \`Partitioning range [\${low}..\${high}] with Pivot = \${pivot}\`;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    render(high, i, j);
    await new Promise(r => setTimeout(r, 250));
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      render(high, i, j);
      await new Promise(r => setTimeout(r, 250));
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  render(i + 1);
  await new Promise(r => setTimeout(r, 250));
  return i + 1;
}

async function quickSort(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

document.getElementById("runQuickBtn").onclick = async () => {
  log.innerText = "Running Quick Sort...";
  await quickSort(0, arr.length - 1);
  render();
  log.innerText = "Quick Sort Completed! All elements sorted.";
  console.log("Sorted array:", arr);
};

render();`
  },

  {
    id: 'binary-search',
    title: 'Binary Search Step-by-Step',
    category: 'Searching',
    html: `<h3>Binary Search Algorithm</h3>
<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
  <span>Target value:</span>
  <input id="targetInput" type="number" value="42" style="width: 60px; padding: 4px 8px; border-radius: 4px; border: 1px solid #475569; background: #1e293b; color: #38bdf8; font-weight: bold;" />
  <button id="searchBtn" style="padding: 5px 12px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Search</button>
</div>
<div id="grid" class="search-grid"></div>
<div id="log" class="search-log">Ready. Enter target and click Search.</div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.search-grid { display: flex; gap: 8px; margin: 16px 0; overflow-x: auto; padding-bottom: 6px; }
.cell { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #1e293b; border: 2px solid #334155; border-radius: 8px; font-weight: bold; font-family: monospace; transition: all 0.3s; flex-shrink: 0; }
.cell.active { background: #eab308; color: #000; border-color: #facc15; transform: scale(1.1); }
.cell.eliminated { opacity: 0.25; background: #334155; }
.cell.found { background: #10b981; color: #fff; border-color: #34d399; transform: scale(1.15); box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
.search-log { font-family: monospace; font-size: 13px; color: #94a3b8; }`,
    js: `const grid = document.getElementById("grid");
const log = document.getElementById("log");
const sortedData = [4, 9, 15, 23, 31, 42, 58, 67, 79, 91];

function drawGrid(left = 0, mid = -1, right = sortedData.length - 1, found = false) {
  grid.innerHTML = "";
  sortedData.forEach((val, i) => {
    const el = document.createElement("div");
    el.className = "cell";
    el.innerText = val;
    if (found && i === mid) el.className = "cell found";
    else if (i === mid) el.className = "cell active";
    else if (i < left || i > right) el.className = "cell eliminated";
    grid.appendChild(el);
  });
}

async function binarySearch() {
  const target = parseInt(document.getElementById("targetInput").value, 10);
  let left = 0;
  let right = sortedData.length - 1;
  let step = 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    drawGrid(left, mid, right);
    log.innerText = \`Step \${step}: Checking Mid=\${sortedData[mid]} at index \${mid}. (Range: [\${left}..\${right}])\`;
    console.log(\`Step \${step}: Checking mid index \${mid} (value \${sortedData[mid]})\`);
    await new Promise(r => setTimeout(r, 600));

    if (sortedData[mid] === target) {
      drawGrid(left, mid, right, true);
      log.innerText = \`Found target \${target} at index \${mid} in \${step} steps!\`;
      console.log("Target found at index", mid);
      return mid;
    }
    if (sortedData[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    step++;
  }
  drawGrid(-1, -1, -1);
  log.innerText = \`Target \${target} was not found in sorted array.\`;
  console.log("Target not found.");
}

document.getElementById("searchBtn").onclick = binarySearch;
drawGrid();`
  },

  {
    id: 'stack-class',
    title: 'Stack Structure (LIFO)',
    category: 'Stacks',
    html: `<h3>Stack Data Structure (LIFO)</h3>
<p>Last-In, First-Out: Elements are pushed and popped from the top.</p>
<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
  <input id="stackInput" type="number" value="55" style="width: 60px; padding: 6px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white;" />
  <button id="pushBtn" style="padding: 6px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Push</button>
  <button id="popBtn" style="padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Pop Top</button>
</div>
<div id="stack" class="stack-box"></div>
<div id="status" style="margin-top: 10px; font-family: monospace; font-size: 13px; color: #94a3b8;"></div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.stack-box { width: 220px; min-height: 180px; border: 3px solid #475569; border-top: none; border-radius: 0 0 12px 12px; display: flex; flex-direction: column-reverse; gap: 6px; padding: 8px; background: #1e293b; }
.stack-item { background: #3b82f6; color: white; padding: 8px; border-radius: 6px; text-align: center; font-weight: bold; font-family: monospace; display: flex; justify-content: space-between; }
.top-badge { background: #ec4899; padding: 2px 6px; border-radius: 4px; font-size: 10px; }`,
    js: `class Stack {
  constructor() { this.items = [15, 28, 42]; }
  push(val) { this.items.push(val); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  size() { return this.items.length; }
}

const s = new Stack();
const stackEl = document.getElementById("stack");
const statusEl = document.getElementById("status");

function updateDOM() {
  stackEl.innerHTML = "";
  s.items.forEach((val, i) => {
    const item = document.createElement("div");
    item.className = "stack-item";
    const isTop = i === s.items.length - 1;
    item.innerHTML = \`<span>[\${i}] \${val}</span>\${isTop ? '<span class="top-badge">TOP</span>' : ''}\`;
    stackEl.appendChild(item);
  });
  statusEl.innerText = \`Stack Size: \${s.size()}, Top Element: \${s.peek() ?? 'empty'}\`;
}

document.getElementById("pushBtn").onclick = () => {
  const input = document.getElementById("stackInput");
  const val = parseInt(input.value, 10) || Math.floor(Math.random() * 90 + 10);
  s.push(val);
  input.value = Math.floor(Math.random() * 90 + 10);
  console.log("Pushed to stack:", val);
  updateDOM();
};

document.getElementById("popBtn").onclick = () => {
  if (s.size() === 0) {
    statusEl.innerText = "Stack Underflow! Stack is empty.";
    return;
  }
  const popped = s.pop();
  console.log("Popped from stack:", popped);
  updateDOM();
};

updateDOM();`
  },

  {
    id: 'queue-pipeline',
    title: 'Queue Pipeline (FIFO)',
    category: 'Queues',
    html: `<h3>Queue Data Structure (FIFO)</h3>
<p>First-In, First-Out: Elements enter at the Rear and exit from the Front.</p>
<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
  <input id="queueInput" type="number" value="50" style="width: 60px; padding: 6px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white;" />
  <button id="enqueueBtn" style="padding: 6px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Enqueue (Rear)</button>
  <button id="dequeueBtn" style="padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Dequeue (Front)</button>
</div>
<div id="queue" class="queue-container"></div>
<div id="qStatus" style="margin-top: 10px; font-family: monospace; font-size: 13px; color: #94a3b8;"></div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.queue-container { display: flex; align-items: center; gap: 8px; padding: 12px; background: #1e293b; border: 2px dashed #475569; border-radius: 12px; min-height: 80px; overflow-x: auto; }
.queue-item { min-width: 60px; height: 50px; background: #3b82f6; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: bold; font-family: monospace; color: white; }
.queue-item.front { background: #10b981; }
.queue-item.rear { background: #6366f1; }
.queue-tag { font-size: 9px; opacity: 0.8; }`,
    js: `class Queue {
  constructor() { this.items = [10, 20, 30, 40]; }
  enqueue(val) { this.items.push(val); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
  size() { return this.items.length; }
}

const q = new Queue();
const queueEl = document.getElementById("queue");
const statusEl = document.getElementById("qStatus");

function updateQueueDOM() {
  queueEl.innerHTML = "";
  if (q.size() === 0) {
    queueEl.innerHTML = "<div style='color: #64748b;'>Queue is currently empty.</div>";
  } else {
    q.items.forEach((val, i) => {
      const el = document.createElement("div");
      const isFront = i === 0;
      const isRear = i === q.size() - 1;
      el.className = "queue-item" + (isFront ? " front" : isRear ? " rear" : "");
      el.innerHTML = \`<span>\${val}</span><span class="queue-tag">\${isFront ? "FRONT" : isRear ? "REAR" : "[" + i + "]"}</span>\`;
      queueEl.appendChild(el);
    });
  }
  statusEl.innerText = \`Queue Size: \${q.size()}, Front Element: \${q.front() ?? 'empty'}\`;
}

document.getElementById("enqueueBtn").onclick = () => {
  const input = document.getElementById("queueInput");
  const val = parseInt(input.value, 10) || Math.floor(Math.random() * 90 + 10);
  q.enqueue(val);
  input.value = Math.floor(Math.random() * 90 + 10);
  console.log("Enqueued:", val);
  updateQueueDOM();
};

document.getElementById("dequeueBtn").onclick = () => {
  if (q.size() === 0) {
    statusEl.innerText = "Queue Underflow! Queue is empty.";
    return;
  }
  const dequeued = q.dequeue();
  console.log("Dequeued from front:", dequeued);
  updateQueueDOM();
};

updateQueueDOM();`
  },

  {
    id: 'linked-list',
    title: 'Singly Linked List with Nodes & Pointers',
    category: 'Linked Lists',
    html: `<h3>Singly Linked List Visualization</h3>
<p>Dynamic nodes connected sequentially by reference pointers:</p>
<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
  <input id="listInput" type="number" value="60" style="width: 60px; padding: 6px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white;" />
  <button id="addHeadBtn" style="padding: 6px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Insert Head</button>
  <button id="addTailBtn" style="padding: 6px 14px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Insert Tail</button>
  <button id="delHeadBtn" style="padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Delete Head</button>
</div>
<div id="listContainer" class="list-container"></div>
<div id="listStatus" style="margin-top: 10px; font-family: monospace; font-size: 13px; color: #94a3b8;"></div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.list-container { display: flex; align-items: center; gap: 8px; padding: 12px; background: #1e293b; border-radius: 12px; overflow-x: auto; min-height: 80px; }
.node-card { display: flex; align-items: center; background: #334155; border-radius: 8px; border: 1px solid #475569; }
.node-val { padding: 8px 14px; font-weight: bold; font-family: monospace; color: #38bdf8; }
.node-next { padding: 8px 10px; background: #1e293b; border-left: 1px solid #475569; font-size: 11px; color: #94a3b8; border-radius: 0 8px 8px 0; }
.arrow { color: #f59e0b; font-weight: bold; font-size: 18px; }
.null-node { color: #ef4444; font-family: monospace; font-weight: bold; padding: 4px 8px; }`,
    js: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    [12, 24, 36, 48].forEach(v => this.insertTail(v));
  }

  insertHead(val) {
    const node = new ListNode(val);
    node.next = this.head;
    this.head = node;
  }

  insertTail(val) {
    const node = new ListNode(val);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  deleteHead() {
    if (this.head) this.head = this.head.next;
  }

  toArray() {
    const res = [];
    let curr = this.head;
    while (curr) {
      res.push(curr.val);
      curr = curr.next;
    }
    return res;
  }
}

const list = new LinkedList();
const container = document.getElementById("listContainer");
const status = document.getElementById("listStatus");

function renderList() {
  container.innerHTML = "";
  const values = list.toArray();
  if (values.length === 0) {
    container.innerHTML = "<div class='null-node'>HEAD -> null (Empty List)</div>";
  } else {
    values.forEach((v, i) => {
      const card = document.createElement("div");
      card.className = "node-card";
      card.innerHTML = \`<div class="node-val">\${v}</div><div class="node-next">next</div>\`;
      container.appendChild(card);

      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.innerText = "➔";
      container.appendChild(arrow);
    });
    const nullTag = document.createElement("div");
    nullTag.className = "null-node";
    nullTag.innerText = "null";
    container.appendChild(nullTag);
  }
  status.innerText = \`Total Nodes: \${values.length}, Head Value: \${values[0] ?? 'null'}\`;
}

document.getElementById("addHeadBtn").onclick = () => {
  const val = parseInt(document.getElementById("listInput").value, 10) || 50;
  list.insertHead(val);
  renderList();
};

document.getElementById("addTailBtn").onclick = () => {
  const val = parseInt(document.getElementById("listInput").value, 10) || 50;
  list.insertTail(val);
  renderList();
};

document.getElementById("delHeadBtn").onclick = () => {
  list.deleteHead();
  renderList();
};

renderList();`
  },

  {
    id: 'binary-tree',
    title: 'Binary Search Tree (BST) & Inorder Traversal',
    category: 'Trees',
    html: `<h3>Binary Search Tree (BST)</h3>
<p>Left child &lt; Parent &lt; Right child. Inorder traversal yields sorted order.</p>
<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
  <input id="treeInput" type="number" value="45" style="width: 60px; padding: 6px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white;" />
  <button id="insertBstBtn" style="padding: 6px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Insert Value</button>
  <button id="traverseBstBtn" style="padding: 6px 14px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Run Inorder Traversal</button>
</div>
<div id="treeView" class="tree-display"></div>
<div id="traversalLog" style="margin-top: 10px; font-family: monospace; font-size: 13px; color: #94a3b8;"></div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.tree-display { padding: 16px; background: #1e293b; border-radius: 12px; font-family: monospace; line-height: 1.8; color: #38bdf8; }
.node-chip { display: inline-block; padding: 4px 10px; background: #6366f1; color: white; border-radius: 6px; margin: 4px; font-weight: bold; }`,
    js: `class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    [50, 30, 70, 20, 40, 60, 80].forEach(v => this.insert(v));
  }

  insert(val) {
    const newNode = new BSTNode(val);
    if (!this.root) { this.root = newNode; return; }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = newNode; break; }
        curr = curr.left;
      } else if (val > curr.val) {
        if (!curr.right) { curr.right = newNode; break; }
        curr = curr.right;
      } else break; // no duplicates
    }
  }

  inorder(node = this.root, res = []) {
    if (node) {
      this.inorder(node.left, res);
      res.push(node.val);
      this.inorder(node.right, res);
    }
    return res;
  }
}

const tree = new BST();
const view = document.getElementById("treeView");
const log = document.getElementById("traversalLog");

function renderTreeState() {
  const sorted = tree.inorder();
  view.innerHTML = "<p>Tree Values in Inorder (Sorted):</p>" + sorted.map(v => \`<span class="node-chip">\${v}</span>\`).join(" ");
  log.innerText = \`Total BST Nodes: \${sorted.length}, Root Value: \${tree.root.val}\`;
}

document.getElementById("insertBstBtn").onclick = () => {
  const val = parseInt(document.getElementById("treeInput").value, 10);
  if (val) {
    tree.insert(val);
    console.log("Inserted BST value:", val);
    renderTreeState();
  }
};

document.getElementById("traverseBstBtn").onclick = () => {
  const traversal = tree.inorder();
  log.innerText = "Inorder Traversal (L-Root-R): " + traversal.join(" -> ");
  console.log("Inorder Traversal result:", traversal);
};

renderTreeState();`
  },

  {
    id: 'graph-bfs',
    title: 'Graph BFS & DFS Traversal Visualizer',
    category: 'Graphs',
    html: `<h3>Graph Traversal: BFS vs DFS</h3>
<p>Breadth-First Search (Queue) explores level-by-level; Depth-First Search (Stack) dives deep.</p>
<div style="margin-bottom: 12px; display: flex; gap: 8px;">
  <button id="bfsBtn" style="padding: 6px 14px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Run BFS (Queue)</button>
  <button id="dfsBtn" style="padding: 6px 14px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Run DFS (Stack)</button>
</div>
<div id="graphOutput" style="font-family: monospace; font-size: 14px; line-height: 1.8; background: #1e293b; padding: 14px; border-radius: 12px;"></div>`,
    css: `body { font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
.visited-tag { display: inline-block; padding: 4px 10px; background: #10b981; color: white; border-radius: 999px; margin: 4px; font-weight: bold; }
.dfs-tag { display: inline-block; padding: 4px 10px; background: #8b5cf6; color: white; border-radius: 999px; margin: 4px; font-weight: bold; }`,
    js: `// Graph represented as adjacency list
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

const output = document.getElementById("graphOutput");

async function runBFS(startNode) {
  const visited = new Set([startNode]);
  const queue = [startNode];
  output.innerHTML = "<p><strong>BFS Traversal:</strong> Starting from Vertex " + startNode + "...</p>";

  while (queue.length > 0) {
    const curr = queue.shift();
    output.innerHTML += \`<span class="visited-tag">\${curr}</span>\`;
    console.log("BFS Visited Vertex:", curr);
    await new Promise(r => setTimeout(r, 350));

    for (const neighbor of graph[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  output.innerHTML += "<p style='color: #38bdf8; margin-top: 8px;'>BFS Traversal Complete! All reachable vertices visited.</p>";
}

async function runDFS(startNode) {
  const visited = new Set();
  const stack = [startNode];
  output.innerHTML = "<p><strong>DFS Traversal:</strong> Starting from Vertex " + startNode + "...</p>";

  while (stack.length > 0) {
    const curr = stack.pop();
    if (!visited.has(curr)) {
      visited.add(curr);
      output.innerHTML += \`<span class="dfs-tag">\${curr}</span>\`;
      console.log("DFS Visited Vertex:", curr);
      await new Promise(r => setTimeout(r, 350));

      for (const neighbor of [...graph[curr]].reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  output.innerHTML += "<p style='color: #a78bfa; margin-top: 8px;'>DFS Traversal Complete!</p>";
}

document.getElementById("bfsBtn").onclick = () => runBFS('A');
document.getElementById("dfsBtn").onclick = () => runDFS('A');

runBFS('A');`
  }
];

export const DsaPlayground: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<SampleProgram>(SAMPLE_PROGRAMS[0]);
  const [activeTab, setActiveTab] = useState<'js' | 'html' | 'css'>('js');
  const [htmlCode, setHtmlCode] = useState<string>(SAMPLE_PROGRAMS[0].html);
  const [cssCode, setCssCode] = useState<string>(SAMPLE_PROGRAMS[0].css);
  const [jsCode, setJsCode] = useState<string>(SAMPLE_PROGRAMS[0].js);
  const [logs, setLogs] = useState<Array<{ type: 'log' | 'error' | 'warn'; text: string; time: string }>>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { toast } = useToast();

  const handleSelectProgram = (prog: SampleProgram) => {
    setSelectedProgram(prog);
    setHtmlCode(prog.html);
    setCssCode(prog.css);
    setJsCode(prog.js);
    setLogs([]);
  };

  const handleReset = () => {
    setHtmlCode(selectedProgram.html);
    setCssCode(selectedProgram.css);
    setJsCode(selectedProgram.js);
    setLogs([]);
    toast('Code reset to template default', undefined, 'info');
  };

  const handleRunCode = () => {
    setLogs([]);
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Build complete sandbox HTML with intercepted console
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            (function() {
              function send(type, args) {
                const text = Array.from(args).map(a => {
                  try {
                    return typeof a === 'object' ? JSON.stringify(a) : String(a);
                  } catch(e) {
                    return String(a);
                  }
                }).join(' ');
                window.parent.postMessage({ source: 'dsa-playground', type, text }, '*');
              }
              const oldLog = console.log;
              const oldErr = console.error;
              const oldWarn = console.warn;

              console.log = function(...args) { oldLog(...args); send('log', args); };
              console.error = function(...args) { oldErr(...args); send('error', args); };
              console.warn = function(...args) { oldWarn(...args); send('warn', args); };

              window.onerror = function(msg, url, line) {
                send('error', ['Runtime Error: ' + msg + ' (line ' + line + ')']);
                return false;
              };
            })();

            try {
              ${jsCode}
            } catch(e) {
              console.error(e.message || e);
            }
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = fullHtml;
    toast('Executing DSA Algorithm...', undefined, 'success');
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.source === 'dsa-playground') {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { type: e.data.type, text: e.data.text, time }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Initial execution on mount or program switch
  useEffect(() => {
    handleRunCode();
  }, [selectedProgram]);

  const handleCopyCode = () => {
    const combined = `// --- JavaScript ---\n${jsCode}\n\n<!-- --- HTML --- -->\n${htmlCode}\n\n/* --- CSS --- */\n${cssCode}`;
    navigator.clipboard.writeText(combined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Code copied to clipboard', undefined, 'success');
  };

  const handleDownloadCode = () => {
    const combined = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${selectedProgram.title} — Codevaible</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  </script>
</body>
</html>`;
    const blob = new Blob([combined], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProgram.id}-codevaible.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Downloaded complete HTML sandbox file', undefined, 'success');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Top Bar: Template Switcher & Actions */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-3.5 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Template:
          </span>
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {SAMPLE_PROGRAMS.map(prog => (
              <button
                key={prog.id}
                onClick={() => handleSelectProgram(prog)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedProgram.id === prog.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {prog.title}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Run Code
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-400 transition"
            title="Reset to Template Default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-400 transition"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownloadCode}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-400 transition"
            title="Download HTML File"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 min-h-[460px]">
        
        {/* Left Column: Code Editor */}
        <div className="flex flex-col bg-slate-900 text-slate-100">
          {/* Tab Selector */}
          <div className="flex items-center border-b border-slate-800 px-4 bg-slate-950/70">
            {[
              { id: 'js', label: 'algorithm.js (JavaScript)', color: 'text-amber-400' },
              { id: 'html', label: 'index.html (Structure)', color: 'text-orange-400' },
              { id: 'css', label: 'styles.css (Visual Styling)', color: 'text-blue-400' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-mono font-semibold border-b-2 transition ${
                  activeTab === tab.id
                    ? `border-indigo-500 bg-slate-900 ${tab.color}`
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Textarea Code Input */}
          <div className="flex-1 p-4 font-mono text-xs overflow-auto relative">
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={e => setJsCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-amber-300 font-mono text-xs resize-none focus:outline-none leading-relaxed"
              />
            )}
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={e => setHtmlCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-orange-200 font-mono text-xs resize-none focus:outline-none leading-relaxed"
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={e => setCssCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-blue-200 font-mono text-xs resize-none focus:outline-none leading-relaxed"
              />
            )}
          </div>
          <div className="px-4 py-2 bg-slate-950 text-[10px] text-slate-500 border-t border-slate-800 flex justify-between">
            <span>JavaScript executes algorithms; HTML/CSS renders visual states.</span>
            <span>Ctrl + Enter to Run</span>
          </div>
        </div>

        {/* Right Column: Live HTML Preview & Real-Time Console */}
        <div className="flex flex-col bg-white dark:bg-slate-950">
          
          {/* Output Preview */}
          <div className="flex-1 p-3 flex flex-col min-h-[260px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                Live HTML Visualization
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Sandboxed DOM
              </span>
            </div>
            <iframe
              ref={iframeRef}
              title="DSA Sandbox Preview"
              sandbox="allow-scripts"
              className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 min-h-[220px]"
            />
          </div>

          {/* Console Output Panel */}
          <div className="h-44 border-t border-slate-200 dark:border-slate-800 bg-[#090d16] p-3 flex flex-col font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Terminal className="w-3 h-3" /> Console Output
              </span>
              <button
                onClick={() => setLogs([])}
                className="hover:text-slate-200 text-[10px] transition"
              >
                Clear Console
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-2 space-y-1.5 scrollbar-thin">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic text-[11px]">No console logs yet. Press "Run Code" above.</div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 leading-relaxed ${
                      log.type === 'error' ? 'text-rose-400' :
                      log.type === 'warn' ? 'text-amber-300' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-slate-600 text-[10px] select-none">{log.time}</span>
                    <span className="flex-1 whitespace-pre-wrap">{log.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
