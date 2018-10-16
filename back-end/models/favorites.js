'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = Schema({
        event : {
            type: Schema.ObjectId,
            ref: 'Event'
        },
        user : {
            type: Schema.ObjectId,
            ref: 'User'
        },
        del : Boolean
    },
    { versionKey: false }
);

module.exports = mongoose.model('Favorite', favoriteSchema);