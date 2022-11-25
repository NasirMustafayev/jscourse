const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//Displaying Goal number and Scorer(player) name
for (const [i, scorer] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${scorer}`);

//Setting variables for using in loop and some calculations
const odds = Object.values(game.odds);
let avgOdd = 0;

//Displaying odd numbers along with Team names.
//Also increasing avgOdd variable same time with more effective way
for (const [property, odd] of Object.entries(game.odds)) {
  avgOdd += odd;
  //If odd property name is not a team name variable will be contain "draw" word
  const oddName = game[property] || "draw";
  console.log(`Odd of victory ${oddName}: ${odd}`);
}

//Calculating average odd and displaying
avgOdd /= odds.length;
console.log(`Average Odd is: ${avgOdd.toFixed(1)}`);

//Creating scorers objects and adding properties of scorers and their goal count.
const scorers = {};
for (const scorer of game.scored) {
  scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}
console.log(scorers);
