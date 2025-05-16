import React from "react";
import { Link } from "react-router-dom";

export default function Card({ serie, currentSerieId }) {
  // Assurer que les IDs sont toujours des strings pour la comparaison
  const currentId = currentSerieId ? String(currentSerieId) : "";
  const serieId = serie && serie.id ? String(serie.id) : "";
  
  // Vérifier si c'est la série actuelle pour ne pas l'afficher
  if (currentId && serieId && serieId === currentId) {
    return null;
  }
  
  if (!serie || !serie.id || !serie.image || !serie.titre) {
    return null; // Ne pas afficher de carte incomplète
  }
  
  return (
    <Link
      to={`/detailserie/${serie.id}`}
      className="w-48 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div className="relative h-64 overflow-hidden rounded-md shadow-lg">
        <img
          src={serie.image}
          alt={serie.titre}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
}