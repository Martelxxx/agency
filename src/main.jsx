import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Price from './Components/Pricing/price.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    {/* <Price /> */}
    </BrowserRouter>
  </React.StrictMode>,
    document.getElementById('root')
)
