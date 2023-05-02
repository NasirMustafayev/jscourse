'use strict'

//TEST PAGE

const countriesContainer = document.querySelector('.countries');

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
  countriesContainer.style.opacity = 1;

}

const getCountryData = async (country) => {
  // const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  // const countydata = await response.json();
  // renderCountry(countydata[0])

  return "This is how you return a value from Async function";
}
getCountryData("USA");

(async () => {
  const res = await getCountryData();
  console.log(res);

})();


//Promise combinators. How they work and how they react different states of promises(fulfilled,rejected)
//Promise.all(array of promises)
//Promise.allSettled(array of promises)
//Promise.any(array of promises)

Promise.race([
  Promise.resolve("Success 1"),
  Promise.reject("Error"),
  Promise.resolve("Success 2")
])
  .then(res => console.log(res))
  .catch(err => console.log(err))