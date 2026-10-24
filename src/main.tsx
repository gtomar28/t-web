import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { dismissTrevykBoot } from './utils/heroVideoPreload';
/** Stale lazy chunks after HMR often cause an empty Suspense shell until a full reload. */
if (import.meta.hot) {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/** Boot HTML is for pre-React flash only — must not sit above the app (was blocking the whole UI). */
queueMicrotask(() => dismissTrevykBoot());
