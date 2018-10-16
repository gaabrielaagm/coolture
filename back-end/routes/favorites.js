'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var FavoritesController = require('../controllers/favorites');

//router de express
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated'); //esto es un objeto y tenemos un método ensureAuth que se puede usar en cualquier ruta
var md_admin = require('../middlewares/is_admin');

api.post('/addFavorite/:event/:user', md_auth.ensureAuth, FavoritesController.addFavorites);
api.put('/deleteFavorite/:event/:user', md_auth.ensureAuth, FavoritesController.deleteFavorite);
api.get('/favoriteVerification/:event/:user', FavoritesController.verificationFavorite);
api.get('/getCurrentFavoritesUser/:id', FavoritesController.getCurrentFavoriteUser);
api.get('/getPastFavoritesUser/:id', FavoritesController.getPastFavoriteUser);
api.get('/getAllFavoritesUser/:id', FavoritesController.getAllFavoriteUser);

module.exports = api;