var router = require('express').Router();
var controller = require('./user.controller');
var authMiddleware = require('../../middlewares/auth');
var profile = require('./profile/index');

router.use('/check', authMiddleware);
router.use('/info', authMiddleware);
router.use('/question', authMiddleware);

router.use('/profile', profile);
router.get('/info', controller.info);
router.get('/check', controller.check);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/send-email/:email', controller.sendEmail);
router.get('/question/list', controller.getQuestion); // 관리자페이지에서 문의사항 리스트 받을때
router.delete('/question/:id',controller.finish); // 관리자페이지에서 문의사항 해결하고 종료할떄
router.post('/question',controller.appendQuestion); // 유미에서 Question을 append 할때
module.exports = router;
