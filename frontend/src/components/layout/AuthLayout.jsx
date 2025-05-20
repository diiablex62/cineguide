// Layout spécifique pour les pages d'authentification sans header ni footer

import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "../providers/ThemeProvider";
import AuthProvider from "../providers/AuthProvider";

function AuthLayout() {
  console.log("Rendu de AuthLayout");
  return (
    <div className='min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white'>
      <ThemeProvider>
        <AuthProvider>
          <main>
            <Outlet />
          </main>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default AuthLayout;
