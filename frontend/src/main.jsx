import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import QuizzProvider from "./components/providers/QuizzProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizzProvider>
      <App />
    </QuizzProvider>
  </StrictMode>
);
