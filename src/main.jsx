import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'
import { NominaApp } from './NominaApp';
import 'jquery';
import 'datatables.net';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <NominaApp />
    </BrowserRouter>
  // </React.StrictMode>,
)
