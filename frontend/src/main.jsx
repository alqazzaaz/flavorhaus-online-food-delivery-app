import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StoreContextProvider } from './context/StoreContext.jsx';
import "./i18n";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
     <App />
  </StoreContextProvider>
    
  </BrowserRouter>
)
