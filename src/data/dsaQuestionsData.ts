import { DsaQuestionItem } from '../types/dsaQuestionTypes';

export const DSA_QUESTIONS_DATA: DsaQuestionItem[] = [
  // =========================================================================
  // 1. ARRAYS & STRINGS — CODING
  // =========================================================================
  {
    id: 'two-sum',
    title: 'Two Sum (Optimal Hash Map)',
    category: 'arrays-strings',
    categoryLabel: 'Arrays & Strings',
    type: 'coding',
    difficulty: 'Beginner',
    statement: `Given an array of integers \`nums\` and an integer \`target\`, return the **indices** of the two numbers such that they add up to \`target\`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    inputFormat: 'nums: number[], target: number',
    outputFormat: 'number[] (indices array of length 2)',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists'
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your O(n) solution here using a Map or object
  
}`,
    functionName: 'twoSum',
    testCases: [
      {
        id: 'tc-1',
        input: '[2, 7, 11, 15], 9',
        expectedOutput: '[0,1]',
        explanation: 'nums[0] + nums[1] == 2 + 7 == 9, so return [0, 1].'
      },
      {
        id: 'tc-2',
        input: '[3, 2, 4], 6',
        expectedOutput: '[1,2]',
        explanation: 'nums[1] + nums[2] == 2 + 4 == 6, so return [1, 2].'
      },
      {
        id: 'tc-3',
        input: '[3, 3], 6',
        expectedOutput: '[0,1]',
        explanation: 'nums[0] + nums[1] == 3 + 3 == 6, so return [0, 1].'
      }
    ],
    hints: [
      'Can you solve it in a single pass using a Hash Map?',
      'For each number x, the complement needed is (target - x). Check if complement exists in your Map before adding x.'
    ],
    explanation: 'A naive approach compares every pair using nested loops (O(n²)). By storing visited numbers and their indices in a Hash Map, we can look up the complement in O(1) time, reducing total time to O(n).',
    solutionCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    interviewCompanies: ['Google', 'Amazon', 'Meta', 'Microsoft']
  },

  // =========================================================================
  // 2. STACKS & QUEUES — CODING
  // =========================================================================
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses String',
    category: 'stacks-queues',
    categoryLabel: 'Stacks & Queues',
    type: 'coding',
    difficulty: 'Beginner',
    statement: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.
An input string is valid if open brackets are closed by the same type of brackets and in the correct order.`,
    inputFormat: 's: string',
    outputFormat: 'boolean',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    starterCode: `function isValid(s) {
  // Use a stack to track open brackets
  
}`,
    functionName: 'isValid',
    testCases: [
      {
        id: 'tc-1',
        input: '"()"',
        expectedOutput: 'true',
        explanation: 'Simple valid parenthesis pair.'
      },
      {
        id: 'tc-2',
        input: '"()[]{}"',
        expectedOutput: 'true',
        explanation: 'All opened brackets match their corresponding closing brackets.'
      },
      {
        id: 'tc-3',
        input: '"(]"',
        expectedOutput: 'false',
        explanation: 'Mismatched closing bracket type.'
      },
      {
        id: 'tc-4',
        input: '"([)]"',
        expectedOutput: 'false',
        explanation: 'Closing order is incorrect.'
      }
    ],
    hints: [
      'A Stack data structure (LIFO) is ideal because the most recently opened bracket must be closed first.',
      'When you see an opening bracket, push it onto the stack. When you see a closing bracket, check if it matches the stack top.'
    ],
    explanation: 'Push opening brackets to stack. When encountering a closing bracket, pop the top element and verify it is the matching pair. At the end, the stack must be empty.',
    solutionCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    interviewCompanies: ['Amazon', 'Bloomberg', 'Apple']
  },

  // =========================================================================
  // 3. SEARCHING — CODING
  // =========================================================================
  {
    id: 'binary-search-problem',
    title: 'Binary Search in Sorted Array',
    category: 'searching',
    categoryLabel: 'Searching',
    type: 'coding',
    difficulty: 'Beginner',
    statement: `Given an array of integers \`nums\` sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`.
If \`target\` exists, return its index. Otherwise, return \`-1\`. You must write an algorithm with **O(log n)** runtime complexity.`,
    inputFormat: 'nums: number[], target: number',
    outputFormat: 'number (index or -1)',
    constraints: [
      '1 <= nums.length <= 10^4',
      'All integers in nums are unique and sorted in ascending order'
    ],
    starterCode: `function search(nums, target) {
  // Implement O(log n) binary search
  
}`,
    functionName: 'search',
    testCases: [
      {
        id: 'tc-1',
        input: '[-1, 0, 3, 5, 9, 12], 9',
        expectedOutput: '4',
        explanation: '9 exists in nums and its index is 4.'
      },
      {
        id: 'tc-2',
        input: '[-1, 0, 3, 5, 9, 12], 2',
        expectedOutput: '-1',
        explanation: '2 does not exist in nums so return -1.'
      }
    ],
    hints: [
      'Maintain two pointers: left = 0, right = nums.length - 1.',
      'Calculate mid = Math.floor((left + right) / 2). Compare nums[mid] with target.'
    ],
    explanation: 'By dividing the search space in half at each step, binary search achieves logarithmic O(log n) complexity.',
    solutionCode: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    interviewCompanies: ['Google', 'Adobe', 'Uber']
  },

  // =========================================================================
  // 4. MULTIPLE CHOICE QUESTION (MCQ) — BIG-O
  // =========================================================================
  {
    id: 'mcq-quicksort-worst',
    title: 'QuickSort Worst-Case Time Complexity',
    category: 'sorting',
    categoryLabel: 'Sorting',
    type: 'mcq',
    difficulty: 'Intermediate',
    statement: `What is the worst-case time complexity of standard QuickSort with fixed pivot selection, and when does it occur?`,
    options: [
      'O(n log n), when the array is already sorted',
      'O(n²), when the array is already sorted or reverse sorted and the first/last element is always chosen as pivot',
      'O(n), when all elements are identical',
      'O(n log n), when random pivot selection is used'
    ],
    correctOptionIndex: 1,
    hints: [
      'Consider what happens when the chosen pivot always ends up being the extreme minimum or maximum element.'
    ],
    explanation: 'When the pivot is consistently the smallest or largest element (such as choosing the last element of an already sorted array), the partition splits into sizes 0 and n-1. This leads to the recurrence T(n) = T(n-1) + O(n) = O(n²). Using randomized pivot or median-of-three avoids this issue.',
    solutionCode: `// Randomized pivot avoids O(n²) worst-case:
function randomPartition(arr, low, high) {
  const randIdx = Math.floor(Math.random() * (high - low + 1)) + low;
  [arr[randIdx], arr[high]] = [arr[high], arr[randIdx]];
  return partition(arr, low, high);
}`,
    timeComplexity: 'Average: O(n log n) | Worst: O(n²)',
    spaceComplexity: 'O(log n) call stack',
    interviewCompanies: ['Amazon', 'Microsoft', 'Oracle']
  },

  // =========================================================================
  // 5. OUTPUT PREDICTION QUESTION
  // =========================================================================
  {
    id: 'output-pred-recursion',
    title: 'Output Prediction: Recursive Backtrack Call Tree',
    category: 'recursion',
    categoryLabel: 'Recursion',
    type: 'output-prediction',
    difficulty: 'Intermediate',
    statement: `Examine the recursive JavaScript function below. What will be printed to the console when \`mystery(3)\` is executed?

\`\`\`javascript
function mystery(n) {
  if (n <= 0) return;
  mystery(n - 1);
  console.log(n);
  mystery(n - 1);
}
mystery(3);
\`\`\``,
    options: [
      '3, 2, 1, 1, 2, 3',
      '1, 2, 1, 3, 1, 2, 1',
      '3, 2, 1, 2, 3',
      '1, 1, 2, 2, 3, 3'
    ],
    correctOptionIndex: 1,
    hints: [
      'Trace mystery(1): it logs 1.',
      'Trace mystery(2): runs mystery(1), logs 2, runs mystery(1) -> Output: 1, 2, 1.'
    ],
    explanation: `Trace the recursion tree:
- mystery(1) prints: 1
- mystery(2) executes: mystery(1), logs 2, mystery(1) -> prints 1, 2, 1
- mystery(3) executes: mystery(2), logs 3, mystery(2) -> prints 1, 2, 1, 3, 1, 2, 1.
Total numbers printed = 2^3 - 1 = 7.`,
    solutionCode: `function mystery(n) {
  if (n <= 0) return;
  mystery(n - 1);
  console.log(n);
  mystery(n - 1);
}
// Outputs: 1, 2, 1, 3, 1, 2, 1`,
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n) stack frames',
    interviewCompanies: ['Meta', 'Goldman Sachs']
  },

  // =========================================================================
  // 6. FIND-THE-ERROR QUESTION
  // =========================================================================
  {
    id: 'find-error-binary-search',
    title: 'Find the Error: Binary Search Infinite Loop Bug',
    category: 'searching',
    categoryLabel: 'Searching',
    type: 'find-error',
    difficulty: 'Intermediate',
    statement: `The following binary search code contains a bug that causes an **infinite loop** for certain targets. Identify the root cause:

\`\`\`javascript
function search(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid; // <-- LINE A
    } else {
      right = mid - 1; // <-- LINE B
    }
  }
  return -1;
}
\`\`\``,
    options: [
      'Line B should be right = mid instead of right = mid - 1',
      'Line A should be left = mid + 1 instead of left = mid',
      'The while condition should be left < right instead of left <= right',
      'mid calculation causes integer overflow in JavaScript'
    ],
    correctOptionIndex: 1,
    hints: [
      'If left = 0, right = 1, and arr = [2, 5], target = 5: mid = Math.floor(0+1)/2 = 0. arr[0] < 5, so left = 0. Notice left never increases!'
    ],
    explanation: 'Setting `left = mid` causes an infinite loop when `left` and `right` differ by 1 (e.g., left=0, right=1 -> mid=0). Since `arr[0] < target`, `left` remains 0 indefinitely. Correcting it to `left = mid + 1` guarantees the search interval shrinks on every iteration.',
    solutionCode: `function search(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1; // Corrected!
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    interviewCompanies: ['Google', 'Microsoft']
  },

  // =========================================================================
  // 7. ALGORITHM THEORY QUESTION
  // =========================================================================
  {
    id: 'theory-hashmap-collisions',
    title: 'Theory: Hash Table Collision Resolution Strategies',
    category: 'hash-tables',
    categoryLabel: 'Hash Tables',
    type: 'theory',
    difficulty: 'Intermediate',
    statement: `Explain how Hash Tables achieve O(1) average time complexity despite potential key collisions, and compare Separate Chaining vs Open Addressing (Linear Probing).`,
    options: [
      'Separate Chaining uses linked lists/trees at each bucket; Open Addressing searches alternative slots within the table array',
      'Hash tables do not allow duplicate hash codes and throw an exception on collision',
      'Open Addressing requires linked lists at every table slot',
      'Separate Chaining has lower memory overhead than Open Addressing under high load factors'
    ],
    correctOptionIndex: 0,
    hints: [
      'Separate chaining stores multiple keys in buckets; Open addressing keeps all elements directly in the hash table array.'
    ],
    explanation: `Hash tables use hash functions to map arbitrary keys to integer indices.
1. **Separate Chaining:** Each bucket contains a linked list or red-black tree (e.g. Java HashMap). When collisions occur, elements are appended to the bucket chain. Performance gracefully degrades to O(log k).
2. **Open Addressing:** All entries reside within the array itself. When a collision occurs, probing algorithms (Linear, Quadratic, or Double Hashing) search for the next empty array index.
Under a good hash function and dynamic resizing (load factor < 0.75), bucket lengths remain O(1).`,
    solutionCode: `// Conceptual Separate Chaining Hash Table
class SimpleHashTable {
  constructor(size = 53) {
    this.buckets = new Array(size).fill(null).map(() => []);
  }
  _hash(key) {
    let total = 0;
    for (let char of key) total = (total * 31 + char.charCodeAt(0)) % this.buckets.length;
    return total;
  }
  set(key, val) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const existing = bucket.find(([k]) => k === key);
    if (existing) existing[1] = val;
    else bucket.push([key, val]);
  }
  get(key) {
    const idx = this._hash(key);
    const found = this.buckets[idx].find(([k]) => k === key);
    return found ? found[1] : undefined;
  }
}`,
    timeComplexity: 'Average: O(1) | Worst: O(n)',
    spaceComplexity: 'O(n)',
    interviewCompanies: ['Meta', 'Amazon', 'Apple', 'Netflix']
  },

  // =========================================================================
  // 8. DYNAMIC PROGRAMMING — CODING
  // =========================================================================
  {
    id: 'coin-change',
    title: 'Coin Change (Fewest Coins Problem)',
    category: 'dynamic-programming',
    categoryLabel: 'Dynamic Programming',
    type: 'coding',
    difficulty: 'Intermediate',
    statement: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.
Return the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.`,
    inputFormat: 'coins: number[], amount: number',
    outputFormat: 'number',
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    starterCode: `function coinChange(coins, amount) {
  // Use dynamic programming bottom-up array dp[0..amount]
  
}`,
    functionName: 'coinChange',
    testCases: [
      {
        id: 'tc-1',
        input: '[1, 2, 5], 11',
        expectedOutput: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total).'
      },
      {
        id: 'tc-2',
        input: '[2], 3',
        expectedOutput: '-1',
        explanation: 'Amount 3 cannot be formed using only coin 2.'
      },
      {
        id: 'tc-3',
        input: '[1], 0',
        expectedOutput: '0',
        explanation: 'Amount 0 requires 0 coins.'
      }
    ],
    hints: [
      'Define dp[i] as the minimum coins needed to make amount i.',
      'Initialize dp array with Infinity, set dp[0] = 0.',
      'For each coin c and amount i: dp[i] = Math.min(dp[i], dp[i - c] + 1).'
    ],
    explanation: 'Bottom-up dynamic programming builds solutions from 0 to target amount. For each amount i, try every coin c and transition from dp[i - c] + 1.',
    solutionCode: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    interviewCompanies: ['Amazon', 'Airbnb', 'Google']
  }
];
