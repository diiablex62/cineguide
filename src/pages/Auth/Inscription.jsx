import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../components/providers/AuthProvider";
import GoogleIcon from "../../components/icone/google";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_blanc.png";

export default function Inscription() {
  const { register: registerUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const schema = yup.object({
    prenom: yup.string().required("Le champ est obligatoire"),
    nom: yup.string().required("Le champ est obligatoire"),
    username: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Format de votre email est non valide"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Minimum 5 caractères")
      .max(10, "Maximum 10 caractères"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et conditions"),
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
    registerUser(data);
    localStorage.setItem("session", JSON.stringify(data));
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className='flex h-screen animate-fuchsia'>
      {/* Section gauche */}
      <div className='hidden md:flex flex-1 text-white dark:text-white justify-center items-center px-10 bg-[var(--color-fuchsia)]'>
        <h1 className='text-7xl font-light text-left w-4/5'>
          Toutes vos plateformes de streaming au même endroit
        </h1>
      </div>

      {/* Section droite */}
      <div className='flex-1 p-8 flex flex-col justify-center items-center bg-white dark:bg-black'>
        <form
          className='w-full max-w-md flex flex-col gap-4 border border-transparent dark:border-white rounded-lg p-6'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <img
              src={logo}
              alt='Logo CineGuide clair'
              className='h-12 mx-auto dark:hidden'
            />
            <img
              src={logoWhite}
              alt='Logo CineGuide sombre'
              className='h-12 mx-auto hidden dark:block'
            />
            <a
              href='/'
              className='text-sm text-gray-500 dark:text-gray-400 hover:underline block text-start mt-4'>
              &lt; Retour vers la page d'accueil
            </a>
          </div>
          <h2 className='text-center mb-4 text-2xl font-bold text-black dark:text-white'>
            S'INSCRIRE
          </h2>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label
                htmlFor='prenom'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Prénom
              </label>
              <input
                {...register("prenom")}
                id='prenom'
                type='text'
                placeholder='Prénom'
                className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
              />
              {errors.prenom && (
                <p className='text-red-500 dark:text-red-400'>
                  {errors.prenom.message}
                </p>
              )}
            </div>
            <div className='flex-1'>
              <label
                htmlFor='nom'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Nom
              </label>
              <input
                {...register("nom")}
                id='nom'
                type='text'
                placeholder='Nom'
                className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
              />
              {errors.nom && (
                <p className='text-red-500 dark:text-red-400'>
                  {errors.nom.message}
                </p>
              )}
            </div>
          </div>
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
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Nom d'utilisateur
            </label>
            <input
              {...register("username")}
              id='username'
              type='text'
              placeholder='Entrez votre nom d’utilisateur'
              className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
            />
            {errors.username && (
              <p className='text-red-500 dark:text-red-400'>
                {errors.username.message}
              </p>
            )}
          </div>
          <div className='relative'>
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
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 dark:text-red-400'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='relative'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Confirmez votre mot de passe
            </label>
            <div className='relative'>
              <input
                {...register("confirmPassword")}
                id='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirmez votre mot de passe'
                className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500'
              />
              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white'>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 dark:text-red-400'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className='flex items-start gap-2'>
            <input
              {...register("rgpd")}
              id='rgpd'
              type='checkbox'
              className='h-4 w-4 text-fuchsia-600 border-gray-300 dark:border-gray-700 rounded focus:ring-[var(--color-fuchsia)]'
            />
            <label
              htmlFor='rgpd'
              className='text-sm text-gray-700 dark:text-gray-300'>
              En cochant cette case, vous acceptez les{" "}
              <a
                href='#'
                className='text-fuchsia-700 dark:text-fuchsia-500 underline'>
                conditions d'utilisations
              </a>{" "}
              du site.
            </label>
          </div>
          {errors.rgpd && (
            <p className='text-red-500 dark:text-red-400'>
              {errors.rgpd.message}
            </p>
          )}
          <button
            type='submit'
            className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
            S'inscrire
          </button>
          <button
            type='button'
            className='w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2'>
            <GoogleIcon className='h-5 w-5' /> Connexion avec Google
          </button>
          <p className='text-center mt-4 text-sm text-black dark:text-white'>
            Déjà inscrit ?{" "}
            <a
              href='/connexion'
              className='text-[var(--color-fuchsia)] dark:text-[var(--color-fuchsia)] underline'>
              Se connecter
            </a>
          </p>
          <p className='text-center mt-4 text-sm text-black dark:text-white'>
            Consultez les articles sur{" "}
            <a
              href='https://www.allocine.fr/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-fuchsia)] dark:text-[var(--color-fuchsia)] underline'>
              Allociné
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
