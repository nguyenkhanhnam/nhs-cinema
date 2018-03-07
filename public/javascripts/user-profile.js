
function uploadImage() {
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

