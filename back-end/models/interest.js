'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    interested: []
    }, 
    { versionKey: false }
);

module.exports = mongoose.model('Interest', interestSchema);