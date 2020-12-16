'use strict'

const comun = require('../../comun/index');
var functionexecuted = [];
var pos = 0;
var cont = 0;
var lstOfcHanges = [];
var actualChange = 0;
var actionAfterChange = '';


(async()=>{

    var dataFromFile = await comun.readFile('data','\n');

    var objs = await createObject(dataFromFile);

    await obtainListOfChanges(objs);

    

    for(var i=0; i< lstOfcHanges.length; i++){
        actualChange = lstOfcHanges[i];
        if(objs[actualChange].action == 'jmp'){
            actionAfterChange = 'nop';
        }else{
            actionAfterChange = 'jmp';
        }
       
        var error = await calculate(objs);

        if(!error){
            console.log(cont);
        }
    }

    

    

})();

async function obtainListOfChanges(objs){

    
    for(var i=0; i<objs.length;i++){
       
        if(objs[i].action=='nop' || objs[i].action == 'jmp'){
            lstOfcHanges.push(i);
        }
    }
}

async function calculate(data){

functionexecuted = [];
cont = 0;
pos = 0;
var error = false;
var terminate = false;

    while(!error && !terminate){
        if(!(await isExecuted(pos))){
            functionexecuted.push(pos);
            var val = data[pos].value;
            var fun = data[pos].action;
            
            if(pos == actualChange ){
                fun = actionAfterChange;
            }

            if(fun == 'nop') await nop(val);
            if(fun == 'acc') await acc(val);
            if(fun == 'jmp') await jmp(val);
            if(pos >= data.length){
                terminate = true;
            }
         
            
        }else{
            error = true;
        }
    }

   // console.log(`posicion ${pos} valor ${actualChange}  error : ${error}`)
    return error;

}

async function createObject(data){

    var objs = [];
    
    data.forEach(element => {
        var sliceElement = element.split(' ');
        
        var action = sliceElement[0].trim();
        var value = parseInt(sliceElement[1].trim());
        objs.push({action: action, value: value});
    });

    return objs;

}

async function nop(value){
    pos +=1;
}

async function acc(value){
    
    cont = cont + value;
    pos += 1;
    
}

async function isExecuted(value){

    return functionexecuted.indexOf(value)>=0;
}

async function jmp(value){
    pos += value;
    
}

