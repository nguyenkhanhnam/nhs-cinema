var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Movie List";
    $('#signup').show();

    svMovies.get().then(function (res) {
        $scope.movies = res.data;
        $('#searchBox').show();
    }, function (error) {
        //alert(error);
    });

    $scope.signIn = function () {
        var signInData = {
            email: $("#email").val(),
            password: $("#password").val(),
        };
        //console.log(signInData);
        svUsers.signIn(signInData).then(function (res) {
            //console.log(res);
            window.location.href = '/';
        }, function (error) {
            //alert(error);
            //console.log(error);
            if (error.status == 401) {
                $('#signin-modal').modal('show');
            }
        });
    };
}]);