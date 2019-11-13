var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChatRoomSchema = mongoose.Schema({
    name: { type: String }, // 이거 없어도 되는거 아니냐
    interests: [{ type: String }],
    participants: [{
        email: { type: String},
        nickname: { type: String},
        interests: [{ type: String }]
    }]
});

ChatRoomSchema.statics.findRoomByKeyword = function(keyword) {
    return this.find({interests: keyword});
};

module.exports = mongoose.model('chatroom', ChatRoomSchema);