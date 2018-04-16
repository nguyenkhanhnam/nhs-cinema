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

    $scope.appName = "Movie List";

    $scope.genres = genres;
    $scope.months = months;
    $scope.years = years;

    $scope.thisYear = thisYear;
    $scope.thisMonth = months[thisMonth];


}]);

function uploadImage() {
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
}

