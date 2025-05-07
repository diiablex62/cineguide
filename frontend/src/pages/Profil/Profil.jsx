import React, { useContext, useState } from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import ProfilNav from "./components/ProfilNav";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Ajout

export default function profil() {
  const location = useLocation();
  const { t } = useTranslation(); // Ajout

  return (
    <>
      <Outlet></Outlet>
      <div
        className={
          location.pathname === "/profil"
            ? "flex flex-col p-5 md:flex-row dark:bg-black dark:text-white dark:border-white"
            : "flex flex-col p-5 dark:bg-black dark:text-white dark:border-white"
        }>
        <div
          className={
            location.pathname === "/profil"
              ? "md:w-4/6 flex flex-col p-4"
              : "md:w-auto flex flex-col p-4"
          }>
          <ProfilNav></ProfilNav>
          <ProfilForm></ProfilForm>
        </div>
        <div className='w-full md:w-2/6'>
          <ProfilUtils></ProfilUtils>
        </div>
      </div>
    </>
  );
}
