const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("Tentative de connexion à MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Augmenter le timeout à 15s au lieu des 10s par défaut
      socketTimeoutMS: 45000, // Temps avant qu'une opération socket n'expire
      family: 4, // Forcer IPv4
    });
    console.log("Connexion MongoDB établie avec succès");
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error.message);
    // Afficher des détails supplémentaires pour le débogage
    if (error.name === "MongooseServerSelectionError") {
      console.error("Détails de l'erreur de connexion:", error.reason);
    }
    process.exit(1);
  }
};

// Ajouter des gestionnaires d'événements pour surveiller l'état de la connexion
mongoose.connection.on("connected", () => {
  console.log("Mongoose connecté");
});

mongoose.connection.on("error", (err) => {
  console.error("Erreur de connexion Mongoose:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose déconnecté");
});

// Capturer les signaux d'arrêt pour fermer proprement la connexion
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connexion Mongoose fermée par arrêt de l'application");
  process.exit(0);
});

module.exports = connectDB;
