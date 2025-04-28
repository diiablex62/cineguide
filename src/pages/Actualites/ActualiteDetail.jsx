import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ActualiteDetail() {
  const { title } = useParams();
  const location = useLocation();
  const article = location.state?.article;
  const [articleContent, setArticleContent] = useState("");
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement

  // Liste des proxys à tester
  const proxyList = [
    "https://corsproxy.io/?",
    "https://api.allorigins.win/get?url=",
    "https://thingproxy.freeboard.io/fetch/",
  ];

  useEffect(() => {
    const fetchArticleContent = async () => {
      if (!article?.link) return;

      for (const proxyUrl of proxyList) {
        try {
          const response = await fetch(
            proxyUrl + encodeURIComponent(article.link)
          );
          const data = proxyUrl.includes("allorigins")
            ? await response.json()
            : await response.text();
          const parser = new DOMParser();
          const html = parser.parseFromString(
            proxyUrl.includes("allorigins") ? data.contents : data,
            "text/html"
          );

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
            return; // Arrêter la boucle si un proxy fonctionne
          }
        } catch (error) {
          console.warn(`Erreur avec le proxy ${proxyUrl}:`, error);
        }
      }

      // Dernier recours : mode `no-cors`
      try {
        const response = await fetch(article.link, { mode: "no-cors" });
        const data = await response.text();
        setArticleContent(
          "Le contenu ne peut pas être affiché en raison de restrictions CORS. Veuillez consulter l'article original."
        );
      } catch (error) {
        console.error("Erreur avec le mode no-cors :", error);
        setArticleContent(
          "Impossible de récupérer le contenu de l'article. Veuillez réessayer plus tard."
        );
      }
    };

    fetchArticleContent().finally(() => setIsLoading(false));
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
          {decodeURIComponent(title)}
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
