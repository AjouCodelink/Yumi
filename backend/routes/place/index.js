var router = require('express').Router();
var controller = require('./place.controller');

router.get('/recommend/:roomId', controller.recommend);

module.exports = router;