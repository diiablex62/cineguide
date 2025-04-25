import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import silverLogo from "../../assets/abonnement/silver.svg";
import goldLogo from "../../assets/abonnement/gold.svg";
import diamondLogo from "../../assets/abonnement/diamond.svg";

export default function ModalAbo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={isModalOpen ? "relative overflow-hidden" : ""}>
      <button
        onClick={handleOpenModal}
        className='p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
        Voir les abonnements
      </button>

      <div
        className={
          isModalOpen ? "fixed inset-0 backdrop-blur-sm bg-opacity-30" : ""
        }
        onClick={handleCloseModal}>
        {isModalOpen && (
          <div
            className='fixed inset-0 flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}>
            <div className='bg-white dark:bg-black p-6 rounded shadow-lg w-11/12 max-w-[900px]'>
              <div className='text-center mb-6 relative'>
                <h2 className='text-3xl font-light'>Choisir un abonnement :</h2>
                <button
                  onClick={handleCloseModal}
                  className='absolute top-0 right-0 text-4xl font-light text-black hover:text-gray-700'>
                  &times;
                </button>
              </div>
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
                  <button className='mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full'>
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
                  <button className='mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full'>
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
                  <button className='mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full'>
                    Choisir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
