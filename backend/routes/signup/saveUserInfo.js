var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/user');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'save' });
});

router.post('/', function(req, res){
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.nickname = req.body.nickname;
    user.interests = req.body.interests;
    console.log(user);

    user.save(function(err){
      if(err){
        console.error(err);
        return res.json({result:0});
      }
      else res.json({result:1});
    })
});

module.exports = router;