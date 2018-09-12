'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

//el parametro será un objeto user, del usuario que se intenta loguear
exports.createToken = function(user){
    // payload es un objeto con el cual jwt va a trabajar para generar el cifrado o el token
    var payload = {
        sub: user._id, // sub es una propiedad que identifica al id del usuario dentro de jwt
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        // propiedades del payload
        iat: moment().unix(), //tiempo actual
        exp: moment().add(30, 'day').unix //fecha de expiación
    };

    //codificar/cifrar el token
    return jwt.encode(payload, secret);
};

//Si alguien quisiera cifrar el token, aún que tuviera el payload exacto, si no tiene la clave no podrá cifrarlo nunca
//esa clave es "imposible" de cifrar