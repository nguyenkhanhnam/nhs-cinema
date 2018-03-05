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
    app.get('/', function (req, res) {
        res.render('list-movie');
    });

    app.get('/movie/all', function (req, res) {
        getMovies(res);
    });

    app.get('/api/movie/detail/:id', function (req, res) {
        Movies.findById(req.params.id, function (err, movie) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.render('movie-detail.ejs', { movie: movie });
            }
        })
    });

    app.post('/api/movie/createMovie', function (req, res) {
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
                var newMovie = {
                    title: req.body.title,
                    genre: req.body.genre,
                    release: req.body.release,
                    description: req.body.description,
                    cover: `/images/${fileName}`
                }

                Movies.create(newMovie, function (err) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        getMovies(res);
                    }
                })
            }
        });
        //res.redirect('/movie');
    });
}