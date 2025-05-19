import React, { useState } from "react";
import Review from "../../data/Activiter.json";
import Film from "../../data/Film.json";
import Pagination from "../../components/pagination/Pagination";
import { NavLink } from "react-router-dom";

export default function ProfileReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const review = Review.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='w-full dark:bg-black dark:text-white'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Mes Reviews</h2>

      {review.length > 0 ? (
        <div className='flex flex-wrap items-center justify-center py-4'>
          {review.map((item) => {
            const film = Film.find((f) => f.id === item.idFilm);
            if (!film) return null;
            return (
              <NavLink
                key={item.id}
                to={`/detailfilm/${film.id}`}
                className='mb-4 mx-2 transition-transform hover:scale-105'>
                <div className='review-item flex flex-col items-center border dark:border-gray-700 p-4 mb-3 mt-3 min-w-[300px] max-w-[300px] min-h-[350px] max-h-[350px] dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                  <img src={film.image} alt={film.title} />
                  <h2 className='font-bold mt-2'>{film.title}</h2>
                  <h3 className='font-medium mt-1'>Votre commentaire :</h3>
                  <p className='text-center h-20 overflow-hidden'>
                    {item.note && <p>Note: {item.note}/5</p>}
                    {item.commentaire.length > 40
                      ? item.commentaire.substring(0, 40) + "..."
                      : item.commentaire}
                  </p>

                  <button className='border dark:border-gray-700 px-8 py-1 cursor-pointer hover:bg-fuchsia hover:text-white dark:hover:bg-fuchsia rounded-md mt-2'>
                    Voir
                  </button>
                </div>
              </NavLink>
            );
          })}
        </div>
      ) : (
        <p className='text-center py-8'>
          Vous n'avez pas encore publié de reviews
        </p>
      )}

      <div className='flex justify-center mb-4'>
        <Pagination
          totalItems={Review.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
