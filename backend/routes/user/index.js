var router = require('express').Router();
var controller = require('./user.controller');
var authMiddleware = require('../../middlewares/auth');
var profile = require('./profile/index');

router.use('/check', authMiddleware);
router.use('/info', authMiddleware);
router.use('/profile', profile);

router.get('/info', controller.info);
router.get('/check', controller.check);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/send-email/:email', controller.sendEmail);

module.exports = router;
