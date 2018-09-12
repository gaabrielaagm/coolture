'use strict'

/* models */
var Interests = require('../models/interest');

/* services */
var mongoose = require('mongoose');
var moment = require('moment');

/* actions */

/* On the user register*/
function save(req, res){
    var clasifications = req.body.clasifications;
    var userId = req.params.id;

    var interests = new Interests();
    interests.user = userId;
    interests.interested = clasifications;

    console.log(interests);
    interests.save((err, interestsStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar intereses del usuario'});
        }else{
            if(!interestsStored){
                res.status(404).send({message: 'No se ha registrado nuevo insteres del usuario'});
            }else{
                res.status(200).send({
                    message: "Intereses registrados",
                    event: interestsStored
                });
            }
        }
    });
}  

/* On updates of user profile */
function update(req, res){
    var clasifications = req.body.clasifications;
    var userId = new mongoose.mongo.ObjectId(req.params.id);

    var interests = new Interests();
    interests.user = userId;
    interests.interested = clasifications;
    console.log(interests);

    Interests.findOneAndUpdate({ user : userId }, {interested: clasifications}, {new: true}, (err, interestsUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!interestsUpdated){
                res.status(404).send({message: 'No se han podido actualizar los intereses'});
            }else{
                res.status(200).send({ message: "Intereses actualizados", interestsUpdated });
            }
        }
    });
} 

function get(req, res){
    var userId = new mongoose.mongo.ObjectId(req.params.id);

    Interests.findOne({ user: userId }, 
        (err, issetInterests) => {
            if(err){
                res.status(500).send({message: 'Error obteniendo intereses del usuario'});
            }else{
                if(!issetInterests){
                    res.status(404).send({message: 'No hay un registro de los intereses del usuario'});
                }else{
                    res.status(200).send({ issetInterests });
                }
            }
        }
    );
}

function getInterestedOn(req, res){
    var interest = req.params.interest;

    Interests.aggregate([
        {
            $match : {
                interested: { $in: [interest] } 
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "user",
                foreignField : "_id",
                as : "user_"
            }
        },
        {
            $project: {
                _id : 0,
                user : 1, 
                email : "$user_.email"
            }
        }    
    ]).exec((err, mails) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!mails){
                res.status(404).send({message: 'No hay usuarios interesados en este tipo' + interest});
            }else{
                res.status(200).send({mails});
            }
        }
    });
}

module.exports = {
    save, update, get, getInterestedOn
}