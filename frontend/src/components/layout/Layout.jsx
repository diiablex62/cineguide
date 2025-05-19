import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { HomeProvider } from "../providers/HomeProvider";
import { ProfilProvider } from "../providers/ProfilProvider";
import { ActorProvider } from "../providers/ActorProvider";
import { FilmProvider } from "../providers/FilmProvider";
import { SerieProvider } from "../providers/SerieProvider";
import { CommentProvider } from "../providers/CommentProvider";
import { ActuProvider } from "../providers/ActuProvider";
import { FiltreProvider } from "../providers/FiltreProvider";
import { LangageProvider } from "../providers/LangageProvider";
import { ChatbotProvider } from "../providers/ChatbotProvider";
import ChatbotUI from "../chatbot/ChatbotUI";

const Layout = () => {
  return (
    <HomeProvider>
      <div className='min-h-screen flex flex-col w-full dark:bg-black bg-white'>
        <LangageProvider>
          <FiltreProvider>
            <ProfilProvider>
              <ActorProvider>
                <FilmProvider>
                  <SerieProvider>
                    <CommentProvider>
                      <ActuProvider>
                        <Header />
                        <Outlet />
                        <Footer />
                        <ScrollRestoration />
                      </ActuProvider>
                    </CommentProvider>
                  </SerieProvider>
                </FilmProvider>
              </ActorProvider>
            </ProfilProvider>
          </FiltreProvider>
        </LangageProvider>
      </div>
      <ChatbotProvider>
        <ChatbotUI />
      </ChatbotProvider>
    </HomeProvider>
  );
};

export default Layout;
