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
    var position1 = element.code[element.min-1];
    var position2 = element.code[element.max-1];
    if((position1 == element.letter && position2 != element.letter)
        ||
        (position1 != element.letter && position2 == element.letter)){
        count += 1;
        
    }

})

console.log(count);