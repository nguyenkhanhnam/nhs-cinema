var app = angular.module("app.movies");

app.controller("movieController", ['$scope', 'svMovies', 'svUsers',
    function ($scope, svMovies, svUsers) {
        $scope.appName = 'User Profile';
        $('#create').show();
        $('#change').show();
        $('#signout').show();

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
            console.log(err);
        });

        $scope.updateProfile = function () {
            var userProfileData = {
                username: $("#username").val(),
                phone: $("#phone").val()
            };
            //console.log(signInData);
            svUsers.updateProfile(userProfileData, $scope.user._id).then(function (res) {
                var x = document.getElementById("snackbar");
                $('#snackbar').html(res.data.msg);
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); window.location.href = '/user/profile'; }, 1000);
            }, function (error) {
                console.log(error);
                if (error) {
                    $('#signup-modal').modal('show');
                }
            });
        };
    }
]);


    /*function uploadImage() {
        document.getElementById('uploadFile').click();
        document.getElementById('uploadFile').addEventListener('change', function () {
            var reader = new FileReader();

            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                document.getElementById('avatar').src = e.target.result;
            };

            // read the image file as a data URL.
            reader.readAsDataURL(this.files[0]);
        })
    }

    $(document).ready(function () {

    });*/