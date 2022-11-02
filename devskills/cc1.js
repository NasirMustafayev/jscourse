let data = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let forecast = "Forecast:";
  for (let i = 0; i < arr.length; i++) {
    forecast += `
    🌡 ${arr[i]}°C in ${i + 1} days... `;
  }
  return forecast;
}
console.log(printForecast(data));
