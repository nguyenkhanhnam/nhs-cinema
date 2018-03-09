var app = angular.module("app.movies");

app.factory("svUsers", ['$http', function ($http) {
    return {
        getUser: function (id) {
            return $http.get(`/api/user/`);
        }
    }
}]);