'use strict'

/* models */
var Assistaces = require('../models/assistances');

/* services */
var mongoose = require('mongoose');
var moment = require('moment');

/* actions */
function addAssistance(req, res){
    var eventId = req.params.event;
    var userId = req.params.user;

    var newAssistance = new Assistaces();
    newAssistance.event = eventId;
    newAssistance.user = userId;
    newAssistance.date_yes = moment();
    newAssistance.date_no = null;
    newAssistance.del = false;

    Assistaces.findOne({event : eventId, user: userId}, 
        (err, issetAssistance) => {
            if(err){
                res.status(500).send({message: 'Error comprobando asistencia'});
            }else{
                if(!issetAssistance){ 
                    console.log(newAssistance);
                    newAssistance.save((err, assistanceStored) => {
                        if(err){
                            res.status(500).send({message: 'Error al guardar la asistencia'});
                        }else{
                            if(!assistanceStored){
                                res.status(404).send({message: 'No se ha registrado la asistencia'});
                            }else{
                                res.status(200).send({
                                    message: "Asistencia registrada",
                                    event: assistanceStored
                                });
                            }
                        }
                    });
                }else{
                    Assistaces.findOneAndUpdate({event : eventId, user : userId}, {del: false, date_yes: moment()}, {new: true}, (err, AssistanceRemoved) => {
                        if(err){
                            res.status(500).send({message: 'Error en la petición'});
                        }else{
                            if(!AssistanceRemoved){
                                res.status(404).send({message: 'No se ha podido actualizar la asistencia'});
                            }else{
                                res.status(200).send({ message: "Asistencia registrada", assistance: AssistanceRemoved });
                            }
                        }
                    });
                }
            }
        }
    );
}

function deleteAssistance(req, res){
    var eventId = req.params.event;
    var userId = req.params.user;

    Assistaces.findOneAndUpdate({event : eventId, user : userId}, {del: true, date_no: moment()}, {new: true}, (err, AssistanceRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!AssistanceRemoved){
                res.status(404).send({message: 'No se ha podido borrar la asistencia'});
            }else{
                res.status(200).send({ message: "Asistencia eliminada", assistance: AssistanceRemoved });
            }
        }
    });
}

function verificationAssistance(req, res){
    var eventId = req.params.event;
    var userId = req.params.user;

    Assistaces.findOne({event : eventId, user : userId, del: false}, (err, AssistanceVerified) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!AssistanceVerified){
                res.status(200).send({ exist: false, assistance: AssistanceVerified });
            }else{
                res.status(200).send({ exist: true, assistance: AssistanceVerified });
            }
        }
    });
}

/* 
    get current/recent events by userID 
    (events haven't pass)
*/
function getCurrentAssistancesUser(req, res){
    var userId = new mongoose.mongo.ObjectId(req.params.id);
    var currentDate = moment().toDate();

    Assistaces.aggregate([
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
    ]).exec((err, assistances) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!assistances){
                res.status(404).send({message: 'El usuario no tiene asistencias a eventos'});
            }else{
                res.status(200).send({assistances});
            }
        }
    });
}

function getPastAssistancesUser(req, res){
    var userId = new mongoose.mongo.ObjectId(req.params.id);
    var currentDate = moment().toDate();

    Assistaces.aggregate([
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
                "event_.date" : { $lt : currentDate },
                del : false
            }
        },
        {
            $sort : {
                "event_.date" : -1
            }
        }
    ]).exec((err, assistances) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!assistances){
                res.status(404).send({message: 'El usuario no tiene asistencias a eventos'});
            }else{
                res.status(200).send({assistances});
            }
        }
    });
}

function getAssistancesEvent(req, res){
    var eventId = req.params.id;
}


module.exports = {
    addAssistance,
    deleteAssistance,
    verificationAssistance,
    getCurrentAssistancesUser,
    getPastAssistancesUser,
    getAssistancesEvent
}