var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "User Profile";
    $('#create').show();
    $('#signout').show();
    svMovies.getUser().then(function (res) {
        $scope.user = res.data;
        document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
    }, function (error) {
        //alert(error);
    });

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };

    $scope.changePassword = function (isValid) {
        if (isValid) {
            //alert("submittedd");
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
        } else {
            $('#password-modal').modal('show');
            $('#password-modal')>$('h4').html("Change Password");
        }


        //console.log($scope.user.email);
        //console.log($("#current_password").val());

    };
}]);



