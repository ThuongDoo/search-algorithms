export class Graph {
  constructor({ matrix = [], initial = 0, goal = 0, nodes = [] }) {
    this.matrix = matrix;
    this.initial = initial;
    this.goal = goal;
    this.nodes = nodes;
  }
}

export default Graph;
