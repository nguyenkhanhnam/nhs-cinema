var express = require('express')
var router = express.Router()
var passportFacebook = require('../auth/facebook')
var passportGoogle = require('../auth/google')
var configs = require('../../configs')
var userController = require('../controllers/userController2')
var jwt = require('jsonwebtoken')

router.get('/facebook', passportFacebook.authenticate('facebook', { scope: 'email' }))

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/signin'
  })
)

router.post('/facebook/token', passportFacebook.authenticate('facebook-token'), function (req, res) {
  console.log(req.user)
  if (req.user) {
    let token = jwt.sign({ email: req.user.email }, configs.secret, {
      expiresIn: configs.tokenExpire
    })
    req.session.token = token
    userController.getUser(req.user.id)
      .then(resolve => {
        const user = resolve.user
        // userController.saveMobileToken(req, resolve.user, function (err, user) {
        res.send({ user: user, token: token })
        // })
      })
      .catch(reject => {
        res.send({ user: req.user, token: token })
      })
  } else {
    res.send({ errorMessage: 'Failed to authenticate' })
  }
})

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
  passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email', 'https://mail.google.com/']
  }))

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/signin' }),
  function (req, res) {
    res.redirect('/')
  })

module.exports = router
