'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = Schema({
    name: String,
    description: String,
    webpage: String,
    image: String,
    del: Boolean
    },
    { versionKey: false }
);

module.exports = mongoose.model('Artist', artistSchema);