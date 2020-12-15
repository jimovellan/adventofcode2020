const fs = require('fs');
var nums = [];

var data = fs.readFileSync('data',{encoding:'utf8'});
nums = data.split(/\n/);

for(var i = 0 ; i < nums.length; i++){
    var element = nums[i];
    var dif = 2020 - element;
    var posibles = nums.filter((value,inx,arr)=>{
            return value == dif;
    })

    if(posibles !== undefined && posibles.length >0){
        console.log(element * posibles[0]);
        break;
    }
}



