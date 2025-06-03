const router = require("express").Router();

const {
  getAllComm,
  postComm,
  putComm,
  deleteComm,
  likeComm,
  statComm,
} = require("../controllers/commentaire-controller");
const auth = require("../middleware/auth");

router.get("/:contentType/:contentId", getAllComm);

// POST - Ajouter un nouveau commentaire
router.post("/", auth, postComm);

// PUT - Modifier un commentaire existant
router.put("/:commentId", auth, putComm);

// DELETE - Supprimer un commentaire
router.delete("/:commentId", auth, deleteComm);

// POST - Liker/Unliker un commentaire
router.post("/:commentId/like", auth, likeComm);

// GET - Statistiques des commentaires pour un contenu
router.get("/:contentType/:contentId/stats", statComm);

module.exports = router;
