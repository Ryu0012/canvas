const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

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

function onMouseUp() {
  isPainting = false;
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
  console.log(event);
}

function onChangeColor(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  console.log(event);
  console.log(event.target.value);
}

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onChangeColor);
