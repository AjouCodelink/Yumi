var router = require('express').Router();
var controller = require('./supporter.controller');
var authMiddleware = require('../../middlewares/auth');

router.get('/',controller.getMain);
router.post('/login/check', controller.login);
router.post('/assign', controller.assign);// 서포터 등록 
router.post('/accept',controller.accept); // 서포터 등록을 승인 
router.post('/decline',controller.decline); // 서포터 등록을 거부 
router.get('/list', controller.getSupporter);

module.exports = router;
