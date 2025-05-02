import React, { useState, useCallback } from "react";
import { ChatbotContext } from "../../context/ChatbotContext";
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
  const [messages, setMessages] = useState([
    { from: "bot", text: mainMenu.message, keywords: mainMenu.keywords },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const resetChatbot = useCallback(() => {
    setMessages([
      { from: "bot", text: mainMenu.message, keywords: mainMenu.keywords },
    ]);
    setInput("");
  }, []);

  const handleKeyword = (keyword) => {
    let nextMsg = null;
    let nextKeywords = null;
    if (keyword === "Trouver un film") {
      nextMsg = filmMenu.message;
      nextKeywords = filmMenu.keywords;
    } else if (keyword === "Trouver une série") {
      nextMsg = serieMenu.message;
      nextKeywords = serieMenu.keywords;
    } else if (keyword === "Mon profil") {
      nextMsg = profilMenu.message;
      nextKeywords = profilMenu.keywords;
    } else if (keyword === "Jeux") {
      nextMsg = jeuxMenu.message;
      nextKeywords = jeuxMenu.keywords;
    } else if (
      keyword === "Revenir au début" ||
      keyword === "Autres demandes"
    ) {
      nextMsg = mainMenu.message;
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
    } else if (
      keyword === "Jeu de Devinettes avec Affiches Brouillées" ||
      keyword === "Devine le Film / Série par la Description Générée par IA"
    ) {
      nextMsg = "Fonctionnalité à venir !";
      nextKeywords = ["Revenir au début"];
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
    // Construit le tableau de messages pour l'API
    const apiMessages = [SYSTEM_PROMPT, { role: "user", content: userMessage }];
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

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    const userInput = input;
    setInput("");
    try {
      const botReply = await callChatApi(userInput);
      setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    } catch (err) {
      // On propage l'erreur pour que le composant parent puisse gérer le statut
      throw err;
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
      }}>
      {children}
    </ChatbotContext.Provider>
  );
}
