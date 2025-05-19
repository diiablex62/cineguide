const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Récupérer le token dans le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(
        "Erreur d'authentification: Token manquant ou format incorrect"
      );
      return res
        .status(401)
        .json({ message: "Non autorisé: token manquant ou format incorrect" });
    }

    const token = authHeader.split(" ")[1];

    // Vérifier le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations du token à la requête
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };

    console.log(
      "Authentification réussie pour l'utilisateur:",
      decodedToken.userId
    );
    next();
  } catch (error) {
    console.log("Erreur d'authentification:", error.message);
    return res.status(401).json({ message: "Non autorisé: token invalide" });
  }
};
