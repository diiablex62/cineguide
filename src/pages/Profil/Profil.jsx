import React, { useContext, useState } from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import { AuthContext } from "../../context/AuthContext";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import ProfilNav from "./components/ProfilNav";
import ModalPassword from "../../components/modalPassword/ModalPassword";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ProfilActiviter from "./ProfilActiviter";
import { useLocation } from "react-router-dom";
import ProfilListe from "./ProfilListe";
import ProfileReviews from "./ProfileReviews";

export default function profil() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [citation, setCitation] = useState(user.textPerso);
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
          <div className="flex items-end">
            <img src={user.avatar} alt="" />
            <p className="font-bold text-4xl mb-3">
              {user.firstname}.{user.lastname.charAt(0)}
            </p>
          </div>
          <div>
            <p className="italic my-3">{citation}</p>
            <div className="flex justify-end">
              <button
                className="border rounded px-2 flex items-center cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <FaPen className="mr-2" />
                Modifier
              </button>
            </div>
          </div>
          <ProfilNav></ProfilNav>
          {location.pathname === "/profil" ? <ProfilForm></ProfilForm> : null}
        </div>

        {location.pathname === "/profil" ? (
          <div className="md:w-2/6 p-4">
            <ProfilUtils></ProfilUtils>
          </div>
        ) : location.pathname === "/profil/mon-activiter" ? (
          <div className="">
            <ProfilActiviter></ProfilActiviter>
          </div>
        ) : location.pathname === "/profil/ma-liste" ? (
          <ProfilListe></ProfilListe>
        ) : location.pathname === "/profil/mes-reviews" ? (
          <ProfileReviews></ProfileReviews>
        ) : null}

        <ModalPassword isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="flex justify-between">
            <h2 className="underline dark:text-white">
              Modifier votre citation ?
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" cursor-pointer text-2xl"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="mt-10 py-5 px-2 flex flex-col items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full"
            >
              <label htmlFor="citation">Votre citation :</label>
              <input
                {...register("citation")}
                className="text-black border dark:border-white dark:text-white px-3 py-3"
                type="text"
                id="citation"
                defaultValue={citation}
              />
              {errors.citation && (
                <p className="text-red-500 dark:text-red-400">
                  {errors.citation.message}
                </p>
              )}
              <button className="px-10 cursor-pointer mt-8 bg-fuchsia text-white h-[40px]">
                Envoyer
              </button>
            </form>
          </div>
        </ModalPassword>
      </div>
    </>
  );
}
