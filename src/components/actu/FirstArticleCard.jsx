import React from "react";

export default function FirstArticleCard({
  title,
  image,
  date,
  category,
  link,
  description,
  onClick,
}) {
  return (
    <div
      className='relative mb-8 w-full md:w-[50%] mx-auto cursor-pointer'
      onClick={onClick}>
      <img
        alt={title}
        className='w-full h-96 object-cover rounded-lg'
        src={image}
      />
      <div className='absolute inset-0 bg-opacity-50 rounded-lg flex flex-col justify-end p-6'>
        <div className='bg-white/50 dark:bg-black/50 p-4 rounded-md'>
          <p className='text-sm text-[var(--color-fuchsia)] font-bold uppercase'>
            {category} / {date}
          </p>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mt-2'>
            {title}
          </h2>
          <p className='text-sm text-gray-800 dark:text-white mt-2'>
            {description}
          </p>
          <a
            href='#'
            className='text-sm text-[var(--color-fuchsia)] hover:underline mt-4'
            onClick={(e) => e.stopPropagation()}>
            Voir l'article complet
          </a>
        </div>
      </div>
    </div>
  );
}
