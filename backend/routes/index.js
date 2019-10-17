var express = require('express');
var router = express.Router();
var login = require('./login/index');
var email_auth = require('./signup/email');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/login', login);
router.use('/email', email_auth)

module.exports = router;

