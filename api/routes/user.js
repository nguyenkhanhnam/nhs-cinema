const express = require('express')
var router = express.Router()
const AuthService = require('../services/AuthService')
const responseStatus = require('../configs/responseStatus')
const userController = require('../controllers/userController2')

router.get('/', function (req, res) {
  const token = AuthService.getTokenFromReq(req)
  AuthService.isLogined(token)
    .then(resolve => {
      const user = resolve.user.cloneUser()
      return res.send(responseStatus.Code200({ user: user }))
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

router.put('/', function (req, res) {
  const token = AuthService.getTokenFromReq(req)
  AuthService.isLogined(token)
    .then(resolve => {
      const user = resolve.user
      userController.editUser(req, user)
        .then(resolve => {
          return res.send(resolve)
        })
        .catch(reject => {
          return res.status(reject.status).send(reject)
        })
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

module.exports = router
