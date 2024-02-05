const path=require('path');
const Expenses = require('../models/expense');
const sequelize = require('../util/database');
const Users = require('../models/users');
const fs = require("fs");

exports.postExpense = async (req, res, next) => {
    console.log('Request Headers:', req.headers);
    const t = await sequelize.transaction();
    try {
        const data = req.body;
        console.log("data",data)
        const expense = await req.user.createExpense(data, { transaction: t });

        req.user.totalExpense += data.expenseamount;
        await req.user.save({ transaction: t });

        await t.commit();
        res.json(expense);
    }
    catch (err) {
        await t.rollback();
        console.log(err);
    }
};

exports.getExpense = (req, res, next) => {
    req.user.getExpenses()
        .then(expenses => {
            console.log("----------",req.user.totalExpense);
            
             return res.json(expenses);
           
        })
        .catch(err => console.log(err));
};


exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const expenseId = req.params.id;
        const expense = await Expenses.findByPk(expenseId, { transaction: t });

        await expense.destroy({ transaction: t });

        req.user.totalExpense -= expense.expenseamount;
        await req.user.save({ transaction: t });

        await t.commit();
        res.json('SUCCESS');
    }
    catch (err) {
        await t.rollback();
        console.log(err);
    }
};


exports.downloadExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const UserExpenses = await req.user.getExpenses({ transaction: t });
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        const filePath = path.join(tempDir, 'myexpense.txt');
         console.log("filepath",filePath)
        
        const fileContent = UserExpenses.map(expense => `${expense.id}. ${expense.description}: $${expense.expenseamount}`).join('\n');
        console.log("file",fileContent)
        fs.writeFileSync(filePath, fileContent);
       // fs.linkSync(filePath);

       
        res.download(filePath, 'myexpense.txt', (err) => {
           
           // fs.unlinkSync(filePath);
            if (err) {
                console.error(err);
            }
        });

       
        await t.commit();
       //res.status(200).json({ fileURL, success: true });
    }
    catch (err) {
       // res.status(200).json({ fileURL: '', success: false });
        await t.rollback();
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

