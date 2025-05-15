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

export default function Inscription() {
  const { registerUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const schema = yup.object({
    prenom: yup
      .string()
      .required("Le prénom est obligatoire")
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
    nom: yup
      .string()
      .required("Le nom est obligatoire")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    username: yup
      .string()
      .required("Le nom d'utilisateur est obligatoire")
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
      .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"
      ),
    email: yup
      .string()
      .required("L'email est obligatoire")
      .email("Format d'email invalide"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(5, "Le mot de passe doit contenir au moins 5 caractères")
      .max(20, "Le mot de passe ne peut pas dépasser 20 caractères"),
    confirmPassword: yup
      .string()
      .required("La confirmation du mot de passe est obligatoire")
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setRegisterError(null);

    try {
      console.log("Tentative d'inscription avec:", data.email);
      const result = await registerUser(data);

      // Si l'inscription nécessite une validation par email
      if (result && result.message && result.email) {
        toast.success(
          "Inscription réussie ! Veuillez vérifier votre email pour activer votre compte."
        );
        navigate("/validation");
      } else {
        // Si l'inscription est directe (sans validation par email)
        toast.success("Inscription réussie !");
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);

      // Afficher l'erreur spécifique
      const errorMessage =
        error.message || "Une erreur est survenue lors de l'inscription";
      setRegisterError(errorMessage);

      // Notification d'erreur
      toast.error(errorMessage);

      // Si l'email est déjà utilisé, proposer la connexion
      if (
        error.status === 409 ||
        errorMessage.includes("existe déjà") ||
        errorMessage.includes("already exists")
      ) {
        toast.custom(
          (t) => (
            <div className='bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-md'>
              <div className='flex'>
                <div className='py-1'>
                  <svg
                    className='h-6 w-6 text-blue-500 mr-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <p className='font-bold'>Compte existant</p>
                  <p className='text-sm'>
                    Un compte avec cet email existe déjà.
                  </p>
                  <button
                    onClick={() => navigate("/connexion")}
                    className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs'>
                    Se connecter
                  </button>
                </div>
              </div>
            </div>
          ),
          { duration: 10000 }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen w-full animate-fuchsia'>
      <Toaster position='top-center' />

      {/* Section gauche */}
      <div className='hidden md:flex flex-1 bg-[var(--color-fuchsia)] text-white justify-center items-center px-10'>
        <h1 className='text-7xl font-light text-left w-4/5'>
          Toutes vos plateformes de streaming au même endroit
        </h1>
      </div>

      {/* Section droite */}
      <div className='flex-1 overflow-y-auto flex flex-col justify-center bg-white dark:bg-black p-8'>
        <form
          className='w-full max-w-md mx-auto flex flex-col gap-4 border border-transparent dark:border-white rounded-lg p-6'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <img
              src={logo}
              alt='CineGuide'
              className='h-12 mx-auto dark:hidden'
            />
            <img
              src={logoWhite}
              alt='CineGuide'
              className='h-12 mx-auto hidden dark:block'
            />
            <Link
              to='/'
              className='text-sm text-gray-500 dark:text-gray-400 hover:underline block text-start mt-4'>
              &lt; Retour vers la page d'accueil
            </Link>
          </div>
          <h2 className='text-center mb-4 text-2xl font-bold text-black dark:text-white'>
            S'INSCRIRE
          </h2>

          {/* Afficher l'erreur d'inscription */}
          {registerError && (
            <div className='w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              <p className='text-sm'>{registerError}</p>
            </div>
          )}

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
                className={`w-full p-2 border ${
                  errors.prenom
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500`}
              />
              {errors.prenom && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
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
                className={`w-full p-2 border ${
                  errors.nom
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500`}
              />
              {errors.nom && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
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
              className={`w-full p-2 border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.email && (
              <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
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
              placeholder="Entrez votre nom d'utilisateur"
              className={`w-full p-2 border ${
                errors.username
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.username && (
              <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
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
                className={`w-full p-2 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500`}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='relative'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Confirmer le mot de passe
            </label>
            <div className='relative'>
              <input
                {...register("confirmPassword")}
                id='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirmez votre mot de passe'
                className={`w-full p-2 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400 dark:placeholder-gray-500`}
              />
              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white'>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className='flex items-center'>
            <input
              {...register("rgpd")}
              id='rgpd'
              type='checkbox'
              className='h-4 w-4 text-[var(--color-fuchsia)] focus:ring-[var(--color-fuchsia)]'
            />
            <label
              htmlFor='rgpd'
              className='ml-2 block text-sm text-gray-700 dark:text-gray-300'>
              J'accepte les{" "}
              <Link
                to='/cgu'
                className='text-[var(--color-fuchsia)] hover:underline'>
                conditions générales d'utilisation
              </Link>
            </label>
          </div>
          {errors.rgpd && (
            <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
              {errors.rgpd.message}
            </p>
          )}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full p-3 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--color-fuchsia)] hover:bg-[var(--color-fuchsia-hover)]"
            } text-white font-semibold rounded transition-colors`}>
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </button>
          <button
            type='button'
            disabled={isSubmitting}
            className='w-full p-3 bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold flex items-center justify-center gap-2 transition-colors'>
            <GoogleIcon className='h-5 w-5' /> S'inscrire avec Google
          </button>
          <p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-400'>
            Déjà inscrit ?{" "}
            <Link
              to='/connexion'
              className='text-[var(--color-fuchsia)] hover:underline'>
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
