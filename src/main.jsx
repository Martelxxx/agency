import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Price from './Components/Pricing/price.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Price /> */}
  </React.StrictMode>,
)
