"use strict";

//Selecting elements

//Players
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//Scores
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

//Dice
const diceElement = document.querySelector(".dice");

//Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore = 0;

btnRoll.addEventListener("click", () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${dice}.png`;
  if (dice !== 1) {
    if (player0.classList.contains("player--active")) {
      currentScore += dice;
      current0.textContent = currentScore;
    } else {
      currentScore += dice;
      current1.textContent = currentScore;
    }
  } else {
    if (player0.classList.contains("player--active")) {
      currentScore = 0;
      current0.textContent = currentScore;
      player0.classList.remove("player--active");
      player1.classList.add("player--active");
    } else {
      currentScore = 0;
      current1.textContent = currentScore;
      player1.classList.remove("player--active");
      player0.classList.add("player--active");
    }
  }
});
