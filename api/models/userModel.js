var mongoose = require('mongoose')

var Schema = mongoose.Schema

// For Password Authentication
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var userSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  phone: Number,
  avatar: String,
  provider: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

// hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

userSchema.statics.authenticate = function (email, password, callback) {
  Users.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var error = new Error('User not found.')
        error.status = 401
        return callback(error)
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return callback()
        }
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}

userSchema.methods.cloneUser = function () {
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
    avatar: this.avatar,
    phone: this.phone,
    provider: this.provider
  }
}

userSchema.statics.findOrCreate = require('find-or-create')

var Users = mongoose.model('Users', userSchema)
module.exports = Users
