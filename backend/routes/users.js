const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const auth = require("../middleware/auth");

// Routes publiques
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/validate/:token", userController.validateAccount);
router.post("/resend-validation", userController.resendValidationEmail);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/get-abonnement/:id", userController.getAbonnements);

// Routes protégées (nécessitant authentification)
router.get("/:id", auth, userController.getUserInfo);


module.exports = router;
