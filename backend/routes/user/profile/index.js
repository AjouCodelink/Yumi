var router = require('express').Router();
var controller = require('./profile.controller');
var authMiddleware = require('../../../middlewares/auth');

router.use('/nickname', authMiddleware);

router.get('/nickname', controller.nickname);

module.exports = router;
