

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

function uploadMovie() {
    var title = document.getElementById('title').value;
    var genre = document.getElementById('genre').value;
    var release = document.getElementById('release').value;
    var description = document.getElementById('description').value;
    var cover = document.getElementById('uploadFile').files[0];

    var newMovie = {
        title: title,
        genre: genre,
        release: release,
        description: description,
    }

    console.log(newMovie);
    $.post('/movie/createMovie', { newMovie: newMovie }).then(function (res) {
        console.log(res);
    })
}