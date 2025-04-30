import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import astroImage from "../assets/astro.webp";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
      <div
        className='relative z-10 w-full md:w-1/2 ml-auto text-center md:text-left px-6 md:px-12'
        style={{
          paddingTop: "20%",
          paddingBottom: "20%",
        }}>
        <h1 className='text-4xl md:text-5xl font-bold mb-6'>
          Vous vous êtes égaré ?
        </h1>
        <p className='text-base md:text-lg mb-8'>
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
