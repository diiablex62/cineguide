import React from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";

export default function CommentaireSerie() {
  return (
    <div className="md:w-2/3 flex-1">
          <div className="max-w-3xl">
            <h2 className="font-bold mb-3 text-sm uppercase text-gray-500 dark:text-gray-400">
              Commentaires
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4  mb-4">
              <textarea
                className="w-full p-3  bg-white dark:bg-gray-700 mb-2"
                rows="3"
                placeholder="Partagez votre avis sur ce film..."
              ></textarea>
              <button className="bg-fuchsia hover:bg-fuchsia-hover text-white px-4 py-2 text-sm">
                Publier
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
                  <span className="font-medium">Cinéphile23</span>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4, 5].map((star, index) =>
                      index < 5 ? (
                        <FaStar key={star} className="text-fuchsia text-xs" />
                      ) : (
                        <FaRegStar key={star} className="text-fuchsia text-xs" />
                      )
                    )}
                  </div>
                </div>
                <p className="text-sm">
                  Un chef-d'œuvre intemporel du cinéma. La performance de Marlon
                  Brando est extraordinaire et la réalisation de Coppola est
                  magistrale.
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}
