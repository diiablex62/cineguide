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
  const [step, setStep] = useState(1); // Étape 1 : Choix de l'abonnement, Étape 2 : Moyen de paiement
  const [selectedSubscription, setSelectedSubscription] = useState("");

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
    // Ajoutez ici la logique pour traiter le paiement
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
                  className='absolute top-0 right-0 text-4xl font-light text-black hover:text-gray-700 cursor-pointer'>
                  &times;
                </button>
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className='absolute top-0 left-0 text-xl font-light text-black hover:text-gray-700 cursor-pointer'>
                    &larr; Retour
                  </button>
                )}
                <h2 className='text-2xl sm:text-3xl font-light mt-10 sm:mt-0 text-center'>
                  {step === 1 ? "Choisir un abonnement :" : "Moyen de paiement"}
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
                      <div className='text-center cursor-pointer'>
                        <img
                          src={cbIcon}
                          alt='Carte Bancaire'
                          className='h-16 w-16 mx-auto'
                        />
                        <p className='mt-2'>Carte Bancaire</p>
                      </div>
                      <div className='text-center cursor-pointer'>
                        <PayPal className='h-16 w-16 mx-auto' />
                        <p className='mt-2'>PayPal</p>
                      </div>
                    </div>
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
