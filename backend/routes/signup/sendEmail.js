var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'sending' });
});

router.post("/", function(req, res, next){
  let email = req.body.email;
  console.log(email);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codelink19@gmail.com',  // gmail 계정 아이디를 입력
      pass: 'zhemfldzm'          // gmail 계정의 비밀번호를 입력
    }
  });
  
  var random_number = Math.floor(Math.random()*899999)+100000;

  let mailOptions = {
    from: 'codelink19@gmail.com',
    to: email,
    subject: '안녕하세요, CodeLink입니다. 이메일 인증을 해주세요.',
    html: '<p>아래의 링크를 클릭해주세요 !</p><br><p>'+random_number+'</p>'
  };

  var result = {};

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      result.result=0;
      res.json(result);
    }
    else {
      console.log('Email sent: ' + info.response);
      result.result=1;
      result.number = random_number;
      res.json(result);
    }
  });

})

module.exports = router;
