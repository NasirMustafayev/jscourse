'use strict';

const btnWaI = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector("#country");

///////////////////////////////////////

//Render country container html
const renderCountry = (data, neighbour = "") => {
    let html = `
    <article class="country ${neighbour}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>
      ${(data.population > 1000000) ? (+data.population / 1000000).toFixed(1) + "mln" : data.population}
      </p>
      <p class="country__row"><span>🗣️</span>${Object.values(data.languages).map(lang => lang)}</p>
        <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
    </div >
  </article > `;

    countriesContainer.insertAdjacentHTML("beforeend", html)
}

// //First and Old method of getting data from Web API
// //With XML Request and Eventhandler

// // const getCountryData = function (country) {
// //     const request = new XMLHttpRequest();
// //     request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
// //     request.send();

// //     request.addEventListener("load", () => {
// //         const [data] = JSON.parse(request.responseText);
// //         renderCountry(data);
// //     });
// // };

//With Fetch API and Promises
const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {

            if (!response.ok)
                throw new Error("Country doesn't exist!")

            return response.json()
        })
        .then((data) => {
            renderCountry(data[0])

            const neighbours = data[0].borders;

            if (!neighbours) throw new Error(`${data[0].name.common} doesn't have a neighbor`)

            const result = neighbours.map(neighbour =>
                fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
                    .then((response) => response.json())
                    .then((data) => renderCountry(data[0], "neighbour")))
            return result
        })
        .catch(err => alert(`
        Attention\n
        ${err.message}`))
        .finally(() => {
            countriesContainer.style.opacity = 1
        })

}

//Promisifying Geolocation API

// More manual and explicit way
// const getPosition = () => {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//             position => resolve(position),
//             err => reject(err)
//         )
//     })
// }

const getPosition = () => new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject))


//Reverse geocoding of location based on provided values
//With .then chaining
// const whereAmI = function (lat, lng) {
//     fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
//         .then(response => response.json())
//         .then(data => {
//             getCountryData(data.address.country);
//         })
//         .catch(err => console.error(err.message))
// }

//With Async/Await
const whereAmI = async () => {
    try {
        //Getting current position coordinates
        const geoResponse = await getPosition();
        const { latitude, longitude } = geoResponse.coords;

        //Reverse geocoding promise
        const reverseResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await reverseResponse.json();
        console.log(data);


        //Rendering country data
        getCountryData(data.address.country);
    }
    catch (err) {
        alert("Too many request at the same time")
    }
}

//"Enter" key listener for country name input
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !countryInput.value == "") {
        getCountryData(countryInput.value)
        countryInput.value = ""
    }
})

//Where am I? button listener
btnWaI.addEventListener("click", () => {
    //First version
    // getPosition()
    //     .then(response => {
    //         const { latitude, longitude } = response.coords;
    //         whereAmI(latitude, longitude);
    //     })
    //     .catch(err => alert("Somethig went wrong\nCan't access location"))

    whereAmI();
})

/////////////////////////////////////////

//Manually building simple promise

// const myPromise = (value) => {
//     return new Promise((resolve, reject) => {
//         if (value == "Nasir") resolve("Hi Nasir welcome")
//         else reject(new Error("I don't know you"))
//     })
// }
// const person = prompt("Who are you?");

// //Consuming promise
// myPromise(person)
//     .then(response => console.log(response))
//     .catch(err => console.error(err))


// //Promisfying setTimeout()
// const waitforasec = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000))

// //Consuming and chaining
// waitforasec(1).then(() => {
//     console.log('Waited for 1 seconds');
//     return waitforasec(1)
// }).then(() => {
//     console.log('Waited for 2 seconds')
//     return waitforasec(1)
// }).then(() => {
//     console.log('Waited for 3 seconds')
//     return waitforasec(1)
// }).then(() => {
//     console.log('Waited for 4 seconds')
//     return waitforasec(1)
// }).then(() => {
//     console.log('Waited for 5 seconds')
//     return waitforasec(1)
// })