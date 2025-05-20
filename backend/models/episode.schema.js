const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    duree: {
      type: String,
      required: true,
    },
    dateDiffusion: {
      type: String,
      required: true,
    },
    IdSaisonMongo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Saison",
      required: true,
    },
    NumeroSaison: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("episode", episodeSchema);
