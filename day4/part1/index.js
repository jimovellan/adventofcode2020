const fs = require('fs');
var data_part = [];

var data = fs.readFileSync('data',{encoding:'utf8'});
data_part = data.split(/\n/);
var objs = [];
var obj = new Object();
var minparams = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
var regExpressions = [/^[1][9][2-9][0-9]$|^[2][0][0][0-2]$/,
                    /^[2][0][1][0-9]$|^[2][0][2][0]$/,
                    /^[2][0][2][0-9]$|^[2][0][3][0]$/,
                    /^[1][5-8][0-9][c][m]$|^[1][9][0-3][c][m]$|^[5][9][i][n]$|^[6][0-9][i][n]$|^[7][0-6][i][n]$/,
                    /^[#]{1}[0-9a-f]{6}$/,
                    /\b(?:blu|amb|brn|gry|hzl|oth|grn)\b/,
                    /(^[0-9]{9}$)/]

//partimos por cada bloque
data_part.forEach((element,idx) => {
    if(element.indexOf(':')==-1){
        objs.push(obj);
        obj = new Object();
    }else{
        var slices = data_part[idx].split(' ');
        slices.forEach(el=>{
            
            var field = el.split(':');
            if(obj[field[0]]!=undefined)
                throw ("puto error");
            obj[field[0]]=field[1].trim();
        })
        
    }
    
});
objs.push(obj);



var cont = 0;
console.log(`Numero de elementos ${objs.length}`);

//validar cada pasaporte
objs.forEach(ele=>{
    var valid = true;
    
    minparams.forEach((par,idx)=>{
        if(ele[par]==undefined){
            valid = false;
        }
        else{
            
            var expresion = regExpressions[idx];
            if(!ele[par].match(expresion)){
                valid = false;
                console.log(par);
            }
        }
    });

    if(valid){
        cont +=1;
        //console.log(ele);
    }else{
        console.log(ele);
    }
})

console.log(cont);



