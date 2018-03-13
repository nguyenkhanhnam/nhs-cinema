var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Movie List";
    $scope.sorts = ['Create date', 'Release date', 'Title', 'Genre'];
    $scope.sort = $scope.sorts[0];

    svMovies.get().then(function (res) {
        $scope.movies = res.data;
        $('#searchBox').show();
        $('#sortBox').show();
        $scope.$watch('search', function (newValue, oldValue) {
            filterMovie();
        });
        $scope.$watch('sort', function (newValue, oldValue) {
            sortMovie();
        });
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip({
                html: true
            });
        });
    }, function (error) {
        //alert(error);
    });


    svUsers.getUser().then(function (res) {
        
        console.log("meow");
        $scope.user = res.data;
        console.log("abc");
        if ($scope.user != null) {
            document.getElementById("greeting").innerHTML = 'Welcome ' + $scope.user.username;
            $('#create').show();
        }
        else {
           
        }
        //console.log(res);
    }, function (error) {
        $('#signin').show();
        $('#signup').show();
        //alert(error);
    });

    $scope.getDetail = function (movieId) {
        window.location.href = '/movie/detail/' + movieId;
    };

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };

    function sortBy(property) {
        return function (a, b) {
            if (a[property] > b[property]) {
                return 1;
            } else if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        }
    }

    function sortMovie() {
        if ($scope.sort == "Title") {
            console.log("Title");
            $scope.movies.sort(sortBy("title"));
        }
        if ($scope.sort == "Genre") {
            $scope.movies.sort(sortBy("genre"));
        }
        if ($scope.sort == "Create date") {
            console.log("Create date");
            $scope.movies.sort(sortBy("_id")).reverse();
        }
        if ($scope.sort == "Release date") {
            $scope.movies.sort(sortBy("release"));
        }
    }

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

function meow() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({
            html: true
        });
    });
}

