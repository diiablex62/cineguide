const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempUserSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  token: { type: String, required: true },
  tokenExpiration: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // TTL: suppression auto après 1h
});

module.exports = mongoose.model("TempUser", tempUserSchema);
