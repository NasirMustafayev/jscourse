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
