var express = require('express');
var router = express.Router();
var login = require('./login/index');
var signup = require('./signup/index');
var chatroom = require('./chatroom/index');
const passport = require('passport');


router.use('/login', login);
router.use('/signup', signup);
router.use('/chatroom', chatroom);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'login'});
});

module.exports = router;
