const fileInput = document.getElementById('file');
const cellInput = document.getElementById('cell');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

function parseCSV(text) {
    return text
        .trim()
        .split(/\r?\n/)
        .map(line => line.split(',').map(x => x.trim()));
}

function drawMatrix(matrix, cell) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    canvas.width = cols * cell;
    canvas.height = rows * cell;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const color = matrix[r][c] || '#FFFFFF';
            if (/^#([0-9a-f]{6})$/i.test(color)) {
                ctx.fillStyle = color;
                ctx.fillRect(c * cell, r * cell, cell, cell);
            }
        }
    }
}

async function handleFile(file) {
    const text = await file.text();
    const matrix = parseCSV(text);
    drawMatrix(matrix, parseInt(cellInput.value, 10) || 20);
}

fileInput.addEventListener('change', () => {
    const [file] = fileInput.files || [];
    if (file) handleFile(file);
});

cellInput.addEventListener('change', () => {
    const [file] = fileInput.files || [];
    if (file) handleFile(file);
});

fetch('pixelart.csv')
    .then(r => r.ok ? r.text() : Promise.reject())
    .then(text => drawMatrix(parseCSV(text), parseInt(cellInput.value, 10) || 20))
    .catch(() => { });