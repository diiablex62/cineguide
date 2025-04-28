import React from "react";
import { LuUserRound } from "react-icons/lu";

import { CiViewList } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineComment } from "react-icons/md";
import { NavLink } from "react-router-dom";
export default function ProfilNav() {
  return (
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
  );
}
