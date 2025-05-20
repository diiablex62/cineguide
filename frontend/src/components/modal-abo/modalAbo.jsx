import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import silverLogo from "../../assets/abonnement/silver.svg";
import goldLogo from "../../assets/abonnement/gold.svg";
import diamondLogo from "../../assets/abonnement/diamond.svg";
import PayPal from "./paypal";
const StepContent = ({
  step,
  handleSubscriptionClick,
  handlePaymentClick,
  selectedSubscription,
}) => {
  switch (step) {
    case 1:
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 h-auto">
          {[
            {
              id: "silver",
              name: "Silver",
              price: "20€ / mois",
              logo: silverLogo,
            },
            { id: "gold", name: "Gold", price: "50€ / mois", logo: goldLogo },
            {
              id: "diamond",
              name: "Diamond",
              price: "550€ / mois",
              logo: diamondLogo,
            },
          ].map((plan) => (
            <div key={plan.id} className="border p-4 rounded shadow mx-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-[26px] font-light">{plan.name}</h3>
                <div className="text-center">
                  <img
                    src={plan.logo}
                    alt={plan.name}
                    className="h-16 w-16 mx-auto"
                  />
                  <p className="text-gray-500 mt-2 whitespace-nowrap">
                    {plan.price}
                  </p>
                </div>
              </div>
              <ul className="mt-4 text-sm">
                <li>➤ Pas de pub</li>
                <li>
                  ➤ Liste (max{" "}
                  {plan.id === "silver"
                    ? "20"
                    : plan.id === "gold"
                    ? "50"
                    : "illimité"}
                  )
                </li>
                <li>
                  ➤ Commentaire / jour (
                  {plan.id === "silver"
                    ? "max 10"
                    : plan.id === "gold"
                    ? "max 100"
                    : "illimité"}
                  )
                </li>
                <li>➤ Notification (nouvelle saison)</li>
                <li>➤ Badge</li>
              </ul>
              <button
                id={plan.id}
                onClick={() => handleSubscriptionClick(plan.id)}
                className="mt-4 p-2 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)] w-full cursor-pointer"
              >
                Choisir
              </button>
            </div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center justify-center flex-grow h-auto w-full">
          <div className="flex flex-col sm:flex-row justify-center  mb-6 w-full">
            <div
              className="text-center cursor-pointer w-full"
              onClick={() => handlePaymentClick("paypal")}
            >
              <PayPal
                selectedSubscription={selectedSubscription}
                className="h-16 w-16 mx-auto"
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function ModalAbo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    if (location.pathname === "/abonnement") {
      setIsModalOpen(true);
    }
  }, [location.pathname]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setSelectedSubscription("");
    setSelectedPaymentMethod("");

    if (location.pathname === "/abonnement") {
      navigate(-1);
    }
  };

  const handleSubscriptionClick = (id) => {
    setSelectedSubscription(id);
    setStep(2);
  };

  const handlePaymentClick = (method) => {
    setSelectedPaymentMethod(method);
    setStep(3);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const ccv = document.getElementById("ccv").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();

    if (!name || !cardNumber || !ccv || !expiryDate) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    setStep(4);
  };

  const showButton = location.pathname !== "/abonnement";

  return (
    <div className={isModalOpen ? "relative overflow-hidden" : ""}>
      {showButton && (
        <button
          onClick={handleOpenModal}
          className="p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]"
        >
          Voir les abonnements
        </button>
      )}

      <div
        className={
          isModalOpen
            ? "fixed inset-0 backdrop-blur-sm bg-opacity-10 pt-[50px]"
            : ""
        }
        onClick={handleCloseModal}
      >
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-start sm:items-center justify-center overflow-y-auto pt-[200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-black border border-gray-300 dark:border-white text-black dark:text-white p-6 rounded shadow-lg w-11/12 max-w-[900px] h-auto  flex flex-col justify-between">
              <div className="relative mb-6">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 sm:top-0 sm:right-0 text-4xl font-light text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                >
                  &times;
                </button>
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="absolute top-2 left-2 sm:top-0 sm:left-0 text-xl font-light text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                  >
                    &larr; Retour
                  </button>
                )}
                <h2 className="text-2xl sm:text-3xl font-light mt-10 sm:mt-0 text-center text-black dark:text-white">
                  {step === 1
                    ? "Choisir un abonnement :"
                    : step === 2
                    ? "Moyen de paiement"
                    : selectedPaymentMethod === "carte"
                    ? "Paiement par carte"
                    : "Paiement via PayPal"}
                </h2>
              </div>

              <StepContent
                step={step}
                selectedPaymentMethod={selectedPaymentMethod}
                handlePaymentSubmit={handlePaymentSubmit}
                handleSubscriptionClick={handleSubscriptionClick}
                handlePaymentClick={handlePaymentClick}
                selectedSubscription={selectedSubscription}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
