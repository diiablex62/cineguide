const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    type: { type: String, default: null },
    amount: { type: String, required: true },
    idPurchase: { type: String, required: true },
    typePaiement: { type: String, required: true },
    typeAbonnement: { type: String, default: null },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;
