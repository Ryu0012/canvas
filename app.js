const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 1000;
let isPainting = false;

colors = [
  "#FFC312",
  "#F79F1F",
  "#EE5A24",
  "#EA2027",
  "#C4E538",
  "#A3CB38",
  "#009432",
  "#006266",
  "#12CBC4",
  "#1289A7",
  "#0652DD",
  "#1B1464",
  "#FDA7DF",
  "#D980FA",
  "#9980FA",
  "#ED4C67",
  "#ED4C67",
  "#B53471",
  "#833471",
  "#6F1E51",
];

function onMouseDown() {
  isPainting = true;
  ctx.beginPath();
}

function onMove(event) {
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
if (isPainting) {
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  // return;
}

function cancelPainting() {
  isPainting = false;
}

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
