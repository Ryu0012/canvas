const modeBtn = document.getElementById("mode-btn");

const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line-width");
const colorBtn = document.getElementById("color-btn");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
let isPainting = false;
let isFilling = false;

colors = ["#FFC312", "#F79F1F", "#EE5A24", "#EA2027", "#C4E538"];

function onMouseDown() {
  isPainting = true;
  ctx.beginPath();
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function cancelPainting() {
  isPainting = false;
}

function onlineWidth(event) {
  ctx.lineWidth = event.target.value;
}

function onChangeColor(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  colorBtn.value = event.target.dataset.color;
}

function onColorFillClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "draw";
  }
}

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onColorFillClick);

lineWidth.addEventListener("change", onlineWidth);
colorBtn.addEventListener("change", onChangeColor);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
