import { BASE_URL } from "../utils/url";

export async function getAllSeries() {
  try {
    const response = await fetch(`${BASE_URL}/series/`, {
      method: "GET",
    });
    if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);
    const series = await response.json();
    return series;
  } catch (error) {
    console.error("Error fetching all series:", error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
}

export async function getSerieById(id) {
  try {
    // Utilisation correcte de l'ID dans l'URL
    const response = await fetch(`${BASE_URL}/series/${id}`, {
      method: "GET",
    });
    
    if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);
    
    const serie = await response.json();
    return serie;
  } catch (error) {
    console.error(`Error fetching serie with id ${id}:`, error);
    throw error;
  }
}