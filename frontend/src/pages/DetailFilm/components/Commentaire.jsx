import React, { useContext, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CommentContext } from "../../../context/CommentContext";
import { useParams } from "react-router-dom";

// Fonction pour récupérer le token depuis les cookies
function getTokenFromCookies() {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
}

export default function Commentaire() {
  const { id } = useParams();
  const { comments, fetchComments, createComment, deleteComment, likeComment } =
    useContext(CommentContext);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  // Récupérer les infos utilisateur
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const username =
    currentUser.username || localStorage.getItem("username") || "Utilisateur";
  const userId = currentUser.id || localStorage.getItem("userId");
  const token = localStorage.getItem("token") || getTokenFromCookies();

  console.log(comments);

  useEffect(() => {
    if (id) fetchComments("film", id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentText.trim() === "" || rating === 0 || !id) return;

    try {
      await createComment(
        {
          contentType: "film",
          contentId: id,
          rating,
          text: commentText,
        },
        token
      );

      setCommentText("");
      setRating(0);
    } catch (error) {
      console.error("Erreur lors de la création du commentaire:", error);
      alert("Erreur lors de la création du commentaire");
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("Supprimer ce commentaire ?")) {
      try {
        await deleteComment(commentId, token);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression du commentaire");
      }
    }
  };

  const handleLike = async (commentId) => {
    try {
      console.log("=== DEBUG LIKE ===");
      console.log("Comment ID:", commentId);
      console.log("Token:", token ? "PRESENT" : "ABSENT");
      console.log("User ID:", userId);

      // Vérifier que le commentaire existe dans la liste
      const commentExists = comments.find((c) => c._id === commentId);
      console.log("Comment exists in list:", !!commentExists);

      if (!commentExists) {
        console.error("Commentaire non trouvé dans la liste locale");
        alert("Erreur: Commentaire non trouvé");
        return;
      }

      await likeComment(commentId, token);
    } catch (error) {
      console.error("Erreur lors du like:", error);

      // Gestion d'erreur plus spécifique
      if (error.message.includes("non trouvé")) {
        alert("Ce commentaire n'existe plus ou a été supprimé");
        // Recharger les commentaires pour synchroniser
        if (id) fetchComments("film", id);
      } else if (error.message.includes("Token")) {
        alert("Vous devez être connecté pour liker un commentaire");
      } else {
        alert("Erreur lors du like. Veuillez réessayer.");
      }
    }
  };

  // Fonction pour vérifier si l'utilisateur actuel a liké le commentaire
  const hasUserLiked = (comment) => {
    return (
      comment.likedBy &&
      comment.likedBy.some(
        (user) => (typeof user === "string" ? user : user._id) === userId
      )
    );
  };

  // Fonction pour vérifier si l'utilisateur peut supprimer le commentaire
  const canDeleteComment = (comment) => {
    // Si le commentaire a une structure userId (nouvelle structure)
    if (comment.userId) {
      const commentUserId =
        typeof comment.userId === "string"
          ? comment.userId
          : comment.userId._id;
      return commentUserId === userId;
    }
    // Fallback pour l'ancienne structure avec author
    return (
      comment.author === `${currentUser.prenom} ${currentUser.nom}` ||
      comment.author === username
    );
  };

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
          {comments.length > 0 ? (
            comments.map((comment) => {
              // Debug pour vérifier la structure du commentaire
              console.log("Comment structure:", {
                id: comment._id,
                author: comment.author,
                userId: comment.userId,
                likes: comment.likes,
                likedBy: comment.likedBy,
              });

              // Déterminer le nom d'utilisateur selon la structure
              const displayName =
                comment.author ||
                (comment.userId
                  ? `${comment.userId.prenom} ${comment.userId.nom}`
                  : "") ||
                "Utilisateur";

              // Pas d'avatar dans votre modèle User
              const displayAvatar = null;

              return (
                <div
                  key={comment._id}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      {/* Avatar avec initiales si pas d'image */}
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                        {displayAvatar ? (
                          <img
                            src={displayAvatar}
                            alt={displayName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {displayName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-start">
                        {displayName}
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
                    {canDeleteComment(comment) && (
                      <button
                        className="text-red-500 text-xs hover:underline"
                        onClick={() => handleDelete(comment._id)}
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-start mb-2">{comment.text}</p>
                  <div className="text-left">
                    <button
                      className={`text-sm hover:underline ${
                        hasUserLiked(comment)
                          ? "text-blue-500 font-medium"
                          : "text-fuchsia"
                      }`}
                      onClick={() => {
                        console.log(
                          "Like button clicked for comment:",
                          comment._id
                        );
                        handleLike(comment._id);
                      }}
                      disabled={!token || !userId}
                    >
                      {hasUserLiked(comment) ? "👍" : "👍🏻"} J'aime (
                      {comment.likes || 0})
                    </button>
                    {(!token || !userId) && (
                      <p className="text-xs text-gray-500 mt-1">
                        Connectez-vous pour liker
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Aucun commentaire pour ce film. Soyez le premier à donner votre
              avis !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
