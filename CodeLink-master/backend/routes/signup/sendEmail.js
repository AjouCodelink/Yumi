var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var User = require('../../models/user');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'sending'});
});

router.post("/", function (req, res, next) {
    let email = req.body.email;

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

        var result = {};

        transporter.sendMail(mailOptions, function (error, info) {
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
})

module.exports = router;
