import React, { useState } from "react";
import "./LinearSearch.css";

const LinearSearch = () => {
  const [array, setArray] = useState([]); // State for the array to be visualized
  const [target, setTarget] = useState(0); // State for the target value to search for
  const [isSearching, setIsSearching] = useState(false); // State to indicate if the search is in progress
  const [metrics, setMetrics] = useState({ comparisons: 0, found: false }); // State for tracking metrics like comparisons and search result
  const [steps, setSteps] = useState([]); // State to record the steps of the search process
  const [customInput, setCustomInput] = useState(""); // State for custom input array values

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Utility function to create delays

  // Generates a random array of numbers between 0 and 100
  const generateArray = () => {
    if (isSearching) return; // Prevent changes if a search is ongoing
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray.map((value) => ({ value, highlight: false }))); // Initialize array with highlight property
    setMetrics({ comparisons: 0, found: false }); // Reset metrics
    setSteps([]); // Clear steps
  };

  // Handles custom input for the array
  const handleCustomInput = () => {
    if (isSearching) return; // Prevent changes if a search is ongoing
    try {
      const inputArray = customInput
        .split(",")
        .map((num) => parseInt(num.trim(), 10)) // Parse each number
        .filter((num) => !isNaN(num)); // Remove invalid numbers
      setArray(inputArray.map((val) => ({ value: val, highlight: false }))); // Set parsed array
      setMetrics({ comparisons: 0, found: false }); // Reset metrics
      setSteps([]); // Clear steps
    } catch (error) {
      alert("Invalid input. Please enter a comma-separated list of numbers.");
    }
  };

  // Starts the linear search algorithm
  const startLinearSearch = async () => {
    if (isSearching || array.length === 0) return; // Prevent if already searching or array is empty
    setIsSearching(true); // Indicate search in progress
    let found = false; // Initialize found flag
    for (let i = 0; i < array.length; i++) {
      setMetrics((prev) => ({ ...prev, comparisons: prev.comparisons + 1 })); // Increment comparisons
      setArray((prevArray) =>
        prevArray.map((item, index) => ({ ...item, highlight: index === i })) // Highlight current element
      );
      setSteps((prevSteps) => [
        ...prevSteps,
        `Step ${i + 1}: Comparing target (${target}) with array[${i}] (${array[i].value}).`, // Log comparison step
      ]);
      await sleep(500); // Delay for visualization
      if (array[i].value === target) { // Check if current element matches target
        found = true;
        break;
      }
    }
    setMetrics((prev) => ({ ...prev, found })); // Update found status
    setIsSearching(false); // End search
  };

  return (
    <div className="linear-search-container">
      <h2>Linear Search Visualization</h2>

      {/* Array Visualization */}
      <div className="array-container">
        {array.map((bar, index) => (
          <div
            key={index}
            className={`array-bar ${bar.highlight ? "highlight" : ""}`}
            style={{ height: `${bar.value}%` }} // Visualize array values as bar heights
          >
            {bar.value}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={generateArray} disabled={isSearching}>Generate New Array</button>
        <button onClick={startLinearSearch} disabled={isSearching || array.length === 0}>Start Search</button>
      </div>

      {/* Custom Input */}
      <div className="custom-input">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="e.g., 12, 34, 56, ..."
          disabled={isSearching}
        />
        <button onClick={handleCustomInput} disabled={isSearching}>Set Array</button>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder="Target Value"
          disabled={isSearching}
        />
      </div>

      {/* Steps and Metrics */}
      <div className="metrics">
        <p>Total Comparisons: {metrics.comparisons}</p>
        <p>Target Found: {metrics.found ? "Yes" : "No"}</p>
      </div>

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
        <h3>Linear Search Explanation</h3>
        <p>
          Linear Search is the simplest searching algorithm. It iterates through
          each element of the array and compares it with the target value until
          a match is found or the array is fully traversed.
        </p>
        <p>Time Complexity: O(n)</p>
        <p>Space Complexity: O(1)</p>
      </div>

      {/* Code Snippet */}
      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Target found
    }
  }
  return -1; // Target not found
}
            `}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default LinearSearch;

