const fs = require('fs');
var data_part = [];

var data = fs.readFileSync('data',{encoding:'utf8'});
data_part = data.split(/\n/);

//formatear entrada
var filas = data_part.length;
var derecha = 1;
var abajo = 2;
var max = filas * derecha;

for(var i= 0; i< data_part.length;i++){
    
    data_part[i] = data_part[i].trim();
}
// for(var i=0; i < data_part.length; i ++){
//     var element = data_part[i];
//     var patron = element.substr(0,element.length-1).trim();
    
//     while(element.length < max){
//         element = element + patron;
//     }
    
//     data_part[i] = element;
    
// };


    


var altura = 0 + abajo;
var pos = 0 + derecha;
var arbol = 0;
console.log(data_part[0].length);
while(altura < data_part.length){
    
    var mod = (pos % 31);
    
    
    if(data_part[altura].substr(mod,1)=='#'){
        arbol +=1;
    }
    pos = pos + derecha;
    altura = altura + abajo;
}

console.log(arbol);