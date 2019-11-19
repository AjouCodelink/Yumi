var router = require('express').Router();
var controller = require('./profile.controller');
var authMiddleware = require('../../../middlewares/auth');

router.use('/', authMiddleware);

router.post('/interests', controller.editInterests);
router.post('/language/:language', controller.editLanguage);
router.post('/address/:address', controller.editAddress);
router.post('/nickname/:newNickname', controller.editNickname);
router.get('/', controller.nickname);

module.exports = router;
