var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChatRoomSchema = mongoose.Schema({
    name : {type: String},
    interest: {
        section : {type : String},
        group : {type : String}
    },
    participants: [{
        email: { type: String},
        nickname: { type: String},
        interests: [{
            section : {type:String},
            group:{type:String}
        }],
        socketID: { type: String }
    }],
    chatlog:[{
        user_email:{type: String},
        time: { type: String },
        message: { type: String}
    }]
});

module.exports = mongoose.model('chatroom', ChatRoomSchema);
