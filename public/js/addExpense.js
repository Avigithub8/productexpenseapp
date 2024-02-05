const addExpenseForm = document.getElementById('addExpenseForm');
const expenseamount = document.querySelector('#expenseamount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const addExpenseBtn = document.querySelector('#addExpenseBtn');

const expenseList = document.querySelector('.expenseList');
//const showExpensesBtn = document.getElementById('showExpensesBtn');


const token = localStorage.getItem('token');

const addToExpenseList = (expense) => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<span>$${expense.expenseamount} - ${expense.category} - ${expense.description} </span><button class="deleteExpense" id="${expense.id}">Delete Expense</button>`;
    expenseList.appendChild(newLi);
}


document.addEventListener('DOMContentLoaded', showExpenses);
//let isExpenseListVisible = false;
async function showExpenses(e) {
    // if (!isExpenseListVisible) {
    try {
        e.preventDefault()
       
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(jsonPayload);
        };

        const userDetails = parseJwt(localStorage.getItem('token'));

        if(userDetails.isPremium === true) {
            document.querySelector('.buyPremium').remove();
            document.querySelector('.premium').innerHTML = '<p>You are Premium User</p>';
        }
        

        const getExpenses = await axios.get(`http://localhost:3000/expenses/showExpenses`, { headers: { "Authorization": token } });
        const expenses=getExpenses.data;
        expenses.forEach(expense => {
            addToExpenseList(expense);
        });

        // expenseList.style.display = 'block';
        // isExpenseListVisible = true;
       
    }
    
    catch (err) {
        console.log(err);
    }

}


addExpenseForm.addEventListener('submit', postExpenses);
async function postExpenses(e) {
    try {
        e.preventDefault();
        const expense = {
            expenseamount: Number(expenseamount.value),
            description: description.value,
            category: category.value
        };
       
        const addexpense = await axios.post('http://localhost:3000/expenses/addExpense', expense, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
       
        addToExpenseList(addexpense.data);
        addExpenseForm.reset();
    }
    catch (err) {
        console.log(err);
    }
}


document.addEventListener('click', deleteExpense);
async function deleteExpense(e) {
    try {
        if (e.target.classList.contains('deleteExpense')) {
            const expenseId = e.target.id;
            // console.log(expenseId);
            const deletRequest = await axios.delete(`http://localhost:3000/expenses/addExpense/${expenseId}`, { headers: { "Authorization": token } });
             console.log(deletRequest.data);
            e.target.parentElement.remove();
        }
    }
    catch (err) {
        console.log(err);
    }
}