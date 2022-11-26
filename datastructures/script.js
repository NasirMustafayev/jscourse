const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]);
//Getting question value from map
console.log(`Questions: ${question.get("question")}
Answers:`);

//Destructuring and iterating map
for (const [i, val] of question) {
  if (typeof i === "number") console.log(`Answer ${i}: ${val}`);
}
const answer = Number(prompt("Choose your answer"));
//If answer is equal to "correct" key value in map then condition will be true and we retrieve "true" key value from map
const result = question.get(answer == question.get("correct"));
console.log(result);
