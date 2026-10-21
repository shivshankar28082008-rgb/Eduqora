export interface DsaEngineStep {
  step: number;
  description: string;
  comparisons: number;
  swaps: number;
  array?: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  pointers?: Record<string, number>;
  eliminatedIndices?: number[];
  foundIndex?: number;
  status?: 'running' | 'paused' | 'completed' | 'found' | 'not_found';
  
  // Stacks & Queues
  stackItems?: number[];
  queueItems?: number[];
  actionTarget?: number;

  // Linked list
  listItems?: Array<{ val: number; active?: boolean; isNew?: boolean }>;
  
  // Tree & BST
  treeNodes?: Array<{ id: number; val: number; active?: boolean; visited?: boolean }>;
  traversalOrder?: number[];
  
  // Graph
  graphVisited?: string[];
  graphActive?: string;
  graphQueueOrStack?: string[];
  graphTraversalOrder?: string[];
}

export const dsaAlgorithmEngine = {
  // 1. BUBBLE SORT
  generateBubbleSortSteps(initialArray: number[]): DsaEngineStep[] {
    const arr = [...initialArray];
    const n = arr.length;
    const steps: DsaEngineStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [];

    steps.push({
      step: 0,
      description: 'Initial array state. Ready to begin Bubble Sort.',
      comparisons: 0,
      swaps: 0,
      array: [...arr],
      sortedIndices: [],
      status: 'running'
    });

    for (let i = 0; i < n; i++) {
      let swappedInPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        steps.push({
          step: steps.length,
          description: `Compare elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
          comparisons,
          swaps,
          array: [...arr],
          comparingIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          pointers: { i, j },
          status: 'running'
        });

        if (arr[j] > arr[j + 1]) {
          swaps++;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swappedInPass = true;
          steps.push({
            step: steps.length,
            description: `Swapped ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}.`,
            comparisons,
            swaps,
            array: [...arr],
            swappingIndices: [j, j + 1],
            sortedIndices: [...sortedIndices],
            pointers: { i, j },
            status: 'running'
          });
        }
      }
      sortedIndices.unshift(n - i - 1);
      steps.push({
        step: steps.length,
        description: `Pass ${i + 1} complete. Element ${arr[n - i - 1]} is now in its final sorted position.`,
        comparisons,
        swaps,
        array: [...arr],
        sortedIndices: [...sortedIndices],
        status: 'running'
      });

      if (!swappedInPass) {
        steps.push({
          step: steps.length,
          description: 'No swaps needed in this pass. Early exit optimization triggered — array is fully sorted!',
          comparisons,
          swaps,
          array: [...arr],
          sortedIndices: Array.from({ length: n }, (_, idx) => idx),
          status: 'completed'
        });
        return steps;
      }
    }

    steps.push({
      step: steps.length,
      description: `Bubble Sort completed successfully with ${comparisons} comparisons and ${swaps} swaps.`,
      comparisons,
      swaps,
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      status: 'completed'
    });
    return steps;
  },

  // 2. SELECTION SORT
  generateSelectionSortSteps(initialArray: number[]): DsaEngineStep[] {
    const arr = [...initialArray];
    const n = arr.length;
    const steps: DsaEngineStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [];

    steps.push({
      step: 0,
      description: 'Initial array state. Ready to begin Selection Sort.',
      comparisons: 0,
      swaps: 0,
      array: [...arr],
      sortedIndices: [],
      status: 'running'
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      steps.push({
        step: steps.length,
        description: `Pass ${i + 1}: Assume element at index ${i} (${arr[i]}) is the current minimum.`,
        comparisons,
        swaps,
        array: [...arr],
        comparingIndices: [i],
        pointers: { currentMin: minIdx, scan: i },
        sortedIndices: [...sortedIndices],
        status: 'running'
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        steps.push({
          step: steps.length,
          description: `Comparing candidate index ${j} (${arr[j]}) with minimum at index ${minIdx} (${arr[minIdx]}).`,
          comparisons,
          swaps,
          array: [...arr],
          comparingIndices: [minIdx, j],
          pointers: { currentMin: minIdx, scan: j },
          sortedIndices: [...sortedIndices],
          status: 'running'
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({
            step: steps.length,
            description: `New minimum found! Index ${minIdx} has value ${arr[minIdx]}.`,
            comparisons,
            swaps,
            array: [...arr],
            pointers: { currentMin: minIdx, scan: j },
            sortedIndices: [...sortedIndices],
            status: 'running'
          });
        }
      }

      if (minIdx !== i) {
        swaps++;
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push({
          step: steps.length,
          description: `Swap minimum element ${arr[i]} into sorted index ${i}.`,
          comparisons,
          swaps,
          array: [...arr],
          swappingIndices: [i, minIdx],
          sortedIndices: [...sortedIndices, i],
          status: 'running'
        });
      }
      sortedIndices.push(i);
    }
    sortedIndices.push(n - 1);

    steps.push({
      step: steps.length,
      description: `Selection Sort complete with ${comparisons} comparisons and ${swaps} swaps.`,
      comparisons,
      swaps,
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      status: 'completed'
    });
    return steps;
  },

  // 3. INSERTION SORT
  generateInsertionSortSteps(initialArray: number[]): DsaEngineStep[] {
    const arr = [...initialArray];
    const n = arr.length;
    const steps: DsaEngineStep[] = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      step: 0,
      description: 'Initial array state. Index 0 is trivially sorted.',
      comparisons: 0,
      swaps: 0,
      array: [...arr],
      sortedIndices: [0],
      status: 'running'
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      steps.push({
        step: steps.length,
        description: `Select element key = ${key} at index ${i} to insert into sorted portion.`,
        comparisons,
        swaps,
        array: [...arr],
        comparingIndices: [i],
        pointers: { keyIndex: i },
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        status: 'running'
      });

      while (j >= 0) {
        comparisons++;
        if (arr[j] > key) {
          swaps++;
          arr[j + 1] = arr[j];
          steps.push({
            step: steps.length,
            description: `${arr[j]} > ${key}. Shift ${arr[j]} right to index ${j + 1}.`,
            comparisons,
            swaps,
            array: [...arr],
            swappingIndices: [j, j + 1],
            pointers: { slidingKey: j },
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
            status: 'running'
          });
          j--;
        } else {
          break;
        }
      }
      arr[j + 1] = key;
      steps.push({
        step: steps.length,
        description: `Inserted key ${key} at index ${j + 1}.`,
        comparisons,
        swaps,
        array: [...arr],
        comparingIndices: [j + 1],
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        status: 'running'
      });
    }

    steps.push({
      step: steps.length,
      description: `Insertion Sort completed with ${comparisons} comparisons and ${swaps} shifts.`,
      comparisons,
      swaps,
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      status: 'completed'
    });
    return steps;
  },

  // 4. LINEAR SEARCH
  generateLinearSearchSteps(initialArray: number[], target: number): DsaEngineStep[] {
    const arr = [...initialArray];
    const steps: DsaEngineStep[] = [];
    let comparisons = 0;

    steps.push({
      step: 0,
      description: `Ready to search for target ${target} sequentially from index 0.`,
      comparisons: 0,
      swaps: 0,
      array: [...arr],
      status: 'running'
    });

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      if (arr[i] === target) {
        steps.push({
          step: steps.length,
          description: `TARGET FOUND! Element at index ${i} equals ${target}.`,
          comparisons,
          swaps: 0,
          array: [...arr],
          foundIndex: i,
          comparingIndices: [i],
          status: 'found'
        });
        return steps;
      }

      steps.push({
        step: steps.length,
        description: `Checking index ${i}: value ${arr[i]} !== target ${target}. Advancing to next index.`,
        comparisons,
        swaps: 0,
        array: [...arr],
        comparingIndices: [i],
        pointers: { current: i },
        status: 'running'
      });
    }

    steps.push({
      step: steps.length,
      description: `Target ${target} was not found in the array after checking all ${arr.length} elements.`,
      comparisons,
      swaps: 0,
      array: [...arr],
      status: 'not_found'
    });
    return steps;
  },

  // 5. BINARY SEARCH
  generateBinarySearchSteps(initialArray: number[], target: number): DsaEngineStep[] {
    // Binary search requires sorted array
    const arr = [...initialArray].sort((a, b) => a - b);
    const steps: DsaEngineStep[] = [];
    let left = 0;
    let right = arr.length - 1;
    let comparisons = 0;

    steps.push({
      step: 0,
      description: `Array sorted for Binary Search. Target = ${target}. Left = 0, Right = ${right}.`,
      comparisons: 0,
      swaps: 0,
      array: [...arr],
      pointers: { left, right },
      status: 'running'
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;

      // Compute eliminated indices
      const eliminated: number[] = [];
      for (let i = 0; i < arr.length; i++) {
        if (i < left || i > right) eliminated.push(i);
      }

      steps.push({
        step: steps.length,
        description: `Calculate mid = Math.floor((${left} + ${right}) / 2) = ${mid}. Element at mid = ${arr[mid]}.`,
        comparisons,
        swaps: 0,
        array: [...arr],
        comparingIndices: [mid],
        pointers: { left, mid, right },
        eliminatedIndices: eliminated,
        status: 'running'
      });

      if (arr[mid] === target) {
        steps.push({
          step: steps.length,
          description: `TARGET FOUND! Element at index ${mid} (${arr[mid]}) matches target ${target}.`,
          comparisons,
          swaps: 0,
          array: [...arr],
          foundIndex: mid,
          pointers: { mid },
          status: 'found'
        });
        return steps;
      }

      if (arr[mid] < target) {
        steps.push({
          step: steps.length,
          description: `${arr[mid]} < ${target}. Target must be in right half. Eliminate left..mid. Left becomes ${mid + 1}.`,
          comparisons,
          swaps: 0,
          array: [...arr],
          pointers: { left: mid + 1, right },
          eliminatedIndices: [...eliminated, ...Array.from({ length: mid - left + 1 }, (_, k) => left + k)],
          status: 'running'
        });
        left = mid + 1;
      } else {
        steps.push({
          step: steps.length,
          description: `${arr[mid]} > ${target}. Target must be in left half. Eliminate mid..right. Right becomes ${mid - 1}.`,
          comparisons,
          swaps: 0,
          array: [...arr],
          pointers: { left, right: mid - 1 },
          eliminatedIndices: [...eliminated, ...Array.from({ length: right - mid + 1 }, (_, k) => mid + k)],
          status: 'running'
        });
        right = mid - 1;
      }
    }

    steps.push({
      step: steps.length,
      description: `Target ${target} does not exist in the sorted array (left exceeded right).`,
      comparisons,
      swaps: 0,
      array: [...arr],
      eliminatedIndices: Array.from({ length: arr.length }, (_, k) => k),
      status: 'not_found'
    });
    return steps;
  },

  // 6. STACK SIMULATOR (Push, Pop, Peek, Clear)
  generateStackOperationSteps(currentStack: number[], operation: 'push' | 'pop' | 'peek' | 'clear', value?: number): DsaEngineStep[] {
    const stack = [...currentStack];
    const steps: DsaEngineStep[] = [];

    if (operation === 'push') {
      const val = value ?? Math.floor(Math.random() * 90 + 10);
      steps.push({
        step: 0,
        description: `Push request: inserting value ${val} on top of stack.`,
        comparisons: 0,
        swaps: 0,
        stackItems: [...stack],
        actionTarget: val,
        status: 'running'
      });
      stack.push(val);
      steps.push({
        step: 1,
        description: `Pushed ${val}. Stack height is now ${stack.length}. LIFO Top is ${val}.`,
        comparisons: 0,
        swaps: 0,
        stackItems: [...stack],
        status: 'completed'
      });
    } else if (operation === 'pop') {
      if (stack.length === 0) {
        steps.push({
          step: 0,
          description: 'Stack Underflow! Cannot pop from an empty stack.',
          comparisons: 0,
          swaps: 0,
          stackItems: [],
          status: 'not_found'
        });
      } else {
        const popped = stack.pop()!;
        steps.push({
          step: 0,
          description: `Popped top element ${popped} from the stack. Remaining height: ${stack.length}.`,
          comparisons: 0,
          swaps: 0,
          stackItems: [...stack],
          actionTarget: popped,
          status: 'completed'
        });
      }
    } else if (operation === 'peek') {
      if (stack.length === 0) {
        steps.push({
          step: 0,
          description: 'Stack is empty. Peek returns undefined.',
          comparisons: 0,
          swaps: 0,
          stackItems: [],
          status: 'not_found'
        });
      } else {
        const top = stack[stack.length - 1];
        steps.push({
          step: 0,
          description: `Peek operation: Current top element is ${top}.`,
          comparisons: 0,
          swaps: 0,
          stackItems: [...stack],
          actionTarget: top,
          status: 'found'
        });
      }
    } else if (operation === 'clear') {
      steps.push({
        step: 0,
        description: 'Stack reset to empty state.',
        comparisons: 0,
        swaps: 0,
        stackItems: [],
        status: 'completed'
      });
    }

    return steps;
  },

  // 7. QUEUE SIMULATOR (Enqueue, Dequeue, Front, Clear)
  generateQueueOperationSteps(currentQueue: number[], operation: 'enqueue' | 'dequeue' | 'front' | 'clear', value?: number): DsaEngineStep[] {
    const queue = [...currentQueue];
    const steps: DsaEngineStep[] = [];

    if (operation === 'enqueue') {
      const val = value ?? Math.floor(Math.random() * 90 + 10);
      steps.push({
        step: 0,
        description: `Enqueue request: adding ${val} to the rear of queue.`,
        comparisons: 0,
        swaps: 0,
        queueItems: [...queue],
        actionTarget: val,
        status: 'running'
      });
      queue.push(val);
      steps.push({
        step: 1,
        description: `Enqueued ${val}. Queue length is now ${queue.length}. Front is ${queue[0]}, Rear is ${val}.`,
        comparisons: 0,
        swaps: 0,
        queueItems: [...queue],
        status: 'completed'
      });
    } else if (operation === 'dequeue') {
      if (queue.length === 0) {
        steps.push({
          step: 0,
          description: 'Queue Underflow! Cannot dequeue from an empty queue.',
          comparisons: 0,
          swaps: 0,
          queueItems: [],
          status: 'not_found'
        });
      } else {
        const dequeued = queue.shift()!;
        steps.push({
          step: 0,
          description: `Dequeued front element ${dequeued} (FIFO). Next front is ${queue[0] ?? 'empty'}.`,
          comparisons: 0,
          swaps: 0,
          queueItems: [...queue],
          actionTarget: dequeued,
          status: 'completed'
        });
      }
    } else if (operation === 'front') {
      if (queue.length === 0) {
        steps.push({
          step: 0,
          description: 'Queue is empty. Front returns undefined.',
          comparisons: 0,
          swaps: 0,
          queueItems: [],
          status: 'not_found'
        });
      } else {
        steps.push({
          step: 0,
          description: `Inspected front element: ${queue[0]}.`,
          comparisons: 0,
          swaps: 0,
          queueItems: [...queue],
          actionTarget: queue[0],
          status: 'found'
        });
      }
    } else if (operation === 'clear') {
      steps.push({
        step: 0,
        description: 'Queue reset to empty state.',
        comparisons: 0,
        swaps: 0,
        queueItems: [],
        status: 'completed'
      });
    }

    return steps;
  },

  // 8. BINARY SEARCH TREE TRAVERSALS
  generateBstTraversalSteps(treeValues: number[], order: 'inorder' | 'preorder' | 'postorder' | 'levelorder'): DsaEngineStep[] {
    const steps: DsaEngineStep[] = [];
    // Build tree
    interface Node {
      val: number;
      left?: Node;
      right?: Node;
    }
    let root: Node | null = null;
    function insert(node: Node | null, val: number): Node {
      if (!node) return { val };
      if (val < node.val) node.left = insert(node.left || null, val);
      else node.right = insert(node.right || null, val);
      return node;
    }
    for (const v of treeValues) root = insert(root, v);

    const visited: number[] = [];

    steps.push({
      step: 0,
      description: `Starting ${order.toUpperCase()} traversal on Binary Search Tree.`,
      comparisons: 0,
      swaps: 0,
      treeNodes: treeValues.map(v => ({ id: v, val: v })),
      traversalOrder: [],
      status: 'running'
    });

    if (order === 'inorder') {
      function traverseInorder(node: Node | null) {
        if (!node) return;
        traverseInorder(node.left || null);
        visited.push(node.val);
        steps.push({
          step: steps.length,
          description: `Visited Node ${node.val} (Left -> Root -> Right).`,
          comparisons: visited.length,
          swaps: 0,
          treeNodes: treeValues.map(v => ({ id: v, val: v, active: v === node.val, visited: visited.includes(v) })),
          traversalOrder: [...visited],
          status: 'running'
        });
        traverseInorder(node.right || null);
      }
      traverseInorder(root);
    } else if (order === 'preorder') {
      function traversePreorder(node: Node | null) {
        if (!node) return;
        visited.push(node.val);
        steps.push({
          step: steps.length,
          description: `Visited Node ${node.val} (Root -> Left -> Right).`,
          comparisons: visited.length,
          swaps: 0,
          treeNodes: treeValues.map(v => ({ id: v, val: v, active: v === node.val, visited: visited.includes(v) })),
          traversalOrder: [...visited],
          status: 'running'
        });
        traversePreorder(node.left || null);
        traversePreorder(node.right || null);
      }
      traversePreorder(root);
    } else if (order === 'postorder') {
      function traversePostorder(node: Node | null) {
        if (!node) return;
        traversePostorder(node.left || null);
        traversePostorder(node.right || null);
        visited.push(node.val);
        steps.push({
          step: steps.length,
          description: `Visited Node ${node.val} (Left -> Right -> Root).`,
          comparisons: visited.length,
          swaps: 0,
          treeNodes: treeValues.map(v => ({ id: v, val: v, active: v === node.val, visited: visited.includes(v) })),
          traversalOrder: [...visited],
          status: 'running'
        });
      }
      traversePostorder(root);
    } else if (order === 'levelorder') {
      const q: Node[] = root ? [root] : [];
      while (q.length > 0) {
        const curr = q.shift()!;
        visited.push(curr.val);
        steps.push({
          step: steps.length,
          description: `Visited Node ${curr.val} at current breadth level.`,
          comparisons: visited.length,
          swaps: 0,
          treeNodes: treeValues.map(v => ({ id: v, val: v, active: v === curr.val, visited: visited.includes(v) })),
          traversalOrder: [...visited],
          status: 'running'
        });
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    }

    steps.push({
      step: steps.length,
      description: `${order.toUpperCase()} Traversal complete! Output sequence: [${visited.join(', ')}]`,
      comparisons: visited.length,
      swaps: 0,
      treeNodes: treeValues.map(v => ({ id: v, val: v, visited: true })),
      traversalOrder: [...visited],
      status: 'completed'
    });

    return steps;
  },

  // 9. GRAPH BFS & DFS TRAVERSAL
  generateGraphTraversalSteps(algorithm: 'bfs' | 'dfs', startVertex: string = 'A'): DsaEngineStep[] {
    const graph: Record<string, string[]> = {
      A: ['B', 'C'],
      B: ['A', 'D', 'E'],
      C: ['A', 'F'],
      D: ['B'],
      E: ['B', 'F'],
      F: ['C', 'E']
    };

    const steps: DsaEngineStep[] = [];
    const visited: string[] = [];
    const traversalOrder: string[] = [];

    steps.push({
      step: 0,
      description: `Starting ${algorithm.toUpperCase()} from vertex ${startVertex}.`,
      comparisons: 0,
      swaps: 0,
      graphVisited: [],
      graphActive: startVertex,
      graphQueueOrStack: [startVertex],
      graphTraversalOrder: [],
      status: 'running'
    });

    if (algorithm === 'bfs') {
      const queue: string[] = [startVertex];
      visited.push(startVertex);

      while (queue.length > 0) {
        const curr = queue.shift()!;
        traversalOrder.push(curr);
        const neighbors = graph[curr] || [];
        const unvisitedNeighbors = neighbors.filter(n => !visited.includes(n));

        steps.push({
          step: steps.length,
          description: `Dequeued ${curr}. Inspecting neighbors: [${neighbors.join(', ')}].`,
          comparisons: steps.length,
          swaps: 0,
          graphVisited: [...visited],
          graphActive: curr,
          graphQueueOrStack: [...queue],
          graphTraversalOrder: [...traversalOrder],
          status: 'running'
        });

        for (const n of unvisitedNeighbors) {
          visited.push(n);
          queue.push(n);
          steps.push({
            step: steps.length,
            description: `Enqueued unvisited neighbor ${n}.`,
            comparisons: steps.length,
            swaps: 0,
            graphVisited: [...visited],
            graphActive: n,
            graphQueueOrStack: [...queue],
            graphTraversalOrder: [...traversalOrder],
            status: 'running'
          });
        }
      }
    } else {
      // DFS
      const stack: string[] = [startVertex];
      visited.push(startVertex);

      while (stack.length > 0) {
        const curr = stack.pop()!;
        traversalOrder.push(curr);
        const neighbors = graph[curr] || [];

        steps.push({
          step: steps.length,
          description: `Popped ${curr} from DFS stack. Exploring path.`,
          comparisons: steps.length,
          swaps: 0,
          graphVisited: [...visited],
          graphActive: curr,
          graphQueueOrStack: [...stack],
          graphTraversalOrder: [...traversalOrder],
          status: 'running'
        });

        // Push neighbors in reverse so leftmost is processed first
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const n = neighbors[i];
          if (!visited.includes(n)) {
            visited.push(n);
            stack.push(n);
            steps.push({
              step: steps.length,
              description: `Pushed unvisited neighbor ${n} to DFS recursion stack.`,
              comparisons: steps.length,
              swaps: 0,
              graphVisited: [...visited],
              graphActive: n,
              graphQueueOrStack: [...stack],
              graphTraversalOrder: [...traversalOrder],
              status: 'running'
            });
          }
        }
      }
    }

    steps.push({
      step: steps.length,
      description: `Graph ${algorithm.toUpperCase()} complete! Traversal order: ${traversalOrder.join(' -> ')}`,
      comparisons: traversalOrder.length,
      swaps: 0,
      graphVisited: [...visited],
      graphTraversalOrder: [...traversalOrder],
      status: 'completed'
    });

    return steps;
  }
};
