const mark = {
    fullName:  'Mark Miller',
    weight: 78,
    height: 1.69,
    calcBMI: function(){
        this.BMI = this.weight / this.height ** 2;
        return this.BMI;
    }
}

const john = {
    fullName:  'John Smith',
    weight: 92,
    height: 1.95,
    calcBMI: function(){
        this.BMI = this.weight / this.height ** 2;
        return this.BMI;
    }
}

john.calcBMI();
mark.calcBMI();

if(john.BMI>mark.BMI){
    console.log(
        `${john.fullName}'s BMI (${john.BMI.toFixed(1)}) is higher than ${mark.fullName}'s (${mark.BMI.toFixed()})!`
        );
}else{
    console.log(
        `${mark.fullName}'s BMI (${mark.BMI.toFixed(1)}) is higher than ${john.fullName}'s (${john.BMI.toFixed()})!`
        );
}