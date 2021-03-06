'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var AssistancesController = require('../controllers/assistances');

//router de express
var api = express.Router();

// cargamos el middleware
var md_auth = require('../middlewares/authenticated'); //esto es un objeto y tenemos un método ensureAuth que se puede usar en cualquier ruta
var md_admin = require('../middlewares/is_admin');

api.post('/addAssistance/:event/:user', AssistancesController.addAssistance);
api.put('/deleteAssistance/:event/:user', AssistancesController.deleteAssistance);
api.get('/getCurrentAssistancesUser/:id', AssistancesController.getCurrentAssistancesUser);
api.get('/getPastAssistancesUser/:id', AssistancesController.getPastAssistancesUser);
api.get('/assistanceVerification/:event/:user', AssistancesController.verificationAssistance);

module.exports = api;