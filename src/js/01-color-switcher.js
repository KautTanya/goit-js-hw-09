
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let colorId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    colorId = setInterval(() => {
      const color = getRandomHexColor();
      bodyEl.style.backgroundColor = color;
    }, 1000);
  });

  stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    clearInterval(colorId);
    });