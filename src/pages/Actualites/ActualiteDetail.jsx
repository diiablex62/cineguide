import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ActualiteDetail() {
  const { state } = useLocation();
  const article = state?.article;
  const [articleContent, setArticleContent] = useState("");
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement

  // proxy pour contourner les CORS
  useEffect(() => {
    const fetchArticleContent = async () => {
      if (!article?.link) return;
      try {
        const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
        const response = await fetch(
          proxyUrl + encodeURIComponent(article.link)
        );
        const data = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(data, "text/html");

        // Cibler le contenu principal avec l'ID #article-content
        const contentElement = html.querySelector("#article-content");
        if (contentElement) {
          // Supprimer uniquement les sections indésirables
          const unwantedElements = contentElement.querySelectorAll(
            ".cms-item-wrapper, .media-info-entity, .button-action-holder"
          );
          unwantedElements.forEach((el) => el.remove());

          // Gérer les images avec `data-src`
          const images = contentElement.querySelectorAll("img");
          images.forEach((img) => {
            if (img.getAttribute("data-src")) {
              img.setAttribute("src", img.getAttribute("data-src"));
            }
            img.classList.add("max-w-full", "h-auto", "my-4");
          });

          // Ajouter des classes Tailwind aux paragraphes
          const paragraphs = contentElement.querySelectorAll(".bo-p");
          paragraphs.forEach((p) => {
            p.classList.add(
              "mb-6",
              "leading-relaxed",
              "text-base",
              "text-gray-800",
              "dark:text-white"
            );
          });

          // Extraire le contenu nettoyé
          setArticleContent(contentElement.innerHTML);
        } else {
          setArticleContent("Contenu indisponible.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du contenu de l'article :",
          error
        );
        setArticleContent("Erreur lors de la récupération du contenu.");
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };
    fetchArticleContent();
  }, [article]);

  if (!article) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
        <p className='text-gray-800 dark:text-white'>
          Aucun article sélectionné.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
        <p className='text-gray-800 dark:text-white'>Chargement...</p>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
      <div className='w-full md:w-[50%] p-6'>
        <h2 className='text-2xl font-bold text-[var(--color-fuchsia)] mb-6'>
          {article.title}
        </h2>
        <img
          src={article.image}
          alt={article.title}
          className='w-full h-auto rounded-lg mb-4'
        />
        <p className='text-sm text-gray-500 italic mb-4'>
          {new Date(article.pubDate).toLocaleDateString("fr-FR")}
        </p>
        <div
          className='text-base text-gray-800 dark:text-white mb-4 space-y-4'
          dangerouslySetInnerHTML={{ __html: articleContent }}></div>
        <div className='mt-6'>
          <a
            href={article.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[var(--color-fuchsia)] hover:underline'>
            Voir l'article original sur Allociné
          </a>
        </div>
      </div>
    </div>
  );
}
