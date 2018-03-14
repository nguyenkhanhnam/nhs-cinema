var express = require('express');
var router = express.Router();
var Users = require('../api/models/userModel');

/* GET users listing. */
/*router.get('/profile', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/', function (req, res, next) {
  //res.json({session: req.session});
});

/*router.get('/signup', function (req, res, next) {
  res.render('signup.ejs');
});*/

router.get('/changePassword', function (req, res, next) {
  if (!req.session.passport) {
    return res.redirect('/signin');
  }
  else {
    return res.render('change-password.ejs');
  }
});

router.get('/profile', function (req, res, next) {
  if (!req.session.passport) {
    return res.redirect('/signin');
  }
  else {
    return res.render('user-profile.ejs');
  }
  /*Users.findById(req.session.passport.user)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          res.render('user-profile', {user: user});
          console.log(user);
          //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });*/
});
module.exports = router;
