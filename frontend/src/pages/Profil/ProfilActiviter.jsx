import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import Activiter from "../../data/Activiter.json";
import Pagination from "../../components/pagination/Pagination";
import { NavLink } from "react-router-dom";

export default function ProfilActiviter() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedActiviter = Activiter.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className='w-full dark:bg-black dark:text-white'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Mon Activité</h2>

      <div className='flex flex-wrap'>
        {selectedActiviter && selectedActiviter.length > 0 ? (
          selectedActiviter.map((activity) => (
            <div key={activity.id} className='w-full md:w-1/2 p-4'>
              {activity.type === "commentaire" ? (
                <div className='border dark:border-gray-700 px-4 py-4 dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                  <h3 className='font-bold'>
                    Vous avez commenté :
                    <span className='italic font-normal ml-2'>
                      {activity.commentaire}
                    </span>
                  </h3>
                  <p>{activity.commentaire}</p>
                  <div className='flex justify-end mt-2'>
                    <NavLink
                      to={`/detailfilm/1`}
                      className='border dark:border-gray-700 px-10 py-1 hover:bg-fuchsia hover:text-white dark:hover:bg-fuchsia cursor-pointer rounded'>
                      Voir
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div className='border dark:border-gray-700 px-4 py-4 dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                  <h3 className='font-bold'>
                    Vous avez noté :
                    <span className='italic font-normal ml-2'>
                      {activity.commentaire}
                    </span>
                  </h3>
                  <p className='flex items-center'>
                    Note personnelle :
                    {Array.from({ length: 5 }, (_, index) => (
                      <IoStar
                        key={index}
                        className={
                          index < Math.round(activity.note)
                            ? "text-fuchsia"
                            : "dark:text-gray-500"
                        }
                      />
                    ))}
                  </p>
                  <div className='flex justify-end mt-2'>
                    <NavLink
                      to={`/detailfilm/1`}
                      className='border dark:border-gray-700 px-10 py-1 hover:bg-fuchsia hover:text-white dark:hover:bg-fuchsia cursor-pointer rounded'>
                      Voir
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='w-full text-center py-4'>Aucune activité récente</p>
        )}
      </div>

      <div className='flex justify-center dark:bg-black py-4'>
        <Pagination
          totalItems={Activiter.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
