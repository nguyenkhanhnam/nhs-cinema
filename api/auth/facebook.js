var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

var Users = require('../models/userModel');

passport.use(new FacebookStrategy({
    clientID: "1678125332230925",
    clientSecret: "9eeadeba30775424e1f8e4d13384c8ba",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['displayName', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        /*Users.findOrCreate({username: profile.id}, function (err, user) {
          if (err) { return done(err); }
          done(null, user);
        });*/
    }
));

module.exports = passport;