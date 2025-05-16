import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_blanc.png";
import toast, { Toaster } from "react-hot-toast";

export default function Validation() {
  const {
    validateAccount,
    notification,
    clearError,
    clearNotification,
    resendValidationEmail,
    pendingAccount,
  } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    // Nettoyer l'effet lors du démontage du composant
    return () => {
      setErrorShown(false);
      setLocalError(null);
    };
  }, []);

  useEffect(() => {
    if (!token) return;

    // Vérifier si une erreur a déjà été affichée pour ce token
    // Cette condition empêche les appels récursifs
    if (errorShown) {
      console.log(
        "Validation déjà tentée et échouée, pas de nouvelle tentative"
      );
      return;
    }

    const validateUserAccount = async () => {
      console.log("Tentative de validation avec token:", token);
      setLoading(true);
      clearError();
      clearNotification();

      // Effacer tous les toasts existants pour éviter la confusion
      toast.dismiss();

      try {
        await validateAccount(token);
        setValidated(true);

        toast.custom(
          () => (
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
              <div className='w-1.5 bg-yellow-400'></div>
              <div className='flex-1 p-4'>
                <div className='flex'>
                  <div className='flex-1'>
                    <p className='font-bold text-gray-900 dark:text-white'>
                      Validation réussie
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      Votre compte a été validé avec succès ! Redirection en
                      cours...
                    </p>
                  </div>

                  <button
                    onClick={() => toast.dismiss()}
                    className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'>
                    ×
                  </button>
                </div>
              </div>
            </div>
          ),
          { duration: 3000, id: "validation-success-toast" }
        );

        // Rediriger vers la page de connexion après validation réussie
        setTimeout(() => {
          navigate("/connexion");
        }, 3000);
      } catch (err) {
        console.error("Erreur de validation:", err);
        // Marquer comme erreur traitée pour éviter les appels récursifs
        setErrorShown(true);
        setLocalError(err.message || "Token de validation invalide ou expiré");

        toast.custom(
          () => (
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
              <div className='w-1.5 bg-red-500'></div>
              <div className='flex-1 p-4'>
                <div className='flex'>
                  <div className='flex-1'>
                    <p className='font-bold text-gray-900 dark:text-white'>
                      Erreur de validation
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      {err.message || "Token de validation invalide ou expiré"}
                    </p>
                    {pendingAccount && (
                      <button
                        onClick={() => handleResendEmail()}
                        className='mt-4 px-3 py-1.5 text-white text-xs font-medium rounded-md bg-[#E71CA5] hover:opacity-90'>
                        Renvoyer l'email de validation
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => toast.dismiss()}
                    className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'>
                    ×
                  </button>
                </div>
              </div>
            </div>
          ),
          { duration: 8000, id: "validation-error-toast" }
        );
      } finally {
        setLoading(false);
      }
    };

    validateUserAccount();
  }, [
    token,
    validateAccount,
    navigate,
    clearError,
    clearNotification,
    errorShown,
    pendingAccount,
  ]);

  const handleResendEmail = async () => {
    setResending(true);
    try {
      const emailToUse = pendingAccount || searchParams.get("email");
      if (!emailToUse) {
        toast.custom(
          () => (
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
              <div className='w-1.5 bg-red-500'></div>
              <div className='flex-1 p-4'>
                <div className='flex'>
                  <div className='flex-1'>
                    <p className='font-bold text-gray-900 dark:text-white'>
                      Erreur
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      Aucune adresse email fournie pour le renvoi
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss()}
                    className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'>
                    ×
                  </button>
                </div>
              </div>
            </div>
          ),
          { duration: 5000, id: "no-email-toast" }
        );
        return;
      }

      await resendValidationEmail(emailToUse);

      toast.custom(
        () => (
          <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
            <div className='w-1.5 bg-yellow-400'></div>
            <div className='flex-1 p-4'>
              <div className='flex'>
                <div className='flex-1'>
                  <p className='font-bold text-gray-900 dark:text-white'>
                    Email envoyé
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                    Un nouvel email de validation a été envoyé à votre adresse{" "}
                    {emailToUse}
                  </p>
                  <button
                    onClick={() => toast.dismiss()}
                    className='mt-4 px-3 py-1.5 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    Fermer
                  </button>
                </div>

                <button
                  onClick={() => toast.dismiss()}
                  className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'>
                  ×
                </button>
              </div>
            </div>
          </div>
        ),
        { duration: 8000, id: "email-sent-toast" }
      );
    } catch (err) {
      console.error("Erreur lors du renvoi de l'email:", err);
      toast.custom(
        () => (
          <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
            <div className='w-1.5 bg-red-500'></div>
            <div className='flex-1 p-4'>
              <div className='flex'>
                <div className='flex-1'>
                  <p className='font-bold text-gray-900 dark:text-white'>
                    Erreur
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                    {err.message || "Erreur lors du renvoi de l'email"}
                  </p>
                </div>
                <button
                  onClick={() => toast.dismiss()}
                  className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'>
                  ×
                </button>
              </div>
            </div>
          </div>
        ),
        { duration: 5000, id: "email-error-toast" }
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
      <Toaster position='top-center' />
      <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center'>
        <div className='mb-6 flex justify-center'>
          <img
            src={logo}
            alt='CineGuide'
            className='h-12 max-w-full object-contain dark:hidden'
          />
          <img
            src={logoWhite}
            alt='CineGuide'
            className='h-12 max-w-full object-contain hidden dark:block'
          />
        </div>

        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-6'>
          Validation de votre compte
        </h2>

        {loading && (
          <div className='flex flex-col items-center mb-6'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500'></div>
            <p className='text-gray-600 dark:text-gray-300 mt-4'>
              Validation de votre compte en cours...
            </p>
          </div>
        )}

        {localError && !loading && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
            <p>{localError}</p>
            <div className='mt-4 flex flex-col gap-2'>
              <button
                onClick={handleResendEmail}
                disabled={resending || !pendingAccount}
                className='w-full p-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
                {resending
                  ? "Envoi en cours..."
                  : "Renvoyer l'email de validation"}
              </button>
              <Link
                to='/inscription'
                className='text-fuchsia-600 dark:text-fuchsia-400 hover:underline'>
                Retour à l'inscription
              </Link>
            </div>
          </div>
        )}

        {notification && !loading && !localError && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6'>
            <p>{notification}</p>
            <p className='mt-2 text-sm'>
              {validated ? "Redirection automatique dans 3 secondes..." : ""}
            </p>
          </div>
        )}

        {!token && !loading && !localError && (
          <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6'>
            <p>Aucun token de validation n'a été fourni.</p>
            <p className='mt-2'>
              Si vous avez reçu un email de validation, veuillez cliquer sur le
              lien contenu dans celui-ci.
            </p>
            <div className='mt-4 flex flex-col gap-2'>
              <button
                onClick={handleResendEmail}
                disabled={resending || !pendingAccount}
                className='w-full p-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
                {resending
                  ? "Envoi en cours..."
                  : "Renvoyer l'email de validation"}
              </button>
              <div className='flex justify-center gap-4 mt-2'>
                <Link
                  to='/connexion'
                  className='text-fuchsia-600 dark:text-fuchsia-400 hover:underline'>
                  Se connecter
                </Link>
                <span className='text-gray-500'>|</span>
                <Link
                  to='/inscription'
                  className='text-fuchsia-600 dark:text-fuchsia-400 hover:underline'>
                  S'inscrire
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
