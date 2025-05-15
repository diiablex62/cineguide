import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_blanc.png";
import toast, { Toaster } from "react-hot-toast";

export default function Validation() {
  const {
    validateAccount,
    error,
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

  useEffect(() => {
    const validateUserAccount = async () => {
      if (!token) return;

      setLoading(true);
      clearError();
      clearNotification();

      try {
        await validateAccount(token);
        setValidated(true);
        toast.success(
          "Votre compte a été validé avec succès ! Redirection en cours..."
        );
        // Redirection automatique après 3 secondes si validation réussie
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.error("Erreur de validation:", err);
        toast.error(err.message || "Erreur lors de la validation du compte");
      } finally {
        setLoading(false);
      }
    };

    validateUserAccount();
  }, [token, validateAccount, navigate, clearError, clearNotification]);

  const handleResendEmail = async () => {
    setResending(true);
    try {
      const emailToUse = pendingAccount || searchParams.get("email");
      if (!emailToUse) {
        toast.error("Aucune adresse email fournie pour le renvoi");
        return;
      }

      await resendValidationEmail(emailToUse);
      toast.success(
        "Un nouvel email de validation a été envoyé à votre adresse"
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

        {error && !loading && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
            <p>{error}</p>
            <div className='mt-4 flex flex-col gap-2'>
              <button
                onClick={handleResendEmail}
                disabled={resending}
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

        {notification && !loading && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6'>
            <p>{notification}</p>
            <p className='mt-2 text-sm'>
              {validated ? "Redirection automatique dans 3 secondes..." : ""}
            </p>
          </div>
        )}

        {!token && !loading && (
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

        <div className='mt-6'>
          <Link
            to='/'
            className='text-gray-500 dark:text-gray-400 hover:underline'>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
