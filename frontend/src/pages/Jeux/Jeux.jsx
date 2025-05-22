import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const Jeux = () => {
  const location = useLocation();
  const isAccueil = location.pathname === "/jeux";

  return (
    <div className='flex flex-col lg:flex-row mb-5 lg:justify-between container w-full rounded min-h-screen text-black bg-gray-300 rounded-l p-5'>
      <div className='w-full lg:w-2/8 bg-white mt-5 shadow rounded lg:rounded-l-xl lg:mr-2'>
        <Navbar />
      </div>
      <div className='w-full lg:w-6/8 lg:flex lg:flex-col text-black lg:items-center px-10 bg-white mt-5 shadow rounded lg:rounded-r-xl h-auto flex items-center justify-center'>
        {isAccueil ? (
          <div className='w-full h-full px-10 py-8'>
            <h1 className='text-3xl font-bold mb-4'>
              Bienvenue sur Cineguide Jeux !
            </h1>
            <p className='text-lg'>
              Choisissez un jeu dans le menu à gauche pour commencer à jouer.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Jeux;
