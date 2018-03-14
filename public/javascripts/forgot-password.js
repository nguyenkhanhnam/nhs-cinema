var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = 'Forgot Password';
    $('#signin').show();
    $('#signup').show();

    $scope.resetPassword = function () {

        //alert("submittedd");
        var ForgotPasswordData = {
            email: $("#email").val()
        };
        //console.log(signInData);
        svUsers.resetPassword(ForgotPasswordData).then(function (res) {
            var x = document.getElementById("snackbar");
            $('#snackbar').html(res.data.msg);
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); window.location.href = '/'; }, 1000);
        }, function (error) {
            //alert(error);
            //console.log(error);
            if (error) {
                $('#signup-modal') > $('h4').html("Forgot Password");
                $('#signup-modal') > $('p').html('This email does not belong to any account')
                $('#signup-modal').modal('show');
            }
        });
    };
}]);
