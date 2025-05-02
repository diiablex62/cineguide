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
    const GEMINI_API_KEY = "AIzaSyBBt42ENjo3h-srM5vyxOw44u3R5K8MaSM";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );
    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur de réponse"
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    const userInput = input;
    setInput("");
    const botReply = await callChatApi(userInput);
    setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
  };

  const renderKeywords = (keywords, handleKeyword) =>
    keywords?.length ? (
      <div
        style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "12px 0 4px 0",
          borderTop: "1px solid #eee",
          background: "#faf9fa",
        }}>
        {keywords.map((k) => (
          <button
            key={k}
            onClick={() => handleKeyword(k)}
            style={{
              display: "inline-block",
              background: "#fff",
              color: "var(--color-fuchsia)",
              border: "1px solid var(--color-fuchsia)",
              borderRadius: 20,
              padding: "6px 16px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 14,
              marginRight: 8,
              marginBottom: 0,
              transition: "background 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--color-fuchsia)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "var(--color-fuchsia)";
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
