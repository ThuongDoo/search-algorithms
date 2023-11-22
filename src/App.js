import { useState } from "react";
import "./App.css";
import { Graph } from "./components/Graph";
import { aStar, bestFirstSearch } from "./components/SearchAlgorithms";
import GraphEditor from "./components/graphEditor/GraphEditor";

function App() {
  const [graph, setGraph] = useState([]);
  const [path, setPath] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadFile, setIsReadFile] = useState(false);
  const [searchOption, setSearchOption] = useState("1");
  const handleSelectChange = (event) => {
    setSearchOption(event.target.value);
  };
  const algorithmOptions = [
    { value: "0", label: "Best First Search" },
    { value: "1", label: "A Star" },
  ];
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
        setIsReadFile(true);
      };
      reader.readAsText(file);
    }
  };

  function tracePath(goalNode) {
    const path = [];
    let currentNode = goalNode;
    while (currentNode !== null) {
      path.push(currentNode);
      currentNode = currentNode.parent;
    }
    return path.reverse();
  }

  const handleSearch = () => {
    if (searchOption === "1") {
      setPath(tracePath(aStar(graph)));
    } else if (searchOption === "0") {
      setPath(tracePath(bestFirstSearch(graph)));
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="App">
      <div className="editor">
        <GraphEditor graph={graph} />
      </div>
      <div className="controller">
        <h1>Hello React.</h1>
        <input type="file" onChange={(e) => showFile(e)} />
        <h2>Start editing to see some magic happen!</h2>
        <div>
          <label>Algorith</label>
          <select value={searchOption} onChange={handleSelectChange}>
            {algorithmOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch} disabled={!isReadFile}>
          SEARCH
        </button>
        {console.log(path)}
        {path.map((node, index) => (
          <h2 key={index}>{`${node.state}(${node.pCost})->`}</h2>
        ))}
      </div>
    </div>
  );
}

export default App;
