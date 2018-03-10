var app = angular.module("app.movies");

app.factory("svUsers", ['$http', function ($http) {
    return {
        getUser: function (id) {
            return $http.get(`/api/user/`);
        },
        signIn: function(signInData){
            return $http.post('/api/user/signin', signInData);
        },
        changePassword: function(newPassword){
            return $http.post('/api/user/changepassword', newPassword);
        }
    }
}]);