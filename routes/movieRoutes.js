const express = require('express');
const router = express.Router();
const path = require('path');
const movieController = require('../controllers/movie.controller');



router.post('/admin', movieController.addMovie);

router.post('/search', movieController.searchMovies);

module.exports = router;