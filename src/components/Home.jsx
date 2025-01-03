import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [showSorting, setShowSorting] = useState(false);
  const [showSearching, setShowSearching] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="home-page">
      <section className="algorithms"></section>
        <h2>Algorithms</h2>
        <div className="category">
          <button onClick={() => setShowSorting(!showSorting)}>
            Sorting Algorithms
          </button>
          {showSorting && (
            <div className="examples">
              <a href="/bubble-sort">Bubble Sort</a>
              <a href="/selection-sort">Selection Sort</a>
              <a href="/insertion-sort">Insertion Sort</a>
              <a href="/merge-sort">Merge Sort</a>
              <a href="/quick-sort">Quick Sort</a>
            </div>
          )}
        </div>
        <div className="category">
          <button onClick={() => setShowSearching(!showSearching)}>
            Searching Algorithms
          </button>
          {showSearching && (
            <div className="examples">
              <a href="/linear-search">Linear Search</a>
              <a href="/binary-search">Binary Search</a>
            </div>
          )}
        </div>
        <div className="category">
          <button onClick={() => setShowGraph(!showGraph)}>
            Graph Algorithms
          </button>
          {showGraph && (
            <div className="examples">
              <a href="/dfs">Depth First Search</a>
              <a href="/bfs">Breadth First Search</a>
              <a href="/dijkstra">Dijkstra's Algorithm</a>
              <a href="/a-star">A* Search</a>
            </div>
          )}
        </div>
    </div>
  );
}

export default Home;
