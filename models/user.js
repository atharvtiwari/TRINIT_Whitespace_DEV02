const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        required: true,
        default: false
    },
    issues_in: [{
        type: Number,
        required: false,
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;