let weightMark = 78;
let weightJohn = 92;
let heightMark = 1.69;
let heightJohn = 1.95;

let bmiMark = weightMark / heightMark ** 2;
let bmiJohn = weightJohn / heightJohn ** 2;

if(bmiMark > bmiJohn){
    console.log(`Mark's BMI(${bmiMark.toFixed(1)}) is higher than John's(${bmiJohn.toFixed(1)})!`)
}
else{
    console.log(`John's BMI(${bmiJohn.toFixed(1)}) is higher than Mark's(${bmiMark.toFixed(1)})!`)
}