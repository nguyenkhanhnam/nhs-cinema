var mongoose = require('mongoose')

var Schema = mongoose.Schema

var movieSchema = new Schema({
  title: String,
  genre: String,
  release: String,
  description: String,
  cover: String,
  creatorId: String,
  creator: {
    username: String,
    _id: String,
    avatar: String,
    email: String
  },
  createdAt: String
})

var Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies
