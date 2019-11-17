var router = require('express').Router();
var controller = require('./chatroom.controller');
var authMiddleware = require('../../middlewares/auth');

router.use('/creation/:interest', authMiddleware);
router.use('/list', authMiddleware);

router.get('/search/:keyword', controller.searchWord);
router.post('/creation/:interest', controller.creation);
router.get('/list', controller.getList);
router.get('/log/:cr_id', controller.getLog);
router.get('/participants/:cr_id', controller.getParticipants);
router.get('/recommendChatroom', controller.recommendChatroom);

module.exports = router;