var User = require('../../models/user')
const jwt = require('jsonwebtoken')

/*
    GET /user/info
*/
exports.info = function(req, res){
    var email = req.decoded.email;

    User.findOne({email:email},{email:1, nickname:1, interests:1, language:1, address:1}, function(err, user){
        res.json(user);
    })
}

/*
    POST /user/send-email/:email
*/
exports.sendEmail = (req, res) => {
    var nodemailer = require('nodemailer');
    let email = req.params.email;

    User.findOne({email: email}, function (err, user) {
        console.log(user);
        if (err) 
            return res.json({error: err});
        if (user != null) // 이메일이 중복되면 result=0 반환
            return res.json({result: 0});
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'codelink19@gmail.com', // gmail 계정 아이디를 입력
                pass: 'zhemfldzm' // gmail 계정의 비밀번호를 입력
            }
        });

        var random_number = Math.floor(Math.random() * 899999) + 100000;

        let mailOptions = {
            from: 'codelink19@gmail.com',
            to: email,
            subject: '안녕하세요, CodeLink입니다. 이메일 인증을 해주세요.',
            html: '<p>아래의 번호를 입력해주세요 !</p><p>' + random_number + '</p>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            var result = {};
            if (error) { // 이메일을 보내지 못하면 result=-1 반환
                console.log(error);
                result.result = -1;
                res.json(result);
            } else { // 이메일을 정상적으로 보내면 result=1과 number 반환
                console.log('Email sent: ' + info.response);
                result.result = 1;
                result.number = random_number;
                res.json(result);
            }
        });

    })
}

/*
    POST /user/signup
    {
        username,
        password
    }
*/
exports.signup = (req, res) => {
    const user_info = req.body;
    const email = req.body.email;
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exists')
        } else {
            return User.create(user_info);
        }
    }

    // count the number of the user
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
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

/*
    POST /user/login
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
                userInfo:user,
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
    GET /user/check
*/
exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}