var Movies = require('../models/movieModel');

module.exports = function (app) {
    app.get('/api/initial', function (req, res) {
        var seedMovies =
            [
                {
                    title: 'The Shawshank Redemption',
                    genre: 'Crime',
                    release: '1994/10',
                    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                    cover: '/images/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
                    creator: '5a9fc492cdbe1d2fa0adb887'
                },
                {
                    title: 'The Godfather',
                    genre: 'Crime',
                    release: '1972/03',
                    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                    cover: '/images/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,700,1000_AL_.jpg',
                    creator: '5a9fc492cdbe1d2fa0adb887'
                },
                {
                    title: 'The Godfather II',
                    genre: 'Crime',
                    release: '1974/12',
                    description: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
                    cover: '/images/MV5BMjZiNzIxNTQtNDc5Zi00YWY1LThkMTctMDgzYjY4YjI1YmQyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,702,1000_AL_.jpg',
                    creator: '5a9fc492cdbe1d2fa0adb887'
                },
                {
                    title: 'The Dark Knight',
                    genre: 'Action',
                    release: '2008/07',
                    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                    cover: '/images/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
                    creator: '5a9fc492cdbe1d2fa0adb887'
                },
                {
                    title: '12 Angry Men',
                    genre: 'Crime',
                    release: '1957/04',
                    description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
                    cover: '/images/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_CR0,0,649,1000_AL_.jpg',
                    creator: '5a9fc492cdbe1d2fa0adb888'
                }
            ];

        Movies.create(seedMovies, function (err, results) {
            //res.send(results);
            res.redirect('/');
        });

    });
}