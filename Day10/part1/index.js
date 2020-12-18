const comun = require('../../comun/index');

(async ()=>{

    var file = await comun.readFile('../data','\n');

     await calculate(file);


})()


async function calculate(file){
    
    for(var i=0; i< file.length; i++){
        file[i] = parseInt(file[i]);
    }

    file =  file.sort((a,b)=>{
        return (a - b);
    });

    var obj = {}

    var ant = 0;

    var contador =  [0,0,0];

    var ultimaposicion = file[file.length-1];
    file[file.length] = ultimaposicion + 3;

    

   for(var i=0; i<file.length ; i++){

        var diff = file[i] - ant;

        contador[diff-1] += 1;

        ant = file[i];

   }

   console.log(file.length);
        
    console.log(contador[0]*contador[2]);
    
}