import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuHeaderDesktop({ menuRef, setMenu }) {
  return (
    <div
      ref={menuRef}
      className="absolute border border-black bg-white shadow-md flex items-center flex-col gap-2.5 p-2.5 pr-5 z-50 dark:bg-black dark:border-white dark:shadow-white"
    >
      <NavLink
        to="/mentionsLegales"
        onClick={() => setMenu(false)}
        className="w-full text-black dark:text-white hover:text-fuchsia"
      >
        Mentions Légales
      </NavLink>
      <NavLink
        to="/cgu"
        onClick={() => setMenu(false)}
        className="w-full text-black dark:text-white hover:text-fuchsia"
      >
        CGU
      </NavLink>
      <NavLink
        to="/cgv"
        onClick={() => setMenu(false)}
        className="w-full text-black dark:text-white hover:text-fuchsia"
      >
        CGV
      </NavLink>
      <NavLink
        to="/faq"
        onClick={() => setMenu(false)}
        className="w-full text-black dark:text-white hover:text-fuchsia"
      >
        FAQ
      </NavLink>
    </div>
  );
}
