import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../../context/MenuContext";

export default function MenuHeaderMobile() {
  const { menuPlusRef, setMenuPlus } = useContext(MenuContext);

  return (
    <div
      ref={menuPlusRef}
      className='border border-black bg-white shadow-md flex items-center flex-col gap-2.5 p-2.5 w-full dark:bg-black dark:border-white dark:shadow-white'>
      <NavLink
        to='/mentionsLegales'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        Mentions Légales
      </NavLink>
      <NavLink
        to='/cgu'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        CGU
      </NavLink>
      <NavLink
        to='/cgv'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        CGV
      </NavLink>
      <NavLink
        to='/faq'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        FAQ
      </NavLink>
    </div>
  );
}
