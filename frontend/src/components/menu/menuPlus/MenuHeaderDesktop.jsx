import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../../context/MenuContext";

export default function MenuHeaderDesktop({ footer }) {
  const { menuRef, setMenu } = useContext(MenuContext);

  return (
    <div
      ref={menuRef}
      className={`absolute border border-black bg-white shadow-md flex items-center flex-col gap-2.5 p-2.5 pr-5 z-50 dark:bg-black dark:border-white dark:shadow-white ${
        footer === "footer" ? "md:mt-[-176px]" : ""
      }`}>
      <NavLink
        to='/mentionsLegales'
        onClick={() => setMenu(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        Mentions Légales
      </NavLink>
      <NavLink
        to='/cgu'
        onClick={() => setMenu(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        CGU
      </NavLink>
      <NavLink
        to='/cgv'
        onClick={() => setMenu(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        CGV
      </NavLink>
      <NavLink
        to='/faq'
        onClick={() => setMenu(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        FAQ
      </NavLink>
    </div>
  );
}
