var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', function ($scope, svMovies) {
    $scope.appName = "Movie List";
    svMovies.get().then(function (res) {
        $scope.movies = res.data;
        console.log(res);
    }, function (error) {
        alert(error);
    });

    $scope.getDetail = function (movieId) {
        window.location.href = '/api/movie/detail/'+movieId;
    }
}]);

/*app.factory("svMovies", ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/');
        },
        create: function (newMovie) {
            return $http.post('/api/movie/createMovie', newMovie);
        }
    }
}]);*/

