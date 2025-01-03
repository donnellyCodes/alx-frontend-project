import React, { useState } from "react";
import "./BreadthFirstSearch.css";

const BreadthFirstSearch = () => {
  const [graph, setGraph] = useState({}); // State for the graph structure
  const [startNode, setStartNode] = useState(""); // State for the starting node
  const [visitedNodes, setVisitedNodes] = useState([]); // State for tracking visited nodes
  const [isSearching, setIsSearching] = useState(false); // State to indicate if the search is in progress
  const [steps, setSteps] = useState([]); // State to record the steps of the search

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Utility function for delays

  // Handles setting up the graph from user input
  const handleGraphInput = (input) => {
    try {
      const parsedGraph = JSON.parse(input); // Parse the input into an object
      setGraph(parsedGraph);
      setSteps([]);
      setVisitedNodes([]);
    } catch (error) {
      alert("Invalid input. Please enter a valid JSON object representing the graph.");
    }
  };

  // Breadth First Search algorithm
  const breadthFirstSearch = async (graph, start) => {
    if (!graph[start]) {
      alert("Start node does not exist in the graph.");
      return;
    }

    setIsSearching(true);
    const visited = new Set(); // To track visited nodes
    const queue = [start]; // BFS uses a queue structure

    while (queue.length > 0) {
      const currentNode = queue.shift(); // Dequeue the first node

      if (!visited.has(currentNode)) {
        visited.add(currentNode); // Mark node as visited
        setVisitedNodes(Array.from(visited)); // Update state

        setSteps((prevSteps) => [
          ...prevSteps,
          `Visited ${currentNode} and enqueued its neighbors: [${graph[currentNode].join(", ")}].`,
        ]);

        // Enqueue unvisited neighbors
        for (const neighbor of graph[currentNode]) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }

        await sleep(500); // Delay for visualization
      }
    }

    setIsSearching(false);
  };

  return (
    <div className="bfs-container">
      <h2>Breadth First Search Visualization</h2>

      {/* Graph Input */}
      <div className="graph-input">
        <textarea
          placeholder='Enter graph as JSON, e.g., {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}'
          onBlur={(e) => handleGraphInput(e.target.value)}
          disabled={isSearching}
        ></textarea>
      </div>

      {/* Start Node Input */}
      <div className="start-node-input">
        <input
          type="text"
          placeholder="Start Node"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          disabled={isSearching}
        />
        <button
          onClick={() => breadthFirstSearch(graph, startNode)}
          disabled={isSearching || !startNode}
        >
          Start BFS
        </button>
      </div>

      {/* Visited Nodes */}
      <div className="visited-nodes">
        <h3>Visited Nodes</h3>
        <ul>
          {visitedNodes.map((node, index) => (
            <li key={index}>{node}</li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="steps">
        <h3>Steps</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Explanation */}
      <div className="explanation">
        <h3>Breadth First Search Explanation</h3>
        <p>
          Breadth First Search (BFS) is a graph traversal algorithm that starts
          at a chosen node and explores all its neighbors at the current depth
          before moving to nodes at the next depth level. BFS uses a queue to
          manage nodes for exploration.
        </p>
        <p>Time Complexity: O(V + E)</p>
        <p>Space Complexity: O(V)</p>
      </div>

      {/* Code Snippet */}
      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function breadthFirstSearch(graph, start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (!visited.has(currentNode)) {
      visited.add(currentNode);
      console.log(
        \`Visited \${currentNode}, enqueued neighbors: [\${graph[currentNode]}]\`
      );

      for (const neighbor of graph[currentNode]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
}
            `}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default BreadthFirstSearch;

