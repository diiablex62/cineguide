import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import AuthProvider from "./components/providers/AuthProvider";
import QuizzProvider from "./components/providers/QuizzProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QuizzProvider>
        <RouterProvider router={router}></RouterProvider>
      </QuizzProvider>
    </AuthProvider>
  </StrictMode>
);
