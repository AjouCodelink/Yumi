var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var authMiddleware = require('../../middlewares/auth');

router.use('/check', authMiddleware);
router.get('/check', controller.check);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/send-email/:email', controller.sendEmail);

module.exports = router;
