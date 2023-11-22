import { Node } from "./Graph";

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
  const node = new Node({
    state: problem.getInitialNode()[0],
    nodeValue: problem.getNode(problem.getInitialNode()[0])[1],
  });
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
    if (problem.getGoalNode()[0] === currentNode.state) {
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
export function bestFirstSearch(problem) {
  console.log("BFS");
  const node = new Node({ state: problem.getInitialNode()[0] });
  const frontier = new PriorityQueue(BFSCompareFunction);
  frontier.push(node);

  const reached = new Map();
  reached.set(node.state, { pCost: 0, parent: node.parent });
  while (!frontier.isEmpty()) {
    const currentNode = frontier.pop();
    if (problem.getGoalNode()[0] === currentNode.state) {
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
