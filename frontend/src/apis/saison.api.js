import { BASE_URL } from "../utils/url";

export async function getSaisonsBySerie(serieId) {
  try {
    const response = await fetch(`${BASE_URL}/series/${serieId}/saisons`, {
      method: "GET",
    });

    const saisons = await response.json();
    return saisons;
  } catch (error) {
    console.error(error);
  }
}

// Récupérer une saison spécifique par numéro
export async function getSaisonByNumero(serieId, numero) {
  try {
    const response = await fetch(
      `${BASE_URL}/series/${serieId}/saisons/${numero}`,
      {
        method: "GET",
      }
    );

    const saison = await response.json();
    return saison;
  } catch (error) {
    console.error(error);
  }
}
