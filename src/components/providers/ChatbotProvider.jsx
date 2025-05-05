import React, { useState } from "react";
import { ChatbotContext } from "../../context/ChatbotContext";
import {
  MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT,
  MISTRAL_MODEL,
  SYSTEM_PROMPT,
} from "../chatbot/aiConfig";
import { mainMenu } from "../chatbot/chatbotMenus"; // <-- Ajout de l'import

export function ChatbotProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: mainMenu.message, // <-- Utilise le message d'accueil du menu
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  // Appel à l'API Mistral pour obtenir la réponse du bot
  const fetchBotReply = async (userMessage) => {
    const apiMessages = [
      SYSTEM_PROMPT,
      ...messages.map((m) => ({
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
      throw new Error(
        `Erreur API Mistral: ${response.status} ${response.statusText} - ${text}`
      );
    }
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "Erreur de réponse";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const botReply = await fetchBotReply(input);
      setMessages((prev) => [
        ...prev,
        userMsg,
        { from: "bot", text: botReply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        userMsg,
        { from: "bot", text: "Désolé, je rencontre un problème technique." },
      ]);
    }
  };

  const resetChatbot = () => {
    setMessages([
      {
        from: "bot",
        text: mainMenu.message,
      },
    ]);
    setInput("");
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        setMessages,
        input,
        setInput,
        open,
        setOpen,
        handleSend,
        resetChatbot,
        // à compléter avec les nouvelles fonctions plus tard
      }}>
      {children}
    </ChatbotContext.Provider>
  );
}
