import React, { useContext, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CommentContext } from "../../../context/CommentContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

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

// Fonction pour récupérer une valeur spécifique des cookies
function getCookieValue(cookieName) {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const cookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${cookieName}=`)
    );
    return cookie ? cookie.split("=")[1] : null;
  }
  return null;
}

// Fonction pour récupérer toutes les données utilisateur depuis les cookies et localStorage
function getUserData() {
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const localUserId = localStorage.getItem("userId");
  const localUsername = localStorage.getItem("username");

  const cookieUserId = getCookieValue("userId");
  const cookieUsername = getCookieValue("username");

  return {
    user: localUser,
    userId: localUser._id || localUserId || cookieUserId,
    username:
      localUser.username || localUsername || cookieUsername || "Utilisateur",
    token: localStorage.getItem("token") || getTokenFromCookies(),
  };
}

export default function CommentaireSerie() {
  const { id } = useParams();
  const { comments, fetchComments, createComment, deleteComment, likeComment } =
    useContext(CommentContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  // Récupérer les données utilisateur de manière complète
  const userData = getUserData();
  const { user: currentUser, userId, username, token } = userData;

  useEffect(() => {
    if (id) {
      fetchComments("serie", id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentText.trim() === "" || rating === 0 || !id) return;

    try {
      await createComment(
        {
          contentType: "serie",
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
      if (!token || !userId) {
        alert("Vous devez être connecté pour liker un commentaire");
        return;
      }

      const commentExists = comments.find((c) => c._id === commentId);
      if (!commentExists) {
        alert("Erreur: Commentaire non trouvé");
        return;
      }

      await likeComment(commentId, token);
    } catch (error) {
      console.error("Erreur lors du like:", error);
      alert("Erreur: " + error.message);
    }
  };

  // Fonction pour vérifier si l'utilisateur actuel a liké le commentaire
  const hasUserLiked = (comment) => {
    if (!userId || !comment.likedBy) return false;

    return comment.likedBy.some((user) => {
      const likedUserId = typeof user === "string" ? user : user._id;
      return likedUserId === userId;
    });
  };

  // Fonction pour vérifier si l'utilisateur peut supprimer le commentaire
  const canDeleteComment = (comment) => {
    if (comment.userId) {
      const commentUserId =
        typeof comment.userId === "string"
          ? comment.userId
          : comment.userId._id;
      return commentUserId === userId;
    }
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
        {isLoggedIn ? (
          <>
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
          </>
        ) : (
          <></>
        )}

        <div className="space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((comment) => {
              const displayName =
                comment.author ||
                (comment.userId
                  ? `${comment.userId.prenom} ${comment.userId.nom}`
                  : "") ||
                "Utilisateur";

              const userHasLiked = hasUserLiked(comment);

              return (
                <div
                  key={comment._id}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
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

                  <div className="flex justify-end">
                    <button
                      className={`text-sm hover:underline border text-center border-gray-300 px-2 py-1 rounded flex  items-center gap-1 ${
                        userHasLiked
                          ? "text-blue-500 font-medium bg-blue-50"
                          : "text-fuchsia bg-gray-50"
                      }`}
                      onClick={() => handleLike(comment._id)}
                      disabled={!token || !userId}
                    >
                      {userHasLiked ? <BiSolidLike /> : <BiLike />}{" "}
                      {comment.likes || 0}
                    </button>

                    {(!token || !userId) && (
                      <p className="text-xs text-red-500 mt-1">
                        Connectez-vous pour liker
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Aucun commentaire pour cette série. Soyez le premier à donner
              votre avis !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
