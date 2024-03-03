var express = require('express');
var genreController = require('../controllers/genre.controller');

var api = express.Router();

//api.post('/createGenre',genreController.create);
api.get('/getGenres',genreController.getGenres);
api.get('/getGenresCount',genreController.getGenresCount);

module.exports = api;