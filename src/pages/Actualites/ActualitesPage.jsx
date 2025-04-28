import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../components/actu/ArticleCard";
import FirstArticleCard from "../../components/actu/FirstArticleCard";

export default function ActualitesPage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const rssUrl = encodeURIComponent(
          "https://www.allocine.fr/rss/news.xml"
        );
        const response = await fetch(proxyUrl + rssUrl);
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "application/xml");
        const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title:
            item.querySelector("title")?.textContent || "Titre indisponible",
          link: item.querySelector("link")?.textContent || "#",
          pubDate: item.querySelector("pubDate")?.textContent || "",
          category: item.querySelector("category")?.textContent || "Actualité",
          image:
            item.querySelector("enclosure")?.getAttribute("url") ||
            "https://via.placeholder.com/150",
        }));
        setArticles(items);
      } catch (error) {
        console.error("Erreur lors de la récupération du flux RSS :", error);
      }
    };

    fetchRSS();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArticleClick = (article) => {
    const encodedTitle = encodeURIComponent(article.title);
    navigate(`/actualites/${encodedTitle}`, { state: { article } });
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-[var(--color-fuchsia)] mb-6 w-full md:w-[50%] mx-auto text-left'>
        ACTUALITÉ
      </h2>
      {currentArticles.map((article, index) =>
        index === 0 ? (
          <FirstArticleCard
            key={index}
            title={article.title}
            image={article.image}
            date={new Date(article.pubDate).toLocaleDateString("fr-FR")}
            category={article.category}
            description={article.description}
            link={article.link}
            onClick={() => handleArticleClick(article)}
            className='text-gray-800 dark:text-white'
          />
        ) : (
          <ArticleCard
            key={index}
            title={article.title}
            image={article.image}
            date={new Date(article.pubDate).toLocaleDateString("fr-FR")}
            category={article.category}
            description={article.description}
            link={article.link}
            onClick={() => handleArticleClick(article)}
            className='text-gray-800 dark:text-white'
          />
        )
      )}
      <div className='flex justify-center mt-6'>
        {Array.from({ length: totalPages }, (_, index) => (
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
        ))}
      </div>
    </div>
  );
}
