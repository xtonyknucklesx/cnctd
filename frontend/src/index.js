// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: If you have global styles
import App from './App';  // Import the main App component

// Renders the App component into the div with id 'root' (from public/index.html)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);