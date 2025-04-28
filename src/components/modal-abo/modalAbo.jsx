import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import silverLogo from "../../assets/abonnement/silver.svg";
import goldLogo from "../../assets/abonnement/gold.svg";
import diamondLogo from "../../assets/abonnement/diamond.svg";
import PayPal from "./paypal";
import cbIcon from "../../assets/abonnement/cb.svg";

const StepContent = ({
  step,
  selectedPaymentMethod,
  handlePaymentSubmit,
  handleSubscriptionClick,
  handlePaymentClick,
}) => {
  switch (step) {
    case 1:
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
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
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
            <div
              className="text-center cursor-pointer"
              onClick={() => handlePaymentClick("carte")}
            >
              <img
                src={cbIcon}
                alt="Carte Bancaire"
                className="h-16 w-16 mx-auto"
              />
              <p className="mt-2">Carte Bancaire</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onClick={() => handlePaymentClick("paypal")}
            >
              <PayPal className="h-16 w-16 mx-auto" />
              <p className="mt-2">PayPal</p>
            </div>
          </div>
        </div>
      );
    case 3:
      if (selectedPaymentMethod === "carte") {
        return (
          <div className="flex flex-col items-center">
            <form
              className="w-full max-w-md"
              onSubmit={(e) => handlePaymentSubmit(e, selectedPaymentMethod)}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Nom prénom
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Numéro de carte
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  maxLength="19"
                  placeholder="xxxx xxxx xxxx xxxx"
                  pattern="\d{4} \d{4} \d{4} \d{4}"
                  title="Le numéro de carte doit être au format xxxx xxxx xxxx xxxx."
                  className="w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== " " &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 16) value = value.slice(0, 16);
                    e.target.value = value.match(/.{1,4}/g)?.join(" ") || "";
                    if (value.length === 16) {
                      e.target
                        .closest("form")
                        .querySelector("input[placeholder='xxx']")
                        .focus();
                    }
                  }}
                />
              </div>
              <div className="flex gap-4">
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium mb-2">CCV</label>
                  <input
                    type="text"
                    id="ccv"
                    maxLength="3"
                    placeholder="xxx"
                    pattern="\d{3}"
                    title="Le CCV doit contenir exactement 3 chiffres."
                    className="w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onInput={(e) => {
                      if (e.target.value.length === 3) {
                        e.target
                          .closest("form")
                          .querySelector("input[placeholder='MM/YY']")
                          .focus();
                      }
                    }}
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    maxLength="5"
                    pattern="\d{2}/\d{2}"
                    title="La date doit être au format MM/YY."
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded focus:outline-none focus:border-[var(--color-fuchsia)]"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "/" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onInput={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 4) value = value.slice(0, 4);
                      if (value.length > 2) {
                        value = value.slice(0, 2) + "/" + value.slice(2);
                      }
                      e.target.value = value;
                      if (value.length === 5) {
                        e.target
                          .closest("form")
                          .querySelector("button[type='submit']")
                          .focus();
                      }
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]"
              >
                PAYER
              </button>
            </form>
          </div>
        );
      } else if (selectedPaymentMethod === "paypal") {
        return (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <p className="text-lg">Redirection vers PayPal...</p>
          </div>
        );
      }
      break;
    case 4:
      return (
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            Achat terminé
          </h2>
          <p className="text-lg mb-6">
            Merci beaucoup pour votre argent !<br />
            Nous sommes ravis de vous compter parmi nos abonnés.
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default function ModalAbo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setSelectedSubscription("");
    setSelectedPaymentMethod("");
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

  return (
    <div className={isModalOpen ? "relative overflow-hidden" : ""}>
      <button
        onClick={handleOpenModal}
        className="p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]"
      >
        Voir les abonnements
      </button>

      <div
        className={
          isModalOpen ? "fixed inset-0 backdrop-blur-sm bg-opacity-10" : ""
        }
        onClick={handleCloseModal}
      >
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-start sm:items-center justify-center overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-black border border-gray-300 dark:border-white text-black dark:text-white p-6 rounded shadow-lg w-11/12 max-w-[900px] h-auto sm:h-[400px] flex flex-col justify-between">
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
