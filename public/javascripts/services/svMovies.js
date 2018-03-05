var app = angular.module("app.movies", []);

app.factory("svMovies", ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/api/movie/');
        },
        getDetail: function (id) {
            return $http.get(`/api/movie/detail/${id}`);
        },
        create: function (newMovie) {
            return $http.post('/api/movie/createMovie', newMovie);
        }
    }
}]);