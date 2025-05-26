const Commentaire = require("../models/commentaire.schema");

const getAllComm = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Validation des paramètres
    if (!["film", "serie"].includes(contentType)) {
      return res.status(400).json({
        error: 'Type de contenu invalide. Utilisez "film" ou "serie"',
      });
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === "desc" ? -1 : 1;

    const comments = await Commentaire.find({
      contentId,
      contentType,
      isVisible: true,
    })
      .populate("userId", "username avatar")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Commentaire.countDocuments({
      contentId,
      contentType,
      isVisible: true,
    });

    // Calculer la moyenne des notes
    const ratingStats = await Commentaire.aggregate([
      {
        $match: {
          contentId,
          contentType,
          isVisible: true,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
          ratingsDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    const averageRating =
      ratingStats.length > 0 ? ratingStats[0].averageRating : 0;
    const totalRatings =
      ratingStats.length > 0 ? ratingStats[0].totalRatings : 0;

    res.json({
      comments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalComments: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      ratings: {
        average: Math.round(averageRating * 10) / 10,
        total: totalRatings,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const postComm = async (req, res) => {
  try {
    console.log("Données reçues:", req.body);
    console.log("userData:", req.userData);
    
    const { contentId, contentType, rating, text } = req.body;

    // Récupération des données utilisateur depuis req.userData
    const userId = req.userData.userId;

    // Validation des données
    if (!contentId || !contentType || !rating || !text) {
      console.log("Champs manquants:", { contentId, contentType, rating, text });
      return res.status(400).json({
        error: "Tous les champs sont requis",
      });
    }

    if (!["film", "serie"].includes(contentType)) {
      return res.status(400).json({
        error: "Type de contenu invalide",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "La note doit être entre 1 et 5",
      });
    }

    if (text.trim().length < 10) {
      return res.status(400).json({
        error: "Le commentaire doit contenir au moins 10 caractères",
      });
    }

    // Vérifier si l'utilisateur a déjà commenté ce contenu
    const existingComment = await Commentaire.findOne({
      userId,
      contentId,
      contentType,
    });

    if (existingComment) {
      return res.status(400).json({
        error: "Vous avez déjà commenté ce contenu",
      });
    }

    // Créer le commentaire avec les données disponibles
    const newComment = new Commentaire({
      userId,
      contentId,
      contentType,
      rating: parseInt(rating),
      text: text.trim(),
      // Les champs author et avatar seront remplis via populate
    });

    await newComment.save();
    
    // Populate pour récupérer les infos utilisateur
    await newComment.populate("userId", "username avatar");

    console.log("Commentaire créé avec succès:", newComment);

    res.status(201).json({
      message: "Commentaire ajouté avec succès",
      comment: newComment,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
};

const putComm = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { rating, text } = req.body;
    const userId = req.userData.userId; // Correction ici

    const comment = await Commentaire.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    // Vérifier que l'utilisateur est le propriétaire du commentaire
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ error: "Non autorisé" });
    }

    // Validation des nouvelles données
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        error: "La note doit être entre 1 et 5",
      });
    }

    if (text && text.trim().length < 10) {
      return res.status(400).json({
        error: "Le commentaire doit contenir au moins 10 caractères",
      });
    }

    // Mettre à jour les champs
    if (rating) comment.rating = rating;
    if (text) comment.text = text.trim();

    await comment.save();
    await comment.populate("userId", "username avatar");

    res.json({
      message: "Commentaire modifié avec succès",
      comment,
    });
  } catch (error) {
    console.error("Erreur lors de la modification du commentaire:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const deleteComm = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userData.userId; // Correction ici

    const comment = await Commentaire.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    // Vérifier que l'utilisateur est le propriétaire du commentaire
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ error: "Non autorisé" });
    }

    // Soft delete : marquer comme invisible au lieu de supprimer
    comment.isVisible = false;
    await comment.save();

    res.json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const likeComm = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userData.userId; // Correction ici

    const comment = await Commentaire.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    const hasLiked = comment.likedBy.includes(userId);

    if (hasLiked) {
      // Retirer le like
      comment.likedBy = comment.likedBy.filter(
        (id) => id.toString() !== userId
      );
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      // Ajouter le like
      comment.likedBy.push(userId);
      comment.likes += 1;
    }

    await comment.save();

    res.json({
      message: hasLiked ? "Like retiré" : "Like ajouté",
      likes: comment.likes,
      hasLiked: !hasLiked,
    });
  } catch (error) {
    console.error("Erreur lors du like du commentaire:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const statComm = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;

    const stats = await Commentaire.aggregate([
      {
        $match: {
          contentId,
          contentType,
          isVisible: true,
        },
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const totalComments = await Commentaire.countDocuments({
      contentId,
      contentType,
      isVisible: true,
    });

    const averageRating = await Commentaire.aggregate([
      {
        $match: {
          contentId,
          contentType,
          isVisible: true,
        },
      },
      {
        $group: {
          _id: null,
          average: { $avg: "$rating" },
        },
      },
    ]);

    const ratingDistribution = {};
    for (let i = 1; i <= 5; i++) {
      ratingDistribution[i] = 0;
    }

    stats.forEach((stat) => {
      ratingDistribution[stat._id] = stat.count;
    });

    res.json({
      totalComments,
      averageRating:
        averageRating.length > 0
          ? Math.round(averageRating[0].average * 10) / 10
          : 0,
      ratingDistribution,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getAllComm,
  postComm,
  putComm,
  deleteComm,
  likeComm,
  statComm,
};