import React, { useState, useEffect, useRef } from "react";
import { PiRobotThin } from "react-icons/pi";
import { useChatbot } from "../../context/ChatbotContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT,
  MISTRAL_MODEL,
} from "./aiConfig";

const USER_AVATAR = "https://randomuser.me/api/portraits/men/3.jpg";

const SendIcon = ({ color = "#f50057", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 28 28'
    fill='none'
    className='block'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M6.5 21.5L21.5 14L6.5 6.5V12.25L16 14L6.5 15.75V21.5Z'
      stroke={color}
      strokeWidth='2'
      strokeLinejoin='round'
      fill='none'
    />
  </svg>
);

const MinimizeIcon = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
    <circle cx='11' cy='11' r='10' stroke='#fff' strokeWidth='2' />
    <rect x='6.5' y='10.25' width='9' height='1.5' rx='0.75' fill='#fff' />
  </svg>
);

const CloseIcon = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
    <circle cx='11' cy='11' r='10' stroke='#fff' strokeWidth='2' />
    <line x1='7' y1='7' x2='15' y2='15' stroke='#fff' strokeWidth='2' />
    <line x1='15' y1='7' x2='7' y2='15' stroke='#fff' strokeWidth='2' />
  </svg>
);

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
    handleTagClick, 
  } = useChatbot();

  const { isLoggedIn } = useContext(AuthContext);

  // Ajout de l'état pour le statut en ligne
  const [isOnline, setIsOnline] = useState(true);

  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll doux uniquement si l'utilisateur est déjà en bas
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      60;
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Scroll toujours vers le bas à chaque nouveau message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Vérifie le statut de l'API Mistral
  const checkApiStatus = async () => {
    try {
      const response = await fetch(MISTRAL_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: MISTRAL_MODEL,
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 5,
        }),
      });
      if (!response.ok) throw new Error(`API Mistral: ${response.status}`);
      setIsOnline(true);
    } catch (e) {
      setIsOnline(false);
    }
  };

  // Wrapper pour handleSend qui vérifie l'API (pour la compatibilité)
  const handleSendWithStatus = async () => {
    if (!input.trim()) return;
    try {
      await handleSend();
      setIsOnline(true);
    } catch (e) {
      setIsOnline(false);
    }
  };

  async function sendMessageToMistral(messages) {
    const body = {
      model: "mistral-tiny",
      messages: messages, 
    };
    try {
      const response = await fetch(
        "https://api.mistral.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ZuLlbUj0bL1jO3APrVTnKLFBgomMdyrV`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error("Body envoyé à l'API :", body);
        const text = await response.text();
        console.error("Réponse brute API Mistral :", text);
        throw new Error(`API Mistral: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Focus sur le champ de saisie à l'ouverture du chatbot
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!isLoggedIn) return null;

  return (
    <>
      <div className='fixed bottom-6 right-6 z-[1000]'>
        {!open && (
          <button
            onClick={() => {
              setOpen(true);
              checkApiStatus();
            }}
            className='
    group
    bg-[color:var(--color-fuchsia)]
    border
    border-[color:var(--color-fuchsia)]
    rounded-full
    shadow-lg
    w-[44px]
    h-[44px]
    flex
    items-center
    justify-center
    cursor-pointer
    transition-colors
    duration-200
    hover:bg-[white]
    hover:shadow-xl
    active:scale-95
  '
            aria-label='Ouvrir le chatbot'>
            <span className='rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200'>
              <PiRobotThin
                size={24}
                className='text-white group-hover:text-[color:var(--color-fuchsia)] transition-colors duration-200'
              />
            </span>
          </button>
        )}
        {open && (
          <div className='relative w-[290px] bg-[#faf9fa] rounded-[18px] shadow-2xl overflow-hidden flex flex-col min-h-[380px] max-h-[500px]'>
            {/* Header */}
            <div className='bg-[#f50057] px-4 pt-3 pb-2 flex items-center rounded-t-[18px] relative'>
              <span className='bg-white rounded-full w-9 h-9 flex items-center justify-center mr-3 border border-[#eee]'>
                <PiRobotThin size={24} color='#f50057' />
              </span>
              <div className='flex flex-col flex-1'>
                <span className='font-bold text-white text-[18px] leading-[1.1] font-sans'>
                  Chatbot
                </span>
                <span className='flex items-center mt-0.5'>
                  <span
                    className={`w-2 h-2 rounded-full mr-1 inline-block ${
                      isOnline ? "bg-[#00e676]" : "bg-red-500"
                    }`}></span>
                  <span
                    className={`text-[12px] font-medium ${
                      isOnline ? "text-[#00e676]" : "text-red-500"
                    }`}>
                    {isOnline ? "En ligne" : "Hors ligne"}
                  </span>
                </span>
              </div>
              {/* Bouton Minimize (ne réinitialise pas) */}
              <button
                onClick={() => setOpen(false)}
                className='absolute top-3 right-10 bg-transparent border-none p-0 m-0 cursor-pointer'
                aria-label='Abaisser le chatbot'>
                <MinimizeIcon />
              </button>
              {/* Bouton Close (réinitialise) */}
              <button
                onClick={() => {
                  setOpen(false);
                  resetChatbot();
                }}
                className='absolute top-3 right-3 bg-transparent border-none p-0 m-0 cursor-pointer'
                aria-label='Fermer le chatbot'>
                <CloseIcon />
              </button>
            </div>
            {/* Messages */}
            <div
              ref={containerRef}
              className='flex-1 px-2 pt-3 bg-[#faf9fa] min-h-[120px] max-h-[240px] overflow-y-auto overflow-x-hidden flex flex-col gap-1'>
              {messages.map((msg, idx) => {
                const date = msg.date ? new Date(msg.date) : new Date();
                const time = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "user"
                        ? "flex-row-reverse items-end"
                        : "flex-row items-start"
                    } mb-0.5`}>
                    {/* Avatar */}
                    {msg.from === "bot" ? (
                      <span className='bg-white rounded-full w-7 h-7 flex items-center justify-center mr-2 ml-0.5 shadow-sm flex-shrink-0 border border-[#eee]'>
                        <PiRobotThin size={16} color='#f50057' />
                      </span>
                    ) : (
                      <img
                        src={USER_AVATAR}
                        alt='avatar'
                        className='w-7 h-7 rounded-full ml-2 mr-0.5 object-cover border-2 border-white shadow-sm flex-shrink-0'
                      />
                    )}
                    {/* Message + heure */}
                    <div
                      className={`flex flex-col ${
                        msg.from === "user" ? "items-end" : "items-start"
                      } w-full min-w-0`}>
                      <span
                        className={`
                          ${
                            msg.from === "user"
                              ? "bg-[#f3f3f3] text-[#222]"
                              : "bg-[#f50057] text-white"
                          }
                          rounded-lg px-3 py-2 inline-block text-[13px] shadow-sm border-none max-w-[80%] min-w-[70px] break-words
                          ${msg.from === "bot" ? "ml-0" : "ml-auto"}
                          ${msg.from === "user" ? "mr-0" : "mr-auto"}
                        `}>
                        {msg.text}
                      </span>
                      <span
                        className={`
                          text-[10px] text-[#bdbdbd] mt-0.5
                          ${
                            msg.from === "bot"
                              ? "ml-1 self-start text-left"
                              : "mr-1 self-end text-right"
                          }
                          min-w-[40px]
                        `}>
                        {time}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Référence pour le scroll automatique */}
              <div ref={messagesEndRef} />
            </div>
            {/* Footer : champ de saisie utilisateur */}
            <div className='bg-transparent px-2 py-2 flex items-center border-none rounded-2xl mb-1'>
              <div className='flex-1 bg-[#edeef0] rounded-lg flex items-center px-2 min-h-[36px] shadow-none border-none'>
                <input
                  ref={inputRef}
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className='flex-1 border-none bg-transparent text-[15px] outline-none text-[#222] py-2 placeholder-[#bdbdbd]'
                  placeholder='Entrez votre message ici ...'
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") await handleSendWithStatus();
                  }}
                />
                <button
                  onClick={handleSendWithStatus}
                  className='bg-none border-none rounded-full p-0 ml-1 cursor-pointer flex items-center'
                  aria-label='Envoyer'>
                  <SendIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .no-horizontal-scroll::-webkit-scrollbar {
          display: none !important;
          height: 0 !important;
        }
        .no-horizontal-scroll {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      `}</style>
    </>
  );
};

export default ChatbotUI;
