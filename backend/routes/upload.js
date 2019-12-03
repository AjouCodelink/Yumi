const express = require('express');
const router = express.Router();
const multer = require('multer');
const gm = require('gm');

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

router.post('/upload', upload.single('file'), function (req, res) {
    var thumb_path = 'uploads/thumb_' + req.file.filename;
    res.json(req.file);
})

module.exports = router;