import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo_blanc.png";
import { MenuContext } from "../context/MenuContext";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MenuHeaderDesktop from "./menu/menuPlus/MenuHeaderDesktop";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const { menuFooter, setMenuFooter } = useContext(MenuContext);
  const { theme } = useContext(ThemeContext);
  return (
    <div className="border-t p-3 flex flex-col justify-center items-center md:flex-row md:justify-between">
      <div className="">
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
        <NavLink>Accueil</NavLink>
        <NavLink>Films</NavLink>
        <NavLink>Séries</NavLink>
        <NavLink>Actualités</NavLink>
        {menuFooter ? (
          <div>
            <div
              onClick={() => setMenuFooter(false)}
              className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
            >
              <p>Plus</p>
              <FaChevronUp />
            </div>
            <MenuHeaderDesktop footer="footer" />
          </div>
        ) : (
          <div
            onClick={() => setMenuFooter(true)}
            className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
          >
            <p>Plus</p>
            <FaChevronDown />
          </div>
        )}
      </div>
      <div className="flex gap-5 items-center justify-center text-3xl">
        <FaFacebookSquare className="dark:text-white cursor-pointer" />
        <FaSquareXTwitter className="dark:text-white cursor-pointer" />
      </div>
    </div>
  );
}
