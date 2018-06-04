var Movies = require("../models/movieModel");
const configs = require('../../configs')

function getMovies(res) {
    Movies.find(function (err, movies) {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.json(movies);
        }
    })
};

module.exports = function (app) {
    app.get('/v1/movies', function (req, res) {
        getMovies(res);
    });

    app.get('/api/v1/movies', function (req, res) {
        Movies.find(function (err, movies) {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.send({movies: movies});
            }
        })
    });

    app.get('/v1/movies/:id', function (req, res) {
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

    app.get('/api/v1/movies/:id', function (req, res) {
        Movies.findById(req.params.id, function (err, movie) {
            if (err) {
                return res.status(500).json(err);
            }
            else {
                return res.status(200).send({movie: movie});
            }
        })
    });

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    app.post('/v1/movies/', function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let cover = req.files.cover;

        var fileName = new Date().getTime() + "_" + cover.name;

        cover.mv(__dirname + `/../../public/images/${fileName}`, function (err) {
            if (err) {
                return res.status(500).send(err);

            }
            else {
                var month = months.indexOf(req.body.month) + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                var year = req.body.year;
                var newMovie = {
                    title: req.body.title,
                    genre: req.body.genre,
                    release: year + "/" + month,
                    description: req.body.description,
                    cover: `/images/${fileName}`,
                    creator: req.session.passport.user
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

    app.post('/api/v1/movies/', function (req, res) {
        if (!req.files || !req.files.cover)
            return res.status(400).send({errorMessage: 'Cover is required.' });

        if (!req.body.title){
            return res.status(400).send({errorMessage: 'Title is required.' });
        }

        if (!req.body.genre){
            return res.status(400).send({errorMessage: 'Genre is required.' });
        }

        if (!req.body.release){
            return res.status(400).send({errorMessage: 'Release date is required.' });
        }

        let cover = req.files.cover;

        var fileName = new Date().getTime() + "_" + cover.name;

        cover.mv(__dirname + `/../../public/images/${fileName}`, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                var newMovie = {
                    title: req.body.title,
                    genre: req.body.genre,
                    release: req.body.release,
                    description: req.body.description || '',
                    cover: `/images/${fileName}`,
                    creator: req.session.passport? req.session.passport.user : ''
                }
                Movies.create(newMovie, function (err) {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    else {
                        const photoURL = configs.domainName + '/images/' + fileName
                        return res.status(200).send({ message: 'Movie created successfully', photoURL: photoURL })
                    }
                })
            }
        });
    });

    app.put('/v1/movies/:id', function (req, res) {
        Movies.findById(req.body.id, function (err, movie) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                var month = months.indexOf(req.body.month.split(":").pop()) + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                var year = req.body.year.split(":").pop();
                movie.title = req.body.title;
                movie.genre = req.body.genre;
                movie.release = year + "/" + month;
                movie.description = req.body.description;
                // cover: `/images/${fileName}`

                movie.save(function (err, updatedMovie) {
                    if (err) return handleError(err);
                    return res.status(200).send({ message: 'Movie edited' })
                });
            }
        });
    });
}