"use strict";

//Converting dog ages to human ages with formula
//Then filtering ages for only keeping adults(18+)
//After that collecting ages and founding average age. All in one line with Chaining!

const calcAverageHumanAge = function (ages) {
  return (
    ages
      .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
      .filter((age) => age >= 18)
      ///In here we simply getting average number of array values in each iteration then adding to final result.
      //It's will be give us same result getting average by dividing collected numbers of array
      .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
  );
};

console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
