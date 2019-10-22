var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/test', function (req, res, next) {
    res.json({email:"test@ajou.ac.kr"});
});

router.get('/fail', function (req, res, next) {
    res.json({result: 0});
});

router.get('/success', function (req, res, next) {
    res.json({result: 1});
});

passport.serializeUser(function (user, done) {
    console.log('passport session save : ', user.email)
    done(null, user.email);
})

passport.deserializeUser(function (email, done) {
    console.log('passport session get_id : ', email)
    done(null, email);
})

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    session : true,
    passReqToCallback: false, // 인증을 수행하는 인증 함수로 HTTP request를 그대로 전달할지 여부를 결정한다.
}, (email, password, done) => {
    User.findOne({email : email}, (findError, user) => {
        if(findError) return done(findError);
        if(!user) return done(null, false, {message: 'no exist email!'});
        return user.comparePassword(password, (passError, isMatch) => {
            if(isMatch) {
                return done(null, user);
            }
            return done(null, false, {message: 'wrong password'});
        })
    })
}));

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/login/auth/success',
    failureRedirect: '/login/auth/fail',
    failureFlash : true
}));

module.exports = router;

