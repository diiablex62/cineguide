require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/users");
const serieRoutes = require("./routes/serie");
const saisonRoutes = require("./routes/saison");
const episodeRoutes = require("./routes/episode");
const searchRoutes = require("./routes/search");
const acteurRoutes = require("./routes/acteurs");
const filmRoutes = require("./routes/film");
const purchaseRoutes = require("./routes/purchase");
const { verifyEmailConfig } = require("./utils/email/config");
const app = express();
app.use(express.json());

const path = require("path");
const __DIRNAME = path.resolve();

console.log(
  "Configuration du serveur avec CORS pour les origines:",
  process.env.ALLOWED_ORIGINS
);
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : [process.env.CLIENT_URL];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Origine refusée: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("Chargement des routes");
app.use("/api/acteurs", acteurRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/series", serieRoutes);
app.use("/api/saisons", saisonRoutes);
app.use("/api/purchase", purchaseRoutes);
// Route de test pour vérifier que le serveur répond
app.get("/api/test", (req, res) => {
  console.log("Route de test appelée");
  res.status(200).json({ message: "Serveur API fonctionnel!" });
});

app.use(express.static(path.join(__DIRNAME, "/frontend/dist")));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__DIRNAME, "frontend", "dist", "index.html"));
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
