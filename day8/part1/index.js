'use strict'

const comun = require('../../comun/index');
var functionexecuted = [];
var pos = 0;
var cont = 0;

(async()=>{

    var dataFromFile = await comun.readFile('data','\n');

    var objs = await createObject(dataFromFile);

    var value = await calculate(objs);

    console.log(cont);

})();

async function calculate(data){

var terminate = false;

    while(!terminate){
        if(!(await isExecuted(pos))){
            functionexecuted.push(pos);
            var val = data[pos].value;
            var fun = data[pos].action;
            if(fun == 'nop') await nop(val);
            if(fun == 'acc') await acc(val);
            if(fun == 'jmp') await jmp(val);
         
            console.log(functionexecuted);
        }else{
            terminate = true;
        }
    }

    return pos;

}

async function createObject(data){

    var objs = [];
    
    data.forEach(element => {
        var sliceElement = element.split(' ');
        console.log(sliceElement);
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
    console.log(cont);
}

async function isExecuted(value){

    return functionexecuted.indexOf(value)>=0;
}

async function jmp(value){
    pos += value;
    
}

