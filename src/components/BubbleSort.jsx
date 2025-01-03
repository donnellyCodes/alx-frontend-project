import React, { useState, useEffect } from "react";
import "./BubbleSort.css";

const BubbleSort = () => {
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
    const randomArray =  Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
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

  // Bubble Sort logic (step-by-step)
  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    let swaps = 0;
    let comparisons = 0;
    const newHistory = [];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        comparisons++;
        setMetrics({ swaps, comparisons});

        //Highlight comparison
        setArray(arr.map((item, idx) => ({ ...item, highlight: idx === j || idx === j + 1, })));
        await sleep(speed);

        if (arr[j].value > arr[j + 1].value) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          newHistory.push([...arr]);
        }       
        setArray(arr.map((item) => ({ ...item, highlight: false })));
        await sleep(speed);
      }
    }
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
    <div className="bubble-sort-container">
      <h2>Bubble Sort Visualization</h2>

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
        <button onClick={bubbleSort} disabled={isSorting}>Start Sorting</button>
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
        <h3>Bubble Sort Explanation</h3>
        <p>
          Bubble Sort repeatedly compares adjacent elements and swaps them if
          they are in the wrong order. It has a time complexity of O(n²) in the
          worst and average cases.
        </p>
      </div>

      {/* Code Snippet */}
      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
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

export default BubbleSort;
