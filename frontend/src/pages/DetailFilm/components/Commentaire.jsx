import React, { useContext, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CommentContext } from "../../../context/CommentContext";
import { useParams } from "react-router-dom";

export default function Commentaire() {
  const { id } = useParams();
  const { comments, createComment, fetchComments } = useContext(CommentContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const username = localStorage.getItem("username") || "Utilisateur";

  console.log(comments);

  useEffect(() => {
    if (id) fetchComments("film", id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentText.trim() === "" || rating === 0) return;

    const token = localStorage.getItem("token"); // ou autre méthode pour récupérer le token

    await createComment(
      {
        author: username,
        rating: rating,
        text: commentText,
        avatar: null,
        contentType: "film", // à adapter selon ton API (film, serie, etc.)
        contentId: id, // à remplacer dynamiquement selon le film
      },
      token
    );

    setCommentText("");
    setRating(0);
  };

  return (
    <div className="w-full md:w-3/4">
      <div className="w-full text-center justify-center items-center">
        <h2 className="font-bold mb-3 text-sm uppercase text-gray-500 dark:text-gray-200">
          Commentaires
        </h2>
        <form
          className="bg-gray-100 dark:bg-gray-800 p-4 mb-4"
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
            placeholder="Partagez votre avis sur ce film..."
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
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
                <span className="font-medium text-start">
                  {comment.author?.name}
                </span>

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
          ))}
        </div>
      </div>
    </div>
  );
}
