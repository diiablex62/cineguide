import { Outlet } from "react-router-dom";
import FilmProvider from "./components/providers/FilmProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import FiltreProvider from "./components/providers/FiltreProvider";
import Header from "./components/Header";
import LangageProvider from "./components/providers/LangageProvider";
import MenuProvider from "./components/providers/MenuProvider";
import SerieProvider from "./components/providers/SerieProvider";
import ActorProvider from "./components/providers/ActorProvider";
import ProfilProvider from "./components/providers/ProfilProvider";
import CommentProvider from "./components/providers/CommentProvider";
import Footer from "./components/Footer";
import { HomeProvider } from "./components/providers/HomeProvider";
import { ActuProvider } from "./components/providers/ActuProvider";
import { ChatbotProvider } from "./components/providers/ChatbotProvider";
import ChatbotUI from "./components/chatbot/ChatbotUI";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <HomeProvider>
      <div className='min-h-screen flex flex-col w-full dark:bg-black bg-white'>
        <ThemeProvider>
          <LangageProvider>
            <MenuProvider>
              <FiltreProvider>
                <ProfilProvider>
                  <ActorProvider>
                    <FilmProvider>
                      <SerieProvider>
                        <CommentProvider>
                          <ActuProvider>
                            <Header />
                            <Outlet />
                            <Footer></Footer>
                          </ActuProvider>
                        </CommentProvider>
                      </SerieProvider>
                    </FilmProvider>
                  </ActorProvider>
                </ProfilProvider>
              </FiltreProvider>
            </MenuProvider>
          </LangageProvider>
        </ThemeProvider>
      </div>
      <ChatbotProvider>
        <ChatbotUI />
      </ChatbotProvider>
    </HomeProvider>
  );
}

export default App;
