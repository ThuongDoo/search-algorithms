class Graph {
  constructor() {
    this.numVertices = 0;
    this.vertices = [];
    this.matrix = new Array(this.numVertices)
      .fill(0)
      .map(() => new Array(this.numVertices).fill(0));
  }

  addVertex(name) {
    if (!this.isVertexUnique(name)) {
      alert("Vertex name must be unique");
      return;
    }
    this.vertices.push(name);
    this.numVertices++;
    this.resizeMatrix();
  }

  isVertexUnique(name) {
    return this.vertices.every((vertex) => vertex !== name);
  }

  addEdge(vertexName1, vertexName2, value) {
    const vertex1 = this.vertices.indexOf(vertexName1);
    const vertex2 = this.vertices.indexOf(vertexName2);
    console.log(vertex1, vertex2);
    if (vertex1 !== -1 && vertex2 !== -1) {
      this.matrix[vertex1][vertex2] = value;
      // this.matrix[vertex2][vertex1] = value;
    } else {
      alert("No Vertex Found");
    }
  }

  resizeMatrix() {
    const newMatrix = new Array(this.numVertices)
      .fill(0)
      .map(() => new Array(this.numVertices).fill(0));
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        newMatrix[i][j] = this.matrix[i][j];
      }
    }
    this.matrix = newMatrix;
  }
}

export default Graph;
