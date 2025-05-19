import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import QuizzProvider from "./components/providers/QuizzProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizzProvider>
      <RouterProvider router={router}></RouterProvider>
    </QuizzProvider>
  </StrictMode>
);
