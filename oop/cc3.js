function Car(model, speed) {
    this.model = model;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    console.log(`${this.model}>>${this.speed -= 10} km/h`);
}

Car.prototype.brake = function () {
    console.log(`${this.model}>>${this.speed -= 10}km/h`);
}

function EV(model, speed, charge) {
    Car.call(this, model, speed)
    this.charge = charge
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.changeBattery = function (chargeto) {
    this.charge = chargeto
}

EV.prototype.accelerate = function () {
    console.log(`${this.model}>>${this.speed += 20}km/h|${--this.charge}%`);

}

const tesla = new EV("Tesla", 120, 23)