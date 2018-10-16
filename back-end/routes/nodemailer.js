'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var NodeMailerController = require('../controllers/nodemailer');

//router de express
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated'); //esto es un objeto y tenemos un método ensureAuth que se puede usar en cualquier ruta
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/events'});
var md_admin = require('../middlewares/is_admin');

api.post('/sendEmail/:clasification', [md_auth.ensureAuth, md_admin.isAdmin], NodeMailerController.sendEmail);

module.exports = api;