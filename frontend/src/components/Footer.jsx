import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo_blanc.png";
import { MenuContext } from "../context/MenuContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MenuHeaderDesktop from "./menu/menuPlus/MenuHeaderDesktop";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import MenuHeaderMobile from "./menu/menuPlus/MenuHeaderMobile";

export default function Footer() {
  const { menuFooter, setMenuFooter, menuFooterMobile, setMenuFooterMobile } =
    useContext(MenuContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Fonction pour vérifier la taille de l'écran
    const checkScreenSize = () => {
      setMenuFooterMobile(window.innerWidth < 768);
    };

    // Vérification initiale
    checkScreenSize();

    // Ajouter l'event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup : retirer l'event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []); // Dépendances vides car on veut que ça s'exécute une seule fois au montage

  return (
    <div className="border-t border-black dark:border-white p-3 flex flex-col justify-center items-center md:flex-row md:justify-between bg-white dark:bg-black">
      <div className="max-md:mb-2.5">
        {theme === "dark" ? (
          <Link to="/">
            <img src={logoWhite} alt="logo blanc cineguide" className="w-52" />
          </Link>
        ) : (
          <Link to="/">
            <img src={logo} alt="logo cineguide" className="w-52" />
          </Link>
        )}
      </div>
      <div className="flex flex-col  md:flex-row items-center gap-3">
        <NavLink
          to={"/"}
          className="mr-5 text-black dark:text-white hover:text-fuchsia"
        >
          Accueil
        </NavLink>
        <NavLink
          to={"/film"}
          className="mr-5 text-black dark:text-white hover:text-fuchsia"
        >
          Films
        </NavLink>
        <NavLink
          to={"/series"}
          className="mr-5 text-black dark:text-white hover:text-fuchsia"
        >
          Séries
        </NavLink>
        <NavLink
          to={"/actualites"}
          className="mr-5 text-black dark:text-white hover:text-fuchsia"
        >
          Actualités
        </NavLink>
        {menuFooter && menuFooterMobile === false ? (
          <div className="mb-2.5">
            <div
              onClick={() => setMenuFooter(false)}
              className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
            >
              <p>Plus</p>
              <FaChevronUp />
            </div>
            <MenuHeaderDesktop footer="footer" />
          </div>
        ) : menuFooter && menuFooterMobile === true ? (
          <div className="text-center mb-2.5">
            <div
              onClick={() => setMenuFooter(false)}
              className="flex justify-center items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
            >
              <p>Plus</p>
              <FaChevronUp />
            </div>
            <MenuHeaderMobile />
          </div>
        ) : (
          <div
            onClick={() => setMenuFooter(true)}
            className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white mb-2.5"
          >
            <p>Plus</p>
            <FaChevronDown />
          </div>
        )}
      </div>
      <div className="flex gap-5 items-center justify-center text-3xl text-black dark:text-white">
        <FaFacebookSquare className="cursor-pointer" />
        <FaSquareXTwitter className="cursor-pointer" />
      </div>
    </div>
  );
}
