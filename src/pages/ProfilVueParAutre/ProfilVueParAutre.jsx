import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import NavProfil from "./components/NavProfil";
import { Outlet } from "react-router-dom";

export default function ProfilVueParAutre() {
  const { user } = useContext(AuthContext);
  const [citation, setCitation] = useState(user.textPerso);
  return (
    <div className="flex flex-col p-5  dark:bg-black dark:text-white dark:border-white">
      <div className="flex items-center mb-2">
        <div className="w-50 h-50">
          <img src={user.avatar} alt="" className="w-full h-full" />
        </div>
        <div className="flex-col items-center justify-start">
          <p className="font-bold text-4xl mb-1">
            {user.firstname}.{user.lastname.charAt(0)}
          </p>
          <p className="italic ">{citation}</p>
        </div>
      </div>
      <NavProfil />
      <Outlet />
    </div>
  );
}
