import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_blanc.png";

export default function Validation() {
  const {
    validateAccount,
    error,
    notification,
    clearError,
    clearNotification,
  } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const validateUserAccount = async () => {
      if (!token) return;

      setLoading(true);
      clearError();
      clearNotification();

      try {
        await validateAccount(token);
        setValidated(true);
        // Redirection automatique après 3 secondes si validation réussie
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.error("Erreur de validation:", err);
      } finally {
        setLoading(false);
      }
    };

    validateUserAccount();
  }, [token, validateAccount, navigate, clearError, clearNotification]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
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
            <div className='mt-4'>
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
            <div className='mt-4'>
              <Link
                to='/connexion'
                className='text-fuchsia-600 dark:text-fuchsia-400 hover:underline'>
                Se connecter
              </Link>
              <span className='mx-2'>|</span>
              <Link
                to='/inscription'
                className='text-fuchsia-600 dark:text-fuchsia-400 hover:underline'>
                S'inscrire
              </Link>
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
