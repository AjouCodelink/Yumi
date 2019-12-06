var router = require('express').Router();
var controller = require('./supporter.controller');
var authMiddleware = require('../../middlewares/auth');

router.post('/login/check', controller.login);
router.get('/login/isloggedin', controller.isloggedin);
router.get('/',controller.getMain);
router.post('/assign', controller.assign);// 서포터 등록 
router.post('/accept',controller.accept); // 서포터 등록을 승인 
router.post('/decline',controller.decline); // 서포터 등록을 거부 
router.get('/question',controller.getQuestion); // 관리자페이지에서 문의사항 리스트 받을때
router.post('/questionFinished',controller.finish); // 관리자페이지에서 문의사항 해결하고 종료할떄
router.post('/appendQuestion',controller.appendQuestion); // 유미에서 Question을 append 할때

module.exports = router;
