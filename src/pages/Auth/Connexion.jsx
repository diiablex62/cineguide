import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../components/providers/AuthProvider";
import GoogleIcon from "../../components/filtre/icone/google";

export default function Connexion() {
  const { login } = useContext(AuthContext);

  const schema = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Format de votre email est non valide"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Minimum 5 caractères")
      .max(10, "Maximum 10 caractères"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      {/* Section gauche */}
      <div className='w-full md:w-1/2 flex justify-center items-center bg-white dark:bg-[var(--color-fuchsia)]  md:bg-[var(--color-fuchsia)] text-black dark:text-white md:text-white'>
        <div className='bg-white dark:bg-black p-6 w-4/5 max-w-sm max-md:h-screen flex flex-col justify-center items-center border-0 dark:border dark:border-white'>
          {/* Logo en mobile */}
          <div className='mb-6 flex justify-center md:hidden'>
            <img
              src='/src/assets/logo.png'
              alt='CineGuide'
              className='h-12 dark:hidden'
            />
            <img
              src='/src/assets/logo_blanc.png'
              alt='CineGuide'
              className='h-12 hidden dark:block'
            />
          </div>
          <a
            href='/'
            className='text-sm text-gray-500 dark:text-gray-400 hover:underline block text-start mb-10'>
            &lt; Retour vers la page d'accueil
          </a>
          <h2 className='text-center mb-4 text-2xl font-bold text-black dark:text-white'>
            SE CONNECTER
          </h2>
          <form
            className='flex flex-col gap-4 w-full'
            onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Email
              </label>
              <input
                {...register("email")}
                id='email'
                type='email'
                placeholder='Entrez votre email'
                className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
              />
              {errors.email && (
                <p className='text-red-500 dark:text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Mot de passe
              </label>
              <input
                {...register("password")}
                id='password'
                type='password'
                placeholder='Entrez votre mot de passe'
                className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
              />
              {errors.password && (
                <p className='text-red-500 dark:text-red-400'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
              Se connecter
            </button>
            <button
              type='button'
              className='w-full p-3 bg-white dark:bg-black text-[var(--color-fuchsia)] border border-[var(--color-fuchsia)] rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2'>
              <GoogleIcon className='h-5 w-5' /> Se connecter avec Google
            </button>
          </form>
          <p className='text-center mt-4 text-sm text-gray-700 dark:text-gray-300'>
            Pas encore inscrit ?{" "}
            <a
              href='/inscription'
              className='text-[var(--color-fuchsia)] underline'>
              S'inscrire
            </a>
          </p>
        </div>
      </div>

      {/* Section droite */}
      <div className='hidden md:flex w-1/2 justify-center items-center flex-col bg-white dark:bg-black '>
        <div className='mb-6'>
          <img
            src='/src/assets/logo.png'
            alt='CineGuide'
            className='h-12 dark:hidden'
          />
          <img
            src='/src/assets/logo_blanc.png'
            alt='CineGuide'
            className='h-12 hidden dark:block'
          />
        </div>
        <div className='w-4/5 flex flex-col items-center'>
          <h1 className='text-6xl font-light text-[var(--color-fuchsia)] dark:text-[var(--color-fuchsia)]'>
            Toutes vos plateformes de streaming au
            <br /> même endroit
          </h1>
        </div>
      </div>
    </div>
  );
}
