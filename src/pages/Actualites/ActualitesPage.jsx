import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../components/actu/ArticleCard";
import FirstArticleCard from "../../components/actu/FirstArticleCard";

const fetchRSSArticles = async (rssUrl) => {
  const proxyUrl = "https://api.allorigins.win/get?url=";
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "application/xml");
    return Array.from(xml.querySelectorAll("item")).map((item) => ({
      title: item.querySelector("title")?.textContent || "Titre indisponible",
      link: item.querySelector("link")?.textContent || "#",
      pubDate: item.querySelector("pubDate")?.textContent || "",
      category: item.querySelector("category")?.textContent || "Actualité",
      image:
        item.querySelector("enclosure")?.getAttribute("url") ||
        "https://via.placeholder.com/150",
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération du flux RSS :", error);
    return [];
  }
};

export default function ActualitesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      const rssUrl = "https://www.allocine.fr/rss/news.xml";
      const fetchedArticles = await fetchRSSArticles(rssUrl);
      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    loadArticles();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArticleClick = (article) => {
    const encodedTitle = encodeURIComponent(article.title);
    navigate(`/actualites/${encodedTitle}`, { state: { article } });
  };

  const renderArticles = () => {
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );

    return currentArticles.map((article, index) => {
      const date = new Date(article.pubDate);
      const formattedDate = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return index === 0 ? (
        <FirstArticleCard
          key={index}
          {...article}
          date={`${formattedDate}, ${formattedTime}`}
          onClick={() => handleArticleClick(article)}
        />
      ) : (
        <ArticleCard
          key={index}
          {...article}
          date={`${formattedDate}, ${formattedTime}`}
          onClick={() => handleArticleClick(article)}
        />
      );
    });
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
        <p className='text-gray-800 dark:text-white'>
          Chargement des articles...
        </p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-[var(--color-fuchsia)] mb-6 w-full md:w-[50%] mx-auto text-left'>
        ACTUALITÉ
      </h2>
      {renderArticles()}
      <div className='flex justify-center mt-6'>
        {Array.from(
          { length: Math.ceil(articles.length / articlesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 border rounded cursor-pointer ${
                currentPage === index + 1
                  ? "bg-[var(--color-fuchsia)] text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
