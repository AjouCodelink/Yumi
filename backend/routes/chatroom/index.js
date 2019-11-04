var express = require('express');
var router = express.Router();
var searchWord = require('./searchWord');
var creation = require('./creation');

router.use('/search', searchWord);
router.use('/creation', creation);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'chatroom' });
// });

module.exports = router;