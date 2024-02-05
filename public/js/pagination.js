document.addEventListener('DOMContentLoaded', () => {
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const expenseListDiv = document.querySelector('.expenseList');

    let currentPage = 1;

    // Function to fetch expenses for a specific page
    const fetchExpenses = async (page) => {
        try {
            const response = await axios.get(`http://localhost:3000/expenses/pagination?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    // Function to update the UI with expenses
    const updateExpenseList = (response) => {
        const { expenses, totalPages } = response;
    
        if (!Array.isArray(expenses)) {
            console.error('Invalid expenses data:', expenses);
            return;
        }
    
        expenseListDiv.innerHTML = '';
    
        expenses.forEach(expense => {
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `<span>$${expense.expenseamount} - ${expense.category} - ${expense.description} </span><button class="deleteExpense" id="${expense.id}">Delete Expense</button>`;
            expenseListDiv.appendChild(expenseItem);
        });
    
        totalPagesSpan.textContent = totalPages;
    };

    // Function to handle pagination
    const handlePagination = async (page) => {
        const expenses = await fetchExpenses(page);
        updateExpenseList(expenses);
        currentPage = page;
        currentPageSpan.textContent = currentPage;
    };

    // Event listeners for pagination buttons
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        handlePagination(currentPage + 1);
    });

    // Initial load
    handlePagination(currentPage);
});