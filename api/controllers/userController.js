var Users = require("../models/userModel");

module.exports = function (app) {
    app.post('/api/user/signup', function (req, res) {
        console.log(req.body.username);
        console.log(req.body.email);
        console.log(req.body.password);
        if (req.body.email && req.body.username && req.body.password /* && req.body.passwordConf */) {
            var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                phone: null,
                avatar: '/images/avatar-user.png'
                /*passwordConf: req.body.passwordConf*/
            }
            //use schema.create to insert data into the db
            Users.create(userData, function (err, user) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    req.session.userId = user._id;
                    console.log(req.session);
                    return res.redirect('/');
                }
            });
        }
    });


    //authenticate input against database
    app.post('/api/user/signin', function (req, res) {
        Users.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                res.status(401).json({ err: "Wrong email or password" });
            } else {
                req.session.userId = user._id;
                return res.redirect('/');
            }
        });
    });

    //change user's password
    app.post('/api/user/changepassword', function (req, res) {
        Users.findById(req.session.userId, function (err, user) {
            if (err) {
                res.status(500).json({ err: "userId not found" });
            }
            else {
                Users.authenticate(user.email, req.body.current_password, function (error, user) {
                    if (error || !user) {
                        console.log(req.body.current_password)
                        var err = new Error('Wrong email or password.');
                        err.status = 401;
                        res.status(401).json({ err: "Wrong email or password" });
                    } else {
                        user.set({ password: req.body.password });
                        user.save(function (err, updatedUser) {
                            if (err) {
                                res.status(500).json(err);
                            }
                            else {
                                return res.redirect('/user/profile');
                            }
                        });
                    }
                });
            }
        })
    });

    //get user from database
    app.get('/api/user/', function (req, res) {
        console.log(req.session);
        Users.findById(req.session.userId, function (err, user) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.json(user);
            }
        })
    });

    //update user info
    app.post('/api/user/', function (req, res) {
        console.log('update');
        Users.findById(req.session.userId, function (err, user) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                if (req.body.username != "") {
                    user.set({ username: req.body.username });
                }

                if (req.body.phone != "") {
                    user.set({ phone: req.body.phone });
                }

                if (req.files) {
                    if (req.body.username != "") {
                        user.set({ username: req.body.username });
                    }
                    if (req.body.phone != "") {
                        user.set({ phone: req.body.phone });
                    }

                    let sampleFile = req.files.sampleFile;

                    var fileName = new Date().getTime() + "_" + sampleFile.name;
                    console.log(fileName);

                    // Use the mv() method to place the file somewhere on your server
                    sampleFile.mv(__dirname + `/../../public/images/${fileName}`, function (err) {
                        if (err) {
                            console.log(fileName);
                            return res.status(500).json(err);
                        }
                        else {
                            console.log('set');
                            user.set({ avatar: '/images/' + fileName });

                            user.save(function (err, updatedUser) {
                                if (err) {
                                    res.status(500).json(err);
                                }
                                else {
                                    return res.redirect('/user/profile');
                                }
                            });

                        }
                    });
                }
                if (!req.files) {
                    user.save(function (err, updatedUser) {
                        if (err) {
                            res.status(500).json(err);
                        }
                        else {
                            return res.redirect('/user/profile');
                        }
                    });
                }
            }
        })
    });
}