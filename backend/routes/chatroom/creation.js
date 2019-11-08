var express = require('express');
var router = express.Router();
var ChatRoom = require('../../models/chatRoom');
var User = require('../../models/user');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'creation' });
});

router.post('/', function(req, res, next){ // 프론트쪽에서 email이랑 interests 보내줘야함.
    var userEmail = req.body.email;
    var interestsList = req.body.interests;

    var chatRoom = new ChatRoom();
    chatRoom.interests = interestsList;

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
            이 부분에 socket.on('join room') 코드 작성 해야 됨.
            */
            chatRoom.save((err)=>{
                if(err){
                    console.log(err);
                    res.json({result:0});
                    return;
                }
                res.json({result:1});
            })
        }
    })
})
module.exports = router;