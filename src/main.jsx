import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../styles.css';
import '../pricing.css';
import './suite-pages.css';
import './experience.css';
import './recommendations.css';
import './solutions-reference.css';
import './platform-reference.css';
import './growth-cloud-reference.css';
import './sales-cloud-reference.css';
import './revenue-performance-reference.css';
import './intelligence-reference.css';
import './industries-reference.css';
import './resources-reference.css';
import './contact-reference.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
