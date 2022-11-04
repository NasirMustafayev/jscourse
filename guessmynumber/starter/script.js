"use strict";

//Defining Intial values and settings
let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//We create arrow functions for each field we setting values and updating values.
//This purpose is prevent messy looking code in event handler function
const msgBox = (value) => {
  return (document.querySelector(".message").textContent = value);
};
const scoreBox = (value) => {
  return (document.querySelector(".score").textContent = value);
};
const numberBox = (value) => {
  return (document.querySelector(".number").textContent = value);
};
const bodyStyle = (value) => {
  return (document.querySelector("body").style.backgroundColor = value);
};
const highscoreBox = (value) => {
  return (document.querySelector(".highscore").textContent = value);
};

////////////////////////////////////////////////////////////////

//Listener start here
document.querySelector(".check").addEventListener("click", () => {
  //In default setting input field give us string values. So we convert them to number.

  const guess = Number(document.querySelector(".guess").value);

  //When you win
  if (guess === secretNum && score > 1) {
    msgBox("🥳 Winner Winner 🍗Chicken Dinner!");
    bodyStyle("#60b347");
    numberBox(guess);
    //High score
    if (score > highscore) {
      highscore = score;
      highscoreBox(score);
    }
  }
  //When you not put a number
  else if (!guess) {
    msgBox("❌Type a valid number!");
  }
  //When your guess near to secret number(default: can be +1 or -1)
  else if (
    (guess + 1 === secretNum && score > 1) ||
    (guess - 1 === secretNum && score > 1)
  ) {
    msgBox("🙈 Near");
    score--;
    scoreBox(score);
  }
  //When your guess way bigger than secret number
  else if (guess > secretNum && score > 1) {
    msgBox("📈 Too high");
    score--;
    scoreBox(score);
  }
  //When your guess way smaller than secret number
  else if (guess < secretNum && score > 1) {
    msgBox("📉 Too low");
    score--;
    scoreBox(score);
  }
  //When score is 0 and you lose
  else {
    msgBox("💢 You lose!");
    scoreBox(0);
  }
});

//Play again
//We restore default values and create new random number
document.querySelector(".again").addEventListener("click", () => {
  document.querySelector(".guess").value = 0;
  secretNum = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  msgBox("Start guessing...");
  scoreBox("20");
  numberBox("?");
  bodyStyle("#222");
});
