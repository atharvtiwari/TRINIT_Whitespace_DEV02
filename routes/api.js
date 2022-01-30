
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
            console.log('saveduser')
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

router.post('/login', (req, res) => {
    var { username, password } = req.body
    if (!username || !password) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    User.findOne({ username: username })
    .then((savedUser) => {
        console.log(savedUser);
        if (savedUser == null) {
            console.log("test");
            return res.status(422).json({ error: "invalid email or password" })
        }
        bcrypt.compare(password, savedUser.password)
        .then(match => {
            if (match) {
                User.findOneAndUpdate({ _id: savedUser._id }, { current: 'true' }, null, function(err) {
                    if (err) {
                        console.log(err)
                    }
                })
                res.json({
                    message: "logged in successfully"
                })
            }
            else {
                return res.status(422).json({ error: "invalid email or password" })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/logout', (req, res) => {
    var { username } = req.body;
    User.findOneAndUpdate({ username: username }, {current: false }, null, function(err) {
        if (err) {
            res.status(500).json({ msg: 'Sorry, internal server error'});
            return;
        }
        return res.json({
            msh: 'user successfully logged out'
        });
    });
});


router.get('/who', (req, res) => {
    User.findOne({ current: true })
    .then((loggedInUser) => {
        if(!loggedInUser)
        {
            return res.status(400).json({ error: 'YOU MUST LOG IN'});
        }
        res.json(loggedInUser)
    })
    .catch((error) => {
        console.log('error: ', error);
    });
});

// router.get('/issues', (req, res) => {
//     var { issues } = req.body;
//     var issues_arr = [];
//     for (issue in issues)
//     {
//         Issue.findOne({ issue_id: issue})
//         .then((UserIssue) => {
//             if (!UserIssue)
//             {
//                 return res.status(400).json({ error: 'Issue not found' });
//             }
//             issues_arr.append(UserIssue);
//         })
//     }
//     var issues_json = JSON.stringify(issues_arr);
//     res.json(issues_json)
//     .catch((error) => {
//         console.log('error: ', error);
//     });
// })

// router.get('/create', (req, res) => {
//     var users_arr = [];
//     User.find({ })
//     .then((AllUsers) => {
//         if (!AllUsers)
//         {
//             return res.status(400).json({ error: 'No users found' });
//         }
//         for (OneUser in AllUsers)
//         {
//             users_arr.append(OneUser.username);
//         }
//     })
//     var users_json = JSON.stringify(users_arr);
//     res.json(users_json)
//     .catch((error) => {
//         console.log('error: ', error);
//     });
// })

// router.post('/create', (req, res) => {
//     var {
//         username,
//         id,
//         subject,
//         description,
//         priority,
//         type,
//         members
//     } = req.body;

//     if (!subject || !description || !type || !priority) {
//         return res.status(422).json({
//             error: "please fill all fields",
//         });
//     }

//     Issue.find( { id: id } )
//     .then((savedIssue) => {
//         if (savedIssue) {
//             return res.status(422).json({
//                 error: "Issue with this id already in database"
//             })
//         }
//         const issue = new Issue({
//             id,
//             subject,
//             description,
//             status: true,
//             priority,
//             type,
//             opened_by: username
//         })
//         issue.save()

//         for (member in members)
//         {
//             User.findOne({ username: username })
//             .then((currUser) => {
//                 if (!currUser)
//                 {
//                     return res.status(400).json({ error: 'User not found' });
//                 }
//                 var issues_in = currUser.issues_in;
//                 issues_in.append(id);
//                 User.findOneAndUpdate({ username: username }, { issues_in: issues_in }, null, (err) =>
//                 {
//                     if (err) {
//                         res.status(500).json({ msg: 'Sorry, internal server errors' });
//                         return;
//                     }
//                     return res.json({
//                         msg: 'Your data has been saved!!!!!!'
//                     });
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         }
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

router.get('/issues/:id', (req, res) => {
    Issue.findOne({ id: req.params.id})
    .then((UserIssue) => {
        if (!UserIssue)
        {
            return res.status(400).json({ error: 'Issue not found' });
        }
        res.json(UserIssue)
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})

router.post('/save', (req, res) => {
    var { discussion, id } = req.body;
    console.log(req.body)

    if (!id) {
        return res.status(422).json({
            error: "error",
        });
    }

    User.findOneAndUpdate({ id: id }, { discussion: discussion }, null, function (err) {
        if (err) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        console.log(discussion)
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    })
});



module.exports = router