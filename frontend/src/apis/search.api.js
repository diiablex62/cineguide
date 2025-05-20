import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Fonction pour attendre un délai
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Recherche films, séries, saisons, épisodes et acteurs
 * @param {string} query - Terme de recherche
 * @param {number} maxRetries - Nombre maximum de tentatives
 * @returns {Promise} Réponse de l'API
 */
export const searchAll = async (query, maxRetries = 1) => {
  console.log("Recherche avec le terme:", query);

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Attendre un peu si c'est une nouvelle tentative
      if (attempt > 0) {
        console.log(`Tentative de reconnexion (${attempt}/${maxRetries})...`);
        await delay(1000 * attempt); // Attente exponentielle
      }

      const response = await axios.get(`${API_URL}/search`, {
        params: { query },
        timeout: 5000, // Timeout de 5 secondes
      });

      console.log("Résultats de recherche:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la recherche (tentative ${attempt + 1}/${
          maxRetries + 1
        }):`,
        error
      );
      lastError = error;

      // Si c'est la dernière tentative ou si ce n'est pas une erreur réseau, on abandonne
      if (attempt === maxRetries || !error.message.includes("Network Error")) {
        break;
      }
    }
  }

  throw lastError;
};
