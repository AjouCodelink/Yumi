var router = require('express').Router();
var controller = require('./chatroom.controller');
var authMiddleware = require('../../middlewares/auth');

router.use('/', authMiddleware);

router.get('/search/:keyword', controller.searchWord);
router.post('/creation', controller.creation);

module.exports = router;