var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// For Password Authentication
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;



var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: Number,
    avatar: String,
    provider: String
})

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

userSchema.statics.authenticate = function (email, password, callback) {
    Users.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

userSchema.statics.findOrCreate = require("find-or-create");

var Users = mongoose.model("Users", userSchema);
module.exports = Users;
