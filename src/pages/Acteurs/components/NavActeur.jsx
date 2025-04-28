import React, { useEffect } from "react";
import { Link, useParams, useResolvedPath } from "react-router-dom";

export default function NavActeur() {
  const { id } = useParams();
  const path = useResolvedPath();

  useEffect(() => {
    if (path.pathname.endsWith(id)) {
      document.getElementById("AccueilActeur").classList.add("activeActeur");
      document
        .getElementById("BiographieActeur")
        .classList.remove("activeActeur");
      document
        .getElementById("FilmographieActeur")
        .classList.remove("activeActeur");
      document
        .getElementById("RecompensesActeur")
        .classList.remove("activeActeur");
    }
    if (path.pathname.includes("biographie")) {
      document.getElementById("AccueilActeur").classList.remove("activeActeur");
      document.getElementById("BiographieActeur").classList.add("activeActeur");
      document
        .getElementById("FilmographieActeur")
        .classList.remove("activeActeur");
      document
        .getElementById("RecompensesActeur")
        .classList.remove("activeActeur");
    }
    if (path.pathname.includes("filmographie")) {
      document.getElementById("AccueilActeur").classList.remove("activeActeur");
      document
        .getElementById("BiographieActeur")
        .classList.remove("activeActeur");
      document
        .getElementById("FilmographieActeur")
        .classList.add("activeActeur");
      document
        .getElementById("RecompensesActeur")
        .classList.remove("activeActeur");
    }
    if (path.pathname.includes("recompenses")) {
      document.getElementById("AccueilActeur").classList.remove("activeActeur");
      document
        .getElementById("BiographieActeur")
        .classList.remove("activeActeur");
      document
        .getElementById("FilmographieActeur")
        .classList.remove("activeActeur");
      document
        .getElementById("RecompensesActeur")
        .classList.add("activeActeur");
    }
  });

  return (
    <div className="flex justify-center items-center gap-5">
      <div className="flex justify-center items-center px-4">
        <Link
          id="AccueilActeur"
          to={`/acteurs/${id}`}
          className=" flex justify-center items-center px-5 py-[5px]  border border-black w-32 dark:bg-white dark:text-black"
        >
          Accueil
        </Link>
      </div>
      <div className="flex justify-center items-center px-4">
        <Link
          id="BiographieActeur"
          to={`/acteurs/${id}/biographie`}
          className="flex justify-center items-center px-5 py-[5px] border border-black w-32 dark:bg-white dark:text-black"
        >
          Biographie
        </Link>
      </div>
      <div className="flex justify-center items-center px-4">
        <Link
          id="FilmographieActeur"
          to={`/acteurs/${id}/filmographie`}
          className="flex justify-center items-center px-5 py-[5px] border border-black w-32 dark:bg-white dark:text-black"
        >
          Filmographie
        </Link>
      </div>
      <div className="flex justify-center items-center px-4">
        <Link
          id="RecompensesActeur"
          to={`/acteurs/${id}/recompenses`}
          className="flex justify-center items-center px-5 py-[5px] border border-black w-32 dark:bg-white dark:text-black"
        >
          RÃ©compenses
        </Link>
      </div>
    </div>
  );
}
