var Movies = require('../models/movieModel')
const responseStatus = require('../configs/responseStatus')
const path = require('path')
const common = require('./common')

function addMovie (req, userCreatedId) {
  return new Promise((resolve, reject) => {
    if (!req.files || !req.files.cover || !req.body.title || !req.body.genre || !req.body.release) {
      return reject(responseStatus.Code400())
    }
    let cover = req.files.cover
    var fileName = new Date().getTime() + '_' + cover.name
    const pathFile = path.join(__dirname, '/../../public/images/', fileName)
    cover.mv(pathFile, function (err) {
      if (err) {
        console.log(err)
        return reject(responseStatus.Code500(err))
      } else {
        var newMovie = {
          title: req.body.title,
          genre: req.body.genre,
          release: req.body.release,
          description: req.body.description || '',
          cover: `/images/${fileName}`,
          creator: userCreatedId,
          createdAt: common.timestampToString(Date.now())
        }
        Movies.create(newMovie, function (err) {
          if (err) {
            console.log(err)
            return reject(responseStatus.Code500(err))
          } else {
            const photoURL = '/images/' + fileName
            return resolve(responseStatus.Code200({ message: responseStatus.CREATE_MOVIE_SUCCESS, photoURL: photoURL }))
          }
        })
      }
    })
  })
}

function deleteMovie (id) {
  return new Promise((resolve, reject) => {
    Movies.remove({ _id: id }, function (err) {
      if (err) {
        return reject(responseStatus.Code500(err))
      } else {
        return resolve(responseStatus.Code200({ message: responseStatus.DELETE_MOVIE_SUCCESS }))
      }
    })
  })
}

function editMovie (req, movie) {
  return new Promise((resolve, reject) => {
    movie.title = req.body.title || movie.title
    movie.genre = req.body.genre || movie.genre
    movie.release = req.body.release || movie.release
    movie.description = req.body.description || movie.description

    if (!req.files || !req.files.cover) {
      saveEditMovie(movie)
        .then(resolve1 => {
          return resolve(resolve1)
        }).catch(reject1 => {
          return reject(reject1)
        })
    } else {
      let cover = req.files.cover
      var fileName = new Date().getTime() + '_' + cover.name
      const pathFile = path.join(__dirname, '/../../public/images/', fileName)
      cover.mv(pathFile, function (err) {
        if (err) {
          console.log(err)
          return reject(responseStatus.Code500(err))
        } else {
          movie.cover = '/images/' + fileName
          saveEditMovie(movie)
            .then(resolve1 => {
              return resolve(resolve1)
            }).catch(reject1 => {
              return reject(reject1)
            })
        }
      })
    }
  })
}

function getMovie (id) {
  return new Promise((resolve, reject) => {
    Movies.findById(id.toString()).populate('creator', 'username avatar email')
      .exec(function (err, movie) {
        if (err) {
          return reject(responseStatus.Code500(err))
        }
        if (!movie) {
          return reject(responseStatus.Code404({ errorMessage: responseStatus.MOVIE_NOT_FOUND }))
        }
        return resolve(responseStatus.Code200({ movie: movie }))
      })
  })
}

function getMovies () {
  return new Promise((resolve, reject) => {
    Movies.find().populate('creator', 'username avatar email').exec(function (err, movies) {
      if (err) {
        return reject(responseStatus.Code500(err))
      }
      if (!movies) {
        return reject(responseStatus.Code404({ errorMessage: responseStatus.MOVIE_LIST_NOT_FOUND }))
      }
      return resolve(responseStatus.Code200({ movies: movies }))
    })
  })
}

async function getUserMovies (id) {
  return Movies.find({creator: id}).populate('creator', 'username avatar email')
}

function saveEditMovie (movie) {
  return new Promise((resolve, reject) => {
    movie.save(function (err, movie) {
      if (err) {
        console.log(err)
        return reject(responseStatus.Code500(err))
      }
      return resolve(responseStatus.Code200({ message: responseStatus.EDIT_MOVIE_SUCCESS, photoURL: movie.cover }))
    })
  })
}

module.exports = {
  addMovie: addMovie,
  editMovie: editMovie,
  deleteMovie: deleteMovie,
  getMovie: getMovie,
  getMovies: getMovies,
  getUserMovies: getUserMovies
}
