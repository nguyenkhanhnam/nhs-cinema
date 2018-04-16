var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Movie List";
    $('#signup').show();

    $scope.signIn = function () {
        var signInData = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        //console.log(signInData);
        svUsers.signIn(signInData).then(function (res) {
            //console.log(res);
            var x = document.getElementById("snackbar");
            $('#snackbar').html("Sign in successfully");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); window.location.href = '/'; }, 1000);
        }, function (error) {
            //alert(error);
            //console.log(error);
            if (error.status == 401) {
                $('#signin-modal').modal('show');
            }
        });
    };
}]);