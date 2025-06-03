const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ou le nom de votre modèle utilisateur
    required: true
  },
  contentId: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['film', 'serie'],
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  text: {
    type: String,
    required: true,
    minlength: 10
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Commentaire', commentaireSchema);