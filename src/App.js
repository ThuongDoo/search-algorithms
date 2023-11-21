import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";

function App() {
  const [graph, setGraph] = useState([]);
  const showFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const [heuristicInput, variables, graphInput] = text
          .trim()
          .split(/\n\n+/);
        // set heuristic
        const tempHeuristic = heuristicInput.split("\n").map((line) =>
          line
            .trim()
            .split(/\s+/)
            .map((item, index) => (index === 0 ? item : Number(item)))
        );

        //set variables
        const [initial, goal] = variables
          .split("\n")
          .map((item) => item.trim().split(/\s+/)[1]);
        console.log(initial, goal);

        //set graph
        const tempGraph = graphInput
          .split("\n")
          .map((line) => line.trim().split(/\s+/).map(Number));
        setGraph(tempGraph);
        const newGraph = new Graph({
          matrix: tempGraph,
          goal: goal,
          initial: initial,
          nodes: tempHeuristic,
        });
        setGraph(newGraph);
      };
      reader.readAsText(file);
    }
  };
  console.log(graph);
  return (
    <div className="App">
      <div>
        <h1>Hello React.</h1>
        <input type="file" onChange={(e) => showFile(e)} />
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </div>
  );
}

export default App;
