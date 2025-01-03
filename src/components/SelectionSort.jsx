import React, { useState, useEffect } from "react";
import "./SelectionSort.css";

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500); // Animation speed in ms
  const [metrics, setMetrics] = useState({ swaps: 0, comparisons: 0 });
  const [history, setHistory] = useState([]);
  const [customInput, setCustomInput] = useState("");

  // Utility function for delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Generate random array
  const generateArray = () => {
    if (isSorting) return;
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray.map((value) => ({ value, highlight: false })));
    setMetrics({ swaps: 0, comparisons: 0 });
    setHistory([]);
  };

  useEffect(() => {
    generateArray(); // Generate array on component mount
  }, []);

  // Handle custom input
  const handleCustomInput = () => {
    if (isSorting) return;
    try {
      const inputArray = customInput
        .split(",")
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !isNaN(num));
      setArray(inputArray.map((val) => ({ value: val, highlight: false })));
      setMetrics({ swaps: 0, comparisons: 0 });
      setHistory([]);
    } catch (error) {
      alert("Invalid input. Please enter a comma-separated list of numbers.");
    }
  };

  // Selection Sort logic
  const selectionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    let swaps = 0;
    let comparisons = 0;
    const newHistory = [];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;

      // Highlight the current position and the minimum
      setArray(arr.map((item, idx) => ({
        ...item,
        highlight: idx === i || idx === minIndex,
      })));
      await sleep(speed);

      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        setMetrics({ swaps, comparisons });

        // Highlight the current position being compared
        setArray(arr.map((item, idx) => ({
          ...item,
          highlight: idx === i || idx === minIndex || idx === j,
        })));
        await sleep(speed);

        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;

          // Highlight the new minimum
          setArray(arr.map((item, idx) => ({
            ...item,
            highlight: idx === i || idx === minIndex,
          })));
          await sleep(speed);
        }
      }

      if (minIndex !== i) {
        // Swap the minimum element with the current element
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        swaps++;
        newHistory.push([...arr]);

        // Show the array after the swap
        setArray(arr.map((item) => ({ ...item, highlight: false })));
        await sleep(speed);
      }
    }

    // Final state after sorting
    setArray(arr.map((item) => ({ ...item, highlight: false })));
    setMetrics({ swaps, comparisons });
    setHistory(newHistory);
    setIsSorting(false);
  };

  // Replay sorting
  const replaySorting = async () => {
    if (isSorting || history.length === 0) return;
    for (let step of history) {
      setArray(step.map((val) => ({ value: val, highlight: false })));
      await sleep(speed);
    }
  };

  return (
    <div className="selection-sort-container">
      <h2>Selection Sort Visualization</h2>

      {/* Array Visualization */}
      <div className="array-container">
        {array.map((bar, index) => (
          <div
            key={index}
            className={`array-bar ${bar.highlight ? "highlight" : ""}`}
            style={{ height: `${bar.value}%` }}
          >
            {bar.value}
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="controls">
        <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={selectionSort} disabled={isSorting}>Start Sorting</button>
        <button onClick={replaySorting} disabled={isSorting || history.length === 0}>Replay Sorting</button>
      </div>

      {/* Speed Slider */}
      <div className="speed-control">
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
        />
        <span>{speed} ms</span>
      </div>

      {/* Custom Input */}
      <div className="custom-input">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="eg. 12, 13, 14, ..."
          disabled={isSorting}
        />
        <button onClick={handleCustomInput} disabled={isSorting}>Set Array</button>
      </div>

      {/* Metrics */}
      <div className="metrics">
        <p>Swaps: {metrics.swaps}</p>
        <p>Comparisons: {metrics.comparisons}</p>
      </div>

      {/* Explanation */}
      <div className="explanation">
        <h3>Selection Sort Explanation</h3>
        <p>
          Selection Sort repeatedly finds the minimum element from the unsorted
          part of the array and places it at the beginning. It has a time complexity
          of O(n²) in the worst, average, and best cases.
        </p>
      </div>

      {/* Code Snippet */}
      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
            `}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default SelectionSort;

