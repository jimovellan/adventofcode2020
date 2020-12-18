'use strict'

const { setupMaster } = require('cluster');
var comun = require('../../comun/index');
var pos = 0;
var tamofbloq = 25
var posread = 25;


(async()=>{

        var file = await comun.readFile('../data','\n');

        await calculate(file,69316178);

        

})();


async function calculate(file,number){

    var encontrado = false;
    while(pos < file.length && !encontrado){
        var seguir = true;
        
        var acum = 0;
        
        posread = pos;
        var bloq = [];
        
        while(seguir){
            
            var val = parseInt(file[posread]);
            
            if((acum + val) > number){
                seguir = false;
            }else if((acum + val) == number){
                seguir = false;
                bloq.push(val);
                if(bloq.length > 1){
                    encontrado = true;
                }
            }
            else{
                bloq.push(val);
                acum += val;
            }
            posread += 1;
           
            
        }
       
       
       pos +=1;
       
       if(encontrado){
           bloq = bloq.sort();
           console.log(bloq);
           console.log('resultado');
           var con = 0;
           bloq.forEach(element => {
               con += element;
           });
           console.log(con);
           console.log(number);
           console.log(bloq[0]+ bloq[bloq.length-1]);
       }
       

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