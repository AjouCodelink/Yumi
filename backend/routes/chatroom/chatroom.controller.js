var router = require('express').Router();
var ChatRoom = require('../../models/chatRoom');
var User = require('../../models/user');

/*
    GET /chatroom/search/:keyword
*/
exports.searchWord = (req, res) =>{
    var keyword = req.params.keyword;

    ChatRoom.find().
        or([
            {"name" : {$regex : '.*'+keyword+'.*'}},
            {"interest.section" : {$regex : '.*'+keyword+'.*'}},
            {"interest.group" : {$regex : '.*'+keyword+'.*'}}
        ]).
        select('interest name').
        sort('name').
        exec((err, chatroom)=>{
            if(err) res.json(err);
            else if(chatroom.length) res.json(chatroom);
            else res.json(({result : true, message : "no search chatroom"}));
        })
}


/*
    POST /chatroom/creation
    {
        section,
        group
    }
*/
exports.creation = (req, res) => {
    var chatRoom = new ChatRoom();
    var userEmail = req.decoded.email;

    chatRoom.interest = req.body.interest;
    chatRoom.name = req.body.name;

    User.findOne({email:userEmail}, {email:1, nickname:1, interests:1, chatroom:1}, function(err, user){
        if(err) res.send(err);
        if(!user) res.json({result:0, message: "email not found!"});
        else{
            user.chatroom.push({cr_id : chatRoom._id, interest: chatRoom.interest, name: chatRoom.name});
            user.save(); // user가 속해 있는 chatroom_id 저장.

            var participant = {email : user.email, nickname : user.nickname, interests : user.interests};
            chatRoom.participants.push(participant);
            
            chatRoom.save((err)=>{
                if(err){
                    console.log(err);
                    res.json({result:0});
                    return;
                }
                res.json({result:true, cr_name : chatRoom.name, cr_id : chatRoom._id, interest : chatRoom.interest});
            })
        }
    })
}

/*
    GET /chatroom/list
*/
exports.getList = (req, res) => { // user가 속해 있는 채팅방 목록 반환
    var email = req.decoded.email;

    User.findOne({email:email}, { chatroom : 1 }, function(err, user){
        if(err) res.json(err);
        res.json(user.chatroom);
    })
}

/*
    POST /chatroom/entrance/:cr_id
*/
exports.entrance = (req, res)=>{
    var cr_id = req.params.cr_id;
    var email = req.decoded.email;

    ChatRoom.findOne({_id : cr_id}, function(err, chatroom){
        if(err) res.json(err);
        User.findOne({email:email},{email:1, nickname: 1, interests: 1, chatroom:1}, function(err, user){
            if(err) res.json(err);
            
            for(var i=0; i<chatroom.participants.length; i++){
                if(chatroom.participants[i].email == user.email) return res.json({result:false, message : "user already entrance"});
            }

            chatroom.participants.push({
                email : user.email,
                nickname : user.nickname,
                interests : user.interests
            })

            chatroom.save(function(){
                user.chatroom.push({
                    cr_id: chatroom._id,
                    name: chatroom.name,
                    interest: chatroom.interest
                })

                user.save(function(){
                    res.json({result: true, message: "success entrance!"});
                });
                
            });
        })

    })
}


/*
    chatroom recommendation api
    GET /chatroom/recommend
*/
exports.recommend = (req, res) => {
    var userEmail = req.decoded.email;

    User.findOne({email:userEmail}, {email:1, interests:1}, function(err, user){
        if(err) return res.status(500).json({message : "not found user"});
        if(user){
            var random_num = Math.floor(Math.random() * user.interests.length);

            if(user.interests.length == 0)
            {
                var random = Math.floor(Math.random() * 5);
                ChatRoom.find().skip(random).limit(5).exec((err, chatroom) => {
                    var a = chatroom[0];
                    res.json(a);
                })      
            }
            else{
                ChatRoom.find().
                or([
                    {"interest.section" : {$regex : '.*'+user.interests[random_num].section+'.*'}},
                    {"interest.group" : {$regex : '.*'+user.interests[random_num].group+'.*'}}
                ]).
                select('interest name').
                sort('interest.group interest.section').
                limit(10).
                exec((err, chatroom)=>{ // TODO : 소분류순으로 먼저 나오게 하기
                    var random = Math.floor(Math.random() * chatroom.length);
                    var a = chatroom[random];
                    res.json(a);
                })
            }
        }
    })
}


/*
    GET /chatroom/log/:cr_id
*/
exports.getLog = (req, res) => {
    var cr_id = req.params.cr_id;
    
    ChatRoom.findOne({_id : cr_id}, { chatlog : 1 },function(err, chatroom){ // TODO : 추후에 채팅 기록 소량만 가져올 수 있게끔 수정해야 함.
        res.json(chatroom.chatlog);
    })
}

/*
    chatroom participants 불러오는 api
    GET /chatroom/participants/:cr_id

    return nickname, profile, email
*/

exports.getParticipants = (req, res) => {
    var cr_id = req.params.cr_id;

    ChatRoom.findOne({_id:cr_id}, function(err, chatroom){
        res.send(chatroom.participants);
    })
}

/*
    POST /chatroom/exit/:cr_id
*/
exports.exit = (req, res) => {
    var cr_id = req.params.cr_id;
    var email = req.decoded.email;

    ChatRoom.findOne({_id : cr_id}, function(err, chatroom){
        if(err) res.json({result : 0, message : err});

        var participants = chatroom.participants;
        for(var i=0; i < participants.length; i++){
            if(participants[i].email == email){
                chatroom.participants.splice(chatroom.participants.indexOf(i), 1);
                chatroom.save();

                User.findOne({email:email}, function(err, user){
                    if(err) res.json({result:0, message:err});

                    for(var j=0; j<user.chatroom.length; j++){
                        if(user.chatroom[j].cr_id == cr_id){
                            user.chatroom.splice(user.chatroom.indexOf(i), 1);
                            user.save();

                            res.json({result : 1, message : "user left the room"});
                        }
                    }
                })
                
            }
        }
    })
}

// /*
//     GET /chatroom/log/:cr_id
// */
// exports.getLog = (req, res) => {
//     var cr_id = req.params.cr_id;
    
//     ChatRoom.findOne({_id : cr_id}, function(err, chatroom){ // TODO : 추후에 채팅 기록 소량만 가져올 수 있게끔 수정해야 함.
//         res.json(chatroom.chatlog);
//     })
// }

