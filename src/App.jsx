import { Outlet } from "react-router-dom";
import Inscription from "./pages/Auth/Inscription";
import Connexion from "./pages/Auth/Connexion";
import FilmProvider from "./components/providers/FilmProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
import Header from "./components/Header";
import LangageProvider from "./components/providers/LangageProvider";
import MenuProvider from "./components/providers/MenuProvider";
import SerieProvider from "./components/providers/SerieProvider";
import ActorProvider from "./components/providers/ActorProvider";
import ProfilProvider from "./components/providers/ProfilProvider";
import CommentProvider from "./components/providers/CommentProvider";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full dark:bg-black bg-white">
      <ThemeProvider>
        <MenuProvider>
          <FiltreProvider>
            <ProfilProvider>
              <ActorProvider>
                <FilmProvider>
                  <SerieProvider>
                    <LangageProvider>
                      <CommentProvider>
                      <Header />
                      <Outlet />
                      <Footer></Footer>
                      </CommentProvider>
                    </LangageProvider>
                  </SerieProvider>
                </FilmProvider>
              </ActorProvider>
            </ProfilProvider>
          </FiltreProvider>
        </MenuProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
