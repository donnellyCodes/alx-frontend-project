import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Welcome from './components/Welcome.jsx';
import Home from "./components/Home.jsx";
import BubbleSort from "./components/BubbleSort.jsx";
import SelectionSort from "./components/SelectionSort.jsx";
import InsertionSort from "./components/InsertionSort.jsx";
import MergeSort from "./components/MergeSort.jsx";
import QuickSort from "./components/QuickSort.jsx";
import './App.css';

function App() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="welcome" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bubble-sort" element={<BubbleSort />} />
          <Route path="/selection-sort" element={<SelectionSort />} />
          <Route path="/insertion-sort" element={<InsertionSort />} />
          <Route path="/merge-sort" element={<MergeSort />} />
          <Route path="/quick-sort" element={<QuickSort />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default App;
