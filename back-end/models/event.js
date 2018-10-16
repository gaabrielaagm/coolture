'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = require('./artist');
//var artistSchema = mongoose.model('Artist');

var eventSchema = Schema({
        title: String,
        clasification: String,
        type: String,
        artists: Array,
        city: String,
        place: String,
        date: Date,
        description: String,
        assistances: Number,
        webpage: String,
        image: String,
        dateCreated: Date,
        //dateCreated: {type: Date, default: Date.now}
        del: Boolean
    },
    { versionKey: false }
);

module.exports = mongoose.model('Event', eventSchema);