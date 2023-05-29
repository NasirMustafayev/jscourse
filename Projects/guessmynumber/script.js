"use strict";

//Defining Intial values and settings
let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//We create arrow functions for updating values and texts
//This purpose is prevent messy looking code in event handler function

//This function is updating and displaying textContents of any given class
const display = (field, value) => {
  return (document.querySelector(field).textContent = value);
};
const bodyStyle = (value) => {
  return (document.querySelector("body").style.backgroundColor = value);
};

////////////////////////////////////////////////////////////////

//Listener start here
document.querySelector(".check").addEventListener("click", () => {
  //In default setting input field give us string values. So we convert them to number.

  const guess = Number(document.querySelector(".guess").value);

  //When you win
  if (guess === secretNum && score > 1) {
    display(".message", "🥳 Winner Winner 🍗Chicken Dinner!");
    bodyStyle("#60b347");
    display(".number", guess);
    //High score
    if (score > highscore) {
      highscore = score;
      display(".highscore", score);
    }
  }
  //When you not put a number
  else if (!guess) {
    display(".message", "❌Type a valid number!");
  }
  //When your guess near to secret number(default: can be +1 or -1)
  else if (
    (guess + 1 === secretNum && score > 1) ||
    (guess - 1 === secretNum && score > 1)
  ) {
    display(".message", "🙈 Near");
    score--;
    display(".score", score);
  }
  //When your guess way bigger and smaller than secret number
  else if (guess !== secretNum && score > 1) {
    display(".message", guess > secretNum ? "📈 Too high" : "📉 Too low");
    score--;
    display(".score", score);
  }
  //When score is 0 and you lose
  else {
    display(".message", "💢 You lose!");
    display(".score", 0);
  }
});

//Play again
//We restore default values and create new random number
document.querySelector(".again").addEventListener("click", () => {
  document.querySelector(".guess").value = 0;
  secretNum = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  display(".message", "Start guessing...");
  display(".score", score);
  display(".number", "?");
  bodyStyle("#222");
});
