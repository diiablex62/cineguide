import { BASE_URL } from "../utils/url";
import { getCookie } from "../utils/cookies";

// Inscription d'un nouvel utilisateur
export async function register(userData) {
  try {
    console.log("Début de l'appel API d'inscription");
    console.log("URL d'appel:", `${BASE_URL}/users/register`);
    console.log("Données d'inscription envoyées:", userData);

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: userData.nom || userData.lastname,
        prenom: userData.prenom || userData.firstname,
        email: userData.email,
        password: userData.password,
      }),
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Réponse d'inscription:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw new Error(data.message || "Erreur lors de l'inscription");
    }

    console.log("Inscription réussie");
    return data;
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}

// Connexion d'un utilisateur
export async function login(credentials) {
  try {
    console.log("Début de l'appel API de connexion");
    console.log("URL d'appel:", `${BASE_URL}/users/login`);
    console.log("Identifiants de connexion:", credentials);

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Réponse de connexion:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw new Error(data.message || "Erreur lors de la connexion");
    }

    console.log("Connexion réussie");
    return data;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}

// Récupérer les informations de l'utilisateur connecté
export async function getUserInfo(userId, token) {
  try {
    console.log("Début de l'appel API pour les informations utilisateur");
    console.log("URL d'appel:", `${BASE_URL}/users/${userId}`);
    console.log("Récupération des informations pour l'utilisateur:", userId);

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Informations utilisateur récupérées:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw new Error(
        data.message || "Erreur lors de la récupération des informations"
      );
    }

    console.log("Récupération des informations réussie");
    return data;
  } catch (error) {
    console.error("Erreur de récupération des informations:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}

// Vérifier la validité du token JWT
export async function verifyToken(token) {
  try {
    console.log("Vérification de la validité du token");

    if (!token) {
      console.log("Aucun token fourni pour la vérification");
      return { isValid: false };
    }

    // Point d'API pour vérifier le token (utilisation de getUserInfo avec l'ID stocké)
    const userId = getCookie("userId");
    if (!userId) {
      console.log("Aucun ID utilisateur trouvé pour la vérification du token");
      return { isValid: false };
    }

    console.log("Vérification du token pour l'utilisateur:", userId);
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Statut de la réponse de vérification:", response.status);

    // Si le token est valide, on obtient une réponse 200
    if (response.status === 200) {
      console.log("Token valide");
      const userData = await response.json();
      return { isValid: true, userData };
    } else {
      console.log("Token invalide ou expiré");
      return { isValid: false };
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    return { isValid: false, error: error.message };
  }
}

// Fonction utilitaire pour tester la connexion à l'API
export async function testApiConnection() {
  try {
    console.log("Test de connexion à l'API");
    console.log("URL du test:", `${BASE_URL}/test`);

    const response = await fetch(`${BASE_URL}/test`, {
      method: "GET",
    });

    console.log("Statut de la réponse de test:", response.status);

    const data = await response.json();
    console.log("Réponse du test API:", data);

    return { success: response.ok, data };
  } catch (error) {
    console.error("Erreur lors du test de connexion API:", error);
    return { success: false, error: error.message };
  }
}
