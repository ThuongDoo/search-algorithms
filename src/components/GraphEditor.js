import React, { useEffect, useRef, useState } from "react";
import "../styles.css";
import Vertex from "./Vertex";
import { Field, Form, Formik } from "formik";
import Graph from "./Graph";
import Arrow from "./Arrow";

function GraphEditor() {
  const parentRef = useRef(null);
  const initialGraph = new Graph();
  const [myGraph, setMyGraph] = useState(initialGraph);
  const [vertices, setVertices] = useState([]);

  const addNewVertex = (value) => {
    const newGraph = new Graph();
    newGraph.vertices = [...myGraph.vertices];
    newGraph.numVertices = myGraph.numVertices;
    newGraph.matrix = [...myGraph.matrix];
    newGraph.addVertex(value);
    setMyGraph(newGraph);
    const newVertices = newGraph.vertices.map((vertex, index) => ({
      key: index,
      x: 0,
      y: 0,
    }));
    setVertices(newVertices);
  };

  const addNewEdge = (values) => {
    const newGraph = new Graph();
    newGraph.vertices = [...myGraph.vertices];
    newGraph.numVertices = myGraph.numVertices;
    newGraph.matrix = [...myGraph.matrix];
    newGraph.addEdge(values.headNode, values.tailNode, values.pCost);
    setMyGraph(newGraph);
  };

  const changeVerticeCost = (value) => {
    const updateVertices = vertices.map((vertex) => {
      if (vertex.key === value.key) {
        return value;
      }

      return vertex;
    });
    setVertices(updateVertices);
  };
  // console.log(vertices);
  return (
    <div className="graph">
      <div className="graph-content" ref={parentRef}>
        <Arrow x={[100, 200]} y={[200, 100]} />
        {myGraph.vertices.map((vertex, index) => (
          <Vertex
            name={vertex}
            key={index}
            index={index}
            parentRef={parentRef}
            onPositionChange={changeVerticeCost}
          />
        ))}
        {myGraph.matrix.forEach((vertex, headIndex) =>
          vertex.forEach((edge, tailIndex) => {
            if (edge !== 0) {
              console.log(edge);
            }
          })
        )}
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
                <label htmlFor="addNew">New Vertex</label>
                <Field type="text" name="addNew" placeholder="vertex" />
                <button
                  type="button"
                  onClick={() => {
                    addNewVertex(formikProps.values.addNew);
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
      </div>
    </div>
  );
}

export default GraphEditor;
