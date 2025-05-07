import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../../context/MenuContext";
import { useTranslation } from "react-i18next"; // Ajout

export default function MenuHeaderMobile() {
  const { menuPlusRef, setMenuPlus } = useContext(MenuContext);
  const { t } = useTranslation(); // Ajout

  return (
    <div
      ref={menuPlusRef}
      className='border border-black bg-white shadow-md flex items-center flex-col gap-2.5 p-2.5 w-full dark:bg-black dark:border-white dark:shadow-white'>
      <NavLink
        to='/mentionsLegales'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        {t("footer.mentionsLegales", "Mentions Légales")}
      </NavLink>
      <NavLink
        to='/cgu'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        {t("footer.cgu", "CGU")}
      </NavLink>
      <NavLink
        to='/cgv'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        {t("footer.cgv", "CGV")}
      </NavLink>
      <NavLink
        to='/faq'
        onClick={() => setMenuPlus(false)}
        className='w-full text-black dark:text-white hover:text-fuchsia'>
        {t("footer.faq", "FAQ")}
      </NavLink>
    </div>
  );
}
