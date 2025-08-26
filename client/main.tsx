import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;

// Global reference to prevent multiple root creation during HMR
declare global {
  interface Window {
    __REACT_ROOT__?: ReturnType<typeof createRoot>;
  }
}

if (!window.__REACT_ROOT__) {
  window.__REACT_ROOT__ = createRoot(container);
}

window.__REACT_ROOT__.render(<App />);
