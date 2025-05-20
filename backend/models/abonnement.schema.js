const mongoose = require("mongoose");

const AbonnementSchema = new mongoose.Schema(
  {
    type: { type: String, default: null },
    dateExpiration: { type: Date, default: null },
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

const Abonnement = mongoose.model("Abonnement", AbonnementSchema);

module.exports = Abonnement;
