import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import silverLogo from "../../assets/abonnement/silver.svg";
import goldLogo from "../../assets/abonnement/gold.svg";
import diamondLogo from "../../assets/abonnement/diamond.svg";
import PayPal from "./paypal";
import cbIcon from "../../assets/abonnement/cb.svg";

export default function ModalAbo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // Étape 1 : Choix de l'abonnement, Étape 2 : Moyen de paiement, Étape 3 : Formulaire de paiement
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // "paypal" ou "carte"

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setStep(1); // Réinitialiser à l'étape 1
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStep(1); // Réinitialiser à l'étape 1
  };

  const handleSubscriptionClick = (id) => {
    console.log(`Abonnement choisi: ${id}`);
    setSelectedSubscription(id);
    setStep(2); // Passer à l'étape 2
  };

  const handlePaymentClick = (method) => {
    console.log(`Moyen de paiement choisi: ${method}`);
    setSelectedPaymentMethod(method);
    setStep(3); // Passer à l'étape 3
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Passer à l'étape finale
  };

  return (
    <div className={isModalOpen ? "relative overflow-hidden" : ""}>
      <button
        onClick={handleOpenModal}
        className='p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
        Voir les abonnements
      </button>

      <div
        className={
          isModalOpen ? "fixed inset-0 backdrop-blur-sm bg-opacity-10" : ""
        }
        onClick={handleCloseModal}>
        {isModalOpen && (
          <div
            className='fixed inset-0 flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}>
            <div className='bg-white dark:bg-black p-6 rounded shadow-lg w-11/12 max-w-[900px] h-auto sm:h-[400px] flex flex-col justify-between'>
              <div className='relative mb-6'>
                <button
                  onClick={handleCloseModal}
                  className='absolute top-2 right-2 sm:top-0 sm:right-0 text-4xl font-light text-black hover:text-gray-700 cursor-pointer'>
                  &times;
                </button>
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className='absolute top-2 left-2 sm:top-0 sm:left-0 text-xl font-light text-black hover:text-gray-700 cursor-pointer'>
                    &larr; Retour
                  </button>
                )}
                <h2 className='text-2xl sm:text-3xl font-light mt-10 sm:mt-0 text-center'>
                  {step === 1
                    ? "Choisir un abonnement :"
                    : step === 2
                    ? "Moyen de paiement"
                    : selectedPaymentMethod === "carte"
                    ? "Paiement par carte"
                    : "Paiement via PayPal"}
                </h2>
              </div>

              <div className='flex-grow flex flex-col'>
                {step === 1 && (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
                    {/* Silver Plan */}
                    <div className='border p-4 rounded shadow mx-auto'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-[26px] font-light'>Silver</h3>
                        <div className='text-center'>
                          <img
                            src={silverLogo}
                            alt='Silver'
                            className='h-16 w-16 mx-auto'
                          />
                          <p className='text-gray-500 mt-2 whitespace-nowrap'>
                            20€ / mois
                          </p>
                        </div>
                      </div>
                      <ul className='mt-4 text-sm'>
                        <li>➤ Pas de pub</li>
                        <li>➤ Liste (max 20)</li>
                        <li>➤ Commentaire / jour (max 10)</li>
                        <li>➤ Notification (nouvelle saison)</li>
                        <li>➤ Badge</li>
                      </ul>
                      <button
                        id='silver'
                        onClick={() => handleSubscriptionClick("silver")}
                        className='mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full cursor-pointer'>
                        Choisir
                      </button>
                    </div>
                    {/* Gold Plan */}
                    <div className='border p-4 rounded shadow mx-auto'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-[26px] font-light'>Gold</h3>
                        <div className='text-center'>
                          <img
                            src={goldLogo}
                            alt='Gold'
                            className='h-16 w-16 mx-auto'
                          />
                          <p className='text-gray-500 mt-2 whitespace-nowrap'>
                            50€ / mois
                          </p>
                        </div>
                      </div>
                      <ul className='mt-4 text-sm'>
                        <li>➤ Pas de pub</li>
                        <li>➤ Liste (max 50)</li>
                        <li>➤ Commentaire / jour (max 100)</li>
                        <li>➤ Notification (nouvelle saison)</li>
                        <li>➤ Badge</li>
                      </ul>
                      <button
                        id='gold'
                        onClick={() => handleSubscriptionClick("gold")}
                        className='mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full cursor-pointer'>
                        Choisir
                      </button>
                    </div>
                    {/* Diamond Plan */}
                    <div className='border p-4 rounded shadow mx-auto'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-[26px] font-light'>Diamond</h3>
                        <div className='text-center'>
                          <img
                            src={diamondLogo}
                            alt='Diamond'
                            className='h-16 w-16 mx-auto'
                          />
                          <p className='text-gray-500 mt-2 whitespace-nowrap'>
                            550€ / mois
                          </p>
                        </div>
                      </div>
                      <ul className='mt-4 text-sm'>
                        <li>➤ Pas de pub</li>
                        <li>➤ Liste (illimité)</li>
                        <li>➤ Commentaire / jour (illimité)</li>
                        <li>➤ Notification (nouvelle saison)</li>
                        <li>➤ Badge</li>
                      </ul>
                      <button
                        id='diamond'
                        onClick={() => handleSubscriptionClick("diamond")}
                        className='mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full cursor-pointer'>
                        Choisir
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className='flex flex-col items-center justify-center flex-grow'>
                    <div className='flex flex-col sm:flex-row justify-center gap-8 mb-6'>
                      <div
                        className='text-center cursor-pointer'
                        onClick={() => handlePaymentClick("carte")}>
                        <img
                          src={cbIcon}
                          alt='Carte Bancaire'
                          className='h-16 w-16 mx-auto'
                        />
                        <p className='mt-2'>Carte Bancaire</p>
                      </div>
                      <div
                        className='text-center cursor-pointer'
                        onClick={() => handlePaymentClick("paypal")}>
                        <PayPal className='h-16 w-16 mx-auto' />
                        <p className='mt-2'>PayPal</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && selectedPaymentMethod === "carte" && (
                  <div className='flex flex-col items-center'>
                    <form
                      className='w-full max-w-md'
                      onSubmit={handlePaymentSubmit}>
                      <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                          Nom prénom
                        </label>
                        <input
                          type='text'
                          className='w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]'
                        />
                      </div>
                      <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                          Numéro de carte
                        </label>
                        <input
                          type='text'
                          maxLength='19'
                          placeholder='xxxx xxxx xxxx xxxx'
                          pattern='\d{4} \d{4} \d{4} \d{4}'
                          title='Le numéro de carte doit être au format xxxx xxxx xxxx xxxx.'
                          className='w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]'
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== " " &&
                              e.key !== "Tab"
                            ) {
                              e.preventDefault(); // Bloque les lettres et autres caractères sauf Tab
                            }
                          }}
                          onInput={(e) => {
                            let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres
                            if (value.length > 16) value = value.slice(0, 16); // Limite à 16 chiffres
                            e.target.value =
                              value.match(/.{1,4}/g)?.join(" ") || ""; // Ajoute des espaces tous les 4 chiffres
                            if (value.length === 16 && e.key !== "Tab") {
                              e.target
                                .closest("form")
                                .querySelector("input[placeholder='xxx']")
                                .focus(); // Passe au champ CCV
                            }
                          }}
                        />
                      </div>
                      <div className='flex gap-4'>
                        <div className='mb-4 flex-1'>
                          <label className='block text-sm font-medium mb-2'>
                            CCV
                          </label>
                          <input
                            type='text'
                            maxLength='3'
                            placeholder='xxx'
                            pattern='\d{3}'
                            title='Le CCV doit contenir exactement 3 chiffres.'
                            className='w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]'
                            onKeyDown={(e) => {
                              if (
                                !/[0-9]/.test(e.key) &&
                                e.key !== "Backspace" &&
                                e.key !== "Tab"
                              ) {
                                e.preventDefault(); // Bloque les lettres sauf Tab
                              }
                            }}
                            onInput={(e) => {
                              if (
                                e.target.value.length === 3 &&
                                e.key !== "Tab"
                              ) {
                                e.target
                                  .closest("form")
                                  .querySelector("input[placeholder='MM/YY']")
                                  .focus(); // Passe au champ suivant
                              }
                            }}
                          />
                        </div>
                        <div className='mb-4 flex-1'>
                          <label className='block text-sm font-medium mb-2'>
                            Date d'expiration
                          </label>
                          <input
                            type='text'
                            maxLength='5'
                            pattern='\d{2}/\d{2}'
                            title='La date doit être au format MM/YY.'
                            placeholder='MM/YY'
                            className='w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]'
                            onKeyDown={(e) => {
                              if (
                                !/[0-9]/.test(e.key) &&
                                e.key !== "Backspace" &&
                                e.key !== "/" &&
                                e.key !== "Tab"
                              ) {
                                e.preventDefault(); // Bloque les lettres sauf Tab
                              }
                            }}
                            onInput={(e) => {
                              let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres
                              if (value.length > 4) value = value.slice(0, 4); // Limite à 4 chiffres
                              if (value.length > 2) {
                                value =
                                  value.slice(0, 2) + "/" + value.slice(2); // Ajoute un "/" après 2 chiffres
                              }
                              e.target.value = value;
                              if (value.length === 5 && e.key !== "Tab") {
                                e.target
                                  .closest("form")
                                  .querySelector("button[type='submit']")
                                  .focus(); // Passe au bouton PAYER
                              }
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type='submit'
                        className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
                        PAYER
                      </button>
                    </form>
                  </div>
                )}

                {step === 3 && selectedPaymentMethod === "paypal" && (
                  <div className='flex flex-col items-center justify-center'>
                    <p className='text-center text-lg'>
                      Redirection vers PayPal...
                    </p>
                  </div>
                )}

                {step === 4 && (
                  <div className='flex flex-col items-center justify-center flex-grow text-center'>
                    <h2 className='text-2xl sm:text-3xl font-light mb-4'>
                      Achat terminé
                    </h2>
                    <p className='text-lg mb-6'>
                      Merci beaucoup pour votre argent !<br />
                      Nous sommes ravis de vous compter parmi nos abonnés.
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className='p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
                      Retour
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
