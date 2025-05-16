import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ThemeProvider from "./components/providers/ThemeProvider";
import MenuProvider from "./components/providers/MenuProvider";
import AuthProvider from "./components/providers/AuthProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import PendingAccountNotification from "./components/providers/PendingAccountNotification";
import { LangageProvider } from "./components/providers/LangageProvider";
import { HomeProvider } from "./components/providers/HomeProvider";
import ProfilProvider from "./components/providers/ProfilProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
import FilmProvider from "./components/providers/FilmProvider";
import { ActorProvider } from "./components/providers/ActorProvider";
import SerieProvider from "./components/providers/SerieProvider";
import { ActuProvider } from "./components/providers/ActuProvider";
import "./Langue/i18n";

// Import des composants avec lazy loading
const Home = lazy(() => import("./pages/Home"));
const Films = lazy(() => import("./pages/Films/FilmList"));
const DetailFilm = lazy(() => import("./pages/DetailFilm/DetailFilm"));
const Series = lazy(() => import("./pages/Series/SeriesList"));
const Connexion = lazy(() => import("./pages/Auth/Connexion"));
const Inscription = lazy(() => import("./pages/Auth/Inscription"));
const Validation = lazy(() => import("./pages/Auth/Validation"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const Profil = lazy(() => import("./pages/Profil/Profil"));
const Actualites = lazy(() => import("./pages/Actualites/ActualitesPage"));
const Jeux = lazy(() => import("./pages/Jeux/Jeux"));
const CGU = lazy(() => import("./pages/Legal/CGU"));
const CGV = lazy(() => import("./pages/Legal/CGV"));
const FAQ = lazy(() => import("./pages/Legal/FAQ"));
const MentionsLegales = lazy(() => import("./pages/Legal/MentionsLegales"));
const NotFound = lazy(() => import("./pages/404"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));

const AppContent = () => {
  const location = useLocation();
  const isAuthPage =
    ["/connexion", "/inscription", "/validation"].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password/");

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
            <Route path='/actualites' element={<Actualites />} />
            <Route path='/jeux' element={<Jeux />} />
            <Route path='/profil' element={<Profil />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/validation' element={<Validation />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/cgu' element={<CGU />} />
            <Route path='/cgv' element={<CGV />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/mentionsLegales' element={<MentionsLegales />} />
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
              <ProfilProvider>
                <FilmProvider>
                  <SerieProvider>
                    <FiltreProvider>
                      <ActuProvider>
                        <BrowserRouter>
                          <ActorProvider>
                            <AppContent />
                          </ActorProvider>
                        </BrowserRouter>
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
  );
}

export default App;
