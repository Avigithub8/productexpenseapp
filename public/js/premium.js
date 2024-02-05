const buyPremium = document.querySelector('.buyPremium');
 console.log("-------------",token);




buyPremium.addEventListener('click', buyPremiumActions);
async function buyPremiumActions(e) {
    try {
        const response = await axios.get(`http://localhost:3000/purchase/premiumMembership`, { headers: { Authorization: token, price: 250000 } });
        console.log(response);
        const options = {
            key: response.data.key_id,  
            order_id: response.data.order.id,  
            // amount: 2500, 
            handler: async function (response) {    
                try {
                    // console.log(response.razorpay_payment_id);
                    const res = await axios.post(`http://localhost:3000/purchase/updateTransactionStatus`,
                        {
                            order_id: options.order_id,
                            payment_id: response.razorpay_payment_id
                        }, { headers: { Authorization: token } });

                    e.target.remove();
                    document.querySelector('.premium').innerHTML = '<p>You are Premium User</p>';

                    localStorage.setItem('token', res.data.token);
                    alert('You are a Premium User Now');
                } catch (err) {
                    console.log('Error is:', err);
                }
            }
        };

        const rzpl = new Razorpay(options);
        rzpl.open();
        e.preventDefault();

        // if payment gets canceled
        rzpl.on('payment-failed', function (response) {
            console.log('Errro is:', response);
            alert('Something went wrong');
        });
    }
    catch (err) {
        console.log('Error is -> ', err);
    }
}