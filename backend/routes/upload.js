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

router.post('/upload',upload.single('userfile'),function(req,res){
    res.send('uploaded :'+req.file.originalname);
    console.log(req.file);    
})

module.exports = router;
