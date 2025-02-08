/**
 * Application Entry Point
 * This is the main entry file for the React application.
 * It sets up:
 * - React 18's createRoot API for concurrent rendering
 * - Strict Mode for highlighting potential problems
 * - Performance monitoring through Web Vitals
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root container for concurrent rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  // Enable Strict Mode for:
  // - Identifying unsafe lifecycles
  // - Warning about legacy string ref API usage
  // - Detecting unexpected side effects
  // - Ensuring reusable state
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Web Vitals Performance Monitoring
 * Measures key metrics for user experience:
 * - First Contentful Paint (FCP)
 * - Largest Contentful Paint (LCP)
 * - First Input Delay (FID)
 * - Cumulative Layout Shift (CLS)
 * 
 * Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
