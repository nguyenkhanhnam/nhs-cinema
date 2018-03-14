var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "User Profile";
    $('#create').show();
    $('#signout').show();
    svUsers.getUser().then(function (res) {
        console.log("meow");
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
                svUsers.changePassword(newPassword, $scope.user._id).then(function (res) {
                    console.log(res);
                    var x = document.getElementById("snackbar");
                    $('#snackbar').html(res.data.msg);
                    x.className = "show";
                    setTimeout(function () { 
                        x.className = x.className.replace("show", ""); 
                        window.location.href = '/user/profile'; 
                    }, 1000);
                }, function (error) {
                    //console.log(error);
                });
            }, function (error) {
                //alert(error);
                //console.log("sign in");
                //console.log(error);
                if (error.status == 401) {
                    $('#change-password-modal').modal('show');
                }
            });
        } else {
            $('#password-modal').modal('show');
            $('#password-modal') > $('h4').html("Change Password");
        }


        //console.log($scope.user.email);
        //console.log($("#current_password").val());

    };
}]);



