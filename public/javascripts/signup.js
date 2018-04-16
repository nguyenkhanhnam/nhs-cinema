/*var password, confirm_password;

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

    $('#signin').show();
});*/


var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = 'Sign Up';
    $('#signin').show();

    $scope.signUp = function (isValid) {
        if (isValid) {
            //alert("submittedd");
            var signUpData = {
                username: $("#username").val(),
                email: $("#email").val(),
                password: $("#password").val()
            };
            //console.log(signInData);
            svUsers.signUp(signUpData).then(function (res) {
                var x = document.getElementById("snackbar");
                $('#snackbar').html(res.data.msg);
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); window.location.href = '/'; }, 1000);
            }, function (error) {
                //alert(error);
                console.log(error);
                if (error) {
                    $('#signup-modal').modal('show');
                }
            });
        } else {
            $('#password-modal').modal('show');
            $('#password-modal') > $('h4').html("Sign Up");
        }
    };
}]);