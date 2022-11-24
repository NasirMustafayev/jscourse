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

for (const [i, scorer] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${scorer}`);
}

const odds = Object.values(game.odds);
let avgOdd = 0;

for (const [property, odd] of Object.entries(game.odds)) {
  avgOdd += odd;
  const oddName = game[property] || "draw";
  console.log(`Odd of victory ${oddName}: ${odd}`);
}

avgOdd /= odds.length;
console.log(`Average Odd is: ${avgOdd.toFixed(1)}`);

const scorers = {};
for (const scorer of game.scored) {
  scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}
console.log(scorers);
