const User = require('../../../models/user');

/*
    GET /user/profile/nickname
*/
exports.nickname = function(req, res){
    var email = req.decoded.email;

    User.findOne({email:email}, function(err, user){
        res.json(user.nickname);
    })
}

/*
    POST /user/profile/nickname/:newNickname
*/

exports.changeNickname = function(req, res){
    var email = req.decoded.email;
    var newNickname = req.params.newNickname;

    User.findOne({email:email}, function(err, user){
        user.nickname = newNickname;
        user.save();
        res.json(user);
    })
}