import React, { useState } from "react";
import ListeFilm from "../../data/Film.json";
import Pagination from "../../components/pagination/Pagination";
import { NavLink } from "react-router-dom";

export default function ProfilListe() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const films = ListeFilm.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='w-full dark:bg-black dark:text-white'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Ma Liste</h2>

      {films.length > 0 ? (
        <div className='flex flex-wrap items-center justify-center gap-4 py-4'>
          {films.map((film) => (
            <NavLink
              key={film.id}
              to={`/detailfilm/${film.id}`}
              className='transition-transform hover:scale-105 dark:bg-gray-900 p-2 rounded-lg shadow-sm hover:shadow-md'>
              <img className='w-[180px]' src={film.image} alt={film.title} />
              <p className='text-center mt-2 font-medium'>{film.title}</p>
            </NavLink>
          ))}
        </div>
      ) : (
        <p className='text-center py-8'>Votre liste est vide</p>
      )}

      <div className='flex justify-center py-4'>
        <Pagination
          totalItems={ListeFilm.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
