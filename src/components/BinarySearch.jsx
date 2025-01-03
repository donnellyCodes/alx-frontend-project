import React, { useState } from "react";
import "./BinarySearch.css";

const BinarySearch = () => {
  const [array, setArray] = useState([]); // State for the sorted array to be visualized
  const [target, setTarget] = useState(0); // State for the target value to search for
  const [isSearching, setIsSearching] = useState(false); // State to indicate if the search is in progress
  const [metrics, setMetrics] = useState({ comparisons: 0, found: false }); // State for tracking metrics like comparisons and search result
  const [steps, setSteps] = useState([]); // State to record the steps of the search process
  const [customInput, setCustomInput] = useState(""); // State for custom input array values

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Utility function to create delays

  // Generates a sorted random array of numbers between 0 and 100
  const generateArray = () => {
    if (isSearching) return; // Prevent changes if a search is ongoing
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
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
        .filter((num) => !isNaN(num))
        .sort((a, b) => a - b); // Sort the array
      setArray(inputArray.map((val) => ({ value: val, highlight: false }))); // Set parsed array
      setMetrics({ comparisons: 0, found: false }); // Reset metrics
      setSteps([]); // Clear steps
    } catch (error) {
      alert("Invalid input. Please enter a comma-separated list of numbers.");
    }
  };

  // Starts the binary search algorithm
  const startBinarySearch = async () => {
    if (isSearching || array.length === 0) return; // Prevent if already searching or array is empty
    setIsSearching(true); // Indicate search in progress

    let left = 0;
    let right = array.length - 1;
    let found = false; // Initialize found flag

    while (left <= right) {
      const mid = Math.floor((left + right) / 2); // Calculate middle index

      setMetrics((prev) => ({ ...prev, comparisons: prev.comparisons + 1 })); // Increment comparisons
      setArray((prevArray) =>
        prevArray.map((item, index) => ({
          ...item,
          highlight: index === mid, // Highlight middle element
        }))
      );
      setSteps((prevSteps) => [
        ...prevSteps,
        `Step: Comparing target (${target}) with array[${mid}] (${array[mid].value}).`,
      ]);
      await sleep(500); // Delay for visualization

      if (array[mid].value === target) { // Check if middle element matches target
        found = true;
        break;
      } else if (array[mid].value < target) {
        left = mid + 1; // Discard left half
      } else {
        right = mid - 1; // Discard right half
      }
    }

    setMetrics((prev) => ({ ...prev, found })); // Update found status
    setIsSearching(false); // End search
  };

  return (
    <div className="binary-search-container">
      <h2>Binary Search Visualization</h2>

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
        <button onClick={startBinarySearch} disabled={isSearching || array.length === 0}>Start Search</button>
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
        <h3>Binary Search Explanation</h3>
        <p>
          Binary Search is an efficient searching algorithm that works on sorted arrays. It repeatedly divides the search range
          in half until the target value is found or the range is empty.
        </p>
        <p>Time Complexity: O(log n)</p>
        <p>Space Complexity: O(1)</p>
      </div>

      {/* Code Snippet */}
      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid; // Target found
    } else if (array[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
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

export default BinarySearch;

