
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';
import { BankProvider } from './context/BankContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BankProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BankProvider>
  </React.StrictMode>
);
