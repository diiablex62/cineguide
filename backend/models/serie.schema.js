const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    acteurs: {
      type: [String],
      required: true,
    },
    note: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
    },
    createur: {
      type: String,
      required: true,
    },
    bandeAnnonce: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    paysProduction: {
      type: [String],
      required: true,
    },
    platforms: {
      type: [String],
      required: true,
    },
    langues: {
      type: [String],
      required: true,
    },
    dureeEpisodeMoyenne: {
      type: String,
      required: true,
    },
    saisons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Saison",
      },
    ],
    tmdbId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Serie = mongoose.model("Serie", serieSchema);

module.exports = Serie;
