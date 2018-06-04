var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');


// MY REQUIRE
// For Nodemailer (Send email)
var nodemailer = require('nodemailer');

//For passport, fb, google
var passport = require('passport');
var auth = require('./routes/auth');

//For api
var setupController = require('./api/controllers/setupController');
var movieController = require('./api/controllers/movieController');
var userController = require('./api/controllers/userController');

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

//For express-session
var session = require('express-session');

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



//use sessions for tracking logins
app.use(session({
  secret: 'a very long long long key',
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: false }
}
));
app.use(passport.initialize());
app.use(passport.session());

// For express-fileupload
app.use(fileUpload());

app.use('/auth', auth);
//app.use('/', index);
app.get('/', function (req, res, next) {
  res.render('list-movie.ejs');
});
app.use('/user', user);


// Create routing
app.use('/movie', movie);

app.get('/mail', function (req, res, next) {
  return res.render('email.ejs')
})


app.get('/signin', function (req, res, next) {
  if (!req.session.passport) {
    return res.render('signin.ejs');
  }
  else {
    return res.redirect('/user/profile')
  }
});

app.get('/signup', function (req, res, next) {
  if (!req.session.passport) {
    return res.render('signup.ejs');
  }
  else {
    return res.redirect('/user/profile')
  }
});

app.get('/forgot', function (req, res, next) {
  res.render('forgot-password');
});

app.get('/reset', function (req, res, next) {
  if (!req.session.passport) {
    return res.redirect('/forgot');
  }
  else {
    return res.render('reset-password.ejs');
  }
});

// GET /logout
app.get('/signout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

setupController(app);
movieController(app);
userController(app);


/*app.post('/movie/createMovie', function (req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "cover") is used to retrieve the uploaded file
  let cover = req.files.cover;
 
  // Use the mv() method to place the file somewhere on your server
  cover.mv(__dirname+`/public/images/${cover.name}`, function (err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });

  var newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    release: req.body.release,
    description: req.body.description,
    //cover: `/public/images/${cover.name}`
  }

  console.log(newMovie);
});*/







//var Users = require("../models/userModel");

/*var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
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
