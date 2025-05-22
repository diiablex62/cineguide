const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
    });
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error.message);
    if (error.name === "MongooseServerSelectionError") {
      console.error("Détails de l'erreur de connexion:", error.reason);
    }
    process.exit(1);
  }
};

// Ajouter des gestionnaires d'événements pour surveiller l'état de la connexion
mongoose.connection.on("error", (err) => {
  console.error("Erreur de connexion Mongoose:", err);
});

// Capturer les signaux d'arrêt pour fermer proprement la connexion
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDB;
