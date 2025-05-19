// // --- Contrôleurs Séries ---

// export async function getAllSeries(req, res) {
//   try {
//     const today = new Date().toISOString().split("T")[0];
//     const query = `sort_by=first_air_date.desc&first_air_date.lte=${today}&page=${
//       req.query.page || 1
//     }`;
//     const data = await fetchFromTMDB("discover/tv", query);
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// export async function getSerieById(req, res) {
//   try {
//     const { id } = req.params;
//     const data = await fetchFromTMDB(`tv/${id}`);
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// // Toutes les saisons d’une série
// export async function getAllSeasonsOfSerie(req, res) {
//   try {
//     const { id } = req.params;
//     const serie = await fetchFromTMDB(`tv/${id}`);
//     res.json(serie.seasons || []);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// export async function getOneSeason(req, res) {
//   try {
//     const { id, seasonNumber } = req.params;
//     const data = await fetchFromTMDB(`tv/${id}/season/${seasonNumber}`);
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// // Tous les épisodes d’une saison
// export async function getAllEpisodesOfSeason(req, res) {
//   try {
//     const { id, seasonNumber } = req.params;
//     const season = await fetchFromTMDB(`tv/${id}/season/${seasonNumber}`);
//     res.json(season.episodes || []);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// export async function getOneEpisode(req, res) {
//   try {
//     const { id, seasonNumber, episodeNumber } = req.params;
//     const data = await fetchFromTMDB(
//       `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`
//     );
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// // --- Contrôleurs Acteurs ---

// export async function getAllActors(req, res) {
//   try {
//     const page = req.query.page || 1;
//     const data = await fetchFromTMDB(`person/popular`, `page=${page}`);
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// export async function getActorById(req, res) {
//   try {
//     const { id } = req.params;
//     const data = await fetchFromTMDB(`person/${id}`);
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }

// // Recherche

// export async function searchTMDB(req, res) {
//   try {
//     const { query, type = "multi", page = 1 } = req.query;

//     if (!query) {
//       return res.status(400).json({ error: "Missing search query parameter." });
//     }

//     const endpoint = `search/${type}`;
//     const searchQuery = `query=${encodeURIComponent(query)}&page=${page}`;

//     const data = await fetchFromTMDB(endpoint, searchQuery);
//     res.json(data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }
