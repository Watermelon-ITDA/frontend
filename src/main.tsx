import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './apis/core/interceptor.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
