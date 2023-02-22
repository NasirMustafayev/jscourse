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