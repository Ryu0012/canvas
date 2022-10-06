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
const fontModeBtn = document.getElementById("font-mode");
const currentFont = document.querySelector(".current-font");
const fontBtn = Array.from(document.getElementsByClassName("font-btn"));
const checkBtn = document.getElementById("check-btn");
const textWidth = document.getElementById("text-width");
const textInput = document.getElementById("text");

const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");

canvas.height = 650;
canvas.width = 650;

let FONT = "serif";
let fontmode = false;
// ctx.font = `${textWidth.value}px  sans-serif`;
ctx.font = `30px  ${FONT}`;

const BungeeFontFace = new FontFace(
  "Bungee",
  "url(https://fonts.gstatic.com/s/bungeespice/v8/nwpTtK2nIhxE0q-IwgSpZBqyyCg_MMA.woff2)"
);

const SilkScreenFontFace = new FontFace(
  "SilkScreen",
  "url(https://fonts.gstatic.com/s/silkscreen/v1/m8JXjfVPf62XiF7kO-i9YL1la1OD.woff2)"
);

document.fonts.add(BungeeFontFace, SilkScreenFontFace);

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

    SilkScreenFontFace.load().then(
      () => {
        ctx.font = `${fontWidth}px ${FONT}`;
        if (fontmode) {
          ctx.fillText(text, event.offsetX, event.offsetY);
        } else {
          ctx.strokeText(text, event.offsetX, event.offsetY);
        }
      },
      (err) => {
        console.error(err);
      }
    );
    ctx.restore();
  }
};

function onFontClick(event) {
  const fontValue = event.target.dataset.font;
  FONT = fontValue;
  currentFont.innerText = FONT;
  return;
}

fontModeBtn.onclick = function () {
  if (fontmode) {
    fontmode = false;
    fontModeBtn.innerText = "fill";
  } else {
    fontmode = true;
    fontModeBtn.innerText = "stroke";
  }
};

fontBtn.forEach((font) => font.addEventListener("click", onFontClick));
