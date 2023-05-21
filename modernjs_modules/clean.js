"use strict"
//*-----------------------------------INITIAL-DATA------------------------------------------*//

//Immutable budget object
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//Immutable spending limits object
const userSpendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

//*-----------------------------------GET-USER-LIMIT------------------------------------------*//
//Getting user spending limit based on username

// Clever but more complex way.
// With optional chaining and nullish coalescing operator
// const limit= userSpendingLimits?.[user] ?? 0; 

//Pure function

const getUserLimit = (user, limits) =>
  limits[user] ? limits[user] : 0

//*-----------------------------------ADD-EXPENSE-------------------------------------------*//
//Adding new expenses to budget
//Pure function
//Now our function only return value, DOESN'T depend outer data and DOESN'T mutate any outer value

const addExpense = (state, limits, value, description, user = "jonas") => {
  const username = user.toLowerCase();

  return value <= getUserLimit(username, limits)
    ? [...state, { value: -value, description, user: username }]
    : state;
};

const newBudget1 = addExpense(budget, userSpendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, userSpendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, userSpendingLimits, 200, 'Stuff', 'Jay');

console.log(newBudget3);

//*------------------------------------CHECK-EXPENSES-------------------------------------*//
//Checking if the expense is on the limit(or more)
//Pure function

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value <= -getUserLimit(entry.user, limits)
      ? { ...entry, flag: "limit" }
      : entry
  );

const budgetWithLimits = checkExpenses(newBudget3, userSpendingLimits);

console.log(budgetWithLimits);

//*---------------------------------GET-BIGGER-EXPENSES-----------------------------------*//

//Logging expenses that are equal or bigger than lowerlimit(arbitrary) 

//Pure function(regular)
// const logBiggerExpenses = function (state, lowerLimit) {
//   const output = state
//     .filter(entry => entry.value <= -lowerLimit)
//     .map(entry => entry.description.slice(-2))
//     .join(" / ");

//   console.log(output);
// };

//Pure function(arrow)
const getBiggerExpenses = (state, lowerLimit) =>
  state
    .filter(entry => entry.value <= -lowerLimit)
    .map(entry => entry.description.slice(-2))
    .join(" / ");
;

const BiggerExpenses = getBiggerExpenses(budgetWithLimits, 500);

console.log(BiggerExpenses);

