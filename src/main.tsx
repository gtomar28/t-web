import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Drop the HTML boot shell once React has mounted (Preloader takes over).
// Kept outside #root so createRoot does not remove it mid-paint.
requestAnimationFrame(() => {
  document.getElementById('trevyk-boot')?.remove();
});
