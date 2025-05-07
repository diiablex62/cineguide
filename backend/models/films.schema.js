const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    synopsis: { type: String, required: true },
    image: { type: String, required: true },
    acteurs: { type: Array, required: true },
    duree: { type: String, required: true },
    note: { type: String, required: true },
    dateSortie: { type: Date, required: true },
    realisateur: { type: String, required: true },
    bandeAnnonce: { type: String, required: true },
    genre: { type: Array, required: true },
    platforms: { type: Array, required: true },
    paysProduction: { type: Array, required: true },
    langues: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
