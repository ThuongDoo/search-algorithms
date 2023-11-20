import React, { useRef, useState } from "react";
import "../styles.css";
import Node from "./Node";
import { Field, Form, Formik } from "formik";
import Graph from "./Graph";
import Arrow from "./Arrow";
import { BestFirstSearch, aStar } from "./BestFirstSearch";

function compareNodebyPCost(nodeA, nodeB) {
  if (nodeA.pCost + nodeA.nodeValue < nodeB.pCost + nodeB.nodeValue) {
    return -1;
  } else if (nodeA.pCost + nodeA.nodeValue > nodeB.pCost + nodeB.nodeValue) {
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
    console.log(currentNode);
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
  const algorithmOptions = [
    { value: "0", label: "Best First Search" },
    { value: "1", label: "A Star" },
  ];

  const addNewNode = (node) => {
    setMyGraph((prevGraph) => {
      const newGraph = new Graph();
      Object.assign(newGraph, prevGraph);
      newGraph.addNode(node);
      const newNodes = newGraph.nodes.map((node, index) => ({
        key: index,
        nodeValue: node[1],
        x: nodes[index]?.x || 100 * (index + 1),
        y: nodes[index]?.y || 100,
      }));
      setNodes(newNodes);
      return newGraph;
    });
  };

  const addNewEdge = (values) => {
    setMyGraph((prevGraph) => {
      const newGraph = new Graph();
      Object.assign(newGraph, prevGraph);
      newGraph.addEdge(values.headNode, values.tailNode, values.pCost);
      return newGraph;
    });
  };

  const reset = () => {
    setMyGraph(initialGraph);
    setNodes([]);
    setPath([]);
  };

  const changeGraphType = (value) => {
    reset();
    const newGraph = new Graph();
    if (value === "false") {
      newGraph.setDirect(false);
    } else {
      newGraph.setDirect(true);
    }
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
  const search = (value) => {
    console.log(value);
    setMyGraph((prevGraph) => {
      const newGraph = new Graph();
      Object.assign(newGraph, prevGraph);
      newGraph.setGoal(value.end);
      newGraph.setInitial(value.start);
      if (value.algorithm === "0") {
        console.log("haha");
        setPath(tracePath(BestFirstSearch(newGraph)));
      } else if (value.algorithm === "1") {
        console.log("huhu");
        setPath(tracePath(aStar(newGraph)));
      }
      return newGraph;
    });
  };
  console.log("reload");
  console.log(myGraph);
  return (
    <div className="graph">
      <div className="graph-content" ref={parentRef}>
        {myGraph.nodes.map((node, index) => (
          <Node
            name={node[0]}
            nodeValue={node[1]}
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
          initialValues={{
            addNew: "",
            nodeValue: 0,
            headNode: "",
            tailNode: "",
            pCost: "",
          }}
          enableReinitialize={true}
        >
          {(formikProps) => (
            <Form>
              <div className="formGroup">
                <label htmlFor="addNew">New node</label>
                <Field type="text" name="addNew" placeholder="node" />
                <Field type="number" name="nodeValue" />
                <button
                  type="button"
                  onClick={() => {
                    addNewNode([
                      formikProps.values.addNew,
                      Number(formikProps.values.nodeValue),
                    ]);
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
        <Formik
          initialValues={{
            graphType: myGraph.getIsDirect() || false,
            start: myGraph.getInitialNode() || "",
            end: myGraph.getGoalNode() || "",
            algorithm: "0",
          }}
          enableReinitialize={true}
        >
          {(formikProps) => (
            <Form>
              <div className="formGroup">
                <label>Graph type</label>
                <Field name="graphType" as="select">
                  <option value={false}>Undirected Graph</option>
                  <option value={true}>Directed Graph</option>
                </Field>
                <button
                  type="button"
                  onClick={() => changeGraphType(formikProps.values.graphType)}
                >
                  Change
                </button>
              </div>
              <div className="formGroup">
                <label>Start</label>
                <Field name="start" />
              </div>
              <div className="formGroup">
                <label>End</label>
                <Field name="end" />
              </div>
              <div>
                <label>Algorithm</label>
                <Field name="algorithm" as="select">
                  {algorithmOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>
              <button
                type="button"
                onClick={() => {
                  search(formikProps.values);
                }}
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  formikProps.resetForm();
                }}
              >
                Reset
              </button>
            </Form>
          )}
        </Formik>

        <div>
          <h2>Result</h2>
          <div className="path">
            {path?.map((node, index) => (
              <h4 key={index}>
                {node.state}({node.pCost}){"->"}
              </h4>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphEditor;
