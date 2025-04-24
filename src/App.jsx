import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import LangageProvider from "./components/providers/LangageProvider";
import ThemeProvider from "./components/providers/ThemeProvider";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full dark:bg-black bg-white">
      <ThemeProvider>
        <LangageProvider>
          <Header />
          <Outlet />
        </LangageProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
