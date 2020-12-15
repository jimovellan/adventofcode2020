const fs = require('fs');
var data_part = [];

var data = fs.readFileSync('data',{encoding:'utf8'});
data_part = data.split(/\n/);

//formatear entrada
var codes = [];
data_part.forEach(element => {
    
    
    var parts = element.split(' ');
    var minmax = parts[0].split('-');
    var min = minmax[0];
    var max = minmax[1];
    var letter = parts[1].replace(':','');
    var code = parts[2];
    codes.push({min: min, max: max, letter: letter, code: code});

   
});
var count = 0;
codes.forEach(element=>{
    console.log(element);
    var coincidences = element.code.split(element.letter);
    var ocurrences = coincidences.length -1;
    if(ocurrences >= element.min && ocurrences <= element.max){
        count ++;
    }

})

console.log(count);