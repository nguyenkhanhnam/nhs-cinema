var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController2')
const AuthService = require('../services/AuthService')

router.get('/', function (req, res) {
  const token = AuthService.getTokenFromReq(req)
  AuthService.isLogined(token)
    .then(resolve => {
      const user = resolve.user.cloneUser()
      return res.send({ user: user })
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

module.exports = router
