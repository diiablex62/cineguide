// components/PayPalCheckout.jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function PayPalCheckout({ selectedSubscription }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const priceMap = [
    { id: "silver", name: "Silver", price: 20 },
    { id: "gold", name: "Gold", price: 50 },
    { id: "diamond", name: "Diamond", price: 550 },
  ];

  const selected = priceMap.find((plan) => plan.id === selectedSubscription);
  const amount = selected ? selected.price.toFixed(2) : "0.00";

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_KEY,
    currency: "EUR",
  };
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full ">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Paiement avec PayPal
      </h2>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "pill",
            label: "pay",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // 💰 montant à payer
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order.capture();
              const email = user.email;
              const paymentId = details.id;
              const typePaiement = "paypal";
              const res = await fetch(`${BASE_URL}/purchase/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  amount,
                  id: paymentId,
                  typePaiement,
                  typeAbonnement: selected.name,
                }),
              });

              if (res.ok) {
                toast.success("Paiement PayPal réussi ! 🎉");
                navigate("/profil");
              } else {
                toast.error("Erreur lors de l'enregistrement du paiement.");
              }
            } catch (error) {
              console.error("Erreur PayPal : ", error);
              toast.error("Une erreur est survenue pendant le paiement.");
            }
          }}
          onError={(err) => {
            console.error("❌ Erreur PayPal :", err);
            alert("Une erreur est survenue lors du paiement.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
