'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector("#country");

///////////////////////////////////////
const getCountry = function (country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener("load", () => {
        const [data] = JSON.parse(request.responseText);
        console.log(data);

        const html = `
    <article class="country">
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
    });
};

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !countryInput.value == "") {
        getCountry(countryInput.value)
        countryInput.value = ""
    }
})