import React from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import ProfilNav from "./components/ProfilNav";
import { Outlet, useLocation } from "react-router-dom";

export default function Profil() {
  const location = useLocation();
  const isMainProfile = location.pathname === "/profil";

  return (
    <div className='flex flex-col min-h-screen dark:bg-black dark:text-white'>
      <div className='flex flex-col md:flex-row px-6 pt-10 pb-6 gap-8'>
        {/* Colonne gauche */}
        <div className={isMainProfile ? "w-full md:w-2/3 md:pr-8" : "w-full"}>
          <div className='mb-8'>
            <ProfilNav />
          </div>
          {isMainProfile ? <ProfilForm /> : <Outlet />}
        </div>
        {/* Colonne droite : visible uniquement sur Mon profil */}
        {isMainProfile && (
          <div className='w-full md:w-1/3 flex flex-col gap-6'>
            <ProfilUtils />
          </div>
        )}
      </div>
    </div>
  );
}
