import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/AuthContext";
import GoogleIcon from "../../components/icone/google";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_blanc.png";

export default function Connexion() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      {/* Section gauche */}
      <div className='w-full md:w-1/2 flex justify-center items-center bg-white dark:bg-[var(--color-fuchsia)]  md:bg-[var(--color-fuchsia)] text-black dark:text-white md:text-white'>
        <div className='bg-white dark:bg-black p-6 w-4/5 max-w-sm max-md:h-screen flex flex-col justify-center items-center border-0 dark:border dark:border-white'>
          {/* Logo en mobile */}
          <div className='mb-6 flex justify-center md:hidden'>
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
          <Link
            to='/'
            className='text-sm text-gray-500 dark:text-gray-400 hover:underline self-start mb-8'>
            &lt; Retour vers la page d'accueil
          </Link>
          <h2 className='text-center mb-4 text-2xl font-bold text-black dark:text-white'>
            SE CONNECTER
          </h2>
          <form
            className='flex flex-col gap-4 w-full'
            onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='vous@exemple.com'
                {...register("email")}
                className='bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5'
              />
              {errors.email && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Mot de passe
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='••••••••'
                  {...register("password")}
                  className='bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5 pr-10'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400'
                  onClick={togglePasswordVisibility}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  <span className='sr-only'>
                    {showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <Link
              to='/forgotten-password'
              className='text-sm text-right text-[var(--color-fuchsia)] hover:underline'>
              Mot de passe oublié?
            </Link>
            <button
              type='submit'
              className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
              Se connecter
            </button>
            <button
              type='button'
              className='w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2'>
              <GoogleIcon className='h-5 w-5' /> Connexion avec Google
            </button>
          </form>
          <p className='text-center mt-4 text-sm text-gray-700 dark:text-gray-300'>
            Pas encore inscrit ?{" "}
            <Link
              to='/inscription'
              className='text-[var(--color-fuchsia)] underline'>
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
      {/* Section droite */}
      <div className='hidden md:flex w-1/2 justify-center items-center flex-col bg-white dark:bg-black'>
        <div className='mb-6'>
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
