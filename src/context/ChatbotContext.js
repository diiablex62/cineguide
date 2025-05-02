import { createContext, useContext } from "react";

export const ChatbotContext = createContext();
export const useChatbot = () => useContext(ChatbotContext);
