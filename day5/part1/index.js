//lectura del fichero
(async function(){
    
    var data_part = await readFile('dataprueba');

    var maxr = await calculate(data_part);

    

    console.log(`higgest identificator : ${maxr}`);
    return 0;
})();

async function calculate(data_part){

    var maxr = 0;


    for(var i = 0; i < data_part.length; i++){

        var element = data_part[i];
        var row = element.trim().substr(0,7);
        var col = element.trim().substr(7,3);

        var fila = await calculateFirst7Positions(row);
        var seat = await calculateSecondPositions(col);
        var id = await calculateId(fila,seat);
        
        console.log(`id:${id} fila:${fila} asiento:${seat}`);
        if(id>maxr) maxr = id;

    }
    

    return maxr;
}

async function readFile(datafile){

    const fs = require('fs');
    var data_part = [];

    var data = fs.readFileSync(datafile,{encoding:'utf8'});
    
    data_part = data.split(/\n/);
    return data_part;

}

async function calculateId(fila, seat){
    return fila*8+seat;
}

async function calculateSecondPositions(bloque){
    var start = 0;
    var end = 7;
    var result = []
    for(var i=0; i<3 ; i++){
        var letter = bloque[i];
        if(letter=='L')
        {
            result = await lowerHalf(start,end);
        }else{
            result = await upperHalf(start,end);
        }
        start = result[0];
        end = result[1];
       // console.log(`${letter}: ${start},${end}`);
    }
    return start;
}

async function calculateFirst7Positions(bloque){
    var start = 0;
    var end = 127;
    var result = []
    for(var i=0; i<7 ; i++){
        var letter = bloque[i];
        if(letter=='F')
        {
            result = await lowerHalf(start,end);
        }else{
            result = await upperHalf(start,end);
        }
        start = result[0];
        end = result[1];
        //console.log(`${letter}: ${start},${end}`);
    }
    return start;
}

async function lowerHalf(start, end){
    var bloq = end-start;
    var part = bloq/2;
    part = Math.floor(part);
    end = start+part;
    return [start,end];
   
}

async function upperHalf(start, end){
    var bloq = end-start;
  
    var part = bloq/2;
    
    part = Math.ceil(part);
   
    start += part;
   
    
    return [start,end];
}

