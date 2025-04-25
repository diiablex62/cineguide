import React, { useState } from "react";
import ArticleCard from "../../components/actu/ArticleCard";
import FirstArticleCard from "../../components/actu/FirstArticleCard";

export default function ActualitesPage() {
  const articles = [
    {
      title:
        "Avengers Doomsday : fausse bonne nouvelle pour le retour de ce X-Men ?",
      image: "/path/to/image1.jpg",
      date: "10 avril 2025",
      category: "FILMS",
      link: "/article/1",
    },
    {
      title:
        "Minecraft 2 : la suite déjà en discussion chez la Warner après le démarrage record du film",
      image: "/path/to/image2.jpg",
      date: "10 avril 2025",
      category: "FILMS",
      link: "/article/2",
    },
    {
      title:
        "Le Podcast d'Écran Large : Minecraft écrase tout, Tron 3 et Mission Impossible 8 intriguent...",
      image: "/path/to/image3.jpg",
      date: "10 avril 2025",
      category: "FILMS",
      link: "/article/3",
    },
    {
      title: "Le méga-bide Mickey 17 : pourquoi Warner enchaîne les échecs ?",
      image: "/path/to/image4.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/4",
    },
    {
      title:
        "Le film le plus terrifiant que vous n'avez pas vu va avoir le droit à son remake, et c'est d'actualité",
      image: "/path/to/image5.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/5",
    },
    {
      title:
        "Predator : bande-annonce entre samouraïs et vikings pour le film secret Killer of Killers (et une date)",
      image: "/path/to/image6.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/6",
    },
    {
      title:
        "Dune 3 : le casting s’agrandit avec l’un des pires ennemis de Paul Atréides (et c’est un grand oui)",
      image: "/path/to/image7.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/7",
    },
    {
      title:
        "Balle Perdue 3 : bande-annonce explosive pour le retour du Fast and Furious français de Netflix",
      image: "/path/to/image8.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/8",
    },
    {
      title:
        "Souviens-toi... l’été dernier : coup de vieux avec les premières photos de la suite qui fait peur",
      image: "/path/to/image9.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/9",
    },
    {
      title:
        "Tron Ares : Jared Leto joue un méchant Pinocchio dans le nouveau film, apparemment",
      image: "/path/to/image10.jpg",
      date: "09 avril 2025",
      category: "FILMS",
      link: "/article/10",
    },
    {
      title:
        "Road House 2 : la suite du remake Amazon avec Jake Gyllenhaal a peut-être trouvé un nouveau...",
      image: "/path/to/image11.jpg",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/11",
    },
    {
      title:
        "The Odyssey : on connaît peut-être le rôle de Robert Pattinson dans le film de Nolan",
      image: "/path/to/image12.jpg",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/12",
    },
    {
      title:
        "An Innocent Girl : Netflix prépare un thriller érotique avec Jaume Collet-Serra (Carry-On)",
      image: "/path/to/image13.jpg",
      date: "08 avril 2025",
      category: "FILMS",
      link: "/article/13",
    },
    {
      title:
        "Minecraft : cette révélation prouve le total chaos en coulisses (et explique beaucoup de choses)",
      image: "/path/to/image14.jpg",
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
            date={article.date}
            category={article.category}
            link={article.link}
          />
        ) : (
          <ArticleCard
            key={index}
            title={article.title}
            image={article.image}
            date={article.date}
            category={article.category}
            link={article.link}
          />
        )
      )}
      <div className='flex justify-center mt-6'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 border rounded ${
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
