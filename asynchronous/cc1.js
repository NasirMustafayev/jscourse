'use strict';

const btnWaI = document.querySelector(".btn-country");

const whereAmI = function (lat, lng) {
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(`You are in
            ${data.address.city ? data.address.city : data.address.village},${data.address.country}`);

        })
        .catch(err => console.error(err.message))
}

btnWaI.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        whereAmI(latitude, longitude);
    });
})