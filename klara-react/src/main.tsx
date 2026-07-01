import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './style.css';

const el = document.getElementById('app');
if (!el) {
  throw new Error('Missing #app element in index.html');
}

ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

