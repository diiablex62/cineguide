import { BASE_URL } from "../utils/url";
import { getCookie } from "../utils/cookies";

// Inscription d'un nouvel utilisateur
export async function register(userData) {
  try {
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

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message: data.message || "Erreur lors de l'inscription",
        status: response.status,
        data: data,
      };
    }

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

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message: data.message || "Erreur lors de la connexion",
        status: response.status,
        data: data,
      };
    }

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
    const response = await fetch(`${BASE_URL}/users/validate/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message: data.message || "Erreur lors de la validation du compte",
        status: response.status,
        data: data,
      };
    }

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
    const response = await fetch(`${BASE_URL}/users/resend-validation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors du renvoi de l'email de validation",
        status: response.status,
        data: data,
      };
    }

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
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors de la récupération des informations",
        status: response.status,
        data: data,
      };
    }

    return data;
  } catch (error) {
    console.error("Erreur de récupération des informations:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}

// Récupérer les informations de l'utilisateur abonnements
export async function getUserAbonnement(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/get-abonnement/${id}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors de la récupération des informations",
        status: response.status,
        data: data,
      };
    }

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
    if (!token) {
      return { isValid: false };
    }

    // Point d'API pour vérifier le token (utilisation de getUserInfo avec l'ID stocké)
    const userId = getCookie("userId");
    if (!userId) {
      return { isValid: false };
    }

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Si le token est valide, on obtient une réponse 200
    if (response.status === 200) {
      const userData = await response.json();
      return { isValid: true, userData };
    } else {
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
    const response = await fetch(`${BASE_URL}/test`, {
      method: "GET",
    });

    const data = await response.json();

    return { success: response.ok, data };
  } catch (error) {
    console.error("Erreur lors du test de connexion API:", error);
    return { success: false, error: error.message };
  }
}

// Demande de réinitialisation de mot de passe (mot de passe oublié)
export async function forgotPassword(email) {
  try {
    const response = await fetch(`${BASE_URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors de la demande de réinitialisation",
        status: response.status,
        data: data,
      };
    }

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
    const response = await fetch(`${BASE_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de réponse API:", data);
      throw {
        message:
          data.message || "Erreur lors de la réinitialisation du mot de passe",
        status: response.status,
        data: data,
      };
    }

    return data;
  } catch (error) {
    console.error("Erreur de réinitialisation de mot de passe:", error);
    console.error("Détails de l'erreur:", error.message);
    throw error;
  }
}
