//Internationalized dates

const dateNow = new Date();
const locale = navigator.language;
const intl = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  weekday: "long",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}).format(dateNow);

console.log(intl);

//setTimeout
//setTimeout's callback function can be accept arguments and parameters like that
const timer = setTimeout(
  (arg1, arg2) => {
    console.log(`Time is come ⏰ for ${arg1} and ${arg2}`);
  },
  2000,
  "You",
  "Me"
);

setTimeout(
  (value) => {
    clearTimeout(value);
  },
  5000,
  timer
);

// setInterval(() => {
//   console.log("WATA DO DOIN");
// }, 100);
