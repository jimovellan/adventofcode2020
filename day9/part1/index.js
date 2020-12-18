'use strict'

var comun = require('../../comun/index');
var pos = 0;
var tamofbloq = 25
var posread = 25;


(async()=>{

        var file = await comun.readFile('../data','\n');

        await calculate(file);

        

})();


async function calculate(file){

    while(posread < file.length){

       var bloq =  file.slice(pos,pos+tamofbloq);
       var number = file[posread];
       
       //console.log(`${bloq[0]}: ${number}`);
       var correct = await IsCorrect(bloq,number);
       if(!correct){
            console.log(`${number} false`);
            break;
       }else{
        //console.log(`${number} true`);
       }

       pos +=1;
       posread +=1;
       

    }

}


async function IsCorrect(bloq,number){
    
    var i=0;
    var correct = false;
    var buscado = undefined;
    while(!correct && i < tamofbloq){
        var diff = number - bloq[i];
       
        var buscado = await bloq.find((element)=>{
            return element == diff
        });

        
        if(buscado){
            correct=true;
            
        }

        //console.log(`${number} ${buscado}: ${correct}`);

        i += 1;

    }
    return buscado;
}