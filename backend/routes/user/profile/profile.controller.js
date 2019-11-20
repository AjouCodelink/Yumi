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
exports.editNickname = function(req, res){
    var email = req.decoded.email;
    var newNickname = req.params.newNickname;

    User.findOne({email:email}, function(err, user){
        if(err) res.json({result : 0, message : "save failed"})
        user.nickname = newNickname;
        user.save();
        res.json({result : 1, nickname : user.nickname});
    })
}

/*
    POST /user/profile/interests
    {
        interests
    }
*/
exports.editInterests = function(req, res){
    var email = req.decoded.email;

    User.findOne({email:email},{interests:1}, function(err, user){
        if(err) res.status(500).send(err);
        if(user){
            user.interests = req.body.interests;
           
            user.save();
            res.json({result : true, message : "interests save success"});
        }
    })
}

/*
    POST /user/profile/language/:language
*/
exports.editLanguage = function(req, res){
    var email = req.decoded.email;
    var language = req.params.language;

    User.findOne({email:email},{language:1}, function(err, user){
        if(err) res.status(500).send(err);
        if(user){
            user.language = language;
           
            user.save();
            res.json({result : true, message : "language save success"});
        }
    })
}

/*
    POST /user/profile/address/:address
*/
exports.editAddress = function(req, res){
    var email = req.decoded.email;
    var address = req.params.address;

    User.findOne({email:email},{address:1}, function(err, user){
        if(err) res.status(500).send(err);
        if(user){
            user.address = address;
           
            user.save();
            res.json({result : true, message : "address save success"});
        }
    })
}