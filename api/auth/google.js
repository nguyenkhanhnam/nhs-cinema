var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Users = require('../models/userModel');
var configs = require('../../configs')

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "595569303747-ndtsc8sufl4v12sdeshp24fn24igdqp8.apps.googleusercontent.com",
    clientSecret: "DmeX0d4pMDjjIjga1HUi-Fr0",
    callbackURL: configs.domainName + "/auth/google/callback"
},  
    function (accessToken, refreshToken, profile, done) {
        Users.findOne({email: profile.emails[0].value}, function (err, user) {
            var avatar = profile.photos[0].value.replace('sz=50','sz=200');
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new Users({
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    provider: profile.provider,
                    avatar: avatar
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                user.username = profile.displayName,
                user.avatar = avatar
                //found user. Return
                user.save(function (err, updatedUser) {
                    if (err) return handleError(err);
                    //res.send(updatedUser);
                });
                return done(err, user);
            }
        })
    }
));


module.exports = passport;