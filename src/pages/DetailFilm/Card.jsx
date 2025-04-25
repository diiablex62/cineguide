import React from "react";
import { Link } from "react-router-dom";

export default function Card({ film, currentFilmId }) {
  if (film.id === currentFilmId) {
    return null;
  }

  return (
    <Link to={`/detailfilm/${film.id}`}
      className="w-48 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
     
    >
      <div className="relative h-64 overflow-hidden rounded-md shadow-lg">
        <img
          src={`${film.image}`}
          alt={`${film.titre}`}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
}
