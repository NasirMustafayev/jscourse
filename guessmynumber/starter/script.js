"use strict";

if (document.querySelector(".highscore").textContent == 0) {
  document.querySelector(".label-highscore").textContent =
    "🤷‍♂️ Not any score yet";
}

const secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
const msgBox = (value) => {
  return (document.querySelector(".message").textContent = value);
};
const scoreBox = (value) => {
  return (document.querySelector(".score").textContent = value);
};

////////////////////////////////////////////////////////////////

document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  if (guess === secretNum && score > 1) {
    msgBox("🥳 Winner Winner 🍗Chicken Dinner!");
  } else if (!guess) {
    msgBox("❌Type a valid number!");
  } else if (
    (guess + 1 === secretNum && score > 1) ||
    (guess - 1 === secretNum && score > 1)
  ) {
    msgBox("🙈 Near");
    score--;
    scoreBox(score);
  } else if (guess > secretNum && score > 1) {
    msgBox("📈 Too high");
    score--;
    scoreBox(score);
  } else if (guess < secretNum && score > 1) {
    msgBox("📉 Too low");
    score--;
    scoreBox(score);
  } else {
    msgBox("💢 You lose!");
    scoreBox(0);
  }
});
