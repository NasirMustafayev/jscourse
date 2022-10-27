const calcAverage = (score1,score2,score3)=> (score1+score2+score3) / 3;

const avgscoreDolphins = calcAverage(34,24,38);
const avgscoreKoalas = calcAverage(90,64,47);

function checkWinner(avgDolphins,avgKoalas){

    if(avgDolphins >= avgKoalas*2){

        return `Dolphins Win (${avgDolphins} vs. ${avgKoalas})`;

    }else if(avgKoalas >= avgDolphins*2){
        
        return `Koalas Win (${avgKoalas} vs. ${avgDolphins})`;

    }else{
        return 'Nobody Wins!';
    }
}

console.log(checkWinner(avgscoreDolphins,avgscoreKoalas));