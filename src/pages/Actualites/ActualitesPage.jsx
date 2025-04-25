import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ArticleCard from "../../components/actu/ArticleCard";
import FirstArticleCard from "../../components/actu/FirstArticleCard";

export default function ActualitesPage() {
  const articles = [
    {
      title:
        "Avengers Doomsday : fausse bonne nouvelle pour le retour de ce X-Men ?",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/avengers-doomsday-fausse-bonne-nouvelle-pour-le-retour-de-ce-x-men--1260x708.jpg.webp",
      date: "10 avril 2025",
      category: "FILMS",
      link: "/article",
    },
    {
      title:
        "Minecraft 2 : la suite déjà en discussion chez la Warner après le démarrage record du film",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/minecraft-suite-1260x708.jpg.webp",
      date: "10 avril 2025",
      category: "FILMS",
      link: "/article/2",
    },
    {
      title:
        "Le Podcast d'Écran Large : Minecraft écrase tout, Tron 3 et Mission Impossible 8 intriguent...",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/design-sans-titre-2025-04-09t180228.656-1260x708.jpg.webp",
      date: "10 avril 2025",
      category: "FILMS",
      link: "/article/3",
    },
    {
      title: "Le méga-bide Mickey 17 : pourquoi Warner enchaîne les échecs ?",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/bo_warner_v3b-1260x708.jpg.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/4",
    },
    {
      title:
        "Le film le plus terrifiant que vous n'avez pas vu va avoir le droit à son remake, et c'est d'actualité",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/design-sans-titre-2025-04-09t164624.367-1260x708.jpg.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/5",
    },
    {
      title:
        "Predator : bande-annonce entre samouraïs et vikings pour le film secret Killer of Killers (et une date)",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/predator-ba-1260x708.jpg.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/6",
    },
    {
      title:
        "Dune 3 : le casting s’agrandit avec l’un des pires ennemis de Paul Atréides (et c’est un grand oui)",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/design-sans-titre-2025-04-01t155046.217-1260x708.jpg.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/7",
    },
    {
      title:
        "Balle Perdue 3 : bande-annonce explosive pour le retour du Fast and Furious français de Netflix",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/balle-perdue-3-une-bande-annonce-explosive-pour-le-retour-du-fast-and-furious-francais-1-1260x708.jpg.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/8",
    },
    {
      title:
        "Souviens-toi... l’été dernier : coup de vieux avec les premières photos de la suite qui fait peur",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/souviens-toi-lete-dernier-coup-de-vieux-premieres-photos-1260x708.png.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/9",
    },
    {
      title:
        "Tron Ares : Jared Leto joue un méchant Pinocchio dans le nouveau film, apparemment",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/tron-ares-jared-leto-joue-un-mechant-pinocchio-dans-le-nouveau-film.jpg.webp",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/10",
    },
    {
      title:
        "Road House 2 : la suite du remake Amazon avec Jake Gyllenhaal a peut-être trouvé un nouveau...",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/road-house-2-realisateur-1260x708.jpg.webp",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/11",
    },
    {
      title:
        "The Odyssey : on connaît peut-être le rôle de Robert Pattinson dans le film de Nolan",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/the-odyssey-on-connait-peut-etre-le-role-de-robert-pattinson-dans-le-film-de-nolan-1260x708.jpg.webp",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/12",
    },
    {
      title:
        "An Innocent Girl : Netflix prépare un thriller érotique avec Jaume Collet-Serra (Carry-On)",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/design-sans-titre-2025-04-08t140917.028-1260x708.jpg.webp",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/13",
    },
    {
      title:
        "Minecraft : cette révélation prouve le total chaos en coulisses (et explique beaucoup de choses)",
      image:
        "https://www.ecranlarge.com/content/uploads/2025/04/design-sans-titre-2025-04-08t144800.767-1260x708.jpg.webp",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/14",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

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
            image={
              currentArticles.find(
                (a) =>
                  a.title ===
                  "Road House 2 : la suite du remake Amazon avec Jake Gyllenhaal a peut-être trouvé un nouveau..."
              )?.image || article.image
            }
            date={article.date}
            category={article.category}
            link='/article'
            className='text-gray-800 dark:text-white'
          />
        ) : (
          <ArticleCard
            key={index}
            title={article.title}
            image={article.image}
            date={article.date}
            category={article.category}
            link='#'
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
