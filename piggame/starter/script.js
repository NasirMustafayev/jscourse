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

//Initial values
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let stillplaying = true;

//Function for switching player. We use this fucntion for switching players after dice is 1 and holding
const changePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Toggle -> If class have player--active class remove it if haven't add it
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//Rolling dice
btnRoll.addEventListener("click", () => {
  //Checking player for prevent increasing values after Win
  if (stillplaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove("hidden");
    //Changing dice picture depend on random number
    diceElement.src = `dice-${dice}.png`;
    if (dice !== 1) {
      //Calculating and displaying current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

//Holding score
btnHold.addEventListener("click", () => {
  if (stillplaying) {
    //Increasing and displaying big score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //When you win
    if (scores[activePlayer] >= 100) {
      //Changing to false for prevent value alteration
      stillplaying = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      changePlayer();
    }
  }
});

//New game
btnNew.addEventListener("click", () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillplaying = true;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  score0.textContent = currentScore;
  score1.textContent = currentScore;

  current0.textContent = currentScore;
  current1.textContent = currentScore;
});
