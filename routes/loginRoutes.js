const express = require('express');
const path = require('path');
const loginController = require('../controllers/loginController');

const router = express.Router();


router.get('/login.html', loginController.getLogin);
router.post('/login', loginController.login);

module.exports = router;