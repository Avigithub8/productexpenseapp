const express = require('express');

const signupController = require('../controllers/signupController');

const router = express.Router();

router.get('/signup.html',signupController.getSignup)
router.post('/signup', signupController.signup);

module.exports = router;