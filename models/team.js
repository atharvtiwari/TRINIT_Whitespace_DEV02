const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
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

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;