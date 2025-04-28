import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ActualiteDetail() {
  const location = useLocation();
  const article = location.state?.article;
  const navigate = useNavigate();

  useEffect(() => {
    if (article?.link) {
      window.open(article.link, "_blank", "noopener,noreferrer");
    }
    navigate("/actualites");
  }, [article, navigate]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
      <p className='text-gray-800 dark:text-white'>Redirection en cours...</p>
    </div>
  );
}
