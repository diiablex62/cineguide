export const MISTRAL_API_KEY = "ZuLlbUj0bL1jO3APrVTnKLFBgomMdyrV";

export const MISTRAL_API_ENDPOINT =
  "https://api.mistral.ai/v1/chat/completions";

export const MISTRAL_MODEL = "mistral-tiny";

export const SYSTEM_PROMPT = {
  role: "system",
  content:
    "Tu es l'assistant du site Cineguide. Tu ne réponds que sur les sujets liés à Cineguide, ses films, séries, jeux, profil utilisateur, et l'actualité cinema du moment et tu ne donnes jamais d'informations extérieures ou hors du site. Si la question sort du cadre Cineguide, tu invites l'utilisateur à rester sur le sujet.",
};
