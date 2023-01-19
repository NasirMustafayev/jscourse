//---------------------------------------------//

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Exceptions for words which will not be capitalize
const exceptions = [
  "and",
  "a",
  "an",
  "but",
  "cart",
  "to",
  "in",
  "or",
  "on",
  "with",
  "is",
  "the",
  "of",
];

function titlecase(title) {
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      //We are checking here if word in the exception array or not
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
  //In the end we need to capitalize first letter of sentence
  //So we make sure sentence will not start with lowercase letter even it's exceptional word
  return titleCase[0].toUpperCase() + titleCase.slice(1);
}

console.log(titlecase("the tale of a small tight pussy"));
