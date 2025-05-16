import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo_blanc.png";
import { MenuContext } from "../context/MenuContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MenuHeaderDesktop from "./menu/menuPlus/MenuHeaderDesktop";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next"; // Ajout

export default function Footer() {
  const { menuFooter, setMenuFooter } = useContext(MenuContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation(); // Ajout

  return (
    <div className='border-t border-black dark:border-white p-3 flex flex-col justify-center items-center md:flex-row md:justify-between bg-white dark:bg-black'>
      <div className=''>
        {theme === "dark" ? (
          <Link to='/'>
            <img src={logoWhite} alt='logo blanc cineguide' className='w-52' />
          </Link>
        ) : (
          <Link to='/'>
            <img src={logo} alt='logo cineguide' className='w-52' />
          </Link>
        )}
      </div>
      <div className='flex flex-col  md:flex-row items-center gap-3'>
        <NavLink
          to={"/"}
          className='mr-5 text-black dark:text-white hover:text-fuchsia'>
          {t("footer.accueil", "Accueil")}
        </NavLink>
        <NavLink
          to={"/film"}
          className='mr-5 text-black dark:text-white hover:text-fuchsia'>
          {t("footer.films", "Films")}
        </NavLink>
        <NavLink
          to={"/series"}
          className='mr-5 text-black dark:text-white hover:text-fuchsia'>
          {t("footer.series", "Séries")}
        </NavLink>
        <NavLink
          to={"/actualites"}
          className='mr-5 text-black dark:text-white hover:text-fuchsia'>
          {t("footer.actualites", "Actualités")}
        </NavLink>
        {menuFooter ? (
          <div>
            <div
              onClick={() => setMenuFooter(false)}
              className='flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white'>
              <p>{t("footer.plus", "Plus")}</p>
              <FaChevronUp />
            </div>
            <MenuHeaderDesktop footer='footer' />
          </div>
        ) : (
          <div
            onClick={() => setMenuFooter(true)}
            className='flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white'>
            <p>{t("footer.plus", "Plus")}</p>
            <FaChevronDown />
          </div>
        )}
      </div>
      <div className='flex gap-5 items-center justify-center text-3xl text-black dark:text-white'>
        <FaFacebookSquare className='cursor-pointer' />
        <FaSquareXTwitter className='cursor-pointer' />
      </div>
    </div>
  );
}
