var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// mongoose를 사용하여 mongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/codelink');
var db = mongoose.connection;

// 연결 실패 
db.on('error', function() {
    console.log('Connection Failed!');
});
// 연결 성공
db.once('open', function() {
    console.log('Connected!');
});

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true },
    interests: [String],
});

var user = mongoose.model('users', userSchema);

router.get('/', function(req, res, next) {
 res.render('index', { title: 'save user' });
});

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
    res.send(req.body);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'save' });
});

module.exports = router;