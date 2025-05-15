const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription d'un nouvel utilisateur (simplifié sans vérification d'email)
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

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email déjà utilisé:", email);
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hachage du mot de passe
    console.log("Hachage du mot de passe en cours...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Mot de passe haché avec succès");

    // Création du nouvel utilisateur (directement validé)
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    // Enregistrement de l'utilisateur
    console.log("Enregistrement de l'utilisateur dans la base de données...");
    const savedUser = await newUser.save();
    console.log("Nouvel utilisateur créé:", savedUser._id);

    // Renvoyer les données sans le mot de passe
    const userWithoutPassword = {
      _id: savedUser._id,
      nom: savedUser.nom,
      prenom: savedUser.prenom,
      email: savedUser.email,
      role: savedUser.role,
    };

    // Générer un token JWT
    console.log("Génération du token JWT...");
    const token = jwt.sign(
      {
        userId: savedUser._id,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Token JWT généré avec succès");

    console.log("--- Fin fonction register (succès) ---");
    res.status(201).json({
      user: userWithoutPassword,
      token,
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

module.exports = {
  register,
  login,
  getUserInfo,
};
