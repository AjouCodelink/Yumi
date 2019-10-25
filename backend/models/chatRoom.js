var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChatRoomSchema = mongoose.Schema({
    interests: [String],
    participants: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('chatroom', ChatRoomSchema);