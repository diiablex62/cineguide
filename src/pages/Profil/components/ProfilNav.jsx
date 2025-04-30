import React, { useContext } from "react";
import { LuUserRound } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineComment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import { FaPen } from "react-icons/fa";
export default function ProfilNav() {
  const { user } = useContext(AuthContext);
  const [citation, setCitation] = useState(user.textPerso);
  return (
    <>
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
    </>
  );
}
