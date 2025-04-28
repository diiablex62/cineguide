import React, { useContext } from "react";
import ProfilForm from "./components/ProfilForm";
import ProfilUtils from "./components/ProfilUtils";
import { AuthContext } from "../../components/providers/AuthProvider";
import { FaPen } from "react-icons/fa";
import ProfilNav from "./components/ProfilNav";

export default function profil() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col p-5 md:flex-row">
      <div className="md:w-4/6 flex flex-col p-4">
        <div className="flex items-end">
          <img src={user.avatar} alt="" />
          <p className="font-bold text-4xl mb-3">
            {user.firstname}.{user.lastname.charAt(0)}
          </p>
        </div>
        <div>
          <p className="italic my-3">{user.textPerso}</p>
          <div className="flex justify-end">
            <button className="border rounded px-2 flex items-center cursor-pointer">
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
    </div>
  );
}
