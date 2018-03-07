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
                password: req.body.password
                /*passwordConf: req.body.passwordConf*/
            }
            //use schema.create to insert data into the db
            Users.create(userData, function (err, user) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    req.session.userId = user._id;
                    console.log(req.session);
                    return res.redirect('/user/profile');
                }
            });
        }
        //return res.status(500).json({err: "Empty"});

        /*if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;

        var fileName = new Date().getTime() + "_" + sampleFile.name;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(__dirname + `/../../public/images/${fileName}`, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var newMovie = {
                    title: req.body.title,
                    genre: req.body.genre,
                    release: req.body.month+"-"+req.body.year,
                    description: req.body.description,
                    cover: `/images/${fileName}`
                }

                Movies.create(newMovie, function (err) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        res.redirect('/');
                    }
                })
            }
        });*/
    });

    //authenticate input against database

}