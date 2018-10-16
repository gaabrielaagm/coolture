'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs'); 
var path = require('path'); 

// models
var Artist = require('../models/artist');

// services
var jwt = require('../services/jwt');

var moment = require('moment');

// actions
function saveEvent(req, res){    
    var artist = new Artist();
    var params = req.body;
    console.log(params);

    if(params.name){
        artist.name = params.name;
        artist.description = params.description;
        artist.webpage = params.webpage;
        artist.image = "defaultArtist.png";
        artist.del = false;
        
        Artist.findOne({name: artist.name}, (err, issetArtist) => {
            if(err){
                res.status(500).send({message: 'Error comprobando artista'});
            }else{
                if(!issetArtist){ 
                    console.log(artist);
                    artist.save((err, artistStored) => {
                        if(err){
                            res.status(500).send({message: 'Error al guardar el artista'});
                        }else{
                            if(!artistStored){
                                res.status(404).send({message: 'No se ha registrado el artista'});
                            }else{
                                res.status(200).send({
                                    message: "Artista nuevo registrado",
                                    artist: artistStored
                                });
                            }
                        }
                    });
                }else{
                    res.status(404).send({
                        message: 'Ya existe un artista con ese nombre'
                    });
                }
            }
        });
    }else{
        res.status(404).send({
            message: 'Introduce los datos correctamente para poder registrar al artista'
        });
    }
}

function getArtists(req, res){
    Artist.find({del: false}).exec((err, artists) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas'});
            }else{
                res.status(200).send({artists});
            }
        }
    });
}

function getArtist(req, res){
    var value = req.params.value;
    var searchBy = req.params.search;
    if(searchBy == "id"){ 
        Artist.find( { _id: value, del: false } ).exec((err, artist) =>{
            if(err){
                res.status(500).send({message: 'No se encontró artista'});
            }else{
                if(!artist){
                    res.status(404).send({message: 'El artista no existe'});
                }else{
                    res.status(200).send({artist});
                }
            }
        });
    }else{
        if(searchBy == "name"){ 
            Artist.find( { name: value, del: false } ).exec((err, artist) =>{
                if(err){
                    res.status(500).send({message: 'No se encontró artista'});
                }else{
                    if(!artist){
                        res.status(404).send({message: 'El artista no existe'});
                    }else{
                        res.status(200).send({artist});
                    }
                }
            });
        }else{
            res.status(404).send({message: 'No se encontró artista'});
        }
    }
}

function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, {new: true}, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'Error, no se ha actualizado los datos del artista'});
            }else{
                res.status(200).send({message: "Artista actualizado", artist: artistUpdated});
            }
        }
    });
}

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndUpdate(artistId, {del: true}, {new: true}, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'No se ha podido eliminar el artista'});
            }else{
                res.status(200).send({ message: "Artista eliminado", artist: artistRemoved });
            }
        }
    });
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\'); 
        var file_name =  file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]; 

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
    
            Artist.findByIdAndUpdate(artistId, {image: file_name}, {new: true}, (err, artistUpdated) => {
                if(err){
                    res.status(500).send({
                        message: 'Error al actualizar imagen de artista'
                    });
                }else{
                    if(!artistUpdated){
                        res.status(404).send({
                            message: 'No se ha podido actualizar imagen de artista'
                        });
                    }else{
                        res.status(200).send({
                            message: 'Imagen del artista actualizada correctamente',
                            artist: artistUpdated,
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
    var path_file = './uploads/artists/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            // con resolve() le pasamos el path completo y este ya saca/devuelve el fichero y lo muestra en el navegador
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe', path_file: path_file});
        }
    });
}

module.exports = {
    saveEvent,
    getArtists,
    getArtist,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}
