'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector("#country");

///////////////////////////////////////
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
      <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
        <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
    </div >
  </article > `;

    countriesContainer.insertAdjacentHTML("beforeend", html)
    countriesContainer.style.opacity = 1
}

//First and Old method of getting data from Web API
//With XML Request and Eventhandler

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener("load", () => {
//         const [data] = JSON.parse(request.responseText);
//         renderCountry(data);
//     });
// };

//With Fetch API and Promises

const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            renderCountry(data[0])
            console.log(data[0]);

            const neighbours = data[0].borders;

            if (!neighbours) return

            const result = neighbours.map(neighbour =>
                fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
                    .then((response) => response.json())
                    .then((data) => renderCountry(data[0], "neighbour")))
            return result
        })

}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !countryInput.value == "") {
        getCountryData(countryInput.value)
        countryInput.value = ""
    }
})
