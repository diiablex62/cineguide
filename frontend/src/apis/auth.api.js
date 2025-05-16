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
      throw {
        message: data.message || "Erreur lors de l'inscription",
        status: response.status,
        data: data,
      };
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
      throw {
        message: data.message || "Erreur lors de la connexion",
        status: response.status,
        data: data,
      };
    }

    console.log("Connexion réussie");
    return data;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    console.error("Détails de l'erreur:", error.message);

    // Gérer spécifiquement l'erreur "Failed to fetch"
    if (error.message === "Failed to fetch") {
      throw {
        message:
          "Impossible de contacter le serveur. Veuillez vérifier votre connexion internet ou réessayer plus tard.",
        status: 0,
        data: null,
        originalError: error,
      };
    }

    // Si l'erreur n'a pas de format spécifique, créer un objet d'erreur standard
    if (!error.status && !error.data) {
      throw {
        message: error.message || "Une erreur inattendue s'est produite",
        status: 0,
        data: null,
        originalError: error,
      };
    }

    throw error;
  }
}

// Validation du compte avec le token reçu par email
export async function validateAccount(token) {
  try {
    console.log("Début de l'appel API de validation de compte");
    console.log("URL d'appel:", `${BASE_URL}/users/validate/${token}`);

    const response = await fetch(`${BASE_URL}/users/validate/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Réponse de validation:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message: data.message || "Erreur lors de la validation du compte",
        status: response.status,
        data: data,
      };
    }

    console.log("Validation de compte réussie");
    return data;
  } catch (error) {
    console.error("Erreur de validation de compte:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}

// Renvoyer l'email de validation
export async function resendValidationEmail(email) {
  try {
    console.log("Début de l'appel API pour renvoyer l'email de validation");
    console.log("URL d'appel:", `${BASE_URL}/users/resend-validation`);
    console.log("Email pour renvoi:", email);

    const response = await fetch(`${BASE_URL}/users/resend-validation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Réponse du renvoi d'email:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors du renvoi de l'email de validation",
        status: response.status,
        data: data,
      };
    }

    console.log("Renvoi d'email réussi");
    return data;
  } catch (error) {
    console.error("Erreur de renvoi d'email:", error);
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
      throw {
        message:
          data.message || "Erreur lors de la récupération des informations",
        status: response.status,
        data: data,
      };
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

// Demande de réinitialisation de mot de passe (mot de passe oublié)
export async function forgotPassword(email) {
  try {
    console.log("Début de l'appel API pour mot de passe oublié");
    console.log("URL d'appel:", `${BASE_URL}/users/forgot-password`);
    console.log("Email pour réinitialisation:", email);

    const response = await fetch(`${BASE_URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Réponse de demande de réinitialisation:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors de la demande de réinitialisation",
        status: response.status,
        data: data,
      };
    }

    console.log("Demande de réinitialisation réussie");
    return data;
  } catch (error) {
    console.error("Erreur de demande de réinitialisation:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}

// Réinitialiser le mot de passe avec le token reçu par email
export async function resetPassword(token, newPassword) {
  try {
    console.log("Début de l'appel API pour réinitialiser le mot de passe");
    console.log("URL d'appel:", `${BASE_URL}/users/reset-password`);

    const response = await fetch(`${BASE_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    console.log("Statut de la réponse:", response.status);
    console.log(
      "Headers de la réponse:",
      Object.fromEntries([...response.headers])
    );

    const data = await response.json();
    console.log("Réponse de réinitialisation:", data);

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors de la réinitialisation du mot de passe",
        status: response.status,
        data: data,
      };
    }

    console.log("Réinitialisation du mot de passe réussie");
    return data;
  } catch (error) {
    console.error("Erreur de réinitialisation de mot de passe:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}
