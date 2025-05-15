import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PendingAccountNotification() {
  const {
    pendingAccount,
    resendValidationEmail,
    error,
    notification,
    clearError,
    clearNotification,
  } = useContext(AuthContext);
  const [resending, setResending] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Si aucun compte en attente, ne rien afficher
  if (!pendingAccount || !showNotification) return null;

  const handleResendEmail = async () => {
    setResending(true);
    clearError();
    clearNotification();

    try {
      await resendValidationEmail(pendingAccount);
    } catch (err) {
      console.error("Erreur lors du renvoi de l'email:", err);
    } finally {
      setResending(false);
    }
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div className='fixed bottom-4 right-4 max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 border-l-4 border-yellow-500'>
      <div className='flex justify-between items-start'>
        <div className='flex-grow'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Validation de compte en attente
          </h3>
          <p className='text-gray-600 dark:text-gray-300 mt-1'>
            Votre compte <span className='font-medium'>{pendingAccount}</span>{" "}
            est en attente de validation. Veuillez vérifier votre boîte de
            réception et cliquer sur le lien de validation.
          </p>

          {error && (
            <div className='mt-2 text-sm text-red-600 dark:text-red-400'>
              {error}
            </div>
          )}

          {notification && (
            <div className='mt-2 text-sm text-green-600 dark:text-green-400'>
              {notification}
            </div>
          )}

          <div className='mt-3 flex flex-wrap gap-2'>
            <button
              onClick={handleResendEmail}
              disabled={resending}
              className='px-3 py-1.5 bg-fuchsia-600 text-white text-sm rounded hover:bg-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed'>
              {resending ? "Envoi en cours..." : "Renvoyer l'email"}
            </button>
            <button
              onClick={handleClose}
              className='px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600'>
              Fermer
            </button>
          </div>
        </div>
        <button
          onClick={handleClose}
          className='text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'>
          <span className='sr-only'>Fermer</span>
          <svg
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
