import React, { useContext } from "react";
import { ActuContext } from "../../context/ActuContext";

export default function FirstArticleCard({
  title,
  image,
  date,
  category,
  link,
  description,
}) {
  const { setSelectedArticle } = useContext(ActuContext);

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleArticleClick = (e) => {
    e.preventDefault();
    setSelectedArticle({ title, image, date, category, description });
    handleClick();
  };

  return (
    <div
      className="relative mb-8 w-full md:w-[50%] mx-auto cursor-pointer"
      // onClick={handleArticleClick}
    >
      <img
        alt={title}
        className="w-full h-96 object-cover rounded-lg"
        src={image}
      />
      <div className="absolute inset-0 bg-opacity-50 rounded-lg flex flex-col justify-end p-6">
        <div className="bg-white/50 dark:bg-black/50 p-4 rounded-md">
          <p className="text-sm text-[var(--color-fuchsia)] font-bold uppercase">
            {category} / {date}
          </p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2 max-sm:line-clamp-6">
            {title}
          </h3>
          <p className="text-sm text-gray-800 dark:text-white mt-2">
            {description}
          </p>
          <a
            href={link}
            target="_blank"
            className="text-sm text-[var(--color-fuchsia)] hover:underline mt-4 block"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Voir l'article complet
          </a>
        </div>
      </div>
    </div>
  );
}
