const express = require('express');

const userAuthentication = require('../middleware/auth')
const purchaseController = require('../controllers/buyPremiumController')
const updateTransController = require('../controllers/updateTransactionController')

const router = express.Router();

router.get('/premiumMembership', userAuthentication.authenticate, purchaseController.buyPremium);
router.post('/updateTransactionStatus', userAuthentication.authenticate, updateTransController.updateTransaction);

module.exports = router;