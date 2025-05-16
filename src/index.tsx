import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App'; // App import 경로도 App.tsx로 인식될 것입니다.

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 