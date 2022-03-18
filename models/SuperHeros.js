const mongoose = require('mongoose');

const SuperHeroSchema = mongoose.Schema({
    user: {
        //document id, collection of users
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('superHero', SuperHeroSchema);