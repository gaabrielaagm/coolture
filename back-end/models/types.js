'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = Schema({
    type: String,
    clasification: String
});

module.exports = mongoose.model('Type', typeSchema);