import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import Activiter from "../../data/Activiter.json";
import Pagination from "../../components/pagination/Pagination";
import ProfilNav from "./components/ProfilNav";
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
    <>
      <ProfilNav></ProfilNav>
      <div className="flex flex-wrap">
        {selectedActiviter && selectedActiviter.length > 0 ? (
          selectedActiviter.map((activity) => (
            <div key={activity.id} className="w-full md:w-1/2 p-4">
              {activity.type === "commentaire" ? (
                <div className="border px-4 py-4">
                  <h3 className="font-bold">
                    Vous avez commenté :
                    <span className="italic font-normal ml-2">
                      {activity.commentaire}
                    </span>
                  </h3>
                  <p>{activity.commentaire}</p>
                  <div className="flex justify-end mt-2">
                    <NavLink
                      to={`/detailfilm/1`}
                      className="border px-10 py-1 hover:bg-black hover:text-white cursor-pointer"
                    >
                      Voir
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div className="border px-4 py-4">
                  <h3 className="font-bold">
                    Vous avez noté :
                    <span className="italic font-normal ml-2">
                      {activity.commentaire}
                    </span>
                  </h3>
                  <p className="flex items-center">
                    Note personnelle :
                    {Array.from({ length: 5 }, (_, index) => (
                      <IoStar
                        key={index}
                        className={
                          index < Math.round(activity.note)
                            ? "text-fuchsia"
                            : ""
                        }
                      />
                    ))}
                  </p>
                  <div className="flex justify-end mt-2">
                    <NavLink
                      to={`/detailfilm/1`}
                      className="border px-10 py-1 hover:bg-black hover:text-white cursor-pointer"
                    >
                      Voir
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucune donnée</p>
        )}
      </div>
      <div className="flex justify-center">
        <Pagination
          totalItems={Activiter.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
