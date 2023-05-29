'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnReset = document.querySelector(".btn__reset");
const btnSort = document.querySelector(".btn__sort");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnYes = document.querySelector(".btn__yes");
const btnNo = document.querySelector(".btn__no");

let tabActions;
let btnsEdit;
let btnsDelete;

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription() {
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class Running extends Workout {
    type = "running";

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
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
        this._setDescription();
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

        containerWorkouts.addEventListener("click", this._moveToTarget.bind(this));

        this._getFromLocalStorage();
        btnReset.addEventListener("click", this.openModal);
        // btnSort.addEventListener("click", this.sort.bind(this));

        document.addEventListener("keydown", this.KeydownHidden.bind(this));
        btnCloseModal.addEventListener("click", this.closeModal);
        btnYes.addEventListener("click", this.reset);
        btnNo.addEventListener("click", this.closeModal);

        this._removeResetBtn();
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

        this.#workouts.forEach(workout => {
            this._renderWorkoutMarker(workout)
        });
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

        //Reset button make visible again
        this._addResetBtn();

        //Input validation functionn
        const validValue = (...values) =>
            values.every(value => Number.isFinite(value))
        //Positive value checker function
        const allPositive = (...values) =>
            values.every(value => value > 0)

        //Workout input values
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng

        let workout;

        //If workout type is running create new Running object
        if (type == "running") {
            const cadence = +inputCadence.value

            //Validation check
            if (!validValue(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert("Should be postivie numbers")

            workout = new Running([lat, lng], distance, duration, cadence)
        }

        //If workout type is cycling create new Cycling object
        if (type == "cycling") {
            const elevation = +inputElevation.value;

            //Validation check
            if (!validValue(distance, duration, elevation) || !allPositive(distance, duration))
                return alert("Should be postivie numbers")

            workout = new Cycling([lat, lng], distance, duration, elevation)
        }

        //Pushing new workout to workouts array
        this.#workouts.push(workout);

        //Rendering workout on list
        this._renderWorkout(workout)

        //Rendering workout marker on map
        this._renderWorkoutMarker(workout);

        //Hiding form after submit
        form.classList.add("hidden");

        //Clearing form inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

        //Save data on Local Storage
        this._setToLocalStorage();

    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${(workout.type === "running") ? "🏃‍♂️" : "🚴"} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${(workout.type === "running") ? "🏃‍♂️" : "🚴"}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

        if (workout.type === "running")
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">spm</span>
            </div>
            <div class="workout__actions"><a href="" id="edit">✏️</a> | <a href="" id="delete">🗑️</a></div>
        </li>`;

        if (workout.type === "cycling")
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            <div class="workout__actions"><a href="" id="edit">✏️</a> | <a href="" id="delete">🗑️</a></div>
        </li>
        `;

        form.insertAdjacentHTML("afterend", html);

        //Doesn't work
        // tabActions = document.querySelector(".workout__actions");
        // btnsEdit = document.querySelectorAll("#edit");
        // btnsDelete = document.querySelectorAll("#delete");

        // btnsDelete.forEach(btn => btn.addEventListener("click", this._deleteWorkout.bind(this)));

    }

    //Move to target location on map when clicked on list
    _moveToTarget(e) {
        const workoutEl = e.target.closest(".workout")

        if (!workoutEl) return;

        const workout = this.#workouts.find(workout => workout.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1
            }
        })
    }

    //Setting workout data in local storage
    _setToLocalStorage() {
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    //Getting workout data from local storage
    _getFromLocalStorage() {
        const localdata = JSON.parse(localStorage.getItem("workouts"));

        if (!localdata) return;
        this.#workouts = localdata;

        this.#workouts.forEach(workout => {
            this._renderWorkout(workout)
        }
        )

    }

    //Removing "Clear all" button when workout list empty
    _removeResetBtn() {
        if (this.#workouts.length === 0)
            btnReset.classList.add("hidden");
    }
    //Add "Clear all" button as soon as there is data on list
    _addResetBtn() {
        if (this.#workouts.length > 0)
            btnReset.classList.remove("hidden");
    }
    //Doesn't work
    // _deleteWorkout(e) {
    //     e.preventDefault();
    //     const workoutEl = e.target.closest(".workout");

    //     const localdata = JSON.parse(localStorage.getItem("workouts"));
    //     //When we delete an object from local storage they reorderded again by automatic index number so thats why hard to catch them
    //     const itemindex = localdata.find(item => item.id === workoutEl.dataset.id);
    //     localdata.splice(itemindex, 1);
    //     localStorage.setItem("workouts", JSON.stringify(localdata));

    //     workoutEl.remove();
    //     this._removeResetBtn();
    // }

    //Open confirmation modal window about wipe out all data
    openModal(e) {
        e.preventDefault();
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }

    //Close modal window
    closeModal() {
        modal.classList.add("hidden");
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }

    //Close modal window when pressing "Esc" key
    KeydownHidden(e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            this.closeModal();
        }
    };

    //Clearing all Workout data from storage
    reset() {
        localStorage.removeItem("workouts");
        location.reload();
    }

    //Doesn't work
    // sort() {
    //     //Sort by distance

    //     const sorting = this.#workouts.slice().sort((a, b) => a - b);
    //     console.log(sorting);

    //     this._renderWorkout(sorting);

    // }
}

const app = new App();