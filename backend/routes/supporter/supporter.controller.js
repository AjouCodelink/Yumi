var router = require('express').Router();
const jwt = require('jsonwebtoken')




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
        User.findOne({email:email},{email:1, nickname:1, address:1, language:1, img_path:1, chatroom:1}, function(err, user){
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


