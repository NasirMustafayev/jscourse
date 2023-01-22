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
