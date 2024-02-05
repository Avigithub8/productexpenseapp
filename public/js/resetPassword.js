document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordForm = document.getElementById("resetPasswordForm");

  resetPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const pathSegments = window.location.pathname.split("/");
    const resetId = pathSegments[pathSegments.length - 1];
    console.log(resetId);

    axios.post(`http://localhost:3000/password/resetpassword/${resetId}`,  {
                     password: newPassword
         })
      .then((response) => {
        console.log("Password reset successful:", response.data);
        alert(
          "Password reset successful. You can now login with your new password."
        );
        window.location.href = '/user/login.html';
        
        
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "An error occurred while resetting the password. Please try again."
        );
      });
  });
});
