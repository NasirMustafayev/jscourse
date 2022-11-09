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
let activePlayer = 0;

btnRoll.addEventListener("click", () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    //Toggle -> If class have player--active class remove it if haven't add it
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  }
});
