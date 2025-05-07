import { useState, useCallback } from "react";
import { ActuContext } from "../../context/ActuContext";

export const ActuProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    date: null,
    searchQuery: "",
  });

  // Optimisation des fonctions avec useCallback
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      // Simulation d'un appel API
      const response = await fetch("your_api_endpoint");
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError("Erreur lors du chargement des articles");
    } finally {
      setLoading(false);
    }
  }, []);

  const filterArticles = useCallback(() => {
    return articles.filter((article) => {
      const matchesCategory =
        filters.category === "all" || article.category === filters.category;
      const matchesDate = !filters.date || article.date === filters.date;
      const matchesSearch =
        !filters.searchQuery ||
        article.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        article.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return matchesCategory && matchesDate && matchesSearch;
    });
  }, [articles, filters]);

  const handleSelectArticle = useCallback((article) => {
    setSelectedArticle(article);
  }, []);

  const value = {
    articles,
    setArticles,
    selectedArticle,
    setSelectedArticle: handleSelectArticle,
    loading,
    setLoading,
    error,
    setError,
    filters,
    setFilters,
    fetchArticles,
    filterArticles,
  };

  return <ActuContext.Provider value={value}>{children}</ActuContext.Provider>;
};
