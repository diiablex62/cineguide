import React from "react";
import { Link } from "react-router-dom";

export default function Card({ serie, currentSerieId }) {
  if (serie.id === currentSerieId) {
    return null;
  }
  return (
    <Link
      to={`/detailserie/${serie.id}`}
      className="w-48 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div className="relative h-64 overflow-hidden rounded-md shadow-lg">
        <img
          src={`${serie.image}`}
          alt={`${serie.titre}`}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
}
