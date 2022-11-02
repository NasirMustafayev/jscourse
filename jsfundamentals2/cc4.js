const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = (bill) => {
  return bill >= 50 && bill <= 300 ? bill * (15 / 100) : bill * (20 / 100);
};

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(`
Bills 💵: ${bills}
Tips 💸: ${tips}
Totals 💰: ${totals}
`);

function calcAvg(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return `Average of all totals 💲: ${sum / arr.length}`;
}
console.log(calcAvg(totals));
