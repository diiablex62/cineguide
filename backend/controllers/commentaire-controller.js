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

    // Validation
    if (!["film", "serie"].includes(contentType)) {
      return res.status(400).json({ error: "Type de contenu invalide" });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === "desc" ? -1 : 1;

    // Récupérer les commentaires avec populate
    const commentaires = await Commentaire.find({
      contentType,
      contentId,
      isVisible: true,
    })
      .populate("userId", "nom prenom email") // Populate les infos utilisateur
      .populate("likedBy", "nom prenom") // Optionnel: populate les likes
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // Compter le total pour la pagination
    const total = await Commentaire.countDocuments({
      contentType,
      contentId,
      isVisible: true,
    });

    // Transformer les données pour le frontend
    const transformedComments = commentaires.map((comment) => ({
      _id: comment._id,
      author: comment.userId
        ? `${comment.userId.prenom} ${comment.userId.nom}`
        : "Utilisateur supprimé",
      avatar: null, // Pas d'avatar dans votre modèle
      email: comment.userId?.email || null,
      rating: comment.rating,
      text: comment.text,
      likes: comment.likes,
      likedBy: comment.likedBy,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.userId?._id, // Ajouter l'userId pour les vérifications frontend
      isOwner: false, // Sera défini côté frontend
    }));

    res.json({
      success: true,
      data: transformedComments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Erreur récupération commentaires:", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des commentaires",
    });
  }
};

const postComm = async (req, res) => {
  try {
    const { contentId, contentType, rating, text } = req.body;

    // Validation
    if (!contentId || !contentType || !rating || !text) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "La note doit être entre 1 et 5" });
    }

    if (text.trim().length < 10) {
      return res
        .status(400)
        .json({ error: "Le commentaire doit contenir au moins 10 caractères" });
    }

    // Créer le commentaire avec l'userId du token
    const commentaire = new Commentaire({
      userId: req.user.id, // Récupéré du token via le middleware auth
      contentId,
      contentType,
      rating,
      text: text.trim(),
    });

    await commentaire.save();

    // Populate pour renvoyer les infos utilisateur
    const populatedComment = await Commentaire.findById(commentaire._id)
      .populate("userId", "nom prenom email") // Utiliser les champs de votre modèle User
      .exec();

    res.status(201).json({
      success: true,
      data: populatedComment,
    });
  } catch (error) {
    console.error("Erreur création commentaire:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création du commentaire" });
  }
};

const likeComm = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

   
    const commentaire = await Commentaire.findById(commentId);

    if (!commentaire) {
    
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    const hasLiked = commentaire.likedBy.includes(userId);
    

    if (hasLiked) {
      // Unliker
      commentaire.likedBy.pull(userId);
      commentaire.likes = Math.max(0, commentaire.likes - 1);
    } else {
      // Liker
      commentaire.likedBy.push(userId);
      commentaire.likes += 1;
    }

    await commentaire.save();

    // CORRECTION: Retourner les données dans le bon format pour le frontend
    res.json({
      success: true,
      likes: commentaire.likes,
      isLiked: !hasLiked, // État après l'action
      action: hasLiked ? "unliked" : "liked",
    });
  } catch (error) {
    console.error("Erreur like commentaire:", error);
    res.status(500).json({ 
      error: "Erreur serveur lors du like du commentaire" 
    });
  }
};


// Correction similaire pour putComm et deleteComm
const putComm = async (req, res) => {
  try {
    const { commentId } = req.params; // ← CORRECTION ICI aussi
    const { rating, text } = req.body;

    // Trouver le commentaire
    const commentaire = await Commentaire.findById(commentId);

    if (!commentaire) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (commentaire.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Non autorisé à modifier ce commentaire" });
    }

    // Validation
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "La note doit être entre 1 et 5" });
    }

    if (text && text.trim().length < 10) {
      return res
        .status(400)
        .json({ error: "Le commentaire doit contenir au moins 10 caractères" });
    }

    // Mettre à jour
    const updateData = {};
    if (rating) updateData.rating = rating;
    if (text) updateData.text = text.trim();

    const updatedComment = await Commentaire.findByIdAndUpdate(
      commentId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("userId", "nom prenom email");

    res.json({
      success: true,
      data: updatedComment,
    });
  } catch (error) {
    console.error("Erreur modification commentaire:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la modification du commentaire" });
  }
};

const deleteComm = async (req, res) => {
  try {
    const { commentId } = req.params; // ← CORRECTION ICI aussi

    // Trouver le commentaire
    const commentaire = await Commentaire.findById(commentId);

    if (!commentaire) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    // Vérifier que l'utilisateur est le propriétaire ou admin
    if (
      commentaire.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "Non autorisé à supprimer ce commentaire" });
    }

    // Soft delete
    await Commentaire.findByIdAndUpdate(commentId, { isVisible: false });

    res.json({
      success: true,
      message: "Commentaire supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression commentaire:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression du commentaire" });
  }
};

const statComm = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;

    const stats = await Commentaire.aggregate([
      {
        $match: {
          contentType,
          contentId,
          isVisible: true,
        },
      },
      {
        $group: {
          _id: null,
          totalComments: { $sum: 1 },
          averageRating: { $avg: "$rating" },
          totalLikes: { $sum: "$likes" },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    const result = stats[0] || {
      totalComments: 0,
      averageRating: 0,
      totalLikes: 0,
      ratingDistribution: [],
    };

    // Calculer la distribution des notes
    const distribution = {};
    for (let i = 1; i <= 5; i++) {
      distribution[i] = result.ratingDistribution.filter((r) => r === i).length;
    }

    res.json({
      success: true,
      data: {
        totalComments: result.totalComments,
        averageRating: Math.round(result.averageRating * 10) / 10,
        totalLikes: result.totalLikes,
        ratingDistribution: distribution,
      },
    });
  } catch (error) {
    console.error("Erreur stats commentaires:", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des statistiques",
    });
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
