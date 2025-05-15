import { BASE_URL } from "../utils/url";

// Récupérer tous les épisodes d'une saison
export async function getEpisodesBySaison(serieId, saisonNumero) {
  try {
   
    const response = await fetch(`${BASE_URL}/series/${serieId}/saisons/${saisonNumero}/episodes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
     
      throw new Error(`Erreur serveur: ${response.status} - ${errorData.message || ''}`);
    }
    
    const episodes = await response.json();
  
    return episodes;
  } catch (error) {
    console.error(`Error fetching episodes for serie ${serieId}, saison ${saisonNumero}:`, error);
    throw error;
  }
}