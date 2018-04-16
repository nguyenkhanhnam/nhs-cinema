var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var Users = require('../models/userModel');

passport.serializeUser(function (user, done) {
    //console.log("User Id");
    //console.log(user.id);
    //req.session.userId = user.id;
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    //console.log(id);
    Users.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: "1678125332230925",
    clientSecret: "9eeadeba30775424e1f8e4d13384c8ba",
    callbackURL: "https://nam-cinema.herokuapp.com/auth/facebook/callback",
    profileFields: ['displayName', 'email', 'picture.type(large)']
},
    function (accessToken, refreshToken, profile, done) {
        //console.log(profile);

        Users.findOne({ email: profile.emails[0].value }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new Users({
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    provider: 'facebook',
                    avatar: profile.photos[0].value
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    //facebook: profile._json
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                user.username = profile.displayName,
                user.avatar = profile.photos[0].value
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