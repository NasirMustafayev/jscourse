"use strict";

// document.querySelector(".number").textContent = "?";
// document.querySelector(".guess").value = "0";

if (document.querySelector(".highscore").textContent == 0) {
  document.querySelector(".label-highscore").textContent =
    "🤷‍♂️ Not any score yet";
}

const secretNum = Math.trunc(Math.random() * 20) + 1;

document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  if (guess && guess === secretNum) {
    console.log("Guessed!");

    document.querySelector(".message").textContent =
      "🥳 Winner Winner 🍗 Chicken Dinner!";
  }
});
