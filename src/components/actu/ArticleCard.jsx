import React from "react";

export default function ArticleCard({ title, image, date, category, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 border-b border-gray-300 dark:border-white pb-4 w-full md:w-[50%] mx-auto">
      <img
        src={image}
        alt={title}
        className="w-full md:w-1/2 h-48 object-cover rounded"
      />
      <div className="flex flex-col justify-between md:w-1/2">
        <div>
          <p className="text-sm text-[var(--color-fuchsia)] font-bold uppercase dark:text-white">
            {category} / {date}
          </p>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>
        <a
          href="#"
          target="_blank"
          className="text-sm text-[var(--color-fuchsia)] hover:underline mt-2 dark:text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Voir l'article complet
        </a>
      </div>
    </div>
  );
}
