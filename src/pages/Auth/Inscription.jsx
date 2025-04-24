import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../components/providers/AuthProvider";
import GoogleIcon from "../../components/filtre/icone/google";

export default function Inscription() {
  const { register: registerUser } = useContext(AuthContext);

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
  };

  return (
    <div className='flex h-screen animate-fuchsia'>
      {/* Section gauche */}
      <div className='hidden md:flex flex-1 text-white justify-center items-center px-10'>
        <h1 className='text-7xl font-light text-left w-4/5'>
          Toutes vos plateformes de streaming au même endroit
        </h1>
      </div>

      {/* Section droite */}
      <div className='flex-1 p-8 flex flex-col justify-center items-center bg-white'>
        {/* Logo et retour */}
        <div className='w-full max-w-md mt-8 mb-4'>
          <img
            src='/src/assets/logo.png'
            alt='CineGuide'
            className='h-12 mx-auto'
          />
          <a
            href='/'
            className='text-sm text-black hover:underline block text-start mt-4'>
            &lt; Retour vers la page d'accueil
          </a>
        </div>

        <h2 className='text-center mb-4 text-2xl font-bold text-black'>
          S'INSCRIRE
        </h2>
        <form
          className='w-full max-w-md flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label
                htmlFor='prenom'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Prénom
              </label>
              <input
                {...register("prenom")}
                id='prenom'
                type='text'
                placeholder='Prénom'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
              />
              {errors.prenom && (
                <p className='text-red-500'>{errors.prenom.message}</p>
              )}
            </div>
            <div className='flex-1'>
              <label
                htmlFor='nom'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Nom
              </label>
              <input
                {...register("nom")}
                id='nom'
                type='text'
                placeholder='Nom'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
              />
              {errors.nom && (
                <p className='text-red-500'>{errors.nom.message}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              {...register("email")}
              id='email'
              type='email'
              placeholder='Entrez votre email'
              className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 mb-1'>
              Nom d'utilisateur
            </label>
            <input
              {...register("username")}
              id='username'
              type='text'
              placeholder='Entrez votre nom d’utilisateur'
              className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
            />
            {errors.username && (
              <p className='text-red-500'>{errors.username.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-1'>
              Mot de passe
            </label>
            <input
              {...register("password")}
              id='password'
              type='password'
              placeholder='Entrez votre mot de passe'
              className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
            />
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 mb-1'>
              Confirmez votre mot de passe
            </label>
            <input
              {...register("confirmPassword")}
              id='confirmPassword'
              type='password'
              placeholder='Confirmez votre mot de passe'
              className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-[var(--color-placeholder)]'
            />
            {errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className='flex items-start gap-2'>
            <input
              {...register("rgpd")}
              id='rgpd'
              type='checkbox'
              className='h-4 w-4 text-fuchsia-600 border-gray-300 rounded focus:ring-[var(--color-fuchsia)]'
            />
            <label htmlFor='rgpd' className='text-sm text-gray-700'>
              En cochant cette case, vous acceptez les{" "}
              <a href='#' className='text-fuchsia-700 underline'>
                conditions d'utilisations
              </a>{" "}
              du site.
            </label>
          </div>
          {errors.rgpd && <p className='text-red-500'>{errors.rgpd.message}</p>}
          <button
            type='submit'
            className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
            S'inscrire
          </button>
          <button
            type='button'
            className='w-full p-3 bg-white text-black border border-black rounded hover:bg-gray-100 flex items-center justify-center gap-2'>
            <GoogleIcon className='h-5 w-5' /> Connexion avec Google
          </button>
        </form>
        <p className='text-center mt-4 text-sm'>
          Déjà inscrit ?{" "}
          <a href='/connexion' className='text-black underline'>
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
