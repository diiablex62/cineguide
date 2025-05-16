import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_blanc.png";
import toast, { Toaster } from "react-hot-toast";

export default function Validation() {
  const {
    validateAccount,
    clearError,
    clearNotification,
    resendValidationEmail,
    pendingAccount,
    isLoggedIn,
  } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [resending, setResending] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [validationData, setValidationData] = useState(null);
  const validationSuccessful = useRef(false);
  const isInitialLoad = useRef(true);
  const successToastShown = useRef(false);

  // Effet pour nettoyer les toasts
  useEffect(() => {
    console.log("Nettoyage initial de tous les toasts");
    toast.remove();
    console.log("Compte en attente de validation:", pendingAccount);
    console.log("Chargement initial avec token:", token);

    isInitialLoad.current = false;

    return () => {
      setLocalError(null);
    };
  }, [pendingAccount, token]);

  // Effet pour gérer la validation
  useEffect(() => {
    if (!token) return;

    if (validationAttempted) {
      console.log("Validation déjà tentée");
      return;
    }

    const validateUserAccount = async () => {
      console.log("Tentative de validation avec token:", token);
      setLoading(true);
      setValidationAttempted(true);
      clearError();
      clearNotification();
      toast.remove();

      try {
        const result = await validateAccount(token);
        console.log("Validation réussie:", result);
        validationSuccessful.current = true;

        if (result && result.user && result.user.email) {
          setValidationData({
            email: result.user.email,
            userId: result.user._id,
            token: result.token,
          });
        }

        setValidated(true);
        toast.remove();

        setTimeout(() => {
          if (!successToastShown.current) {
            toast.success("Validation effectuée ! Veuillez vous connecter.", {
              id: "validation-success-toast",
              duration: 5000,
            });
            successToastShown.current = true;
          }
        }, 100);

        setTimeout(() => {
          navigate("/connexion");
        }, 3000);
      } catch (err) {
        console.error("Erreur lors de la validation:", err);

        if (!validationSuccessful.current) {
          setLocalError(
            err.message || "Token de validation invalide ou expiré"
          );

          if (!isLoggedIn && !validationSuccessful.current) {
            setTimeout(() => {
              toast.error(
                err.message || "Token de validation invalide ou expiré",
                {
                  id: "validation-error-toast",
                  duration: 5000,
                }
              );
            }, 100);
          }
        }
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
    validationAttempted,
    isLoggedIn,
  ]);

  // Redirection après validation
  useEffect(() => {
    if (validated && validationData) {
      console.log("Compte validé, redirection vers connexion");
      toast.remove();

      const timer = setTimeout(() => {
        navigate("/connexion");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [validated, validationData, navigate]);

  const handleResendEmail = async () => {
    if (!pendingAccount) {
      toast.error("Aucune adresse email associée à votre compte");
      return;
    }

    setResending(true);
    try {
      await resendValidationEmail(pendingAccount);
      toast.success(
        `Un nouvel email de validation a été envoyé à ${pendingAccount}`
      );
    } catch (err) {
      console.error("Erreur lors du renvoi de l'email:", err);
      toast.error(err.message || "Erreur lors du renvoi de l'email");
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
            className='h-12 mx-auto dark:hidden'
          />
          <img
            src={logoWhite}
            alt='CineGuide'
            className='h-12 mx-auto hidden dark:block'
          />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          Validation de votre compte
        </h2>

        {loading ? (
          <div className='text-center py-4'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              Vérification du token de validation...
            </p>
          </div>
        ) : validated || validationSuccessful.current ? (
          <div className='bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 mb-4 text-left'>
            <p className='font-medium text-green-700 dark:text-green-300'>
              Compte validé avec succès !
            </p>
            <p className='text-sm text-green-600 dark:text-green-400 mt-1'>
              Redirection vers la page de connexion en cours...
            </p>
            <div className='mt-4 text-center'>
              <Link
                to='/connexion'
                className='inline-block px-4 py-2 bg-[var(--color-fuchsia)] text-white rounded-md hover:bg-[var(--color-fuchsia-hover)] transition-colors'>
                Aller à la page de connexion
              </Link>
            </div>
          </div>
        ) : localError && !validationSuccessful.current ? (
          <div className='bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-4 text-left'>
            <p className='font-medium text-red-700 dark:text-red-300'>
              Token de validation invalide ou expiré
            </p>
            <div className='mt-6 flex flex-col gap-3'>
              <button
                onClick={handleResendEmail}
                disabled={resending}
                className='w-full p-3 bg-[var(--color-fuchsia)] text-white font-medium rounded-md hover:bg-[var(--color-fuchsia-hover)] disabled:opacity-50 disabled:cursor-not-allowed'>
                {resending
                  ? "Envoi en cours..."
                  : "Renvoyer l'email de validation"}
              </button>
              <Link
                to='/connexion'
                className='w-full p-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-center'>
                Retour à la connexion
              </Link>
            </div>
          </div>
        ) : !token ? (
          <div>
            <div className='bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6 text-left'>
              <p className='font-medium text-blue-700 dark:text-blue-300'>
                Merci de vous être inscrit !
              </p>
              <p className='text-sm text-blue-600 dark:text-blue-400 mt-2'>
                Vous allez recevoir un email de confirmation pour valider votre
                compte. Veuillez vérifier votre boîte de réception et vos spams.
              </p>
              <p className='text-sm text-blue-600 dark:text-blue-400 mt-2'>
                {pendingAccount && (
                  <span>
                    Email associé à votre compte :{" "}
                    <strong>{pendingAccount}</strong>
                  </span>
                )}
              </p>
            </div>

            <div className='mt-6 flex flex-col gap-3'>
              <button
                onClick={handleResendEmail}
                disabled={resending}
                className='w-full p-3 bg-[var(--color-fuchsia)] text-white font-medium rounded-md hover:bg-[var(--color-fuchsia-hover)] disabled:opacity-50 disabled:cursor-not-allowed'>
                {resending
                  ? "Envoi en cours..."
                  : pendingAccount
                  ? `Renvoyer l'email de validation`
                  : "Renvoyer l'email de validation"}
              </button>
              <Link
                to='/connexion'
                className='w-full p-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-center'>
                Retour à la connexion
              </Link>
            </div>

            <div className='mt-5 pt-4 border-t border-gray-200 dark:border-gray-700'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Le lien de validation est valable pendant 60 minutes
              </p>
            </div>
          </div>
        ) : (
          <div className='text-gray-600 dark:text-gray-300 mb-6'>
            <p>Vérification du token de validation...</p>
          </div>
        )}
      </div>
    </div>
  );
}
