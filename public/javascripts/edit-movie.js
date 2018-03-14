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

app.controller("movieController", ['$scope', 'svMovies', 'svUsers', function ($scope, svMovies, svUsers) {
    $scope.appName = "Edit Movie";
    $scope.genres = genres;
    $scope.months = months;
    $scope.years = years;

    var movieId = window.location.href.split('/').pop();
    svMovies.getDetail(movieId).then(function (res) {
        $scope.movie = res.data;
        $scope.movieYear = parseInt($scope.movie.release.split('/')[0]);
        $scope.movieMonth = months[$scope.movie.release.split('/')[1] - 1];

        console.log($scope.movieYear);
    }, function (error) {
        alert(error);
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

    $scope.viewProfile = function () {
        window.location.href = '/user/profile/';
    };

    $scope.uploadImage = function () {
        document.getElementById('uploadFile').click();
        document.getElementById('uploadFile').addEventListener('change', function () {
            var reader = new FileReader();

            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                document.getElementById('cover').src = e.target.result;
            };

            // read the image file as a data URL.
            reader.readAsDataURL(this.files[0]);
        })
    };

    $scope.editMovie = function () {
        var movieData = {
            title: $("#title").val(),
            genre: $('#genre').val(),
            month: $('#month').val(),
            year: $('#year').val(),
            description: $("#description").val()
        };

        svMovies.editMovie(movieData, $scope.movie._id).then(function (res) {
            var x = document.getElementById("snackbar");
            $('#snackbar').html(res.data.msg);
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); window.location.href = '/'; }, 1000);
        }, function (error) {
            console.log(error);
            if (error) {
                //$('#signup-modal').modal('show');
            }
        });
    }
}]);


