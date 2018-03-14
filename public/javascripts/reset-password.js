var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = 'Reset Password';
    $('#signin').show();
    $('#signup').show();

    $scope.resetPassword = function () {

        //alert("submittedd");
        var resetPasswordData = {
            email: $("#email").val()
        };
        //console.log(signInData);
        svUsers.resetPassword(resetPasswordData).then(function (res) {
            var x = document.getElementById("snackbar");
            $('#snackbar').html(res.data.msg);
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); window.location.href = '/'; }, 1000);
        }, function (error) {
            //alert(error);
            //console.log(error);
            if (error) {
                $('#signup-modal') > $('h4').html("Reset Password");
                $('#signup-modal') > $('p').html('This email does not belong to any account')
                $('#signup-modal').modal('show');
            }
        });
    };
}]);
