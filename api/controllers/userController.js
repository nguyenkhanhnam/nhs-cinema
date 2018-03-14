var Users = require("../models/userModel");
var nodemailer = require('nodemailer');

module.exports = function (app) {
    //user sign up
    app.post('/v1/users/', function (req, res) {
        //console.log(req.body.username);
        //console.log(req.body.email);
        //console.log(req.body.password);
        if (req.body.email && req.body.username && req.body.password) {
            Users.findOne({ email: req.body.email }, function (err, user) {
                if (err) {
                    return req.status(500).json(err);
                }
                if (!user) {
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
                            return res.status(500).json(err);
                        } else {
                            //req.session.cookie.passport.user = user._id;
                            req.session.passport = { user: user._id };
                            //console.log(req.session);
                            return res.status(200).json({ msg: 'Sign up successfully' })
                            //return res.redirect('/');
                        }
                    });
                }
                else {
                    return res.status(500).json({ err: 'Email is taken' });
                }
            });
        }
    });

    //authenticate input against database
    app.post('/v1/authentication', function (req, res) {
        Users.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                res.status(401).json({ err: "Wrong email or password" });
            } else {
                //req.session.cookie.passport =  {user: user._id};
                //console.log("Req");
                //console.log(req.session);
                //req.session.userId = user._id;
                req.session.passport = { user: user._id };
                console.log(req.session);
                return res.status(200).json({ success: true });
            }
        });
    });

    //change user's password
    app.post('/v1/users/:userId/password', function (req, res) {
        if (!req.session.passport) {
            return res.status(500).json({ err: "userId not found" });
        }
        Users.findById(req.session.passport.user, function (err, user) {
            user.set({ password: req.body.password });
            user.save(function (err, updatedUser) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    return res.status(200).json({ msg: "Password changed" });
                }
            });
        });

    });


    //get user from database
    app.get('/v1/users/', function (req, res) {
        //console.log(req.session);
        //console.log(req.session);
        if (!req.session.passport)
            return res.status(404).json("User not found");
        Users.findById(req.session.passport.user, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(404).json({ err: "Id not found" });
            }
            else {
                return res.json(user);
            }
        })

    });

    //update user info
    app.put('/v1/users/:userId/', function (req, res) {
        //console.log('update');
        Users.findById(req.session.passport.user, function (err, user) {
            if (err) {
                //console.log("err by id");
                //console.log(req.session);
                res.status(500).json({ err });
            }
            else {
                //if (req.files.sampleFile === undefined) {
                if (req.body.username != "") {
                    user.set({ username: req.body.username });
                }

                if (req.body.phone != "") {
                    user.set({ phone: req.body.phone });
                }
                //console.log(req.files.sampleFile);
                //console.log('inside');
                user.save(function (err, updatedUser) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        return res.status(200).json({ msg: "Update profile successfully" });
                        //return res.status.redirect('/user/profile');
                    }
                });
                /*}

                else {
                    //console.log("have file?");
                    if (req.body.username != "") {
                        user.set({ username: req.body.username });
                    }
                    if (req.body.phone != "") {
                        user.set({ phone: req.body.phone });
                    }

                    let sampleFile = req.files.sampleFile;

                    var fileName = new Date().getTime() + "_" + sampleFile.name;
                    //console.log(fileName);

                    // Use the mv() method to place the file somewhere on your server
                    sampleFile.mv(__dirname + `/../../public/images/${fileName}`, function (err) {
                        if (err) {
                            //console.log(fileName);
                            return res.status(500).json(err);
                        }
                        else {
                            //console.log('set');
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
                }*/
            }
        })
    });

    app.post('/v1/users/password/reset', function (req, res, next) {
        function RandomUnique() { //https://stackoverflow.com/a/44669548
            var charBank = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789";
            var random = '';
            var howmanycharacters = 8;
            for (var i = 0; i < howmanycharacters; i++) {
                random += charBank[parseInt(Math.random() * charBank.lenght)];
            }
            return random;
        }

        function sendEmail(user, password) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Yahoo',
                auth: {
                    user: 'nguyenkhanhnam_13@yahoo.com.vn',
                    pass: 'qlcnlzmuqqucnqdt'
                }
            });

            var mailOptions = {
                to: user.email,
                from: 'nguyenkhanhnam_13@yahoo.com.vn',
                subject: 'NHS Cinema Password Reset',
                text: `Dear ${user.username},\nThank you for contacting customer support.  Your new NHS Cinema password can be found below. \nThank you,
              \n
              \n
                Cinema Customer Support
              \n
              Email: ${user.email}
              Password: ${password}`
            };
            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });
        }

        console.log('reset');
        console.log(req.body.email);

        Users.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                return req.status(500).json(err);
            }
            if (!user) {
                return res.status(404).json({ error: 'Email not found' });
            }
            else {
                var newPassword = '123';
                user.password = newPassword;

                user.save(function (err, updatedUser) {
                    if (err) return handleError(err);
                    console.log(newPassword);
                    //res.redirect('/user/profile');
                    sendEmail(user, newPassword);
                    res.status(200).json({ msg: 'Password sent' });
                });
            }
        });


    });
}