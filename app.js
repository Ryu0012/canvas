const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");

const modeBtn = document.getElementById("mode-btn");
const destoryBtn = document.getElementById("destory-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

const colors = [
  "#74b9ff",
  "#55efc4",
  "#fd79a8",
  "#ffeaa7",
  "#d63031",
  "#b2bec3",
];

function onMove(event) {
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

function cancelPainting() {
  isPainting = false;
}

function eventColorStyle(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
  console.log(event);
}

function onChangeColor(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px 'sans-serif'";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onChangeColor);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveClick);
