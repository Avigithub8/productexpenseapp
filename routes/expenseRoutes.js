const express = require('express');
const path=require('path');
const userAuthentication = require('../middleware/auth.js')

const expenseController = require('../controllers/expenseController')
const paginationController = require('../controllers/paginationController')

const router = express.Router();

router.post('/addExpense', userAuthentication.authenticate, expenseController.postExpense);

router.get('/addExpense.html', userAuthentication.authenticate,(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/addExpense.html'))
    
} );
router.get('/showExpenses', userAuthentication.authenticate, expenseController.getExpense);
router.get('/download', userAuthentication.authenticate, expenseController.downloadExpense);
router.get('/pagination', userAuthentication.authenticate, paginationController.pagination);
router.delete('/addExpense/:id', userAuthentication.authenticate, expenseController.deleteExpense);

module.exports = router;