var router = require('express').Router();
var controller = require('./profile.controller');
var authMiddleware = require('../../../middlewares/auth');

router.use('/', authMiddleware);

router.get('/', controller.nickname);
router.post('/nickname/:newNickname', controller.changeNickname);
module.exports = router;
