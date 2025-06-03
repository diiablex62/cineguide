require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
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
const commentaireRoutes = require("./routes/commentaire");
const trendingRoutes = require("./routes/trending");
const actionSeriesRoutes = require("./routes/action-series");
const similarSeriesRoutes = require("./routes/similar-series");
const genresRoutes = require("./routes/genres.routes");
const { verifyEmailConfig } = require("./utils/email/config");
const app = express();
app.use(express.json());

const path = require("path");
const __DIRNAME = path.resolve();

app.use(
  cors({
    origin: function (origin, callback) {
      // En développement, accepter toutes les origines
      if (process.env.NODE_ENV === "development") {
        return callback(null, true);
      }

      // En production, vérifier les origines autorisées
      const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : [process.env.CLIENT_URL];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

console.log("Chargement des routes");
app.use("/api/acteurs", acteurRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/series", serieRoutes);
app.use("/api/series", episodeRoutes);
app.use("/api/series", saisonRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/commentaires", commentaireRoutes);
app.use("/api/genres", genresRoutes);

// Route de test pour vérifier que le serveur répond
app.use("/api/trending", trendingRoutes);
app.use("/api/action-series", actionSeriesRoutes);
app.use("/api/similar-series", similarSeriesRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Serveur API fonctionnel!" });
});

// Route racine
app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenue sur l'API Cineguide!" });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connexion Mongo DB OK");
    await verifyEmailConfig();
  })
  .catch((err) => console.log("Erreur de connexion MongoDB:", err));

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
