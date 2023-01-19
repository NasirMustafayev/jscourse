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

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
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
const displayMovements = function (movements, account) {
  containerMovements.innerHTML = "";

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const movDate = new Date(account.movementsDates[i]);
    const day = `${movDate.getDate()}`.padStart(2, 0);
    const month = `${movDate.getMonth() + 1}`.padStart(2, 0);
    const year = movDate.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
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
generatorUsername(accounts);

//Updating UI based on updated values
const updateInterface = function (account) {
  displayMovements(account.movements, account);
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

//Login process

let loggedAccount;

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  loggedAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (loggedAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Hi ${loggedAccount.owner}`;

    const dateNow = new Date();
    const day = `${dateNow.getDate()}`.padStart(2, 0);
    const month = `${dateNow.getMonth() + 1}`.padStart(2, 0);
    const year = dateNow.getFullYear();
    const hour = `${dateNow.getHours()}`.padStart(2, 0);
    const minute = `${dateNow.getMinutes()}`.padStart(2, 0);

    updateInterface(loggedAccount);
    containerApp.style.opacity = 100;
    bannerEl.remove();
    labelDate.textContent = `${day}/${month}/${year} ${hour}:${minute}`;

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

    loggedAccount.movementsDates.push(new Date().toISOString());
    receiver.movementsDates.push(new Date().toISOString());

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
    loggedAccount.movementsDates.push(new Date().toISOString());

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
  if (!sorted) {
    displayMovements(sorting, loggedAccount);
    sorted = true;
  } else {
    displayMovements(loggedAccount.movements, loggedAccount);
    sorted = false;
  }
});
