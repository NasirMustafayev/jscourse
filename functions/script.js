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
