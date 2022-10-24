const avgscoreDolphins = (56 + 112 + 101)/3;
const avgscoreKoalas = (70 + 95 + 106)/3;
const minScore = 100;

if(avgscoreDolphins > avgscoreKoalas && avgscoreDolphins >= minScore){

    console.log(`Dolphins Wins the game with score of: ${avgscoreDolphins}!`);

}
else if(avgscoreKoalas > avgscoreDolphins && avgscoreKoalas >= minScore){

    console.log(`Koalas Wins the game with score of: ${avgscoreKoalas}!`);

}
else if(avgscoreDolphins===avgscoreKoalas && avgscoreDolphins >= minScore && avgscoreKoalas >= minScore){

    console.log(`Draw!`);

}
else{

    console.log(`Nobody Wins!`)
}