//Selecting,creating and deleting elements DOM broad spectrum
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//querySelector spectrum test

//querySelector(querySelectorAll) not everytime should be use with "document"
//Also can be start with a "element". For example getting this element's its child elemets.
//It's the only DOM method has the this kind of special behaivor

const parent = document.querySelector("#parent");
console.log(parent.querySelector("#childparent"));

//Bubbling or Propagation test
//Propagation only happens when all parent elements have Event Listeners

document.querySelector("#child").addEventListener("click", function (e) {
  this.style.backgroundColor = "rgb(197, 239, 141)";
  //For preventing bubbling
  e.stopPropagation();
});

document.querySelector("#childparent").addEventListener("click", function (e) {
  this.style.backgroundColor = "rgb(132, 124, 250)";
  //For preventing bubbling
  e.stopPropagation();
});

document.querySelector("#parent").addEventListener("click", function (e) {
  this.style.backgroundColor = "rgb(187, 106, 106)";
  //For preventing bubbling
  e.stopPropagation();
});
