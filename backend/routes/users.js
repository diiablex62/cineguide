const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const auth = require("../middleware/auth");

// Routes publiques
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/validate/:token", userController.validateAccount);
router.post("/resend-validation", userController.resendValidationEmail);

// Routes protégées (nécessitant authentification)
router.get("/:id", auth, userController.getUserInfo);

console.log("Routes utilisateurs chargées");
module.exports = router;
