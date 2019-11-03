var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChatRoomSchema = mongoose.Schema({
    name: { type: String },
    interests: [{ type: String }],
    participants: [{
        email: { type: String, required: true, unique: true },
        nickname: { type: String},
        interests: [{ type: String }]
    }]
});

ChatRoomSchema.statics.findRoomByKeyword = function (keyword) {
    return this.find({interests: keyword});
};

module.exports = mongoose.model('chatroom', ChatRoomSchema);