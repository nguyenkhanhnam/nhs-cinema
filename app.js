var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');


// MY REQUIRE
//For api
var setupController = require('./api/controllers/setupController');
var movieController = require('./api/controllers/movieController')

//For routing
var movie = require('./routes/movie');

//For fileupload-express
var fileUpload = require('express-fileupload');

//For Mongoose
var mongoose = require('mongoose');
//Create connection with Mlab
mongoose.connect('mongodb://test:123@ds251588.mlab.com:51588/nam-cinema-db', function (error) {
  // Do things once connected
  console.log("MLab connected");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.get('/', function(req, res, next) {
  res.render('list-movie.ejs');
});
app.use('/users', users);


// For express-fileupload
app.use(fileUpload());

// Create routing
app.use('/movie', movie);


app.get('/signin', function(req, res, next){
  res.render('signin');
});

app.get('/signup', function(req, res, next){
  res.render('signup');
});

setupController(app);
movieController(app);


/*app.post('/movie/createMovie', function (req, res, next) {
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

  var newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    release: req.body.release,
    description: req.body.description,
    //cover: `/public/images/${sampleFile.name}`
  }

  console.log(newMovie);
});*/



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
