const express = require('express');
const router = express.Router();
const { getAllSeries, getSerieById, createSerie } = require('../controllers/serie-controller');

// Routes pour les séries
router.get('/', getAllSeries);
router.get('/:id', getSerieById);
router.post('/postserie', createSerie);


module.exports = router;
