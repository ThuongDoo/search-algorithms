class Node {
  constructor({
    state,
    parent = null,
    action = null,
    pCost = 0,
    nodeValue = 0,
  }) {
    this.state = state;
    this.parent = parent;
    this.action = action;
    this.pCost = pCost;
    this.nodeValue = nodeValue;
  }
}

function aStarCompareFunction(nodeA, nodeB) {
  if (nodeA.pCost + nodeA.nodeValue < nodeB.pCost + nodeB.nodeValue) {
    return -1;
  } else if (nodeA.pCost + nodeA.nodeValue > nodeB.pCost + nodeB.nodeValue) {
    return 1;
  } else {
    return 0;
  }
}

function BFSCompareFunction(nodeA, nodeB) {
  if (nodeA.pCost < nodeB.pCost) {
    return -1;
  } else if (nodeA.pCost > nodeB.pCost) {
    return 1;
  } else {
    return 0;
  }
}

class PriorityQueue {
  constructor(compareFunction) {
    this.element = [];
    this.compareFunction = compareFunction;
  }
  push(node) {
    this.element.push(node);
    this.element.sort(this.compareFunction);
  }
  pop() {
    return this.element.shift();
  }
  isEmpty() {
    return this.element.length === 0;
  }
  getElement() {
    return this.element;
  }
}

function* Expand(problem, parentNode) {
  const nodes = problem.getExpand(parentNode.state);
  if (nodes) {
    const expandedNodes = nodes.map(
      (node) =>
        new Node({
          state: node.state,
          pCost: node.pCost + parentNode.pCost,
          nodeValue: node.nodeValue,
          parent: parentNode,
        })
    );
    for (const node of expandedNodes) {
      yield node;
    }
  }
}

export function aStar(problem) {
  console.log("astar");
  const node = new Node({
    state: problem.getInitialNode(),
    nodeValue: problem.getNode(problem.getInitialNode())[1],
  });
  console.log("ini");
  console.log(problem.getNode("s"));
  console.log(node);
  console.log("uni");
  const frontier = new PriorityQueue(aStarCompareFunction);
  frontier.push(node);

  const reached = new Map();
  reached.set(node.state, {
    pCost: 0,
    nodeValue: node.nodeValue,
    parent: node.parent,
  });
  while (!frontier.isEmpty()) {
    const currentNode = frontier.pop();
    if (problem.getGoalNode() === currentNode.state) {
      return currentNode;
    }

    const expandedNodes = Expand(problem, currentNode);
    for (const node of expandedNodes) {
      const s = node.state;
      if (
        !reached.has(s) ||
        node.pCost + node.nodeValue <
          reached.get(s).pCost + reached.get(s).nodeValue
      ) {
        reached.set(s, {
          pCost: node.pCost,
          nodeValue: node.nodeValue,
          parent: node.parent,
        });
        frontier.push(node);
      }
    }
  }
  return null;
}
export function BestFirstSearch(problem) {
  console.log("BFS");
  const node = new Node({ state: problem.getInitialNode() });
  const frontier = new PriorityQueue(BFSCompareFunction);
  frontier.push(node);

  const reached = new Map();
  reached.set(node.state, { pCost: 0, parent: node.parent });
  while (!frontier.isEmpty()) {
    const currentNode = frontier.pop();
    if (problem.getGoalNode() === currentNode.state) {
      return currentNode;
    }

    const expandedNodes = Expand(problem, currentNode);
    for (const node of expandedNodes) {
      const s = node.state;
      if (!reached.has(s) || node.pCost < reached.get(s).pCost) {
        reached.set(s, { pCost: node.pCost, parent: node.parent });
        frontier.push(node);
      }
    }
  }
  return null;
}

// export default BestFirstSearch;
