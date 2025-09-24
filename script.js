const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const eraser = document.getElementById('eraser');
const clear = document.getElementById('clear');

let painting = false;
let erasing = false;

function resizeCanvas() {
    canvas.width = window.innerWidth - document.querySelector('.tools-sidebar').offsetWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';

    if (erasing) {
        ctx.strokeStyle = 'white';
    } else {
        ctx.strokeStyle = colorPicker.value;
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

eraser.addEventListener('click', () => {
    erasing = !erasing;
    if (erasing) {
        eraser.textContent = 'Brush';
        eraser.classList.remove('btn-secondary');
        eraser.classList.add('btn-primary');
    } else {
        eraser.textContent = 'Eraser';
        eraser.classList.remove('btn-primary');
        eraser.classList.add('btn-secondary');
    }
});
