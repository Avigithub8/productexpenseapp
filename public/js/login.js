document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            
            const response = await axios.post(`http://localhost:3000/user/login`, {
                email: email,
                password: password
            });

            console.log('Login success:', response.data);

           
            if (response.data.token) {
               
                localStorage.setItem('token', response.data.token);
            }

            if (response.status === 200) {
                console.log('Login success:', response.data);

               
                window.location.href = '/expenses/addExpense'; 
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
           
            console.error('Login error:', error.response.data);

            alert('Login failed. Please check your credentials and try again.');
        }
    });
});
