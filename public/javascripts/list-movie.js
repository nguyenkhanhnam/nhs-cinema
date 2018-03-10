var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Movie List";
    svMovies.get().then(function (res) {
        $scope.movies = res.data;
        $('#searchBox').show();
    }, function (error) {
        //alert(error);
    });

    svUsers.getUser().then(function (res) {
        $scope.user = res.data;
        if ($scope.user != null) {
            document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
            $('#create').show();
        }
        else {
            $('#signin').show();
            $('#signup').show();
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
    /*var search;
    $(document).ready(function () {
        search = document.getElementById("search");
        $("#search").change(function(){
            filterMovie();
        })
        search.onkeyup = filterMovie;
        //search.onkeydown = filterMovie;
        //search.onchange = filterMovie;
    });*/

    $scope.$watch('search', function(newValue, oldValue) {
        filterMovie();
      });


    function filterMovie() {
        if ($scope.search == "") {
            svMovies.get().then(function (res) {
                $scope.movies = res.data;
                //console.log(res);
            }, function (error) {
                //alert(error);
            });
            return;
        }
        //console.log(search.value);
        var searchPattern = new RegExp($scope.search, "i");
        //var searchPattern = new RegExp('^' + search.value, 'i');
        for (var i = $scope.movies.length - 1; i >= 0; i--) {
            if ($scope.movies[i].title.search(searchPattern) == -1) {
                $scope.movies.splice(i, 1);
            }
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

