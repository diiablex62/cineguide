import React, { createContext, useContext, useState } from "react";
import {
  MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT,
  MISTRAL_MODEL,
} from "./aiConfig";

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);

    try {
      const response = await callChatApi(newMessages);
      const botMessage = response.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API Mistral:", error);
    }
  };

  async function callChatApi(messages) {
    const body = {
      model: MISTRAL_MODEL,
      messages: messages, // [{role, content}]
    };
    try {
      const response = await fetch(MISTRAL_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        // Affiche le body envoyé et la réponse brute
        console.error("Body envoyé à l'API :", body);
        const text = await response.text();
        console.error("Réponse brute API Mistral :", text);
        throw new Error(`Erreur API Mistral: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  return (
    <ChatbotContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
};
