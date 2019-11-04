var express = require('express');
var router = express.Router();
var searchWord = require('./searchWord');

router.use('/search', searchWord);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'chatroom' });
// });

module.exports = router;