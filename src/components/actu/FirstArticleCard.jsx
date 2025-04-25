import React from "react";
import { useNavigate } from "react-router-dom";

export default function FirstArticleCard({
  title,
  image,
  date,
  category,
  link,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/actualites/article");
  };

  return (
    <div
      className='relative mb-8 w-full md:w-[50%] mx-auto cursor-pointer'
      onClick={handleClick}>
      <img
        alt={title}
        className='w-full h-96 object-cover rounded-lg'
        src={image}
      />
      <div className='absolute inset-0 bg-opacity-50 rounded-lg flex flex-col justify-end p-6'>
        <p className='text-sm text-[var(--color-fuchsia)] font-bold uppercase'>
          {category} / {date}
        </p>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mt-2'>
          {title}
        </h2>
        <a
          href='article'
          className='text-sm text-[var(--color-fuchsia)] hover:underline mt-4'>
          Lire l'article
        </a>
      </div>
    </div>
  );
}
