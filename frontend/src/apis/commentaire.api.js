import { BASE_URL } from "../utils/url";

// Fonction pour récupérer le token depuis les cookies
function getTokenFromCookies() {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
}

// Créer un nouveau commentaire avec debugging avancé
export async function postComm(commentData, token) {
  try {
    console.log("=== DEBUG POST COMMENT ===");
    console.log("1. Données reçues:", commentData);

    const { contentId, contentType, rating, text } = commentData;

    // Validation côté client
    if (!contentId || !contentType || !rating || !text) {
      console.error("Erreur validation:", {
        contentId,
        contentType,
        rating,
        text,
      });
      throw new Error("Tous les champs sont requis");
    }

    if (rating < 1 || rating > 5) {
      console.error("Erreur rating:", rating);
      throw new Error("La note doit être entre 1 et 5");
    }

    if (text.trim().length < 10) {
      console.error("Erreur text length:", text.trim().length);
      throw new Error("Le commentaire doit contenir au moins 10 caractères");
    }

    // Récupérer le token
    const authToken = token || getTokenFromCookies();
    console.log("2. Token trouvé:", authToken ? "OUI" : "NON");
    console.log(
      "3. Token preview:",
      authToken ? authToken.substring(0, 20) + "..." : "AUCUN"
    );

    if (!authToken) {
      throw new Error("Token d'authentification manquant");
    }

    // Préparer les données
    const bodyData = {
      contentId: contentId.toString(),
      contentType,
      rating: parseInt(rating),
      text: text.trim(),
    };

    console.log("4. Body à envoyer:", bodyData);
    console.log("5. URL:", `${BASE_URL}/commentaires/`);

    const response = await fetch(`${BASE_URL}/commentaires/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(bodyData),
    });

    console.log("6. Status response:", response.status);
    console.log("7. Response OK:", response.ok);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Erreur inconnue" }));
      console.error("8. Erreur serveur détaillée:", errorData);
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log("9. Succès:", result);
    return result;
  } catch (error) {
    console.error("=== ERREUR POST COMMENT ===");
    console.error("Type d'erreur:", error.constructor.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    throw error;
  }
}

// Récupérer tous les commentaires pour un contenu spécifique
export async function getAllComm(contentType, contentId, options = {}) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = options;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      order,
    });
    

    const response = await fetch(
      `${BASE_URL}/commentaires/${contentType}/${contentId}?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    throw error;
  }
}

// Modifier un commentaire existant
export async function putComm(commentId, updateData, token) {
  try {
    const { rating, text } = updateData;

    if (rating && (rating < 1 || rating > 5)) {
      throw new Error("La note doit être entre 1 et 5");
    }

    if (text && text.trim().length < 10) {
      throw new Error("Le commentaire doit contenir au moins 10 caractères");
    }

    const authToken = token || getTokenFromCookies();

    if (!authToken) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await fetch(`${BASE_URL}/commentaires/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...(rating && { rating }),
        ...(text && { text: text.trim() }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la modification du commentaire:", error);
    throw error;
  }
}

// Supprimer un commentaire (soft delete)
export async function deleteComm(commentId, token) {
  try {
    const authToken = token || getTokenFromCookies();

    if (!authToken) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await fetch(`${BASE_URL}/commentaires/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    throw error;
  }
}

// Liker/Unliker un commentaire
export async function likeComm(commentId, token) {
  try {
    const authToken = token || getTokenFromCookies();

    if (!authToken) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await fetch(`${BASE_URL}/commentaires/${commentId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors du like du commentaire:", error);
    throw error;
  }
}

// Récupérer les statistiques des commentaires
export async function statComm(contentType, contentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/commentaires/${contentType}/${contentId}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}
