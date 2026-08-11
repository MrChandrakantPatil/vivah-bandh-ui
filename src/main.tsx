import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';
import App from '@/App.jsx';
import { RegisterProvider } from '@/context/register';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <RegisterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RegisterProvider>
  </StrictMode>,
);
