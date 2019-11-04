var express = require('express');
var router = express.Router();
var searchWord = require('./searchWord');
var chat = require('./chat');

router.use('/search', searchWord);
router.use('/chat', chat);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'chatroom' });
// });

module.exports = router;