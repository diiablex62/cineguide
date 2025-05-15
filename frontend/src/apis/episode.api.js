import { BASE_URL } from "../utils/url";

// Récupérer tous les épisodes d'une saison
export async function getEpisodesBySaison(serieId, saisonNumero) {
  try {
    const response = await fetch(`${BASE_URL}/series/${serieId}/saisons/${saisonNumero}/episodes`, {
      method: "GET",
    });
    
    if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);
    
    const episodes = await response.json();
    return episodes;
  } catch (error) {
    console.error(`Error fetching episodes for serie ${serieId}, saison ${saisonNumero}:`, error);
    throw error;
  }
}