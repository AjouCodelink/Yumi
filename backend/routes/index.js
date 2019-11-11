var router = require('express').Router();
var user = require('./user/index');
var chatroom = require('./chatroom/index');
var place = require('./place/index');

router.use('/user', user);
router.use('/chatroom', chatroom);
router.use('/place', place);

module.exports = router;
