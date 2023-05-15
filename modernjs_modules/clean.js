const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const userSpendingLimits = {
  jonas: 1500,
  matilda: 100,
};

//Getting user spending limit based on their username
const getUserLimit = user =>
  // Clever but more complex way.
  // With optional chaining and nullish coalescing operator
  // const limit= userSpendingLimits?.[user] ?? 0; 
  userSpendingLimits[user] ? userSpendingLimits[user] : 0


//Adding new expenses to budget
const addExpense = (value, description, user = "jonas") => {
  user = user.toLowerCase();


  if (value <= getUserLimit(user))
    budget.push({ value: -value, description, user });
};


addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

//Checking if the expense is on the limit(or more)
const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value <= -getUserLimit(entry.user)) entry.flag = 'limit';
}
  ;
checkExpenses();

console.log(budget);

//Logging expenses that are equal or bigger than lowerlimit(arbitrary) 
const logBiggerExpenses = function (lowerlimit) {
  let output = "";
  for (const entry of budget)
    output +=
      entry.value <= -lowerlimit ? `${entry.description.slice(-2)} / ` : ""; // Emojis are 2 chars

  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
logBiggerExpenses(500)
