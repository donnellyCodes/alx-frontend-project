import React, { useState } from "react";
import "./Dijkstra.css";

const Dijkstra = () => {
  const [graph, setGraph] = useState({}); // State for the graph
  const [startNode, setStartNode] = useState(""); // State for the starting node
  const [distances, setDistances] = useState({}); // State for distances to each node
  const [steps, setSteps] = useState([]); // State for the steps of the algorithm
  const [isProcessing, setIsProcessing] = useState(false); // State to track if the algorithm is running

  // Handles adding edges to the graph
  const addEdge = (from, to, weight) => {
    setGraph((prevGraph) => {
      const newGraph = { ...prevGraph };
      if (!newGraph[from]) newGraph[from] = [];
      newGraph[from].push({ to, weight: parseInt(weight, 10) });
      return newGraph;
    });
  };

  // Implements Dijkstra's algorithm
  const dijkstra = async () => {
    if (!graph[startNode]) {
      alert("Invalid start node");
      return;
    }

    setIsProcessing(true);
    const visited = new Set();
    const distances = {};
    const steps = [];

    // Initialize distances to Infinity, except for the start node
    for (const node in graph) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;

    const priorityQueue = [{ node: startNode, distance: 0 }];

    while (priorityQueue.length > 0) {
      // Sort priority queue by distance
      priorityQueue.sort((a, b) => a.distance - b.distance);
      const { node: currentNode, distance: currentDistance } = priorityQueue.shift();

      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      steps.push(`Visiting node ${currentNode} with current distance ${currentDistance}`);
      setSteps([...steps]);

      for (const neighbor of graph[currentNode]) {
        const { to, weight } = neighbor;
        const newDistance = currentDistance + weight;

        if (newDistance < distances[to]) {
          distances[to] = newDistance;
          priorityQueue.push({ node: to, distance: newDistance });
        }
      }

      setDistances({ ...distances });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsProcessing(false);
  };

  return (
    <div className="dijkstra-container">
      <h2>Dijkstra's Algorithm Visualization</h2>

      {/* Graph Input Section */}
      <div className="graph-input">
        <h3>Graph Input</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const from = e.target.from.value;
            const to = e.target.to.value;
            const weight = e.target.weight.value;
            if (from && to && weight) {
              addEdge(from, to, weight);
              e.target.reset();
            }
          }}
        >
          <input type="text" name="from" placeholder="From Node" required />
          <input type="text" name="to" placeholder="To Node" required />
          <input type="number" name="weight" placeholder="Weight" required />
          <button type="submit">Add Edge</button>
        </form>
      </div>

      {/* Start Node Selection */}
      <div className="start-node">
        <h3>Start Node</h3>
        <input
          type="text"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          placeholder="Enter Start Node"
        />
        <button onClick={dijkstra} disabled={isProcessing}>Start Algorithm</button>
      </div>

      {/* Graph Visualization */}
      <div className="graph-visualization">
        <h3>Graph</h3>
        <ul>
          {Object.keys(graph).map((node) => (
            <li key={node}>
              <strong>{node}:</strong> {graph[node].map((edge) => `${edge.to} (${edge.weight})`).join(", ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Algorithm Steps */}
      <div className="steps">
        <h3>Steps</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Distances */}
      <div className="distances">
        <h3>Shortest Distances</h3>
        <ul>
          {Object.keys(distances).map((node) => (
            <li key={node}>
              {node}: {distances[node] === Infinity ? "Infinity" : distances[node]}
            </li>
          ))}
        </ul>
      </div>

      {/* Explanation */}
      <div className="explanation">
        <h3>Dijkstra's Algorithm Explanation</h3>
        <p>
          Dijkstra's Algorithm finds the shortest path from a starting node to all other nodes in a weighted graph. It uses a priority queue to process nodes in order of their current shortest distance.
        </p>
        <p>Time Complexity: O((V + E) log V)</p>
        <p>Space Complexity: O(V)</p>
      </div>
    </div>
  );
};

export default Dijkstra;

