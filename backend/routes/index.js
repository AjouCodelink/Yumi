var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mongoose를 사용하여 mongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/test');
var db = mongoose.connection;

// 연결 실패 
db.on('error', function() {
    console.log('Connection Failed!');
});
// 연결 성공
db.once('open', function() {
    console.log('Connected!');
});

var user = mongoose.Schema({
    name: 'string',
    old: 'number'
});
var User = mongoose.model('users', user);

// (Test) RESTFul api GET 메소드
router.get('/test', function(req, res) {
    User.find(function(error, users) {
        if (error) {
            throw error;
        }
        res.json(users)
    });
});

// (Test) RESTFul api POST 메소드
router.post('/test', function(req, res){
    console.log(req.body);
});

router.post("/mail", function(req, res, next){

  let email = req.body.email;
  console.log(email);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codelink19@gmail.com',  // gmail 계정 아이디를 입력
      pass: 'zhemfldzm'          // gmail 계정의 비밀번호를 입력
    }
  });

  let mailOptions = {
    from: 'codelink19@gmail.com',
    to: email,
    subject: '안녕하세요, CodeLink입니다. 이메일 인증을 해주세요.',
    html: '<p>아래의 링크를 클릭해주세요 !</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect("/");
})
//var Client = require('mongodb').MongoClient;
//var db;

//var databaseURL = "mongodb://localhost:27017/project-test";

// Client.connect(databaseURL, function(error, database) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('데이터베이스에 연결됨 : ' + databaseURL);
//         db = database.db('project-test');
//         // 1. find( ) 함수에 아무런 입력값이 없으면 컬렉션의 전체 document 를 읽어온다.
//         var cursor = db.collection('users').find({ old: 26 }, { _id: 0, name: 1, old: 1 });
//         // 2. 읽어온 document 를 cursor 에 넣고 반복처리
//         cursor.each(function(err, doc) { // document 가 예약어이기 때문에 변수명을 doc로 변경
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (doc != null) {
//                     // 3. document 가 정상적으로 있으면 console 에 출력해준다.
//                     console.log(doc);
//                 }
//             }
//         });
//         database.close();
//     }
// });
module.exports = router;
