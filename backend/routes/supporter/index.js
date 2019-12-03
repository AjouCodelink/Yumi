const express = require("express");
var router = require('express').Router();

router.get('/', function(req, res) {
    console.log("=========connection complete========");
    res.json(1);
});

module.exports = router;