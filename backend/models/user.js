var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true
    },
    interests: [{
        section: String,
        grout: String
    }]
});

userSchema.methods.comparePassword = function (inputPassword, cb) {
    if (inputPassword === this.password) {
        cb(null, true);
    } else {
        cb('error');
    }
};

module.exports = mongoose.model('user', userSchema);