const Abonnement = require("../models/abonnement.schema");
const Purchase = require("../models/purchase.schema");
const User = require("../models/user.schema");

const add = async (req, res) => {
  try {
    const { email, id, typeAbonnement, typePaiement, amount } = req.body;

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });

    // Création de la commande
    const purchaseData = {
      user: user._id,
      amount: amount,
      idPurchase: id,
      duration: 1,
      typePaiement,
      typeAbonnement,
    };

    const abonnement = {
      user: user._id,
      type: typeAbonnement,
      dateExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    const newAbonnement = new Abonnement(abonnement);
    await newAbonnement.save();

    const newPurchase = new Purchase(purchaseData);
    await newPurchase.save();

    res.status(201).json({ success: true, purchase: newPurchase });
  } catch (error) {
    console.log("❌ Erreur lors de la création de la commande :", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

module.exports = { add };
