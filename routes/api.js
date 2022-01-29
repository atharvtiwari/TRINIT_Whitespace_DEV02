
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

router.post("/signup", (req, res) => {
    var {
        username,
        name,
        email,
        password
    } = req.body;
    
    if (!username || !email || !password || !name) {
        return res.status(422).json({
            error: "please fill all fields",
        });
    }
    bcrypt.hash(password,  Math.floor((Math.random() * 25) + 1) )
    .then((hashedpass) => {
        User.findOne({
            email: email
        })
        User.findOne({
            username: username
        })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error: "user with this username/email already in database"
                })
            }
            const user = new User({
                username,
                name,
                email,
                password: hashedpass,
                current: true
            })
            user.save()
            .then(() => {
                res.json({
                    message: "saved successfully"
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })
})