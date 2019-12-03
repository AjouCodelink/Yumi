const express = require('express');
const router = express.Router();
const multer = require('multer');

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

router.get('/:filename', function(req, res){
    var filename = req.params.filename;
    var img_path = '<img src="/'+filename+'"/>';
    res.send(img_path);
});

router.post('/upload',upload.single('file'),function(req,res){
    res.json(req.file);
    console.log(req.file);    
})

module.exports = router;
