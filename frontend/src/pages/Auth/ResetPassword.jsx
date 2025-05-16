import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as authAPI from "../../apis/auth.api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Afficher le token dans la console pour le débogage
  console.log("Token reçu dans l'URL:", token);

  // Vérifier la validité du token au chargement
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("Vérification de la validité du token:", token);
        // Faire une vérification simple du token
        if (!token || token.length < 32) {
          setIsValidToken(false);
          setIsError(true);
          setErrorMessage(
            "Le lien de réinitialisation est invalide ou a expiré"
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        setIsValidToken(false);
        setIsError(true);
        setErrorMessage(
          "Une erreur est survenue lors de la vérification du lien"
        );
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const schema = yup.object({
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
      ),
    confirmPassword: yup
      .string()
      .required("La confirmation du mot de passe est obligatoire")
      .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log(
        "Envoi de la demande de réinitialisation avec le token:",
        token
      );

      // Utilisation de notre API d'authentification
      const response = await authAPI.resetPassword(token, data.password);

      console.log("Réponse:", response);
      setIsSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/connexion");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(
        error.message ||
          "Une erreur est survenue lors de la réinitialisation du mot de passe"
      );
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
        <div className='w-16 h-16 border-4 border-t-4 border-fuchsia rounded-full animate-spin'></div>
        <p className='ml-4 text-lg text-fuchsia'>Chargement...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            CinéGuide
          </h1>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
            Réinitialisation du mot de passe
          </h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            Veuillez créer un nouveau mot de passe
          </p>
        </div>

        {isSuccess ? (
          <div className='rounded-md bg-green-50 p-6 text-center'>
            <div className='flex flex-col items-center'>
              <div className='h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                <svg
                  className='h-8 w-8 text-green-600'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='text-lg font-medium text-green-800 mb-2'>
                Mot de passe réinitialisé avec succès !
              </p>
              <p className='text-sm text-green-700'>
                Vous allez être redirigé vers la page de connexion dans quelques
                secondes.
              </p>
              <button
                onClick={() => navigate("/connexion")}
                className='mt-4 px-4 py-2 bg-fuchsia text-white rounded hover:bg-fuchsia-700 transition-colors'>
                Aller à la connexion
              </button>
            </div>
          </div>
        ) : !isValidToken ? (
          <div className='rounded-md bg-red-50 p-6 text-center'>
            <div className='flex flex-col items-center'>
              <div className='h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                <svg
                  className='h-8 w-8 text-red-600'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='text-lg font-medium text-red-800 mb-2'>
                {errorMessage}
              </p>
              <p className='text-sm text-red-700 mb-4'>
                Le lien que vous avez utilisé est invalide ou a expiré.
              </p>
              <div className='flex space-x-4'>
                <button
                  onClick={() => navigate("/")}
                  className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'>
                  Retour à l'accueil
                </button>
                <button
                  onClick={() => navigate("/connexion")}
                  className='px-4 py-2 bg-fuchsia text-white rounded hover:bg-fuchsia-700 transition-colors'>
                  Connexion
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {isError && (
              <div className='rounded-md bg-red-50 p-4 mb-6'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-5 w-5 text-red-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-red-800'>
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Nouveau mot de passe
                </label>
                <input
                  id='password'
                  type='password'
                  {...register("password")}
                  className='block w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-fuchsia'
                />
                {errors.password && (
                  <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Confirmer le mot de passe
                </label>
                <input
                  id='confirmPassword'
                  type='password'
                  {...register("confirmPassword")}
                  className='block w-full dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-fuchsia'
                />
                {errors.confirmPassword && (
                  <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className='mt-8'>
              <button
                type='submit'
                disabled={isLoading}
                className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                {isLoading
                  ? "Traitement en cours..."
                  : "Réinitialiser le mot de passe"}
              </button>
            </div>

            <div className='mt-4 text-center'>
              <button
                type='button'
                onClick={() => navigate("/connexion")}
                className='text-sm text-fuchsia hover:text-fuchsia-700 transition-colors'>
                Retour à la connexion
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
