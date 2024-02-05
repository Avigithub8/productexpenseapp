document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.signupForm');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        axios.post(`http://localhost:3000/user/signup`, {
            name: name,
            email: email,
            password: password
        })
        .then(response => {
            console.log('Signup successful:', response.data);
           
            window.location.href = '/user/login.html';
        })
        .catch(error => {
            if (err.response.status === 302) {
                    // console.log(err.response.data.message);
                 if (!alert(err.response.data.message)) {
                        location.reload();
                    }
                }
                else {
                    console.log(error);
                    alert('Signup failed. Please check your input and try again.');
                }
        });
    });
});
