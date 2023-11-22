export class Graph {
  constructor({ matrix = [], initial = null, goal = null, nodes = [] }) {
    this.matrix = matrix;
    this.initial = initial;
    this.goal = goal;
    this.nodes = nodes;
    this.nullValue = 0;
  }

  getNodeIndex(node) {
    return this.nodes.findIndex((item) => item[0] === node);
  }

  getInitialNode() {
    if (this.initial) {
      const nodeIndex = this.getNodeIndex(this.initial);
      if (nodeIndex !== -1) {
        return this.nodes[nodeIndex];
      }
      return null;
    }
    return null;
  }

  getGoalNode() {
    if (this.goal) {
      const nodeIndex = this.getNodeIndex(this.goal);
      if (nodeIndex !== -1) {
        return this.nodes[nodeIndex];
      }
      return null;
    }
    return null;
  }

  getNode(node) {
    return this.nodes.filter((item) => item[0] === node)[0];
  }

  getExpand(node) {
    const nodeIndex = this.getNodeIndex(node);
    if (nodeIndex !== -1) {
      return this.matrix[nodeIndex]
        .map((edge, index) => {
          if (edge !== this.nullValue) {
            return {
              state: this.nodes[index][0],
              pCost: edge,
              nodeValue: this.nodes[index][1],
            };
          }
          return null;
        })
        .filter((node) => node !== null);
    }
    return null;
  }
}

export class Node {
  constructor({ state, parent = null, pCost = 0, nodeValue = 0 }) {
    this.state = state;
    this.parent = parent;
    this.pCost = pCost;
    this.nodeValue = nodeValue;
  }
}
