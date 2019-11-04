var express = require('express');
var router = express.Router();
var saveUserInfo = require('./saveUserInfo');
var sendEmail = require('./sendEmail');


router.use('/save-user', saveUserInfo);
router.use('/send-email', sendEmail);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'signup' });
});

module.exports = router;