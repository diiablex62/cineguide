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
    <div className='flex h-screen'>
      {/* Section gauche */}
      <div className='w-1/2 flex justify-center items-center bg-[var(--color-fuchsia)] text-white animate-fuchsia'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-sm'>
          <a
            href='/'
            className='text-sm text-gray-500 hover:underline block text-start mb-10'>
            &lt; Retour vers la page d'accueil
          </a>
          <h2 className='text-center mb-4 text-2xl font-bold text-black'>
            SE CONNECTER
          </h2>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}>
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
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400'
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
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
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400'
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <button
              type='submit'
              className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
              Se connecter
            </button>
            <button
              type='button'
              className='w-full p-3 bg-white text-[var(--color-fuchsia)] border border-[var(--color-fuchsia)] rounded hover:bg-gray-100 flex items-center justify-center gap-2'>
              <GoogleIcon className='h-5 w-5' /> Se connecter avec Google
            </button>
          </form>
          <p className='text-center mt-4 text-sm text-gray-700'>
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
      <div className='w-1/2 flex justify-center items-center'>
        <div className='w-4/5 flex flex-col items-center'>
          <h1 className='text-6xl font-light text-[var(--color-fuchsia)] text-left'>
            Toutes vos plateformes de
            <br />
            streaming au
            <br /> même endroit
          </h1>
        </div>
      </div>
    </div>
  );
}
