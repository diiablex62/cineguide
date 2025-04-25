import React from "react";
import { LuUserRound } from "react-icons/lu";

import { CiViewList } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineComment } from "react-icons/md";
export default function ProfilNav() {
  return (
    <div className="my-4 flex justify-center gap-10">
      <button className="bg-fuchsia hover:fuchsia-hover p-1  w-[50px] h-[50px] flex justify-center items-center border cursor-pointer">
        <LuUserRound className="text-white w-[30px] h-[30px]" />
      </button>
      <button className="bg-white  p-1  w-[50px] h-[50px] flex justify-center items-center border cursor-pointer">
        <ImStatsBars className="text-black w-[30px] h-[30px]" />
      </button>
      <button className="bg-whitep-1  w-[50px] h-[50px] flex justify-center items-center border cursor-pointer">
        <CiViewList className="text-black w-[30px] h-[30px]" />
      </button>
      <button className="bg-white p-1  w-[50px] h-[50px] flex justify-center items-center border cursor-pointer">
        <MdOutlineComment className="text-black w-[30px] h-[30px]" />
      </button>
    </div>
  );
}
