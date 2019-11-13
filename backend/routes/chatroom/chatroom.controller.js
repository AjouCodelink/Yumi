var router = require('express').Router();
var ChatRoom = require('../../models/chatRoom');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');

/*
    GET /chatroom/search/:keyword
*/
exports.searchWord = (req, res) =>{
    var keyword = req.params.keyword;
    
    ChatRoom.findRoomByKeyword(keyword).then(function(data){
        res.json(data);
    })
}

/*
    POST /chatroom/creation
    {
        interest
    }
*/
exports.creation = (req, res) => {
    var chatRoom = new ChatRoom();
    var userEmail = req.decoded.email;

    chatRoom.interest = req.body.interest;

    User.findOne({email:userEmail}, function(err, data){
        if(err) res.send(err);
        if(!data) res.json({result:0, message: "email not found!"});
        else{
            data.chatroom.push({cr_id : chatRoom._id, interest: chatRoom.interest});
            data.save(); // user가 속해 있는 chatroom_id 저장.

            var user_data = {};
            user_data.email = data.email;
            user_data.nickname = data.nickname;
            user_data.interests = data.interests;
            
            chatRoom.participants.push(user_data);
            /*
            TODO : 이 부분에 socket.on('join room') 코드 작성 해야 됨.
            */
            chatRoom.save((err)=>{
                if(err){
                    console.log(err);
                    res.json({result:0});
                    return;
                }
                res.json({result:1, chatroom_id : chatRoom._id});
            })
        }
    })
}

/*
    GET /chatroom/list
*/
exports.getList = (req, res) => { // user가 속해 있는 채팅방 목록 반환
    var userEmail = req.decoded.email;
    User.findOne({email:userEmail}, function(err, data){
        res.send(data.chatroom);
    })
}