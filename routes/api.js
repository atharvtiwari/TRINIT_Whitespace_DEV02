
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');
const Issue = require('../models/issue');
const Team = require('../models/team')

router.get('/home', (req, res) => {
    User.findOne({ current: true })
    .then((loggedInUser) => {
        if(!loggedInUser)
        {
            return res.status(401).json({ error: "YOU MUST LOG IN" })
        }
        res.json(loggedInUser)
    })
    .catch((error) => {
        console.log('error: ', error);
    });
});