var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport') // 로그인, 회원가입 시 필요한 모듈들
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')
var bodyParser = require('body-parser');

app.use(session({ // 로그인, 회원가입 시 필요한 미들웨어 설정
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()) // body-parser를 json 형태로 받기 위함.
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
