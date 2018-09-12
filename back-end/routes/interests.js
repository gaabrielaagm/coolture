

'use strict'

//llamamos a express para poder crear las rutas
var express = require('express');

//cargamos el controlador 
var InterestsController = require('../controllers/interests');

//router de express
var api = express.Router();

api.post('/registerInterests/:id', InterestsController.save);
api.put('/updateInterests/:id', InterestsController.update);
api.get('/getInterests/:id', InterestsController.get);
api.get('/getInterestsOn/:interest', InterestsController.getInterestedOn);

module.exports = api;