var express = require('express');
var router = express.Router();
var ChatRoom = require('../../models/chatRoom');
var User = require('../../models/user');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'creation' });
});

router.post('/', function(req, res, next){
    var user_email = req.body.email;
    var interests_list = req.body.interests;

    var chatRoom = new ChatRoom();
    chatRoom.interests = interests_list;

    User.findOne({email:user_email}, function(err, data){
        if(err) res.send(err);
        else{
            var user_data = {};
            user_data.email = data.email;
            user_data.nickname = data.nickname;
            user_data.interests = data.interests;

            chatRoom.participants.push(user_data);
            
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