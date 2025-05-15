import React, { useState } from "react";
import Review from "../../data/Activiter.json";
import Film from "../../data/Film.json";
import Pagination from "../../components/pagination/Pagination";
import ProfilNav from "./components/ProfilNav";
import { NavLink } from "react-router-dom";
export default function ProfileReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const review = Review.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <ProfilNav></ProfilNav>
      <div className=" flex flex-wrap items-center justify-center ">
        {review.map((item) => {
          const film = Film.find((f) => f.id === item.idFilm);
          if (!film) return null;
          return (
            <NavLink to={`/detailfilm/${film.id}`} className="mb-4">
              <div
                key={item.id}
                className="review-item flex flex-col items-center border p-4 mb-3 mt-3 min-w-[300px] max-w-[300px] min-h-[350px] max-h-[350px] "
              >
                <img src={film.image} alt={film.title} />
                <h2 className="font-bold mt-2">Commentaire :</h2>
                <p className="text-center h-20 overflow-hidden">
                  {item.note && <p>Note: {item.note}</p>}
                  {item.commentaire.length > 40
                    ? item.commentaire.substring(0, 40) + "..."
                    : item.commentaire}
                </p>

                <button className="border px-8 py-1 cursor-pointer">
                  Voir
                </button>
              </div>
            </NavLink>
          );
        })}
      </div>

      <div className="flex justify-center mb-4">
        <Pagination
          totalItems={Review.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
