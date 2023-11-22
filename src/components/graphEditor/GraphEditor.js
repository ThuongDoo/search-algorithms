import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import Arrow from "./Arrow";

const getRowNumber = (numOfItems) => {
  return Math.ceil(Math.sqrt(numOfItems));
};

const getNodePosition = (nodeIndex, rowNum) => {
  const distance = 200;
  const y = Math.floor(nodeIndex / rowNum);
  const x = nodeIndex % rowNum;
  return [(x + 1) * distance, (y + 1) * distance];
};

function GraphEditor({ graph = [], nodeRadius = 50 }) {
  if (nodeRadius < 50) {
    nodeRadius = 50;
  }
  const parentRef = useRef(null);
  const [myGraph, setMyGraph] = useState(graph);
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    console.log("setGraph");
    if (graph.length !== 0) {
      setMyGraph(graph.matrix);
      const rowNum = getRowNumber(graph.nodes.length);
      setNodes(
        graph.nodes.map((node, index) => ({
          name: node[0],
          value: node[1],
          position: getNodePosition(index, rowNum),
        }))
      );
    }
  }, [graph]);
  const handlePositionChange = (value) => {
    console.log(value);
    const newNodes = nodes.map((node, index) =>
      index === value.index ? { ...node, position: value.position } : node
    );
    setNodes(newNodes);
  };
  console.log(myGraph);
  console.log(nodes);
  return (
    <div style={{ height: "100%" }}>
      <div ref={parentRef} style={{ height: "100%" }}>
        {nodes.map((node, index) => (
          <Node
            name={node.name}
            nodeValue={node.value}
            key={index}
            parentRef={parentRef}
            index={index}
            initialPostition={node.position}
            radius={nodeRadius}
            onPositionChange={handlePositionChange}
          />
        ))}
        <svg
          className="arrow-container"
          style={{ height: "100%", width: "100%" }}
        >
          {myGraph.map((row, rowIndex) =>
            row.map((col, colIndex) => {
              if (col !== 0) {
                const start = nodes[rowIndex].position;
                const end = nodes[colIndex].position;
                const uniqueKey = `${rowIndex}-${colIndex}`;
                return (
                  <Arrow
                    x={start}
                    y={end}
                    key={uniqueKey}
                    value={myGraph[rowIndex][colIndex]}
                    nodeRadius={nodeRadius}
                  />
                );
              }
              return null;
            })
          )}
        </svg>
      </div>
    </div>
  );
}

export default GraphEditor;
