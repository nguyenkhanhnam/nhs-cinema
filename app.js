var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var user = require('./routes/user')

// MY REQUIRE

// For passport, fb, google
var passport = require('passport')
var auth = require('./routes/auth')

// For api
var setupController = require('./api/controllers/setupController')
var movieController = require('./api/controllers/movieController')
var userController = require('./api/controllers/userController')
var apiAuth = require('./api/routes/auth')
var apiMovies = require('./api/routes/movies')
var apiUsers = require('./api/routes/user')

// For routing
var movie = require('./routes/movie')

// For fileupload-express
var fileUpload = require('express-fileupload')

// For Mongoose
var mongoose = require('mongoose')
// Create connection with Mlab
mongoose.connect('mongodb://test:123@ds251588.mlab.com:51588/nam-cinema-db', function (error) {
  if (error) {
    console.log(error)
  }
  // Do things once connected
  console.log('MLab connected')
})

// For express-session
var session = require('express-session')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// use sessions for tracking logins
app.use(session({
  secret: 'a very long long long key',
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}))
app.use(passport.initialize())
app.use(passport.session())

// For express-fileupload
app.use(fileUpload())

app.use('/api/v1/auth', apiAuth)
app.use('/api/v1/movies', apiMovies)
app.use('/api/v1/users', apiUsers)

app.use('/auth', auth)
app.get('/', function (req, res, next) {
  res.render('list-movie.ejs')
})
app.use('/user', user)

// Create routing
app.use('/movie', movie)

app.get('/mail', function (req, res, next) {
  return res.render('email.ejs')
})

app.get('/signin', function (req, res, next) {
  if (!req.session.passport) {
    return res.render('signin.ejs')
  } else {
    return res.redirect('/user/profile')
  }
})

app.get('/signup', function (req, res, next) {
  if (!req.session.passport) {
    return res.render('signup.ejs')
  } else {
    return res.redirect('/user/profile')
  }
})

app.get('/forgot', function (req, res, next) {
  res.render('forgot-password')
})

app.get('/reset', function (req, res, next) {
  if (!req.session.passport) {
    return res.redirect('/forgot')
  } else {
    return res.render('reset-password.ejs')
  }
})

// GET /logout
app.get('/signout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/')
      }
    })
  }
})

setupController(app)
movieController(app)
userController(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
