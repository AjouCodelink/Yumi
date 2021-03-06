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
        select('interest name participants').
        sort('name').
        exec((err, chatroom)=>{
            if(err) res.json(err);
            else if(chatroom.length) {
                var filteredChatroom = chatroom.filter((room)=>(room.interest.section != 'Exchanging Language'))
                res.json(filteredChatroom);
            }
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

    User.findOne({email:userEmail}, {email:1, nickname:1, interests:1, chatroom:1, img_path:1}, function(err, user){
        if(err) res.send(err);
        if(!user) res.json({result:0, message: "email not found!"});
        else{
            user.chatroom.push({cr_id : chatRoom._id, interest: chatRoom.interest, name: chatRoom.name});
            user.save(); // user가 속해 있는 chatroom_id 저장.

            var participant = {email : user.email, nickname : user.nickname, interests : user.interests, img_path: user.img_path};
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
        User.findOne({email:email},{email:1, nickname: 1, interests: 1, chatroom:1, img_path:1}, function(err, user){
            if(err) res.json(err);
            
            for(var i=0; i<chatroom.participants.length; i++){
                if(chatroom.participants[i].email == user.email) return res.json({result:false, message : "user already entrance"});
            }

            chatroom.participants.push({
                email : user.email,
                nickname : user.nickname,
                interests : user.interests,
                img_path : user.img_path
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
                ChatRoom.find().exec((err,chatroom) => {
                    var count = chatroom.length
                    var random = Math.floor(Math.random() * count);
                    ChatRoom.find().skip(random).limit(5).exec((err, chatroom) => {
                        //array말고 단일 object로 보내기
                        var filteredChatroom = chatroom.filter((room)=>(room.interest.section != 'Exchanging Language'));
                        var selected = filteredChatroom[0];
                        res.json(selected);
                    })      
                })
                
            }
            else{
                ChatRoom.find().
                or([
                    {"interest.section" : {$regex : '.*'+user.interests[random_num].section+'.*'}},
                    {"interest.group" : {$regex : '.*'+user.interests[random_num].group+'.*'}}
                ]).
                select('interest name participants').
                sort('interest.group interest.section').
                limit(10).
                exec((err, chatroom)=>{ // TODO : 소분류순으로 먼저 나오게 하기
                    if(chatroom.length == 0)
                    {
                        var count = chatroom.length;
                        var random = Math.floor(Math.random() * count);
                        ChatRoom.find().skip(random).limit(5).exec((err, chatroom) => {
                            //array말고 단일 object로 보내기
                            var filteredChatroom = chatroom.filter((room)=>(room.interest.section != 'Exchanging Language'));
                            var selected = filteredChatroom[0];
                            res.json(selected);
                        })     
                    }
                    else{
                        var filteredChatroom = chatroom.filter((room)=>(room.interest.section != 'Exchanging Language'));
                        var random = Math.floor(Math.random() * filteredChatroom.length);
                        var selected = filteredChatroom[random];
                        res.json(selected);
                    }
                })
            }
        }
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
    
    ChatRoom.findOne({_id: cr_id}, function(err, chatroom){
        if(err) res.json({result: false, message: err});

        var participants = chatroom.participants;
        chatroom.participants = participants.filter((room) => (room.email != email));
        
        if(chatroom.participants.length == 0) chatroom.remove({_id: cr_id});
        else chatroom.save();

        User.findOne({email}, {chatroom: 1}, function(err, user){
            var chatrooms = user.chatroom;
            user.chatroom = chatrooms.filter((room) => (room.cr_id != cr_id));
            user.save();
            res.json({result: true, message: "user left the room"});
        })
    })
}

/*
    POST /chatroom/log
    {
        cr_id,
        last_message
    }
*/
exports.getLog = (req, res) => {
    var cr_id = req.body.cr_id;
    var last_message = req.body.last_message;

    ChatRoom.findOne({_id : cr_id})
        .select('chatlog')
        .exec((err, chatroom) => {
            if(err) res.json({result : false});
            for(var i=0; i< chatroom.chatlog.length; i++){
                if(chatroom.chatlog[i].time == last_message){
                    chatroom.chatlog.splice(0, i+1);
                    res.json(chatroom);
                }
            }
        });
}

/**
    POST /chatroom/exchange-language/creation
    {
        language,
        name
    }
*/
exports.exchangeLanCreation = (req, res) => {
    var dest = req.body.language;
    var email = req.decoded.email;
    var room_name = req.body.name;

    User.findOne({email}, (err, user)=>{
        var origin = user.language;
        var chatroom = new ChatRoom();

        var group = origin + " <> " + dest;
        chatroom.interest = {section: "Exchanging Language", group};
        chatroom.name = room_name;
        chatroom.language = {origin, dest};
        chatroom.participants.push({
            email,
            nickname: user.nickname,
            interests: user.interests,
            img_path: user.img_path
        })
        chatroom.save((err)=>{
            if(err) res.json({result: false, "message": "don't save chatroom"});
        });

        user.chatroom.push({
            cr_id: chatroom._id,
            interest: chatroom.interest,
            name: chatroom.name
        })
        
        user.save((err) => {
            if(err) res.json({result: false, "message": "don't save user"});
            res.json({result:true, cr_name : chatroom.name, cr_id : chatroom._id, interest : chatroom.interest});
        })
    })
}

/**
    GET /chatroom/exchange-language/:language
 */
 exports.exchangeLanSearch = (req, res) => {
    var email = req.decoded.email;
    var dest = req.params.language;

    User.findOne({email}, (err, user)=>{
        var origin = user.language;
        console.log(origin, dest);
        ChatRoom.find()
            .and([
                {"interest.section": "Exchanging Language"},
                {"language.origin": dest},
                {"language.dest": origin}
            ]).
            exec((err, chatroom) => {
                if(err) res.json({result: false, message:"fail"});
                else if(chatroom.length){
                    var filteredChatroom = chatroom.filter((room) => (room.participants.length==1));
                    if(filteredChatroom.length){
                        res.json(filteredChatroom);
                    }
                    else res.json({message: "no search chatroom"});
                }
                else res.json({message:"no search chatroom"});
            })

     })
 }
