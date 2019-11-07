var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ChatRoom = require('../../models/chatRoom');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'word' });
// });

router.get('/', function(req, res, next){
    var keyword = req.query.keyword;
    
    ChatRoom.findRoomByKeyword(keyword).then(function(data){
        console.log(data[0]._id);
        res.json(data);
    })
})

module.exports = router;