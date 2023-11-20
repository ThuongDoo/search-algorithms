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

function BestFirstSearch(problem, f) {
  const node = new Node({ state: problem.getInitialNode() });
  const frontier = new PriorityQueue(f);
  frontier.push(node);

  const reached = new Map();
  reached.set(node.state, {
    pCost: 0,
    nodeValue: node.nodeValue,
    parent: node.parent,
  });
  while (!frontier.isEmpty()) {
    console.log("while");
    const currentNode = frontier.pop();
    console.log("compare");
    console.log(problem.getGoalNode(), currentNode.state);
    if (problem.getGoalNode() === currentNode.state) {
      return currentNode;
    }

    const expandedNodes = Expand(problem, currentNode);
    console.log("exnod");
    console.log(currentNode);
    console.log(expandedNodes);
    for (const node of expandedNodes) {
      console.log("expand");
      console.log(node);
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

export default BestFirstSearch;
