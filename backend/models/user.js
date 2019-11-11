var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto')
const config = require('../config')

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    //nickname: { type: String, required: true },
    interests: [{
        section: { type: String },
        group: { type: String }
    }],
    language: { type: String },
    img_path: { type: String}
});

UserSchema.methods.comparePassword = function (inputPassword, cb) {
    if (inputPassword === this.password) {
        cb(null, true);
    } else {
        cb('error');
    }
};

// create new User document
UserSchema.statics.create = function(email, password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64');
    const user = new this({
        email,
        password: encrypted
    })
    // return the Promise
    return user.save()
}

// find one user by using username
UserSchema.statics.findOneByEmail = function(email) {
    return this.findOne({
        email
    }).exec()
}

module.exports = mongoose.model('user', UserSchema);