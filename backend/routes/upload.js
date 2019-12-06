const express = require('express');
const router = express.Router();
const multer = require('multer');
const gm = require('gm');
const User = require('../models/user');
const ChatRoom = require('../models/chatRoom');
const authMiddleware = require('../middlewares/auth');

router.use('/profile', authMiddleware);

var _storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'uploads/')
    },
    filename: function(req,file,cb) {
        cb(null,Date.now()+'_'+file.originalname)
    }
})
var upload = multer({storage : _storage});

router.get('/upload', function(req, res){
    res.render('upload');
})

/*
*   POST /images/profile
*   {
*       file
*   }
*/
router.post('/profile', upload.single('file'), function (req, res) {
    var email = req.decoded.email;

    User.findOne({email: email}, function(err, user){ // User를 찾아서 새로 받은 사진 정보를 DB에 저장
        if(err) res.json({result:0, message : "not found user"})
        user.img_path = req.file.filename;
        
        user.save(function(err, result){
            if(err) res.json({result:0, message: "not save image"});

            var chatrooms = user.chatroom;
            saveImage(user);
            res.json(req.file);
        })
    })
})

function saveImage(user){
    var chatrooms = user.chatroom;

    chatrooms.map((chatroom) => {
        ChatRoom.findOne({_id: chatroom.cr_id}, {participants: 1}, (err, room) => {
            room.participants.map((participant) => {
                if(participant.email == user.email){
                    participant.img_path = user.img_path;
                    room.save();
                    return;
                }
            })
        })
    })
}

/*
*   POST /images/upload
    {
        file
    }
*/
router.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.json(req.file);
})

/*
*   POST /images/supporter/upload
    {
        file
    }
 */
router.post('/supporter/upload', upload.single('file'), function (req, res) {
    // var email = req.body.email;
    res.json(req.file);
})
module.exports = router;
