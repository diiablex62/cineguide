import React, { useContext, useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { ProfilContext } from "../../../context/ProfilContext";
import { AuthContext } from "../../../context/AuthContext";
import Pagination from "../../../components/pagination/Pagination";
import ModalAbo from "../../../components/modal-abo/modalAbo";
import ModalPassword from "../../../components/modalPassword/ModalPassword";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import * as authAPI from "../../../apis/auth.api";

export default function ProfilUtils() {
  console.log("Rendu de ProfilUtils");
  const contextValue = useContext(ProfilContext);
  const { user } = useContext(AuthContext);
  console.log("ProfilContext:", contextValue);

  // Gestion du cas où le contexte ou Facture serait null
  const { Facture = [] } = contextValue || {};

  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedFactures = Facture.slice(startIndex, startIndex + itemsPerPage);

  const handleSendResetEmail = async () => {
    if (!user || !user.email) {
      setIsError(true);
      setErrorMessage(
        "Impossible de récupérer votre email. Veuillez vous reconnecter."
      );
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      console.log("Envoi d'email de réinitialisation pour:", user.email);

      // Utilisation de notre API d'authentification
      const response = await authAPI.forgotPassword(user.email);

      console.log("Réponse:", response);
      setIsSuccess(true);
      setIsLoading(false);
      // Fermer automatiquement après 3 secondes
      setTimeout(() => {
        setModalOpen(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(
        error.message ||
          "Une erreur est survenue lors de l'envoi de l'email de réinitialisation"
      );
    }
  };

  return (
    <div className='mt-4'>
      <div className='border flex flex-col items-center py-6'>
        <h2 className='font-medium text-xl'>Mon abonnement</h2>
        <p className='mt-3 mb-3'>Aucun</p>
        <ModalAbo></ModalAbo>
      </div>
      <div className='flex flex-col items-center mt-4 mb-2 border p-3'>
        <h2 className='font-medium text-xl mt-2 mb-2'>Mes factures</h2>
        {selectedFactures.map((fac) => (
          <div
            key={fac.id}
            className='border flex flex-col items-center py-6 w-full mb-3'>
            <p className='italic'>Du {fac.date_debut}</p>
            <p className='italic'>au</p>
            <p className='italic'>Du {fac.date_fin}</p>
            <button className='italic flex items-center mt-3 cursor-pointer'>
              <LiaFileInvoiceDollarSolid className='mr-2' />
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
      <div className='flex flex-col items-center mt-4 mb-2 border p-3'>
        <p>Changer de mot de passe</p>
        <button
          onClick={() => setModalOpen(true)}
          className='text-white mt-4 py-2 px-4 w-[150px] bg-fuchsia cursor-pointer'>
          Modifier
        </button>
      </div>
      <ModalPassword isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className='flex justify-between'>
          <h2 className='underline'>Changer de mot de passe ?</h2>
          <button
            onClick={() => setModalOpen(false)}
            className='cursor-pointer text-2xl'>
            <IoMdClose />
          </button>
        </div>
        <div className='mt-10 py-5 px-2 flex flex-col items-center'>
          {isSuccess ? (
            <div className='bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-4 rounded mb-4 text-center'>
              <p>
                Un email de réinitialisation a été envoyé à votre adresse email.
                Vérifiez votre boîte de réception.
              </p>
            </div>
          ) : isError ? (
            <div className='bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 p-4 rounded mb-4 text-center'>
              <p>{errorMessage}</p>
            </div>
          ) : (
            <>
              <h2>Envoyer un lien de réinitialisation par email ?</h2>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400 text-center'>
                Un email sera envoyé à l'adresse {user?.email}. Cliquez sur le
                lien dans l'email pour réinitialiser votre mot de passe.
              </p>
              <button
                onClick={handleSendResetEmail}
                disabled={isLoading}
                className='px-10 cursor-pointer mt-8 bg-fuchsia text-white h-[40px] disabled:opacity-50 disabled:cursor-not-allowed'>
                {isLoading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </>
          )}
        </div>
      </ModalPassword>
    </div>
  );
}
