import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import interceptors from './Utils/Interceptors';
import Layout from './Components/Layout/Layout';

interceptors.create();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Layout/>
  </BrowserRouter>
);
     
reportWebVitals();
