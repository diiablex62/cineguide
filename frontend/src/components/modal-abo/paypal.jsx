import React from "react";
import PayPalCheckout from "../paiement/PayPalCheckout";

export default function paypal({ selectedSubscription }) {

  return (
    <div>
      <PayPalCheckout selectedSubscription={selectedSubscription} />
    </div>
  );
}
