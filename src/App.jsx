import { Outlet } from "react-router-dom";
import Inscription from "./pages/Auth/Inscription";
import Connexion from "./pages/Auth/Connexion";
import ThemeProvider from "./components/providers/ThemeProviders"; 

function App() {
  return <Outlet />;
}

export default App;