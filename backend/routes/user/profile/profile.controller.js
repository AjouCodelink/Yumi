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