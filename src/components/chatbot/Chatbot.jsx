import React from "react";
import { ChatbotProvider } from "../providers/ChatbotProvider";
import ChatbotUI from "./ChatbotUI";

// ...aucune logique ici...
const Chatbot = (props) => (
  <ChatbotProvider>
    <ChatbotUI {...props} />
  </ChatbotProvider>
);

export default Chatbot;
