var express = require('express');
var userController = require('../controllers/user.controller');

var api = express.Router();

api.post('/login',userController.login);
api.post('/createUser',userController.create);
api.post('/inLikeMovie',userController.likeMovie);
api.post('/disLikeMovie',userController.dislikeMovie);
api.post('/inLikeGenre',userController.likeGenre);
api.post('/disLikeGenre',userController.dislikeGenre);
api.post('/profile',userController.profile);
api.post('/getLikeUserMovie',userController.getLikeUserMovie);
api.post('/getLikesGenre',userController.getLikesGenre);
api.post('/updateUser',userController.updateUser);
api.post('/deleteUser',userController.deleteUser);

module.exports = api;