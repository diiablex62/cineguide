import React, { useContext } from "react";
import { AuthContext } from "../../../components/providers/AuthProvider";
export default function ProfilForm() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <form>
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="font-bold mb-2">
            Nom :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="text"
            id="name"
            value={user.lastname}
          />
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="name" className="font-bold mb-2">
            Prenom :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="text"
            id="name"
            value={user.firstname}
          />
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="name" className="font-bold mb-2">
            Email :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="email"
            id="name"
            value={user.email}
          />
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="name" className="font-bold mb-2">
            Adresse :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="text"
            id="name"
            value={user.adress}
          />
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="name" className="font-bold mb-2">
            Ville :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="text"
            id="name"
            value={user.city}
          />
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="name" className="font-bold mb-2">
            Code postal :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="text"
            id="name"
            value={user.postalCode}
          />
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="name" className="font-bold mb-2">
            Complement :
          </label>
          <input
            className="text-black border px-3 py-3"
            type="text"
            id="name"
            value={user.complement}
          />
        </div>
        <div className="flex justify-center">
          <button className="italic bg-fuchsia text-white px-4 py-1 rounded">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}
