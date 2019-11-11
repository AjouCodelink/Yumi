var router = require('express').Router();
var controller = require('./chatroom.controller');

router.get('/search/:keyword', controller.searchWord);
router.post('/creation', controller.creation);

module.exports = router;