const mongoose = require("mongoose");

const acteurSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  metiers: { type: Array, required: true },
  nom: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  nom_de_naissance: { type: String, required: true },
  date_de_naissance: { type: String, required: true },
  age: { type: Number, required: true },
  nationalite: { type: String, required: true },
  carriere: { type: Number },
  nb_films: { type: Number },
  prix: { type: Number },
  nominations: { type: Number },
  oeuvres_principales: { type: Array, required: true },
  description: { type: String, required: true },
  biographie: { type: String, required: true },
});

module.exports = mongoose.model("Acteur", acteurSchema);
