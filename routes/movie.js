var express = require('express');
var router = express.Router();

/* GET users listing. */

var movieList = [
  {
    title: 'The Shawshank Redemption',
    genre: 'Crime',
    release: '1994-10',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    cover: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
  },
  {
    title: 'The Godfather',
    genre: 'Crime',
    release: '1972-03',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cover: 'https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,700,1000_AL_.jpg'
  },
  {
    title: 'The Godfather II',
    genre: 'Crime',
    release: '1974-12',
    description: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
    cover: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjZiNzIxNTQtNDc5Zi00YWY1LThkMTctMDgzYjY4YjI1YmQyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,702,1000_AL_.jpg'
  },
  {
    title: 'The Dark Knight',
    genre: 'Action',
    release: '2008-07',
    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    cover: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg'
  },
  {
    title: '12 Angry Men',
    genre: 'Crime',
    release: '1957-04',
    description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
    cover: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_CR0,0,649,1000_AL_.jpg'
  }
]

router.get('/', function (req, res, next) {
  res.render('list-movie.ejs');
})

router.get('/detail/:id', function (req, res, next) {
  //res.send('respond with a resource');

  res.render('movie-detail.ejs');
});

router.get('/edit/:id', function (req, res, next) {
  //res.send('respond with a resource');
  res.render('edit-movie.ejs');
});

router.get('/create', function (req, res, next) {
  res.render('create-movie.ejs');
});

/*router.post('/createMovie', function (req, res, next) {
  console.log(req.body);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`D:\\nhs\\nhs-cinema\\public\\images\\${sampleFile.name}`, function (err) {
    if (err)
      return res.status(500).send(err);
  });

  var newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    release: req.body.release,
    description: req.body.description,
    cover: `/images/${sampleFile.name}`
  }

  movieList.push(newMovie);

  res.redirect('/movie');
});*/

/*router.post('/createMovie', function (req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname + `/public/images/${sampleFile.name}`, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
   var newMovie = {
     title: req.body.title,
     genre: req.body.genre,
     release: req.body.release,
     description: req.body.description,
   }
   console.log(newMovie);
 
   movieList.push(newMovie);

  res.send('Success');
});*/

/*router.post('/upload', function (req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+`/public/images/${sampleFile.name}`, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});*/

module.exports = router;
