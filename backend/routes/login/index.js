var express = require('express');
var router = express.Router();
var login = require('./login');

router.use('/auth', login);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'login' });
  });


module.exports = router;
