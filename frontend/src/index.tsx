import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { reportWebVitals } from 'reportWebVitals';


import 'animate.css';
import 'styles/index.scss';

const rootElement = document.querySelector('#root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <b>Hello World</b>
  </React.StrictMode>
);

reportWebVitals();
