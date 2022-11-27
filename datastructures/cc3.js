const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🟨 Yellow card"],
  [69, "🟥 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🟨 Yellow card"],
]);

//Calling gameEvents map with Set for get rid off dublication
//Because of only "values"(not keys) is dublicated so we use .values() method
//We also convert this to array with Spread operator
const events = [...new Set(gameEvents.values())];

//Removing value which is have key "64"
gameEvents.delete(64);

//Getting last minute key from gameEvents map
//Displaying average event numbers
const lastMinute = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${lastMinute / gameEvents.size} minutes`
);

//Iterating gameEvents map.
//Using .entries for getting key and value same time with descruction
for (const [min, event] of gameEvents.entries()) {
  //Displaying if event happend in First or Second half of game
  console.table({
    half: `${min < 45 ? "[FIRST HALF]" : "[SECOND HALF]"}`,
    min: min,
    event: event,
  });
}
