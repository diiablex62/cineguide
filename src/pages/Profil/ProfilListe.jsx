import React, { useState } from "react";
import ListeFilm from "../../data/Film.json";
import Pagination from "../../components/pagination/Pagination";
export default function ProfilListe() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const films = ListeFilm.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {films.map((film) => (
          <a href="#">
            <img className="w-[180px]" src={film.image} alt="" />
          </a>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          totalItems={ListeFilm.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
