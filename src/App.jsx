import { Outlet } from "react-router-dom";
import FilmProvider from "./components/providers/FilmProvider";
import ThemeProvider from "./components/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <FilmProvider>
        <Outlet />
      </FilmProvider>
    </ThemeProvider>
  );
}

export default App;
