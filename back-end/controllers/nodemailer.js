'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs'); 
var path = require('path'); 

// modelos
var Event = require('../models/event');
var Interest = require('../models/interest');

//servicios
var jwt = require('../services/jwt');

var moment = require('moment');
var mongoose = require('mongoose');

var nodemailer = require('nodemailer');

var xoauth2 = require('xoauth2');

var emailsList = [];
var event;
var data;

function sendEmail(req, res){
    var clasification = req.params.clasification;
    console.log(clasification);
    event = req.body;
    console.log(event);

    //* getting the emails of interested users on the events 
    Interest.aggregate([
        {   
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userInfo"
            }
        },
        { "$unwind": "$userInfo" },
        {
            $match: {
                "userInfo.notify": true,
                "interested" : { $in: [clasification] }
            }
        },
        {
            $project: {
                "_id" : 0,
                "email" : "$userInfo.email"
            }
        }
    ]).exec((err, emails) =>{
        if(err){
            console.log('Error en la peticion');
            //res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!emails){
                console.log('No hay usuarios interesados en este tipo' + interest);
            }else{
                emailsList = emails;
                //res.status(200).send({emails});

                /*
                var emailsString = '';
                for(var i=0; i < emailsList.length; i++){
                    if(i == 0 || i == (emailsList.length-1)){
                        emailsString = emailsString + emailsList[i].email;
                    }else{
                        emailsString = emailsString + ", " + emailsList[i].email;
                    }
                }

                //emailsString = emailsString + ', guerreromedinagabriela@gmail.com, sandicitlaly18@gmail.com';
                //emailsString = emailsString + ', guerreromedinagabriela@gmail.com, monserratgm905@gmail.com';
                //console.log(emailsString);
                */

                var link = "http://localhost:4200/eventos/detalle-evento/" + event._id;

                const output = `
                    <p>Hay un nuevo evento que podría interesarte:</p>
                    <ul>
                        <p><strong> Titulo: </strong> ${event.title} </p>
                        <p> ${event.clasification} | ${event.type} </p>
                        <p><strong> Lugar: </strong> ${event.place} | ${event.city} </p>
                        <p>Ingresa a nuestra página: <a href="${link}">Ver detalles de evento</a> </p>
                    </ul>
                `;
        
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'coolture.webpage@gmail.com', // generated ethereal user
                        pass: 'coolture18' // generated ethereal password 
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                
                for(var i=0; i < emailsList.length; i++){
                    // setup email data with unicode symbols
                    let mailOptions = { 
                        from: 'Coolture <coolture.webpage@gmail.com>', // sender address
                        to: emailsList[i].email, // list of receivers
                        subject: 'Nuevo evento: ' + event.title, // Subject line
                        text: 'Nuevo evento ' + event.title, // plain text body
                        html: output // html body
                    };
            
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }else{
                            res.status(200).send({message: 'Correo entregado', state: 'success'});
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        }
                    });
                }
            }
        }
    });   
}

function sendContactEmail(req, res){
    data = req.body;
    console.log(data);

    const output = `
        <p>Hay un nuevo contacto con un mensaje:</p>
        <ul>
            <p><strong> Nombre Contacto: </strong> ${data.name} </p>
            <p><strong> Correo Contacto: </strong> ${data.email} </p>
            <p><strong> Mensaje Contacto: </strong> ${data.message} </p>
        </ul>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'coolture.webpage@gmail.com', // generated ethereal user
            pass: 'coolture18' // generated ethereal password 
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = { 
        from: 'Coolture <coolture.webpage@gmail.com>', // sender address
        to: 'coolture.webpage@gmail.com', // list of receivers
        subject: 'Nuevo contacto: ' + data.name, // Subject line
        text: 'Nuevo contacto ' + data.name, // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
            res.status(200).send({message: 'Correo entregado', state: 'success'});
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });
}

module.exports = {
    sendEmail,
    sendContactEmail
}