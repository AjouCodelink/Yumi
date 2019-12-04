var router = require('express').Router();
var controller = require('./supporter.controller');
var authMiddleware = require('../../middlewares/auth');



router.get('/supporter',controller.getMain);

router.post('/login/checkLogin', controller.login);
router.post('/supporter/signup', controller.signup);

module.exports = router;
