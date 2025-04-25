import { Outlet } from "react-router-dom";
import FilmProvider from "./components/providers/FilmProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
function App() {
  return (
    <ThemeProvider>
      <FiltreProvider>
        <FilmProvider>
          <Outlet />
        </FilmProvider>
      </FiltreProvider>
    </ThemeProvider>
  );
}

export default App;
