'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var EventController = require('../controllers/event');

//router de express
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated'); //esto es un objeto y tenemos un método ensureAuth que se puede usar en cualquier ruta
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/events'});
var md_admin = require('../middlewares/is_admin');

//se crean rutas personalizadas 
//(url, [middleware], controlador.método_del_controlador) 
api.post('/event', [md_auth.ensureAuth, md_admin.isAdmin], EventController.saveEvent);
api.get('/event/:id', EventController.getEvent);
api.get('/events', EventController.getEvents);
api.put('/event/:id', [md_auth.ensureAuth, md_admin.isAdmin], EventController.updateEvent);
api.delete('/event/:id', [md_auth.ensureAuth, md_admin.isAdmin], EventController.deleteEvent);
api.put('/image-event/:id', [md_auth.ensureAuth, md_upload], EventController.uploadImage);
api.get('/image-event/:imageFile', EventController.getImageFile);
api.put('/inc-assistance/:id', EventController.incAssistances);
api.put('/dec-assistance/:id', EventController.decAssistances);
api.get('/generalRanking', EventController.getGeneralRanking);
api.get('/specificRanking/:month/:year', EventController.getSpecificRanking);
api.get('/clasificationRanking/:clasification', EventController.getClasificationRanking);
/*
api.post('/login', UserController.login);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.get('/admin', UserController.getAdmin);
api.get('/users', UserController.getUsers);
api.get('/usersAll', UserController.getAll);
*/

//exportamos el objeto api con la configuración de las rutas
module.exports = api;