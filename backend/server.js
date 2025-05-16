require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/users");
const serieRoutes = require("./routes/serie");
const saisonRoutes = require("./routes/saison");
const episodeRoutes = require("./routes/episode");

const acteurRoutes = require("./routes/acteurs");
const filmRoutes = require("./routes/film");
const userRoutes = require("./routes/users");
const { verifyEmailConfig } = require("./utils/email/config");
const app = express();
app.use(express.json());

console.log("Configuration du serveur avec CORS:", process.env.CLIENT_URL);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("Chargement des routes");
app.use("/api/acteurs", acteurRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/users", userRoutes);

// Route de test pour vérifier que le serveur répond
app.get("/api/test", (req, res) => {
  console.log("Route de test appelée");
  res.status(200).json({ message: "Serveur API fonctionnel!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connexion Mongo DB OK");

    // Vérifier la configuration des emails
    await verifyEmailConfig();

    console.log(`Serveur en écoute sur le port ${process.env.PORT}`);
  })
  .catch((err) => console.log("Erreur de connexion MongoDB:", err));
app.listen(process.env.PORT);
