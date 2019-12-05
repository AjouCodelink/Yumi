const express = require('express');
const router = express.Router();
const multer = require('multer');
const gm = require('gm');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

router.use('/', authMiddleware);

var _storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'uploads/')
    },
    filename: function(req,file,cb) {
        cb(null,Date.now()+'_'+file.originalname)
    }
})
var upload = multer({storage : _storage});

router.get('/upload', function(req, res){
    res.render('upload');
})


router.post('/profile', upload.single('file'), function (req, res) {
    var email = req.decoded.email;

    User.findOne({email: email}, function(err, user){ // User를 찾아서 새로 받은 사진 정보를 DB에 저장
        if(err) res.json({result:0, message : "not found user"})
        user.img_path = req.file.filename;

        user.save(function(err, result){
            if(err) res.json({result:0, message: "not save image"});

            res.json(req.file);
        })
    })
})

module.exports = router;
