'use strict';

function getSum(a, b){
    return a + b;
}

function getProduct(a, b){
    return a * b;
}

function cloneObj(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = cloneObj(obj[key]);

    return temp;
}

function randomNumber(amount, whole, skew, x, maxDiff){
    let numArray = [];
    for(let i = 0; i < amount; i++){
        const multiplier = (Math.random()*(maxDiff+1))-(maxDiff/2);
        let number = skew.getY(x);
        number = number * multiplier;
        if(whole){
            number = Math.floor(number);
        }
        numArray[i] = number;
    }
    return numArray;
}

function generateAnswer(a, b){
    let ansArr = [a,b];
    ansArr[2] = getSum(a,b);
    ansArr[3] = getProduct(a,b);
    return ansArr;
} 

function difficulty(diff, diamonObj){
    if(diff > 3){
        diff = 3;
    }
    if(diff == 0){
        diamonObj[2] = "";
        diamonObj[3] = "";
    }
    else if(diff == 1){
        diamonObj[3] = "";
        const toRemove = Math.round(Math.random());
        diamonObj[toRemove] = "";
        
    }
    else if(diff == 2){
        diamonObj[2] = "";
        const toRemove = Math.round(Math.random());
        diamonObj[toRemove] = "";
    }
    else{
        diamonObj[0] = "";
        diamonObj[1] = "";
    }
    return diamonObj;
}

function linear(m,b){
    let linearObj = {};
    linearObj.m = m;
    linearObj.b = b;
    linearObj.getY = function(x){
        return (this.m * x) + this.b;
    };
    linearObj.getX = function(y){
        return (y-this.b)/this.m;
    };
    return linearObj;
}

function generate(diff, numMul, range){
    
    let numQuest = Number(diff[0]) + Number(diff[1]) + Number(diff[2]) + Number(diff[3]);
    
    console.log(numQuest);
    
    let questions = [[],[]];
    let diamonds = [];
    for(let i = 0; i < numQuest; i++){
        let numbers = randomNumber(2,true,numMul,i+1, range);
        
        let answer = generateAnswer(numbers[0],numbers[1]);
        questions[0][i] = {
            id:i,
            a:answer[0],
            b:answer[1],
            c:answer[2],
            d:answer[3],
        }
        
        diamonds[i] = answer;
    }
    let c=0;
    for(let i = 0;i<4;i++){
        for(let j = 0; j < diff[i].length; j++){
            let q = difficulty(i,diamonds[c]);
            questions[1].push({
                id:c,
                a:q[0],
                b:q[1],
                c:q[2],
                d:q[3],
            });
            c++;
        }
    }
    return questions;
}