const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token;
    
    // Essayer d'abord le header Authorization
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    // Si pas de header, essayer les cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      console.log("Erreur d'authentification: Token manquant");
      return res
        .status(401)
        .json({ message: "Non autorisé: token manquant" });
    }

    // Vérifier le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations du token à la requête
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    // Pour la compatibilité avec d'autres parties du code
    req.user = { id: decodedToken.userId, role: decodedToken.role };
    
    console.log("Authentification réussie pour l'utilisateur:", decodedToken.userId);
    next();
  } catch (error) {
    console.log("Erreur d'authentification:", error.message);
    return res.status(401).json({ message: "Non autorisé: token invalide" });
  }
};
