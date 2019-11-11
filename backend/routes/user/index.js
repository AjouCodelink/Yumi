var express = require('express');
var router = express.Router();
const controller = require('./user.controller');
const authMiddleware = require('../../middlewares/auth');

router.use('/check', authMiddleware);
router.get('/check', controller.check);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/send-email/:email', controller.sendEmail);

module.exports = router;
