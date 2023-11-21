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
    console.log("push:", this.element);
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
  const expandedNodes = nodes.map(
    (node) =>
      new Node({
        state: node.state,
        pCost: node.pCost + parentNode.pCost,
        nodeValue: node.state[1],
        parent: parentNode,
      })
  );
  for (const node of expandedNodes) {
    yield node;
  }
}

function BestFirstSearch(problem, f) {
  let result;
  const node = new Node({ state: problem.getInitialNode() });
  const frontier = new PriorityQueue(f);
  console.log("before:", frontier.getElement());
  frontier.push(node);
  console.log("after:", frontier.getElement());

  const reached = new Map();
  reached.set(node.state, {
    pCost: 0,
    nodeValue: 0,
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
      console.log("name", node.state[0]);
      console.log("pcost", node.pCost);
      console.log("state1", node.state[1]);
      console.log("heuristic", node.pCost + node.state[1]);
      if (
        !reached.has(s) ||
        node.pCost + node.state[1] <
          reached.get(s).pCost + reached.get(s).nodeValue
      ) {
        reached.set(s, {
          pCost: node.pCost,
          nodeValue: node.state[1],
          parent: node.parent,
        });
        frontier.push(node);
      }
    }
    result = currentNode;
  }
  return result;
}

export default BestFirstSearch;
