var app = angular.module("app.movies");

var genres = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Superhero', 'Thriller', 'War', 'Western'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var years = [];
var date = new Date();
var thisYear = date.getFullYear();
var thisMonth = date.getMonth();
for (var i = 1878; i <= thisYear + 1; i++) {
    years.push(i);
}

app.controller("movieController", ['$scope', 'svMovies', function ($scope, svMovies) {
    $scope.appName = "Edit Movie";
    $scope.genres = genres;
    $scope.months = months;
    $scope.years = years;

    var movieId = window.location.href.split('/').pop();
    svMovies.getDetail(movieId).then(function (res) {
        $scope.movie = res.data;
        $scope.movieYear =  parseInt($scope.movie.release.split('-').pop());
        $scope.movieMonth = months[$scope.movie.release.split('-')[0]-1];
    
        console.log($scope.movieYear);
    }, function (error) {
        alert(error);
    });

    svMovies.getUser().then(function (res) {
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

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };


}]);


