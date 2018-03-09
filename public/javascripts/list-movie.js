var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', /*'svUsers',*/ function ($scope, svMovies/*, svUsers*/) {
    $scope.appName = "Movie List";
    svMovies.get().then(function (res) {
        $scope.movies = res.data;
        //console.log(res);
    }, function (error) {
        alert(error);
    });

    svMovies.getUser().then(function (res) {
        $scope.user = res.data;
        if ($scope.user != null) {
            document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
            $('#create').show();
            $('#signin').hide();
            $('#signup').hide();
            $('#change').hide();
            $('#signout').hide();
        }
        else {
            $('#create').hide();
            $('#signin').show();
            $('#signup').show();
            $('#change').hide();
            $('#signout').hide();
        }
        //console.log(res);
    }, function (error) {
        //alert(error);
    });

    $scope.getDetail = function (movieId) {
        window.location.href = '/movie/detail/' + movieId;
    };

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };

    // For filter
    var search;
    $(document).ready(function () {
        search = document.getElementById("search");
        search.onkeyup = filterMovie;
    });


    function filterMovie() {
        var searchPattern = new RegExp('^' + search.value, 'i');
        for (var i = $scope.movies.length - 1; i >= 0; i--) {
            if (!searchPattern.test($scope.movies[i].title)) {
                $scope.movies.splice(i, 1);
            }
            //console.log($scope.movies);
        }
    }
}]);

/*function meow() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({
            html: true
        });
    });
}*/

