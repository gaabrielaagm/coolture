'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var UserController = require('../controllers/user');

//router de express
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated'); //esto es un objeto y tenemos un método ensureAuth que se puede usar en cualquier ruta
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});

//se crean rutas personalizadas 
//(url, [middleware], controlador.método_del_controlador) 
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
//api.get('/admin', UserController.getAdmin);
api.get('/user/:id', UserController.getUser);
api.get('/users', UserController.getUsers);
api.get('/usersAll', UserController.getAll);
api.delete('/user/:id', UserController.deleteUser);

//exportamos el objeto api con la configuración de las rutas
module.exports = api;