'use strict';
Array.prototype.onebyone = function () {
    return this.map(piece => piece + "Caartulla");
}

const arr = ["Watadodo", "Bruh", 69, 31, "Caaart"];

console.log(arr.onebyone());

function Car(model, speed) {
    this.make = model;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    console.log(this.speed += 10);
}
Car.prototype.brake = function () {
    console.log(this.speed -= 5);
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

