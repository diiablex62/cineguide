import { BASE_URL } from "../utils/url";

// Récupérer tous les épisodes d'une saison
export async function getEpisodesBySaison(serieId, saisonNumero) {
  try {
    // Vérifier que les paramètres sont valides
    if (!serieId || saisonNumero === undefined || saisonNumero === null) {
      console.warn("getEpisodesBySaison: paramètres manquants", { serieId, saisonNumero });
      return []; // Retourner un tableau vide plutôt que de lancer une erreur
    }
    
    const response = await fetch(`${BASE_URL}/series/${serieId}/saisons/${saisonNumero}/episodes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      // Gérer l'erreur de manière plus robuste
      const errorText = await response.text().catch(() => "Pas de détails disponibles");
      console.error(`Erreur ${response.status} lors de la récupération des épisodes:`, errorText);
      
      // En cas d'erreur 500, retourner un tableau vide plutôt que de bloquer l'application
      if (response.status === 500) {
        console.warn(`Problème serveur pour la série ${serieId}, saison ${saisonNumero}. Retourne tableau vide.`);
        return [];
      }
      
      throw new Error(`Erreur serveur: ${response.status}`);
    }
    
    const episodes = await response.json();
    return episodes;
  } catch (error) {
    console.error(`Error fetching episodes for serie ${serieId}, saison ${saisonNumero}:`, error);
    // Retourner un tableau vide pour éviter de bloquer le rendu du composant
    return [];
  }
}