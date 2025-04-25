import React from "react";

export default function ArticleCard({ title, image, date, category, link }) {
  return (
    <div className='flex flex-col md:flex-row gap-4 mb-6 border-b pb-4 w-full md:w-[50%] mx-auto'>
      <img
        src={image}
        alt={title}
        className='w-full md:w-1/2 h-48 object-cover rounded'
      />
      <div className='flex flex-col justify-between md:w-1/2'>
        <div>
          <p className='text-sm text-[var(--color-fuchsia)] font-bold uppercase'>
            {category} / {date}
          </p>
          <h3 className='text-lg font-semibold mt-2'>{title}</h3>
        </div>
        <a
          href={link}
          className='text-sm text-[var(--color-fuchsia)] hover:underline mt-2'>
          Lire l'article
        </a>
      </div>
    </div>
  );
}
