var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', function ($scope, svMovies) {
    $scope.appName = "User Profile";

    svMovies.getUser().then(function (res) {
        $scope.user = res.data;
        document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
    }, function (error) {
        //alert(error);
    });

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };

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
        $('#create').show();
        $('#signin').hide();
        $('#signup').hide();
        $('#change').hide();
        $('#signout').show();
    });
}]);

