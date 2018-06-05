var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
var configs = require('../../configs')
var Users = require('../models/userModel')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new FacebookStrategy(
  {
    clientID: '1678125332230925',
    clientSecret: '9eeadeba30775424e1f8e4d13384c8ba',
    callbackURL: configs.domainName + '/auth/facebook/callback',
    profileFields: ['displayName', 'email', 'picture.type(large)']
  }, function (accessToken, refreshToken, profile, done) {
    Users.findOne({ email: profile.emails[0].value }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        user = new Users({
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: 'facebook',
          avatar: profile.photos[0].value
        })
        user.save(function (err) {
          if (err) console.log(err)
          return done(err, user)
        })
      } else {
        user.username = profile.displayName
        user.avatar = profile.photos[0].value
        user.save(function (err, user) {
          if (err) {
            console.log(err)
            return done(err, user)
          }
          return done(err, user)
        })
      }
    })
  })
)

passport.use(new FacebookTokenStrategy({
  clientID: configs.FACEBOOK_APP_ID,
  clientSecret: configs.FACEBOOK_APP_SECRET
}, function (accessToken, refreshToken, profile, done) {
  var newUser = {
    username: profile.displayName,
    email: profile.emails[0].value,
    avatar: profile.photos ? profile.photos[0].value : '',
    provider: 'facebook'
  }
  createSocialUser(newUser)
    .then(resolve => {
      const user = resolve.user.cloneUser()
      return done('', user)
    })
    .catch(reject => {
      return done(reject)
    })
}))

function createSocialUser (socialUser) {
  return new Promise((resolve, reject) => {
    Users.findOne({ email: socialUser.email }, function (err, user) {
      if (err) {
        return reject(err)
      }
      if (!user) {
        user = new Users(socialUser)
        user.save(function (err) {
          if (err) {
            console.log(err)
            return reject(err)
          }
          return resolve(user)
        })
      } else {
        user.username = socialUser.username
        user.avatar = socialUser.avatar
        user.save(function (err, user) {
          if (err) {
            console.log(err)
            return reject(err)
          }
          return resolve(user)
        })
      }
    })
  })
}

module.exports = passport
