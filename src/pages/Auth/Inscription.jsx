import React from "react";

export default function Inscription() {
  return (
    <div className='flex h-screen'>
      {/* Section gauche */}
      <div className='flex-1 bg-fuchsia-700 text-white flex justify-center items-center px-10'>
        <h1 className='text-7xl font-light text-left w-4/5'>
          Toutes vos plateformes de streaming au même endroit
        </h1>
      </div>

      {/* Section droite */}
      <div className='flex-1 p-8 flex flex-col justify-center items-center'>
        <h2 className='text-center mb-4 text-xl font-bold'>S'INSCRIRE</h2>
        <form className='w-full max-w-md flex flex-col gap-4'>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='Prénom'
              className='flex-1 p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              placeholder='Nom'
              className='flex-1 p-2 border border-gray-300 rounded'
            />
          </div>
          <input
            type='email'
            placeholder='Email'
            className='p-2 border border-gray-300 rounded'
          />
          <input
            type='text'
            placeholder="Nom d'utilisateur"
            className='p-2 border border-gray-300 rounded'
          />
          <input
            type='password'
            placeholder='Mot de passe'
            className='p-2 border border-gray-300 rounded'
          />
          <input
            type='password'
            placeholder='Confirmez votre mot de passe'
            className='p-2 border border-gray-300 rounded'
          />
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='terms' />
            <label htmlFor='terms' className='text-sm'>
              En cochant cette case, vous acceptez les{" "}
              <a href='#' className='text-fuchsia-700'>
                conditions d'utilisations
              </a>{" "}
              du site.
            </label>
          </div>
          <button
            type='button'
            className='p-3 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-800'>
            S'inscrire
          </button>
          <button
            type='button'
            className='p-3 bg-white text-fuchsia-700 border border-fuchsia-700 rounded hover:bg-fuchsia-100'>
            Connexion avec Google
          </button>
        </form>
        <p className='text-center mt-4 text-sm'>
          Déjà inscrit ?{" "}
          <a href='#' className='text-fuchsia-700'>
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
