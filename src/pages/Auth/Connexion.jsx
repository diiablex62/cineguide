import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../components/providers/AuthProvider";
import GoogleIcon from "../../components/icone/google";

const EyeIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    imageRendering='optimizeQuality'
    fillRule='evenodd'
    clipRule='evenodd'
    viewBox='0 0 512 282.68'
    className='h-5 w-5'>
    <path
      fillRule='nonzero'
      d='M3.14 132.9c14.51-17.53 29.53-33.35 44.94-47.39 60.17-54.78 127.69-84 197.43-85.45 69.61-1.46 141.02 24.79 209.14 80.95 18.45 15.21 36.6 32.54 54.3 52 3.82 4.19 4.02 10.42.78 14.81-19.73 27.91-41.98 51.4-65.97 70.56-53.57 42.77-115.96 63.9-179.2 64.29-63.05.39-126.84-19.87-183.44-59.83-28.31-20-54.85-44.93-78.58-74.67-3.65-4.59-3.29-11.1.6-15.27zM256 83.24c32.09 0 58.1 26.01 58.1 58.1s-26.01 58.1-58.1 58.1-58.1-26.01-58.1-58.1c0-5.97.9-11.74 2.57-17.16 4.25 11.15 15.04 19.07 27.68 19.07 16.35 0 29.61-13.26 29.61-29.61 0-12.7-7.98-23.52-19.2-27.73 5.5-1.73 11.36-2.67 17.44-2.67zm107.24-33.52a141.453 141.453 0 0 1 23.1 37.7c6.92 16.67 10.74 34.9 10.74 53.92 0 19.03-3.82 37.26-10.73 53.94a141.479 141.479 0 0 1-30.6 45.8l-1.92 1.89c26.4-9.83 51.79-24.09 75.37-42.91 20.12-16.07 38.96-35.49 55.99-58.27-15-15.93-30.16-30.18-45.38-42.73-25.22-20.8-50.84-37.2-76.57-49.34zm-212.08 185.9c-10.65-11.81-19.33-25.44-25.5-40.32a140.518 140.518 0 0 1-10.74-53.96c0-19.01 3.81-37.22 10.72-53.87 6.85-16.52 16.75-31.46 28.96-44.1-31.5 13.33-61.97 33.25-90.76 59.44-12.7 11.57-25.04 24.3-36.95 38.17 20.74 24.71 43.54 45.64 67.69 62.71 18.19 12.84 37.15 23.5 56.58 31.93zM300.95 32.58c-13.78-5.71-28.98-8.88-44.94-8.88-15.94 0-31.12 3.17-44.93 8.9-14.34 5.95-27.32 14.73-38.23 25.64-10.88 10.89-19.64 23.85-25.6 38.2-5.71 13.79-8.88 28.97-8.88 44.9 0 15.96 3.17 31.17 8.9 44.98a117.654 117.654 0 0 0 25.58 38.19c10.86 10.84 23.84 19.6 38.24 25.57 13.8 5.72 28.98 8.88 44.92 8.88 15.95 0 31.15-3.17 44.96-8.88 14.36-5.93 27.32-14.7 38.2-25.57 10.88-10.88 19.64-23.84 25.57-38.16 5.72-13.85 8.89-29.05 8.89-45.01 0-15.95-3.17-31.14-8.89-44.95-5.93-14.37-14.69-27.33-25.57-38.21-10.86-10.86-23.84-19.63-38.22-25.6z'
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 122.879 79.699'
    className='h-5 w-5'>
    <path d='M0.955,37.326c2.922-3.528,5.981-6.739,9.151-9.625C24.441,14.654,41.462,7.684,59.01,7.334 c6.561-0.131,13.185,0.665,19.757,2.416l-5.904,5.904c-4.581-0.916-9.168-1.324-13.714-1.233 c-15.811,0.316-31.215,6.657-44.262,18.533l0,0c-2.324,2.115-4.562,4.39-6.702,6.82c4.071,4.721,8.6,8.801,13.452,12.227 c2.988,2.111,6.097,3.973,9.296,5.586l-5.262,5.262c-2.782-1.504-5.494-3.184-8.12-5.039c-6.143-4.338-11.813-9.629-16.78-15.85 C-0.338,40.563-0.228,38.59,0.955,37.326L0.955,37.326L0.955,37.326z M96.03,0l5.893,5.893L28.119,79.699l-5.894-5.895L96.03,0 L96.03,0z M97.72,17.609c4.423,2.527,8.767,5.528,12.994,9.014c3.877,3.196,7.635,6.773,11.24,10.735 c1.163,1.277,1.22,3.171,0.226,4.507c-4.131,5.834-8.876,10.816-14.069,14.963C95.119,67.199,79.338,72.305,63.352,72.377 c-6.114,0.027-9.798-3.141-15.825-4.576l3.545-3.543c4.065,0.705,8.167,1.049,12.252,1.031c14.421-0.064,28.653-4.668,40.366-14.02 c3.998-3.191,7.706-6.939,11.028-11.254c-2.787-2.905-5.627-5.543-8.508-7.918c-4.455-3.673-9.042-6.759-13.707-9.273L97.72,17.609 L97.72,17.609z M61.44,18.143c2.664,0,5.216,0.481,7.576,1.359l-5.689,5.689c-0.619-0.079-1.248-0.119-1.886-0.119 c-4.081,0-7.775,1.654-10.449,4.328c-2.674,2.674-4.328,6.369-4.328,10.45c0,0.639,0.04,1.268,0.119,1.885l-5.689,5.691 c-0.879-2.359-1.359-4.912-1.359-7.576c0-5.995,2.43-11.42,6.358-15.349C50.02,20.572,55.446,18.143,61.44,18.143L61.44,18.143z M82.113,33.216c0.67,2.09,1.032,4.32,1.032,6.634c0,5.994-2.43,11.42-6.357,15.348c-3.929,3.928-9.355,6.357-15.348,6.357 c-2.313,0-4.542-0.361-6.633-1.033l5.914-5.914c0.238,0.012,0.478,0.018,0.719,0.018c4.081,0,7.775-1.652,10.449-4.326 s4.328-6.369,4.328-10.449c0-0.241-0.006-0.48-0.018-0.72L82.113,33.216L82.113,33.216z' />
  </svg>
);

export default function Connexion() {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
            className='text-sm text-gray-500 dark:text-gray-400 hover:underline self-start mb-8'>
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
              <div className='relative'>
                <input
                  {...register("password")}
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Entrez votre mot de passe'
                  className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300'>
                  {showPassword ? <EyeIcon /> : <EyeSlashIcon />}{" "}
                </button>
              </div>
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
