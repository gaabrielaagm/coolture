'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs'); 
var path = require('path'); 

// modelos
var Event = require('../models/event');
var Artist = require('../models/artist');

//servicios
var jwt = require('../services/jwt');

var moment = require('moment');
var mongoose = require('mongoose');

// acciones
function saveEvent(req, res){    
    // crear objeto del usuario
    var event = new Event();

    // recoger los parametros/body que nos llega de la peticion http 
    //(ya convertidos a json)
    var params = req.body;
    //console.log(params);

    // asignar valores al objeto event
    if(params.title && params.clasification && params.type){
        event.title = params.title;
        event.clasification = params.clasification;
        event.type = params.type;
        event.city = params.city;
        event.place = params.place;
        event.date = params.date;
        event.description = params.description;
        event.assistances = 0;
        event.webpage = params.webpage;
        event.dateCreated = moment().format("DD/MM/YYYY");
        event.delete = false;
        event.image = "default"+params.clasification+".png";

        var artistas = new Array();
        for(var i=0; i< params.artist.length; i++){
            //artistas.push({_id: null, name: params.artist[i]});
            artistas.push( { name: params.artist[i] } );
        }
        event.artists = artistas

        //var artista1 = {id: "", name: ""};
        
        /*
        var artist1, artist2, artist3, artist4, artist5;
        if(params.artist1){
            //artist1 = new Artist();
            artist1 = { _id: null, name: params.artist1 };
        }else{
            artist1 = null;
        }
        if(params.artist2){
            artist2 = { _id: null, name: params.artist2 };
        }else{
            artist2 = null;
        }
        if(params.artist3){
            artist3 = { _id: null, name: params.artist3 };
        }else{
            artist3 = null;
        }
        if(params.artist4){
            artist4 = { _id: null, name: params.artist4 };
        }else{
            artist4 = null;
        }
        if(params.artist5){
            artist5 = { _id: null, name: params.artist5 };
        }else{
            artist5 = null;
        }
        
        event.artists = {artist1, artist2, artist3, artist4, artist5};
        */

        /*
        event.artists = [ 
            {_id: null, name: params.artist1},
            {_id: null, name: params.artist2},
            {_id: null, name: params.artist3},
            {_id: null, name: params.artist4},
            {_id: null, name: params.artist5}
        ];
        */        
        
        Event.findOne(
            {   
                title: event.title, 
                clasification: event.clasification, 
                type: event.type, 
                city: event.city,
                place: event.place,
                date: event.date, 
                hour: event.hour
            },
        (err, issetEvent) => {
            if(err){
                res.status(500).send({message: 'Error comprobando evento'});
            }else{
                if(!issetEvent){ 
                    console.log(event);
                    event.save((err, eventStored) => {
                        if(err){
                            res.status(500).send({message: 'Error al guardar el evento'});
                        }else{
                            if(!eventStored){
                                res.status(404).send({message: 'No se ha registrado el evento'});
                            }else{
                                res.status(200).send({
                                    message: "Evento nuevo registrado",
                                    event: eventStored
                                });
                            }
                        }
                    });
                }else{ //ya existe un usuario con ese correo registrado
                    res.status(404).send({
                        message: 'Ya existe un evento con ese nombre'
                    });
                }
            }
        });
    }else{
        res.status(404).send({
            message: 'Introduce los datos correctamente para poder registrar al evento'
        });
    }
}

function getEvents(req, res){
    Event.aggregate([
        {
            $match: { 
                delete: false
            }
        },
        {   
            $project:{
                date: 1, title: 1, clasification: 1, type: 1, city: 1, place: 1, description: 1, assistances: 1, webpage: 1,
                dateCreated: 1, delete: 1,
                date_format: { $dateToString: { format: "%d-%m-%Y", date: "$date"} },
                hour: { $dateToString: { format: "%H:%M:%S", date: "$date"} }
            }
        }
    ]).exec((err, event) => {
        if(err){
            res.status(500).send({message: 'El evento no existe'});
        }else{
            if(!event){
                res.status(404).send({message: 'El evento no existe'});
            }else{
                res.status(200).send({event});                
            }
        }
    });
}

function getEvent(req, res){
    var eventId = req.params.id;
    var newId = new mongoose.mongo.ObjectId(eventId);
    /*
    Event.findById(eventId).exec((err, event) => {
        if(err){
            res.status(500).send({message: 'El evento no existe'});
        }else{
            if(!event){
                res.status(404).send({message: 'El evento no existe'});
            }else{
                if(!event.delete){
                    res.status(200).send({event});
                }else{
                    res.status(404).send({message: 'El evento no existe'});
                }
            }
        }
    });
    */

    Event.aggregate([
        {
            $match: { 
                delete: false,
                _id: newId
            }
        },
        {   
            $project:{
                date: 1, title: 1, clasification: 1, type: 1, city: 1, place: 1, description: 1, assistances: 1, webpage: 1,
                dateCreated: 1, delete: 1,
                date_format: { $dateToString: { format: "%d-%m-%Y", date: "$date"} },
                hour: { $dateToString: { format: "%H:%M:%S", date: "$date"} }
            }
        }
    ]).exec((err, event) => {
        if(err){
            res.status(500).send({message: 'El evento no existe'});
        }else{
            if(!event){
                res.status(404).send({message: 'El evento no existe'});
            }else{
                res.status(200).send({event});                
            }
        }
    });
}

function updateEvent(req, res){
    var eventId = req.params.id;
    var update = req.body;

    Event.findByIdAndUpdate(eventId, update, {new: true}, (err, eventUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!eventUpdated){
                res.status(404).send({message: 'Error, no se ha actualizado los datos del evento'});
            }else{
                res.status(200).send({event: eventUpdated});
            }
        }
    });
}

function deleteEvent(req, res){
    var eventId = req.params.id;

    Event.findByIdAndUpdate(eventId, {delete: true}, {new: true}, (err, eventRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!eventRemoved){
                res.status(404).send({message: 'No se ha podido borrar el evento'});
            }else{
                res.status(200).send({ message: "Evento eliminado", event: eventRemoved });
            }
        }
    });
}

function uploadImage(req, res){
    // recogemos el id que llega por la url
    var eventId = req.params.id;
    var file_name = 'No subido...';

    //comprobamos que llegan ficheros 
    // files existe gracias al connect-multiparty
    if(req.files){
        
        var file_path = req.files.image.path;
        //sacamos solo el nombre del fichero
        var file_split = file_path.split('\\'); 
        var file_name =  file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]; 

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
    
            Event.findByIdAndUpdate(eventId, {image: file_name}, {new: true}, (err, eventUpdated) => {
                if(err){
                    res.status(500).send({
                        message: 'Error al actualizar imagen de evento'
                    });
                }else{
                    if(!eventUpdated){
                        res.status(404).send({
                            message: 'No se ha podido actualizar imagen de evento'
                        });
                    }else{
                        res.status(200).send({
                            message: 'Imagen de evento actualizada correctamente',
                            event: eventUpdated,
                            image: file_name
                        });
                    }
                }
            });
        }else{
            // eliminar fichero con extensión no válida
            fs.unlink(file_path, (err) =>{
                if(err){
                    res.status(200).send({message: 'Extension no válida y fichero no borrado'});
                }else{
                    res.status(200).send({message: 'Extension no válida y fichero eliminado'});
                }
            });
        }  
    }else{
        res.status(200).send({message: 'No se han subido ficheros'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/events/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            // con resolve() le pasamos el path completo y este ya saca/devuelve el fichero y lo muestra en el navegador
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe', path_file: path_file});
        }
    });
}

function incAssistances(req, res){
    var idEvent = req.params.id;

    Event.update({_id: idEvent}, {$inc: {assistances: 1}}, {new: true}, (err, eventUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!eventUpdated){
                res.status(404).send({message: 'Error, no se ha actualizado los datos del evento'});
            }else{
                res.status(200).send({event: eventUpdated});
            }
        }
    });
}

function decAssistances(req, res){
    var idEvent = req.params.id;

    Event.update({_id: idEvent}, {$inc: {assistances: -1}}, {new: true}, (err, eventUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!eventUpdated){
                res.status(404).send({message: 'Error, no se ha actualizado los datos del evento'});
            }else{
                res.status(200).send({event: eventUpdated});
            }
        }
    });
}

function getGeneralRanking(req,res){
    var month = moment().month();
    var year = moment().year();
    console.log(month);
    Event.aggregate([
        {
            $project: {
                title : 1, assistances : 1, date : 1,
                clasification : 1, type : 1,
                year : { $year : "$date" },
                month : { $month : "$date" },            
            }
        },
        {
            $match: {
                month : { $eq : month },
                year : { $eq : year }
            }
        },
        {
             $sort: {assistances: -1}
        }
    ]).exec((err, event) => {
        if(err){
            res.status(500).send({message: 'Error al obtener eventos'});
        }else{
            if(event.length == 0){
                res.status(404).send({message: 'No existen eventos'});
            }else{
                res.status(200).send({event});                
            }
        }
    });
}

function getSpecificRanking(req,res){
    var month = parseInt(req.params.month);
    var year = parseInt(req.params.year);
    console.log(month);
    Event.aggregate([
        {
            $project: {
                title : 1, assistances : 1, date : 1,
                clasification : 1, type : 1,
                year : { $year : "$date" },
                month : { $month : "$date" },            
            }
        },
        {
            $match: {
                month : { $eq : month },
                year : { $eq : year }
            }
        },
        {
             $sort: {assistances: -1}
        }
    ]).exec((err, event) => {
        if(err){
            res.status(500).send({message: 'Error al obtener eventos'});
        }else{
            if(event.length == 0){
                res.status(404).send({message: 'No existen eventos'});
            }else{
                res.status(200).send({event});                
            }
        }
    });
}

function getClasificationRanking(req,res){
    var clasification = req.params.clasification;
    Event.aggregate([
        {
            $project: {
                title : 1, assistances : 1, date : 1,
                clasification : 1, type : 1,
                year : { $year : "$date" },
                month : { $month : "$date" },            
            }
        },
        {
            $match: {
                clasification : { $eq : clasification },
                assistances : { $gt: 0 },
                year : { $eq : moment().year() },
                month : { $eq : moment().month() }
            }
        },
        {
             $sort: {assistances: -1}
        }
    ]).exec((err, event) => {
        if(err){
            res.status(500).send({message: 'Error al obtener eventos'});
        }else{
            if(event.length == 0){
                res.status(404).send({message: 'No existen eventos'});
            }else{
                res.status(200).send({event});                
            }
        }
    });
}


module.exports = {
    saveEvent,
    getEvents,
    getEvent,
    updateEvent,
    uploadImage,
    getImageFile,
    deleteEvent,
    incAssistances,
    decAssistances,
    getGeneralRanking,
    getSpecificRanking,
    getClasificationRanking
}