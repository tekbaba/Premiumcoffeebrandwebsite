
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { initWebVitals } from "./lib/observability";

  initWebVitals();
  createRoot(document.getElementById("root")!).render(<App />);
  