import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import ThemeProvider from "./components/providers/ThemeProvider";
import MenuProvider from "./components/providers/MenuProvider";
import AuthProvider from "./components/providers/AuthProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import { HomeProvider } from "./components/providers/HomeProvider";
import ProfilProvider from "./components/providers/ProfilProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
import FilmProvider from "./components/providers/FilmProvider";
import { ActorProvider } from "./components/providers/ActorProvider";
import SerieProvider from "./components/providers/SerieProvider";
import { ActuProvider } from "./components/providers/ActuProvider";
import { LangageProvider } from "./components/providers/LangageProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const isAuthPage =
    [
      "/connexion",
      "/inscription",
      "/validation",
      "/forgotten-password",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password/");

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <ThemeProvider>
        <MenuProvider>
          <AuthProvider>
            <LangageProvider>
              <HomeProvider>
                <ProfilProvider>
                  <FilmProvider>
                    <SerieProvider>
                      <FiltreProvider>
                        <ActuProvider>
                          {" "}
                          <ActorProvider>
                            {!isAuthPage && <Header />}
                            <main
                              className={
                                !isAuthPage
                                  ? "min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white"
                                  : ""
                              }
                            >
                              <Outlet />
                            </main>
                            {!isAuthPage && <Footer />}
                            <ScrollRestoration />
                          </ActorProvider>
                        </ActuProvider>
                      </FiltreProvider>
                    </SerieProvider>
                  </FilmProvider>
                </ProfilProvider>
              </HomeProvider>
            </LangageProvider>
          </AuthProvider>
        </MenuProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
