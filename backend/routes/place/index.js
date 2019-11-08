var express = require('express');
var router = express.Router();
var recommend = require('./recommend');

router.use('/recommend', recommend);

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'place' });
// });


module.exports = router;