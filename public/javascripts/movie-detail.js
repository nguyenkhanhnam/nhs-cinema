var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Movie Detail";

    var movieId = window.location.href.split('/').pop();
    svMovies.getDetail(movieId).then(function (res) {
        $scope.movie = res.data;
        //console.log(res);


        svUsers.getUser().then(function (res) {
            $scope.user = res.data;
            if ($scope.user != null) {
                document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
                $('#create').show();
                console.log($scope.movie.creator);
                console.log($scope.user._id);
                if ($scope.user._id == $scope.movie.creator) {
                    $('#edit').show();
                }
            }
            //console.log(res);
        }, function (error) {
            //alert(error);
            $('#signin').show();
            $('#signup').show();
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


