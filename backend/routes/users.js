const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
} = require("../controllers/user-controller");
const auth = require("../middleware/auth");

// Routes d'authentification
router.post("/register", register);
router.post("/login", login);

// Route protégée - nécessite authentification
router.get("/:id", auth, getUserInfo);

console.log("Routes utilisateurs chargées");
module.exports = router;
