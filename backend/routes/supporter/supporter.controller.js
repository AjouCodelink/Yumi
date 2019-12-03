var router = require('express').Router();
const jwt = require('jsonwebtoken');
var User = require('../../models/user');
var Supporter = require('../../models/supporters');


/*
    /api/supporter
*/
exports.getMain = (req, res) => {
    console.log("=========connection complete========");
    res.json(1);
}


/*
    POST /api/login/checkLogin
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
            if(user.verify(password)) {
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

    // find the user
    User.findOneByEmail(email)
    .then(check)
    .then(respond)
    .catch(onError)

}


/*
    GET /api/supporter/info
*/
exports.info = function(req, res){
    var email = req.decoded.email;

    User.findOne({email:email},{email:1, nickname:1, interests:1, language:1, address:1}, function(err, user){
        res.json(user);
    })
}


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
exports.signup = (req, res) => {
    const supporter_info = req.body;
    const email = req.body.email;
    let newSupporter = null

    // create a new user if does not exist
    const create = (supporter) => {
        if(supporter) {
            throw new Error('supporter name exists')
        } else {
            return Supporter.create(supporter_info);
        }
    }

    // count the number of the user
    const count = (supporter) => {
        newSupporter = supporter
        return Supporter.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return newSupporter.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            result:1,
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByEmail(email)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}