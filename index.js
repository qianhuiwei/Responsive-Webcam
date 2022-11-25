function registerEventListeners() {
    // add button click event listener
    document.querySelector(".btn").addEventListener("click", takeSnapshot);

    // add orientation change event listener
    let portrait = window.matchMedia("(orientation: portrait)");
    portrait.addEventListener("change", function (e) {
        Webcam.reset();
        initCamera();
    });
}

function initCamera() {
    let width;
    let height;
    if (window.matchMedia("(orientation: landscape)").matches) {
        // landscape mode
        width = 320;
        height = 240;
    } else {
        // portrait mode
        width = 240;
        height = 320;
    }

    Webcam.set({
        width: width,
        height: height,
        dest_width: width,
        dest_height: height,
        crop_width: width,
        crop_height: height,
        image_format: 'jpeg',
        jpeg_quality: 90,
        flip_horiz: true
    });
    Webcam.attach('#my_camera');
}

function takeSnapshot() {
    // take snapshot and get image data
    Webcam.snap(function (data_uri) {
        document.getElementById('results').innerHTML =
            '<img src="' + data_uri + '"/>';
    });
}

function init() {
    registerEventListeners();
    initCamera();
}

init();