var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

var Users = require('../models/userModel');

passport.serializeUser(function (user, done) {
    console.log("User Id");
    console.log(user.id);
    //req.session.userId = user.id;
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log(id);
    Users.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: "1678125332230925",
    clientSecret: "9eeadeba30775424e1f8e4d13384c8ba",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['displayName', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        //console.log(profile._json.email);
        //console.log(accessToken);
        /*Users.findOrCreate({email: profile._json.email}, function (err, user) {
          if (err) { return done(err); }
          done(null, user);
        });*/

        Users.findOne({ email: profile.emails[0].value }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new Users({
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    provider: 'facebook'
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    //facebook: profile._json
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                return done(err, user);
            }

        })
    }
));

module.exports = passport;