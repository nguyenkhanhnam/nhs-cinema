var app = angular.module("app.movies", ["ngMessages"]);

var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {

                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};


app.directive('compareTo', compareTo);

app.factory("svMovies", ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/v1/movies');
        },
        getDetail: function (id) {
            return $http.get(`/v1/movies/${id}`);
        },
        create: function (newMovie) {
            return $http.post('/v1/movies/', newMovie);
        },
        edit: function (updateMovieData, movieId) {
            return $http.put('/v1/movies/' + movieId, updateMovieData);
        }
    }
}]);