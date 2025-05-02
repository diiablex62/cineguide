import React, { useState, useCallback, useContext } from "react";
import { ChatbotContext } from "../../context/ChatbotContext";
import { AuthContext } from "../../context/AuthContext";
import {
  mainMenu,
  filmMenu,
  serieMenu,
  profilMenu,
  jeuxMenu,
  filmRecoMenu,
  serieRecoMenu,
  profilRedirects,
} from "../chatbot/chatbotMenus";
import {
  MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT,
  MISTRAL_MODEL,
  SYSTEM_PROMPT,
} from "../chatbot/aiConfig";

export function ChatbotProvider({ children }) {
  const { user } = useContext(AuthContext); // suppose que user?.firstName ou user?.name

  // Détermine le nom à afficher
  const userName = user?.firstName || user?.name || "";

  // Tags principaux pour l'accueil
  const welcomeTags = ["Films", "Séries", "Jeux", "Profil", "Actualité cinéma"];

  // Message d'accueil personnalisé
  const welcomeMessage = userName
    ? `Bonjour ${userName} ! En quoi puis-je vous aider ?`
    : "Bonjour ! En quoi puis-je vous aider ?";

  // Message principal pour le menu (utilisé après l'accueil)
  const mainMenuMessage = "Comment je peux vous aider ?";

  const [messages, setMessages] = useState([
    { from: "bot", text: welcomeMessage, tags: welcomeTags },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  // Modifie resetChatbot pour ne plus réinitialiser l'historique à la fermeture
  const resetChatbot = useCallback(() => {
    setInput("");
    // Réinitialise l'historique à l'accueil
    setMessages([{ from: "bot", text: welcomeMessage, tags: welcomeTags }]);
  }, [welcomeMessage, welcomeTags]);

  const handleKeyword = (keyword) => {
    let nextMsg = null;
    let nextKeywords = null;
    if (keyword === "Trouver un film") {
      nextMsg = filmMenu.message;
      nextKeywords = filmMenu.keywords;
    } else if (keyword === "Trouver une série") {
      nextMsg = serieMenu.message;
      nextKeywords = serieMenu.keywords;
    } else if (keyword === "Mon compte") {
      nextMsg = profilMenu.message;
      nextKeywords = profilMenu.keywords;
    } else if (keyword === "Jeux") {
      nextMsg = jeuxMenu.message;
      nextKeywords = jeuxMenu.keywords;
    } else if (
      keyword === "Revenir au début" ||
      keyword === "Autres demandes"
    ) {
      // Utilise le message principal, pas le message d'accueil
      nextMsg = mainMenuMessage;
      nextKeywords = mainMenu.keywords;
    } else if (
      keyword === "Recommandations" &&
      messages[messages.length - 1].text === filmMenu.message
    ) {
      nextMsg = filmRecoMenu.message;
      nextKeywords = filmRecoMenu.keywords;
    } else if (
      ["Non, faire une recherche", "Voir d'autres recommandations"].includes(
        keyword
      ) &&
      messages[messages.length - 1].text.startsWith("D'après vos préférences")
    ) {
      nextMsg = filmMenu.message;
      nextKeywords = filmMenu.keywords;
    } else if (
      keyword === "Recommandations" &&
      messages[messages.length - 1].text === serieMenu.message
    ) {
      nextMsg = serieRecoMenu.message;
      nextKeywords = serieRecoMenu.keywords;
    } else if (
      ["Non, faire une recherche", "Voir d'autres recommandations"].includes(
        keyword
      ) &&
      messages[messages.length - 1].text.startsWith("D'après vos préférences")
    ) {
      nextMsg = serieMenu.message;
      nextKeywords = serieMenu.keywords;
    } else if (profilRedirects[keyword]) {
      nextMsg = profilRedirects[keyword];
      nextKeywords = ["Autres demandes"];
      // Ajoute ce test pour la saisie directe
    } else if (
      keyword.toLowerCase().includes("mot de passe") ||
      keyword.toLowerCase().includes("changer de mot de passe")
    ) {
      nextMsg = profilRedirects["Changer de mot de passe"];
      nextKeywords = ["Autres demandes"];
    }
    if (nextMsg) {
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: keyword },
        { from: "bot", text: nextMsg, keywords: nextKeywords },
      ]);
    }
  };

  const callChatApi = async (userMessage) => {
    // Construit l'historique complet pour l'API (SYSTEM_PROMPT + tous les messages)
    const apiMessages = [
      SYSTEM_PROMPT,
      ...messages
        .filter((m) => m.from === "user" || m.from === "bot")
        .map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
      { role: "user", content: userMessage },
    ];
    const response = await fetch(MISTRAL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: apiMessages,
        max_tokens: 200,
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Body envoyé à l'API :", {
        model: MISTRAL_MODEL,
        messages: apiMessages,
        max_tokens: 200,
      });
      console.error("Réponse brute API Mistral :", text);
      throw new Error(
        `Erreur API Mistral: ${response.status} ${response.statusText} - ${text}`
      );
    }
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "Erreur de réponse";
  };

  // Nouvelle fonction pour mapper la réponse IA vers un menu ou une redirection
  function mapIaResponseToMenuOrRedirect(iaText) {
    // Recherche tous les mots-clés [menu:...] dans la réponse
    const menuMatches = [...iaText.matchAll(/\[menu:([^\]]+)\]/gi)];
    const redirectMatch = iaText.match(/\[redirect:([^\]]+)\]/i);

    // Texte sans les mots-clés à la fin
    const cleanedText = iaText
      .replace(/\s*(\[menu:[^\]]+\]|\[redirect:[^\]]+\])\s*/gi, "")
      .trim();

    // Récupère tous les tags de menu pour affichage sous la bulle
    const tags = menuMatches.map((match) => match[1].trim());

    if (menuMatches.length > 0) {
      // On garde le comportement précédent pour les boutons (keywords)
      let allKeywords = [];
      const menuButtonsMap = {
        films: filmMenu.keywords,
        film: filmMenu.keywords,
        séries: serieMenu.keywords,
        série: serieMenu.keywords,
        series: serieMenu.keywords,
        jeux: jeuxMenu.keywords,
        profil: profilMenu.keywords,
        "actualité cinéma": [
          "Dernières sorties",
          "Tendances",
          "Revenir au début",
        ],
        main: mainMenu.keywords,
        accueil: mainMenu.keywords,
      };
      menuMatches.forEach((match) => {
        const menu = match[1].toLowerCase().trim();
        if (menuButtonsMap[menu]) {
          allKeywords = [...allKeywords, ...menuButtonsMap[menu]];
        }
      });
      allKeywords = [...new Set(allKeywords)];
      return [
        {
          text: cleanedText,
          keywords: allKeywords.length ? allKeywords : null,
          tags,
        },
      ];
    }

    if (redirectMatch) {
      const redirectKey = redirectMatch[1].trim();
      if (profilRedirects[redirectKey]) {
        return [
          {
            text: cleanedText,
            keywords: ["Revenir au début"],
            tags: [`redirect:${redirectKey}`],
          },
        ];
      }
    }

    // Fallback : ancienne logique si pas de mot-clé détecté
    return [{ text: iaText, keywords: ["Revenir au début"], tags: [] }];
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    const userInput = input;
    setInput("");
    try {
      const iaReply = await callChatApi(userInput);
      const mappedArr = mapIaResponseToMenuOrRedirect(iaReply);
      setMessages((msgs) => [
        ...msgs,
        ...mappedArr.map((m) => ({
          from: "bot",
          text: m.text,
          keywords: m.keywords,
          tags: m.tags,
        })),
      ]);
    } catch (err) {
      throw err;
    }
  };

  // Ajoute cette fonction utilitaire pour rendre les tags cliquables
  const handleTagClick = (tag) => {
    // On mappe les tags d'accueil vers les mots-clés attendus par handleKeyword
    switch (tag) {
      case "Films":
        handleKeyword("Trouver un film");
        break;
      case "Séries":
        handleKeyword("Trouver une série");
        break;
      case "Jeux":
        handleKeyword("Jeux");
        break;
      case "Profil":
      case "Mon compte":
        handleKeyword("Mon compte");
        break;
      case "Actualité cinéma":
        // À adapter selon ta logique, ou afficher un message générique
        setMessages((msgs) => [
          ...msgs,
          { from: "user", text: tag },
          {
            from: "bot",
            text: "Voici l'actualité cinéma du moment.",
            keywords: ["Revenir au début"],
          },
        ]);
        break;
      default:
        break;
    }
  };

  const renderKeywords = (keywords, handleKeyword) =>
    keywords?.length ? (
      <div
        className='block w-full overflow-x-auto overflow-y-hidden whitespace-nowrap pt-2 pb-1 border-t border-transparent bg-transparent scrollbar-none'
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {keywords.map((k) => (
          <button
            key={k}
            onClick={() => handleKeyword(k)}
            className='inline-block bg-[#f6f7fa] text-[#222] border border-[#bdbdbd] rounded-[10px] px-3 py-1 cursor-pointer font-medium text-[13px] mr-2 mb-1 transition-colors duration-200 whitespace-nowrap shadow-sm'
            style={{
              fontFamily: "inherit",
              fontWeight: 500,
              letterSpacing: 0,
            }}>
            {k}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        setMessages,
        input,
        setInput,
        open,
        setOpen,
        handleKeyword,
        handleSend,
        renderKeywords,
        resetChatbot,
        handleTagClick, // <-- expose la fonction au ChatbotUI
      }}>
      {children}
    </ChatbotContext.Provider>
  );
}
