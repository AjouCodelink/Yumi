var router = require('express').Router();
var controller = require('./place.controller');
var authMiddleware = require('../../middlewares/auth');

router.use('/', authMiddleware);
router.get('/recommend/:roomId', controller.recommend);

module.exports = router;