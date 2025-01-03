import React, { useState } from "react";
import "./DFS.css";

const DFS = () => {
  const [graph, setGraph] = useState({}); // State for the graph structure
  const [visitedNodes, setVisitedNodes] = useState([]); // State for tracking visited nodes
  const [startNode, setStartNode] = useState(""); // Starting node for DFS
  const [isRunning, setIsRunning] = useState(false); // State to indicate if DFS is in progress

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Adds a node to the graph
  const addNode = (node) => {
    if (isRunning || graph[node]) return;
    setGraph((prevGraph) => ({ ...prevGraph, [node]: [] }));
  };

  // Adds an edge between two nodes
  const addEdge = (node1, node2) => {
    if (isRunning || !graph[node1] || !graph[node2]) return;
    setGraph((prevGraph) => {
      const updatedGraph = { ...prevGraph };
      updatedGraph[node1].push(node2);
      updatedGraph[node2].push(node1);
      return updatedGraph;
    });
  };

  // Depth First Search Algorithm
  const dfs = async (node, visited) => {
    if (!node || visited.includes(node)) return;

    setVisitedNodes((prev) => [...prev, node]);
    await sleep(500); // Delay for visualization

    for (let neighbor of graph[node]) {
      if (!visited.includes(neighbor)) {
        await dfs(neighbor, [...visited, node]);
      }
    }
  };

  const startDFS = async () => {
    if (isRunning || !startNode || !graph[startNode]) return;
    setIsRunning(true);
    setVisitedNodes([]);
    await dfs(startNode, []);
    setIsRunning(false);
  };

  return (
    <div className="dfs-container">
      <h2>Depth First Search (DFS) Visualization</h2>

      {/* Graph Display */}
      <div className="graph-display">
        {Object.keys(graph).map((node) => (
          <div key={node} className="node">
            {node}
            <ul>
              {graph[node].map((neighbor, index) => (
                <li key={index}>{neighbor}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Add Node"
          onKeyDown={(e) => {
            if (e.key === "Enter") addNode(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Add Edge (e.g., A-B)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const [node1, node2] = e.target.value.split("-");
              addEdge(node1.trim(), node2.trim());
            }
          }}
        />
        <input
          type="text"
          placeholder="Start Node"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value.trim())}
          disabled={isRunning}
        />
        <button onClick={startDFS} disabled={isRunning}>Start DFS</button>
      </div>

      {/* Visited Nodes */}
      <div className="visited-nodes">
        <h3>Visited Nodes</h3>
        <p>{visitedNodes.join(", ")}</p>
      </div>

      {/* Explanation */}
      <div className="explanation">
        <h3>Depth First Search Explanation</h3>
        <p>
          Depth First Search is an algorithm that traverses a graph by exploring
          as far as possible along each branch before backtracking. It uses a
          stack-based approach, either explicitly or through recursion.
        </p>
        <p>Time Complexity: O(V + E)</p>
        <p>Space Complexity: O(V)</p>
      </div>
    </div>
  );
};

export default DFS;

