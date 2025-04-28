import React, { useContext } from "react";
import { AuthContext } from "../../../components/providers/AuthProvider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    complement: yup.string().required("Le champ est obligatoire"),
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
    alert(data.firstname + " " + data.lastname + " " + data.email);
  };
  return (
    <div className="dark:bg-black dark:text-white dark:border-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-2">
          <label htmlFor="lastname" className="font-bold mb-2">
            Nom :
          </label>
          <input
            {...register("lastname")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="text"
            id="lastname"
            defaultValue={user.lastname}
          />
          {errors.lastname && (
            <p className="text-red-500 dark:text-red-400">
              {errors.lastname.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="firstname" className="font-bold mb-2">
            Prenom :
          </label>
          <input
            {...register("firstname")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="text"
            id="firstname"
            defaultValue={user.firstname}
          />
          {errors.firstname && (
            <p className="text-red-500 dark:text-red-400">
              {errors.firstname.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="email" className="font-bold mb-2">
            Email :
          </label>
          <input
            {...register("email")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="email"
            id="email"
            defaultValue={user.email}
          />
          {errors.email && (
            <p className="text-red-500 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="adress" className="font-bold mb-2">
            Adresse :
          </label>
          <input
            {...register("adress")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="text"
            id="adress"
            defaultValue={user.adress}
          />
          {errors.adress && (
            <p className="text-red-500 dark:text-red-400">
              {errors.adress.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="city" className="font-bold mb-2">
            Ville :
          </label>
          <input
            {...register("city")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="text"
            id="city"
            defaultValue={user.city}
          />
          {errors.city && (
            <p className="text-red-500 dark:text-red-400">
              {errors.city.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="postalCode" className="font-bold mb-2">
            Code postal :
          </label>
          <input
            {...register("postalCode")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="text"
            id="postalCode"
            defaultValue={user.postalCode}
          />
          {errors.postalCode && (
            <p className="text-red-500 dark:text-red-400">
              {errors.postalCode.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="complement" className="font-bold mb-2">
            Complement :
          </label>
          <input
            {...register("complement")}
            className="text-black border dark:border-white dark:text-white px-3 py-3"
            type="text"
            id="complement"
            defaultValue={user.complement}
          />
          {errors.complement && (
            <p className="text-red-500 dark:text-red-400">
              {errors.complement.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button className="italic bg-fuchsia text-white px-4 py-1 rounded cursor-pointer">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}
