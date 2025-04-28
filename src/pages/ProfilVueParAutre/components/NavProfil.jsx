import React from "react";
import { CiViewList } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineComment } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function NavProfil() {
  return (
    <div className="my-4 flex justify-center md:justify-start gap-10 mb-6">
      <NavLink
        to={""}
        className="bg-white p-1  w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia  hover:text-white "
      >
        <CiViewList className=" w-[30px] h-[30px] lg:mr-2" />
        <span className="hidden lg:block ">Ma liste</span>
      </NavLink>
      <NavLink
        to="activite"
        className="bg-white  p-1  w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start  flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia  hover:text-white"
      >
        <ImStatsBars className=" w-[30px] h-[30px] lg:mr-2" />
        <span className="hidden lg:block ">Son activité</span>
      </NavLink>

      <NavLink
        to={"review"}
        className="bg-white p-1  w-[50px] h-[50px] lg:w-auto lg:px-5 lg:justify-start flex justify-center items-center border cursor-pointer text-black hover:bg-fuchsia  hover:text-white"
      >
        <MdOutlineComment className="w-[30px] h-[30px] lg:mr-2" />
        <span className="hidden lg:block"> Reviews</span>
      </NavLink>
    </div>
  );
}
