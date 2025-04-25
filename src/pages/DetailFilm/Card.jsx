import React from "react";

export default function Card({ film, onClick, currentFilmId }) {
  if (film.id === currentFilmId) {
    return null;
  }

  return (
    <div
      className="w-48 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => onClick && onClick(film)}
    >
      <div className="relative h-64 overflow-hidden rounded-md shadow-lg">
        <img
          src={`${film.image}`}
          alt={`${film.titre}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
