var router = require('express').Router();
const jwt = require('jsonwebtoken');
var User = require('../../models/user');
var Supporter = require('../../models/supporters');
var Question = require('../../models/question');

/*
    /api/supporter
*/

exports.getMain = (req, res) => {
    Supporter.find({}, function(err, supporters){
        if(err) res.json({result: false, message: "not found supporters"})
        res.json(supporters);
    })
}
exports.assign = (req, res) => {
    const supporter_info = req.body;
    
    Supporter.create(supporter_info)
    .then(result => {
        if(result) res.json({result:true});
        else res.json({result:false});
    });
}

exports.accept = (req,res) =>{
    var email = req.body.email;
    Supporter.findOne({email:email}, function(err, supporter){
        if(err) res.json({result:0})
        console.log(supporter);
        supporter.isAccepted = true;
        supporter.save();
        res.json({result :1});
    });
} // 유미에서는 accepted=true 인 리스트만 가져올 것이다. 

exports.decline = (req,res) => {
    var email_info = req.body.email;
        Supporter.remove({ email:email_info }, function(err, output){
        if(err) return res.status(500).json({ error: "Decline failed"});
        res.status(204).end();
    })
}
exports.getQuestion = (req,res) =>{
        Question.find({}, function(err, questions){
        if(err) res.json({result: false, message: "not found questions"})
        res.json(questions);
    });

}
exports.appendQuestion = (req,res) =>{

    const Question_info = req.body;
    Question.create(Question_info)
    .then(result => {
        if(result) res.json({result:true});
        else res.json({result:1});
    });
}
exports.finish = (req,res) =>{

    const Question_info = req.body.content;
    Question.remove({ content:Question_info }, function(err, output){
        if(err) return res.status(500).json({ error: "Deletion Failed"});
        res.status(204).end();
    });

}
    /*
    POST /api/login/checkLogin
    {
        email,
        password
    }
*/
/*
    POST /api/supporter/signup
    {
        supporter_name,
        email,
        contact,
        text,
        photo_path
    }
*/

// exports.login = (req, res) => {
//     const {email, password} = req.body
//     const secret = req.app.get('jwt-secret')

//     // check the user info & generate the jwt
//     const check = (user) => {
//         if(!user) {
//             // user does not exist
//             throw new Error('login failed')
//         } else {
//             // user exists, check the password
//             if(user.verify(password)) {
//                 // create a promise that generates jwt asynchronously
//                 const p = new Promise((resolve, reject) => {
//                     jwt.sign(
//                         {
//                             _id: user._id,
//                             email: user.email,
//                             admin: user.admin
//                         }, 
//                         secret, 
//                         {
//                             expiresIn: '7d',
//                             issuer: 'codelink.com',
//                             subject: 'userInfo'
//                         }, (err, token) => {
//                             if (err) reject(err)
//                             resolve(token) 
//                         })
//                 })
//                 return p
//             } else {
//                 throw new Error('login failed')
//             }
//         }
//     }
//     // respond the token 
//     const respond = (token) => {
//         User.findOne({email:email},{email:1, nickname:1}, function(err, user){
//             if(err) res.json(err);
            
//             res.json({
//                 result:1,
//                 message: 'logged in successfully',
//                 userInfo: user,
//                 token            
//             })
//         })
//     }

//     // error occured
//     const onError = (error) => {
//         res.status(403).json({
//             message: error.message,
//             result:0
//         })
//     }

//     // find the user
//     User.findOneByEmail(email)
//     .then(check)
//     .then(respond)
//     .catch(onError)
// }
// /*
//     GET /api/supporter/info
// */
// exports.info = function(req, res){
//     var email = req.decoded.email;
//     User.findOne({email:email},{email:1, nickname:1, interests:1, language:1, address:1}, function(err, user){
//         res.json(user);
//     })
// }

