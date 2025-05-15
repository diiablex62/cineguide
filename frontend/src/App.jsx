import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ThemeProvider from "./components/providers/ThemeProvider";
import MenuProvider from "./components/providers/MenuProvider";
import AuthProvider from "./components/providers/AuthProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import PendingAccountNotification from "./components/providers/PendingAccountNotification";
import { LangageProvider } from "./components/providers/LangageProvider";
import { HomeProvider } from "./components/providers/HomeProvider";
import "./Langue/i18n";

// Import des composants avec lazy loading
const Home = lazy(() => import("./pages/Home"));
const Films = lazy(() => import("./pages/Films/FilmList"));
const DetailFilm = lazy(() => import("./pages/DetailFilm/DetailFilm"));
const Series = lazy(() => import("./pages/Series/SeriesList"));
const Connexion = lazy(() => import("./pages/Auth/Connexion"));
const Inscription = lazy(() => import("./pages/Auth/Inscription"));
const Validation = lazy(() => import("./pages/Auth/Validation"));
const Profil = lazy(() => import("./pages/Profil/Profil"));
const NotFound = lazy(() => import("./pages/404"));

// Import des composants d'interface utilisateur communs
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));

// Wrapper pour conditionner l'affichage du Header et Footer
const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ["/connexion", "/inscription", "/validation"].includes(
    location.pathname
  );

  console.log("Current path:", location.pathname, "isAuthPage:", isAuthPage);

  return (
    <>
      <PendingAccountNotification />
      <Suspense fallback={<LoadingSpinner />}>
        {!isAuthPage && <Header />}
        <main className={`${!isAuthPage ? "min-h-screen" : ""}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/film' element={<Films />} />
            <Route path='/detailfilm/:id' element={<DetailFilm />} />
            <Route path='/series' element={<Series />} />
            <Route path='/profil' element={<Profil />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/validation' element={<Validation />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </Suspense>
    </>
  );
};

function App() {
  console.log("App component rendered");
  return (
    <ThemeProvider>
      <MenuProvider>
        <AuthProvider>
          <LangageProvider>
            <HomeProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </HomeProvider>
          </LangageProvider>
        </AuthProvider>
      </MenuProvider>
    </ThemeProvider>
  );
}

export default App;
