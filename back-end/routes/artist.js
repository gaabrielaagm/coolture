'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var ArtistController = require('../controllers/artist');

//router de express
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated'); //esto es un objeto y tenemos un método ensureAuth que se puede usar en cualquier ruta
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/artist'});
var md_admin = require('../middlewares/is_admin');

//se crean rutas personalizadas 
//(url, [middleware], controlador.método_del_controlador) 
api.post('/artist', [md_auth.ensureAuth, md_admin.isAdmin], ArtistController.saveEvent);
api.get('/artists', ArtistController.getArtists);
api.get('/artist/:search/:value', ArtistController.getArtist); /* seach: 1)name 2)id */
api.put('/artist/:id', [md_auth.ensureAuth, md_admin.isAdmin], ArtistController.updateArtist);
api.post('/image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/image-artist/:imageFile', ArtistController.getImageFile);

//exportamos el objeto api con la configuración de las rutas
module.exports = api;