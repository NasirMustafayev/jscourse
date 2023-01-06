"use strict";

//Default values of functions

const vars = [];
function func1(arg1, arg2 = "Default", arg3 = "Default") {
  const stack = {
    arg1,
    arg2,
    arg3,
  };
  console.log(stack);
  vars.push(stack);
}
func1("Testo", undefined, "sadsa");

//High order functions and callback fucntions example

const oneWordLower = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const highOrder = function (str, func) {
  return `
  Original: ${str}
  Result: ${func(str)}
  By: ${func.name}
  `;
};

console.log(highOrder("The End of World", oneWordLower));

//Functions returning functions

//With normal function
const funcs = function (argmain) {
  return function (arginside) {
    console.log(`${argmain} and ${arginside}`);
  };
};

funcs("First Arg Value")("Second Arg Value");

//With Arrow function
const funcsArr = (argmain1) => (arginside1) =>
  console.log(`${argmain1} and ${arginside1}`);

funcsArr("Maka")("Kaku");

// The Call and Apply methods

const book = function (flightNum, name) {
  console.log(
    `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
  );
  this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
};

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
};

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

book.call(eurowings, 6931, "Gotum");
book.call(lufthansa, 3169, "Dalim");

//The Bind method

const bookEW = book.bind(eurowings),
  bookLH = book.bind(lufthansa);

bookLH(31, "Kamazullah");
bookEW(69, "Mammazuki");

eurowings.planes = 123;

eurowings.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", eurowings.buyPlane.bind(eurowings));

//Closures 1

const outerFunction = function () {
  let varCount = 0;

  return function () {
    varCount++;
    console.log(`${varCount} increased weirdly`);
  };
};

const executedFunction = outerFunction();

executedFunction();
executedFunction();
executedFunction();

console.dir(executedFunction);

//Closures 2

let f;

const func1 = function () {
  const a = 6;
  f = function () {
    console.log(a * 2);
  };
};

func1();
f();
console.dir(func1);