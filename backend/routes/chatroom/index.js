var router = require('express').Router();
var controller = require('./chatroom.controller');
var authMiddleware = require('../../middlewares/auth');

router.use('/creation', authMiddleware);
router.use('/list', authMiddleware);

router.get('/search/:keyword', controller.searchWord);
router.post('/creation', controller.creation);
router.get('/list', controller.getList);

module.exports = router;