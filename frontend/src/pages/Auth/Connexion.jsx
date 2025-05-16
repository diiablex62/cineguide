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
import toast, { Toaster } from "react-hot-toast";

export default function Connexion() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const schema = yup.object({
    email: yup
      .string()
      .required("L'email est obligatoire")
      .email("Format d'email invalide")
      .test(
        "email-format",
        "L'email doit contenir un @ et un domaine valide",
        (value) => {
          if (!value) return true;
          console.log("Validation email connexion:", value);
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }
      ),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(5, "Le mot de passe doit contenir au moins 5 caractères")
      .max(20, "Le mot de passe ne peut pas dépasser 20 caractères"),
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
    setIsSubmitting(true);
    setLoginError(null);

    // Effacer toutes les notifications existantes
    toast.dismiss();

    try {
      console.log("Tentative de connexion avec:", data.email);
      await login(data);
      toast.success("Connexion réussie !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);

      // Message générique pour les erreurs d'authentification
      let errorMessage = "L'email ou le mot de passe est incorrect";

      // Pour les erreurs de connexion réseau, utiliser le message spécifique
      if (
        error.message &&
        error.message.includes("Impossible de contacter le serveur")
      ) {
        errorMessage = error.message;
      }
      // Message spécifique pour les comptes en attente de validation
      else if (error.status === 403 && error.data?.isPending) {
        errorMessage =
          "Votre compte est en attente de validation. Veuillez vérifier votre email.";
      }

      setLoginError(errorMessage);

      // Ne pas afficher ce toast si on va afficher le toast personnalisé pour la validation en attente
      if (!(error.status === 403 && error.data?.isPending)) {
        toast.error(errorMessage);
      }

      // Si le compte est en attente de validation, proposer de renvoyer l'email
      if (error.status === 403 && error.data?.isPending) {
        toast.custom(
          () => (
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
              <div className='w-1.5 bg-yellow-400'></div>
              <div className='flex-1 p-4'>
                <div className='flex'>
                  <div className='flex-1'>
                    <p className='font-bold text-gray-900 dark:text-white'>
                      Validation de compte en attente
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      Votre compte{" "}
                      <span className='font-medium'>{data.email}</span> est en
                      attente de validation. Veuillez vérifier votre boîte de
                      réception et cliquer sur le lien de validation.
                    </p>

                    <div className='mt-4 flex space-x-2'>
                      <button
                        onClick={() => navigate("/validation")}
                        className='px-3 py-1.5 text-white text-xs font-medium rounded-md bg-[#E71CA5] hover:opacity-90'>
                        Renvoyer l'email
                      </button>
                      <button
                        onClick={() => toast.dismiss()}
                        className='px-3 py-1.5 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        Fermer
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => toast.dismiss()}
                    className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'>
                    ×
                  </button>
                </div>
              </div>
            </div>
          ),
          { duration: 15000 }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Toaster position='top-center' />

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

          {/* Afficher l'erreur de connexion */}
          {loginError && (
            <div className='w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              <p className='text-sm'>{loginError}</p>
            </div>
          )}

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
                className={`bg-gray-50 dark:bg-gray-700 border ${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5`}
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
                  className={`bg-gray-50 dark:bg-gray-700 border ${
                    errors.password
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                  } text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5 pr-10`}
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
              disabled={isSubmitting}
              className={`w-full p-3 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-fuchsia)] hover:bg-[var(--color-fuchsia-hover)]"
              } text-white rounded transition-colors`}>
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </button>
            <button
              type='button'
              disabled={isSubmitting}
              className='w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors'>
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
