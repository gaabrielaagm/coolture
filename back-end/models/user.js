'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    surname: String,
    pw: String,
    email: String,
    role: String,
    image: String,
    notify: String,
    delete: Boolean
    },
    { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);