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
