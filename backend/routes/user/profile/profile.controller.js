const User = require('../../../models/user');

/*
    GET /user/profile
*/
exports.nickname = function(req, res){
    var email = req.decoded.email;

    User.findOne({email:email}, function(err, user){
        if(err) res.json({result : 0, message: "save failed"});

        res.json({result : 1, nickname : user.nickname, img_path : user.img_path});
    })
}

/*
    POST /user/profile/nickname/:newNickname
*/
exports.changeNickname = function(req, res){
    var email = req.decoded.email;
    var newNickname = req.params.newNickname;

    User.findOne({email:email}, function(err, user){
        if(err) res.json({result : 0, message : "save failed"})
        user.nickname = newNickname;
        user.save();
        res.json({result : 1, nickname : user.nickname});
    })
}