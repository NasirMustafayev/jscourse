'use strict';
Array.prototype.onebyone = function () {
    return this.map(piece => piece + "Caartulla");
}

const arr = ["Watadodo", "Bruh", 69, 31, "Caaart"];

console.log(arr.onebyone());

// function Car(model, speed) {
//     this.model = model;
//     this.speed = speed;
// }

// Car.prototype.accelerate = function () {
//     console.log(this.speed += 10);
// }
// Car.prototype.brake = function () {
//     console.log(this.speed -= 5);
// }

// const bmw = new Car("BMW", 120);
// const mercedes = new Car("Mercedes", 95);

class CarCl {
    constructor(model, speed) {
        this.model = model;
        this.speed = speed;
    }

    accelerate() {
        console.log(`${this.model}>>${this.speed += 10}km/h`);
    }
    brake() {
        console.log(`${this.model}<<${this.speed -= 5}km/h`);
    }

    get speedUS() {
        console.log(`${this.model}<<${this.speed / 1.6}mp/h`);
    }
    set speedUS(spd) {
        this.speed = spd * 1.6;
    }
}

const ford = new CarCl("Ford", 120);