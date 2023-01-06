"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const bannerEl = document.querySelector(".banner");
//-----------------------------------------------//

//Displaying movements
const displayMovements = function (movements) {
  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <!--<div class="movements__date">3 days ago</div>-->
    <div class="movements__value">${mov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Username generator from account objects owner names

const generatorUsername = function (accs) {
  //Looping accounts array
  accs.forEach((acc) => {
    //Cutting and shaping username. With Map we getting first letter of every word
    acc.username = acc.owner
      .split(" ")
      .map((piece) => piece[0])
      .join("")
      .toLowerCase();
  });
};

//Updating UI based on updated values
const updateInterface = function (account) {
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

//Calculating and displaying Balance

const calcDisplayBalance = function (account) {
  const calcBalance = account.movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = calcBalance;

  labelBalance.textContent = `${calcBalance} €`;
};

//Calculating and displaying Summary

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outcome = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income} €`;
  labelSumOut.textContent = `${outcome} €`;
  labelSumInterest.textContent = `${interest.toFixed(1)} €`;
};

generatorUsername(accounts);

//Login process

let loggedAccount;

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  loggedAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (loggedAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Hi ${loggedAccount.owner}`;

    updateInterface(loggedAccount);
    containerApp.style.opacity = 100;
    bannerEl.remove();

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  } else {
    alert("User not found!");
    containerApp.style.opacity = 0;
  }
});

//Money Transfer

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();

  const receiver = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  if (
    amount &&
    amount > 0 &&
    receiver &&
    loggedAccount.balance >= amount &&
    receiver?.username !== loggedAccount.username
  ) {
    loggedAccount.movements.push(-amount);
    receiver.movements.push(amount);

    updateInterface(loggedAccount);

    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferAmount.blur();
  } else {
    loggedAccount.balance <= amount ? alert("Not enought balance") : "";
  }
});

//Request loan

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanamount = Number(inputLoanAmount.value);
  if (
    inputLoanAmount.value &&
    inputLoanAmount.value > 0 &&
    loggedAccount.movements.some((mov) => mov >= loanamount * 0.1)
  ) {
    loggedAccount.movements.push(loanamount);
    updateInterface(loggedAccount);

    inputLoanAmount.value = "";
    inputLoanAmount.blur();
  } else {
    alert("Something went wrong. Check if you request correct amount");
  }
});

//Close account

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value &&
    inputClosePin.value &&
    inputCloseUsername.value === loggedAccount.username &&
    loggedAccount?.pin === Number(inputClosePin.value)
  ) {
    const accindex = accounts.findIndex(
      (acc) => acc.username === inputCloseUsername.value
    );

    accounts.splice(accindex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  }
});

//Sort movements

let sorted = false;
btnSort.addEventListener("click", () => {
  const sorting = loggedAccount.movements.slice().sort((a, b) => a - b);
  containerMovements.innerHTML = "";
  if (!sorted) {
    displayMovements(sorting);
    sorted = true;
  } else {
    displayMovements(loggedAccount.movements);
    sorted = false;
  }
});
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
