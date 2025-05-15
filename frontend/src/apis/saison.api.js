import { BASE_URL } from "../utils/url";

export async function getSaisonsBySerie(serieId) {
  try {
    const response = await fetch(`${BASE_URL}/series/${serieId}/saisons`, {
      method: "GET",
    });
    
    if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);
    
    const saisons = await response.json();
    return saisons;
  } catch (error) {
    console.error(`Error fetching saisons for serie ${serieId}:`, error);
    throw error;
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
    
    if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);
    
    const saison = await response.json();
    return saison;
  } catch (error) {
    console.error(`Error fetching saison ${numero} for serie ${serieId}:`, error);
    throw error;
  }
}