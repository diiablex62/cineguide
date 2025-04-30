import React, { useContext, useState } from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import ProfilNav from "./components/ProfilNav";
import ModalPassword from "../../components/modalPassword/ModalPassword";
import UserData from "../../data/User.json";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Outlet, useLocation } from "react-router-dom";

export default function profil() {
  const location = useLocation();

  const [isModalOpen, setModalOpen] = useState(false);

  const schema = yup.object({
    citation: yup.string().required("Le champ est obligatoire"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setCitation(data.citation);
    setModalOpen(false);
  };
  return (
    <>
      <ProfilNav></ProfilNav>
      <Outlet></Outlet>
      <div
        className={
          location.pathname === "/profil"
            ? "flex flex-col p-5 md:flex-row dark:bg-black dark:text-white dark:border-white"
            : "flex flex-col p-5 dark:bg-black dark:text-white dark:border-white"
        }
      >
        <div
          className={
            location.pathname === "/profil"
              ? "md:w-4/6 flex flex-col p-4"
              : "md:w-auto flex flex-col p-4"
          }
        >
          <ProfilForm></ProfilForm>
        </div>

        <div className="w-full md:w-1/3">
          <ProfilUtils></ProfilUtils>
        </div>
      </div>
    </>
  );
}
