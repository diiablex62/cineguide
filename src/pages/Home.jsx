import React from "react";
import Netflix from "../components/home/Netflix";
import Primevideo from "../components/home/Primevideo";
import Disney from "../components/home/Disney";
import Hulu from "../components/home/Hulu";
import series from "../data/Serie.json";

export default function Home() {
  return (
    <div className='p-10'>
      <div className='mt-10 dark:bg-gray-800 py-10 px-6 rounded-lg text-center'>
        <h1 className='text-2xl font-semibold mb-4'>
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
        <h2 className='text-xl font-bold mb-4 text-left'>
          Top 10 cette semaine &gt;
        </h2>
        <div className='flex gap-6 overflow-x-auto justify-center w-[80%] mx-auto'>
          {series.slice(0, 10).map((serie, index) => (
            <div
              key={serie.id}
              className='relative flex-shrink-0 w-40 h-60 bg-gray-200 dark:bg-gray-700 rounded-lg shadow'>
              <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8rem] font-bold text-gray-300 dark:text-gray-500 -z-10'>
                {index + 1}
              </span>
              <img
                src={serie.image}
                alt={serie.titre}
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
