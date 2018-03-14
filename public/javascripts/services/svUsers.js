var app = angular.module("app.movies");

app.factory("svUsers", ['$http', function ($http) {
    return {
        getUser: function () {
            return $http.get('/v1/users/');
        },
        signIn: function (logInData) {
            /*return $http.post('/v1/authentication/', {
                headers: { 'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==' }, logInData
            });*/
            return $http.post('/v1/authentication/', logInData);
        },
        signUp: function (signUpData) {
            return $http.post('/v1/users/', signUpData);
        },
        changePassword: function (newPassword, userId) {
            return $http.post(`/v1/users/${userId}/password`, newPassword);
        },
        resetPassword: function (resetPasswordData) {
            return $http.post('/v1/users/password/reset', resetPasswordData);
        },
        updateProfile: function (userProfileData, userId) {
            return $http.put(`/v1/users/${userId}/`, userProfileData);
        }
    }
}]);