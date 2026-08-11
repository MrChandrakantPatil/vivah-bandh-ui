import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';
import App from '@/App.jsx';
import { RegistrationProvider } from '@/context/registration';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <RegistrationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RegistrationProvider>
  </StrictMode>,
);
