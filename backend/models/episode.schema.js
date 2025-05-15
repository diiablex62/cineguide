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
      type: Date,
      required: true,
    },
    saison: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Saison",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("episode", episodeSchema);
