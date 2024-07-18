let cv_img;

function convertCVToImage(cvImg) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = cvImg.cols;
    canvas.height = cvImg.rows;

    const imageData = ctx.createImageData(cvImg.cols, cvImg.rows);
    imageData.data.set(cvImg.data);
    ctx.putImageData(imageData, 0, 0);

    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
}

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
        cv_img = cv.imread(new Uint8Array(data));
        const img = convertCVToImage(cv_img);
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);
    };
    reader.readAsArrayBuffer(file);
}

function predict() {
    // Assume img is the image element where the image is displayed
    let imgData = img.src; // Get the image data
    // Send imgData to your prediction endpoint or perform prediction logic here
    console.log("Performing prediction...");
}

function saveImage() {
    // Assume img is the image element where the image is displayed
    let imgData = img.src; // Get the image data
    // Send imgData to your server to save the image or implement saving logic here
    console.log("Saving image...");
}