const express = require('express');
const path=require('path');
const router = express.Router();

const passwordController = require('../controllers/passwordController');

router.get('/forgotpassword.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/forgotpassword.html'))
})
router.post('/forgotpassword', passwordController.forgotpassoword);

router.get('/resetPassword/:uuid', passwordController.resetPassword);
router.post('/resetpassword/:uuid', passwordController.resetPassword);

module.exports = router;