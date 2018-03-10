var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
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


        $('#create').show();
        $('#signout').show();

    });

    $scope.changePassword = function () {
        console.log($scope.user.email);
        console.log($("#current_password").val());
        var signInData = {
            email: $scope.user.email,
            password: $("#current_password").val()
        };
        //console.log(signInData);
        svUsers.signIn(signInData).then(function (res) {
            var newPassword = {
                password: $("#password").val()
            }
            svUsers.changePassword(newPassword).then(function (res) {
                window.location.href = '/user/profile';
            }, function (error) {
                //console.log(error);
            });
        }, function (error) {
            //alert(error);
            //console.log(error);
            if (error.status == 401) {
                $('#change-password-modal').modal('show');
            }
        });
    };


}]);

