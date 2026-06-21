import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { RegisterProvider } from './context/RegisterProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RegisterProvider>
  </StrictMode>,
)
