import React from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

export default function ProfilUtils() {
  return (
    <div className="mt-4">
      <div className="border flex flex-col items-center py-6">
        <h2 className="font-medium text-xl">Mon abonnement</h2>
        <p className="mt-3">Depuis le 15/05/2021</p>
        <p className="mb-3">10€ /mois</p>
        <button className="italic bg-fuchsia text-white px-4 py-1 rounded">
          Se desabonner
        </button>
      </div>
      <div className="flex flex-col items-center mt-4 mb-2 border p-3">
        <h2 className="font-medium text-xl mt-2 mb-2">Mes factures</h2>
        <div className="border flex flex-col items-center py-6 w-full mb-3">
          <p className="italic">Du 21/02/2021</p>
          <p className="italic">au</p>
          <p className="italic">Du 21/02/2021</p>
          <button className="italic flex items-center mt-3 cursor-pointer">
            <LiaFileInvoiceDollarSolid className="mr-2" />
            Telecharger
          </button>
        </div>
        <div className="border flex flex-col items-center py-6 w-full mb-3">
          <p className="italic">Du 21/02/2021</p>
          <p className="italic">au</p>
          <p className="italic">Du 21/02/2021</p>
          <button className="italic flex items-center mt-3 cursor-pointer">
            <LiaFileInvoiceDollarSolid className="mr-2" />
            Telecharger
          </button>
        </div>
        <div className="border flex flex-col items-center py-6 w-full mb-3">
          <p className="italic">Du 21/02/2021</p>
          <p className="italic">au</p>
          <p className="italic">Du 21/02/2021</p>
          <button className="italic flex items-center mt-3 cursor-pointer">
            <LiaFileInvoiceDollarSolid className="mr-2" />
            Telecharger
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 mb-2 border p-3">
        <p>Changer de mot de passe</p>
        <button className="text-white mt-4 py-2 px-4 w-[150px] bg-fuchsia cursor-pointer">
          Modifier
        </button>
      </div>
    </div>
  );
}
