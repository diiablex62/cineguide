import React from "react";

export default function Inscription() {
  return (
    <div className='flex h-screen'>
      {/* Section gauche */}
      <div className='flex-1 bg-[var(--color-fuchsia)] text-white flex justify-center items-center px-10'>
        <h1 className='text-7xl font-light text-left w-4/5'>
          Toutes vos plateformes de streaming au même endroit
        </h1>
      </div>

      {/* Section droite */}
      <div className='flex-1 p-8 flex flex-col justify-center items-center'>
        {/* Logo et retour */}
        <div className='w-full max-w-md mb-6'>
          <img
            src='/src/assets/logo.png'
            alt='CineGuide'
            className='h-12 mx-auto'
          />
          <a href='/' className='text-sm text-gray-500 hover:underline'>
            &lt; Retour vers la page d'accueil
          </a>
        </div>

        <h2 className='text-center mb-4 text-2xl font-bold'>S'INSCRIRE</h2>
        <form className='w-full max-w-md flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label
                htmlFor='prenom'
                className='block text-sm font-medium text-gray-700'>
                Prénom
              </label>
              <input
                id='prenom'
                type='text'
                placeholder='Prénom'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
              />
            </div>
            <div className='flex-1'>
              <label
                htmlFor='nom'
                className='block text-sm font-medium text-gray-700'>
                Nom
              </label>
              <input
                id='nom'
                type='text'
                placeholder='Nom'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Entrez votre email'
              className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
            />
          </div>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'>
              Nom d'utilisateur
            </label>
            <input
              id='username'
              type='text'
              placeholder='Entrez votre nom d’utilisateur'
              className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'>
              Mot de passe
            </label>
            <div className='relative'>
              <input
                id='password'
                type='password'
                placeholder='Entrez votre mot de passe'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
              />
              <span className='absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer'>
                👁️
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor='confirm-password'
              className='block text-sm font-medium text-gray-700'>
              Confirmez votre mot de passe
            </label>
            <div className='relative'>
              <input
                id='confirm-password'
                type='password'
                placeholder='Confirmez votre mot de passe'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
              />
              <span className='absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer'>
                👁️
              </span>
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <input
              id='terms'
              type='checkbox'
              className='h-4 w-4 text-fuchsia-600 border-gray-300 rounded focus:ring-[var(--color-fuchsia)]'
            />
            <label htmlFor='terms' className='text-sm text-gray-700'>
              En cochant cette case, vous acceptez les{" "}
              <a href='#' className='text-fuchsia-700 underline'>
                conditions d'utilisations
              </a>{" "}
              du site.
            </label>
          </div>
          <button
            type='button'
            className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
            S'inscrire
          </button>
          <button
            type='button'
            className='w-full p-3 bg-white text-[var(--color-fuchsia)] border border-[var(--color-fuchsia)] rounded hover:bg-fuchsia-100 flex items-center justify-center gap-2'>
            <span>🌐</span> Connexion avec Google
          </button>
        </form>
        <p className='text-center mt-4 text-sm'>
          Déjà inscrit ?{" "}
          <a href='#' className='text-[var(--color-fuchsia)] underline'>
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
