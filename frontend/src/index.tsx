import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { reportWebVitals } from 'reportWebVitals';
import { Routes } from 'routes';

const rootElement = document.querySelector('#root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);

reportWebVitals();
