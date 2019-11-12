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
        interests
    }
*/
exports.creation = (req, res) => { // TODO : email 빼고 토큰 사용해서 구현하기
    var chatRoom = new ChatRoom();
    var userEmail = req.decoded.email;

    chatRoom.interests = req.body.interests;

    User.findOne({email:userEmail}, function(err, data){
        if(err) res.send(err);
        if(!data) res.json({result:0, message: "email not found!"});
        else{
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