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
      .max(50, "Le prénom ne peut pas dépasser 50 caractères")
      .matches(
        /^[a-zA-ZÀ-ÿ-\s']+$/,
        "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes"
      ),
    nom: yup
      .string()
      .required("Le nom est obligatoire")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères")
      .matches(
        /^[a-zA-ZÀ-ÿ-\s']+$/,
        "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"
      ),
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
      .email("Format d'email invalide")
      .test(
        "email-format",
        "L'email doit contenir un @ et un domaine valide",
        (value) => {
          if (!value) return true; // déjà géré par required
          console.log("Validation email:", value);
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }
      ),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(5, "Le mot de passe doit contenir au moins 5 caractères")
      .max(20, "Le mot de passe ne peut pas dépasser 20 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      ),
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
        // Le toast est géré par le composant PendingAccountNotification
        // qui affiche la notification de compte en attente de validation
        console.log(
          "Compte en attente de validation, redirection vers la page temporaire de validation"
        );

        // Afficher un toast personnalisé pour la validation par email
        toast.custom(
          () => (
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
              <div className='w-1.5 bg-yellow-400'></div>
              <div className='flex-1 p-4'>
                <div className='flex'>
                  <div className='flex-1'>
                    <p className='font-bold text-gray-900 dark:text-white'>
                      Inscription réussie!
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      Veuillez consulter votre email pour valider votre compte.
                    </p>
                    <div className='mt-4 flex space-x-2'>
                      <button
                        onClick={() => {
                          toast.dismiss();
                          navigate("/validation");
                        }}
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
          { duration: 8000, id: "pending-validation-toast" }
        );

        // Rediriger vers la page temporaire de validation au lieu de connexion
        navigate("/validation");
      } else {
        // Si l'inscription est directe (sans validation par email)
        // Rediriger vers la page de connexion sans afficher de toast
        console.log(
          "Inscription réussie, redirection vers la page de connexion"
        );
        navigate("/connexion");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);

      // Afficher l'erreur spécifique
      const errorMessage =
        error.message || "Une erreur est survenue lors de l'inscription";
      setRegisterError(errorMessage);

      // Notification d'erreur personnalisée
      toast.custom(
        () => (
          <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex'>
            <div className='w-1.5 bg-red-500'></div>
            <div className='flex-1 p-4'>
              <div className='flex'>
                <div className='flex-1'>
                  <p className='font-bold text-gray-900 dark:text-white'>
                    Erreur d'inscription
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                    {errorMessage}
                  </p>
                  <button
                    onClick={() => toast.dismiss()}
                    className='mt-4 px-3 py-1.5 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    Fermer
                  </button>
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
        { duration: 5000, id: "inscription-error-toast" }
      );
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
