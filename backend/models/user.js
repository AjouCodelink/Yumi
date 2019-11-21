var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto')
const config = require('../config')

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true },
    interests: [{
        section: { type: String },
        group: { type: String }
    }],
    language: { type: String },
    img_path: { type: String},
    chatroom:[{
        cr_id: { type: String},
        name:{ type: String},
        interest: {
            section : { type : String},
            group : { type : String }
        }
    }],
    address:{ type: String }
});

// create new User document
UserSchema.statics.create = function(user_info) {
    const {email, password, nickname, interests, language, img_path, address} = user_info;
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64');
    const user = new this({
        email,
        password: encrypted,
        nickname,
        interests,
        language,
        img_path,
        address
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

// verify the password of the User documment
UserSchema.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')
    console.log(this.password === encrypted)

    return this.password === encrypted
}

UserSchema.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('user', UserSchema);