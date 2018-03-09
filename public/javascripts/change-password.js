var password, confirm_password;

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}
$(document).ready(function () {
    password = document.getElementById("password");
    confirm_password = document.getElementById("confirm_password");
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

    $('#searchBox').hide();
    $('#create').hide();
    $('#signin').hide();
    $('#signup').hide();
    $('#change').hide();
    $('#signout').hide();
});
