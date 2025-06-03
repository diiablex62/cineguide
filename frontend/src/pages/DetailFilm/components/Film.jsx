import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FilmContext } from "../../../context/FilmContext";
import { AuthContext } from "../../../context/AuthContext";
import { CommentContext } from "../../../context/CommentContext";

export default function Film() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { detailFilm } = useContext(FilmContext);
  const { connectedUser } = useContext(AuthContext);

  const { comments, fetchComments } = useContext(CommentContext);
  useEffect(() => {
    if (detailFilm?._id) {
      fetchComments("film", detailFilm._id);
    }
  }, [detailFilm?._id]);

  const averageRating = useMemo(() => {
    if (!comments || comments.length === 0) return 0;

    const totalRatings = comments.reduce(
      (sum, comment) => sum + (comment.rating || 0),
      0
    );
    const numberOfRatings = comments.filter(
      (comment) => comment.rating > 0
    ).length;

    return numberOfRatings === 0 ? 0 : totalRatings / numberOfRatings;
  }, [comments]);

  if (!detailFilm) {
    return <div className="p-4 text-center">Chargement du film...</div>;
  }
  const dateFormatee = new Date(detailFilm.dateSortie).toLocaleDateString(
    "fr-FR"
  );
  return (
    <div className="md:w-1/3 flex-shrink-0 md:pl-4">
      <div className="flex gap-4 p-3 mb-6">
        <div className="bg-gray-800 mb-3 h-64 w-48 relative  overflow-hidden shadow-xl">
          <img
            src={`${detailFilm.image}`}
            alt={`${detailFilm.titre}`}
            className="w-full h-full object-fill"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-between items-start">
            <div>
              <p className="text-sm font-bold md:text-xl">{detailFilm.titre}</p>
            </div>
            <div className="flex mt-1 gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-lg">
                  {averageRating >= star ? (
                    <FaStar className="text-fuchsia" />
                  ) : (
                    <FaRegStar className="text-gray-400 dark:text-white" />
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 flex items-center text-sm  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span>Listes</span>
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 flex items-center text-sm  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span>Vu</span>
            </button>
          </div>
          <div className="mt-4 text-xs flex justify-center w-full">
            {connectedUser ? (
              <button className="py-2 px-2 w-full text-center border border-gray-300 dark:border-gray-700  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                ajouter la Watchlist
              </button>
            ) : (
              <button className="py-2 px-2 w-full text-center border border-gray-300 dark:border-gray-700  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Connectez-vous pour synchroniser la Watchlist
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex  gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              GENRES
            </h3>
            <div className="flex flex-wrap gap-2">
              {detailFilm.genre &&
                Array.isArray(detailFilm.genre) &&
                detailFilm.genre.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md"
                  >
                    {genre}
                  </span>
                ))}
            </div>
          </div>
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              DURÉE
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailFilm.duree}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex  gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              PAYS DE PRODUCTION
            </h3>
            <div className="flex flex-wrap gap-2">
              {detailFilm.paysProduction.map((pays) => (
                <span
                  key={pays}
                  className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md"
                >
                  {pays}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex md:flex-col gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              DATE DE SORTIE
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {dateFormatee}
            </p>
          </div>
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              RÉALISATEUR
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailFilm.realisateur}
            </p>
          </div>
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              PLAFORM
            </h3>
            <div className="flex flex-wrap gap-2">
              {detailFilm.platforms && Array.isArray(detailFilm.platforms)
                ? detailFilm.platforms.join(", ")
                : detailFilm.platforms}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
