import React, { useContext, useState } from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import { AuthContext } from "../../components/providers/AuthProvider";
import { FaPen } from "react-icons/fa";
import ProfilNav from "./components/ProfilNav";
import ModalPassword from "../../components/modalPassword/ModalPassword";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function profil() {
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
    <div className="flex flex-col p-5 md:flex-row dark:bg-black dark:text-white dark:border-white">
      <div className="md:w-4/6 flex flex-col p-4">
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
        <ProfilForm></ProfilForm>
      </div>
      <div className="md:w-2/6 p-4">
        <ProfilUtils></ProfilUtils>
      </div>
      <ModalPassword isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex justify-between">
          <h2 className="underline">Modifier votre citation ?</h2>
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
              id="lastname"
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
  );
}
