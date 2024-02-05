const downloadExpenses = document.querySelector('.downloadExpenses');

downloadExpenses.addEventListener('click', downloadFunction);
async function downloadFunction(e) {
    try {
        const UserExpenses = await axios.get('http://localhost:3000/expenses/download', { headers: { Authorization: token } });
        console.log(UserExpenses);
       
          if (UserExpenses.status === 200) {
            const a = document.createElement('a');
            a.href = UserExpenses.config.url;
            console.log("href",a.href)
            a.download = 'myexpense.txt';   
            a.click();
        }
        
            //    const blob = new Blob([UserExpenses.data], { type: 'text/plain' });

            //     const link = document.createElement('a');
            //     link.href = window.URL.createObjectURL(blob);
            //     link.download = 'myexpense.txt';
            //     console.log("vvvvvvvv",link); 
            //     link.click();
    }
    catch (err) {
        console.log(err);
    }
}