import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 h-[40x] w-[40px] flex justify-center items-center border cursor-pointer rounded ${
            page === currentPage
              ? "bg-fuchsia px-4 py-2 text-white"
              : "bg-white dark:text-black"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
