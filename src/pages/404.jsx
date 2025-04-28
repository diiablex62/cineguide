import React from "react";
import { Link } from "react-router-dom";
import astroImage from "../assets/astro.webp";

export default function NotFound() {
  return (
    <div
      className='relative flex items-center min-h-screen bg-black text-white overflow-hidden'
      style={{
        backgroundImage: `url(${astroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className='absolute inset-0  bg-opacity-50'></div>

      {/* Contenu du texte sur la partie droite */}
      <div className='relative z-10 w-1/2 ml-auto text-left px-12'>
        <h1 className='text-5xl font-bold mb-6'>Vous vous êtes égaré ?</h1>
        <p className='text-lg mb-8'>
          Désolé, nous n'avons pas trouvé cette page. Vous trouverez d'autres
          films et séries à explorer sur la page d'accueil.
        </p>
        <Link
          to='/'
          className='px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200'>
          Accueil Cineguide
        </Link>
      </div>
    </div>
  );
}
