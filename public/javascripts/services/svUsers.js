var app = angular.module("app.movies");

app.factory("svUsers", ['$http', function ($http) {
    return {
        getUser: function () {
            return $http.get('/api/user/');
        },
        signIn: function(signInData){
            return $http.post('/api/user/signin', signInData);
        },
        signUp: function(signUpData){
            return $http.post('/api/user/signup', signUpData);
        },
        changePassword: function(newPassword){
            return $http.post('/api/user/changepassword', newPassword);
        }
    }
}]);