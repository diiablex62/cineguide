import { Outlet } from "react-router-dom";
import Inscription from "./pages/Auth/Inscription";
import Connexion from "./pages/Auth/Connexion";
import FilmProvider from "./components/providers/FilmProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
import Header from "./components/Header";
import LangageProvider from "./components/providers/LangageProvider";
import MenuProvider from "./components/providers/MenuProvider";
import ActorProvider from "./components/providers/ActorProvider";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full dark:bg-black bg-white">
      <ThemeProvider>
        <MenuProvider>
          <FiltreProvider>
            <ActorProvider>
              <FilmProvider>
                <LangageProvider>
                  <Header />
                  <Outlet />
                </LangageProvider>
              </FilmProvider>
            </ActorProvider>
          </FiltreProvider>
        </MenuProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
