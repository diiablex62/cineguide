import React from "react";
import Netflix from "../components/home/Netflix";
import Primevideo from "../components/home/Primevideo";
import Disney from "../components/home/Disney";
import Hulu from "../components/home/Hulu";
import series from "../data/Serie.json";
import peakyBg from "../assets/peaky2.jpg";
import genres from "../data/Genre.json";

export default function Home() {
  return (
    <div className='p-10'>
      <div className='mt-10 dark:black px-6 rounded-lg text-center'>
        <h1 className='text-2xl font-semibold mb- dark:text-white'>
          CINÉGUIDE : Tous vos films et séries préférées au même endroit
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Parcourez, recherchez et regardez la télévision et les films de plus
          de 300 services.
        </p>
        <div className='flex justify-center items-center gap-4 flex-wrap'>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Netflix className='h-full w-auto' />
          </div>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Primevideo className='h-full w-auto' />
          </div>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Disney className='h-full w-auto' />
          </div>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Hulu className='h-full w-auto' />
          </div>
          <span className='text-lg font-medium text-gray-600 dark:text-gray-300'>
            et bien d'autres
          </span>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold mb-4 text-left dark:text-white'>
          Top 10 cette semaine &gt;
        </h2>
        <div className='relative w-[70%] mx-auto md:h-[15rem]'>
          <div className='hidden md:flex gap-20 h-full overflow-x-auto overflow-y-hidden scroll-snap-x pl-10 pr-52 scrollbar-hide'>
            {series.slice(0, 10).map((serie, index) => (
              <div
                key={serie.id}
                className='relative flex-shrink-0 w-40 h-60 bg-gray-200 dark:bg-gray-700 rounded-lg shadow scroll-snap-align-start group'>
                <div className='absolute bottom-[-50px] left-[-25px] transform -translate-x-1/2 text-[8rem] font-bold text-gray-800 dark:text-gray-400'>
                  {index + 1}
                </div>
                <img
                  src={serie.image}
                  alt={serie.titre}
                  className='w-full h-full object-cover rounded-lg relative z-10'
                />
                <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg z-20'></div>
                <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center z-30'>
                  {serie.titre}
                </h3>
              </div>
            ))}
          </div>
          {/* Version mobile */}
          <div className='md:hidden flex flex-col gap-4 -mx-10'>
            {series.slice(0, 10).map((serie, index) => (
              <div
                key={serie.id}
                className='flex h-24 bg-gray-200 dark:bg-gray-700'>
                <div className='relative w-[20%]'>
                  <div className='absolute bottom-[20px] left-[-40px] text-5xl font-bold text-gray-800 dark:text-gray-400'>
                    {index + 1}
                  </div>
                  <img
                    src={serie.image}
                    alt={serie.titre}
                    className='h-full w-full object-cover relative z-10'
                  />
                </div>
                <div className='flex-1 p-4 flex items-center'>
                  <h3 className='font-bold text-gray-800 dark:text-gray-200'>
                    {serie.titre}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className='hidden md:block absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white to-transparent dark:from-black dark:via-black pointer-events-none z-10'></div>
        </div>
      </div>

      {/* Section 3 */}
      <div className='mt-10'>
        <h2 className='text-xl font-bold mb-4 text-left text-black dark:text-white -mx-10 md:mx-0 px-4 md:px-0'>
          Meilleures séries Action &gt;
        </h2>
        <div className='flex overflow-x-auto scrollbar-hide -mx-10 md:mx-0 px-4 md:px-0'>
          <div className='flex gap-2'>
            {series.slice(0, 10).map((serie) => (
              <div
                key={serie.id}
                className='relative flex-shrink-0 w-40 h-60 group'>
                <img
                  src={serie.image}
                  alt={serie.titre}
                  className='w-full h-full object-cover rounded-lg'
                />
                <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg'></div>
                <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center'>
                  {serie.titre}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4 - Peaky Blinders */}
      <div
        className='mt-20 relative h-[55vh] bg-cover bg-bottom bg-no-repeat overflow-hidden'
        style={{
          backgroundImage: `url(${peakyBg})`,
          backgroundPosition: "50% 25%",
          boxShadow: "inset 0px -400px 150px -50px rgba(0,0,0,0.9)",
        }}>
        <div className='absolute inset-0 flex flex-col items-center justify-center px-4'>
          <h2 className='text-2xl text-white text-center mb-2 bg-black/30 px-1 py-1'>
            Parce que vous aimez "Peaky Blinders"
          </h2>
          <div className='flex overflow-x-auto scrollbar-hide max-w-full'>
            <div className='flex gap-4 px-4'>
              {series.slice(0, 6).map((serie) => (
                <div
                  key={serie.id}
                  className='relative flex-shrink-0 w-40 h-60 group'>
                  <img
                    src={serie.image}
                    alt={serie.titre}
                    className='w-full h-full object-cover rounded-lg'
                  />
                  <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg'></div>
                  <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center'>
                    {serie.titre}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section On regarde quoi ce soir */}
      <div className='mt-20'>
        <h2 className='text-2xl font-bold text-black dark:text-white mb-8'>
          On regarde quoi ce soir ?
        </h2>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Colonne de gauche - Filtres */}
          <div className='w-full md:w-1/2 space-y-6 flex flex-col items-center '>
            <div className='space-y-4 w-[50%] '>
              <div className='w-[80%] '>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 '>
                  GENRE :
                </label>
                <select className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white'>
                  <option value='' className='bg-white dark:bg-black'>
                    Sélectionnez un genre
                  </option>
                  {genres.map((genre, index) => (
                    <option
                      key={index}
                      value={genre.type}
                      className='bg-white dark:bg-black'>
                      {genre.type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  TYPE :
                </label>
                <div className='flex gap-4'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      className='form-checkbox text-[var(--color-fuchsia)]'
                    />
                    <span className='ml-2 text-gray-700 dark:text-gray-300'>
                      Film
                    </span>
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      className='form-checkbox text-[var(--color-fuchsia)]'
                    />
                    <span className='ml-2 text-gray-700 dark:text-gray-300'>
                      Série
                    </span>
                  </label>
                </div>
              </div>
              <div className='w-[80%]'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  NOTE :
                </label>
                <select className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white'>
                  <option value='' className='bg-white dark:bg-black'>
                    Sélectionnez une note
                  </option>
                  <option value='90-100' className='bg-white dark:bg-black'>
                    90 à 100 - Chef d'œuvre
                  </option>
                  <option value='70-90' className='bg-white dark:bg-black'>
                    70 à 90 - Très bon
                  </option>
                  <option value='40-70' className='bg-white dark:bg-black'>
                    40 à 70 - Moyen
                  </option>
                  <option value='0-40' className='bg-white dark:bg-black'>
                    0 à 40 - Mauvais
                  </option>
                </select>
              </div>
            </div>
            <div className='w-[80%] flex justify-center'>
              <button className='w-[30%] bg-[var(--color-fuchsia)] text-white py-2 px-4 rounded hover:bg-[var(--color-fuchsia-hover)]'>
                TROUVER UN FILM
              </button>
            </div>
          </div>

          {/* Colonne de droite - Résultat */}
          <div className='w-full md:w-1/2 bg-white dark:bg-black rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
            <div className='flex gap-6'>
              <img
                src={series[8].image}
                alt='Affiche du film'
                className='w-32 h-48 object-cover rounded'
              />
              <div className='flex flex-col justify-between'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                    Spider-Man: Into the Spider-Verse
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 text-sm mt-2'>
                    2018 · Note: 99 · 1h 57m
                  </p>
                  <p className='text-gray-700 dark:text-gray-300 mt-4'>
                    L'adolescent Miles Morales devient Spider-Man de son univers
                    et doit rejoindre cinq individus dotés de pouvoirs
                    d'araignée venant d'autres dimensions pour...
                  </p>
                </div>
                <div className='flex gap-2 mt-4'>
                  <button className='bg-[var(--color-fuchsia)] text-white px-4 py-2 rounded'>
                    À voir
                  </button>
                  <button className='bg-green-600 text-white px-4 py-2 rounded'>
                    Déjà vu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
