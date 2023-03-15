'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout {
    type = "running";

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        this.pace = this.duration / this.distance
    }
}

class Cycling extends Workout {
    type = "cycling";

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
    }
}

class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        this._getPosition();
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationField);

    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
                alert("Can't get your current location there is a problem");
            })
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;

        this.#map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Amciq'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this))

    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden")
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");

    }

    _newWorkout(event) {
        event.preventDefault();

        const validValue = (...values) =>
            values.every(value => Number.isFinite(value))

        const allPositive = (...values) =>
            values.every(value => value > 0)

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng
        let workout;

        if (type == "running") {
            const cadence = +inputCadence.value

            if (!validValue(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert("Should be postivie numbers")

            workout = new Running([lat, lng], distance, duration, cadence)
        }

        if (type == "cycling") {
            const elevation = +inputElevation.value;

            if (!validValue(distance, duration, elevation) || !allPositive(distance, duration))
                return alert("Should be postivie numbers")

            workout = new Cycling([lat, lng], distance, duration, elevation)
        }

        this.#workouts.push(workout);
        console.log(workout);

        this.renderWorkoutMarker(workout);

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

    }

    renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${(workout.type === "running") ? "🏃‍♂️" : "🚴"} ${workout.distance}km`)
            .openPopup();
    }
}

const app = new App();