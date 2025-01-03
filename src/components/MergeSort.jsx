import React, { useState, useEffect } from "react";
import "./MergeSort.css";

const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [metrics, setMetrics] = useState({ merges: 0, comparisons: 0 });
  const [history, setHistory] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [mergeSteps, setMergeSteps] = useState([]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    if (isSorting) return;
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray.map((value) => ({ value, highlight: false })));
    setMetrics({ merges: 0, comparisons: 0 });
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
      setArray(inputArray.map((value) => ({ value, highlight: false })));
      setMetrics({ merges: 0, comparisons: 0 });
      setMergeSteps([]);
    } catch (error) {
      alert("Invalid input. Please enter a comma-separated list of numbers.");
    }
  };

  const mergeSort = async (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return; //Base case

    const middle = Math.floor((left + right) / 2);

    await mergeSort(arr, left, middle);
    await startMergeSort(arr, middle + 1, right);

    await merge(arr, left, middle, right);
    };

    const merge = async (arr, left,middle, right) => {
        const leftArray = arr.slice(left, middle + 1);
        const rightArray = arr.slice(middle + 1, right + 1);
        let i = 0;
        let j = 0;
        let k = left;

        while (l < leftArray.length && j < rightArray.length) {
            // Increment comparisons
            metrics.comparisons++;
            setMetrics({ ...metrics });

            if (leftArray[i].value <= rightArray[j].value) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }

            // Highlight the merging process
            setArray([...arr]);
            await sleep(speed);
            k++;
        }

        // Push remaining elements from the left and right arrays
        while (i < leftArray.length) {
            arr[k] = leftArray[i];
            i++;
            k++;
            setArray([...arr]);
            await sleep(speed);
        }

        while (j < rightArray.length) {
            arr[k] = rightArray[j];
            j++;
            k++;
            setArray([...arr]);
            await sleep(speed);
        }

        // Increment merge count and reset highlights
        metrics.merges++;
        setMetrics({ ...metrics });

        setMergeSteps((prevSteps) => [
            ...prevSteps,
            { left: leftArray, right: rightArray, merged: arr.slice(left, right + 1) },
        ]);
    };

    const startMergeSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        const tempArray = [...array]
        await mergeSort(tempArray);
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
    <div className="merge-sort-container">
      <h2>Merge Sort Visualization</h2>
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

      <div className="controls">
        <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={startMergeSort} disabled={isSorting}>Start Sorting</button>
        <button onClick={replaySorting} disabled={isSorting || history.length === 0}>Replay Sorting</button>
      </div>

      {/* Merge Tree Visualization */}
      <div>
        <h3>Merge Tree (Steps)</h3>
        {mergeSteps.map((step, index) => (
            <div key={index} className="merge-step">
                <div>Left: [{step.left.map((item) => item.value).join(", ")}]</div>
                <div>Right: [{step.right.map((item) => item.value).join(", ")}]</div>
                <div>Merged: [{step.merged.map((item) => item.value).join(", ")}]</div>
            </div>
        ))}
      </div>

      {/* Speed Control */}
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

      {/* Metrics */}
      <div className="metrics">
        <p>Merges: {metrics.merges}</p>
        <p>Comparisons: {metrics.comparisons}</p>
      </div>

      <div className="explanation">
        <h3>Merge Sort Explanation</h3>
        <p>
          Merge Sort is a divide-and-conquer algorithm that splits the array into halves, 
          recursively sorts them, and then merges the sorted halves. It has a time complexity 
          of O(n log n) in all cases.
        </p>
      </div>

      <div className="code-snippet">
        <h3>Code Snippet (JavaScript)</h3>
        <pre>
          <code>
            {`
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let l = 0, r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] <= right[r]) result.push(left[l++]);
    else result.push(right[r++]);
  }

  return result.concat(left.slice(l)).concat(right.slice(r));
}
            `}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default MergeSort;

