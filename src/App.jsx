import { Outlet } from "react-router-dom";
import FilmProvider from "./components/providers/FilmProvider";

function App() {
  return (
    <FilmProvider>
      <Outlet />
    </FilmProvider>
  );
}

export default App;
