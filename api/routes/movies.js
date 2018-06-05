var express = require('express')
var router = express.Router()
const AuthService = require('../services/AuthService')
const movieController = require('../controllers/movieController2')

router.get('/', function (req, res) {
  movieController.getMovies()
    .then(resolve => {
      return res.send(resolve)
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

router.get('/:id', function (req, res) {
  const id = req.params.id || ''
  movieController.getMovie(id)
    .then(resolve => {
      return res.send(resolve)
    })
    .catch(reject => {
      return res.status(reject.status).send(reject)
    })
})

router.post('/', function (req, res) {
  const token = AuthService.getTokenFromReq(req)
  AuthService.isLogined(token)
    .then(resolve => {
      const user = resolve.user
      movieController.addMovie(req, user._id)
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

router.put('/:id', (req, res) => {
  const token = AuthService.getTokenFromReq(req)
  const id = req.params.id || ''
  AuthService.canAccessMovie(token, id)
    .then(resolve => {
      const movie = resolve.movie
      movieController.editMovie(req, movie)
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

router.delete('/:id', (req, res) => {
  const token = AuthService.getTokenFromReq(req)
  const id = req.params.id || ''
  AuthService.canAccessMovie(token, id)
    .then(resolve => {
      movieController.deleteMovie(id)
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
