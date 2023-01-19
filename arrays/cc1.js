"use strict";

//Surwey data from Julia and Kate about dogs ages
const dataJulia = [9, 16, 6, 8, 3];
const dataKate = [10, 5, 6, 1, 4];

//We create an functions for that
const checkDogs = function (dogsJulia, dogsKate) {
  //First and last two element should be eliminated
  //So we need only values which is located in 1 and 3 indexes
  dogsJulia = dogsJulia.slice(1, 3);

  //const dogsAges = [..dogsJulia,...dogsKate]; This is another possible way to concatinating two arrays
  const dogsAges = dogsJulia.concat(dogsKate);

  //Looping results
  dogsAges.forEach(function (age, i) {
    //Controlling dog is a puppy or adult
    const control =
      age >= 3 ? `an adult, and is ${age} years old` : "still a puppy 🐶";

    //Showing final results
    console.log(`Dog number ${i + 1} is ${control}`);
  });
};

checkDogs(dataJulia, dataKate);
