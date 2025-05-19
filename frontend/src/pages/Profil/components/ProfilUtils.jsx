import React, { useContext, useEffect, useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { ProfilContext } from "../../../context/ProfilContext";
import { AuthContext } from "../../../context/AuthContext";
import ModalPassword from "../../../components/modalPassword/ModalPassword";
import { IoMdClose } from "react-icons/io";
import * as authAPI from "../../../apis/auth.api";
import { useNavigate } from "react-router-dom";

export default function ProfilUtils() {
  const contextValue = useContext(ProfilContext);
  const { Facture = [] } = contextValue || {};
  const navigate = useNavigate();
  const { abonnement, getUserSubscription, userId } = useContext(AuthContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await authAPI.forgotPassword(user.email);
      console.log("Réponse:", response);
      setIsSuccess(true);
      setIsLoading(false);
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

  const handleOpenAbonnementModal = () => {
    navigate("/abonnement");
  };

  useEffect(() => {
    getUserSubscription(userId);
  }, []);

  return (
    <div className="space-y-4">
      {/* Section Abonnement */}
      <div className="border border-gray-300 dark:border-gray-700 p-4">
        <h2 className="text-center font-medium mb-2">Mon abonnement</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          {abonnement ? abonnement.type : "Aucun"}
        </p>
        <div className="flex justify-center">
          {!abonnement && (
            <button
              onClick={handleOpenAbonnementModal}
              className="bg-fuchsia text-white text-sm px-4 py-1.5 hover:bg-opacity-90 transition-colors"
            >
              S'abonner ?
            </button>
          )}
        </div>
      </div>

      {/* Section Factures */}
      <div className="border border-gray-300 dark:border-gray-700 p-4">
        <h2 className="text-center font-medium mb-2">Mes factures</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Aucune facture
        </p>
      </div>

      {/* Section Mot de passe */}
      <div className="border border-gray-300 dark:border-gray-700 p-4">
        <h2 className="text-center font-medium mb-2">
          Changer de mot de passe
        </h2>
        <div className="flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-fuchsia text-white text-sm px-4 py-1.5 hover:bg-opacity-90 transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>

      {/* Modal de changement de mot de passe */}
      <ModalPassword isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-medium">Changer de mot de passe</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="py-4 px-2">
          {isSuccess ? (
            <div className="bg-green-100 text-green-800 p-3 text-center text-sm">
              <p>
                Un email de réinitialisation a été envoyé à votre adresse email.
              </p>
            </div>
          ) : isError ? (
            <div className="bg-red-100 text-red-800 p-3 text-center text-sm">
              <p>{errorMessage}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-sm">
                Un email sera envoyé à votre adresse pour réinitialiser votre
                mot de passe.
              </p>
              <button
                onClick={handleSendResetEmail}
                disabled={isLoading}
                className="bg-fuchsia text-white px-4 py-1.5 disabled:opacity-50 text-sm"
              >
                {isLoading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          )}
        </div>
      </ModalPassword>
    </div>
  );
}
