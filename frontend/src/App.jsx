import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ThemeProvider from "./components/providers/ThemeProvider";
import MenuProvider from "./components/providers/MenuProvider";
import AuthProvider from "./components/providers/AuthProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import PendingAccountNotification from "./components/providers/PendingAccountNotification";
import { HomeProvider } from "./components/providers/HomeProvider";
import ProfilProvider from "./components/providers/ProfilProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
import FilmProvider from "./components/providers/FilmProvider";
import { ActorProvider } from "./components/providers/ActorProvider";
import SerieProvider from "./components/providers/SerieProvider";
import { ActuProvider } from "./components/providers/ActuProvider";
import { LangageProvider } from "./components/providers/LangageProvider";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import "./Langue/i18n";
import ActeurProfil from "./pages/Acteurs/ActeurProfil";

import Home from "./pages/Home";
import FilmList from "./pages/Films/FilmList";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import SeriesList from "./pages/Series/SeriesList";
import Connexion from "./pages/Auth/Connexion";
import Inscription from "./pages/Auth/Inscription";
import Validation from "./pages/Auth/Validation";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgottenPassword from "./pages/Auth/ForgottenPassword";
import Profil from "./pages/Profil/Profil";
import ProfilActiviter from "./pages/Profil/ProfilActiviter";
import ProfilListe from "./pages/Profil/ProfilListe";
import ProfileReviews from "./pages/Profil/ProfileReviews";
import ActualitesPage from "./pages/Actualites/ActualitesPage";
import Jeux from "./pages/Jeux/Jeux";
import CGU from "./pages/Legal/CGU";
import CGV from "./pages/Legal/CGV";
import FAQ from "./pages/Legal/FAQ";
import MentionsLegales from "./pages/Legal/MentionsLegales";
import NotFound from "./pages/404";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalAbo from "./components/modal-abo/modalAbo";
import ActeurProfil from "./pages/Acteurs/ActeurProfil";

const AppContent = () => {
  const location = useLocation();
  const isAuthPage =
    [
      "/connexion",
      "/inscription",
      "/validation",
      "/forgotten-password",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password/");

  return (
    <>
      <PendingAccountNotification />
      {!isAuthPage && <Header />}
      <main
        className={`${
          !isAuthPage
            ? "min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white"
            : ""
        }`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/film' element={<FilmList />} />
          <Route path='/detailfilm/:id' element={<DetailFilm />} />
          <Route path='/series' element={<SeriesList />} />
          <Route path='/actualites' element={<ActualitesPage />} />
          <Route path='/jeux' element={<Jeux />} />

          {/* Route pour les acteurs */}
          <Route path='/acteurs/:id' element={<ActeurProfil />} />

          {/* Routes du profil protégées avec sous-routes */}
          <Route
            path='/profil'
            element={
              <UserConnected>
                <Profil />
              </UserConnected>
            }>
            <Route path='mon-activiter' element={<ProfilActiviter />} />
            <Route path='ma-liste' element={<ProfilListe />} />
            <Route path='mes-reviews' element={<ProfileReviews />} />
          </Route>

          <Route
            path='/connexion'
            element={
              <UserNotConnected>
                <Connexion />
              </UserNotConnected>
            }
          />
          <Route
            path='/inscription'
            element={
              <UserNotConnected>
                <Inscription />
              </UserNotConnected>
            }
          />
          <Route path='/validation' element={<Validation />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/forgotten-password' element={<ForgottenPassword />} />
          <Route path='/cgu' element={<CGU />} />
          <Route path='/cgv' element={<CGV />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/mentionsLegales' element={<MentionsLegales />} />
          <Route
            path='/abonnement'
            element={
              <UserConnected>
                <ModalAbo />
              </UserConnected>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

function App() {
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
                            <div className='min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white'>
                              <AppContent />
                            </div>
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
