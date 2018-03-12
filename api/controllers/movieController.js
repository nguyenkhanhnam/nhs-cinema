var Movies = require("../models/movieModel");

function getMovies(res) {
    Movies.find(function (err, movies) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(movies);
        }
    })
};

module.exports = function (app) {
    app.get('/api/movie', function (req, res) {
        getMovies(res);
    });

    app.get('/api/movie/detail/:id', function (req, res) {
        Movies.findById(req.params.id, function (err, movie) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                //window.location.href='/movie/detail/'+req.params.id;
                res.json(movie);
                //res.render('movie-detail.ejs', { movie: movie });
            }
        })
    });


    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    app.post('/api/movie/create', function (req, res) {
        //console.log('creater');
        if (!req.files)
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
                var month = months.indexOf(req.body.month.split(":").pop()) + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                var year = req.body.month.split(":").pop();
                console.log(month);
                console.log(req.body.month);
                var newMovie = {
                    title: req.body.title,
                    genre: req.body.genre,
                    release: year + "/"+ month,
                    description: req.body.description,
                    cover: `/images/${fileName}`,
                    creator:  req.session.userId
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
        });
    });

    app.post('/api/movie/edit', function (req, res) {
        Movies.findById(req.params.id, function (err, movie) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                movie.title = req.body.title;
                movie.genre = req.body.genre;
                movie.release = req.body.month + "-" + req.body.year;
                movie.description = req.body.description;
                //cover: `/images/${fileName}`

                movie.save(function (err, updatedMovie) {
                    if (err) return handleError(err);
                    res.send(updatedMovie);
                });
            }
        });
    });
}