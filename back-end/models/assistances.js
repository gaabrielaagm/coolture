'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assistanceSchema = Schema({
        event : {
            type: Schema.ObjectId,
            ref: 'Event'
        },
        user : {
            type: Schema.ObjectId,
            ref: 'User'
        },
        date_yes : Date,
        date_no : Date,
        del : Boolean
    },
    { versionKey: false }
);

module.exports = mongoose.model('Assistance', assistanceSchema);