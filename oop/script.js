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

// class CarCl {
//     constructor(model, speed) {
//         this.model = model;
//         this.speed = speed;
//     }

//     accelerate() {
//         console.log(`${this.model}>>${this.speed += 10}km/h`);
//     }
//     brake() {
//         console.log(`${this.model}<<${this.speed -= 5}km/h`);
//     }

//     get speedUS() {
//         console.log(`${this.model}<<${this.speed / 1.6}mp/h`);
//     }
//     set speedUS(spd) {
//         this.speed = spd * 1.6;
//     }
// }

// const ford = new CarCl("Ford", 120);

// function Car(model, speed) {
//     this.model = model;
//     this.speed = speed;
// }


// Car.prototype.accelerate = function () {
//     console.log(`${this.model}>>${this.speed -= 10} km/h`);
// }

// Car.prototype.brake = function () {
//     console.log(`${this.model}>>${this.speed -= 10} km/h`);
// }

// function EV(model, speed, charge) {
//     Car.call(this, model, speed)
//     this.charge = charge
// }

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.changeBattery = function (chargeto) {
//     this.charge = chargeto
// }

// EV.prototype.accelerate = function () {
//     console.log(`${this.model}>>${this.speed += 20}km/h|${--this.charge}%`);

// }

// const tesla = new EV("Tesla", 120, 23)

// class Test {
//     #private = "Carrt";

//     constructor() { }

//     #cart() {
//         console.log(this.#private);
//     }
//     part() {
//         this.#cart();

//     }
// }

// const somestuff = new Test()

// somestuff.part();


class CarCl {

    constructor(model, speed) {
        this.model = model;
        this.speed = speed;
    }

    accelerate() {
        console.log(`${this.model}>>${this.speed -= 10} km/h`);
    }

    brake() {
        console.log(`${this.model}>>${this.speed -= 10} km/h`);
        return this;
    }
    get speedUS() {
        console.log(`${this.model}>>${this.speed / 1.6} mp/h`);
    }
    set speedUS(spd) {
        this.speed = spd * 1.6;
    }

}

class EVCl extends CarCl {
    #charge;

    constructor(model, speed, charge) {
        super(model, speed);
        this.#charge = charge
    }
    chargeBattery(chargeTo) {
        this.#charge = chargeTo
        return this;
    }
    accelerate() {
        console.log(`${this.model}>>${this.speed += 20} km/h|${--this.#charge}%`);
        return this;
    }

}

const rivian = new EVCl("Rivian", 120, 23);

rivian.accelerate()
    .accelerate()
    .accelerate()
    .brake()
    .chargeBattery(50)
    .accelerate();


