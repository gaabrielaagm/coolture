'use strict'

var app = require('./app');
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/coolture', { userNewUrlParser: true })
    .then(() => {
        console.log('Connected to coolture DB');

        //servidor nodejs que escucha peticiones
        app.listen(port, () => {
            console.log('Server running...');
        });
        
    }).catch((err) => {
        console.log('Ha ocurrido un error '+ err);
    });