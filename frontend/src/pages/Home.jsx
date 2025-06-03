import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Netflix from "../components/home/Netflix";
import Primevideo from "../components/home/Primevideo";
import Disney from "../components/home/Disney";
import Hulu from "../components/home/hulu";
import peakyBg from "../assets/peaky2.jpg";
import { FaCheck, FaPlus, FaEye } from "react-icons/fa";
import RechercheSoir from "../components/home/RechercheSoir";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [top10, setTop10] = useState([]);
  const [actionSeries, setActionSeries] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les films pour la recherche
        const moviesResponse = await fetch("http://localhost:3000/api/films");
        if (!moviesResponse.ok) {
          throw new Error("Erreur lors de la récupération des films");
        }
        const moviesData = await moviesResponse.json();
        setMovies(moviesData);

        // Récupérer les séries pour la recherche
        const seriesResponse = await fetch("http://localhost:3000/api/series");
        if (!seriesResponse.ok) {
          throw new Error("Erreur lors de la récupération des séries");
        }
        const seriesData = await seriesResponse.json();
        setSeries(seriesData);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-10 bg-white dark:bg-black'>
      <div className='mt-10 dark:bg-black px-6 rounded-lg text-center'>
        <h1 className='text-2xl font-semibold mb- text-gray-900 dark:text-white'>
          Tous vos films et séries préférées au même endroit
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
          Top 10 cette semaine
        </h2>
        <div className='relative w-[70%] mx-auto md:h-[15rem]'>
          <div className='hidden md:flex gap-20 h-full overflow-x-auto overflow-y-hidden scroll-snap-x pl-10 pr-52 scrollbar-hide'>
            {loading ? (
              <div className='flex items-center justify-center w-full'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
              </div>
            ) : (
              top10.map((item, index) => (
                <NavLink
                  className='cursor-pointer'
                  to={`/${
                    item.type === "movie" ? "detailfilm" : "detailserie"
                  }/${item.id}`}
                  key={item.id}>
                  <div className='relative flex-shrink-0 w-40 h-60 bg-gray-200 dark:bg-black rounded-lg shadow scroll-snap-align-start group'>
                    <div className='absolute bottom-[-50px] left-[-25px] transform -translate-x-1/2 text-[8rem] font-bold text-gray-800 dark:text-white'>
                      {index + 1}
                    </div>
                    <img
                      src={item.image}
                      alt={item.titre}
                      className='w-full h-full object-cover rounded-lg relative z-10'
                    />
                    <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg z-20'></div>
                    <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center z-30'>
                      {item.titre}
                    </h3>
                  </div>
                </NavLink>
              ))
            )}
          </div>
          {/* Version mobile */}
          <div className='md:hidden flex flex-col gap-4 -mx-10'>
            {loading ? (
              <div className='flex items-center justify-center w-full'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
              </div>
            ) : (
              top10.map((item, index) => (
                <NavLink
                  className='cursor-pointer'
                  to={`/${
                    item.type === "movie" ? "detailfilm" : "detailserie"
                  }/${item.id}`}
                  key={item.id}>
                  <div className='flex h-24 bg-gray-200 dark:bg-black'>
                    <div className='relative w-[20%]'>
                      <div className='absolute bottom-[20px] left-[-40px] text-5xl font-bold text-gray-800 dark:text-white'>
                        {index + 1}
                      </div>
                      <img
                        src={item.image}
                        alt={item.titre}
                        className='h-full w-full object-cover relative z-10'
                      />
                    </div>
                    <div className='flex-1 p-4 flex items-center'>
                      <h3 className='font-bold text-gray-800 dark:text-gray-200'>
                        {item.titre}
                      </h3>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
          <div className='hidden md:block absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white to-transparent dark:from-black dark:via-black pointer-events-none z-10'></div>
        </div>
      </div>

      {/* Section Meilleures séries Action */}
      <div className='mt-10 bg-white dark:bg-black'>
        <h2 className='text-xl font-bold mb-4 text-left text-black dark:text-white -mx-10 md:mx-0 px-4 md:px-0'>
          Meilleures séries Action
        </h2>
        <div className='flex overflow-x-auto scrollbar-hide -mx-10 md:mx-0 px-4 md:px-0'>
          <div className='flex gap-2'>
            {loading ? (
              <div className='flex items-center justify-center w-full'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
              </div>
            ) : (
              actionSeries.map((serie) => (
                <NavLink
                  className='cursor-pointer'
                  to={`/detailserie/${serie.id}`}
                  key={serie.id}>
                  <div className='relative flex-shrink-0 w-40 h-60 group'>
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
                </NavLink>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Section Peaky Blinders */}
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
              {loading ? (
                <div className='flex items-center justify-center w-full'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
                </div>
              ) : (
                similarSeries.map((serie) => (
                  <NavLink
                    className='cursor-pointer'
                    to={`/detailserie/${serie.id}`}
                    key={serie.id}>
                    <div className='relative flex-shrink-0 w-40 h-60 group'>
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
                  </NavLink>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section On regarde quoi ce soir */}
      <RechercheSoir movies={movies} series={series} />
    </div>
  );
}
