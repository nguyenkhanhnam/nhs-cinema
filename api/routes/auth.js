var express = require('express')
var router = express.Router()
var passportFacebook = require('../auth/facebook')
var passportGoogle = require('../auth/google')
var configs = require('../../configs')
var authController = require('../controllers/authController')
var jwt = require('jsonwebtoken')
var responseStatus = require('../configs/responseStatus')

router.post('/sign-up', function (req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  authController.signUp(email, username, password)
    .then(resolve => {
      return res.send(resolve)
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

router.post('/sign-in', function (req, res) {
  const email = req.body.email
  const password = req.body.password
  authController.signIn(email, password)
    .then(resolve => {
      req.session.token = resolve.token
      return res.send(resolve)
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

router.get('/sign-out', function (req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err)
      }
      return res.send({ message: responseStatus.SIGN_OUT_SUCCESS })
    })
  }
})

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
    res.send(responseStatus({ message: responseStatus.SIGN_IN_SUCCESS, user: req.user, token: token }))
  } else {
    res.send(responseStatus({ errorMessage: responseStatus.AUTHENTICATE_FAIL }))
  }
})

router.get('/google',
  passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email', 'https://mail.google.com/']
  }))

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/signin' }),
  function (req, res) {
    res.redirect('/')
  })

module.exports = router
