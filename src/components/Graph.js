class Graph {
  constructor(isDirect = false) {
    this.isDirect = isDirect;
    this.numNodes = 0;
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
    this.numNodes++;
    this.resizeMatrix();
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
}

export default Graph;
