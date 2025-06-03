const express = require("express");
const cors = require("cors");
const app = express();

// Configuration CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:5174"];

console.log(
  "Configuration du serveur avec CORS pour les origines:",
  allowedOrigins
);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware pour parser le JSON
app.use(express.json());

// Import des routes
const genresRoutes = require("./routes/genres.routes");

// Utilisation des routes
app.use("/api/genres", genresRoutes);

module.exports = app;
