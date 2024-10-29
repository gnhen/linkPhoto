// Trigger file picker for the artwork image
function triggerImageUpload() {
    document.getElementById('image-upload').click();
}

document.getElementById('image-upload').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('custom-image').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Make an element editable and auto-select text
function makeEditable(element) {
    element.contentEditable = true;
    element.focus();

    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    element.addEventListener('blur', () => {
        element.contentEditable = false;
    });
}

function openColorPicker() {
    const colorPicker = document.getElementById('color-picker');

    // Open the color picker for mobile
    colorPicker.value = '#ffffff'; // Set default color to white or any initial color
    colorPicker.style.display = 'block'; // Make it visible
    colorPicker.focus(); // Focus on the input to trigger the color picker

    // Add event listener to change the background color after the color is picked
    colorPicker.addEventListener('input', function () {
        document.documentElement.style.backgroundColor = this.value;
        document.body.style.backgroundColor = this.value;
    }, { once: true }); // Use { once: true } to ensure it only triggers once

    // Optionally, hide it again after selection
    colorPicker.addEventListener('blur', () => {
        colorPicker.style.display = 'none';
    });
}


document.getElementById('color-picker').addEventListener('input', function () {
    document.documentElement.style.backgroundColor = this.value;
    document.body.style.backgroundColor = this.value;
});


// Export the main container as PNG
function exportPNG() {
    const container = document.querySelector('.container');
    const scale = 4; // Higher resolution for export
    const aspectRatioWidth = 375; // Example width for iPhone
    const aspectRatioHeight = 667; // Example height for iPhone

    // Calculate final dimensions based on scale and aspect ratio
    const canvasWidth = aspectRatioWidth * scale;
    const canvasHeight = aspectRatioHeight * scale;

    // Create an off-screen canvas
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvasWidth;
    offscreenCanvas.height = canvasHeight;

    const context = offscreenCanvas.getContext('2d');

    // Get the current background color
    const backgroundColor = document.body.style.backgroundColor || '#a82929';

    // Fill the canvas with the background color
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Temporarily hide buttons and slider in the card for the export image
    document.getElementById('change-bg-color').style.display = 'none';
    document.getElementById('export-btn').style.display = 'none';
    document.getElementById('size-label').style.display = 'none';
    document.getElementById('pixel-size').style.display = 'none';

    // Hide the slider
    document.getElementById('size-slider').style.display = 'none'; // Assuming the slider has this ID

    // Capture the container as a PNG
    html2canvas(container, {
        scale: scale,
        backgroundColor: null // Avoid background from html2canvas
    }).then(canvas => {
        // Draw the captured container onto the offscreen canvas centered
        context.drawImage(canvas, (canvasWidth - canvas.width) / 2, (canvasHeight - canvas.height) / 2);

        // Restore button and slider visibility
        document.getElementById('change-bg-color').style.display = '';
        document.getElementById('export-btn').style.display = '';
        document.getElementById('size-slider').style.display = ''; // Restore the slider
        document.getElementById('size-label').style.display = '';
        document.getElementById('pixel-size').style.display = '';

        // Trigger download
        const link = document.createElement('a');
        link.download = 'custom-image.png';
        link.href = offscreenCanvas.toDataURL('image/png', 1.0); // Set quality to maximum
        link.click();

        console.log("PNG exported successfully.");
    }).catch(error => {
        console.error("Export failed: ", error);
        alert("Export failed. Please check the console for errors.");
    });
}



function adjustCardSize(size) {
    const card = document.querySelector('.card');

    // Set the width of the card to the slider's value
    card.style.width = size + 'px';

    // Update the pixel size display
    document.getElementById('pixel-size').innerText = size + 'px';
}
