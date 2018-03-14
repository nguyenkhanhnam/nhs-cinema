var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = 'Reset Password';
    $('#signin').show();
    $('#signup').show();

    svUsers.getUser().then(function (res) {
        $scope.user = res.data;
    }, function (error) {
        console.log(error);
    });

    $scope.changePassword = function (isValid) {
        if (isValid) {
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
                    window.location.href = '/';
                }, 1000);
            }, function (error) {
                console.log(error);
            });
        } else {
            $('#password-modal').modal('show');
            $('#password-modal') > $('h4').html($scope.appName);
        }
    };
}]);
