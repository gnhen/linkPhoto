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

// Open color picker and change webpage background color
function openColorPicker() {
    document.getElementById('color-picker').click();
}

document.getElementById('color-picker').addEventListener('input', function () {
    document.body.style.backgroundColor = this.value; // Apply color to webpage background
});

// Export as PNG
function exportPNG() {
    const card = document.querySelector('.card');
    const scale = 2; // High-resolution export

    html2canvas(card, {
        scale: scale,
        backgroundColor: document.body.style.backgroundColor || "#a82929" // Apply selected background color or default red
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'custom-image.png';
        link.href = canvas.toDataURL();
        link.click();
    }).catch(error => console.error("Export failed: ", error));
}
