import { Outlet } from "react-router-dom";
import Inscription from "./pages/Auth/Inscription";
import Connexion from "./pages/Auth/Connexion";
import ThemeProvider from "./components/providers/ThemeProviders"; 
import Header from "./components/Header";
import LangageProvider from "./components/providers/LangageProvider";
import MenuProvider from "./components/providers/MenuProvider";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full dark:bg-black bg-white">
      <ThemeProvider>
        <MenuProvider>
          <LangageProvider>
            <Header />
            <Outlet />
          </LangageProvider>
        </MenuProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;