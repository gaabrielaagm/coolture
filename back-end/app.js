'use strict'

var express = require('express');
var bodyParser = require('body-parser');

// load express framework
var app = express();

// load routes
var user_routes = require('./routes/user');
var event_routes = require('./routes/event');
var assistances_routes = require('./routes/assistances');
var interests_routes = require('./routes/interests');
var artist_routes = require('./routes/artist');
var favorites_routes = require('./routes/favorites');
var nodemailer_routes = require('./routes/nodemailer');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setting headers and cors - allow any user have access
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// setting bases routes
app.use('/api', user_routes);
app.use('/api', event_routes);
app.use('/api', assistances_routes);
app.use('/api', interests_routes);
app.use('/api', artist_routes);
app.use('/api', favorites_routes);
app.use('/api', nodemailer_routes);

// export module
module.exports = app;