import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineComment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import userData from "../../../data/User.json";
import { FaPen } from "react-icons/fa";
import ModalPassword from "../../../components/modalPassword/ModalPassword";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import avatar from "../../../assets/profil/avatar.svg";

export default function ProfilNav() {
  const [citation, setCitation] = useState(userData.textPerso);

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
  const [previewImage, setPreviewImage] = useState(avatar);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-end">
        <label
          htmlFor="upload-avatar"
          className="cursor-pointer flex justify-center items-center relative group"
        >
          <FaPen className="absolute text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            className="w-[100px] h-[100px] object-cover"
            src={previewImage}
            alt="Avatar"
          />
        </label>
        <input
          type="file"
          id="upload-avatar"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <p className="font-bold text-4xl mb-3">
          {userData.firstname}.{userData.lastname.charAt(0)}
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
      <div className="my-4 flex justify-center md:justify-start gap-10">
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            `p-1 w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia hover:text-white ${
              isActive ? "bg-fuchsia text-white" : "bg-white"
            }`
          }
          end
        >
          <LuUserRound className="w-[30px] h-[30px] lg:mr-2" />
          <span className="hidden lg:block">Mon profil</span>
        </NavLink>
        <NavLink
          to="/profil/mon-activiter"
          className={({ isActive }) =>
            `p-1 w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia hover:text-white ${
              isActive ? "bg-fuchsia text-white" : "bg-white"
            }`
          }
        >
          <ImStatsBars className="w-[30px] h-[30px] lg:mr-2" />
          <span className="hidden lg:block">Mon activité</span>
        </NavLink>
        <NavLink
          to="/profil/ma-liste"
          className={({ isActive }) =>
            `p-1 w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia hover:text-white ${
              isActive ? "bg-fuchsia text-white" : "bg-white"
            }`
          }
        >
          <CiViewList className="w-[30px] h-[30px] lg:mr-2" />
          <span className="hidden lg:block">Ma liste</span>
        </NavLink>
        <NavLink
          to="/profil/mes-reviews"
          className={({ isActive }) =>
            `p-1 w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia hover:text-white ${
              isActive ? "bg-fuchsia text-white" : "bg-white"
            }`
          }
        >
          <MdOutlineComment className="w-[30px] h-[30px] lg:mr-2" />
          <span className="hidden lg:block">Mes reviews</span>
        </NavLink>
      </div>
    </div>
  );
}
