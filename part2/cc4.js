const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const calcTip = (bill) => {
    return bill >= 50 && bill <= 300 ? bill * (15 / 100) : bill * (20 / 100);
  };

  tips.push(calcTip(bills[i]));
  totals.push(calcTip(bills[i]) + bills[i]);
  console.log(`
   Bill 💵: ${bills[i]}
   Tip 💸: ${tips[i]}
   Total 💰: ${totals[i]}
   `);
}

let sum = 0;

function calcAvg(arr){
  for(let i = 0; i < arr.length; i++){
    sum+= arr[i];
  }
  return `Average of all bills 💲: ${sum/arr.length}`
}
console.log(calcAvg(bills))
