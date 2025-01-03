import React, { useState, useEffect } from "react";
import "./InsertionSort.css";

const InsertionSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [metrics, setMetrics] = useState({ swaps: 0, comparisons: 0 });
  const [history, setHistory] = useState([]);
  const [customInput, setCustomInput] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    if (isSorting) return;
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray.map((value) => ({ value, highlight: false })));
    setMetrics({ swaps: 0, comparisons: 0 });
    setHistory([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

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

  const insertionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    let swaps = 0;
    let comparisons = 0;
    const newHistory = [];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j].value > key.value) {
        comparisons++;
        setMetrics({ swaps, comparisons });

        arr[j + 1] = arr[j];
        j--;

        setArray(arr.map((item, idx) => ({
          ...item,
          highlight: idx === j + 1 || idx === i,
        })));
        await sleep(speed);
      }

      arr[j + 1] = key;
      swaps++;
      newHistory.push([...arr]);

      setArray(arr.map((item) => ({ ...item, highlight: false })));
      await sleep(speed);
    }

    setMetrics({ swaps, comparisons });
    setHistory(newHistory);
    setIsSorting(false);
  };

  const replaySorting = async () => {
    if (isSorting || history.length === 0) return;
    for (let step of history) {
      setArray(step.map((val) => ({ value: val, highlight: false })));
      await sleep(speed);
    }
  };

  return (
    <div className="insertion-sort-container">
      <h2>Insertion Sort Visualization</h2>

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

      <div className="controls">
        <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={insertionSort} disabled={isSorting}>Start Sorting</button>
        <button onClick={replaySorting} disabled={isSorting || history.length === 0}>Replay Sorting</button>
      </div>

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

      <div className="metrics">
        <p>Swaps: {metrics.swaps}</p>
        <p>Comparisons: {metrics.comparisons}</p>
      </div>

      <div className="explanation">
        <h3>Insertion Sort Explanation</h3>
        <p>
          Insertion Sort builds the sorted array one element at a time by
          comparing each new element to the already sorted elements and
          inserting it in the correct position. It has a time complexity
          of O(n²) for average and worst cases but is efficient for nearly sorted data.
        </p>
      </div>

      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
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

export default InsertionSort;

