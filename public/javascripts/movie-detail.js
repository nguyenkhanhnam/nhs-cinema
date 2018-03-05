var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', function ($scope, svMovies) {
    $scope.appName = "Movie Detail";
    
    var movieId = window.location.href.split('/').pop();
    svMovies.getDetail(movieId).then(function (res) {
        $scope.movie = res.data;
        console.log(res);
    }, function (error) {
        alert(error);
    });    
}]);


