'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = Schema({
    name: String,
    description: String,
    webpage: String,
    social_red: Array,
    image: String,
    delete: Boolean
    },
    { versionKey: false }
);

module.exports = mongoose.model('Artist', artistSchema);