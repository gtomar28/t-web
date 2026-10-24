import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.DEV) {
  document.documentElement.classList.add("trevyk-app-ready");
}

if (import.meta.hot) {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

queueMicrotask(() => {
  document.getElementById("trevyk-boot")?.remove();
});
