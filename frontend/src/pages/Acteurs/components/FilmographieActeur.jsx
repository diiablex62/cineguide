import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
import { NavLink } from "react-router-dom";

export default function FilmographieActeur() {
  const { actorMovies, actor } = useContext(ActorContext);

  console.log(actorMovies);

  return (
    <div className="w-full p-4">
      <h2 className="font-bold text-2xl mb-4">Filmographie</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-black dark:bg-white">
              <th className="text-white px-4 py-2 text-left dark:text-black">
                Année
              </th>
              <th className="text-white px-4 py-2 text-left dark:text-black">
                Titre
              </th>
              <th className="text-white px-4 py-2 text-right dark:text-black">
                Note
              </th>
              <th className="text-white px-4 py-2 text-right dark:text-black">
                Durée
              </th>
            </tr>
          </thead>
          <tbody>
            {actorMovies.map((film) => (
              <tr key={film._id} className="border-b">
                <td className="px-4 py-2 text-black dark:text-white">
                  {new Date(film.dateSortie).getFullYear()}
                </td>
                <td className="px-4 py-2 ">
                  <NavLink
                    to={`/detailfilm/${film._id}`}
                    className="font-bold hover:underline text-black dark:text-white"
                  >
                    {film.titre}
                  </NavLink>
                </td>
                <td className="px-4 py-2 text-right text-black dark:text-white">
                  {Number(film.note).toFixed(1)}
                </td>
                <td className="px-4 py-2 text-right text-black dark:text-white">
                  {Math.floor(film.duree / 60)}h{film.duree % 60}min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
