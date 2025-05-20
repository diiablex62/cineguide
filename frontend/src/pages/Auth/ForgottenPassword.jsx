import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as authAPI from "../../apis/auth.api";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const schema = yup.object({
    email: yup
      .string()
      .required("L'email est obligatoire")
      .email("Veuillez entrer un email valide"),
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
      setError(null);
      console.log("Envoi de la demande de réinitialisation pour:", data.email);

      const response = await authAPI.forgotPassword(data.email);
      console.log("Réponse:", response);

      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation:", error);
      setError(
        error.message ||
          "Une erreur est survenue lors de l'envoi de l'email de réinitialisation"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            CinéGuide
          </h1>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
            Mot de passe oublié
          </h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            Entrez votre adresse e-mail pour recevoir un lien de
            réinitialisation
          </p>
        </div>

        {isSuccess ? (
          <div className='bg-green-50 border border-green-200 rounded-md p-6 text-center'>
            <div className='flex flex-col items-center'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4'>
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
              <h3 className='text-lg font-medium text-green-800 mb-2'>
                Email envoyé avec succès !
              </h3>
              <p className='text-sm text-green-700 mb-4'>
                Si votre email existe dans notre base de données, un lien de
                réinitialisation a été envoyé. Veuillez vérifier votre boîte de
                réception.
              </p>
              <div className='flex space-x-4 mt-2'>
                <button
                  onClick={() => navigate("/connexion")}
                  className='px-4 py-2 bg-fuchsia text-white rounded hover:bg-fuchsia-700 transition-colors'>
                  Retour à la connexion
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-4'>
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
                    <p className='text-sm text-red-800'>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Adresse e-mail
              </label>
              <input
                id='email'
                type='email'
                {...register("email")}
                className='block w-full px-3 py-2 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-fuchsia'
                placeholder='votre@email.com'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                {isLoading
                  ? "Envoi en cours..."
                  : "Envoyer le lien de réinitialisation"}
              </button>
            </div>

            <div className='text-center mt-4'>
              <Link
                to='/connexion'
                className='text-sm text-fuchsia hover:text-fuchsia-700 transition-colors'>
                Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
