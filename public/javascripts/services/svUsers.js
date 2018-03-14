var app = angular.module("app.movies");

app.factory("svUsers", ['$http', function ($http) {
    return {
        getUser: function () {
            return $http.get('/api/user/');
        },
        signIn: function (signInData) {
            return $http.post('/api/user/login', logInData);
        },
        signUp: function (signUpData) {
            return $http.post('/api/user/signup', signUpData);
        },
        changePassword: function (newPassword) {
            return $http.post('/api/user/changepassword', newPassword);
        },
        resetPassword: function (resetPasswordData) {
            return $http.post('/api/user/reset', resetPasswordData);
        }
    }
}]);