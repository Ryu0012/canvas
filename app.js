// const log = document.getElementById("log");

// const canvas = document.getElementById("js-canvas");
// canvas.width = 650;
// canvas.height = 75;

// const BungeeSpiceFontFace = new FontFace(
//   "Bungee Spice",
//   "url(https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap)"
// );

// document.fonts.add(BungeeSpiceFontFace);
// log.textContent += `Bungee Spice font: ${BungeeSpiceFontFace.status}\n`;
const fontBtn = document.getElementsByClassName("font-btn");
const checkBtn = document.getElementById("check-btn");
const textWidth = document.getElementById("text-width");
const textInput = document.getElementById("text");

const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");

canvas.height = 650;
canvas.width = 650;

// ctx.font = `${textWidth.value}px  sans-serif`;
ctx.font = "30px  sans-serif";

textWidth.onchange = function (event) {
  console.log(event.target.value);
};
checkBtn.onclick = function () {
  console.log(textWidth.value);
};

canvas.ondblclick = function (event) {
  const text = textInput.value;
  const fontWidth = textWidth.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    const BungeeFontFace = new FontFace(
      "Bungee",
      "url(https://fonts.gstatic.com/s/bungeespice/v8/nwpTtK2nIhxE0q-IwgSpZBqyyCg_MMA.woff2)"
    );
    document.fonts.add(BungeeFontFace);
    BungeeFontFace.load().then(
      () => {
        ctx.font = `${fontWidth}px "Bungee"`;
        ctx.fillText(text, event.offsetX, event.offsetY);
      },
      (err) => {
        console.error(err);
      }
    );
    ctx.restore();
  }
};
