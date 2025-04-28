import React, { useContext, useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { ProfilContext } from "../../../context/ProfilContext";
import Pagination from "../../../components/pagination/Pagination";
import ModalAbo from "../../../components/modal-abo/modalAbo";
import ModalPassword from "../../../components/modalPassword/ModalPassword";
import { IoMdClose } from "react-icons/io";
export default function ProfilUtils() {
  const { Facture } = useContext(ProfilContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedFactures = Facture.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="mt-4">
      <div className="border flex flex-col items-center py-6">
        <h2 className="font-medium text-xl">Mon abonnement</h2>
        <p className="mt-3 mb-3">Aucun</p>
        <ModalAbo></ModalAbo>
      </div>
      <div className="flex flex-col items-center mt-4 mb-2 border p-3">
        <h2 className="font-medium text-xl mt-2 mb-2">Mes factures</h2>
        {selectedFactures.map((fac) => (
          <div
            key={fac.id}
            className="border flex flex-col items-center py-6 w-full mb-3"
          >
            <p className="italic">Du {fac.date_debut}</p>
            <p className="italic">au</p>
            <p className="italic">Du {fac.date_fin}</p>
            <button className="italic flex items-center mt-3 cursor-pointer">
              <LiaFileInvoiceDollarSolid className="mr-2" />
              Telecharger
            </button>
          </div>
        ))}
        <Pagination
          totalItems={Facture.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="flex flex-col items-center mt-4 mb-2 border p-3">
        <p>Changer de mot de passe</p>
        <button
          onClick={() => setModalOpen(true)}
          className="text-white mt-4 py-2 px-4 w-[150px] bg-fuchsia cursor-pointer"
        >
          Modifier
        </button>
      </div>
      <ModalPassword isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex justify-between">
          <h2 className="underline">Changer de mot de passe ?</h2>
          <button
            onClick={() => setModalOpen(false)}
            className=" cursor-pointer text-2xl"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="mt-10 py-5 px-2 flex flex-col items-center">
          <h2>Envoyer un lien de réinitialisation par email ?</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="px-10 cursor-pointer mt-8 bg-fuchsia text-white h-[40px]"
          >
            Envoyer
          </button>
        </div>
      </ModalPassword>
    </div>
  );
}
