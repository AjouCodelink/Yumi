var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true },
    interests: [String],
});

module.exports = mongoose.model('user', userSchema);