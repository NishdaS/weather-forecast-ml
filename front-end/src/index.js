import React from 'react'; // Importing React library for creating components
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering the React app to the DOM
import './index.css'; // Importing the global styles (CSS file) for the app
import App from './App'; // Importing the main App component which holds the entire application
import reportWebVitals from './reportWebVitals'; // Importing the function to measure the performance of the app

// Creating a root element for the React app using ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
