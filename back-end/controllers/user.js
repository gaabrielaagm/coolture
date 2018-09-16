'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs'); 
var path = require('path'); 

// modelos
var User = require('../models/user');

//servicios
var jwt = require('../services/jwt');

// acciones
function saveUser(req, res){    
    // crear objeto del usuario
    var user = new User();

    // recoger los parametros/body que nos llega de la peticion http 
    //(ya convertidos a json)
    var params = req.body;
    console.log(params);

    // asignar valores al objeto user
    if(params.pw && params.name && params.surname && params.email){
        user.name = params.name.toLowerCase();
        user.surname = params.surname.toLowerCase();
        user.email = params.email.toLowerCase();
        user.role = 'ROLE_USER';
        user.image = 'defaultUser.png';
        user.notify = params.notify;

        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if(err){
                res.status(500).send({message: 'Error comprobando usuario'});
            }else{
                if(!issetUser){ //no existe un usuario con ese email, se registrará
                    bcrypt.hash(params.pw, null, null, function(err,hash){
                        user.pw = hash;
                        //Guardo usuario en base de datos
                        user.save((err, userStored) => {
                            if(err){
                                res.status(500).send({message: 'Error al guardar el usuario'});
                            }else{
                                if(!userStored){
                                    res.status(404).send({message: 'No se ha registrado el usuario'});
                                }else{
                                    res.status(200).send({
                                        message: "Usuario nuevo registrado",
                                        user: userStored
                                    });
                                }
                            }
                        })
                    });
                }else{ //ya existe un usuario con ese correo registrado
                    res.status(404).send({
                        message: 'El email introducido ya existe, usuario no registrado'
                    });
                }
            }
        });
    }else{
        res.status(404).send({
            message: 'Introduce los datos correctamente para poder registrar al usuario'
        });
    }
}

function login(req, res){
    var params = req.body;
    var email = params.email;
    var pw = params.pw;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error, comprobando usuario'});
        }else{
            if(user){
                bcrypt.compare(pw, user.pw, (err, check) => {
                    if(check){
                        // comprobar y generar el token
                        if(params.gettoken){ 
                            // devolver el token
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            //protegemos la password
                            //user.pw = '';
                            res.status(200).send({user});
                        }
                        
                    }else{
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse correctamente',
                            error: 'password'
                        });
                    }
                });
            }else{
                res.status(404).send({
                    message: 'El usuario no ha podido loguearse',
                    error: 'noExiste'
                });
            }
        }
    });
}

function updateUser(req, res){
    // req.params -> los parámetros que llegan directamente de la url
    var userId = req.params.id;
    var update = req.body;
    delete update.password;

    // verificamos que los dos ids sea iguales
    // Id que llega por la url != Id del usuario que esta logueado
    console.log(req.user);
    if(userId != req.user.sub){
        return res.status(500).send({ message: 'No tienes permiso para actualizar el usuario' });
    }
    

    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar usuario'
            });
        }else{
            if(!userUpdated){
                res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            }else{
                res.status(200).send({
                    message: 'Usuario actualizado correctamente',
                    user: userUpdated
                });
            }
        }
    });
}

function uploadImage(req, res){
    // recogemos el id que llega por la url
    var userId = req.params.id;
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
            /* 
            // revisar que el id del usuario que intenta cargar la imagen, sea el mismo que se autentifica (es algo redundante)
            if(userId != req.user.sub){
                return res.status(500).send({ message: 'No tienes permiso para actualizar el usuario' });
            }
            */
        
            User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, userUpdated) => {
                if(err){
                    res.status(500).send({
                        message: 'Error al actualizar usuario'
                    });
                }else{
                    if(!userUpdated){
                        res.status(404).send({
                            message: 'No se ha podido actualizar imagen usuario'
                        });
                    }else{
                        res.status(200).send({
                            message: 'Imagen de usuario actualizada correctamente',
                            user: userUpdated,
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
    var path_file = './uploads/users/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            // con resolve() le pasamos el path completo y este ya saca/devuelve el fichero y lo muestra en el navegador
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe', path_file: path_file});
        }
    });
}

function getAdmin(req, res){
    User.find({role: 'ROLE_ADMIN'}).exec((err, users) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay cuidadores'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

function getUser(req, res){
    var userId = req.params.id;

    User.findById(userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: 'El usuario no existe'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                if(!user.del){
                    res.status(200).send({user});
                }else{
                    res.status(404).send({message: 'El usuario no existe'});
                }
            }
        }
    });
}

function getUsers(req, res){
    User.find({ role: 'ROLE_USER', del: false }).exec((err, users) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay cuidadores'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

function getAll(req, res){
    User.find({ del: false }).exec((err, users) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay cuidadores'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

function deleteUser(req, res){
    var userId = req.params.id;

    User.findByIdAndUpdate(userId, {del: true}, {new: true}, (err, userRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!userRemoved){
                res.status(404).send({message: 'No se ha podido borrar el usuario'});
            }else{
                res.status(200).send({ message: "Usuario eliminado", user: userRemoved });
            }
        }
    });
}

function changePw(req, res){

}

//y todos esos métodos tienen que ser exportados de este modulo para poder usarlos fuera
module.exports = {
    saveUser,
    login,
    updateUser,
    getImageFile,
    uploadImage,
    getAdmin,
    getUser,
    getUsers,
    getAll,
    deleteUser
}