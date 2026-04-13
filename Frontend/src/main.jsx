import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// 👇 FIX 1: Routing ke liye yeh zaroori hai
import { BrowserRouter } from 'react-router-dom'; 

// Global CSS files: yeh zaroori hai
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 

// Toastify (Notifications) ke liye zaroori imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 FIX 2: App component ko iske andar wrap karna anivarya hai */}
    <BrowserRouter> 
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </React.StrictMode>,
);