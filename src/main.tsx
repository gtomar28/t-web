import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ensureEntryLogoPreload } from './utils/entryLogoPreload';

ensureEntryLogoPreload();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
// #trevyk-boot stays until App hands off to the cinematic preloader or reveals the page.
