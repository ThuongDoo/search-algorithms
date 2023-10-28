import React, { useEffect, useRef, useState } from "react";
import "../styles.css";
import Node from "./Node";
import { Field, Form, Formik } from "formik";
import Graph from "./Graph";
import Arrow from "./Arrow";
import BestFirstSearch from "./BestFirstSearch";

function compareNodebyPCost(nodeA, nodeB) {
  if (nodeA.pCost < nodeB.pCost) {
    return -1;
  } else if (nodeA.pCost > nodeB.pCost) {
    return 1;
  } else {
    return 0;
  }
}

function tracePath(goalNode) {
  const path = [];
  let currentNode = goalNode;
  while (currentNode !== null) {
    path.push(currentNode);
    currentNode = currentNode.parent;
  }
  return path.reverse();
}

function GraphEditor() {
  const parentRef = useRef(null);
  const initialGraph = new Graph();
  const [myGraph, setMyGraph] = useState(initialGraph);
  const [nodes, setNodes] = useState([]);
  const [path, setPath] = useState([]);

  const addNewNode = (value) => {
    const newGraph = new Graph();
    newGraph.nodes = [...myGraph.nodes];
    newGraph.numNodes = myGraph.numNodes;
    newGraph.matrix = [...myGraph.matrix];
    newGraph.addNode(value);
    setMyGraph(newGraph);
    const newNodes = newGraph.nodes.map((node, index) => ({
      key: index,
      x: nodes[index]?.x || 100 * (index + 1),
      y: nodes[index]?.y || 100,
    }));
    setNodes(newNodes);
  };

  const addNewEdge = (values) => {
    const newGraph = new Graph();
    newGraph.nodes = [...myGraph.nodes];
    newGraph.numNodes = myGraph.numNodes;
    newGraph.matrix = [...myGraph.matrix];
    newGraph.addEdge(values.headNode, values.tailNode, values.pCost);
    setMyGraph(newGraph);
  };

  const changeVerticeCost = (value) => {
    const updateNodes = nodes.map((node) => {
      if (node.key === value.key) {
        return value;
      }
      return node;
    });
    setNodes(updateNodes);
  };
  console.log("reload");
  console.log(myGraph.matrix);
  return (
    <div className="graph">
      <div className="graph-content" ref={parentRef}>
        {myGraph.nodes.map((node, index) => (
          <Node
            name={node}
            key={index}
            index={index}
            parentRef={parentRef}
            onPositionChange={changeVerticeCost}
          />
        ))}
        <svg className="arrow-container">
          {myGraph.matrix.map((node, headIndex) =>
            node.map((edge, tailIndex) => {
              if (edge !== 0) {
                const start = [nodes[headIndex].x, nodes[headIndex].y];
                const end = [nodes[tailIndex].x, nodes[tailIndex].y];
                const uniqueKey = `${headIndex}-${tailIndex}`;
                return (
                  <Arrow
                    x={start}
                    y={end}
                    key={uniqueKey}
                    value={myGraph.matrix[headIndex][tailIndex]}
                  />
                );
              }
              return null;
            })
          )}
        </svg>
      </div>
      <div className="graph-controller">
        <h1>Controller</h1>
        <Formik
          initialValues={{ addNew: "", headNode: "", tailNode: "", pCost: "" }}
          enableReinitialize={true}
        >
          {(formikProps) => (
            <Form>
              <div className="formGroup">
                <label htmlFor="addNew">New node</label>
                <Field type="text" name="addNew" placeholder="node" />
                <button
                  type="button"
                  onClick={() => {
                    addNewNode(formikProps.values.addNew);
                    formikProps.resetForm();
                  }}
                >
                  ADD
                </button>
              </div>
              <div className="formGroup">
                <label>New Edge</label>
                <Field type="text" name="headNode" placeholder="head" />
                <Field type="text" name="tailNode" placeholder="tail" />
                <Field type="number" name="pCost" placeholder="value" />
                <button
                  type="button"
                  onClick={() => {
                    addNewEdge(formikProps.values);
                    formikProps.resetForm();
                  }}
                >
                  ADD
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <button
          onClick={() => {
            setPath(tracePath(BestFirstSearch(myGraph, compareNodebyPCost)));
          }}
        >
          Search
        </button>
        <div>
          <h2>Result</h2>
          <div className="path">
            {path?.map((node) => (
              <h5>
                {node.state}({node.pCost})
              </h5>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphEditor;
