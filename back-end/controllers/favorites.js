'use strict'

/* models */
var Favorites = require('../models/favorites');

/* services */
var mongoose = require('mongoose');
var moment = require('moment');

/* actions */
function addFavorites(req, res){
    var eventId = req.params.event;
    var userId = req.params.user;

    var newFavorite = new Favorites();
    newFavorite.event = eventId;
    newFavorite.user = userId;
    newFavorite.del = false;

    Favorites.findOne({event : eventId, user: userId}, 
        (err, issetFavorite) => {
            if(err){
                res.status(500).send({message: 'Error comprobando favorito'});
            }else{
                if(!issetFavorite){ 
                    console.log(newFavorite);
                    newFavorite.save((err, favoriteStored) => {
                        if(err){
                            res.status(500).send({message: 'Error al guardar favorito'});
                        }else{
                            if(!favoriteStored){
                                res.status(404).send({message: 'No se ha registrado favorito'});
                            }else{
                                res.status(200).send({
                                    message: "Favorito registrada",
                                    event: favoriteStored
                                });
                            }
                        }
                    });
                }else{
                    Favorites.findOneAndUpdate({event : eventId, user : userId}, {del: false}, {new: true}, (err, FavoriteRemoved) => {
                        if(err){
                            res.status(500).send({message: 'Error en la petición'});
                        }else{
                            if(!FavoriteRemoved){
                                res.status(404).send({message: 'No se ha podido actualizar favorito'});
                            }else{
                                res.status(200).send({ message: "Favorito registrada", favorite: FavoriteRemoved });
                            }
                        }
                    });
                }
            }
        }
    );
}

function deleteFavorite(req, res){
    var eventId = req.params.event;
    var userId = req.params.user;

    Favorites.findOneAndUpdate({event : eventId, user : userId}, {del: true}, {new: true}, (err, FavoriteRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!FavoriteRemoved){
                res.status(404).send({message: 'No se ha podido borrar el favorito'});
            }else{
                res.status(200).send({ message: "Favorito eliminado", favorite: FavoriteRemoved });
            }
        }
    });
}

function verificationFavorite(req, res){
    var eventId = req.params.event;
    var userId = req.params.user;

    Favorites.findOne({event : eventId, user : userId, del: false}, (err, FavoriteVerified) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!FavoriteVerified){
                res.status(200).send({ exist: false, favorite: FavoriteVerified });
            }else{
                res.status(200).send({ exist: true, favorite: FavoriteVerified });
            }
        }
    });
}

/* 
    get current/recent events by userID 
    (events haven't pass)
*/


function getCurrentFavoriteUser(req, res){
    var userId = new mongoose.mongo.ObjectId(req.params.id);
    var currentDate = moment().toDate();

    Favorites.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event_"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user_"
            }
        },
        {
            $match : {
                user : userId,
                "event_.date" : { $gte : currentDate },
                del : false
            }
        },
        {
            $sort : {
                "event_.date" : 1
            }
        }
    ]).exec((err, favorites) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!favorites){
                res.status(404).send({message: 'El usuario no tiene favoritos agregados'});
            }else{
                res.status(200).send({favorites});
            }
        }
    });
}

function getPastFavoriteUser(req, res){
    var userId = new mongoose.mongo.ObjectId(req.params.id);
    var currentDate = moment().toDate();

    Favorites.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event_"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user_"
            }
        },
        {
            $match : {
                user : userId,
                "event_.date" : { $lte : currentDate },
                del : false
            }
        },
        {
            $sort : {
                "event_.date" : 1
            }
        }
    ]).exec((err, favorites) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!favorites){
                res.status(404).send({message: 'El usuario no tiene favoritos agregados'});
            }else{
                res.status(200).send({favorites});
            }
        }
    });
}

function getAllFavoriteUser(req, res){
    var userId = new mongoose.mongo.ObjectId(req.params.id);
    var currentDate = moment().toDate();

    Favorites.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event_"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user_"
            }
        },
        {
            $match : {
                user : userId,
                del : false
            }
        },
        {
            $sort : {
                "event_.date" : 1
            }
        }
    ]).exec((err, favorites) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!favorites){
                res.status(404).send({message: 'El usuario no tiene favoritos agregados'});
            }else{
                res.status(200).send({favorites});
            }
        }
    });
}

module.exports = {
    addFavorites,
    deleteFavorite,
    getCurrentFavoriteUser,
    getPastFavoriteUser,
    getAllFavoriteUser,
    verificationFavorite
}