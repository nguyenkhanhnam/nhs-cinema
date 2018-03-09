var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', function ($scope, svMovies) {
    $scope.appName = "Movie Detail";

    var movieId = window.location.href.split('/').pop();
    svMovies.getDetail(movieId).then(function (res) {
        $scope.movie = res.data;
        //console.log(res);
    }, function (error) {
        alert(error);
    });

    svMovies.getUser().then(function (res) {
        $scope.user = res.data;
        if ($scope.user != null) {
            document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
            $('#searchBox').hide();
            $('#create').show();
            $('#signin').hide();
            $('#signup').hide();
            $('#change').hide();
            $('#signout').hide();
        }
        else {
            $('#searchBox').hide();
            $('#create').hide();
            $('#signin').show();
            $('#signup').show();
            $('#change').hide();
            $('#signout').hide();
        }
        //console.log(res);
    }, function (error) {
        //alert(error);
    });

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };


}]);


