import React, { useState } from "react";
import { ChatbotContext } from "../../context/ChatbotContext";
import {
  MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT,
  MISTRAL_MODEL,
  SYSTEM_PROMPT,
} from "../chatbot/aiConfig";

// Génère une salutation variée à chaque ouverture
function getRandomGreeting() {
  const greetings = [
    "Salut ! Tu veux que je t'aide à trouver un film ou une série ?",
    "Coucou ! Dis-moi ce que tu cherches, je peux t'aider à trouver un film ou une série 😊",
    "Hello ! Tu as besoin d'aide pour choisir un film ou une série ?",
    "Bienvenue ! Je peux t'aider à dénicher un film ou une série, tu veux une suggestion ?",
    "Hey ! Tu veux que je t'aide à rechercher un film ou une série ?",
    "Besoin d'un coup de main pour trouver quoi regarder ? Je suis là pour t'aider !",
    "Salut ! Dis-moi si tu veux une recommandation ou de l'aide pour ta recherche.",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export function ChatbotProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: getRandomGreeting(),
      date: new Date().toISOString(),
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
    const now = new Date().toISOString();
    const userMsg = { from: "user", text: input, date: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const botReply = await fetchBotReply(input);
      const botMsg = {
        from: "bot",
        text: botReply,
        date: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const botMsg = {
        from: "bot",
        text: "Désolé, je rencontre un problème technique.",
        date: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }
  };

  const resetChatbot = () => {
    setMessages([
      {
        from: "bot",
        text: getRandomGreeting(),
        date: new Date().toISOString(),
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
      }}>
      {children}
    </ChatbotContext.Provider>
  );
}
