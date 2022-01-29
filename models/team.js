const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    leader : {
        type: String,
        required: true
    },
    developers: [{
        type: String,
        required: false
    }],
    members: [{
        type: String,
        required: false
    }]
});

const Team = mongoose.model("Issue", Team);
module.exports = Team;