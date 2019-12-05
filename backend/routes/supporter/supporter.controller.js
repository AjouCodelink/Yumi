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


/*
    POST /api/login/check
    {
        email,
        password
    }
*/
exports.login = (req, res) => {
    const {email, password} = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password) && user.verify_admin(user.admin)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            email: user.email,
                            admin: user.admin
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'codelink.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }
    
    // respond the token 
    const respond = (token) => {
        User.findOne({email:email},{email:1, nickname:1}, function(err, user){
            if(err) res.json(err);
            
            res.json({
                result:1,
                message: 'logged in successfully',
                userInfo: user,
                token            
            })
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message,
            result:0
        })
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


exports.getQuestion = (req,res) =>{
        Question.find({}, function(err, questions){
        if(err) res.json({result: false, message: "not found questions"})
        res.json(questions);
    })

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

    const Question_info = req.body.email;
    Question.remove({ email:Question_info }, function(err, output){
        if(err) return res.status(500).json({ error: "Deletion Success"});
        res.status(204).end();
    })

}


