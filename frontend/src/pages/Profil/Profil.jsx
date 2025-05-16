import React, { useContext, useState } from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import ProfilNav from "./components/ProfilNav";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Profil() {
  const location = useLocation();
  const { t } = useTranslation();
  const isMainProfile = location.pathname === "/profil";

  console.log("Profil component rendered. Path:", location.pathname);

  return (
    <div className='flex flex-col dark:bg-black dark:text-white dark:border-white'>
      {isMainProfile ? (
        // Layout pour la page principale du profil avec formulaire et aside
        <div className='flex flex-col md:flex-row px-6 pt-6 pb-6'>
          {/* Colonne gauche avec entête et formulaire */}
          <div className='w-full md:w-2/3 md:pr-8'>
            {/* Entête avec photo et info utilisateur */}
            <div className='mb-6'>
              <ProfilNav />
            </div>

            {/* Formulaire de profil */}
            <ProfilForm />
          </div>

          {/* Colonne droite avec informations de compte */}
          <div className='w-full md:w-1/3'>
            <ProfilUtils />
          </div>
        </div>
      ) : (
        // Pour les onglets comme "Mon activité", "Ma liste", "Mes reviews"
        <div className='px-6 pb-6'>
          {/* Entête pour les autres onglets */}
          <div className='mb-6 pt-6'>
            <ProfilNav />
          </div>

          <Outlet />
        </div>
      )}
    </div>
  );
}
