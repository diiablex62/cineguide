import React from "react";

export default function FirstArticleCard({
  title,
  image,
  date,
  category,
  link,
}) {
  return (
    <div className='relative mb-8 w-full md:w-[50%] mx-auto'>
      <img
        alt={title}
        className='w-full h-96 object-cover rounded-lg'
        src={image}
      />
      <div className='absolute inset-0 bg-opacity-50 rounded-lg flex flex-col justify-end p-6'>
        <p className='text-sm text-[var(--color-fuchsia)] font-bold uppercase'>
          {category} / {date}
        </p>
        <h2 className='text-2xl font-bold text-white mt-2'>{title}</h2>
        <a
          href={link}
          className='text-sm text-[var(--color-fuchsia)] hover:underline mt-4'>
          Lire l'article
        </a>
      </div>
    </div>
  );
}
