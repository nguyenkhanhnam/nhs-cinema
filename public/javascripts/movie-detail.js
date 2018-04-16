var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Movie Detail";

    var movieId = window.location.href.split('/').pop();
    svMovies.getDetail(movieId).then(function (res) {
        $scope.movie = res.data;
        //console.log(res);


        svUsers.getUserId().then(function (res) {
            $scope.userId = res.data.id;
            //console.log($scope.userId);
            svUsers.getUserData($scope.userId).then(function (res) {
                $scope.user = res.data;
                if ($scope.user != null) {
                    document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
                    $('#logo').attr("src", $scope.user.avatar);
                    $('#logo').css("border-radius", "50%");
                    $('#logoGroup').attr("href", "/user/profile");
                    $('#create').show();
                }
                //console.log(res);
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            $('#signin').show();
            $('#signup').show();
            console.log(err);
        });


    }, function (error) {
        alert(error);
    });


    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };

    $scope.editMovie = function () {
        window.location.href = '/movie/edit/' + $scope.movie._id;
    };
}]);


