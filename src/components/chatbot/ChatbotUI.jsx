import React from "react";
import { PiRobotThin } from "react-icons/pi";
import { useChatbot } from "../../context/ChatbotContext";
import { mainMenu } from "./chatbotMenus";

const ChatbotUI = () => {
  const {
    messages,
    input,
    setInput,
    open,
    setOpen,
    handleKeyword,
    handleSend,
    renderKeywords,
    resetChatbot,
  } = useChatbot();

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
            aria-label='Ouvrir le chatbot'>
            <PiRobotThin size={36} color='#f50057' />
          </button>
        )}
        {open && (
          <div
            style={{
              position: "relative",
              width: 350,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              minHeight: 500,
              maxHeight: 600,
            }}>
            {/* Header */}
            <div
              style={{
                background: "#f50057",
                color: "#fff",
                padding: "18px 20px 12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontWeight: 700,
                fontSize: 20,
                position: "relative",
              }}>
              <PiRobotThin size={28} color='#fff' />
              <span>Chatbot</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  marginLeft: 10,
                  background: "#fff",
                  color: "#43d477",
                  borderRadius: 8,
                  padding: "2px 10px",
                }}>
                ● En ligne
              </span>
              <button
                onClick={() => {
                  setOpen(false);
                  resetChatbot();
                }}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  background: "transparent",
                  border: "none",
                  fontSize: 22,
                  color: "#fff",
                  cursor: "pointer",
                  zIndex: 2,
                }}
                aria-label='Fermer le chatbot'>
                ×
              </button>
            </div>
            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "16px 12px 0 12px",
                background: "#faf9fa",
                minHeight: 200,
                maxHeight: 350,
                overflow: "hidden",
              }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: msg.from === "user" ? "right" : "left",
                    marginBottom: 10,
                  }}>
                  <span
                    style={{
                      background:
                        msg.from === "user"
                          ? "var(--color-gray-clair)"
                          : "var(--color-fuchsia)",
                      color: msg.from === "user" ? "#222" : "#fff",
                      borderRadius: 12,
                      padding: "10px 16px",
                      display: "inline-block",
                      fontSize: 15,
                      boxShadow:
                        msg.from === "bot"
                          ? "0 1px 4px rgba(245,0,87,0.07)"
                          : "none",
                      border: "none",
                      maxWidth: "85%",
                      wordBreak: "break-word",
                    }}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            {/* Keywords en bas */}
            {messages[messages.length - 1]?.keywords &&
              renderKeywords(
                messages[messages.length - 1].keywords,
                handleKeyword
              )}
            {/* Input */}
            <div
              style={{
                borderTop: "1px solid #eee",
                background: "#fff",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 20,
                  padding: "10px 16px",
                  fontSize: 15,
                  outline: "none",
                  background: "#faf9fa",
                }}
                placeholder='Entrez votre message ici ...'
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className='chatbot-input'
              />
              <button
                onClick={handleSend}
                style={{
                  background: "#f50057",
                  color: "#fff",
                  border: "none",
                  borderRadius: 20,
                  padding: "8px 18px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                }}>
                Envoyer
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .chatbot-input::placeholder {
          color: var(--color-placeholder);
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default ChatbotUI;
