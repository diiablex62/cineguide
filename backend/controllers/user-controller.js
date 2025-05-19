const User = require("../models/user.schema");
const TempUser = require("../models/temp-user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  sendValidationEmail,
  sendConfirmationEmail,
} = require("../utils/email/config");
const Abonnement = require("../models/abonnement.schema");

// Inscription d'un nouvel utilisateur avec vérification d'email
const register = async (req, res) => {
  console.log("--- Début fonction register ---");
  try {
    const { nom, prenom, email, password } = req.body;

    console.log("Tentative d'inscription:", { nom, prenom, email });

    // Vérification des données reçues
    if (!nom || !prenom || !email || !password) {
      console.log("Données d'inscription incomplètes:", req.body);
      return res
        .status(400)
        .json({ message: "Toutes les informations sont requises" });
    }

    // Vérifier si l'utilisateur existe déjà dans users ou tempUsers
    const existingUser = await User.findOne({ email });
    const existingTempUser = await TempUser.findOne({ email });

    if (existingUser) {
      console.log("Email déjà utilisé:", email);
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Si l'utilisateur existe déjà dans tempUsers, on le supprime pour le recréer
    if (existingTempUser) {
      console.log("Email déjà en attente de validation:", email);
      await TempUser.deleteOne({ email });
      console.log("Ancien utilisateur temporaire supprimé");
    }

    // Hachage du mot de passe
    console.log("Hachage du mot de passe en cours...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Mot de passe haché avec succès");

    // Génération du token de validation
    const token = crypto.randomBytes(32).toString("hex");
    console.log("Token de validation généré");

    // Date d'expiration du token (60 minutes)
    const tokenExpiration = new Date();
    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 60);

    // Création d'un nouvel utilisateur temporaire
    const newTempUser = new TempUser({
      nom,
      prenom,
      email,
      password: hashedPassword,
      token,
      tokenExpiration,
    });

    // Enregistrement de l'utilisateur temporaire
    console.log(
      "Enregistrement de l'utilisateur temporaire dans la base de données..."
    );
    const savedTempUser = await newTempUser.save();
    console.log("Nouvel utilisateur temporaire créé:", savedTempUser._id);

    // Envoi de l'email de validation
    console.log("Préparation de l'envoi de l'email de validation...");
    const emailResult = await sendValidationEmail(email, prenom, token);

    if (!emailResult.success) {
      console.log(
        "Échec de l'envoi de l'email de validation:",
        emailResult.error
      );
      return res.status(500).json({
        message:
          "Inscription réussie mais échec de l'envoi de l'email de validation",
        error: emailResult.error,
      });
    }

    console.log("--- Fin fonction register (succès) ---");
    res.status(201).json({
      message:
        "Inscription réussie! Veuillez consulter votre email pour valider votre compte.",
      email: email,
    });
  } catch (error) {
    console.log("--- Erreur dans fonction register ---");
    console.error("Erreur détaillée:", error);
    console.log("Erreur d'inscription:", error.message);
    console.log("Stack trace:", error.stack);
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription", error: error.message });
  }
};

// Validation de l'inscription avec le token envoyé par email
const validateAccount = async (req, res) => {
  console.log("--- Début fonction validateAccount ---");
  try {
    const { token } = req.params;
    console.log("Tentative de validation avec le token:", token);

    if (!token) {
      console.log("Token manquant");
      return res.status(400).json({ message: "Token de validation requis" });
    }

    // Recherche de l'utilisateur temporaire avec ce token
    const tempUser = await TempUser.findOne({ token });

    if (!tempUser) {
      console.log("Token invalide ou expiré");
      return res
        .status(400)
        .json({ message: "Token de validation invalide ou expiré" });
    }

    // Vérifier si le token a expiré
    const now = new Date();
    if (now > tempUser.tokenExpiration) {
      console.log("Token expiré");
      await TempUser.deleteOne({ token });
      return res.status(400).json({
        message: "Token de validation expiré. Veuillez vous réinscrire.",
      });
    }

    // Créer l'utilisateur définitif
    const newUser = new User({
      nom: tempUser.nom,
      prenom: tempUser.prenom,
      email: tempUser.email,
      password: tempUser.password,
      role: tempUser.role,
    });

    // Enregistrer l'utilisateur définitif
    console.log("Création de l'utilisateur définitif...");
    const savedUser = await newUser.save();
    console.log("Utilisateur définitif créé:", savedUser._id);

    // Supprimer l'utilisateur temporaire
    await TempUser.deleteOne({ token });
    console.log("Utilisateur temporaire supprimé");

    // Envoi de l'email de confirmation
    await sendConfirmationEmail(tempUser.email, tempUser.prenom);

    // Générer un token JWT
    console.log("Génération du token JWT...");
    const jwtToken = jwt.sign(
      {
        userId: savedUser._id,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Token JWT généré avec succès");

    console.log("--- Fin fonction validateAccount (succès) ---");
    res.status(200).json({
      message: "Votre compte a été validé avec succès!",
      token: jwtToken,
      user: {
        _id: savedUser._id,
        nom: savedUser.nom,
        prenom: savedUser.prenom,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.log("--- Erreur dans fonction validateAccount ---");
    console.error("Erreur détaillée:", error);
    console.log("Erreur de validation:", error.message);
    console.log("Stack trace:", error.stack);
    res.status(500).json({
      message: "Erreur lors de la validation du compte",
      error: error.message,
    });
  }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
  console.log("--- Début fonction login ---");
  try {
    const { email, password } = req.body;

    console.log("Tentative de connexion:", email);

    // Vérification des données reçues
    if (!email || !password) {
      console.log("Données de connexion incomplètes");
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier s'il y a un utilisateur temporaire en attente de validation
    const tempUser = await TempUser.findOne({ email });
    if (tempUser) {
      console.log("Utilisateur en attente de validation:", email);
      return res.status(403).json({
        message:
          "Votre compte est en attente de validation. Veuillez vérifier votre email.",
        isPending: true,
      });
    }

    // Vérifier si l'utilisateur existe
    console.log("Recherche de l'utilisateur dans la base de données...");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Tentative de connexion avec un email inconnu:", email);
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    console.log("Vérification du mot de passe...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Mot de passe incorrect pour:", email);
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    console.log("Génération du token JWT...");
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Token JWT généré avec succès");

    console.log("Connexion réussie pour:", email);
    console.log("--- Fin fonction login (succès) ---");

    res.status(200).json({
      userId: user._id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log("--- Erreur dans fonction login ---");
    console.error("Erreur détaillée:", error);
    console.log("Erreur de connexion:", error.message);
    console.log("Stack trace:", error.stack);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion", error: error.message });
  }
};

// Récupérer les informations d'un utilisateur
const getUserInfo = async (req, res) => {
  console.log("--- Début fonction getUserInfo ---");
  try {
    console.log("Récupération des informations pour l'ID:", req.params.id);
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      console.log("Utilisateur non trouvé:", req.params.id);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    console.log("Informations utilisateur récupérées:", user._id);
    console.log("--- Fin fonction getUserInfo (succès) ---");
    res.status(200).json(user);
  } catch (error) {
    console.log("--- Erreur dans fonction getUserInfo ---");
    console.error("Erreur détaillée:", error);
    console.log(
      "Erreur lors de la récupération des informations:",
      error.message
    );
    console.log("Stack trace:", error.stack);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Renvoyer l'email de validation
const resendValidationEmail = async (req, res) => {
  console.log("--- Début fonction resendValidationEmail ---");
  try {
    const { email } = req.body;

    console.log("Tentative de renvoi d'email pour:", email);

    if (!email) {
      console.log("Email non fourni");
      return res.status(400).json({ message: "Email requis" });
    }

    // Vérifier si l'utilisateur temporaire existe
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      console.log("Utilisateur temporaire non trouvé:", email);
      return res
        .status(404)
        .json({ message: "Aucune inscription en attente pour cet email" });
    }

    // Générer un nouveau token
    const token = crypto.randomBytes(32).toString("hex");
    console.log("Nouveau token de validation généré");

    // Mettre à jour la date d'expiration (60 minutes)
    const tokenExpiration = new Date();
    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 60);

    // Mettre à jour l'utilisateur temporaire
    tempUser.token = token;
    tempUser.tokenExpiration = tokenExpiration;
    await tempUser.save();
    console.log("Token mis à jour pour l'utilisateur temporaire");

    // Renvoyer l'email de validation
    console.log("Préparation du renvoi de l'email de validation...");
    const emailResult = await sendValidationEmail(
      email,
      tempUser.prenom,
      token
    );

    if (!emailResult.success) {
      console.log(
        "Échec du renvoi de l'email de validation:",
        emailResult.error
      );
      return res.status(500).json({
        message: "Échec du renvoi de l'email de validation",
        error: emailResult.error,
      });
    }

    console.log("--- Fin fonction resendValidationEmail (succès) ---");
    res.status(200).json({
      message: "Email de validation renvoyé avec succès",
      email: email,
    });
  } catch (error) {
    console.log("--- Erreur dans fonction resendValidationEmail ---");
    console.error("Erreur détaillée:", error);
    console.log("Erreur de renvoi d'email:", error.message);
    console.log("Stack trace:", error.stack);
    res.status(500).json({
      message: "Erreur lors du renvoi de l'email",
      error: error.message,
    });
  }
};

// Fonction pour demander la réinitialisation du mot de passe
const forgotPassword = async (req, res) => {
  console.log("--- Début fonction forgotPassword ---");
  try {
    const { email } = req.body;
    console.log("Demande de réinitialisation pour:", email);

    if (!email) {
      console.log("Email manquant");
      return res.status(400).json({ message: "Email requis" });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Email non trouvé dans la base de données:", email);
      // Par sécurité, on indique tout de même que l'email a été envoyé
      return res.status(200).json({
        message: "Si l'email existe, un lien de réinitialisation sera envoyé",
      });
    }
    console.log(user);

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Token de réinitialisation généré:", resetToken);

    // Date d'expiration du token (30 minutes)
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setMinutes(resetTokenExpiration.getMinutes() + 30);

    // Mettre à jour l'utilisateur avec le token de réinitialisation
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiration;
    await user.save();
    console.log("Token de réinitialisation enregistré pour l'utilisateur");

    // Afficher l'URL pour le débogage
    console.log("URL client utilisée:", process.env.CLIENT_URL);

    // Créer l'URL de réinitialisation
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log("URL de réinitialisation complète:", resetUrl);

    // Envoyer l'email avec le lien de réinitialisation
    const emailContent = `
      <h1>Réinitialisation de votre mot de passe</h1>
      <p>Bonjour ${user.prenom},</p>
      <p>Vous avez demandé une réinitialisation de votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
      <a href="${resetUrl}" target="_blank">Réinitialiser mon mot de passe</a>
      <p>Ce lien expirera dans 30 minutes.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
      <p>Cordialement,<br>L'équipe CineGuide</p>
    `;

    // Configuration pour l'envoi d'email
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation de votre mot de passe - CineGuide",
      html: emailContent,
    };

    console.log("Envoi de l'email de réinitialisation...");
    await transporter.sendMail(mailOptions);
    console.log("Email de réinitialisation envoyé avec succès");

    console.log("--- Fin fonction forgotPassword (succès) ---");
    res.status(200).json({
      message: "Email de réinitialisation envoyé avec succès",
    });
  } catch (error) {
    console.log("--- Erreur dans fonction forgotPassword ---");
    console.error("Erreur détaillée:", error);
    console.log("Erreur de réinitialisation:", error.message);
    console.log("Stack trace:", error.stack);
    res.status(500).json({
      message: "Erreur lors de la demande de réinitialisation",
      error: error.message,
    });
  }
};

// Fonction pour réinitialiser le mot de passe avec le token
const resetPassword = async (req, res) => {
  console.log("--- Début fonction resetPassword ---");
  try {
    const { token, newPassword } = req.body;
    console.log("Tentative de réinitialisation avec token");

    if (!token || !newPassword) {
      console.log("Token ou nouveau mot de passe manquant");
      return res
        .status(400)
        .json({ message: "Token et nouveau mot de passe requis" });
    }

    // Rechercher l'utilisateur avec ce token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Token invalide ou expiré");
      return res
        .status(400)
        .json({ message: "Token de réinitialisation invalide ou expiré" });
    }

    console.log("Utilisateur trouvé pour la réinitialisation:", user.email);

    // Hachage du nouveau mot de passe
    console.log("Hachage du nouveau mot de passe...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("Nouveau mot de passe haché avec succès");

    // Mettre à jour le mot de passe et supprimer le token de réinitialisation
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.log("Mot de passe réinitialisé avec succès");

    // Informer l'utilisateur par email
    const emailContent = `
      <h1>Mot de passe réinitialisé avec succès</h1>
      <p>Bonjour ${user.prenom},</p>
      <p>Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
      <p>Si vous n'êtes pas à l'origine de cette action, veuillez nous contacter immédiatement.</p>
      <p>Cordialement,<br>L'équipe CineGuide</p>
    `;

    // Configuration pour l'envoi d'email
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Mot de passe réinitialisé - CineGuide",
      html: emailContent,
    };

    console.log("Envoi de l'email de confirmation...");
    await transporter.sendMail(mailOptions);
    console.log("Email de confirmation envoyé avec succès");

    console.log("--- Fin fonction resetPassword (succès) ---");
    res.status(200).json({
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    console.log("--- Erreur dans fonction resetPassword ---");
    console.error("Erreur détaillée:", error);
    console.log("Erreur de réinitialisation:", error.message);
    console.log("Stack trace:", error.stack);
    res.status(500).json({
      message: "Erreur lors de la réinitialisation du mot de passe",
      error: error.message,
    });
  }
};

const getAbonnements = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const abonnements = await Abonnement.findOne({ user: user._id });

    res.status(200).json(abonnements);
  } catch (error) {
    console.log("Erreur lors de la récupération de l'abonnements:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
  validateAccount,
  resendValidationEmail,
  forgotPassword,
  resetPassword,
  getAbonnements,
};
