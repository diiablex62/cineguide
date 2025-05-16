import React, { useContext, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CommentContext } from "../../../context/CommentContext";
import { useParams } from "react-router-dom";

export default function CommentaireSerie() {
  const { id } = useParams();
  const { comments, addComment, loadCommentsBySerie } = useContext(CommentContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState("Utilisateur");
  
  // Charger les commentaires lors du montage ou lorsque l'ID change
  useEffect(() => {
    if (id && loadCommentsBySerie) {
      loadCommentsBySerie(id);
    }
    
    // Réinitialiser le formulaire lors du changement de série
    setCommentText("");
    setRating(0);
    setHoverRating(0);
  }, [id, loadCommentsBySerie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ne pas ajouter de commentaires vides
    if (commentText.trim() === "" || rating === 0 || !id) return;

    // Ajouter le nouveau commentaire avec l'ID de la série
    addComment({
      author: username,
      rating: rating,
      text: commentText,
      avatar: null,
      serieId: id
    });

    // Réinitialiser le formulaire
    setCommentText("");
    setRating(0);
  };

  // Filtrer les commentaires pour afficher uniquement ceux de la série actuelle
  const serieComments = comments.filter(comment => comment.serieId === id);

  return (
    <div className="w-full md:w-3/4">
      <div className="w-full text-center justify-center items-center">
        <h2 className="font-bold mb-3 text-sm uppercase text-gray-500 dark:text-gray-200">
          Commentaires
        </h2>
        <form
          className="bg-gray-100 dark:bg-gray-800 p-4 mb-4 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex mt-1 gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="cursor-pointer text-lg"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                {rating >= star || hoverRating >= star ? (
                  <FaStar className="text-fuchsia" />
                ) : (
                  <FaRegStar className="dark:text-white text-gray-fonce" />
                )}
              </span>
            ))}
          </div>
          <textarea
            className="w-full p-3 bg-white dark:bg-gray-700 mb-2"
            rows="3"
            placeholder="Partagez votre avis sur cette série..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-fuchsia hover:bg-fuchsia-hover text-white px-4 py-2 text-sm"
            disabled={!rating || commentText.trim() === ""}
          >
            Publier
          </button>
        </form>
        <div className="space-y-4">
          {serieComments.length > 0 ? (
            serieComments.map((comment, index) => (
              <div
                key={comment.id || `comment-${index}`}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
                  <span className="font-medium text-start">{comment.author}</span>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {comment.rating >= star ? (
                          <FaStar className="text-fuchsia text-xs" />
                        ) : (
                          <FaRegStar className="dark:text-white text-gray-fonce text-xs" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-start">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Aucun commentaire pour cette série. Soyez le premier à donner votre avis !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}