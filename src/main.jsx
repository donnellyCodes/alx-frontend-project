import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated to use createRoot
root.render(
  <Router>
    <App />
  </Router>
);