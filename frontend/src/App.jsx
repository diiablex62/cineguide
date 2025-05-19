import React from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "./components/providers/ThemeProvider";
import MenuProvider from "./components/providers/MenuProvider";
import AuthProvider from "./components/providers/AuthProvider";
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
                          <ActorProvider>
                            <Header></Header>
                            <Outlet></Outlet>
                            <Footer></Footer>
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
