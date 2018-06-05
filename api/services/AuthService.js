var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var Users = require('../models/userModel')
var Movies = require('../models/movieModel')
var config = require('../../configs')
var responseStatus = require('../configs/responseStatus')

function isLogined (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return reject(responseStatus.Code401({ errorMessage: 'Token is not valid' }))
      }
      if (!decoded || !decoded.email) {
        return reject(responseStatus.Code401({ errorMessage: 'Not authenticated with token' }))
      }
      var email = decoded.email
      Users.findOne({ email: email }, (err, user) => {
        if (err) {
          return reject(responseStatus.Code500({ errorMessage: 'Error when find user' }))
        }
        if (!user) {
          return reject(responseStatus.Code404({ errorMessage: 'Token is not of any users' }))
        }
        return resolve(responseStatus.Code200({ user: user }))
      })
    })
  })
}

function getTokenFromReq (req) {
  return req.session.token || req.headers['x-access-token']
}

function canAccessMovie (token, movieId) {
  return new Promise((resolve, reject) => {
    this.isLogined(token).then(_resolve => {
      Movies.findById(movieId.toString(), (err, movie) => {
        if (err) {
          return reject(responseStatus.Code500())
        }
        if (!movie) {
          return reject(responseStatus.Code404({ errorMessage: responseStatus.MOVIE_NOT_FOUND }))
        }
        var user = resolve.user
        if (user._id.toString() === movie.creator.toString()) {
          return resolve(responseStatus.Code200({ user: user, movie: movie }))
        }
        return reject(responseStatus.Code403({ errorMessage: responseStatus.INVALID_REQUEST }))
      })
    }).catch(_reject => reject(_reject))
  })
}

module.exports = {
  isLogined: isLogined,
  getTokenFromReq: getTokenFromReq,
  canAccessMovie: canAccessMovie
}
