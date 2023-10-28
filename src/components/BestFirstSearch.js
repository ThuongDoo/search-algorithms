import React from "react";

class Node {
  constructor({ state, parent = null, action = null, pCost = 0 }) {
    this.state = state;
    this.parent = parent;
    this.action = action;
    this.pCost = pCost;
  }
}

class PriorityQueue {
  constructor(compareFunction) {
    this.element = [];
    this.compareFunction = compareFunction;
  }
  push(node) {
    this.element.push(node);
    this.element.sort();
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
  frontier.push(node);
  console.log("front", frontier.getElement());
  const reached = new Map();
  reached.set(node.state, { pCost: 0, parent: node.parent });
  console.log("reached");
  console.log(reached);
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
    result = currentNode;
  }
  return result;
}

export default BestFirstSearch;
