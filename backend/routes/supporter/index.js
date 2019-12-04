var router = require('express').Router();
var controller = require('./supporter.controller');
var authMiddleware = require('../../middlewares/auth');



router.get('/supporter',controller.getMain);

router.post('/login/check', controller.login);
router.post('/supporter/assign', controller.assign);

module.exports = router;
