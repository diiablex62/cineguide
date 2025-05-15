const mongoose = require("mongoose");

const saisonSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    annee: {
      type: Number,
      required: true,
    },
    nbEpisodes: {
      type: Number,
      required: true,
    },
    serie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Serie",
      required: true
    },
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Saison", saisonSchema);