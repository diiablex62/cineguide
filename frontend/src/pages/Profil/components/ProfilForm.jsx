import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserData from "../../../data/User.json";

export default function ProfilForm() {
  const { user } = useContext(AuthContext);

  const schema = yup.object({
    firstname: yup.string().required("Le champ est obligatoire"),
    lastname: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Format de votre email est non valide"),
    adress: yup.string().required("Le champ est obligatoire"),
    city: yup.string().required("Le champ est obligatoire"),
    postalCode: yup
      .string()
      .required("Le code postal est obligatoire")
      .matches(/^\d{5}$/, "Le code postal doit comporter 5 chiffres"),
    complement: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      lastname: UserData.lastname || "",
      firstname: UserData.firstname || "",
      email: UserData.email || "",
      adress: UserData.adress || "",
      city: UserData.city || "",
      postalCode: UserData.postalCode || "",
      complement: UserData.complement || "",
    },
  });

  const onSubmit = (data) => {
    console.log("Mise à jour du profil :", data);
    // Ici, appel API pour mettre à jour le profil
  };

  return (
    <div className='dark:bg-black dark:text-white dark:border-white'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Première rangée: Nom et Prénom */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <label
              htmlFor='lastname'
              className='block text-sm font-medium mb-1'>
              Nom
            </label>
            <input
              {...register("lastname")}
              className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
              type='text'
              id='lastname'
            />
            {errors.lastname && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.lastname.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='firstname'
              className='block text-sm font-medium mb-1'>
              Prénom
            </label>
            <input
              {...register("firstname")}
              className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
              type='text'
              id='firstname'
            />
            {errors.firstname && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.firstname.message}
              </p>
            )}
          </div>
        </div>

        {/* Email (pleine largeur) */}
        <div className='mb-6'>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            Email
          </label>
          <input
            {...register("email")}
            className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
            type='email'
            id='email'
          />
          {errors.email && (
            <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
          )}
        </div>

        {/* Adresse (pleine largeur) */}
        <div className='mb-6'>
          <label htmlFor='adress' className='block text-sm font-medium mb-1'>
            Adresse
          </label>
          <input
            {...register("adress")}
            className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
            type='text'
            id='adress'
          />
          {errors.adress && (
            <p className='text-red-500 text-xs mt-1'>{errors.adress.message}</p>
          )}
        </div>

        {/* Ville et Code Postal */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <label htmlFor='city' className='block text-sm font-medium mb-1'>
              Ville
            </label>
            <input
              {...register("city")}
              className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
              type='text'
              id='city'
            />
            {errors.city && (
              <p className='text-red-500 text-xs mt-1'>{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='postalCode'
              className='block text-sm font-medium mb-1'>
              Code postal
            </label>
            <input
              {...register("postalCode")}
              className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
              type='text'
              id='postalCode'
            />
            {errors.postalCode && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Complément (pleine largeur) */}
        <div className='mb-8'>
          <label
            htmlFor='complement'
            className='block text-sm font-medium mb-1'>
            Complément
          </label>
          <input
            {...register("complement")}
            className='w-full border dark:border-gray-700 px-3 py-2 dark:bg-gray-800 dark:text-white rounded'
            type='text'
            id='complement'
          />
          {errors.complement && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.complement.message}
            </p>
          )}
        </div>

        {/* Bouton de mise à jour */}
        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-fuchsia text-white px-6 py-2 hover:bg-opacity-90 transition-colors'>
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}
