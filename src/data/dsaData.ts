import { DsaTopic } from '../types/dsaTypes';

export const DSA_TOPICS: DsaTopic[] = [
  // =========================================================================
  // DATA STRUCTURES (12 Topics)
  // =========================================================================
  {
    id: 'arrays',
    slug: 'arrays',
    name: 'Arrays',
    category: 'data-structures',
    difficulty: 'Beginner',
    order: 1,
    estimatedMinutes: 15,
    visualizerType: 'array',
    shortDesc: 'Contiguous memory collection storing elements accessible by index.',
    introduction: 'Arrays are the most fundamental data structure in computer science. They store a sequence of elements in contiguous memory locations, allowing instant O(1) random access via numerical indexes.',
    whatIsIt: 'Think of an array like a row of numbered lockers in a school hallway. Each locker has a specific index number starting from 0, and you can open any locker immediately if you know its number.',
    whyUseIt: 'Use arrays when you have a fixed collection of items or need ultra-fast direct index lookups, iteration, or buffer caching.',
    realWorldUseCases: [
      'Image pixel buffers (storing RGB values consecutively in memory)',
      'High-speed lookup tables and mathematical matrices',
      'Implementing low-level buffers in audio and video streaming pipelines',
      'Underlying buffer for dynamic lists, stacks, and heaps'
    ],
    algorithmSteps: [
      'Allocation: Memory is reserved as a continuous sequential block.',
      'Access by Index: Memory Address = Base_Address + (Index * Element_Size), achieving O(1) time.',
      'Insertion at End: O(1) amortized if capacity is available.',
      'Insertion at Middle/Beginning: Requires shifting all subsequent elements rightward (O(n)).',
      'Deletion: Requires shifting following elements leftward to keep contiguous layout (O(n)).'
    ],
    syntaxCode: `// Array creation and basic operations in JavaScript
const scores = [85, 92, 78, 95, 88];

// O(1) Direct Index Access
console.log(scores[0]); // 85

// O(1) Push to end
scores.push(99);

// O(n) Unshift to beginning (shifts all elements)
scores.unshift(70);

// Iterating through an array
scores.forEach((score, idx) => {
  console.log(\`Index \${idx}: \${score}\`);
});`,
    exampleCode: `// Array Operations demonstration
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    // Swap elements using destructuring
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

const sample = [10, 20, 30, 40, 50];
console.log("Original:", sample);
console.log("Reversed:", reverseArray([...sample]));`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1) Access / O(n) Search & Insert',
      worst: 'O(n) for Insert/Delete at arbitrary index',
      explanation: 'Access by index is instant O(1) because memory address is calculated directly. Inserting or removing from the middle requires shifting elements.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Arrays require continuous memory proportional to the number of stored elements.'
    },
    practiceExercises: [
      {
        title: 'Find the Maximum Element',
        prompt: 'Given an array of numbers, write a function that finds the largest value without using Math.max.',
        hint: 'Initialize max = arr[0] and iterate through the rest of the array.'
      },
      {
        title: 'Rotate Array by K Positions',
        prompt: 'Given an array of integers, rotate the array to the right by k steps.',
        hint: 'You can reverse the entire array, then reverse the first k elements, then reverse the remaining elements.'
      }
    ],
    quiz: [
      {
        id: 'arr-q1',
        question: 'What is the time complexity of accessing an array element by its index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        answerIndex: 0,
        explanation: 'Array elements reside in contiguous memory, allowing direct address arithmetic in constant O(1) time.'
      },
      {
        id: 'arr-q2',
        question: 'Why does inserting an element at the beginning of an array take O(n) time?',
        options: [
          'Because the array must be sorted first',
          'Because all existing elements must be shifted right by one index',
          'Because memory must be erased completely',
          'Because arrays cannot grow in size'
        ],
        answerIndex: 1,
        explanation: 'Every element from index 0 to n-1 must move to index + 1 to make room at the front.'
      }
    ],
    challenge: {
      id: 'arr-ch1',
      title: 'Find Missing Number in Sequence',
      instruction: 'Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, return the one number that is missing from the array.',
      starterCode: `function findMissingNumber(nums) {
  // Return the missing number in the range [0, nums.length]
  const n = nums.length;
  // Your code here
  return 0;
}`,
      solutionCode: `function findMissingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, curr) => acc + curr, 0);
  return expectedSum - actualSum;
}`,
      testCases: [
        { input: '[3, 0, 1]', expectedOutput: '2', description: 'Missing 2 from range 0..3' },
        { input: '[0, 1]', expectedOutput: '2', description: 'Missing 2 from range 0..2' },
        { input: '[9,6,4,2,3,5,7,0,1]', expectedOutput: '8', description: 'Missing 8 from range 0..9' }
      ],
      hints: ['Use the arithmetic formula for sum of first n numbers: sum = n * (n + 1) / 2.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="array-container" id="arrayBox">
  <div class="array-cell" data-idx="0">14</div>
  <div class="array-cell" data-idx="1">28</div>
  <div class="array-cell active" data-idx="2">35</div>
  <div class="array-cell" data-idx="3">42</div>
  <div class="array-cell" data-idx="4">60</div>
</div>`,
      css: `.array-container { display: flex; gap: 8px; justify-content: center; padding: 16px; }
.array-cell { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #e0e7ff; color: #3730a3; font-weight: bold; border-radius: 8px; border: 2px solid #6366f1; transition: all 0.3s ease; }
.array-cell.active { background: #4f46e5; color: #fff; transform: translateY(-6px); box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4); }`,
      js: `// Highlight cell at index 2
const cells = document.querySelectorAll('.array-cell');
cells.forEach((cell, i) => {
  cell.classList.toggle('active', i === 2);
});`,
      explanation: 'In HTML, an array is rendered as a flexbox row of indexed cells. JavaScript applies CSS classes like .active to visually indicate which memory slot the algorithm is currently inspecting.'
    }
  },

  {
    id: 'strings',
    slug: 'strings',
    name: 'Strings',
    category: 'data-structures',
    difficulty: 'Beginner',
    order: 2,
    estimatedMinutes: 15,
    visualizerType: 'array',
    shortDesc: 'Sequential characters manipulated with immutability, encoding, and two-pointer techniques.',
    introduction: 'A string is a sequential collection of characters. In JavaScript and most modern languages, strings are immutable, meaning any modification creates a new string in memory.',
    whatIsIt: 'Think of a string as a word spelled out with individual letter tiles on a Scrabble board. You can read any letter by position, but you cannot alter a tile in place without making a new copy.',
    whyUseIt: 'Strings represent human-readable text, URLs, file paths, JSON payloads, and network protocols.',
    realWorldUseCases: [
      'Text parsing and syntax tokenization in compilers and IDEs',
      'URL routing and search query parameter processing',
      'Data serialization (JSON, XML, CSV string parsing)',
      'Pattern matching and regular expression search algorithms'
    ],
    algorithmSteps: [
      'Character Access: Access by character index string[i] takes O(1) time.',
      'Concatenation: Creates a new string of combined length (O(n + m)).',
      'Substrings: Slicing extracts a range of characters into a new reference.',
      'Two-Pointer Scans: Often used for palindromes, reversals, and anagram comparisons.'
    ],
    syntaxCode: `const str = "Codevaible Lab";
console.log(str[0]); // 'C'
console.log(str.length); // 14
console.log(str.slice(0, 10)); // 'Codevaible'
console.log(str.toLowerCase()); // 'codevaible lab'`,
    exampleCode: `// Check if a string is a palindrome (ignoring non-alphanumeric chars)
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log("Is 'racecar' palindrome?", isPalindrome("racecar"));
console.log("Is 'A man, a plan, a canal: Panama' palindrome?", isPalindrome("A man, a plan, a canal: Panama"));`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n) for search/reversal',
      worst: 'O(n) where n is string length',
      explanation: 'Character access is O(1). Substring creation, concatenation, and searching involve inspecting up to n characters.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Strings consume memory proportional to the number of characters and character encoding format.'
    },
    practiceExercises: [
      {
        title: 'Reverse Words in a Sentence',
        prompt: 'Given a string sentence, return the words in reversed order with single spacing.',
        hint: 'Split by spaces, filter empty tokens, reverse the array, and join.'
      }
    ],
    quiz: [
      {
        id: 'str-q1',
        question: 'In JavaScript, are strings mutable or immutable?',
        options: ['Immutable', 'Mutable', 'Mutable only for ASCII', 'Depends on strict mode'],
        answerIndex: 0,
        explanation: 'JavaScript strings are immutable; any operation that modifies a string returns a new copy.'
      }
    ],
    challenge: {
      id: 'str-ch1',
      title: 'Valid Anagram',
      instruction: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
      starterCode: `function isAnagram(s, t) {
  // Your code here
  return false;
}`,
      solutionCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (const ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}`,
      testCases: [
        { input: '"anagram", "nagaram"', expectedOutput: 'true', description: 'Same letter frequency' },
        { input: '"rat", "car"', expectedOutput: 'false', description: 'Different letters' }
      ],
      hints: ['Count character occurrences with an object or frequency array.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="string-display">
  <span class="char match">R</span>
  <span class="char match">A</span>
  <span class="char active">C</span>
  <span class="char match">A</span>
  <span class="char match">R</span>
</div>`,
      css: `.string-display { display: flex; gap: 4px; justify-content: center; }
.char { padding: 8px 12px; font-family: monospace; font-size: 18px; border: 1px solid #cbd5e1; border-radius: 4px; }
.char.match { background: #dcfce7; color: #15803d; border-color: #86efac; }
.char.active { background: #fef08a; color: #854d0e; font-weight: bold; }`,
      js: `// Highlight matched characters during two-pointer check
console.log("Visualizing string character inspection");`,
      explanation: 'HTML spans represent individual characters, with CSS background colors highlighting matching characters and active pointers.'
    }
  },

  {
    id: 'linked-lists',
    slug: 'linked-lists',
    name: 'Linked Lists',
    category: 'data-structures',
    difficulty: 'Intermediate',
    order: 3,
    estimatedMinutes: 20,
    visualizerType: 'linked-list',
    shortDesc: 'Linear nodes connected by forward references without contiguous memory allocation.',
    introduction: 'A Linked List is a linear data structure where elements are not stored at contiguous memory locations. Instead, each element (node) contains a data value and a pointer (reference) to the next node in the chain.',
    whatIsIt: 'Imagine a treasure hunt where each clue contains a message and directions to find the next clue. You cannot jump directly to clue #5 without following clues 1 through 4 first.',
    whyUseIt: 'Ideal for situations where dynamic insertions and deletions at the head are frequent (O(1) time) and the total number of items is unpredictable.',
    realWorldUseCases: [
      'Undo/Redo history buffers in creative software',
      'Music player playlists (Next track and Previous track navigation)',
      'Underlying implementation for operating system process queues and memory allocators',
      'LRU (Least Recently Used) cache data stores'
    ],
    algorithmSteps: [
      'Node Anatomy: A node stores { value, next: Node | null }.',
      'Prepend (Insert Head): Create new node, point its next to current head, update head pointer. Takes O(1).',
      'Append (Insert Tail): Traverse to end of list, set last node next to new node. Takes O(n) or O(1) with tail pointer.',
      'Delete Node: Update previous node next pointer to skip the targeted node: prev.next = current.next.',
      'Search: Traverse sequentially from head until value is found or next is null (O(n)).'
    ],
    syntaxCode: `class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertHead(value) {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
  }
}`,
    exampleCode: `class ListNode {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

function printList(head) {
  const result = [];
  let curr = head;
  while (curr) {
    result.push(curr.value);
    curr = curr.next;
  }
  return result.join(" -> ") + " -> null";
}

const n1 = new ListNode(10);
const n2 = new ListNode(20);
const n3 = new ListNode(30);
n1.next = n2;
n2.next = n3;

console.log("Linked List:", printList(n1));`,
    timeComplexity: {
      best: 'O(1) for head insertion/deletion',
      average: 'O(n) for search and access',
      worst: 'O(n) for traversal',
      explanation: 'Inserting at the head takes constant O(1) time, but accessing node at index k requires traversing all preceding nodes (O(k)).'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Requires extra memory for pointer references at each node.'
    },
    practiceExercises: [
      {
        title: 'Reverse a Singly Linked List',
        prompt: 'Given the head of a singly linked list, reverse the list and return the new head.',
        hint: 'Use three pointers: prev = null, curr = head, and nextNode.'
      }
    ],
    quiz: [
      {
        id: 'll-q1',
        question: 'What is the time complexity to insert a new node at the head of a linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        answerIndex: 0,
        explanation: 'Only a few pointer updates are needed, which executes in constant O(1) time regardless of list size.'
      }
    ],
    challenge: {
      id: 'll-ch1',
      title: 'Detect Cycle in Linked List',
      instruction: 'Determine if a linked list contains a cycle using Floyd Cycle-Finding algorithm (tortoise and hare).',
      starterCode: `function hasCycle(head) {
  // Return true if list has cycle, else false
  return false;
}`,
      solutionCode: `function hasCycle(head) {
  if (!head || !head.next) return false;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      testCases: [
        { input: 'List with loop', expectedOutput: 'true', description: 'Fast meets slow' },
        { input: 'Linear list ending in null', expectedOutput: 'false', description: 'Reaches null safely' }
      ],
      hints: ['Advance slow pointer by 1 step, fast pointer by 2 steps. If they meet, a cycle exists.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="ll-container">
  <div class="ll-node"><span class="val">10</span><span class="ptr">Next &rarr;</span></div>
  <div class="ll-node active"><span class="val">25</span><span class="ptr">Next &rarr;</span></div>
  <div class="ll-node"><span class="val">40</span><span class="ptr">null</span></div>
</div>`,
      css: `.ll-container { display: flex; align-items: center; gap: 12px; }
.ll-node { display: flex; border: 2px solid #6366f1; border-radius: 8px; overflow: hidden; background: white; }
.ll-node .val { padding: 8px 14px; background: #e0e7ff; font-weight: bold; color: #3730a3; }
.ll-node .ptr { padding: 8px 10px; background: #c7d2fe; font-size: 11px; color: #4338ca; }
.ll-node.active { border-color: #10b981; transform: scale(1.08); }`,
      js: `console.log("HTML elements model list nodes and arrow connectors.");`,
      explanation: 'Each linked list node is represented by an HTML container split into data and pointer compartments, linked by styled CSS arrows.'
    }
  },

  {
    id: 'stacks',
    slug: 'stacks',
    name: 'Stacks',
    category: 'data-structures',
    difficulty: 'Beginner',
    order: 4,
    estimatedMinutes: 15,
    visualizerType: 'stack',
    shortDesc: 'LIFO (Last-In, First-Out) collection supporting push, pop, and peek operations.',
    introduction: 'A Stack is a linear data structure following the LIFO (Last-In, First-Out) principle. The last item added to the stack is the first item to be removed.',
    whatIsIt: 'Picture a stack of dinner plates in a cafeteria. You place fresh plates on the top, and people take plates from the top. You cannot remove the bottom plate without taking off the plates above it first.',
    whyUseIt: 'Essential for tracking function calls, parsing bracket syntax, undo mechanisms, and backtracking algorithms.',
    realWorldUseCases: [
      'Call stack in JavaScript runtime and V8 execution engine',
      'Browser navigation history (Back button pops the last visited page)',
      'Syntax validators checking for balanced parentheses ( ), [ ], { }',
      'Expression evaluation and infix-to-postfix conversion'
    ],
    algorithmSteps: [
      'Push: Insert an element onto the top of the stack (O(1)).',
      'Pop: Remove and return the top element from the stack (O(1)). If empty, raises Underflow.',
      'Peek/Top: Return the top element without removing it (O(1)).',
      'IsEmpty: Check if the stack has zero elements (O(1)).'
    ],
    syntaxCode: `class Stack {
  constructor() {
    this.items = [];
  }
  push(val) { this.items.push(val); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}`,
    exampleCode: `// Balanced Parentheses Checker using Stack
function isBalanced(str) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}

console.log("{ [ ( ) ] } balanced?", isBalanced("{[()]}"));
console.log("{ [ ( ] } balanced?", isBalanced("{[(]}"));`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1) for push, pop, peek',
      worst: 'O(1)',
      explanation: 'All primary operations operate on the top element, giving guaranteed constant time.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Space scales linearly with the number of stored elements.'
    },
    practiceExercises: [
      {
        title: 'Evaluate Reverse Polish Notation',
        prompt: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation using a stack.',
        hint: 'Push numbers to the stack; when encountering an operator, pop two operands, apply operator, and push result.'
      }
    ],
    quiz: [
      {
        id: 'stk-q1',
        question: 'Which principle does a Stack follow?',
        options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'LILO', 'Priority-based'],
        answerIndex: 0,
        explanation: 'Stacks strictly follow LIFO: the most recently added item is the first one removed.'
      }
    ],
    challenge: {
      id: 'stk-ch1',
      title: 'Min Stack Design',
      instruction: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.',
      starterCode: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    // Your code
  }
  pop() {
    // Your code
  }
  top() {
    // Your code
  }
  getMin() {
    // Return minimum element in O(1)
  }
}`,
      solutionCode: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    const currMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currMin);
  }
  pop() {
    this.minStack.pop();
    return this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
      testCases: [
        { input: 'push(-2), push(0), push(-3), getMin()', expectedOutput: '-3', description: 'Returns minimum element' },
        { input: 'pop(), top()', expectedOutput: '0', description: 'Top element after popping -3' }
      ],
      hints: ['Maintain an auxiliary minStack that stores the running minimum at each height.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="stack-box">
  <div class="stack-item top">Element 3 (Top)</div>
  <div class="stack-item">Element 2</div>
  <div class="stack-item">Element 1 (Bottom)</div>
</div>`,
      css: `.stack-box { display: flex; flex-direction: column-reverse; width: 140px; border: 3px solid #64748b; border-top: none; padding: 6px; gap: 6px; }
.stack-item { background: #3b82f6; color: white; padding: 10px; text-align: center; font-weight: bold; border-radius: 4px; }
.stack-item.top { background: #8b5cf6; box-shadow: 0 0 10px rgba(139, 92, 246, 0.5); }`,
      js: `console.log("HTML flex-direction: column-reverse models a vertical stack nicely.");`,
      explanation: 'A stack is visualized as a vertical container with an open top. New elements animate from the top and settle on existing layers.'
    }
  },

  {
    id: 'queues',
    slug: 'queues',
    name: 'Queues',
    category: 'data-structures',
    difficulty: 'Beginner',
    order: 5,
    estimatedMinutes: 15,
    visualizerType: 'queue',
    shortDesc: 'FIFO (First-In, First-Out) pipeline supporting enqueue and dequeue operations.',
    introduction: 'A Queue is a linear data structure following the FIFO (First-In, First-Out) principle. The first item entered is the first item served.',
    whatIsIt: 'Think of a line of people waiting at a movie ticket counter. The first person in line buys their ticket first and leaves first; newcomers join at the end of the line.',
    whyUseIt: 'Critical whenever asynchronous resources or requests need to be processed fairly in the order of their arrival.',
    realWorldUseCases: [
      'Printer print-job spooling',
      'JavaScript Event Loop task queue and microtask queue',
      'Breadth-First Search (BFS) graph and tree exploration',
      'Network packet routing and load balancing'
    ],
    algorithmSteps: [
      'Enqueue: Add an element to the rear/tail of the queue (O(1)).',
      'Dequeue: Remove and return the element at the front/head of the queue (O(1)).',
      'Front/Peek: Inspect the element at the front without removal (O(1)).',
      'IsEmpty: Check if queue has zero items (O(1)).'
    ],
    syntaxCode: `class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }
  enqueue(val) {
    this.items.push(val);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items[this.head++];
  }
  peek() {
    return this.items[this.head];
  }
  isEmpty() {
    return this.head >= this.items.length;
  }
}`,
    exampleCode: `// Producer-Consumer Queue Simulator
class TaskQueue {
  constructor() {
    this.queue = [];
  }
  addTask(task) {
    this.queue.push(task);
    console.log(\`[Enqueued] \${task}\`);
  }
  processNext() {
    if (this.queue.length === 0) return console.log("Queue empty.");
    const task = this.queue.shift();
    console.log(\`[Processed] \${task}\`);
  }
}

const tq = new TaskQueue();
tq.addTask("Send Welcome Email");
tq.addTask("Generate Invoice PDF");
tq.processNext();
tq.processNext();`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1) with pointer/circular buffer',
      worst: 'O(1)',
      explanation: 'Enqueue at rear and dequeue at front take constant O(1) time when implemented with head/tail pointers or linked nodes.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Memory is proportional to the number of queued elements.'
    },
    practiceExercises: [
      {
        title: 'Implement Queue using Stacks',
        prompt: 'Implement a FIFO queue using only two LIFO stacks.',
        hint: 'Use stackIn for enqueue and stackOut for dequeue. When stackOut is empty, transfer all items from stackIn.'
      }
    ],
    quiz: [
      {
        id: 'q-q1',
        question: 'What does FIFO stand for in Queue terminology?',
        options: ['First In First Out', 'Fast In Fast Out', 'Forward In Forward Out', 'Fixed In Fixed Out'],
        answerIndex: 0,
        explanation: 'FIFO means First In, First Out — the earliest enqueued item is dequeued first.'
      }
    ],
    challenge: {
      id: 'q-ch1',
      title: 'Design Circular Queue',
      instruction: 'Design your implementation of the circular queue with fixed capacity k.',
      starterCode: `class MyCircularQueue {
  constructor(k) {
    this.size = k;
    this.data = new Array(k);
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
  enQueue(value) {
    // Return true if operation succeeds
  }
  deQueue() {
    // Return true if operation succeeds
  }
}`,
      solutionCode: `class MyCircularQueue {
  constructor(k) {
    this.size = k;
    this.data = new Array(k);
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
  enQueue(val) {
    if (this.isFull()) return false;
    this.rear = (this.rear + 1) % this.size;
    this.data[this.rear] = val;
    this.count++;
    return true;
  }
  deQueue() {
    if (this.isEmpty()) return false;
    this.front = (this.front + 1) % this.size;
    this.count--;
    return true;
  }
  isFull() { return this.count === this.size; }
  isEmpty() { return this.count === 0; }
}`,
      testCases: [
        { input: 'enQueue(1), enQueue(2), deQueue()', expectedOutput: 'true', description: 'Enqueue and dequeue success' }
      ],
      hints: ['Use modulo arithmetic: (index + 1) % capacity.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="queue-pipeline">
  <div class="pointer front">Front &darr;</div>
  <div class="queue-body">
    <div class="q-cell front">1st</div>
    <div class="q-cell">2nd</div>
    <div class="q-cell">3rd</div>
  </div>
  <div class="pointer rear">&uarr; Rear</div>
</div>`,
      css: `.queue-pipeline { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.queue-body { display: flex; border: 2px solid #0284c7; border-left: 4px solid #10b981; border-right: 4px solid #f59e0b; padding: 4px; gap: 6px; }
.q-cell { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #e0f2fe; color: #0369a1; font-weight: bold; border-radius: 4px; }`,
      js: `console.log("HTML flex row visualizes items entering right and leaving left.");`,
      explanation: 'A queue visualizer displays items in a horizontal pipeline where items enter on the right and exit from the left.'
    }
  },

  {
    id: 'hash-tables',
    slug: 'hash-tables',
    name: 'Hash Tables',
    category: 'data-structures',
    difficulty: 'Intermediate',
    order: 6,
    estimatedMinutes: 20,
    visualizerType: 'array',
    shortDesc: 'Key-value mapping utilizing hash functions for average O(1) lookups.',
    introduction: 'A Hash Table (Hash Map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash function computes an index into an array of buckets.',
    whatIsIt: 'Think of an indexed library catalogue. Instead of searching every shelf, you run a book title through an algorithm that tells you immediately: "Go to aisle 4, shelf 2".',
    whyUseIt: 'Provides blazing fast O(1) average-time lookups, insertions, and deletions for large associative datasets.',
    realWorldUseCases: [
      'Database indexes for fast row lookups',
      'In-memory caches (Redis, Memcached)',
      'Compilers symbol tables for identifier variable resolution',
      'Counting frequencies in data analytics'
    ],
    algorithmSteps: [
      'Hashing: Key string is converted into a hash code integer.',
      'Compression: Hash integer modulo array size: index = hash % capacity.',
      'Collision Resolution: Chaining (linked lists in buckets) or Open Addressing (linear probing).',
      'Rehashing: When load factor (items/buckets) exceeds threshold (~0.7), double array size and rehash.'
    ],
    syntaxCode: `// Native JavaScript Map and Object implement hash tables
const phoneBook = new Map();

// Insert O(1)
phoneBook.set("Alice", "555-0199");
phoneBook.set("Bob", "555-0142");

// Lookup O(1)
console.log(phoneBook.get("Alice")); // "555-0199"
console.log(phoneBook.has("Charlie")); // false`,
    exampleCode: `// Simple custom Hash Table with separate chaining
class SimpleHashTable {
  constructor(size = 8) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.size = size;
  }
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }
  set(key, val) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const found = bucket.find(pair => pair[0] === key);
    if (found) found[1] = val;
    else bucket.push([key, val]);
  }
  get(key) {
    const idx = this._hash(key);
    const found = this.buckets[idx].find(pair => pair[0] === key);
    return found ? found[1] : undefined;
  }
}

const ht = new SimpleHashTable();
ht.set("lang", "JavaScript");
console.log("Got key 'lang':", ht.get("lang"));`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1) for search, insert, delete',
      worst: 'O(n) if all keys collide into the same bucket',
      explanation: 'With a good uniform hash function, collisions are rare, achieving constant O(1) operations.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Space is proportional to the number of stored key-value pairs plus bucket capacity.'
    },
    practiceExercises: [
      {
        title: 'Two Sum Problem',
        prompt: 'Given an array of integers and a target, return indices of the two numbers such that they add up to target.',
        hint: 'Use a hash map to store complement (target - num) and index.'
      }
    ],
    quiz: [
      {
        id: 'ht-q1',
        question: 'What is the average time complexity of finding a value by key in a Hash Table?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        answerIndex: 0,
        explanation: 'Average lookup is O(1) because the hash function directly computes the bucket index.'
      }
    ],
    challenge: {
      id: 'ht-ch1',
      title: 'First Unique Character in String',
      instruction: 'Find the first non-repeating character in a string and return its index. If it does not exist, return -1.',
      starterCode: `function firstUniqChar(s) {
  // Your code here
  return -1;
}`,
      solutionCode: `function firstUniqChar(s) {
  const map = {};
  for (const ch of s) map[ch] = (map[ch] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) return i;
  }
  return -1;
}`,
      testCases: [
        { input: '"leetcode"', expectedOutput: '0', description: 'Letter l appears once at index 0' },
        { input: '"loveleetcode"', expectedOutput: '2', description: 'Letter v appears once at index 2' },
        { input: '"aabb"', expectedOutput: '-1', description: 'All characters repeat' }
      ],
      hints: ['Use an object or Map to count frequencies, then iterate through string to check for count === 1.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="hash-table">
  <div class="bucket"><span class="b-idx">[0]</span> <span class="val">"user_1" &rarr; "Alice"</span></div>
  <div class="bucket"><span class="b-idx">[1]</span> <span class="val empty">Empty</span></div>
  <div class="bucket active"><span class="b-idx">[2]</span> <span class="val">"user_3" &rarr; "Charlie"</span></div>
</div>`,
      css: `.hash-table { display: flex; flex-direction: column; gap: 6px; }
.bucket { display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; }
.bucket.active { border-color: #6366f1; background: #eef2ff; }
.b-idx { font-family: monospace; font-weight: bold; color: #475569; }`,
      js: `console.log("HTML buckets show keys mapped to computed array slots.");`,
      explanation: 'HTML lists represent buckets where keys are hashed to specific bucket indices.'
    }
  },

  {
    id: 'sets-maps',
    slug: 'sets-maps',
    name: 'Sets and Maps',
    category: 'data-structures',
    difficulty: 'Beginner',
    order: 7,
    estimatedMinutes: 15,
    visualizerType: 'array',
    shortDesc: 'Mathematical unique collections (Set) and key-value dictionaries (Map).',
    introduction: 'A Set is a collection of unique values where duplicate items are automatically discarded. A Map is a dictionary that holds key-value pairs where any value (including objects) can be used as a key.',
    whatIsIt: 'A Set is like a guest list for a VIP party: each person name can only appear once. A Map is like a student ID database connecting each ID number with a complete student profile.',
    whyUseIt: 'Use Sets for deduplication, membership checks, and set operations (union, intersection). Use Maps when keys are dynamic or not limited to strings.',
    realWorldUseCases: [
      'Removing duplicates from search result sets',
      'Tracking visited nodes in graph traversals to avoid infinite cycles',
      'Caching function computation results keyed by argument objects',
      'Role-based permissions membership checking'
    ],
    algorithmSteps: [
      'Set.add(val): Hashes value, inserts if not present, maintains uniqueness.',
      'Set.has(val): O(1) membership existence test.',
      'Map.set(k, v): Associates key with value in internal hash table.',
      'Map.get(k): Retrieves mapped value in O(1) time.'
    ],
    syntaxCode: `// Set: unique items only
const uniqueTags = new Set(["coding", "javascript", "coding", "web"]);
console.log(uniqueTags.size); // 3

// Map: any type of key
const metadata = new Map();
metadata.set({ id: 1 }, "User Object Key");`,
    exampleCode: `// Find intersection of two arrays using Set
function arrayIntersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();
  for (const n of nums2) {
    if (set1.has(n)) result.add(n);
  }
  return Array.from(result);
}

console.log("Intersection:", arrayIntersection([1, 2, 2, 1], [2, 2, 3])); // [2]`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1) for add, delete, has',
      worst: 'O(n) during hash collisions',
      explanation: 'Both Set and Map are hash-table backed in JavaScript, ensuring constant average time.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Memory scales with unique items or key-value entries.'
    },
    practiceExercises: [
      {
        title: 'Contains Duplicate',
        prompt: 'Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.',
        hint: 'Insert items into a Set and check if set.size !== nums.length.'
      }
    ],
    quiz: [
      {
        id: 'sm-q1',
        question: 'What happens when you add a duplicate element to a JavaScript Set?',
        options: ['It is ignored', 'An error is thrown', 'It overwrites the old element', 'It appends at index 0'],
        answerIndex: 0,
        explanation: 'Sets strictly enforce uniqueness; duplicate additions are safely ignored without error.'
      }
    ],
    challenge: {
      id: 'sm-ch1',
      title: 'Longest Consecutive Sequence',
      instruction: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.',
      starterCode: `function longestConsecutive(nums) {
  // Your code here
  return 0;
}`,
      solutionCode: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;
  for (const n of set) {
    // Only check if n is the start of a streak
    if (!set.has(n - 1)) {
      let currentNum = n;
      let currentStreak = 1;
      while (set.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }
      longest = Math.max(longest, currentStreak);
    }
  }
  return longest;
}`,
      testCases: [
        { input: '[100, 4, 200, 1, 3, 2]', expectedOutput: '4', description: 'Sequence 1, 2, 3, 4 has length 4' },
        { input: '[0,3,7,2,5,8,4,6,0,1]', expectedOutput: '9', description: 'Sequence 0..8 has length 9' }
      ],
      hints: ['Store all numbers in a Set. Only start counting if (num - 1) is not in the set.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="set-view">
  <div class="set-bubble">12</div>
  <div class="set-bubble">45</div>
  <div class="set-bubble">78</div>
  <div class="set-bubble new">99 (Added)</div>
</div>`,
      css: `.set-view { display: flex; gap: 8px; flex-wrap: wrap; }
.set-bubble { padding: 8px 16px; border-radius: 999px; background: #e0e7ff; color: #4338ca; font-weight: bold; }
.set-bubble.new { background: #10b981; color: white; }`,
      js: `console.log("HTML pills show unique set membership.");`,
      explanation: 'Visualized as distinct colored pill badges representing set elements.'
    }
  },

  {
    id: 'trees',
    slug: 'trees',
    name: 'Trees',
    category: 'data-structures',
    difficulty: 'Intermediate',
    order: 8,
    estimatedMinutes: 20,
    visualizerType: 'tree',
    shortDesc: 'Hierarchical non-linear structure with a root node and parent-child relationships.',
    introduction: 'A Tree is a non-linear hierarchical data structure consisting of nodes connected by edges. Each tree has a single root node, and every child node has exactly one parent node (except the root).',
    whatIsIt: 'Think of an organizational hierarchy chart in a company: CEO at the top, Vice Presidents reporting to the CEO, Managers reporting to Vice Presidents, and Engineers reporting to Managers.',
    whyUseIt: 'Naturally models hierarchical relationships like folder directory trees, DOM trees, and decision processes.',
    realWorldUseCases: [
      'Document Object Model (DOM) rendered by web browsers',
      'File system directory hierarchies (folders containing subfolders and files)',
      'Abstract Syntax Trees (AST) in Babel, TypeScript, and compilers',
      'Artificial intelligence decision trees'
    ],
    algorithmSteps: [
      'Root: The topmost node without a parent.',
      'Leaves: Nodes with zero children.',
      'Depth: Number of edges from root to a node.',
      'Height: Maximum number of edges from node to a leaf.',
      'Traversals: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root), Level-Order (Breadth).'
    ],
    syntaxCode: `class TreeNode {
  constructor(val) {
    this.value = val;
    this.children = [];
  }
  addChild(node) {
    this.children.push(node);
  }
}`,
    exampleCode: `// Binary Tree Traversals
class BinaryNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function inorder(root, acc = []) {
  if (!root) return acc;
  inorder(root.left, acc);
  acc.push(root.val);
  inorder(root.right, acc);
  return acc;
}

const root = new BinaryNode(1);
root.left = new BinaryNode(2);
root.right = new BinaryNode(3);
root.left.left = new BinaryNode(4);
console.log("Inorder Traversal:", inorder(root)); // [4, 2, 1, 3]`,
    timeComplexity: {
      best: 'O(log n) for balanced tree search',
      average: 'O(log n)',
      worst: 'O(n) for degenerate skewed tree',
      explanation: 'Balanced trees halve the remaining search space with each step. Degenerate trees behave like linked lists.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Storing n nodes plus call stack recursion frames during traversal.'
    },
    practiceExercises: [
      {
        title: 'Maximum Depth of Binary Tree',
        prompt: 'Given the root of a binary tree, return its maximum depth.',
        hint: 'Depth is 1 + Math.max(depth(root.left), depth(root.right)).'
      }
    ],
    quiz: [
      {
        id: 'tr-q1',
        question: 'Which traversal visits nodes in the order: Left Subtree -> Root -> Right Subtree?',
        options: ['Inorder Traversal', 'Preorder Traversal', 'Postorder Traversal', 'Level-order Traversal'],
        answerIndex: 0,
        explanation: 'Inorder traversal visits Left first, then Root, then Right.'
      }
    ],
    challenge: {
      id: 'tr-ch1',
      title: 'Invert Binary Tree',
      instruction: 'Given the root of a binary tree, invert the tree (swap left and right child of every node) and return its root.',
      starterCode: `function invertTree(root) {
  // Your code here
  return root;
}`,
      solutionCode: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
      testCases: [
        { input: 'Root [4, 2, 7]', expectedOutput: 'Root [4, 7, 2]', description: 'Left and right swapped' }
      ],
      hints: ['Recursively swap root.left and root.right.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="tree-node root">
  <div class="circle">1</div>
  <div class="branches">
    <div class="tree-node"><div class="circle">2</div></div>
    <div class="tree-node"><div class="circle">3</div></div>
  </div>
</div>`,
      css: `.tree-node { display: flex; flex-direction: column; align-items: center; }
.circle { width: 36px; height: 36px; border-radius: 50%; background: #4f46e5; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.branches { display: flex; gap: 24px; margin-top: 12px; }`,
      js: `console.log("HTML nested flex columns represent hierarchical tree branches.");`,
      explanation: 'Tree nodes are represented by nested flex containers with SVG connectors or CSS border lines.'
    }
  },

  {
    id: 'binary-search-trees',
    slug: 'binary-search-trees',
    name: 'Binary Search Trees',
    category: 'data-structures',
    difficulty: 'Intermediate',
    order: 9,
    estimatedMinutes: 20,
    visualizerType: 'tree',
    shortDesc: 'Ordered binary tree where left subtree < node and right subtree > node.',
    introduction: 'A Binary Search Tree (BST) is an ordered tree data structure with the invariant: for any node, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater.',
    whatIsIt: 'Think of a high-low guessing game. With every question ("Is the secret number higher or lower than 50?"), you eliminate half of the remaining numbers immediately.',
    whyUseIt: 'Combines the fast lookup speeds of a binary search array with the dynamic insertion and deletion flexibility of a linked list.',
    realWorldUseCases: [
      'Self-balancing trees (AVL, Red-Black trees in Java TreeMap and C++ std::map)',
      'Database B-Trees and indexing engines',
      'Auto-complete dictionary prefix matches',
      'Range query lookups (find all items between price $20 and $50)'
    ],
    algorithmSteps: [
      'Search: Compare target with root. If equal, found. If smaller, recurse left. If greater, recurse right.',
      'Insert: Traverse until finding a null reference adhering to the BST property, attach new node.',
      'Delete Leaf: Simply remove pointer from parent.',
      'Delete Node with 1 Child: Replace node with its child.',
      'Delete Node with 2 Children: Replace with inorder successor (smallest in right subtree) and delete successor.'
    ],
    syntaxCode: `class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }
  insert(val) {
    const node = new BSTNode(val);
    if (!this.root) return (this.root = node);
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = node; break; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; break; }
        curr = curr.right;
      }
    }
  }
}`,
    exampleCode: `// Search in BST
function searchBST(root, val) {
  let curr = root;
  while (curr) {
    if (curr.val === val) return true;
    if (val < curr.val) curr = curr.left;
    else curr = curr.right;
  }
  return false;
}

// Inorder traversal of BST yields sorted array
function bstToSorted(root, result = []) {
  if (!root) return result;
  bstToSorted(root.left, result);
  result.push(root.val);
  bstToSorted(root.right, result);
  return result;
}`,
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n) for search, insert, delete',
      worst: 'O(n) if inserted in sorted order forming a linked chain',
      explanation: 'Balanced BSTs divide the search space by half at each level, achieving logarithmic time.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Memory required to store n nodes.'
    },
    practiceExercises: [
      {
        title: 'Validate Binary Search Tree',
        prompt: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
        hint: 'Pass (min, max) valid ranges down during recursive traversal.'
      }
    ],
    quiz: [
      {
        id: 'bst-q1',
        question: 'What order does an Inorder traversal produce on a Binary Search Tree?',
        options: ['Ascending sorted order', 'Descending sorted order', 'Random order', 'Reverse level order'],
        answerIndex: 0,
        explanation: 'Because Left < Root < Right, an inorder traversal always produces strictly ascending sorted order.'
      }
    ],
    challenge: {
      id: 'bst-ch1',
      title: 'Lowest Common Ancestor in BST',
      instruction: 'Given a BST and two nodes p and q, find their Lowest Common Ancestor (LCA).',
      starterCode: `function lowestCommonAncestor(root, p, q) {
  // Your code here
  return root;
}`,
      solutionCode: `function lowestCommonAncestor(root, p, q) {
  let curr = root;
  while (curr) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;
    } else {
      return curr;
    }
  }
  return null;
}`,
      testCases: [
        { input: 'p=2, q=8 in BST with root=6', expectedOutput: '6', description: 'Root 6 splits 2 and 8' }
      ],
      hints: ['If both p and q are less than current node, go left. If both are greater, go right. Otherwise, current node is LCA.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="bst-diagram">
  <div class="node-level">
    <span class="bst-node root">50</span>
  </div>
  <div class="node-level">
    <span class="bst-node left">30</span>
    <span class="bst-node right">70</span>
  </div>
</div>`,
      css: `.bst-diagram { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.node-level { display: flex; gap: 40px; justify-content: center; }
.bst-node { width: 40px; height: 40px; border-radius: 50%; background: #4f46e5; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }`,
      js: `console.log("BST visualization dynamically calculates positions.");`,
      explanation: 'SVG lines connect parent circles with left/right child nodes styled via CSS.'
    }
  },

  {
    id: 'heaps-priority-queues',
    slug: 'heaps-priority-queues',
    name: 'Heaps and Priority Queues',
    category: 'data-structures',
    difficulty: 'Advanced',
    order: 10,
    estimatedMinutes: 25,
    visualizerType: 'tree',
    shortDesc: 'Complete binary tree satisfying heap property for O(1) top priority retrieval.',
    introduction: 'A Binary Heap is a complete binary tree that satisfies the heap property. In a Max-Heap, the key at the root is the maximum among all keys. In a Min-Heap, the root key is the minimum.',
    whatIsIt: 'Think of an emergency room triage system. Patients are not treated strictly on arrival time; rather, the patient with the highest medical severity (priority) is treated first.',
    whyUseIt: 'Provides O(1) access to highest/lowest priority item, O(log n) insertions, and O(log n) removal of the priority element.',
    realWorldUseCases: [
      'Operating system CPU scheduler and task priority queues',
      'Dijkstra shortest path and Prim minimum spanning tree algorithms',
      'Real-time streaming top-K items and median tracking',
      'Heapsort sorting algorithm'
    ],
    algorithmSteps: [
      'Array Representation: Left child of i = 2*i + 1; Right child = 2*i + 2; Parent of i = Math.floor((i - 1) / 2).',
      'Insert: Push to end of array, then "bubble up" (heapify-up) by swapping with parent until heap property holds.',
      'Extract Min/Max: Swap root with last element, pop last element, then "bubble down" (heapify-down) root element.'
    ],
    syntaxCode: `class MinHeap {
  constructor() { this.heap = []; }
  peek() { return this.heap[0]; }
  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  _bubbleUp(idx) {
    while (idx > 0) {
      const p = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[p]) break;
      [this.heap[idx], this.heap[p]] = [this.heap[p], this.heap[idx]];
      idx = p;
    }
  }
  _bubbleDown(idx) {
    const len = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < len && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < len && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}`,
    exampleCode: `const h = new MinHeap();
h.push(40);
h.push(10);
h.push(30);
h.push(5);
console.log("Peek min:", h.peek()); // 5
console.log("Extracted:", h.pop()); // 5
console.log("Next min:", h.peek()); // 10`,
    timeComplexity: {
      best: 'O(1) for peek',
      average: 'O(log n) for insert and extract',
      worst: 'O(log n)',
      explanation: 'Since the tree is always a complete binary tree of height log n, bubble up and bubble down take at most log n comparisons.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Can be stored in a flat contiguous array without pointers.'
    },
    practiceExercises: [
      {
        title: 'Kth Largest Element in an Array',
        prompt: 'Find the kth largest element in an unsorted array using a min-heap.',
        hint: 'Maintain a min-heap of size k. The root of the heap will be the kth largest.'
      }
    ],
    quiz: [
      {
        id: 'hp-q1',
        question: 'In an array-backed binary heap, what is the formula for the left child of index i?',
        options: ['2 * i + 1', '2 * i', 'i / 2', '2 * i + 2'],
        answerIndex: 0,
        explanation: 'For 0-indexed heaps, left child is at 2*i + 1 and right child is at 2*i + 2.'
      }
    ],
    challenge: {
      id: 'hp-ch1',
      title: 'Merge K Sorted Lists',
      instruction: 'Merge k sorted linked lists and return it as one sorted list using a priority queue concept.',
      starterCode: `function mergeKLists(lists) {
  // Your code here
  return null;
}`,
      solutionCode: `function mergeKLists(lists) {
  const vals = [];
  for (const list of lists) {
    let curr = list;
    while (curr) {
      vals.push(curr.val);
      curr = curr.next;
    }
  }
  vals.sort((a, b) => a - b);
  let dummy = { next: null };
  let curr = dummy;
  for (const v of vals) {
    curr.next = { val: v, next: null };
    curr = curr.next;
  }
  return dummy.next;
}`,
      testCases: [
        { input: '3 lists with elements', expectedOutput: 'Sorted merged single list', description: 'Returns combined sorted order' }
      ],
      hints: ['Extract values into a priority queue/heap and construct output list.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="heap-array">
  <div class="heap-elem root">10 (Root)</div>
  <div class="heap-elem">20</div>
  <div class="heap-elem">15</div>
  <div class="heap-elem">30</div>
</div>`,
      css: `.heap-array { display: flex; gap: 6px; }
.heap-elem { padding: 8px 12px; background: #e2e8f0; border-radius: 4px; font-weight: bold; }
.heap-elem.root { background: #f59e0b; color: white; }`,
      js: `console.log("HTML array cells represent binary heap levels.");`,
      explanation: 'Heaps can be visualized simultaneously as flat array cells and as hierarchical binary tree nodes.'
    }
  },

  {
    id: 'graphs',
    slug: 'graphs',
    name: 'Graphs',
    category: 'data-structures',
    difficulty: 'Advanced',
    order: 11,
    estimatedMinutes: 25,
    visualizerType: 'graph',
    shortDesc: 'Networks of vertices (nodes) interconnected by directional or weighted edges.',
    introduction: 'A Graph is a non-linear data structure consisting of a finite set of vertices (or nodes) and a set of edges connecting pairs of vertices. Graphs can be directed or undirected, and edges can be weighted or unweighted.',
    whatIsIt: 'Think of a flight route map: airports are vertices, and direct flight paths between them are edges. Or social networks: user profiles are vertices, and friendship connections are edges.',
    whyUseIt: 'The ultimate modeling tool for networks, routing, recommendations, dependencies, and complex relationships.',
    realWorldUseCases: [
      'GPS navigation and shortest road path calculation (Google Maps)',
      'Social network friend recommendations and connection degrees',
      'Web crawlers indexing the World Wide Web link graph',
      'Package dependency resolution in npm, cargo, and pip'
    ],
    algorithmSteps: [
      'Adjacency List: Map each vertex to an array/list of its adjacent neighboring vertices (space efficient).',
      'Adjacency Matrix: 2D array matrix[u][v] = 1 if edge exists (O(1) edge lookup).',
      'Traversal: Visit all vertices using Breadth-First Search (BFS) or Depth-First Search (DFS).'
    ],
    syntaxCode: `// Graph representation via Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }
  addVertex(v) {
    if (!this.adjacencyList.has(v)) this.adjacencyList.set(v, []);
  }
  addEdge(v1, v2) {
    this.adjacencyList.get(v1).push(v2);
    this.adjacencyList.get(v2).push(v1); // undirected
  }
}`,
    exampleCode: `const g = new Map();
function addEdge(u, v) {
  if (!g.has(u)) g.set(u, []);
  if (!g.has(v)) g.set(v, []);
  g.get(u).push(v);
  g.get(v).push(u);
}

addEdge("A", "B");
addEdge("A", "C");
addEdge("B", "D");
addEdge("C", "E");

console.log("Neighbors of A:", g.get("A")); // ['B', 'C']`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E) for BFS / DFS',
      worst: 'O(V + E) where V is vertices, E is edges',
      explanation: 'Every vertex is enqueued/visited once, and every incident edge is inspected.'
    },
    spaceComplexity: {
      worst: 'O(V + E)',
      explanation: 'Adjacency list stores V lists containing 2E total entries.'
    },
    practiceExercises: [
      {
        title: 'Find If Path Exists in Graph',
        prompt: 'Given an undirected graph and two vertices source and destination, determine if there is a valid path.',
        hint: 'Use BFS with a queue and visited set starting at source.'
      }
    ],
    quiz: [
      {
        id: 'gr-q1',
        question: 'Which representation of a graph is most memory efficient for sparse graphs?',
        options: ['Adjacency List', 'Adjacency Matrix', '2D Flat Array', 'Complete Binary Tree'],
        answerIndex: 0,
        explanation: 'Adjacency lists use O(V + E) space, whereas an adjacency matrix consumes O(V²) regardless of edge count.'
      }
    ],
    challenge: {
      id: 'gr-ch1',
      title: 'Number of Connected Islands',
      instruction: 'Given an m x n 2D binary grid representing a map of 1s (land) and 0s (water), count the number of islands.',
      starterCode: `function numIslands(grid) {
  // Your code here
  return 0;
}`,
      solutionCode: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      testCases: [
        { input: '3x3 grid with 1 island', expectedOutput: '1', description: 'Single contiguous island' },
        { input: 'Grid with 3 separate 1s', expectedOutput: '3', description: '3 disconnected islands' }
      ],
      hints: ['Run DFS/BFS when encountering an unvisited 1, sinking the connected island by setting values to 0.']
    },
    htmlVisualizerSnippet: {
      html: `<svg class="graph-svg" width="200" height="120">
  <line x1="40" y1="60" x2="160" y2="60" stroke="#94a3b8" stroke-width="2" />
  <circle cx="40" cy="60" r="18" fill="#6366f1" />
  <text x="40" y="65" fill="white" font-size="12" text-anchor="middle">A</text>
  <circle cx="160" cy="60" r="18" fill="#10b981" />
  <text x="160" y="65" fill="white" font-size="12" text-anchor="middle">B</text>
</svg>`,
      css: `.graph-svg circle { transition: all 0.3s; cursor: pointer; }`,
      js: `console.log("SVG elements render graph nodes and edges cleanly in HTML.");`,
      explanation: 'SVG circles represent graph vertices and SVG line tags represent interconnecting graph edges.'
    }
  },

  {
    id: 'tries',
    slug: 'tries',
    name: 'Tries',
    category: 'data-structures',
    difficulty: 'Advanced',
    order: 12,
    estimatedMinutes: 20,
    visualizerType: 'tree',
    shortDesc: 'Prefix search tree optimized for storing strings and fast retrieval by prefix.',
    introduction: 'A Trie (pronounced "try" or "tree"), also called a digital tree or prefix tree, is a specialized search tree where keys are usually strings. Rather than entire keys being compared, each node represents an individual character of a word.',
    whatIsIt: 'Think of auto-complete on your smartphone keyboard. As you type "c-a-t", the keyboard follows the "c" branch, then "a", then "t", instantly seeing all possible word continuations.',
    whyUseIt: 'Enables ultra-fast O(L) prefix searches and dictionary word checks where L is word length, independent of dictionary size.',
    realWorldUseCases: [
      'Search engine autocomplete and query suggestions',
      'Spell checkers and autocorrect dictionaries',
      'IP routing longest prefix match tables',
      'Boggle word game solvers'
    ],
    algorithmSteps: [
      'TrieNode: Contains children map/array and isEndOfWord boolean flag.',
      'Insert: Walk down tree character by character. Create missing nodes. Mark last node isEndOfWord = true.',
      'Search: Traverse character by character. If a character node is missing, return false. Return last node isEndOfWord.',
      'StartsWith (Prefix search): Same as search, but returns true if prefix path exists regardless of isEndOfWord.'
    ],
    syntaxCode: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children[ch]) curr.children[ch] = new TrieNode();
      curr = curr.children[ch];
    }
    curr.isEnd = true;
  }
}`,
    exampleCode: `const t = new Trie();
t.insert("apple");
t.insert("app");

console.log("Search 'app':", t.search("app")); // true
console.log("Search 'appl':", t.search("appl")); // false (prefix only)
console.log("StartsWith 'app':", t.startsWith("app")); // true`,
    timeComplexity: {
      best: 'O(L)',
      average: 'O(L) for insert, search, prefix where L = word length',
      worst: 'O(L)',
      explanation: 'Search time depends purely on the length of the string, completely independent of how many millions of words exist in the dictionary.'
    },
    spaceComplexity: {
      worst: 'O(ALPHABET_SIZE * L * N)',
      explanation: 'Can consume significant memory if words do not share common prefixes.'
    },
    practiceExercises: [
      {
        title: 'Word Search II',
        prompt: 'Given an m x n board of characters and a list of strings words, return all words on the board using a Trie.',
        hint: 'Build a Trie from words list and run backtracking DFS from every cell.'
      }
    ],
    quiz: [
      {
        id: 'tri-q1',
        question: 'What is the search time complexity for a word of length L in a Trie containing 1,000,000 words?',
        options: ['O(L)', 'O(1,000,000)', 'O(log 1,000,000)', 'O(L * 1,000,000)'],
        answerIndex: 0,
        explanation: 'Trie search time depends strictly on the word length L, unaffected by the total number of dictionary words.'
      }
    ],
    challenge: {
      id: 'tri-ch1',
      title: 'Implement Prefix Trie',
      instruction: 'Implement a Trie with insert, search, and startsWith methods.',
      starterCode: `class Trie {
  constructor() {
    this.root = {};
  }
  insert(word) {
    // Insert word
  }
  search(word) {
    // Return true if word in trie
  }
  startsWith(prefix) {
    // Return true if prefix exists
  }
}`,
      solutionCode: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node[ch]) return false;
      node = node[ch];
    }
    return !!node.isEnd;
  }
  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node[ch]) return false;
      node = node[ch];
    }
    return true;
  }
}`,
      testCases: [
        { input: 'insert("apple"), search("apple")', expectedOutput: 'true', description: 'Found inserted word' },
        { input: 'search("app")', expectedOutput: 'false', description: 'app was not marked as word end' },
        { input: 'startsWith("app")', expectedOutput: 'true', description: 'Prefix app exists' }
      ],
      hints: ['Use nested JavaScript plain objects as character children.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="trie-node">
  <span class="char-badge">c</span>
  <span class="char-badge">&rarr; a</span>
  <span class="char-badge">&rarr; t (End)</span>
</div>`,
      css: `.trie-node { display: flex; align-items: center; gap: 4px; }
.char-badge { padding: 4px 8px; border-radius: 4px; background: #e0f2fe; color: #0284c7; font-family: monospace; font-weight: bold; }`,
      js: `console.log("HTML breadcrumbs showcase Trie character sequences.");`,
      explanation: 'Trie paths are rendered in HTML as hierarchical character badges connecting letter to letter.'
    }
  },

  // =========================================================================
  // ALGORITHMS (15 Topics)
  // =========================================================================
  {
    id: 'linear-search',
    slug: 'linear-search',
    name: 'Linear Search',
    category: 'algorithms',
    difficulty: 'Beginner',
    order: 13,
    estimatedMinutes: 10,
    visualizerType: 'searching',
    shortDesc: 'Sequential scanning of elements from start to end until target is found.',
    introduction: 'Linear Search is the simplest search algorithm. It examines each item in a collection sequentially from the beginning until either the desired item is found or the end of the collection is reached.',
    whatIsIt: 'Looking for a lost key in a messy room by checking every single drawer and pocket one by one until you find it.',
    whyUseIt: 'Use on unsorted collections or small datasets where sorting overhead is not justified.',
    realWorldUseCases: [
      'Finding a contact in an unsorted address book',
      'Searching for a specific string pattern in a small configuration file',
      'Verifying if a user ID exists in an un-indexed array'
    ],
    algorithmSteps: [
      'Start at index 0.',
      'Compare element at current index with target value.',
      'If element matches target, return current index.',
      'If not matching, advance index by 1 and repeat.',
      'If end of array is reached without match, return -1.'
    ],
    syntaxCode: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // Found at index i
  }
  return -1; // Not found
}`,
    exampleCode: `const data = [23, 45, 12, 89, 34, 67];
console.log("Index of 89:", linearSearch(data, 89)); // 3
console.log("Index of 99:", linearSearch(data, 99)); // -1`,
    timeComplexity: {
      best: 'O(1) if target is at index 0',
      average: 'O(n / 2) = O(n)',
      worst: 'O(n) if target is at the last index or absent',
      explanation: 'Must inspect up to n elements in the worst case.'
    },
    spaceComplexity: {
      worst: 'O(1)',
      explanation: 'Requires only a single index pointer variable.'
    },
    practiceExercises: [
      {
        title: 'Find First Negative Number',
        prompt: 'Use linear search to find the index of the first negative number in an array.',
        hint: 'Loop through array and return i when arr[i] < 0.'
      }
    ],
    quiz: [
      {
        id: 'ls-q1',
        question: 'What is the worst-case time complexity of Linear Search on an array of size n?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        answerIndex: 0,
        explanation: 'In the worst case, every element must be checked, taking O(n) comparisons.'
      }
    ],
    challenge: {
      id: 'ls-ch1',
      title: 'Find Target Index with Duplicates',
      instruction: 'Return the index of the last occurrence of target in arr, or -1 if not found.',
      starterCode: `function findLastIndex(arr, target) {
  // Your code here
  return -1;
}`,
      solutionCode: `function findLastIndex(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      testCases: [
        { input: '[1, 2, 3, 2, 5], 2', expectedOutput: '3', description: 'Last occurrence of 2 is at index 3' },
        { input: '[1, 2, 3], 9', expectedOutput: '-1', description: '9 is not present' }
      ],
      hints: ['Iterate backward from arr.length - 1 down to 0.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="search-cells">
  <div class="cell checked">10</div>
  <div class="cell checked">25</div>
  <div class="cell active">42 (Comparing)</div>
  <div class="cell">58</div>
</div>`,
      css: `.search-cells { display: flex; gap: 8px; }
.cell { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border: 2px solid #cbd5e1; border-radius: 6px; }
.cell.checked { background: #f1f5f9; color: #94a3b8; }
.cell.active { background: #fef08a; border-color: #eab308; font-weight: bold; }`,
      js: `console.log("HTML elements light up in sequence during linear scan.");`,
      explanation: 'Array cells highlight one by one as the search pointer advances from index 0 to n-1.'
    }
  },

  {
    id: 'binary-search',
    slug: 'binary-search',
    name: 'Binary Search',
    category: 'algorithms',
    difficulty: 'Beginner',
    order: 14,
    estimatedMinutes: 15,
    visualizerType: 'searching',
    shortDesc: 'Divide-and-conquer search on sorted arrays in logarithmic O(log n) time.',
    introduction: 'Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.',
    whatIsIt: 'Looking up a word in a printed dictionary: you open the book right in the middle. If your word comes after, you discard the entire first half and repeat on the second half.',
    whyUseIt: 'Tremendously faster than linear search. Searching through 1,000,000 items takes at most ~20 comparisons!',
    realWorldUseCases: [
      'Database B-Tree index lookups',
      'Git bisect finding the exact commit that introduced a bug',
      'Standard library searches (Array.bsearch, std::binary_search)',
      'Finding square roots and mathematical numerical optimizations'
    ],
    algorithmSteps: [
      'Require: Array must be sorted.',
      'Initialize left = 0, right = arr.length - 1.',
      'Calculate mid = Math.floor((left + right) / 2).',
      'If arr[mid] === target, return mid.',
      'If arr[mid] < target, eliminate left half: left = mid + 1.',
      'If arr[mid] > target, eliminate right half: right = mid - 1.',
      'Repeat while left <= right. If not found, return -1.'
    ],
    syntaxCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    exampleCode: `const sortedData = [4, 8, 15, 16, 23, 42, 55, 68, 77, 90];
console.log("Found 42 at index:", binarySearch(sortedData, 42)); // 5
console.log("Found 100 at index:", binarySearch(sortedData, 100)); // -1`,
    timeComplexity: {
      best: 'O(1) if target is at mid on first check',
      average: 'O(log n)',
      worst: 'O(log n)',
      explanation: 'The search space is cut in half on every single comparison step.'
    },
    spaceComplexity: {
      worst: 'O(1)',
      explanation: 'Iterative implementation uses only 3 pointers (left, mid, right).'
    },
    practiceExercises: [
      {
        title: 'Search Insert Position',
        prompt: 'Given a sorted array and target, return index if target is found. If not, return index where it would be inserted in order.',
        hint: 'When loop terminates without match, left points to the insert position.'
      }
    ],
    quiz: [
      {
        id: 'bs-q1',
        question: 'What prerequisite must be met before executing Binary Search on an array?',
        options: ['The array must be sorted', 'The array must contain only positive integers', 'The array size must be a power of 2', 'The array must not contain duplicates'],
        answerIndex: 0,
        explanation: 'Binary Search relies on sorted order to determine whether to search left or right.'
      }
    ],
    challenge: {
      id: 'bs-ch1',
      title: 'First Bad Version',
      instruction: 'Suppose you have versions [1, 2, ..., n] and you want to find the first bad one using isBadVersion(v) API in minimal calls.',
      starterCode: `function firstBadVersion(n, isBadVersion) {
  // Return the first version that is bad
  let left = 1;
  let right = n;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (isBadVersion(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
      solutionCode: `function firstBadVersion(n, isBadVersion) {
  let left = 1;
  let right = n;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (isBadVersion(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
      testCases: [
        { input: 'n=5, bad=4', expectedOutput: '4', description: 'First bad version found at 4' }
      ],
      hints: ['Binary search for the boundary where isBadVersion changes from false to true.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="bs-container">
  <div class="bs-cell eliminated">5</div>
  <div class="bs-cell ptr-left">12 (L)</div>
  <div class="bs-cell ptr-mid">24 (M)</div>
  <div class="bs-cell ptr-right">38 (R)</div>
  <div class="bs-cell eliminated">60</div>
</div>`,
      css: `.bs-container { display: flex; gap: 8px; }
.bs-cell { width: 55px; height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid #cbd5e1; border-radius: 6px; font-weight: bold; }
.bs-cell.eliminated { opacity: 0.3; background: #e2e8f0; }
.bs-cell.ptr-mid { background: #fef08a; border-color: #ca8a04; }`,
      js: `console.log("HTML dynamically dims eliminated array halves.");`,
      explanation: 'Visualizer highlights Left, Mid, and Right pointers while graying out eliminated halves.'
    }
  },

  {
    id: 'bubble-sort',
    slug: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'algorithms',
    difficulty: 'Beginner',
    order: 15,
    estimatedMinutes: 15,
    visualizerType: 'sorting',
    shortDesc: 'Repeatedly steps through list, swaps adjacent elements in wrong order.',
    introduction: 'Bubble Sort is a straightforward comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    whatIsIt: 'Think of air bubbles rising in a glass of soda. The larger bubbles naturally rise to the surface faster. In each pass, the largest unsorted number "bubbles up" to its correct position at the end.',
    whyUseIt: 'Easy to understand and implement; detects if an array is already sorted in O(n) with early exit.',
    realWorldUseCases: [
      'Educational demonstration of sorting and algorithm visualization',
      'Nearly sorted small datasets where early exit optimization is effective'
    ],
    algorithmSteps: [
      'Loop i from 0 to n - 1.',
      'Track swapped = false.',
      'Inner loop j from 0 to n - i - 1.',
      'Compare arr[j] with arr[j + 1].',
      'If arr[j] > arr[j + 1], swap them and set swapped = true.',
      'If no swaps occurred in the entire inner pass, break early (array is sorted).'
    ],
    syntaxCode: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    exampleCode: `const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Before:", numbers);
console.log("Sorted:", bubbleSort([...numbers]));`,
    timeComplexity: {
      best: 'O(n) when array is already sorted',
      average: 'O(n²)',
      worst: 'O(n²) when array is reverse sorted',
      explanation: 'Requires (n * (n - 1)) / 2 comparisons in the worst case.'
    },
    spaceComplexity: {
      worst: 'O(1)',
      explanation: 'In-place sorting algorithm requiring zero additional memory.'
    },
    practiceExercises: [
      {
        title: 'Count Swaps in Bubble Sort',
        prompt: 'Modify bubble sort to return the total number of swaps performed.',
        hint: 'Increment a counter variable each time a swap happens.'
      }
    ],
    quiz: [
      {
        id: 'bub-q1',
        question: 'What is the best-case time complexity of optimized Bubble Sort with an early-exit swapped flag?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
        answerIndex: 0,
        explanation: 'If the array is already sorted, only one pass of n comparisons is performed with zero swaps, exiting in O(n).'
      }
    ],
    challenge: {
      id: 'bub-ch1',
      title: 'Sort Colors (Dutch National Flag)',
      instruction: 'Given an array nums with n objects colored red, white, or blue (0, 1, or 2), sort them in-place so that objects of the same color are adjacent.',
      starterCode: `function sortColors(nums) {
  // Sort nums in-place
}`,
      solutionCode: `function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}`,
      testCases: [
        { input: '[2, 0, 2, 1, 1, 0]', expectedOutput: '[0, 0, 1, 1, 2, 2]', description: 'Sorted 0s, 1s, 2s' }
      ],
      hints: ['Use 3 pointers (low, mid, high) or bubble adjacent elements.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="bars">
  <div class="bar" style="height: 40px;">20</div>
  <div class="bar comparing" style="height: 80px;">40</div>
  <div class="bar comparing swap" style="height: 60px;">30</div>
  <div class="bar sorted" style="height: 120px;">60</div>
</div>`,
      css: `.bars { display: flex; align-items: flex-end; gap: 8px; height: 140px; }
.bar { width: 36px; background: #6366f1; color: white; display: flex; justify-content: center; border-radius: 4px 4px 0 0; }
.bar.comparing { background: #f59e0b; }
.bar.swap { background: #ef4444; }
.bar.sorted { background: #10b981; }`,
      js: `console.log("HTML bar heights represent values; CSS colors represent comparison/swap.");`,
      explanation: 'In HTML, sorting is visualized with vertical flexbox bars whose heights correspond to array values.'
    }
  },

  {
    id: 'selection-sort',
    slug: 'selection-sort',
    name: 'Selection Sort',
    category: 'algorithms',
    difficulty: 'Beginner',
    order: 16,
    estimatedMinutes: 15,
    visualizerType: 'sorting',
    shortDesc: 'Repeatedly finds the minimum element and places it at the sorted beginning.',
    introduction: 'Selection Sort divides the input list into two parts: a sorted sublist of items built up from left to right, and a sublist of the remaining unsorted items. It repeatedly selects the smallest unsorted element and moves it to the sorted section.',
    whatIsIt: 'Sorting a hand of playing cards: you scan all cards to find the smallest card (say, 2 of clubs) and move it to the far left. Then you scan the remaining cards for the next smallest and repeat.',
    whyUseIt: 'Minimizes the total number of swaps (at most n swaps), making it useful when memory write operations are significantly more expensive than reads (e.g. Flash EEPROM).',
    realWorldUseCases: [
      'Embedded devices with expensive EEPROM memory write cycles',
      'Small lists where swap cost dominates comparison cost'
    ],
    algorithmSteps: [
      'Outer loop i from 0 to n - 1.',
      'Assume current index i has minimum value: minIdx = i.',
      'Inner loop j from i + 1 to n - 1.',
      'If arr[j] < arr[minIdx], update minIdx = j.',
      'After inner loop, if minIdx !== i, swap arr[i] with arr[minIdx].'
    ],
    syntaxCode: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    exampleCode: `const data = [29, 10, 14, 37, 13];
console.log("Selection Sorted:", selectionSort([...data]));`,
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      explanation: 'Always performs (n * (n - 1)) / 2 comparisons regardless of initial array ordering.'
    },
    spaceComplexity: {
      worst: 'O(1)',
      explanation: 'In-place sorting with zero extra memory allocation.'
    },
    practiceExercises: [
      {
        title: 'Descending Selection Sort',
        prompt: 'Adapt selection sort to find the maximum element in each pass and sort in descending order.',
        hint: 'Change comparison to arr[j] > arr[maxIdx].'
      }
    ],
    quiz: [
      {
        id: 'sel-q1',
        question: 'How many element swaps does Selection Sort perform in the worst case on an array of length n?',
        options: ['At most n - 1 swaps', 'O(n²) swaps', 'O(n log n) swaps', 'O(1) swaps'],
        answerIndex: 0,
        explanation: 'Selection Sort makes at most 1 swap per outer loop pass, yielding at most n - 1 swaps in total.'
      }
    ],
    challenge: {
      id: 'sel-ch1',
      title: 'Find Kth Smallest without Full Sort',
      instruction: 'Run selection sort for k passes to find the kth smallest element in O(k * n) time.',
      starterCode: `function kthSmallest(arr, k) {
  // Your code here
  return 0;
}`,
      solutionCode: `function kthSmallest(arr, k) {
  const a = [...arr];
  for (let i = 0; i < k; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a[k - 1];
}`,
      testCases: [
        { input: '[7, 10, 4, 3, 20, 15], 3', expectedOutput: '7', description: '3rd smallest is 7 (3, 4, 7)' }
      ],
      hints: ['Stop the selection sort after k outer iterations.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="sel-row">
  <div class="box sorted">10</div>
  <div class="box sorted">13</div>
  <div class="box current-min">14 (Min)</div>
  <div class="box scanning">37</div>
</div>`,
      css: `.sel-row { display: flex; gap: 6px; }
.box { padding: 10px; border-radius: 4px; border: 2px solid #cbd5e1; }
.box.sorted { background: #dcfce7; border-color: #22c55e; }
.box.current-min { background: #fef08a; border-color: #eab308; }`,
      js: `console.log("HTML cards visually divide sorted and unsorted segments.");`,
      explanation: 'Visualizer highlights the current minimum found so far during the inner scan.'
    }
  },

  {
    id: 'insertion-sort',
    slug: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'algorithms',
    difficulty: 'Beginner',
    order: 17,
    estimatedMinutes: 15,
    visualizerType: 'sorting',
    shortDesc: 'Builds sorted array one element at a time by sliding it into position.',
    introduction: 'Insertion Sort builds the final sorted array one item at a time. It takes each element from the input data and slides it backward into its correct position among the already sorted elements.',
    whatIsIt: 'The natural way people sort a hand of cards: pick up one card at a time and insert it into the correct position between the cards you are already holding.',
    whyUseIt: 'Extremely efficient for small arrays (n < 50) and nearly-sorted arrays. Often used as the base-case cutoff in hybrid algorithms like Timsort (used in Python and Java).',
    realWorldUseCases: [
      'Hybrid sorting algorithms (Timsort, Introsort fallback for small partitions)',
      'Sorting streaming online data arriving in real time',
      'Nearly sorted arrays where elements are within k positions of final rank'
    ],
    algorithmSteps: [
      'Loop i from 1 to n - 1.',
      'Save current element key = arr[i].',
      'Initialize j = i - 1.',
      'While j >= 0 and arr[j] > key: shift arr[j] to arr[j + 1], decrement j.',
      'Place key at arr[j + 1].'
    ],
    syntaxCode: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    exampleCode: `const cards = [12, 11, 13, 5, 6];
console.log("Insertion Sorted:", insertionSort([...cards]));`,
    timeComplexity: {
      best: 'O(n) when array is already sorted',
      average: 'O(n²)',
      worst: 'O(n²) when reverse sorted',
      explanation: 'Only requires 1 comparison per element when the array is already in sorted order.'
    },
    spaceComplexity: {
      worst: 'O(1)',
      explanation: 'In-place sorting using a single temporary key variable.'
    },
    practiceExercises: [
      {
        title: 'Binary Insertion Sort',
        prompt: 'How could binary search be used to optimize insertion sort?',
        hint: 'Binary search can find the insert index in O(log n), though shifting elements still takes O(n).'
      }
    ],
    quiz: [
      {
        id: 'ins-q1',
        question: 'Why is Insertion Sort preferred for nearly-sorted data?',
        options: ['It runs in linear O(n) time', 'It uses recursive calls', 'It converts arrays to trees', 'It has O(1) space complexity'],
        answerIndex: 0,
        explanation: 'When data is already mostly sorted, inner while loops break immediately, achieving near O(n) speed.'
      }
    ],
    challenge: {
      id: 'ins-ch1',
      title: 'Sort an Almost Sorted Array',
      instruction: 'Given an array where every element is at most k places away from its sorted position, sort the array in O(n log k) time.',
      starterCode: `function sortAlmostSorted(arr, k) {
  // Your code here
  return arr.sort((a, b) => a - b);
}`,
      solutionCode: `function sortAlmostSorted(arr, k) {
  return arr.sort((a, b) => a - b);
}`,
      testCases: [
        { input: '[6, 5, 3, 2, 8, 10, 9], 3', expectedOutput: '[2, 3, 5, 6, 8, 9, 10]', description: 'K-sorted array sorted' }
      ],
      hints: ['Insertion sort or a min-heap of size k + 1 provides optimal O(n log k) sorting.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="ins-demo">
  <div class="col sorted">5</div>
  <div class="col sorted">11</div>
  <div class="col sorted">12</div>
  <div class="col key">6 (Sliding into index 1)</div>
</div>`,
      css: `.ins-demo { display: flex; gap: 6px; }
.col { padding: 10px; border-radius: 4px; font-weight: bold; }
.col.sorted { background: #dcfce7; color: #15803d; }
.col.key { background: #3b82f6; color: white; transform: translateY(-8px); }`,
      js: `console.log("HTML elevates the key card while shifting sorted cards right.");`,
      explanation: 'The visualizer lifts the current key element above the array row and slides it leftward.'
    }
  },

  {
    id: 'merge-sort',
    slug: 'merge-sort',
    name: 'Merge Sort',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 18,
    estimatedMinutes: 20,
    visualizerType: 'sorting',
    shortDesc: 'Divide-and-conquer algorithm that recursively divides array and merges sorted halves.',
    introduction: 'Merge Sort is an efficient, stable, comparison-based divide-and-conquer algorithm. It divides the unsorted list into n sublists, each containing one element, then repeatedly merges sublists to produce new sorted sublists until there is only 1 sublist remaining.',
    whatIsIt: 'Splitting a huge stack of unsorted exam papers in half, giving each half to a teaching assistant to sort, then neatly interleaving (merging) the two sorted stacks together.',
    whyUseIt: 'Guaranteed O(n log n) time in all cases (best, average, worst). Stable sorting preserves equal element relative order.',
    realWorldUseCases: [
      'External sorting when datasets are too large to fit in RAM (disk-based sorting)',
      'Sorting linked lists efficiently in O(n log n) without extra array space',
      'Standard sort in Java (for objects), Python, and JavaScript engines'
    ],
    algorithmSteps: [
      'Base Case: If array has length <= 1, it is already sorted. Return array.',
      'Divide: Find mid = Math.floor(arr.length / 2), split into left and right halves.',
      'Conquer: Recursively sort left half and right half.',
      'Combine (Merge): Interleave elements of left and right into a sorted array by comparing their front elements.'
    ],
    syntaxCode: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    exampleCode: `const unsorted = [38, 27, 43, 3, 9, 82, 10];
console.log("Merge Sorted:", mergeSort(unsorted));`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      explanation: 'Divides array into log n levels; each level performs n total merge comparisons.'
    },
    spaceComplexity: {
      worst: 'O(n)',
      explanation: 'Requires auxiliary array buffers during the merge phase.'
    },
    practiceExercises: [
      {
        title: 'Count Inversions in an Array',
        prompt: 'Use modified merge sort to count the number of inversions in an array.',
        hint: 'During merge, when right[j] < left[i], all remaining elements in left are greater than right[j].'
      }
    ],
    quiz: [
      {
        id: 'ms-q1',
        question: 'What is the worst-case time complexity of Merge Sort?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        answerIndex: 0,
        explanation: 'Merge Sort guarantees O(n log n) performance even in the absolute worst case.'
      }
    ],
    challenge: {
      id: 'ms-ch1',
      title: 'Merge Two Sorted Arrays In-Place',
      instruction: 'Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.',
      starterCode: `function mergeArrays(nums1, m, nums2, n) {
  // Merge nums2 into nums1 in-place
}`,
      solutionCode: `function mergeArrays(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p--] = nums1[p1--];
    } else {
      nums1[p--] = nums2[p2--];
    }
  }
}`,
      testCases: [
        { input: '[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3', expectedOutput: '[1, 2, 2, 3, 5, 6]', description: 'Merged in-place from rear' }
      ],
      hints: ['Fill nums1 from the back (index m + n - 1) to avoid overwriting elements.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="merge-tree">
  <div class="level">[38, 27, 43, 3]</div>
  <div class="level split">
    <span>[38, 27]</span>
    <span>[43, 3]</span>
  </div>
  <div class="level merged">[3, 27, 38, 43]</div>
</div>`,
      css: `.merge-tree { display: flex; flex-direction: column; align-items: center; gap: 8px; font-family: monospace; }
.level.merged { color: #16a34a; font-weight: bold; }`,
      js: `console.log("HTML visualizer illustrates recursive divide and merge phases.");`,
      explanation: 'Visualizer shows the array splitting down to singletons and recombining into sorted blocks.'
    }
  },

  {
    id: 'quick-sort',
    slug: 'quick-sort',
    name: 'Quick Sort',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 19,
    estimatedMinutes: 20,
    visualizerType: 'sorting',
    shortDesc: 'Partitions array around a pivot element so smaller items are left and larger are right.',
    introduction: 'Quick Sort is an in-place, divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot at its correct position in the sorted array.',
    whatIsIt: 'Organizing books by height: pick one reference book (pivot). Place all books shorter than it to its left, and all books taller to its right. Repeat on the left and right piles.',
    whyUseIt: 'Usually the fastest general-purpose comparison sort in practice due to superb CPU cache locality and low constant overhead.',
    realWorldUseCases: [
      'Standard library sorting in C (qsort), C++ (std::sort Introsort)',
      'High-performance graphics engines and physics simulation pipelines'
    ],
    algorithmSteps: [
      'Choose a pivot element (e.g., last element, random, or median-of-three).',
      'Partitioning: Rearrange array so elements < pivot are left, and elements > pivot are right.',
      'Place pivot in its final sorted position.',
      'Recursively apply Quick Sort to the sub-array left of pivot and right of pivot.'
    ],
    syntaxCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pIdx = partition(arr, low, high);
    quickSort(arr, low, pIdx - 1);
    quickSort(arr, pIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    exampleCode: `const numbers = [10, 80, 30, 90, 40, 50, 70];
console.log("Quick Sorted:", quickSort([...numbers]));`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²) when worst pivot is repeatedly chosen',
      explanation: 'Average case divides array evenly (log n levels). Worst case occurs when already sorted with bad pivot choice.'
    },
    spaceComplexity: {
      worst: 'O(log n) call stack',
      explanation: 'In-place sorting requiring only O(log n) recursive call stack space.'
    },
    practiceExercises: [
      {
        title: 'Quickselect Algorithm',
        prompt: 'Use Quick Sort partition logic to find the kth smallest element in O(n) average time without full sorting.',
        hint: 'Only recurse into the partition containing index k.'
      }
    ],
    quiz: [
      {
        id: 'qs-q1',
        question: 'Under what circumstances does basic Quick Sort degrade to O(n²) time complexity?',
        options: [
          'When the array is already sorted and the first or last element is always picked as pivot',
          'When all elements are negative',
          'When the array size is a power of 2',
          'When random pivots are selected'
        ],
        answerIndex: 0,
        explanation: 'If the array is already sorted and an extreme element is picked as pivot, each partition only reduces size by 1.'
      }
    ],
    challenge: {
      id: 'qs-ch1',
      title: 'Top K Frequent Elements',
      instruction: 'Given an integer array nums and an integer k, return the k most frequent elements.',
      starterCode: `function topKFrequent(nums, k) {
  // Your code here
  return [];
}`,
      solutionCode: `function topKFrequent(nums, k) {
  const freq = {};
  for (const n of nums) freq[n] = (freq[n] || 0) + 1;
  return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, k)
    .map(Number);
}`,
      testCases: [
        { input: '[1,1,1,2,2,3], 2', expectedOutput: '[1, 2]', description: '1 occurs 3 times, 2 occurs 2 times' }
      ],
      hints: ['Count frequencies with a map, then sort or bucket keys by count.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="qs-partition">
  <div class="item less">25 (< Pivot)</div>
  <div class="item less">30 (< Pivot)</div>
  <div class="item pivot">50 (Pivot)</div>
  <div class="item greater">80 (> Pivot)</div>
</div>`,
      css: `.qs-partition { display: flex; gap: 6px; }
.item { padding: 8px 12px; border-radius: 4px; font-weight: bold; }
.item.pivot { background: #8b5cf6; color: white; border: 2px solid #6d28d9; }
.item.less { background: #e0f2fe; color: #0369a1; }
.item.greater { background: #fee2e2; color: #b91c1c; }`,
      js: `console.log("HTML colors distinguish items relative to pivot.");`,
      explanation: 'Visualizer highlights the chosen pivot in purple while separating smaller (blue) and larger (red) elements.'
    }
  },

  {
    id: 'recursion',
    slug: 'recursion',
    name: 'Recursion',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 20,
    estimatedMinutes: 20,
    visualizerType: 'tree',
    shortDesc: 'Problem-solving method where a function calls itself to solve smaller subproblems.',
    introduction: 'Recursion is a programming technique where a function calls itself directly or indirectly to solve a smaller instance of the same problem. Every recursive function requires a base case to stop execution.',
    whatIsIt: 'Russian nesting dolls (Matryoshka): you open a large doll to find a slightly smaller doll inside, until you finally reach the tiniest solid doll (the base case) that cannot be opened.',
    whyUseIt: 'Simplifies complex code for tree traversals, graph searches, divide-and-conquer, and backtracking algorithms.',
    realWorldUseCases: [
      'Directory file search traversing nested folders and subfolders',
      'JSON object deep cloning and serialization',
      'DOM traversal (document.body.children recursively)',
      'Mathematical computation (Factorial, Fibonacci, GCD)'
    ],
    algorithmSteps: [
      'Base Case: Identify condition under which the function returns immediately without recursive call.',
      'Recursive Step: Call the function with modified, smaller arguments progressing toward the base case.',
      'Return Value: Combine results from subproblem recursive calls.'
    ],
    syntaxCode: `function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive call
}`,
    exampleCode: `// Fibonacci with memoization
function fib(n, memo = {}) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log("Fibonacci(10):", fib(10)); // 55`,
    timeComplexity: {
      best: 'O(1) at base case',
      average: 'O(n) for linear recursion / O(2^n) for naive Fibonacci',
      worst: 'O(n) with memoization',
      explanation: 'Naive recursive branching can explode exponentially (O(2^n)); memoization reduces it to linear O(n).'
    },
    spaceComplexity: {
      worst: 'O(n) call stack depth',
      explanation: 'Each active recursive call consumes a stack frame until reaching base case.'
    },
    practiceExercises: [
      {
        title: 'Sum of Digits via Recursion',
        prompt: 'Calculate the sum of all digits of a number recursively.',
        hint: 'sum(n) = (n % 10) + sum(Math.floor(n / 10)) with base case n === 0.'
      }
    ],
    quiz: [
      {
        id: 'rec-q1',
        question: 'What error occurs if a recursive function lacks a valid base case?',
        options: ['Maximum call stack size exceeded (Stack Overflow)', 'Segmentation fault 0x0', 'Out of disk memory', 'Syntax error'],
        answerIndex: 0,
        explanation: 'Without a base case, calls push indefinitely onto the call stack until memory is exhausted.'
      }
    ],
    challenge: {
      id: 'rec-ch1',
      title: 'Power of Three',
      instruction: 'Given an integer n, return true if it is a power of three. Otherwise, return false.',
      starterCode: `function isPowerOfThree(n) {
  // Return true if n is a power of three
  return false;
}`,
      solutionCode: `function isPowerOfThree(n) {
  if (n <= 0) return false;
  if (n === 1) return true;
  if (n % 3 !== 0) return false;
  return isPowerOfThree(n / 3);
}`,
      testCases: [
        { input: '27', expectedOutput: 'true', description: '3^3 = 27' },
        { input: '0', expectedOutput: 'false', description: '0 is not a power of 3' },
        { input: '9', expectedOutput: 'true', description: '3^2 = 9' }
      ],
      hints: ['If n % 3 === 0, recurse on n / 3. Base case is n === 1.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="call-stack">
  <div class="frame active">fact(1) &rarr; return 1</div>
  <div class="frame">fact(2) &rarr; 2 * fact(1)</div>
  <div class="frame">fact(3) &rarr; 3 * fact(2)</div>
</div>`,
      css: `.call-stack { display: flex; flex-direction: column-reverse; border: 2px solid #64748b; padding: 6px; gap: 4px; }
.frame { padding: 6px 10px; background: #e0e7ff; border-radius: 4px; font-family: monospace; font-size: 12px; }
.frame.active { background: #10b981; color: white; font-weight: bold; }`,
      js: `console.log("HTML call stack frames pile upward and pop off when returning.");`,
      explanation: 'Visualizer renders active function call frames stacking upward in browser DOM.'
    }
  },

  {
    id: 'two-pointers',
    slug: 'two-pointers',
    name: 'Two Pointers',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 21,
    estimatedMinutes: 15,
    visualizerType: 'array',
    shortDesc: 'Iterating through data structure using two index markers advancing at different speeds or directions.',
    introduction: 'The Two Pointers technique involves using two integer index variables to traverse an array or list. Pointers may move in opposite directions (left/right meeting in middle) or in the same direction at varying speeds (fast/slow runner).',
    whatIsIt: 'Two people reading a list of words: one starts reading from page 1 forward, while the other starts from the last page backward, comparing words as they meet in the middle.',
    whyUseIt: 'Transforms what would otherwise be brute-force O(n²) nested loops into a single linear O(n) pass with O(1) extra memory.',
    realWorldUseCases: [
      'Reversing strings or arrays in-place',
      'Two-Sum sorted array target pair matching',
      'Removing duplicates from sorted array without extra memory',
      'Detecting linked list loops (Tortoise and Hare fast/slow pointer)'
    ],
    algorithmSteps: [
      'Opposite Direction: Set left = 0, right = arr.length - 1. Move left forward or right backward based on conditions.',
      'Same Direction (Fast/Slow): Set slow = 0, fast = 0. Fast scans ahead, slow records valid values.',
      'Stop when pointers cross or target condition is fulfilled.'
    ],
    syntaxCode: `function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    exampleCode: `// Move all zeros to end while maintaining relative order of non-zeros
function moveZeroes(nums) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
  return nums;
}

console.log("Zeroes moved:", moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      explanation: 'Each pointer visits at most n elements once, giving strictly linear runtime.'
    },
    spaceComplexity: {
      worst: 'O(1)',
      explanation: 'Only requires 2 integer pointer variables.'
    },
    practiceExercises: [
      {
        title: 'Container With Most Water',
        prompt: 'Find two lines that together with x-axis forms a container that holds the most water.',
        hint: 'Start with left=0 and right=n-1. Compute area, then move the pointer pointing to the shorter vertical line inward.'
      }
    ],
    quiz: [
      {
        id: 'tp-q1',
        question: 'Why does Two Pointers reduce time complexity from O(n²) to O(n)?',
        options: [
          'Because each element is visited at most a constant number of times',
          'Because it uses extra RAM buffers',
          'Because it sorts the array automatically',
          'Because it parallelizes on multi-core CPUs'
        ],
        answerIndex: 0,
        explanation: 'Rather than running nested loops, the two index markers advance linearly toward each other in a single pass.'
      }
    ],
    challenge: {
      id: 'tp-ch1',
      title: 'Remove Duplicates from Sorted Array',
      instruction: 'Remove duplicates in-place such that each unique element appears only once and return the count of unique elements.',
      starterCode: `function removeDuplicates(nums) {
  // Return k (unique count) after in-place modification
  return 0;
}`,
      solutionCode: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}`,
      testCases: [
        { input: '[1, 1, 2]', expectedOutput: '2', description: 'Returns 2 unique elements [1, 2]' },
        { input: '[0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5', description: 'Returns 5 unique elements [0,1,2,3,4]' }
      ],
      hints: ['Use slow pointer for unique write index, fast pointer to scan ahead for changes.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="tp-array">
  <div class="tp-cell ptr-left">10 <span class="tag">L &darr;</span></div>
  <div class="tp-cell">20</div>
  <div class="tp-cell">35</div>
  <div class="tp-cell ptr-right">50 <span class="tag">R &darr;</span></div>
</div>`,
      css: `.tp-array { display: flex; gap: 8px; }
.tp-cell { width: 50px; height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid #cbd5e1; border-radius: 6px; font-weight: bold; position: relative; }
.tp-cell.ptr-left { border-color: #3b82f6; background: #eff6ff; }
.tp-cell.ptr-right { border-color: #ef4444; background: #fef2f2; }
.tag { font-size: 10px; position: absolute; top: -14px; }`,
      js: `console.log("HTML pointers L and R visually step inward toward the target.");`,
      explanation: 'Pointers L and R are rendered above array elements as colored tags that slide along the array.'
    }
  },

  {
    id: 'sliding-window',
    slug: 'sliding-window',
    name: 'Sliding Window',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 22,
    estimatedMinutes: 20,
    visualizerType: 'array',
    shortDesc: 'Maintains contiguous window range expanding and contracting across an array or string.',
    introduction: 'The Sliding Window technique involves creating a window over a portion of data and sliding it through the dataset. It avoids re-computing overlapping values by adding the incoming element and subtracting the outgoing element.',
    whatIsIt: 'Looking through the moving window of a train: as you roll forward, old scenery leaves on the left while new scenery enters on the right. You only observe the difference rather than scanning the entire universe.',
    whyUseIt: 'Transforms O(k * n) brute-force subarray/substring checks into linear O(n) calculations.',
    realWorldUseCases: [
      'TCP network packet flow control and congestion avoidance',
      'Financial rolling averages (e.g. 7-day or 30-day moving stock averages)',
      'Substrings containing specific anagrams or unique character sets',
      'Maximum sum subarray of fixed size k'
    ],
    algorithmSteps: [
      'Fixed Window: Compute initial window sum of first k elements. Then slide window by subtracting arr[i - k] and adding arr[i].',
      'Dynamic Window: Expand right pointer until condition is broken, then contract left pointer until valid again.',
      'Record best metric (max sum, min length) during each valid window state.'
    ],
    syntaxCode: `// Maximum sum of subarray with size k
function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let maxSum = 0;
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // Slide window
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
    exampleCode: `console.log("Max sum of 3 consecutive elements:", maxSubarraySum([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
      explanation: 'Every element enters the window once and leaves at most once, resulting in linear O(n) time.'
    },
    spaceComplexity: {
      worst: 'O(1) to O(k)',
      explanation: 'Requires only rolling sum or a small frequency table for characters.'
    },
    practiceExercises: [
      {
        title: 'Minimum Size Subarray Sum',
        prompt: 'Given an array of positive integers and a target sum, find the minimal length of a contiguous subarray of which the sum >= target.',
        hint: 'Use dynamic sliding window: expand right until sum >= target, then contract left to minimize length.'
      }
    ],
    quiz: [
      {
        id: 'sw-q1',
        question: 'When sliding a fixed-size window of size k by one step, how many arithmetic operations are needed to update the running sum?',
        options: ['1 addition and 1 subtraction (O(1))', 'k additions (O(k))', 'k * n operations', 'No operations'],
        answerIndex: 0,
        explanation: 'Add the new element entering on the right and subtract the old element exiting on the left.'
      }
    ],
    challenge: {
      id: 'sw-ch1',
      title: 'Longest Substring Without Repeating Characters',
      instruction: 'Given a string s, find the length of the longest substring without duplicate characters.',
      starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here
  return 0;
}`,
      solutionCode: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let maxLen = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (map.has(ch) && map.get(ch) >= left) {
      left = map.get(ch) + 1;
    }
    map.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      testCases: [
        { input: '"abcabcbb"', expectedOutput: '3', description: 'Substring "abc" has length 3' },
        { input: '"bbbbb"', expectedOutput: '1', description: 'Substring "b" has length 1' },
        { input: '"pwwkew"', expectedOutput: '3', description: 'Substring "wke" has length 3' }
      ],
      hints: ['Maintain a sliding window [left, right] and store last seen indices of characters in a Map.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="window-container">
  <div class="w-cell">2</div>
  <div class="window-frame">
    <div class="w-cell inside">1</div>
    <div class="w-cell inside">5</div>
    <div class="w-cell inside">1</div>
  </div>
  <div class="w-cell">3</div>
</div>`,
      css: `.window-container { display: flex; align-items: center; gap: 4px; }
.window-frame { display: flex; gap: 4px; border: 3px solid #6366f1; border-radius: 8px; padding: 4px; background: rgba(99, 102, 241, 0.1); }
.w-cell { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; }`,
      js: `console.log("HTML border frame outlines active sliding window range.");`,
      explanation: 'The visualizer renders a highlighted border frame around the active window that slides horizontally across cells.'
    }
  },

  {
    id: 'bfs',
    slug: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 23,
    estimatedMinutes: 20,
    visualizerType: 'graph',
    shortDesc: 'Level-by-level exploration using a FIFO queue to find shortest paths in unweighted graphs.',
    introduction: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a chosen node and explores all neighbor nodes at the present depth level before moving on to the nodes at the next depth level.',
    whatIsIt: 'Throwing a stone into a still pond: ripples expand outward in concentric circles level by level from the center.',
    whyUseIt: 'Guarantees finding the shortest path (minimum number of edges) between two nodes in any unweighted graph.',
    realWorldUseCases: [
      'Shortest path navigation in unweighted road or subway networks',
      'Social networks calculating degrees of separation (e.g. LinkedIn 1st, 2nd, 3rd connections)',
      'Peer-to-peer torrent network neighbor discovery',
      'Web crawlers exploring URLs within domain depth limits'
    ],
    algorithmSteps: [
      'Initialize a queue with starting node: queue = [startNode].',
      'Initialize visited set: visited = new Set([startNode]).',
      'While queue is not empty: dequeue current node.',
      'Process current node.',
      'For each unvisited neighbor of current node: mark visited and enqueue neighbor.',
      'Repeat until queue is empty.'
    ],
    syntaxCode: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
    exampleCode: `const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B'],
  F: ['C']
};
console.log("BFS Order from A:", bfs(graph, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      explanation: 'Every vertex is enqueued and dequeued once, and each edge is traversed once.'
    },
    spaceComplexity: {
      worst: 'O(V)',
      explanation: 'Queue and visited set can hold up to V vertices.'
    },
    practiceExercises: [
      {
        title: 'Binary Tree Level Order Traversal',
        prompt: 'Given the root of a binary tree, return the level order traversal of its nodes values as a 2D array.',
        hint: 'Use BFS queue and loop for queue.length at each level.'
      }
    ],
    quiz: [
      {
        id: 'bfs-q1',
        question: 'Which data structure is primarily used to implement Breadth-First Search?',
        options: ['Queue (FIFO)', 'Stack (LIFO)', 'Min-Heap', 'Binary Search Tree'],
        answerIndex: 0,
        explanation: 'BFS uses a FIFO queue to process nodes in order of their discovery level.'
      }
    ],
    challenge: {
      id: 'bfs-ch1',
      title: 'Shortest Path in Binary Matrix',
      instruction: 'Given an n x n binary matrix grid, return the length of the shortest clear path from top-left (0,0) to bottom-right (n-1,n-1). If no path, return -1.',
      starterCode: `function shortestPathBinaryMatrix(grid) {
  // Your code here
  return -1;
}`,
      solutionCode: `function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;
  const queue = [[0, 0, 1]];
  grid[0][0] = 1; // visited
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();
    if (r === n - 1 && c === n - 1) return dist;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}`,
      testCases: [
        { input: '[[0,1],[1,0]]', expectedOutput: '2', description: 'Path length 2' },
        { input: '[[0,0,0],[1,1,0],[1,1,0]]', expectedOutput: '4', description: 'Path length 4' }
      ],
      hints: ['Use BFS with 8-directional exploration from (0,0) tracking step distance.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="bfs-level-demo">
  <div class="level level-0"><span class="badge active">Root (L0)</span></div>
  <div class="level level-1"><span class="badge visited">A (L1)</span><span class="badge visited">B (L1)</span></div>
  <div class="level level-2"><span class="badge in-q">C (L2)</span><span class="badge in-q">D (L2)</span></div>
</div>`,
      css: `.bfs-level-demo { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.level { display: flex; gap: 12px; }
.badge { padding: 6px 12px; border-radius: 999px; font-weight: bold; }
.badge.active { background: #eab308; color: white; }
.badge.visited { background: #10b981; color: white; }
.badge.in-q { background: #6366f1; color: white; }`,
      js: `console.log("HTML visualizer demonstrates wave expansion level by level.");`,
      explanation: 'Visualizer highlights current active vertex and marks queued neighbors in order.'
    }
  },

  {
    id: 'dfs',
    slug: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 24,
    estimatedMinutes: 20,
    visualizerType: 'graph',
    shortDesc: 'Deep path exploration using recursion/stack, backtracking when hitting dead ends.',
    introduction: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.',
    whatIsIt: 'Exploring a maze: you keep walking down a corridor until you hit a dead end wall, then backtrack to the last fork in the path and try the alternate hallway.',
    whyUseIt: 'Ideal for topological sorting, cycle detection, pathfinding, maze generation, and puzzle solving.',
    realWorldUseCases: [
      'Topological sorting in build systems (make, webpack compilation order)',
      'Detecting circular dependencies in software modules',
      'Solving mazes, Sudoku puzzles, and chess decision trees',
      'Finding strongly connected components in directed graphs'
    ],
    algorithmSteps: [
      'Visit starting node, mark as visited.',
      'For each unvisited neighbor: recursively invoke DFS on that neighbor.',
      'When all neighbors are visited, backtrack to parent caller.',
      'Alternatively implemented with an explicit LIFO stack.'
    ],
    syntaxCode: `function dfs(graph, node, visited = new Set(), order = []) {
  visited.add(node);
  order.push(node);
  
  for (const neighbor of graph[node] || []) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }
  return order;
}`,
    exampleCode: `const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [], E: [], F: []
};
console.log("DFS Order:", dfs(graph, 'A')); // ['A', 'B', 'D', 'E', 'C', 'F']`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      explanation: 'Every vertex and edge is explored once in connected components.'
    },
    spaceComplexity: {
      worst: 'O(V)',
      explanation: 'Call stack depth reaches up to V frames in the worst case (e.g. line graph).'
    },
    practiceExercises: [
      {
        title: 'Clone Graph',
        prompt: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
        hint: 'Use DFS with a Map to map original nodes to cloned nodes.'
      }
    ],
    quiz: [
      {
        id: 'dfs-q1',
        question: 'Which implicit or explicit data structure underpins Depth-First Search?',
        options: ['Stack (LIFO)', 'Queue (FIFO)', 'Heap', 'Bloom filter'],
        answerIndex: 0,
        explanation: 'DFS uses the runtime call stack (or an explicit stack) to remember path branches and backtrack.'
      }
    ],
    challenge: {
      id: 'dfs-ch1',
      title: 'Course Schedule (Cycle Detection)',
      instruction: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Given prerequisites array, return true if you can finish all courses.',
      starterCode: `function canFinish(numCourses, prerequisites) {
  // Return true if no cycle exists
  return true;
}`,
      solutionCode: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    graph[course].push(pre);
  }
  // 0 = unvisited, 1 = visiting (in recursion stack), 2 = visited
  const state = new Array(numCourses).fill(0);
  
  function hasCycle(curr) {
    if (state[curr] === 1) return true; // Cycle detected
    if (state[curr] === 2) return false;
    state[curr] = 1;
    for (const neighbor of graph[curr]) {
      if (hasCycle(neighbor)) return true;
    }
    state[curr] = 2;
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}`,
      testCases: [
        { input: '2, [[1, 0]]', expectedOutput: 'true', description: 'Take 0 then 1' },
        { input: '2, [[1, 0], [0, 1]]', expectedOutput: 'false', description: 'Circular dependency 0 <-> 1' }
      ],
      hints: ['Use 3-color DFS cycle detection: 0=unvisited, 1=in current recursion path, 2=fully processed.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="dfs-trace">
  <div class="step">Visiting A &rarr;</div>
  <div class="step">Visiting B &rarr;</div>
  <div class="step dead-end">D (Dead end, Backtracking) &larr;</div>
  <div class="step">Visiting E &rarr;</div>
</div>`,
      css: `.dfs-trace { font-family: monospace; font-size: 13px; border-left: 3px solid #6366f1; padding-left: 8px; }
.step.dead-end { color: #ef4444; font-weight: bold; }`,
      js: `console.log("HTML visualizer illustrates deep diving and backtracking steps.");`,
      explanation: 'Visualizer animates the forward probe and subsequent backtrack steps.'
    }
  },

  {
    id: 'greedy',
    slug: 'greedy',
    name: 'Greedy Algorithms',
    category: 'algorithms',
    difficulty: 'Intermediate',
    order: 25,
    estimatedMinutes: 20,
    visualizerType: 'array',
    shortDesc: 'Makes the locally optimal choice at each stage with the hope of finding a global optimum.',
    introduction: 'A Greedy Algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate and obvious benefit (locally optimal choice). It never reconsiders previous choices.',
    whatIsIt: 'Making change with minimal coins: to make 67 cents, you instinctively grab the largest possible coin (25 cents), then another 25 cents, then a 10 cent dime, a 5 cent nickel, and two 1 cent pennies.',
    whyUseIt: 'Very fast and straightforward for problems that exhibit the Greedy-Choice Property and Optimal Substructure.',
    realWorldUseCases: [
      'Coin change problem (standard denominations)',
      'Dijkstra Shortest Path algorithm (always picking minimum tentative distance node)',
      'Kruskal and Prim Minimum Spanning Tree algorithms',
      'Huffman Coding lossless data compression'
    ],
    algorithmSteps: [
      'Formulate problem such that step-by-step choices can be made.',
      'At each step, greedily select the best immediate candidate.',
      'Check if candidate is feasible (does not violate constraints).',
      'Add candidate to solution and continue until problem is solved.'
    ],
    syntaxCode: `// Activity Selection / Interval Scheduling
function maxActivities(intervals) {
  // Sort by finish time
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }
  return count;
}`,
    exampleCode: `// Fractional Knapsack Problem
function fractionalKnapsack(capacity, items) {
  // items: [{ weight, value }]
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
  let totalValue = 0;
  let remaining = capacity;
  for (const item of items) {
    if (remaining >= item.weight) {
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      totalValue += item.value * (remaining / item.weight);
      break;
    }
  }
  return totalValue;
}

console.log("Max Knapsack value:", fractionalKnapsack(50, [
  { weight: 10, value: 60 },
  { weight: 20, value: 100 },
  { weight: 30, value: 120 }
])); // 240`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n) primarily driven by initial sorting',
      worst: 'O(n log n)',
      explanation: 'Most greedy approaches require sorting candidates first (O(n log n)), followed by a single linear scan O(n).'
    },
    spaceComplexity: {
      worst: 'O(1) to O(n)',
      explanation: 'Requires minimal state storage beyond sorted candidates.'
    },
    practiceExercises: [
      {
        title: 'Assign Cookies',
        prompt: 'Maximize the number of content children given greed factors and cookie sizes.',
        hint: 'Sort both arrays and match the smallest sufficient cookie with the least greedy child.'
      }
    ],
    quiz: [
      {
        id: 'grd-q1',
        question: 'Does a greedy algorithm always yield the globally optimal solution for all problems?',
        options: ['No, only for problems with optimal substructure and greedy choice property', 'Yes, always', 'Only for sorting problems', 'Only if numbers are positive'],
        answerIndex: 0,
        explanation: 'Greedy algorithms fail when a locally suboptimal choice would unlock a far superior global outcome later.'
      }
    ],
    challenge: {
      id: 'grd-ch1',
      title: 'Jump Game',
      instruction: 'You are given an integer array nums. You start at index 0. Each element represents your maximum jump length. Return true if you can reach the last index.',
      starterCode: `function canJump(nums) {
  // Return true if you can reach last index
  return false;
}`,
      solutionCode: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`,
      testCases: [
        { input: '[2, 3, 1, 1, 4]', expectedOutput: 'true', description: 'Jump 1 step from 0 to 1, then 3 steps to last' },
        { input: '[3, 2, 1, 0, 4]', expectedOutput: 'false', description: 'Stuck at index 3 with 0 jump length' }
      ],
      hints: ['Greedily maintain maxReach = Math.max(maxReach, i + nums[i]) as you scan through the array.']
    },
    htmlVisualizerSnippet: {
      html: `<div class="greedy-selection">
  <div class="choice picked">25¢ (Picked)</div>
  <div class="choice picked">25¢ (Picked)</div>
  <div class="choice picked">10¢ (Picked)</div>
  <div class="choice">5¢ (Skipped)</div>
</div>`,
      css: `.greedy-selection { display: flex; gap: 8px; }
.choice { padding: 8px 12px; border-radius: 6px; border: 2px solid #cbd5e1; font-weight: bold; }
.choice.picked { background: #dcfce7; border-color: #16a34a; color: #15803d; }`,
      js: `console.log("HTML visualizer highlights greedy selections made in order.");`,
      explanation: 'Visualizer highlights the chosen best candidates at each sequential decision step.'
    }
  },

  {
    id: 'dynamic-programming',
    slug: 'dynamic-programming',
    name: 'Dynamic Programming',
    category: 'algorithms',
    difficulty: 'Advanced',
    order: 26,
    estimatedMinutes: 25,
    visualizerType: 'array',
    shortDesc: 'Breaks complex problem into overlapping subproblems, storing results to avoid recomputation.',
    introduction: 'Dynamic Programming (DP) is an algorithmic optimization technique that solves complex problems by breaking them down into simpler subproblems, solving each subproblem just once, and storing their solutions (memoization or tabulation).',
    whatIsIt: 'Writing 1+1+1+1 on a piece of paper: what is that? "4". Then you write "+1" next to it. What is it now? You immediately say "5" without recalculating 1+1+1+1 from scratch because you remembered the previous subproblem answer.',
    whyUseIt: 'Dramatically reduces exponential time O(2^n) algorithms down to polynomial O(n) or O(n²) time.',
    realWorldUseCases: [
      'Diff algorithms (git diff, comparing text files via Longest Common Subsequence)',
      'Spell checkers computing edit distance (Levenshtein distance)',
      'DNA sequence alignment in computational bioinformatics',
      'Resource allocation and knapsack supply chain optimization'
    ],
    algorithmSteps: [
      'Identify Optimal Substructure: Solution to overall problem can be composed from optimal subproblem solutions.',
      'Identify Overlapping Subproblems: The same subproblems are solved multiple times.',
      'Define DP State: e.g. dp[i] represents minimum cost to reach step i.',
      'Formulate Recurrence Relation: Express dp[i] in terms of dp[i-1], dp[i-2], etc.',
      'Compute iteratively (Tabulation) or recursively with a cache (Memoization).'
    ],
    syntaxCode: `// Climbing Stairs: reach step n taking 1 or 2 steps
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    exampleCode: `// 0/1 Knapsack Problem using 2D DP Table
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}

console.log("Max Knapsack value:", knapsack([1, 2, 3], [10, 15, 40], 5)); // 55`,
    timeComplexity: {
      best: 'O(n) or O(n * W)',
      average: 'O(States * Transitions)',
      worst: 'O(n * W) for knapsack / O(n²) for matrix multiplication',
      explanation: 'Total runtime equals the number of distinct states multiplied by work per state transition.'
    },
    spaceComplexity: {
      worst: 'O(n) to O(n * W)',
      explanation: 'Space required for the DP table or cache, often optimizable down to O(1) space.'
    },
    practiceExercises: [
      {
        title: 'Coin Change Problem',
        prompt: 'Compute the fewest number of coins that you need to make up that amount.',
        hint: 'dp[amount] = 1 + Math.min(dp[amount - coin]) for all coin values.'
      }
    ],
    quiz: [
      {
        id: 'dp-q1',
        question: 'What are the two core properties that make a problem solvable via Dynamic Programming?',
        options: [
          'Optimal Substructure and Overlapping Subproblems',
          'Sorted inputs and Hash tables',
          'Divide and Conquer with Disjoint sets',
          'Greedy choice and Binary search'
        ],
        answerIndex: 0,
        explanation: 'Dynamic Programming applies when solutions can be built from subproblems (optimal substructure) that repeat multiple times (overlapping subproblems).'
      }
    ],
    challenge: {
      id: 'dp-ch1',
      title: 'House Robber',
      instruction: 'You cannot rob two adjacent houses. Given an array representing money in each house, determine the maximum amount you can rob without alerting police.',
      starterCode: `function rob(nums) {
  // Your code here
  return 0;
}`,
      solutionCode: `function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let prev2 = 0;
  let prev1 = 0;
  for (const n of nums) {
    const temp = Math.max(prev1, prev2 + n);
    prev2 = prev1;
    prev1 = temp;
  }
  return prev1;
}`,
      testCases: [
        { input: '[1, 2, 3, 1]', expectedOutput: '4', description: 'Rob house 1 (money=1) and house 3 (money=3) = 4' },
        { input: '[2, 7, 9, 3, 1]', expectedOutput: '12', description: 'Rob house 1 (2), 3 (9), 5 (1) = 12' }
      ],
      hints: ['dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]).']
    },
    htmlVisualizerSnippet: {
      html: `<div class="dp-table">
  <div class="dp-cell">dp[0] = 0</div>
  <div class="dp-cell">dp[1] = 1</div>
  <div class="dp-cell">dp[2] = 2</div>
  <div class="dp-cell active">dp[3] = 3 (1+2)</div>
</div>`,
      css: `.dp-table { display: flex; gap: 6px; }
.dp-cell { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; font-family: monospace; }
.dp-cell.active { background: #6366f1; color: white; font-weight: bold; }`,
      js: `console.log("HTML cells render 1D/2D memoization and tabulation tables.");`,
      explanation: 'The visualizer renders DP memoization and tabulation tables populating values step by step.'
    }
  },

  {
    id: 'backtracking',
    slug: 'backtracking',
    name: 'Backtracking',
    category: 'algorithms',
    difficulty: 'Advanced',
    order: 27,
    estimatedMinutes: 25,
    visualizerType: 'tree',
    shortDesc: 'Systematic depth exploration that prunes search paths as soon as constraints are violated.',
    introduction: 'Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time.',
    whatIsIt: 'Walking through a maze with a ball of yarn: you tie off your yarn at every intersection. If a path leads to a trap or dead end, you rewind the yarn (backtrack) and try the next branch.',
    whyUseIt: 'Allows exhaustively exploring combinatorial decision spaces (permutations, subsets, sudoku, N-queens) while pruning impossible branches early.',
    realWorldUseCases: [
      'Solving Sudoku puzzles and crossword generators',
      'N-Queens constraint satisfaction problem',
      'Generating all valid combinations, permutations, and subsets',
      'Parsing ambiguous grammatical rules in NLP compilers'
    ],
    algorithmSteps: [
      'Choose: Make a choice among candidate options.',
      'Constrain: Check if current partial candidate violates problem constraints. If invalid, prune branch.',
      'Goal Check: If complete solution reached, record it in results list.',
      'Recurse: Explore remaining choices.',
      'Unchoose (Backtrack): Undo the choice to restore state for sibling alternatives.'
    ],
    syntaxCode: `// Generate all permutations of an array
function permute(nums) {
  const result = [];
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      const nextRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
      backtrack(current, nextRemaining);
      current.pop(); // Backtrack
    }
  }
  backtrack([], nums);
  return result;
}`,
    exampleCode: `console.log("Permutations of [1, 2, 3]:", permute([1, 2, 3]));`,
    timeComplexity: {
      best: 'O(1) with immediate pruning',
      average: 'O(N!) for permutations / O(2^N) for subsets',
      worst: 'O(N!) for full combinatorial tree',
      explanation: 'Combinatorial problem spaces are intrinsically exponential or factorial, but constraint pruning drastically shrinks practical runtime.'
    },
    spaceComplexity: {
      worst: 'O(N)',
      explanation: 'Depth of the recursion tree equals problem size N.'
    },
    practiceExercises: [
      {
        title: 'Subsets (Power Set)',
        prompt: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
        hint: 'At each index, you have two choices: include nums[i] or exclude nums[i].'
      }
    ],
    quiz: [
      {
        id: 'bt-q1',
        question: 'What is the purpose of the "Unchoose" step in Backtracking?',
        options: [
          'To restore state so the next sibling candidate can be tested cleanly',
          'To erase all previous solutions',
          'To restart the algorithm from scratch',
          'To free CPU registers'
        ],
        answerIndex: 0,
        explanation: 'Undoing the latest decision reverts shared state (e.g. popping from path array) so other candidate branches start fresh.'
      }
    ],
    challenge: {
      id: 'bt-ch1',
      title: 'N-Queens Valid Placement',
      instruction: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return total number of solutions.',
      starterCode: `function totalNQueens(n) {
  // Return number of distinct solutions
  return 0;
}`,
      solutionCode: `function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); // r - c
  const diag2 = new Set(); // r + c
  
  function backtrack(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      backtrack(row + 1);
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }
  backtrack(0);
  return count;
}`,
      testCases: [
        { input: '4', expectedOutput: '2', description: '4-Queens has 2 solutions' },
        { input: '1', expectedOutput: '1', description: '1-Queen has 1 solution' }
      ],
      hints: ['Place queens row by row. Maintain Sets for occupied columns, major diagonals (r - c), and minor diagonals (r + c).']
    },
    htmlVisualizerSnippet: {
      html: `<div class="board-mini">
  <div class="row"><span class="sq">.</span><span class="sq queen">Q</span><span class="sq">.</span></div>
  <div class="row"><span class="sq">.</span><span class="sq">.</span><span class="sq queen">Q</span></div>
  <div class="row"><span class="sq queen">Q</span><span class="sq">.</span><span class="sq">.</span></div>
</div>`,
      css: `.board-mini { display: inline-grid; border: 2px solid #334155; }
.row { display: flex; }
.sq { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1px solid #94a3b8; }
.sq.queen { background: #8b5cf6; color: white; }`,
      js: `console.log("HTML chessboard squares show queens placed and removed during backtracking.");`,
      explanation: 'Visualizer demonstrates queens being placed on board tiles and removed upon conflict detection.'
    }
  }
];
