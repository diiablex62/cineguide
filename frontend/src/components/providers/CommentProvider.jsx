import React, { useState } from "react";
import { CommentContext } from "../../context/CommentContext";
import {
  getAllComm,
  postComm,
  putComm,
  deleteComm,
  likeComm,
  statComm,
} from "../../apis/commentaire.api"; 

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (contentType, contentId, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching comments for:", { contentType, contentId, options });
      const data = await getAllComm(contentType, contentId, options);
      console.log("Comments fetched:", data);
      
      // Vérifier la structure des données retournées par l'API
      let commentsArray = [];
      
      if (Array.isArray(data)) {
        commentsArray = data;
      } else if (data && Array.isArray(data.comments)) {
        commentsArray = data.comments;
      } else if (data && Array.isArray(data.data)) {
        commentsArray = data.data;
      } else {
        console.warn("Format de données inattendu:", data);
        commentsArray = [];
      }
      
      setComments(commentsArray);
      return commentsArray;
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires:", error);
      setError(error.message);
      setComments([]); // Reset to empty array on error
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (commentData, token) => {
    try {
      console.log("Creating comment:", commentData);
      const newComment = await postComm(commentData, token);
      console.log("Comment created:", newComment);
      
      if (newComment) {
        setComments((prev) => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return [newComment, ...prevArray]; // Ajouter en premier
        });
        
        // Recharger les commentaires pour s'assurer de la cohérence
        setTimeout(() => {
          fetchComments(commentData.contentType, commentData.contentId);
        }, 500);
      }
      return newComment;
    } catch (error) {
      console.error("Erreur lors de la création du commentaire:", error);
      setError(error.message);
      throw error;
    }
  };

  const updateComment = async (commentId, updateData, token) => {
    try {
      const updated = await putComm(commentId, updateData, token);
      if (updated) {
        setComments((prev) => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return prevArray.map((comment) => 
            (comment.id === commentId || comment._id === commentId) ? updated : comment
          );
        });
      }
      return updated;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire:", error);
      setError(error.message);
      throw error;
    }
  };

  const removeComment = async (commentId, token) => {
    try {
      await deleteComm(commentId, token);
      setComments((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return prevArray.filter((comment) => 
          comment.id !== commentId && comment._id !== commentId
        );
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
      setError(error.message);
      throw error;
    }
  };

  const toggleLikeComment = async (commentId, token) => {
    try {
      const result = await likeComm(commentId, token);
      
      // Mettre à jour le commentaire localement si possible
      if (result) {
        setComments((prev) => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return prevArray.map((comment) => {
            if (comment.id === commentId || comment._id === commentId) {
              return {
                ...comment,
                likes: result.likes || comment.likes,
                isLiked: result.isLiked !== undefined ? result.isLiked : !comment.isLiked
              };
            }
            return comment;
          });
        });
      }
      
      return result;
    } catch (error) {
      console.error("Erreur lors du like du commentaire:", error);
      setError(error.message);
      throw error;
    }
  };

  const getStats = async (contentType, contentId) => {
    try {
      return await statComm(contentType, contentId);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      setError(error.message);
      throw error;
    }
  };

  const resetComments = () => {
    setComments([]);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        setComments,
        fetchComments,
        createComment,
        updateComment,
        removeComment,
        deleteComment: removeComment, // Alias pour compatibilité
        toggleLikeComment,
        likeComment: toggleLikeComment, // Alias pour compatibilité
        getStats,
        resetComments,
        clearError,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}