import React, { useState, useEffect } from "react";
import "./QuickSort.css";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0 });
  const [customInput, setCustomInput] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    if (isSorting) return;
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray.map((value) => ({ value, highlight: false })));
    setMetrics({ comparisons: 0, swaps: 0 });
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
      setMetrics({ comparisons: 0, swaps: 0 });
    } catch (error) {
      alert("Invalid input. Please enter a comma-separated list of numbers.");
    }
  };

  const quickSort = async (arr, start, end) => {
    if (start >= end) return;

    const pivotIndex = await partition(arr, start, end);
    await quickSort(arr, start, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, end);
  };

  const partition = async (arr, start, end) => {
    const pivotValue = arr[end].value;
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      metrics.comparisons++;
      setMetrics({ ...metrics });

      if (arr[i].value < pivotValue) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        metrics.swaps++;
        pivotIndex++;
      }

      setArray([...arr.map((bar, idx) => ({ ...bar, highlight: idx === i || idx === pivotIndex }))]);
      await sleep(speed);
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    metrics.swaps++;
    setArray([...arr.map((bar) => ({ ...bar, highlight: false }))]);
    await sleep(speed);

    return pivotIndex;
  };

  const startQuickSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arrCopy = [...array];
    await quickSort(arrCopy, 0, arrCopy.length - 1);
    setArray(arrCopy.map((bar) => ({ ...bar, highlight: false })));
    setIsSorting(false);
  };

  return (
    <div className="quick-sort-container">
      <h2>Quick Sort Visualization</h2>

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
        <button onClick={startQuickSort} disabled={isSorting}>Start Sorting</button>
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
        <p>Comparisons: {metrics.comparisons}</p>
        <p>Swaps: {metrics.swaps}</p>
      </div>

      <div className="explanation">
        <h3>Quick Sort Explanation</h3>
        <p>
          Quick Sort uses a divide-and-conquer approach by selecting a pivot element 
          and partitioning the array into two halves: one with elements less than the pivot 
          and one with elements greater than the pivot. It has a time complexity of O(n log n) 
          on average and O(n²) in the worst case.
        </p>
      </div>

      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  const pivotIndex = partition(arr, start, end);
  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
}

function partition(arr, start, end) {
  const pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
    }
  }

  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}
            `}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default QuickSort;

