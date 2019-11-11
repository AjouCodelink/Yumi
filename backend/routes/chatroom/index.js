var router = require('express').Router();
var controller = require('./chatroom.controller');

router.post('/creation', controller.creation);
router.get('/search/:keyword', controller.searchWord);

module.exports = router;