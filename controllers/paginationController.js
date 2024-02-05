const Expenses = require("../models/expense");


exports.pagination = async (req, res) => {
    try {
        // const targetPage = req.query.page;
        // const expensePerPage = Number(req.query.rows);

        // const totalExpenses = await req.user.totalExpense;
        //    console.log("list",req.user.getExpenses())
        // const userExpenses = await req.user.getExpenses({
        //     offset: (targetPage - 1) * expensePerPage,
        //     limit: expensePerPage
        // });

        // res.status(200).json({ userExpenses, totalExpenses });

        const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const userExpenses = await req.user.getExpenses(page);
   // console.log("list",userExpenses)
    const paginatedExpenses = userExpenses.slice(startIndex, endIndex);
    //console.log("listttt",paginatedExpenses)
    const totalPages = Math.ceil(userExpenses.length / pageSize);

    res.json({
        expenses: paginatedExpenses,
        totalPages,
    });

       
    }
    catch (err) {
        console.log(err);
    }
}