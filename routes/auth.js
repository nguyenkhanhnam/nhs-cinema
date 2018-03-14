var express = require('express');
var router = express.Router();
var Users = require('../api/models/userModel');
var passportFacebook = require('../api/auth/facebook');
var passportGoogle = require('../api/auth/google');





// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passportFacebook.authenticate('facebook', { scope: 'email' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/signin',
  })
);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
  passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email', 'https://mail.google.com/']
  }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/signin' }),
  function (req, res) {
    res.redirect('/');
  });

module.exports = router;
