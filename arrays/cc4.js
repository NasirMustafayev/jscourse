"use strict";

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

//Adding recomendedFood property to each dog object
dogs.forEach(
  (dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

//Find Sarah's dog
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));

//Finding dog owners who is their dogs eat less than recomended
let ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .flatMap((dog) => dog.owners);

//Finding dog owners who is their dogs eat more than recomended
let ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood)
  .flatMap((dog) => dog.owners);

//Printing console owners who is their dog eat less or more. With joined all owner to a single string
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!"`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!"`);

//Function for checing is dog eat OK amount food(+-10%)
const eatingOk = (dog) =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

//Is some dog eat exactly recomended amount?(true/false)
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

//Checking if some dog eat OK amount(true/false)
console.log(dogs.some(eatingOk));
//Print this dog object which is eat Ok amount
console.log(dogs.filter(eatingOk));

//Sorting dog object based on recommendedFood property
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
