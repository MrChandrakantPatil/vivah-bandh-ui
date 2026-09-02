import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/app/style.css';
import App from '@/app/App.js';
import { RegistrationProvider } from '@/context/registration';
import { AuthProvider } from './features/auth';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RegistrationProvider>
          <App />
        </RegistrationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
