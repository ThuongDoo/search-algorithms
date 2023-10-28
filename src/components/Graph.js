class Graph {
  constructor(isDirect = false) {
    this.isDirect = isDirect; //tam thoi chua code phan co huong hay ko huong, mac dinh la co huong
    this.numNodes = 0;
    this.initial = 0;
    this.nodes = [];
    this.matrix = new Array(this.numNodes)
      .fill(0)
      .map(() => new Array(this.numNodes).fill(0));
  }

  addNode(name) {
    if (!this.isNodeUnique(name)) {
      alert("Vertex name must be unique");
      return;
    }
    this.nodes.push(name);
    this.goal = this.nodes.length - 1;
    this.numNodes++;
    this.resizeMatrix();
  }

  setInitial(node) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i] === node) {
        this.initial = i;
        return;
      }
    }
  }

  isNodeUnique(name) {
    return this.nodes.every((vertex) => vertex !== name);
  }

  addEdge(nodeName1, nodeName2, value) {
    const node1 = this.nodes.indexOf(nodeName1);
    const node2 = this.nodes.indexOf(nodeName2);
    if (node1 !== -1 && node2 !== -1) {
      this.matrix[node1][node2] = value;
      this.matrix[node2][node1] = value;
    } else {
      alert("No Node Found");
    }
  }

  resizeMatrix() {
    const newMatrix = new Array(this.numNodes)
      .fill(0)
      .map(() => new Array(this.numNodes).fill(0));
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        newMatrix[i][j] = this.matrix[i][j];
      }
    }
    this.matrix = newMatrix;
  }

  getInitialNode() {
    return this.nodes[this.initial];
  }

  getGoalNode() {
    return this.nodes[this.goal];
  }
  getExpand(node) {
    const nodeIndex = this.nodes.indexOf(node);
    return this.matrix[nodeIndex]
      .map((edge, index) => {
        if (edge !== 0) {
          return { state: this.nodes[index], pCost: edge };
        }
        return null;
      })
      .filter((node) => node !== null);
  }
}

export default Graph;
