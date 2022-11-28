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

/////////------DIFFERENT-CODES-FOR-DIFFERENT-EXAMPLES-------///////////

//Correcting this string and making more readable
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

//First we observing and decide to Split string based on + sign
const splittedStr = flights.split("+");

//Function for using to format some string and not repeating ourself
const cutterFormatter = (str) => str.slice(0, 3).toLocaleUpperCase();

//Looping based on splittedStr
for (const information of splittedStr) {
  //Split again based on ; sign and destruct to access parts of string
  const [event, from, to, time] = information.split(";");

  //Final result
  const result = `${event.startsWith("_Delayed") ? "🟥" : ""}${event.replaceAll(
    "_",
    " "
  )} from ${cutterFormatter(from)} to ${cutterFormatter(
    to
  )} (${time})`.padStart(50);

  console.log(result);
}
