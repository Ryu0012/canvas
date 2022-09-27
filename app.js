const eraserBtn = document.getElementById("eraser");
const clearAllBtn = document.getElementById("clear-all");
const colorBtn = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("color"));
const modeBtn = document.getElementById("mode-btn");
const lineWidth = document.getElementById("range-width");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
let isPainting = false;
let isFill = false;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

function onMouseMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
  isPainting = true;
  ctx.beginPath();
}

function onMouseUp() {
  isPainting = false;
}

function onLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

function onModeBtn() {
  if (isFill) {
    isFill = false;
    modeBtn.innerText = "Fill";
  } else {
    isFill = true;
    modeBtn.innerText = "Stroke";
  }
}

function onFillPaint() {
  if (isFill) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function colorStyle(colorValue) {
  ctx.fillStyle = colorValue;
  ctx.strokeStyle = colorValue;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  colorStyle(colorValue);
  colorBtn.value = colorValue;
}

function onColorChange(event) {
  const colorValue = event.target.value;
  colorStyle(colorValue);
}

function onClearAll() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFill = false;
  modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
lineWidth.addEventListener("change", onLineWidth);
canvas.addEventListener("click", onFillPaint);
colorOption.forEach((color) => addEventListener("click", onColorClick));
colorBtn.addEventListener("change", onColorChange);

modeBtn.addEventListener("click", onModeBtn);
clearAllBtn.addEventListener("click", onClearAll);
eraserBtn.addEventListener("click", onEraserClick);
